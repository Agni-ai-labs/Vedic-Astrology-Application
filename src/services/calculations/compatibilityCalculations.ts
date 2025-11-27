/**
 * Marriage Compatibility Calculations (Ashtakoota System)
 * 
 * PROPRIETARY IMPLEMENTATION
 * Based on classical Vedic texts, implemented from first principles
 * Reference: PyJHora for algorithm verification only
 * 
 * Classical Sources:
 * - Brihat Parashara Hora Shastra (BPHS)
 * - Muhurta Chintamani
 * - Sarwaartha Chintamani
 */

import {
    CompatibilityInput,
    AshtakootaResult,
    PoruthhamResult,
    CompatibilityScore
} from '@/types/compatibility.types';

/**
 * Calculate Rashi (sign) from Nakshatra and Pada
 * Each Rashi = 2.25 Nakshatras = 9 Padas
 */
function calculateRashi(nakshatra: number, pada: number): number {
    const totalPadas = (nakshatra - 1) * 4 + pada;
    return Math.ceil(totalPadas / 9);
}

/**
 * Count from one nakshatra to another (circular)
 */
function countNakshatras(from: number, to: number): number {
    let count = to - from + 1;
    if (count <= 0) count += 27;
    return count;
}



/**
 * Get score status based on percentage
 */
function getScoreStatus(percentage: number): CompatibilityScore['status'] {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    if (percentage >= 30) return 'poor';
    return 'very_poor';
}

// ============================================================================
// VARNA PORUTHAM (Spiritual Compatibility) - 1 Point
// ============================================================================

/**
 * Varna (Caste/Spiritual Level) Classification
 * Based on Rashi grouping
 */
const VARNA_MAPPING = [
    3, // Mesha - Kshatriya
    3, // Vrishabha - Vaishya  
    2, // Mithuna - Shudra
    1, // Karka - Brahmin
    3, // Simha - Kshatriya
    3, // Kanya - Vaishya
    3, // Tula - Vaishya
    1, // Vrishchika - Brahmin
    3, // Dhanus - Kshatriya
    3, // Makara - Vaishya
    2, // Kumbha - Shudra
    1  // Meena - Brahmin
];

function calculateVarnaPorutham(boyRashi: number, girlRashi: number): PoruthhamResult {
    const boyVarna = VARNA_MAPPING[boyRashi - 1];
    const girlVarna = VARNA_MAPPING[girlRashi - 1];

    // Girl's varna should be equal or lower than boy's for compatibility
    const obtained = (girlVarna >= boyVarna) ? 1 : 0;

    return {
        name: 'Varna Kuta',
        description: 'Spiritual compatibility and Ego level',
        details: obtained === 1
            ? 'Compatible spiritual levels - ensures mutual respect'
            : 'Incompatible spiritual levels - may cause ego clashes',
        obtained,
        maximum: 1,
        percentage: obtained * 100,
        status: obtained === 1 ? 'excellent' : 'poor'
    };
}

// ============================================================================
// VASYA PORUTHAM (Mutual Attraction) - 2 Points
// ============================================================================

/**
 * Vasya (Control/Attraction) Groups
 * Based on Nakshatra characteristics
 */
const VASYA_GROUPS = {
    chatushpada: [1, 2, 10, 20, 21, 22], // Quadruped (4-legged animals)
    manava: [3, 6, 7, 11, 15, 16, 24, 26], // Human
    jalachara: [4, 12, 27], // Aquatic
    vana: [9, 13, 14, 17, 18, 19, 23, 25], // Wild/Forest
    keeta: [5, 8] // Insect
};

/**
 * Vasya compatibility matrix
 * Defines mutual attraction between groups
 */
