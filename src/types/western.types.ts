/**
 * Western Astrology Type Definitions
 * NO emojis - use SVG icons in components
 */

export type ZodiacElement = 'Fire' | 'Earth' | 'Air' | 'Water';
export type ZodiacModality = 'Cardinal' | 'Fixed' | 'Mutable';

export interface ZodiacSign {
    name: string;
    symbol: string; // Unicode symbol (not emoji)
    dateRange: {
        start: string; // Format: "Month Day"
        end: string;
    };
    element: ZodiacElement;
    modality: ZodiacModality;
    rulingPlanet: string;
    coreTraits: string[];
    strengths: string[];
    challenges: string[];
    keywords: string[];
    colors: string[];
    luckyNumbers: number[];
    compatibleSigns: string[];
}

export interface SunSignData {
    sign: ZodiacSign;
    degree: number;
    house: number;
    coreEssence: string; // 2-3 sentence description
    lifeApproach: string;
    selfExpression: string;
    creativeOutlet: string;
}

export interface MoonSignData {
    sign: ZodiacSign;
    degree: number;
    house: number;
    emotionalSignificance: string; // 2-3 sentence description
    emotionalNeeds: string[];
    comfortZone: string;
    instinctiveReactions: string;
    nurturingStyle: string;
    innerChild: string;
}

export interface RisingSignData {
    sign: ZodiacSign;
    degree: number;
    firstImpressions: string; // 2-3 sentence description
    socialPersona: string[];
    physicalAppearance: string;
    lifeApproach: string;
    mask: string; // The persona worn in public
    chartRuler: string; // Planet ruling the ascendant
}

export interface KeyDate {
    date: string;
    event: string;
    significance: string;
}

export interface MonthlyHoroscopeArea {
    rating: number; // 1-10
    description: string;
}

export interface MonthlyHoroscope {
    sign: string;
    month: string;
    year: number;
    overview: string;
    keyDates: KeyDate[];
    opportunities: string[];
    challenges: string[];
    advice: string;
    luckyDays: number[];
    colors: string[];
    areas: {
        love: MonthlyHoroscopeArea;
        career: MonthlyHoroscopeArea;
        finance: MonthlyHoroscopeArea;
        health: MonthlyHoroscopeArea;
    };
}

export interface PlanetPosition {
    planet: string;
    sign: string;
    degree: number;
    house: number;
    isRetrograde: boolean;
}

export interface Aspect {
    planet1: string;
    planet2: string;
    type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
    orb: number;
    isApplying: boolean;
}

export interface HouseData {
    number: number;
    sign: string;
    degree: number;
    ruler: string;
}

export interface Transit {
    planet: string;
    currentSign: string;
    natalHouse: number;
    aspect: string;
    effect: string;
    startDate: string;
    endDate: string;
}

export interface NatalChartData {
    planets: PlanetPosition[];
    houses: HouseData[];
    aspects: Aspect[];
}

export interface WesternAstrologyProfile {
    sunSign: SunSignData;
    moonSign: MoonSignData;
    risingSign: RisingSignData;
    monthlyHoroscope: MonthlyHoroscope;
    natalChart: NatalChartData;
    transits: Transit[];
}
