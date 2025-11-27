/**
 * Enhanced Vedic Yoga Type Definitions
 * 
 * PROPRIETARY IMPLEMENTATION
 * Based on classical texts: BPHS (Brihat Parashara Hora Shastra)
 * Reference: PyJHora for algorithm verification only
 */

export type YogaCategory =
    | 'pancha_mahapurusha'  // 5 Great Person Yogas
    | 'lunar'                // Moon-based yogas
    | 'solar'                // Sun-based yogas
    | 'raja'                 // Royal/Power yogas
    | 'dhana'                // Wealth yogas
    | 'planetary'            // General planetary combinations
    | 'special';             // Special yogas

export type YogaStrength =
    | 'very_strong'           // Maximum benefic results
    | 'strong'               // Strong benefic results
    | 'moderate'             // Moderate results
    | 'weak';                // Weak results

export interface Yoga {
    name: string;
    category: YogaCategory;
    strength: YogaStrength;
    description: string;
    formation: string;          // How the yoga is formed
    results: string[];          // Expected results
    lifeAreas: string[];        // Affected life areas (career, wealth, etc.)
    planetInvolved?: string[];  // Planets creating this yoga
}

export interface YogaAnalysisResult {
    yogas: Yoga[];
    totalCount: number;
    strongYogasCount: number;
    categories: Record<YogaCategory, number>;
    summary: string;
}

/**
 * Planet indices (matching our system)
 */
export const PLANET_INDICES = {
    SUN: 0,
    MOON: 1,
    MARS: 2,
    MERCURY: 3,
    JUPITER: 4,
    VENUS: 5,
    SATURN: 6,
    RAHU: 7,
    KETU: 8
} as const;

/**
 * House classifications
 */
export const HOUSE_TYPES = {
    KENDRA: [0, 3, 6, 9],       // Angular houses (1, 4, 7, 10)
    TRIKONA: [0, 4, 8],         // Trinal houses (1, 5, 9)
    DUSTHANA: [2, 5, 7, 11],    // Malefic houses (3, 6, 8, 12)
    UPACHAYA: [2, 5, 9, 10]     // Growth houses (3, 6, 10, 11)
} as const;

/**
 * Exaltation houses for planets (0-indexed)
 */
export const EXALTATION_HOUSES = {
    [PLANET_INDICES.SUN]: 0,       // Aries
    [PLANET_INDICES.MOON]: 1,      // Taurus
    [PLANET_INDICES.MARS]: 9,      // Capricorn
    [PLANET_INDICES.MERCURY]: 5,   // Virgo
    [PLANET_INDICES.JUPITER]: 3,   // Cancer
    [PLANET_INDICES.VENUS]: 11,    // Pisces
    [PLANET_INDICES.SATURN]: 6     // Libra
} as const;

/**
 * Debilitation houses for planets (0-indexed)
 */
export const DEBILITATION_HOUSES = {
    [PLANET_INDICES.SUN]: 6,       // Libra
    [PLANET_INDICES.MOON]: 7,      // Scorpio
    [PLANET_INDICES.MARS]: 3,      // Cancer
    [PLANET_INDICES.MERCURY]: 11,  // Pisces
    [PLANET_INDICES.JUPITER]: 9,   // Capricorn
    [PLANET_INDICES.VENUS]: 5,     // Virgo
    [PLANET_INDICES.SATURN]: 0     // Aries
} as const;

/**
 * Own houses for planets (0-indexed)
 */
export const OWN_HOUSES: Record<number, number[]> = {
    [PLANET_INDICES.SUN]: [4],           // Leo
    [PLANET_INDICES.MOON]: [3],          // Cancer
    [PLANET_INDICES.MARS]: [0, 7],       // Aries, Scorpio
    [PLANET_INDICES.MERCURY]: [2, 5],    // Gemini, Virgo
    [PLANET_INDICES.JUPITER]: [8, 11],   // Sagittarius, Pisces
    [PLANET_INDICES.VENUS]: [1, 6],      // Taurus, Libra
    [PLANET_INDICES.SATURN]: [9, 10]     // Capricorn, Aquarius
};