const VASYA_MATRIX: Record<string, Record<string, number>> = {
    chatushpada: { chatushpada: 2, manava: 1, jalachara: 1, vana: 0, keeta: 1 },
    manava: { chatushpada: 1, manava: 2, jalachara: 1, vana: 0, keeta: 1 },
    jalachara: { chatushpada: 1, manava: 1, jalachara: 2, vana: 2, keeta: 1 },
    vana: { chatushpada: 0, manava: 0, jalachara: 2, vana: 2, keeta: 0 },
    keeta: { chatushpada: 1, manava: 1, jalachara: 1, vana: 0, keeta: 2 }
};

function getVasyaGroup(nakshatra: number): string {
    for (const [group, nakshatras] of Object.entries(VASYA_GROUPS)) {
        if (nakshatras.includes(nakshatra)) return group;
    }
    return 'manava'; // Default
}

function calculateVasyaPorutham(boyNak: number, girlNak: number): PoruthhamResult {
    const boyGroup = getVasyaGroup(boyNak);
    const girlGroup = getVasyaGroup(girlNak);

    const obtained = VASYA_MATRIX[girlGroup][boyGroup];

    return {
        name: 'Vasya Kuta',
        description: 'Mutual attraction and control',
        details: obtained === 2
            ? 'Perfect mutual attraction and harmony'
            : obtained === 1
                ? 'Moderate attraction - workable relationship'
                : 'Weak attraction - may lack chemistry',
        obtained,
        maximum: 2,
        percentage: (obtained / 2) * 100,
        status: getScoreStatus((obtained / 2) * 100)
    };
}

// ============================================================================
// TARA PORUTHAM (Birth Star Compatibility)  - 3 Points
// ============================================================================

/**
 * Tara (Star) Classification based on count from girl's nakshatra
 * 9 categories in a repeating cycle
 */
const TARA_RESULTS = [
    3,   // Janma (Birth) - Same star
    1.5, // Sampat (Wealth)
    0,   // Vipat (Danger)
    1.5, // Kshema (Welfare)
    0,   // Pratyak (Obstacle)
    1.5, // Sadhana (Achievement)
    0,   // Vadha (Destruction)
    1.5, // Mitra (Friend)
    3    // Ati-Mitra (Best friend)
];

function calculateTaraPorutham(boyNak: number, girlNak: number): PoruthhamResult {
    const countFromGirl = countNakshatras(girlNak, boyNak);
    const taraIndex = (countFromGirl - 1) % 9;
    const obtainedFromGirl = TARA_RESULTS[taraIndex];

    const countFromBoy = countNakshatras(boyNak, girlNak);
    const taraIndexBoy = (countFromBoy - 1) % 9;
    const obtainedFromBoy = TARA_RESULTS[taraIndexBoy];

    const obtained = obtainedFromGirl + obtainedFromBoy;
    const maximum = 6; // Maximum possible (3 + 3)

    // Normalize to 3 points
    const normalizedObtained = (obtained / maximum) * 3;

    return {
        name: 'Tara Kuta (Dina)',
        description: 'Birth star harmony and daily fortune',
        details: normalizedObtained >= 2.5
            ? 'Excellent star harmony - brings mutual prosperity'
            : normalizedObtained >= 1.5
                ? 'Good star compatibility'
                : 'Weak star alignment - may face obstacles',
        obtained: normalizedObtained,
        maximum: 3,
        percentage: (normalizedObtained / 3) * 100,
        status: getScoreStatus((normalizedObtained / 3) * 100)
    };
}

// ============================================================================
// YONI PORUTHAM (Sexual/Physical Compatibility) - 4 Points
// ============================================================================

/**
 * Yoni (Animal nature) Classification
 * 14 animal types representing physical nature
 */
const YONI_MAPPING = [
    0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9,
    8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1
];

const YONI_NAMES = [
    'Horse', 'Elephant', 'Sheep', 'Serpent', 'Dog', 'Cat', 'Rat',
    'Cow', 'Buffalo', 'Tiger', 'Deer', 'Monkey', 'Mongoose', 'Lion'
];

/**
 * Yoni compatibility matrix (symmetrical)
 * 0 = Enemy, 1 = Neutral/Unfriendly, 2 = Neutral, 3 = Friendly, 4 = Perfect
 */
