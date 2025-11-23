const API_BASE_URL = 'http://localhost:3001/api';

export interface SearchResponse {
    results: {
        yoga: any;
        relevanceScore: number;
        matchingAspects: string[];
    }[];
}

export interface RemedyPlanResponse {
    plan: {
        daily: any[];
        weekly: any[];
        monthly: any[];
        oneTime: any[];
        emergency: any[];
    };
}

export const apiService = {
    // Search Knowledge Base
    async searchYogas(query: string): Promise<SearchResponse> {
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Search failed');
        }
        return response.json();
    },

    // Generate Remedy Plan
    async generateRemedyPlan(data: {
        userId: string;
        predictions: any[];
        userContext: any;
        preferences: any;
    }): Promise<RemedyPlanResponse> {
        const response = await fetch(`${API_BASE_URL}/remedies/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to generate remedy plan');
        }
        return response.json();
    },

    // Health Check
    async checkHealth(): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:3001/health');
            return response.ok;
        } catch (error) {
            return false;
        }
    }
};
