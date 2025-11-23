import { YogaKnowledgeBase, Remedy } from '@/types/ai.types';

export class KnowledgeBaseManager {
    // In a real app, this would connect to the database
    // For now, we'll use in-memory storage or mock data
    private yogas: Map<string, YogaKnowledgeBase>;
    private doshas: Map<string, any>; // Define Dosha type if needed

    constructor() {
        this.yogas = new Map();
        this.doshas = new Map();
    }

    async getAllYogas(): Promise<YogaKnowledgeBase[]> {
        return Array.from(this.yogas.values());
    }

    async getAllYogasWithEmbeddings(): Promise<YogaKnowledgeBase[]> {
        // Filter for yogas that have search vectors
        return Array.from(this.yogas.values()).filter(y => y.searchVector && y.searchVector.length > 0);
    }

    async getYogaById(id: string): Promise<YogaKnowledgeBase | undefined> {
        return this.yogas.get(id);
    }

    async addYoga(yoga: YogaKnowledgeBase): Promise<void> {
        this.yogas.set(yoga.id, yoga);
    }

    async updateYoga(id: string, updates: Partial<YogaKnowledgeBase>): Promise<void> {
        const existing = this.yogas.get(id);
        if (existing) {
            this.yogas.set(id, { ...existing, ...updates });
        }
    }

    // Mock method to seed data
    async seedMockData(): Promise<void> {
        const mockYoga: YogaKnowledgeBase = {
            id: 'yoga-1',
            name: 'Gajakesari Yoga',
            category: 'Raj',
            rarity: 'Common',
            effects: {
                general: 'Brings wealth, fame, and virtuous children.',
                lifeAreas: {
                    wealth: 9,
                    career: 8,
                    fame: 8
                }
            },
            remedies: {
                primary: [{
                    type: 'Mantra',
                    details: 'Chant Jupiter Beej Mantra',
                    effectiveness: 8,
                    cost: 'Low',
                    duration: 'Daily',
                    timing: 'Morning'
                }],
                secondary: []
            },
            searchVector: [] // Mock vector
        };
        this.yogas.set(mockYoga.id, mockYoga);
    }
}
