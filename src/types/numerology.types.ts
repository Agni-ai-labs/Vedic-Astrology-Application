export interface NumerologyNumber {
    value: number;
    name: string;
    description: string;
    meaning: string;
    planet?: string; // Ruling planet
}

export interface NumerologyReport {
    lifePath: NumerologyNumber;
    destiny: NumerologyNumber; // Expression Number
    soulUrge: NumerologyNumber; // Heart's Desire
    personality: NumerologyNumber;
    birthDay: NumerologyNumber;
    currentYear: number;
    personalYear: number;
}

export interface NumberMeaning {
    keywords: string[];
    positiveTraits: string[];
    negativeTraits: string[];
    careers: string[];
    compatibility: number[];
}
