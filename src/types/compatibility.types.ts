/**
 * Marriage Compatibility Type Definitions
 * Based on Vedic Astrology principles (Ashtakoota system)
 * 
 * Independent implementation following classical texts:
 * - Brihat Parashara Hora Shastra
 * - Muhurta Chintamani
 * - Sarwaartha Chintamani
 */

export interface PartnerDetails {
    nakshatra: number; // 1-27 (Ashwini to Revati)
    pada: number; // 1-4
    rashi?: number; // 1-12 (optional, calculated from nakshatra/pada)
}

export interface CompatibilityInput {
    boy: PartnerDetails;
    girl: PartnerDetails;
    method?: 'north' | 'south'; // Default: north
}

export interface CompatibilityScore {
    obtained: number;
    maximum: number;
    percentage: number;
    status: 'excellent' | 'good' | 'average' | 'poor' | 'very_poor';
}

export interface PoruthhamResult extends CompatibilityScore {
    name: string;
    description: string;
    details: string;
}

/**
 * Complete Ashtakoota (8-point) Compatibility Analysis
 */
export interface AshtakootaResult {
    // 8 Main Poruthams (North Indian System)
    varna: PoruthhamResult;       // Spiritual compatibility (1 point)
    vasya: PoruthhamResult;        // Mutual attraction (2 points)
    tara: PoruthhamResult;         // Birth star compatibility (3 points)
    yoni: PoruthhamResult;         // Sexual compatibility (4 points)
    grahaMaitri: PoruthhamResult;  // Mental compatibility (5 points)
    gana: PoruthhamResult;         // Temperament (6 points)
    bhakut: PoruthhamResult;       // Love & affection (7 points)
    nadi: PoruthhamResult;         // Health & progeny (8 points)

    // 4 Additional Checks (South Indian)
    mahendra: boolean;             // Progeny welfare
    vedha: boolean;                // Obstruction check
    rajju: boolean;                // Longevity
    streeDheergha: boolean;        // Girl's longevity

    // Overall Analysis
    totalScore: number;            // Sum of all obtained points
    maximumScore: number;          // 36 for North, 10 for South
    percentage: number;
    compatibility: 'excellent' | 'very_good' | 'good' | 'acceptable' | 'not_recommended';
    recommendation: string;
    warnings: string[];
}

/**
 * Nakshatra Names (1-27)
 */
export const NAKSHATRA_NAMES = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
] as const;

/**
 * Rashi (Sign) Names (1-12)
 */
export const RASHI_NAMES = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)',
    'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)',
    'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanus (Sagittarius)',
    'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
] as const;