const YONI_MATRIX = [
    [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 1, 3, 2, 1], // Horse
    [2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 2, 0], // Elephant
    [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1], // Sheep
    [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2], // Serpent
    [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1], // Dog
    [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1], // Cat
    [2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2], // Rat
    [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1], // Cow
    [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1], // Buffalo
    [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1], // Tiger
    [1, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1], // Deer
    [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2], // Monkey
    [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2], // Mongoose
    [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4]  // Lion
];

function calculateYoniPorutham(boyNak: number, girlNak: number): PoruthhamResult {
    const boyYoni = YONI_MAPPING[boyNak - 1];
    const girlYoni = YONI_MAPPING[girlNak - 1];

    const obtained = YONI_MATRIX[girlYoni][boyYoni];

    return {
        name: 'Yoni Kuta',
        description: 'Physical and sexual compatibility',
        details: obtained === 4
            ? `Perfect physical compatibility (${YONI_NAMES[boyYoni]} & ${YONI_NAMES[girlYoni]})`
            : obtained >= 3
                ? 'Good physical harmony'
                : obtained === 2
                    ? 'Neutral physical compatibility'
                    : obtained === 1
                        ? 'Below average - may have physical differences'
                        : 'Incompatible physical natures - serious concern',
        obtained,
        maximum: 4,
        percentage: (obtained / 4) * 100,
        status: getScoreStatus((obtained / 4) * 100)
    };
}

// ============================================================================
// GRAHA MAITRI PORUTHAM (Mental Compatibility) - 5 Points
// ============================================================================

/**
 * Rashi Lord (Planet ruling each sign)
 */
const RASHI_LORDS = [
    2, // Mesha - Mars
    5, // Vrishabha - Venus
    3, // Mithuna - Mercury
    1, // Karka - Moon
    0, // Simha - Sun
    3, // Kanya - Mercury
    5, // Tula - Venus
    2, // Vrishchika - Mars (co-ruled by Pluto in modern)
    4, // Dhanus - Jupiter
    6, // Makara - Saturn
    6, // Kumbha - Saturn (co-ruled by Uranus in modern)
    4  // Meena - Jupiter (co-ruled by Neptune in modern)
];

/**
 * Planetary friendship matrix
 * 0=Enemy, 3=Neutral, 5=Friend
 */
const PLANET_FRIENDSHIP = [
    [5, 5, 3, 5, 5, 0, 0], // Sun
    [5, 5, 3, 0, 5, 3, 3], // Moon
    [3, 0, 5, 5, 0, 5, 5], // Mars
    [5, 5, 5, 3, 5, 5, 5], // Mercury
    [5, 5, 5, 5, 5, 0, 3], // Jupiter
    [3, 3, 5, 5, 3, 5, 5], // Venus
    [3, 3, 3, 5, 3, 5, 5]  // Saturn
];

function calculateGrahaMaitriPorutham(boyRashi: number, girlRashi: number): PoruthhamResult {
    const boyLord = RASHI_LORDS[boyRashi - 1];
    const girlLord = RASHI_LORDS[girlRashi - 1];

    const obtained = PLANET_FRIENDSHIP[girlLord][boyLord];

    return {
        name: 'Graha Maitri Kuta',
        description: 'Mental compatibility and friendship',
        details: obtained === 5
            ? 'Excellent mental harmony - strong friendship basis'
            : obtained === 3
                ? 'Neutral mental compatibility'
                : 'Mental friction - may have different thinking patterns',
        obtained,
        maximum: 5,
        percentage: (obtained / 5) * 100,
        status: getScoreStatus((obtained / 5) * 100)
    };
}

// ============================================================================
// GANA PORUTHAM (Temperament) - 6 Points
// ============================================================================

/**
 * Gana (Nature/Temperament) Classification
 * Deva = Divine, Manushya = Human, Rakshasa = Demonic
 */
