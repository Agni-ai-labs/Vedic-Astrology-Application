import Redis from 'ioredis';
import { BirthChart, Prediction } from '../../types/astrology.types';

export class PredictionCacheManager {
    private redis: Redis;
    private readonly TTL = {
        CHART: 86400, // 24 hours
        PREDICTIONS: 3600, // 1 hour
        YOGAS: 604800, // 7 days
        TRANSITS: 1800 // 30 minutes (changes frequently)
    };

    constructor(redisUrl: string = 'redis://localhost:6379') {
        this.redis = new Redis(redisUrl);
    }

    // Cache birth chart calculations
    async cacheChart(key: string, chart: BirthChart): Promise<void> {
        await this.redis.setex(
            `chart:${key}`,
            this.TTL.CHART,
            JSON.stringify(chart)
        );
    }

    async getChart(key: string): Promise<BirthChart | null> {
        const data = await this.redis.get(`chart:${key}`);
        return data ? JSON.parse(data) : null;
    }

    // Cache predictions
    async cachePredictions(chartId: string, predictions: Prediction[]): Promise<void> {
        await this.redis.setex(
            `predictions:${chartId}`,
            this.TTL.PREDICTIONS,
            JSON.stringify(predictions)
        );
    }

    async getPredictions(chartId: string): Promise<Prediction[] | null> {
        const data = await this.redis.get(`predictions:${chartId}`);
        return data ? JSON.parse(data) : null;
    }

    // Invalidate cache when needed
    async invalidateChartCache(chartId: string): Promise<void> {
        await this.redis.del(`chart:${chartId}`);
        await this.redis.del(`predictions:${chartId}`);
    }

    // Batch operations for efficiency
    async batchCache(items: Array<{ key: string; value: any; ttl: number }>): Promise<void> {
        const pipeline = this.redis.pipeline();

        items.forEach(item => {
            pipeline.setex(item.key, item.ttl, JSON.stringify(item.value));
        });

        await pipeline.exec();
    }
}
