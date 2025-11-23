export interface YogaKnowledgeBase {
    id: string;
    name: string;
    category: 'Raj' | 'Dhana' | 'Daridra' | 'Arishta' | 'Nabhasa' | 'Special' | string;
    rarity: 'Common' | 'Moderate' | 'Rare' | 'Very Rare' | string;

    formation?: {
        rule: string;
        conditions?: any[];
        cancellationFactors?: string[];
        strengtheningFactors?: string[];
    };

    effects: {
        general: string;
        timing?: string;
        lifeAreas: {
            [key: string]: number | { impact: number; description: string };
        };
        strengthLevels?: {
            weak: string;
            moderate: string;
            strong: string;
            veryStrong: string;
        };
    };

    examples?: {
        celebrities: string[];
        historicalFigures?: string[];
    };

    remedies: {
        primary: Remedy[];
        secondary: Remedy[];
        mantras?: string[];
        gemstones?: string[];
        charities?: string[];
        rituals?: string[];
    };

    classicalReferences?: {
        text: string;
        chapter: string;
        verse: string;
        translation: string;
    }[];

    modernInterpretation?: string;
    relatedYogas?: string[];

    scrapedFrom?: {
        source: string;
        url: string;
        dateScraped: Date | string;
        reliability: number;
    }[];

    searchVector?: number[];
}

export interface DoshaKnowledgeBase {
    id: string;
    name: string;
    alternateName?: string[];
    severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical' | string;

    detection?: {
        rule: string;
        conditions?: any[];
        variations?: any[];
    };

    effects: {
        primaryImpact: string[];
        lifeAreaAffected: {
            [key: string]: { severity: number; issues: string[] };
        };
        manifestationAge?: string;
        duration?: string;
    };

    cancellation?: {
        fullCancellation: string[];
        partialCancellation: string[];
        naturalResolution?: string;
    };

    remedies: {
        primary: Remedy[];
        secondary: Remedy[];
        emergency?: Remedy[];
        lifeStyleChanges?: string[];
    };

    compatibilityRules?: {
        matchWith: string[];
        avoid: string[];
    };

    classicalView?: string;
    modernView?: string;
    psychologicalInterpretation?: string;

    caseStudies?: {
        case: string;
        outcome: string;
        remedyUsed: string;
    }[];

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