const GANA_MAPPING = [
    0, 2, 2, 1, 0, 2, 0, 0, 2, 2, 1, 1,
    0, 2, 0, 0, 2, 2, 0, 1, 1, 0, 0, 2,
    1, 1, 0
];

/**
 * Gana compatibility matrix
 */
const GANA_MATRIX = [
    [6, 6, 0], // Deva with [Deva, Manushya, Rakshasa]
    [5, 6, 0], // Manushya with [Deva, Manushya, Rakshasa]
    [1, 0, 6]  // Rakshasa with [Deva, Manushya, Rakshasa]
];

function calculateGanaPorutham(boyNak: number, girlNak: number): PoruthhamResult {
    const boyGana = GANA_MAPPING[boyNak - 1];
    const girlGana = GANA_MAPPING[girlNak - 1];

    const obtained = GANA_MATRIX[girlGana][boyGana];

    const ganaNames = ['Deva (Divine)', 'Manushya (Human)', 'Rakshasa (Demonic)'];

    return {
        name: 'Gana Kuta',
        description: 'Temperament and behavioral compatibility',
        details: obtained === 6
            ? `Perfect temperament match (${ganaNames[boyGana]} & ${ganaNames[girlGana]})`
            : obtained >= 5
                ? 'Good temperamental compatibility'
                : obtained === 1
                    ? 'Poor temperament match - personality clashes likely'
                    : 'Incompatible temperaments - serious behavioral differences',
        obtained,
        maximum: 6,
        percentage: (obtained / 6) * 100,
        status: getScoreStatus((obtained / 6) * 100)
    };
}

// ============================================================================
// BHAKUT PORUTHAM (Love & Affection) - 7 Points
// ============================================================================

/**
 * Bhakut (Rashi) compatibility matrix
 * Based on count between rashis
 */
const BHAKUT_MATRIX = [
    [7, 0, 7, 7, 0, 0, 7, 0, 0, 7, 7, 0],
    [0, 7, 0, 7, 7, 0, 0, 7, 0, 0, 7, 7],
    [7, 0, 7, 0, 7, 7, 0, 0, 7, 0, 0, 7],
    [7, 7, 0, 7, 0, 7, 7, 0, 0, 7, 0, 0],
    [0, 7, 7, 0, 7, 0, 7, 7, 0, 0, 7, 0],
    [0, 0, 7, 7, 0, 7, 0, 7, 7, 0, 0, 7],
    [7, 0, 0, 7, 7, 0, 7, 0, 7, 7, 0, 0],
    [0, 7, 0, 0, 7, 7, 0, 7, 0, 7, 7, 0],
    [0, 0, 7, 0, 0, 7, 7, 0, 7, 0, 7, 7],
    [7, 0, 0, 7, 0, 0, 7, 7, 0, 7, 0, 7],
    [7, 7, 0, 0, 7, 0, 0, 7, 7, 0, 7, 0],
    [0, 7, 7, 0, 0, 7, 0, 0, 7, 7, 0, 7]
];

function calculateBhakutPorutham(boyRashi: number, girlRashi: number): PoruthhamResult {
    const obtained = BHAKUT_MATRIX[girlRashi - 1][boyRashi - 1];

    return {
        name: 'Bhakut Kuta (Rashi)',
        description: 'Love, affection and prosperity',
        details: obtained === 7
            ? 'Excellent rashi compatibility - ensures love and prosperity'
            : 'Incompatible rashis - may face financial and emotional challenges',
        obtained,
        maximum: 7,
        percentage: (obtained / 7) * 100,
        status: obtained === 7 ? 'excellent' : 'poor'
    };
}

// ============================================================================
// NADI PORUTHAM (Health & Progeny) - 8 Points
// ============================================================================

/**
 * Nadi (Pulse/Energy) Classification
 * Aadi = Vata, Madhya = Pitta, Antya = Kapha
 */
const NADI_MAPPING = [
    0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2,
    2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2
];

