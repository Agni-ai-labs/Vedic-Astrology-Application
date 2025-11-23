import { EventEmitter } from 'events';

interface MetricData {
    name: string;
    type: string;
    values: { value: number; timestamp: number; labels?: Record<string, string> }[];
    labels: Record<string, number>;
}

interface Alert {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    data: any;
    timestamp: Date;
    resolved: boolean;
}

export class AstrologySystemMonitor extends EventEmitter {
    private metrics: Map<string, MetricData>;
    private alerts: Alert[];

    constructor() {
        super();
        this.metrics = new Map();
        this.alerts = [];
        this.initializeMetrics();
    }

    private initializeMetrics() {
        // Initialize metric collectors
        this.trackMetric('api_requests', { type: 'counter' });
        this.trackMetric('prediction_generation_time', { type: 'histogram' });
        this.trackMetric('yoga_detection_time', { type: 'histogram' });
        this.trackMetric('cache_hit_rate', { type: 'gauge' });
        this.trackMetric('ml_model_accuracy', { type: 'gauge' });
    }

    // Track API performance
    recordAPIRequest(endpoint: string, duration: number, status: number) {
        this.incrementMetric('api_requests', { endpoint, status: status.toString() });
        this.recordHistogram('api_response_time', duration, { endpoint });

        // Alert on slow responses
        if (duration > 5000) {
            this.createAlert('slow_api_response', {
                endpoint,
                duration,
                threshold: 5000
            });
        }
    }

    // Track prediction generation performance
    recordPredictionGeneration(duration: number, yogasFound: number, doshasFound: number) {
        this.recordHistogram('prediction_generation_time', duration);
        this.updateGauge('yogas_detected', yogasFound);
        this.updateGauge('doshas_detected', doshasFound);

        // Alert on unusually long generation times
        if (duration > 10000) {
            this.createAlert('slow_prediction_generation', {
                duration,
                threshold: 10000
            });
        }
    }

    // Track cache performance
    recordCacheAccess(hit: boolean) {
        this.incrementMetric('cache_accesses', { hit: hit.toString() });

        // Update hit rate
        const total = this.getMetricValue('cache_accesses');
        const hits = this.getMetricValue('cache_accesses', { hit: 'true' });
        this.updateGauge('cache_hit_rate', total > 0 ? hits / total : 0);
    }

    private trackMetric(name: string, config: { type: string }) {
        this.metrics.set(name, {
            name,
            type: config.type,
            values: [],
            labels: {}
        });
    }

    private incrementMetric(name: string, labels: Record<string, string> = {}) {
        const metric = this.metrics.get(name);
        if (metric) {
            const labelKey = JSON.stringify(labels);
            metric.labels[labelKey] = (metric.labels[labelKey] || 0) + 1;
        }
    }

    private recordHistogram(name: string, value: number, labels: Record<string, string> = {}) {
        const metric = this.metrics.get(name);
        if (metric) {
            metric.values.push({ value, timestamp: Date.now(), labels });
        }
    }

    private updateGauge(name: string, value: number) {
        const metric = this.metrics.get(name);
        if (metric) {
            metric.values = [{ value, timestamp: Date.now() }];
        }
    }

    private getMetricValue(name: string, labels?: Record<string, string>): number {
        const metric = this.metrics.get(name);
        if (!metric) return 0;

        if (labels) {
            const labelKey = JSON.stringify(labels);
            return metric.labels[labelKey] || 0;
        }

        return Object.values(metric.labels).reduce((sum, val) => sum + val, 0);
    }

    private createAlert(type: string, data: any) {
        const alert: Alert = {
            id: Math.random().toString(36).substring(7),
            type,
            severity: this.calculateSeverity(type),
            data,
            timestamp: new Date(),
            resolved: false
        };

        this.alerts.push(alert);
        this.emit('alert', alert);

        console.log(`[ALERT] ${type}:`, data);
    }

    private calculateSeverity(type: string): 'low' | 'medium' | 'high' | 'critical' {
        const severityMap: Record<string, any> = {
            'slow_api_response': 'medium',
            'slow_prediction_generation': 'medium',
            'kb_quality_degradation': 'high',
            'ml_model_accuracy_drop': 'high'
        };

        return severityMap[type] || 'medium';
    }
}

// Singleton instance
export const systemMonitor = new AstrologySystemMonitor();
