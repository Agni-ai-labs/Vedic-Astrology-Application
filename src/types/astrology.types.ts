/**
 * Core Astrology Type Definitions
 * Vedic, Lal Kitab, and Numerology types
 */

export interface BirthDetails {
    name: string;
    dateOfBirth: Date;
    timeOfBirth: string; // Format: HH:MM AM/PM
    placeOfBirth: {
        city: string;
        state: string;
        country: string;
        latitude: number;
        longitude: number;
        timezone: string;
    };
    gender: 'Male' | 'Female' | 'Other';
    concerns: string[];
}

// Vedic Astrology Types
export type VedicSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
    'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type VedicPlanet = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu';

export interface VedicPlanetPosition {
    planet: VedicPlanet;
    sign: VedicSign;
    degree: number;
    house: number;
    isRetrograde: boolean;
    nakshatra: string;
    pada: number;
}

export interface VedicChart {
    type: 'D1' | 'D9' | 'D10' | 'D12'; // Rashi, Navamsa, Dasamsa, Dwadasamsa
    planets: VedicPlanetPosition[];
    ascendant: {
        sign: VedicSign;
        degree: number;
    };
    houses: {
        [houseNumber: number]: {
            sign: VedicSign;
            planets: VedicPlanet[];
        };
    };
}

export interface DashaPeriod {
    planet: VedicPlanet;
    startDate: Date;
    endDate: Date;
    level: 'Mahadasha' | 'Antardasha' | 'Pratyantardasha';
    parentDasha?: string;
}

export interface Yoga {
    name: string;
    type: 'RajYoga' | 'DhanaYoga' | 'Other';
    planets: VedicPlanet[];
    description: string;
    effects: string[];
}

export interface Dosha {
    name: string;
    type: 'Manglik' | 'KaalSarp' | 'PitraDosha' | 'Other';
    severity: 'Low' | 'Medium' | 'High';
    description: string;
    remedies: string[];
}

// Lal Kitab Types
export interface LalKitabPlanetPosition {
    planet: VedicPlanet;
    house: number;
    isBlind: boolean;
    isSleeping: boolean;
    isExalted: boolean;
    isDebilitated: boolean;
}

export interface Rinanubandha {
    type: string; // Type of karmic debt
    planets: VedicPlanet[];
    houses: number[];
    description: string;
    effects: string[];
}

export interface LalKitabRemedy {
    title: string;
    description: string;
    method: string;
    duration: string;
    timing: string; // When to perform
    planets: VedicPlanet[];
    isDonationFree: boolean; // Must be true as per requirements
}

export interface Varshphal {
    year: number;
    predictions: {
        area: string;
        forecast: string;
        rating: number; // 1-10
    }[];
}

// Numerology Types
export interface NumerologyProfile {
    lifePathNumber: number;
    destinyNumber: number;
    soulUrgeNumber: number;
    personalityNumber: number;
    birthDayNumber: number;
    currentYearNumber: number;
}

export interface NumerologyMeaning {
    number: number;
    meaning: string;
    traits: string[];
    strengths: string[];
    challenges: string[];
    careers: string[];
    compatibility: number[];
}

export interface NameAnalysis {
    currentName: string;
    currentVibration: number;
    suggestedNames: {
        name: string;
        vibration: number;
        compatibility: number; // 1-100
        benefits: string[];
    }[];
}

export interface LuckyElements {
    numbers: number[];
    colors: string[];
    dates: number[];
    directions: string[];
    gemstones: string[];
}

// Combined Analysis Types
export interface StrengthMatrix {
    area: string; // e.g., "Career", "Health"
    vedicScore: number;
    lalKitabScore: number;
    numerologyScore: number;
    westernScore: number;
    overallStrength: number;
    insights: string[];
}

export interface ChallengeMatrix {
    area: string;
    vedicChallenges: string[];
    lalKitabChallenges: string[];
    numerologyChallenges: string[];
    westernChallenges: string[];
    severity: 'Low' | 'Medium' | 'High';
    priorityRemedies: string[];
}

export interface ActionPlan {
    timeframe: '30-day' | '60-day' | '90-day';
    tasks: {
        task: string;
        system: 'Vedic' | 'LalKitab' | 'Numerology' | 'Western' | 'Tarot' | 'Combined';
        timing: string; // From Panchang
        frequency: string;
        expectedOutcome: string;
    }[];
}

// Personalized Guidance Types
export interface UserConcern {
    type: 'relationship' | 'finance' | 'health' | 'addiction' | 'career' | 'legal' | 'business';
    details?: string; // e.g., "alcohol habit", "debt problems"
}

export interface TargetedRemedy {
    concernType: UserConcern['type'];
    remedyType: 'Mantra' | 'Gemstone' | 'Ritual' | 'Lifestyle' | 'Donation';
    title: string;
    description: string;
    instructions: string;
    timing?: string;
    priority: 'high' | 'medium' | 'low';
    cost: 'free' | 'low' | 'medium' | 'high';
    difficulty: 'easy' | 'medium' | 'hard';
    effectiveness: number; // 1-10
}

export interface BusinessDetails {
    name: string;
    type: string;
    startDate: Date;
    logoColor?: string;
}

export interface BusinessAnalysis {
    growthPrediction: {
        willGrow: boolean;
        timeline: string;
        confidence: number;
    };
    nameAnalysis: {
        score: number; // 1-100
        vibration: number;
        assessment: 'Excellent' | 'Good' | 'Average' | 'Poor';
    };
    recommendations: {
        suggestedNames: string[];
        logoColors: string[];
        luckyNumbers: number[];
        bestDirection: string;
        rebrandingDates: Date[];
    };
}

export interface BusinessSuggestion {
    sector: string;
    matchScore: number; // 1-100
    reasoning: string;
    timing: string;
    investmentRange: string;
    successProbability: number;
}
