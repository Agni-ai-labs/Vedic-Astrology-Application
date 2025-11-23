import * as cheerio from 'cheerio';
import { IntelligentAstrologyScraper, ScraperConfig } from '../scraper';
import { YogaKnowledgeBase, DoshaKnowledgeBase } from '@/types/ai.types';
import { v4 as uuidv4 } from 'uuid';

export class AstroSageScraper extends IntelligentAstrologyScraper {
    private baseUrl = 'https://www.astrosage.com';

    constructor() {
        super({
            target: 'AstroSage',
            rateLimit: 2000, // 2 seconds
            maxRetries: 3,
            timeout: 10000,
            cacheDuration: 24,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
    }

    async scrapeYogas(): Promise<YogaKnowledgeBase[]> {
        const yogas: YogaKnowledgeBase[] = [];

        // Known yoga pages for testing (found via search)
        const knownYogaUrls = [
            'https://www.astrosage.com/gaja-kesari-yoga.asp',
            'https://www.astrosage.com/neech-bhang-raj-yoga.asp',
            'https://www.astrosage.com/budh-aditya-yoga.asp',
            'https://www.astrosage.com/parvata-yoga.asp',
            'https://www.astrosage.com/kahala-yoga.asp'
        ];

        console.log(`Scraping ${knownYogaUrls.length} known yoga pages...`);

        for (const url of knownYogaUrls) {
            try {
                const yoga = await this.scrapeYogaDetail(url);
                if (yoga) {
                    yogas.push(yoga);
                    console.log(`✓ Scraped: ${yoga.name}`);
                }
            } catch (error: any) {
                console.error(`✗ Failed to scrape ${url}:`, error.message);
            }
        }

        console.log(`Scraping complete: ${yogas.length} yogas collected`);
        return yogas;
    }

    private async scrapeYogaDetail(url: string): Promise<YogaKnowledgeBase | null> {
        try {
            const html = await this.fetchWithRetry(url);
            const $ = cheerio.load(html);

            const name = $('h1').first().text().trim();
            if (!name) return null;

            // Extract all text content
            const allText = $('body').text();
            const paragraphs = $('p').map((_, el) => this.normalizeText($(el).text())).get();
            const content = paragraphs.join('\n\n');

            // Categorize yoga
            const category = this.categorizeYoga(name, content);

            // Extract formation rules
            const formation = this.extractFormation(content, paragraphs);

            // Extract effects
            const effects = this.extractEffects(content);

            // Extract remedies
            const remedies = this.extractRemedies(content);

            // Determine rarity
            const rarity = this.determineRarity(name, content);

            const yoga: YogaKnowledgeBase = {
                id: uuidv4(),
                name: name,
                category,
                rarity,
                formation,
                effects: {
                    general: this.extractGeneralEffect(content),
                    lifeAreas: effects
                },
                remedies,
                scrapedFrom: [{
                    source: 'AstroSage',
                    url: url,
                    dateScraped: new Date().toISOString(),
                    reliability: 8
                }],
                modernInterpretation: content.slice(0, 500)
            };

            return yoga;

        } catch (error) {
            console.error(`Error scraping yoga detail ${url}:`, error);
            return null;
        }
    }

    private categorizeYoga(name: string, content: string): string {
        const nameLower = name.toLowerCase();
        const contentLower = content.toLowerCase();

        if (nameLower.includes('raj') || contentLower.includes('king') || contentLower.includes('royal')) {
            return 'Raj';
        } else if (nameLower.includes('dhan') || nameLower.includes('wealth') || contentLower.includes('financial')) {
            return 'Dhana';
        } else if (nameLower.includes('daridra') || contentLower.includes('poverty')) {
            return 'Daridra';
        } else if (nameLower.includes('arishta') || contentLower.includes('danger')) {
            return 'Arishta';
        } else {
            return 'General';
        }
    }

    private extractFormation(content: string, paragraphs: string[]): any {
        // Look for formation/combination patterns
        const formationPara = paragraphs.find(p =>
            p.toLowerCase().includes('form') ||
            p.toLowerCase().includes('combination') ||
            p.toLowerCase().includes('when')
        );

        return {
            rule: formationPara || 'Formation details not specified',
            conditions: [],
            cancellationFactors: this.findCancellations(content),
            strengtheningFactors: this.findStrengtheningFactors(content)
        };
    }

    private findCancellations(content: string): string[] {
        const factors: string[] = [];
        const contentLower = content.toLowerCase();

        if (contentLower.includes('combust')) factors.push('Planet combustion');
        if (contentLower.includes('debilitat')) factors.push('Debilitation');
        if (contentLower.includes('afflict')) factors.push('Affliction by malefics');
        if (contentLower.includes('cancel')) {
            // Extract sentence with "cancel"
            const sentences = content.split('.');
            const cancelSentence = sentences.find(s => s.toLowerCase().includes('cancel'));
            if (cancelSentence) factors.push(this.normalizeText(cancelSentence));
        }

        return factors;
    }

    private findStrengtheningFactors(content: string): string[] {
        const factors: string[] = [];
        const contentLower = content.toLowerCase();

        if (contentLower.includes('exalt')) factors.push('Exaltation');
        if (contentLower.includes('own sign')) factors.push('Planet in own sign');
        if (contentLower.includes('strong')) factors.push('Strong planetary position');

        return factors;
    }

    private extractEffects(content: string): Record<string, number> {
        const effects: Record<string, number> = {};
        const contentLower = content.toLowerCase();

        // Wealth
        effects.wealth = this.scoreLifeArea(contentLower, ['wealth', 'money', 'riches', 'financial', 'prosperity']);

        // Career
        effects.career = this.scoreLifeArea(contentLower, ['career', 'profession', 'work', 'job', 'business']);

        // Fame
        effects.fame = this.scoreLifeArea(contentLower, ['fame', 'reputation', 'glory', 'renowned']);

        // Health
        effects.health = this.scoreLifeArea(contentLower, ['health', 'strong', 'vitality']);

        // Relationships
        effects.relationships = this.scoreLifeArea(contentLower, ['marriage', 'spouse', 'relationship', 'love']);

        return effects;
    }

    private scoreLifeArea(content: string, keywords: string[]): number {
        let score = 0;
        for (const keyword of keywords) {
            if (content.includes(keyword)) score += 2;
        }
        return Math.min(score, 10); // Cap at 10
    }

    private extractRemedies(content: string): any {
        const remedies: any = { primary: [], secondary: [] };
        const contentLower = content.toLowerCase();

        // Look for remedy keywords
        if (contentLower.includes('mantra')) {
            remedies.mantras = ['Chant relevant planetary mantra'];
        }
        if (contentLower.includes('gemstone') || contentLower.includes('stone')) {
            remedies.gemstones = ['Wear recommended gemstone'];
        }
        if (contentLower.includes('charity') || contentLower.includes('donate')) {
            remedies.charities = ['Perform charity'];
        }

        return remedies;
    }

    private extractGeneralEffect(content: string): string {
        // Get first meaningful paragraph as general effect
        const sentences = content.split('.').filter(s => s.trim().length > 20);
        return sentences.slice(0, 2).join('. ').slice(0, 300) + '...';
    }

    private determineRarity(name: string, content: string): string {
        const nameLower = name.toLowerCase();

        if (nameLower.includes('rare') || content.toLowerCase().includes('rare')) {
            return 'Rare';
        } else if (nameLower.includes('common')) {
            return 'Common';
        } else if (nameLower.includes('raj') || nameLower.includes('mahapurush')) {
            return 'Moderate';
        } else {
            return 'Common';
        }
    }

    async scrapeDoshas(): Promise<DoshaKnowledgeBase[]> {
        // Placeholder for Dosha scraping
        return [];
    }
}
