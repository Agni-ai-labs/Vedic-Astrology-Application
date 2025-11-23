import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { SemanticYogaSearch } from '@/lib/search/semanticSearch';
import { IntelligentRemedyRecommender } from '@/lib/ai/remedyRecommender';
import { PredictionCacheManager } from '@/lib/cache/predictionCache';
import { KnowledgeBaseManager } from '@/lib/knowledge/knowledgeBaseManager';
import { initSupabase } from '@/lib/db/supabase';
import scrapingRoutes from '@/routes/scraping.routes';

dotenv.config();

// Initialize Supabase
try {
    initSupabase();
    console.log('Supabase initialized successfully');
} catch (error) {
    console.warn('Supabase initialization failed:', error);
}

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Services Initialization
let cacheManager: PredictionCacheManager | null = null;

// Only initialize Redis if URL is provided and not localhost (which might not be running)
if (process.env.REDIS_URL && !process.env.REDIS_URL.includes('localhost')) {
    try {
        cacheManager = new PredictionCacheManager(process.env.REDIS_URL);
        console.log('Redis cache initialized');
    } catch (error) {
        console.warn('Redis cache not available, continuing without caching');
    }
} else {
    console.log('Redis not configured, running without cache');
}

const kbManager = new KnowledgeBaseManager();
// Initialize with API Key from env
const semanticSearch = new SemanticYogaSearch(process.env.GEMINI_API_KEY || '');
const remedyRecommender = new IntelligentRemedyRecommender();

// Register routes
app.use('/api/scraping', scrapingRoutes);
app.use('/api/knowledge', scrapingRoutes); // Reuse the same router for knowledge endpoints

// Routes

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Search Knowledge Base
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }

        try {
            const results = await semanticSearch.searchYogas(query);
            res.json({ results });
        } catch (geminiError: any) {
            // If Gemini fails (quota exceeded), return mock data
            console.warn('Gemini API failed, using mock data:', geminiError.message);

            const mockResults = [{
                yoga: {
                    id: 'mock-1',
                    name: 'Gajakesari Yoga',
                    category: 'Raj',
                    effects: {
                        general: 'Brings wealth, fame, and virtuous children.',
                        lifeAreas: { wealth: 9, career: 8 }
                    },
                    remedies: { primary: [], secondary: [] }
                },
                relevanceScore: 0.9,
                matchingAspects: ['Strong wealth impact']
            }];

            res.json({
                results: mockResults,
                warning: 'Using mock data - Gemini API quota exceeded. Please check your billing at https://ai.google.dev/gemini-api/docs/rate-limits'
            });
        }
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Generate Remedy Plan
app.post('/api/remedies/generate', async (req, res) => {
    try {
        const { userId, predictions, userContext, preferences } = req.body;

        if (!userId || !predictions || !userContext || !preferences) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const plan = await remedyRecommender.generateRemedyPlan(
            userId,
            predictions,
            userContext,
            preferences
        );

        res.json({ plan });
    } catch (error) {
        console.error('Remedy generation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
