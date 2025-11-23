import low from 'lowdb';
// @ts-ignore
import FileSync from 'lowdb/adapters/FileSync';
import { YogaKnowledgeBase, DoshaKnowledgeBase } from '@/types/ai.types';
import path from 'path';

interface DatabaseSchema {
    yogas: YogaKnowledgeBase[];
    doshas: DoshaKnowledgeBase[];
}

export class KnowledgeBaseManager {
    private db: low.LowdbSync<DatabaseSchema>;

    constructor() {
        const dbPath = path.join(process.cwd(), 'knowledge_base.json');
        const adapter = new FileSync<DatabaseSchema>(dbPath);
        this.db = low(adapter) as unknown as low.LowdbSync<DatabaseSchema>;

        // Set defaults if empty
        this.db.defaults({ yogas: [], doshas: [] }).write();
    }

    async getAllYogas(): Promise<YogaKnowledgeBase[]> {
        return this.db.get('yogas').value();
    }

    async getAllYogasWithEmbeddings(): Promise<YogaKnowledgeBase[]> {
        return this.db.get('yogas')
            .filter(y => !!y.searchVector && y.searchVector.length > 0)
            .value();
    }

    async getYogaById(id: string): Promise<YogaKnowledgeBase | undefined> {
        return this.db.get('yogas').find({ id }).value();
    }

    async addYoga(yoga: YogaKnowledgeBase): Promise<void> {
        const existing = this.db.get('yogas').find({ name: yoga.name }).value();
        if (existing) {
            // Update existing
            this.db.get('yogas').find({ name: yoga.name }).assign(yoga).write();
        } else {
            // Add new
            this.db.get('yogas').push(yoga).write();
        }
    }

    async updateYoga(id: string, updates: Partial<YogaKnowledgeBase>): Promise<void> {
        this.db.get('yogas').find({ id }).assign(updates).write();
    }

    // Dosha methods
    async addDosha(dosha: DoshaKnowledgeBase): Promise<void> {
        const existing = this.db.get('doshas').find({ name: dosha.name }).value();
        if (existing) {
            this.db.get('doshas').find({ name: dosha.name }).assign(dosha).write();
        } else {
            this.db.get('doshas').push(dosha).write();
        }
    }

    async getAllDoshas(): Promise<DoshaKnowledgeBase[]> {
        return this.db.get('doshas').value();
    }

    // Mock method to seed data (Modified to write to DB)
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
            searchVector: []
        };
        await this.addYoga(mockYoga);
    }
}
