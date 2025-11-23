export interface YogaKnowledgeBase {
    id: string;
    name: string;
    category: string;
    rarity: string;
    effects: {
        general: string;
        lifeAreas: {
            [key: string]: number; // Impact score 1-10
        };
    };
    remedies: {
        primary: Remedy[];
        secondary: Remedy[];
    };
    searchVector?: number[];
}

export interface Remedy {
    type: string;
    details: string;
    effectiveness: number;
    cost: string;
    duration: string;
    timing: string;
    precautions?: string[];
}

export interface SearchResult {
    yoga: YogaKnowledgeBase;
    relevanceScore: number;
    matchingAspects: string[];
}

export interface Intent {
    topic: string;
    searchQuery: string;
    lifeArea: string;
}

export interface YogaRecommendation {
    yoga: YogaKnowledgeBase;
    present: boolean;
    strength: number;
    relevance: number;
    explanation: string;
    remedies: Remedy[];
}

export interface UserContext {
    userId: string;
    hasAccessToTemples: boolean;
    workSchedule: string;
    physicalLimitations: boolean;
    urgentIssues: string[];
}

export interface UserPreferences {
    comfortableWithMantras: boolean;
    comfortableWithPujas: boolean;
    budgetLevel: 'Low' | 'Medium' | 'High';
    timeAvailability: 'Low' | 'Medium' | 'High';
    commitmentLevel: 'Low' | 'Medium' | 'High';
    healthConditions: string[];
    religiousAffiliation: string;
    languagePreference: string;
}

export interface RemedyPlan {
    daily: ScoredRemedy[];
    weekly: ScoredRemedy[];
    monthly: ScoredRemedy[];
    oneTime: ScoredRemedy[];
    emergency: ScoredRemedy[];
}

export interface ScoredRemedy {
    remedy: Remedy;
    score: number;
    reasoning: string;
    instructions?: string;
    videoTutorial?: string | null;
    trackingMethod?: string;
}
