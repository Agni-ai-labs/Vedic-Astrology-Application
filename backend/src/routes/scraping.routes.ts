import { Router, Request, Response } from 'express';
import { MultiSourceYogaScraper } from '@/lib/scraping/sources/multiSourceScraper';
import { KnowledgeBaseManager } from '@/lib/knowledge/knowledgeBaseManager';

const router = Router();
const kbManager = new KnowledgeBaseManager();

// POST /api/scrape/trigger - Manually trigger scraping
router.post('/trigger', async (req: Request, res: Response) => {
    try {
        const { source } = req.body;

        let results: any = {};

        if (!source || source === 'multi' || source === 'astrosage') {
            console.log('Starting multi-source scraping...');
            const scraper = new MultiSourceYogaScraper();

            const yogas = await scraper.scrapeYogas();
            console.log(`Scraped ${yogas.length} yogas from AstroSage`);

            // Save yogas to knowledge base
            for (const yoga of yogas) {
                await kbManager.addYoga(yoga);
            }

            // Scrape Doshas
            const doshas = await scraper.scrapeDoshas();
            console.log(`Scraped ${doshas.length} doshas from Internal Source`);

            // Save doshas to knowledge base
            for (const dosha of doshas) {
                await kbManager.addDosha(dosha);
            }

            results.astrosage = {
                yogas: yogas.length,
                doshas: doshas.length
            };
        }

        res.json({
            success: true,
            message: 'Scraping completed',
            results
        });

    } catch (error: any) {
        console.error('Scraping error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/knowledge/stats - Get knowledge base statistics
router.get('/stats', async (req: Request, res: Response) => {
    try {
        const yogas = await kbManager.getAllYogas();
        const doshas = await kbManager.getAllDoshas();

        const stats = {
            totalYogas: yogas.length,
            totalDoshas: doshas.length,
            yogasByCategory: yogas.reduce((acc, yoga) => {
                acc[yoga.category] = (acc[yoga.category] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            doshasBySeverity: doshas.reduce((acc, dosha) => {
                acc[dosha.severity] = (acc[dosha.severity] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            lastUpdated: new Date().toISOString()
        };

        res.json({
            success: true,
            stats
        });

    } catch (error: any) {
        console.error('Stats error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/knowledge/yogas - Get all yogas (paginated)
router.get('/yogas', async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const category = req.query.category as string;

        let yogas = await kbManager.getAllYogas();

        // Filter by category if provided
        if (category) {
            yogas = yogas.filter(y => y.category === category);
        }

        // Paginate
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedYogas = yogas.slice(startIndex, endIndex);

        res.json({
            success: true,
            data: paginatedYogas,
            pagination: {
                page,
                limit,
                total: yogas.length,
                totalPages: Math.ceil(yogas.length / limit)
            }
        });

    } catch (error: any) {
        console.error('Get yogas error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/knowledge/doshas - Get all doshas
router.get('/doshas', async (req: Request, res: Response) => {
    try {
        const doshas = await kbManager.getAllDoshas();

        res.json({
            success: true,
            data: doshas,
            total: doshas.length
        });

    } catch (error: any) {
        console.error('Get doshas error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