function calculateNadiPorutham(boyNak: number, girlNak: number): PoruthhamResult {
    const boyNadi = NADI_MAPPING[boyNak - 1];
    const girlNadi = NADI_MAPPING[girlNak - 1];

    // Same nadi = incompatible (0 points), Different nadi = compatible (8 points)
    const obtained = (boyNadi === girlNadi) ? 0 : 8;

    const nadiNames = ['Aadi (Vata)', 'Madhya (Pitta)', 'Antya (Kapha)'];

    return {
        name: 'Nadi Kuta',
        description: 'Health, progeny and genetic compatibility',
        details: obtained === 8
            ? `Compatible nadis (${nadiNames[boyNadi]} & ${nadiNames[girlNadi]}) - healthy children expected`
            : `NADI DOSHA: Same nadi (${nadiNames[boyNadi]}) - may affect health and children`,
        obtained,
        maximum: 8,
        percentage: (obtained / 8) * 100,
        status: obtained === 8 ? 'excellent' : 'very_poor'
    };
}

// ============================================================================
// ADDITIONAL PORUTHAMS (South Indian System)
// ============================================================================

/**
 * Mahendra Porutham - Progeny welfare
 * Boy's nakshatra should be 4, 7, 10, 13, 16, 19, 22, or 25 from girl's
 */
function calculateMahendraPorutham(boyNak: number, girlNak: number): boolean {
    const count = countNakshatras(girlNak, boyNak);
    const mahendraPositions = [4, 7, 10, 13, 16, 19, 22, 25];
    return mahendraPositions.includes(count);
}

/**
 * Vedha Porutham - Obstruction check
 * Certain nakshatra pairs create obstruction
 */
function calculateVedhaPorutham(boyNak: number, girlNak: number): boolean {
    const vedhaPairs = [
        [1, 18], [2, 17], [3, 16], [4, 15], [5, 23], [6, 22],
        [7, 21], [8, 20], [9, 19], [10, 27], [11, 26], [12, 25], [13, 24]
    ];

    for (const [n1, n2] of vedhaPairs) {
        if ((boyNak === n1 && girlNak === n2) || (boyNak === n2 && girlNak === n1)) {
            return false; // Vedha exists
        }
    }
    return true; // No vedha
}

/**
 * Rajju Porutham - Longevity
 * Should not be in same rajju (body part)
 */
function calculateRajjuPorutham(boyNak: number, girlNak: number): boolean {
    const headRajju = [5, 14, 23];
    const neckRajju = [4, 6, 13, 15, 22, 24];
    const stomachRajju = [3, 7, 12, 16, 21, 25];
    const waistRajju = [2, 8, 11, 17, 20, 26];
    const footRajju = [1, 9, 10, 18, 19, 27];

    const boyInHead = headRajju.includes(boyNak);
    const girlInHead = headRajju.includes(girlNak);
    if (boyInHead && girlInHead) return false;

    const boyInNeck = neckRajju.includes(boyNak);
    const girlInNeck = neckRajju.includes(girlNak);
    if (boyInNeck && girlInNeck) return false;

    const boyInStomach = stomachRajju.includes(boyNak);
    const girlInStomach = stomachRajju.includes(girlNak);
    if (boyInStomach && girlInStomach) return false;

    const boyInWaist = waistRajju.includes(boyNak);
    const girlInWaist = waistRajju.includes(girlNak);
    if (boyInWaist && girlInWaist) return false;

    const boyInFoot = footRajju.includes(boyNak);
    const girlInFoot = footRajju.includes(girlNak);
    if (boyInFoot && girlInFoot) return false;

    return true; // Different rajjus
}

/**
 * Stree Dheergha Porutham - Girl's longevity
 * Boy's nakshatra should be beyond 13 from girl's
 */
function calculateStreeDheerghaPorutham(boyNak: number, girlNak: number): boolean {
    const count = countNakshatras(girlNak, boyNak);
    return count > 13;
}

// ============================================================================
// MAIN CALCULATION FUNCTION
// ============================================================================

