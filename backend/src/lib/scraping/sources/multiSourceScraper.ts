import * as cheerio from 'cheerio';
import { IntelligentAstrologyScraper } from '../scraper'; // Adjust path as needed
import { YogaKnowledgeBase, DoshaKnowledgeBase } from '@/types/ai.types'; // Adjust path as needed
import { v4 as uuidv4 } from 'uuid';
import { COMPREHENSIVE_YOGA_DATASET, COMPREHENSIVE_DOSHA_DATASET } from '@/data/yogaDataset'; // Import both datasets

/**
 * Multi-Source Scraper for Yoga and Dosha Data
 * Scrapes from publicly accessible astrology resources
 * Falls back to internal Comprehensive Datasets
 */
export class MultiSourceYogaScraper extends IntelligentAstrologyScraper {
    constructor() {
        super({
            target: 'MultiSource',
            rateLimit: 3000, // 3 seconds
            maxRetries: 3,
            timeout: 15000,
            cacheDuration: 24,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
    }

    /**
     * Primary method to retrieve Yoga definitions
     * Combines scraped web data with the internal static dataset (31 Yogas)
     */
    async scrapeYogas(): Promise<YogaKnowledgeBase[]> {
        const yogas: YogaKnowledgeBase[] = [];

        // Strategy 1: Use freely accessible blog posts and educational content
        // We attempt to get fresh "wild" data first
        const sources = [
            {
                url: 'https://www.ganeshaspeaks.com/astrology/yogas-in-astrology/',
                parser: this.parseGaneshaSpeaks.bind(this)
            },
            {
                url: 'https://astro-vision.com/yogas/',
                parser: this.parseAstroVision.bind(this)
            }
        ];

        for (const source of sources) {
            try {
                console.log(`Attempting to scrape: ${source.url}...`);
                const html = await this.fetchWithRetry(source.url);
                const scrapedYogas = await source.parser(html, source.url);
                if (scrapedYogas.length > 0) {
                    yogas.push(...scrapedYogas);
                    console.log(`✓ Scraped ${scrapedYogas.length} yogas from ${source.url}`);
                }
            } catch (error: any) {
                console.warn(`! Note: Could not scrape ${source.url} (${error.message}). Proceeding...`);
            }
        }

        // Strategy 2: Load Internal Comprehensive Dataset
        // This ensures we always have high-quality core data even if scraping fails
        console.log('Loading internal comprehensive yoga dataset...');
        const internalYogas = this.getInternalComprehensiveYogas();
        yogas.push(...internalYogas);
        console.log(`✓ Loaded ${internalYogas.length} high-quality internal yoga definitions.`);

        console.log(`Total yogas available: ${yogas.length}`);
        return yogas;
    }

    /**
     * Primary method to retrieve Dosha definitions
     * Loads the internal static dataset (10 Doshas)
     */
    async scrapeDoshas(): Promise<DoshaKnowledgeBase[]> {
        console.log('Loading internal comprehensive dosha dataset...');

        // Currently relying primarily on internal data for Doshas as web scraping 
        // for structured dosha remedies is often inconsistent.
        const internalDoshas = this.getInternalComprehensiveDoshas();

        console.log(`✓ Loaded ${internalDoshas.length} high-quality internal dosha definitions.`);
        return internalDoshas;
    }

    // ------------------------------------------------------------------
    // INTERNAL DATASET LOADERS
    // ------------------------------------------------------------------

    /**
     * Loads the high-quality Comprehensive Yoga Dataset (31 Yogas)
     */
    private getInternalComprehensiveYogas(): YogaKnowledgeBase[] {
        console.log(`[DEBUG] COMPREHENSIVE_YOGA_DATASET has ${COMPREHENSIVE_YOGA_DATASET.length} entries`);
        return COMPREHENSIVE_YOGA_DATASET.map((data: any) => {
            // Map the raw data structure to the Application Knowledge Base structure
            return {
                id: uuidv4(),
                name: data.name,
                category: data.category,
                rarity: data.rarity,
                formation: {
                    rule: data.formation.rule,
                    cancellationFactors: data.formation.cancellationFactors,
                    strengtheningFactors: data.formation.strengtheningFactors
                },
                effects: {
                    general: data.effects.general,
                    lifeAreas: data.effects.lifeAreas
                },
                remedies: data.remedies,
                classicalReferences: data.classicalReferences,
                modernInterpretation: data.modernInterpretation,
                relatedYogas: (data as any).relatedYogas || [],

                // Metadata for the system
                scrapedFrom: [{
                    source: 'Verified Internal Database',
                    url: 'internal://static/yoga-dataset',
                    dateScraped: new Date().toISOString(),
                    reliability: 10 // Highest reliability score for manually verified data
                }]
            };
        });
    }

    /**
     * Loads the high-quality Comprehensive Dosha Dataset (10 Doshas)
     */
    private getInternalComprehensiveDoshas(): DoshaKnowledgeBase[] {
        console.log(`[DEBUG] COMPREHENSIVE_DOSHA_DATASET has ${COMPREHENSIVE_DOSHA_DATASET.length} entries`);
        return COMPREHENSIVE_DOSHA_DATASET.map((data: any) => {
            return {
                id: uuidv4(),
                name: data.name,
                severity: data.formation.severity, // Move severity to top level
                detection: {
                    rule: data.formation.rule,
                    variations: data.formation.nuances || []
                },
                classicalView: data.effects.general,
                effects: {
                    primaryImpact: data.effects.impactAreas || [],
                    lifeAreaAffected: {
                        health: {
                            severity: this.scoreLifeArea(data.effects.general, ['health', 'body', 'illness']),
                            issues: this.extractIssues(data.effects.general, ['health', 'body', 'illness'])
                        },
                        wealth: {
                            severity: this.scoreLifeArea(data.effects.general, ['wealth', 'money', 'prosperity']),
                            issues: this.extractIssues(data.effects.general, ['wealth', 'money', 'prosperity'])
                        },
                        relationships: {
                            severity: this.scoreLifeArea(data.effects.general, ['relationship', 'marriage', 'family']),
                            issues: this.extractIssues(data.effects.general, ['relationship', 'marriage', 'family'])
                        },
                        career: {
                            severity: this.scoreLifeArea(data.effects.general, ['career', 'work', 'profession']),
                            issues: this.extractIssues(data.effects.general, ['career', 'work', 'profession'])
                        },
                        spiritual: {
                            severity: this.scoreLifeArea(data.effects.general, ['spiritual', 'meditation', 'enlightenment']),
                            issues: this.extractIssues(data.effects.general, ['spiritual', 'meditation', 'enlightenment'])
                        }
                    }
                },
                remedies: {
                    primary: (data.remedies.poojas || []).map((pooja: string) => ({
                        type: 'Pooja',
                        details: pooja,
                        effectiveness: 8,
                        description: `Perform ${pooja} to mitigate the effects of ${data.name}`
                    })),
                    secondary: [
                        ...(data.remedies.mantras || []).map((mantra: string) => ({
                            type: 'Mantra',
                            details: mantra,
                            effectiveness: 7,
                            description: `Chant ${mantra} regularly`
                        })),
                        ...(data.remedies.gemstones || []).map((gemstone: string) => ({
                            type: 'Gemstone',
                            details: gemstone,
                            effectiveness: 6,
                            description: `Wear ${gemstone} for protection`
                        }))
                    ],
                    lifestyle: data.remedies.lifestyle || []
                },
                scrapedFrom: [{
                    source: 'Verified Internal Database',
                    url: 'internal://static/dosha-dataset',
                    dateScraped: new Date().toISOString(),
                    reliability: 10
                }]
            };
        });
    }

    // ------------------------------------------------------------------
    // WEB SCRAPING PARSERS (Helpers for scraping logic)
    // ------------------------------------------------------------------

    private async parseGaneshaSpeaks(html: string, sourceUrl: string): Promise<YogaKnowledgeBase[]> {
        const yogas: YogaKnowledgeBase[] = [];
        const $ = cheerio.load(html);

        $('h2, h3').each((_, el) => {
            const heading = $(el).text().trim();
            if (heading.toLowerCase().includes('yoga') && heading.length < 50) {
                const $next = $(el).next();
                const content = $next.is('p') ? $next.text().trim() : '';
                if (content.length > 50) {
                    yogas.push(this.createYogaFromText(heading, content, sourceUrl));
                }
            }
        });

        return yogas;
    }

    private async parseAstroVision(html: string, sourceUrl: string): Promise<YogaKnowledgeBase[]> {
        const yogas: YogaKnowledgeBase[] = [];
        const $ = cheerio.load(html);

        $('article, .entry-content, .post-content').each((_, container) => {
            const $container = $(container);
            $container.find('h2, h3, h4').each((_, heading) => {
                const title = $(heading).text().trim();
                const $siblings = $(heading).nextUntil('h2, h3, h4');
                const content = $siblings.map((_, el) => $(el).text()).get().join('\n');

                if (title.toLowerCase().includes('yoga') && content.length > 100) {
                    yogas.push(this.createYogaFromText(title, content, sourceUrl));
                }
            });
        });

        return yogas;
    }

    private createYogaFromText(name: string, content: string, sourceUrl: string): YogaKnowledgeBase {
        const category = this.categorizeYoga(name, content);
        const effects = this.extractEffects(content);
        const remedies = this.extractRemedies(content);

        return {
            id: uuidv4(),
            name: this.normalizeText(name),
            category,
            rarity: this.determineRarity(name, content),
            formation: {
                rule: this.extractFormationRule(content),
                cancellationFactors: this.findCancellations(content),
                strengtheningFactors: this.findStrengtheningFactors(content)
            },
            effects: {
                general: this.extractGeneralEffect(content),
                lifeAreas: effects
            },
            remedies,
            scrapedFrom: [{
                source: new URL(sourceUrl).hostname,
                url: sourceUrl,
                dateScraped: new Date().toISOString(),
                reliability: 6 // Scraped data has lower reliability than internal data
            }],
            modernInterpretation: content.slice(0, 500)
        };
    }

    // ------------------------------------------------------------------
    // TEXT ANALYSIS HELPERS
    // ------------------------------------------------------------------

    private categorizeYoga(name: string, content: string): string {
        const nameLower = name.toLowerCase();
        const contentLower = content.toLowerCase();
        if (nameLower.includes('raj') || contentLower.includes('king')) return 'Raj';
        if (nameLower.includes('dhan') || contentLower.includes('wealth')) return 'Dhana';
        if (nameLower.includes('daridra') || contentLower.includes('poverty')) return 'Daridra';
        return 'General';
    }

    private extractFormationRule(content: string): string {
        const sentences = content.split('.').map(s => s.trim());
        const formationSentence = sentences.find(s =>
            s.toLowerCase().includes('form') ||
            s.toLowerCase().includes('when') ||
            s.toLowerCase().includes('occurs')
        );
        return formationSentence || 'Formation details not explicitly parsed from text.';
    }

    private extractEffects(content: string): Record<string, number> {
        const contentLower = content.toLowerCase();
        return {
            wealth: this.scoreLifeArea(contentLower, ['wealth', 'money', 'prosperity', 'rich']),
            career: this.scoreLifeArea(contentLower, ['career', 'profession', 'work', 'job']),
            fame: this.scoreLifeArea(contentLower, ['fame', 'reputation', 'glory', 'famous']),
            health: this.scoreLifeArea(contentLower, ['health', 'vitality', 'disease', 'life']),
            relationships: this.scoreLifeArea(contentLower, ['marriage', 'relationship', 'spouse'])
        };
    }

    private scoreLifeArea(content: string, keywords: string[]): number {
        let score = 0;
        keywords.forEach(kw => { if (content.includes(kw)) score += 2; });
        return Math.min(score, 10);
    }

    private extractIssues(content: string, keywords: string[]): string[] {
        const issues: string[] = [];
        keywords.forEach(kw => {
            if (content.toLowerCase().includes(kw)) {
                issues.push(`Issues related to ${kw}`);
            }
        });
        return issues;
    }

    private extractRemedies(content: string): any {
        const contentLower = content.toLowerCase();
        const remedies: any = { primary: [], secondary: [] };
        if (contentLower.includes('mantra')) remedies.mantras = ['Planetary mantra'];
        if (contentLower.includes('gemstone')) remedies.gemstones = ['Consult astrologer for gemstone'];
        return remedies;
    }

    private extractGeneralEffect(content: string): string {
        const sentences = content.split('.').filter(s => s.trim().length > 20);
        return sentences.slice(0, 2).join('. ').slice(0, 300) + '...';
    }

    private determineRarity(name: string, content: string): string {
        if (name.toLowerCase().includes('mahapurusha')) return 'Moderate';
        if (name.toLowerCase().includes('rare') || content.toLowerCase().includes('rare')) return 'Rare';
        if (name.toLowerCase().includes('common')) return 'Common';
        return 'Moderate';
    }

    private findCancellations(content: string): string[] {
        const factors: string[] = [];
        const contentLower = content.toLowerCase();
        if (contentLower.includes('combust')) factors.push('Combustion');
        if (contentLower.includes('debilitat')) factors.push('Debilitation');
        return factors;
    }

    private findStrengtheningFactors(content: string): string[] {
        const factors: string[] = [];
        const contentLower = content.toLowerCase();
        if (contentLower.includes('exalt')) factors.push('Exaltation');
        if (contentLower.includes('own sign')) factors.push('Own sign');
        return factors;
    }

    protected normalizeText(text: string): string {
        return text.replace(/\s+/g, ' ').trim();
    }
}