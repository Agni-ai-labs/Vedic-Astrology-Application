import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import { YogaKnowledgeBase, DoshaKnowledgeBase, Remedy } from '@/types/ai.types';

export interface ScraperConfig {
    target: string;
    rateLimit: number; // ms between requests
    maxRetries: number;
    timeout: number;
    headers?: Record<string, string>;
    cacheDuration: number; // hours
}

export abstract class IntelligentAstrologyScraper {
    protected config: ScraperConfig;
    protected cache: Map<string, { data: string; timestamp: number }>;
    protected lastRequestTime: number = 0;

    constructor(config: ScraperConfig) {
        this.config = config;
        this.cache = new Map();
    }

    // Abstract methods to be implemented by specific scrapers
    abstract scrapeYogas(): Promise<YogaKnowledgeBase[]>;
    abstract scrapeDoshas(): Promise<DoshaKnowledgeBase[]>;

    protected async fetchWithRetry(url: string, retries = this.config.maxRetries): Promise<string> {
        // Check cache
        const cached = this.cache.get(url);
        if (cached && !this.isExpired(cached.timestamp)) {
            console.log(`[CACHE HIT] ${url}`);
            return cached.data;
        }

        for (let i = 0; i < retries; i++) {
            try {
                await this.waitRateLimit();

                console.log(`[FETCH] ${url} (Attempt ${i + 1})`);
                const response = await axios.get(url, {
                    headers: this.config.headers,
                    timeout: this.config.timeout
                });

                const html = response.data;

                // Update cache
                this.cache.set(url, {
                    data: html,
                    timestamp: Date.now()
                });

                this.lastRequestTime = Date.now();
                return html;

            } catch (error: any) {
                console.error(`Attempt ${i + 1} failed for ${url}:`, error.message);
                if (i === retries - 1) throw error;
                await this.sleep(Math.pow(2, i) * 1000); // Exponential backoff
            }
        }

        throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
    }

    protected async waitRateLimit(): Promise<void> {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < this.config.rateLimit) {
            await this.sleep(this.config.rateLimit - timeSinceLastRequest);
        }
    }

    protected sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    protected isExpired(timestamp: number): boolean {
        return Date.now() - timestamp > this.config.cacheDuration * 3600000;
    }

    protected normalizeText(text: string): string {
        return text.replace(/\s+/g, ' ').trim();
    }
}