/**
 * Calculate complete Ashtakoota compatibility
 * @param input - Boy and girl's nakshatra/pada details
 * @returns Complete compatibility analysis
 */
export function calculateMarriageCompatibility(input: CompatibilityInput): AshtakootaResult {
    const { boy, girl } = input;

    // Calculate rashis if not provided
    const boyRashi = boy.rashi || calculateRashi(boy.nakshatra, boy.pada);
    const girlRashi = girl.rashi || calculateRashi(girl.nakshatra, girl.pada);

    // Calculate all 8 poruthams
    const varna = calculateVarnaPorutham(boyRashi, girlRashi);
    const vasya = calculateVasyaPorutham(boy.nakshatra, girl.nakshatra);
    const tara = calculateTaraPorutham(boy.nakshatra, girl.nakshatra);
    const yoni = calculateYoniPorutham(boy.nakshatra, girl.nakshatra);
    const grahaMaitri = calculateGrahaMaitriPorutham(boyRashi, girlRashi);
    const gana = calculateGanaPorutham(boy.nakshatra, girl.nakshatra);
    const bhakut = calculateBhakutPorutham(boyRashi, girlRashi);
    const nadi = calculateNadiPorutham(boy.nakshatra, girl.nakshatra);

    // Calculate additional poruthams
    const mahendra = calculateMahendraPorutham(boy.nakshatra, girl.nakshatra);
    const vedha = calculateVedhaPorutham(boy.nakshatra, girl.nakshatra);
    const rajju = calculateRajjuPorutham(boy.nakshatra, girl.nakshatra);
    const streeDheergha = calculateStreeDheerghaPorutham(boy.nakshatra, girl.nakshatra);

    // Calculate total score
    const totalScore = varna.obtained + vasya.obtained + tara.obtained + yoni.obtained +
        grahaMaitri.obtained + gana.obtained + bhakut.obtained + nadi.obtained;
    const maximumScore = 36;
    const percentage = (totalScore / maximumScore) * 100;

    // Determine compatibility level
    let compatibility: AshtakootaResult['compatibility'];
    if (percentage >= 80) compatibility = 'excellent';
    else if (percentage >= 60) compatibility = 'very_good';
    else if (percentage >= 40) compatibility = 'good';
    else if (percentage >= 18) compatibility = 'acceptable';
    else compatibility = 'not_recommended';

    // Generate recommendation
    let recommendation = '';
    const warnings: string[] = [];

    if (nadi.obtained === 0) {
        warnings.push('CRITICAL: Nadi Dosha present - May affect health and children');
    }
    if (bhakut.obtained === 0) {
        warnings.push('WARNING: Bhakut Dosha - Financial and emotional challenges expected');
    }
    if (!rajju) {
        warnings.push('WARNING: Rajju Dosha - Longevity concerns');
    }
    if (!vedha) {
        warnings.push('WARNING: Vedha Dosha - Obstruction in relationship');
    }

    if (percentage >= 80) {
        recommendation = 'Highly compatible match. Excellent prospects for a harmonious married life.';
    } else if (percentage >= 60) {
        recommendation = 'Very good compatibility. Minor differences can be easily managed.';
    } else if (percentage >= 40) {
        recommendation = 'Good compatibility. Some effort needed to maintain harmony.';
    } else if (percentage >= 18) {
        recommendation = 'Acceptable compatibility. Requires understanding and compromise.';
    } else {
        recommendation = 'Not recommended. Significant compatibility issues detected.';
    }

    if (warnings.length > 0) {
        recommendation += ' However, serious doshas are present. Consult astrologer for remedies.';
    }

    return {
        varna,
        vasya,
        tara,
        yoni,
        grahaMaitri,
        gana,
        bhakut,
        nadi,
        mahendra,
        vedha,
        rajju,
        streeDheergha,
        totalScore,
        maximumScore,
        percentage,
        compatibility,
        recommendation,
        warnings
    };
}
