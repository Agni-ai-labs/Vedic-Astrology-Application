import { GoogleGenerativeAI } from '@google/generative-ai';
import { YogaKnowledgeBase, SearchResult, Intent, YogaRecommendation } from '@/types/ai.types';
import { BirthChart } from '@/types/astrology.types';

export class SemanticYogaSearch {
    private genAI: GoogleGenerativeAI;
    private model: any;
    private embeddingModel: any;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Or gemini-pro
        this.embeddingModel = this.genAI.getGenerativeModel({ model: 'embedding-001' });
    }

    // Search yogas using natural language queries
    async searchYogas(query: string, limit: number = 10): Promise<SearchResult[]> {
        // Generate embedding for query
        const queryEmbedding = await this.generateEmbedding(query);

        // In a real implementation, this would query a vector database (pgvector/pinecone)
        // For now, we'll simulate fetching all yogas and doing cosine similarity in-memory
        // This assumes we have a way to get all yogas with embeddings
        const yogas = await this.getAllYogasWithEmbeddings();

        // Calculate similarity scores
        const results = yogas.map(yoga => ({
            yoga,
            similarity: this.cosineSimilarity(queryEmbedding, yoga.searchVector)
        }));

        // Sort by similarity and return top results
        return results
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, limit)
            .map(r => ({
                yoga: r.yoga.data,
                relevanceScore: r.similarity,
                matchingAspects: this.extractMatchingAspects(query, r.yoga.data)
            }));
    }

    private async generateEmbedding(text: string): Promise<number[]> {
        const result = await this.embeddingModel.embedContent(text);
        return result.embedding.values;
    }

    private cosineSimilarity(vec1: number[], vec2: number[]): number {
        let dotProduct = 0;
        let mag1 = 0;
        let mag2 = 0;

        for (let i = 0; i < vec1.length; i++) {
            dotProduct += vec1[i] * vec2[i];
            mag1 += vec1[i] * vec1[i];
            mag2 += vec2[i] * vec2[i];
        }

        mag1 = Math.sqrt(mag1);
        mag2 = Math.sqrt(mag2);

        if (mag1 === 0 || mag2 === 0) return 0;

        return dotProduct / (mag1 * mag2);
    }

    private extractMatchingAspects(query: string, yoga: YogaKnowledgeBase): string[] {
        const queryLower = query.toLowerCase();
        const aspects: string[] = [];

        // Check if query mentions life areas
        const lifeAreas = ['career', 'wealth', 'marriage', 'health', 'spirituality'];
        lifeAreas.forEach(area => {
            // @ts-ignore
            if (queryLower.includes(area) && yoga.effects.lifeAreas[area]) {
                aspects.push(`Strong ${area} impact`);
            }
        });

        return aspects;
    }

    // Conversational yoga recommendations
    async recommendYogasForQuery(userQuery: string, chart: BirthChart): Promise<YogaRecommendation[]> {
        // Understand user intent
        const intent = await this.analyzeIntent(userQuery);

        // Search relevant yogas
        const searchResults = await this.searchYogas(intent.searchQuery);

        // Filter by chart presence (Mock implementation for now)
        const recommendations: YogaRecommendation[] = [];

        for (const result of searchResults) {
            // Mock check
            const isPresent = Math.random() > 0.5;
            const strength = Math.random() * 10;

            if (isPresent) {
                recommendations.push({
                    yoga: result.yoga,
                    present: true,
                    strength: strength,
                    relevance: result.relevanceScore,
                    explanation: await this.generateExplanation(userQuery, result.yoga, { present: true, strength }),
                    remedies: strength < 7 ? result.yoga.remedies.primary : []
                });
            }
        }

        return recommendations;
    }

    private async analyzeIntent(query: string): Promise<Intent> {
        const prompt = `Extract the main astrological topic and search query from the user question: "${query}". Return JSON with {topic, searchQuery, lifeArea}.`;

        const result = await this.model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        try {
            // Simple cleanup for JSON parsing if the model adds markdown
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (e) {
            return { topic: 'general', searchQuery: query, lifeArea: 'general' };
        }
    }

    private async generateExplanation(
        query: string,
        yoga: YogaKnowledgeBase,
        detection: any
    ): Promise<string> {
        const prompt = `Explain how the yoga "${yoga.name}" relates to the user's query "${query}". 
        The yoga is ${detection.present ? 'present' : 'not present'} in their chart with strength ${detection.strength.toFixed(1)}/10.
        Yoga effects: ${yoga.effects.general}`;

        const result = await this.model.generateContent(prompt);
        return result.response.text();
    }

    // Mock method to simulate fetching from DB
    private async getAllYogasWithEmbeddings(): Promise<any[]> {
        return [];
    }
}
