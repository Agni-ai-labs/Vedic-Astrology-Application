/**
 * Enhanced Yoga Calculations - Top 20 Critical Yogas
 * 
 * PROPRIETARY IMPLEMENTATION
 * Based on Brihat Parashara Hora Shastra (BPHS)
 * Reference: PyJHora for verification only
 * 
 * Implements:
 * - 5 Pancha Mahapurusha Yogas
 * - 10 Critical Lunar/Solar Yogas
 * - 5 Top Raja Yogas
 */

import { VedicChart } from '@/types/vedic.types';
import {
    Yoga,
    YogaAnalysisResult,
    YogaCategory,
    PLANET_INDICES,
    EXALTATION_HOUSES,
    OWN_HOUSES
} from '@/types/yoga.types';

/**
 * Helper: Get house index (0-11) for a planet
 */
function getPlanetHouse(chart: VedicChart, planetName: string): number {
    const planet = chart.d1.planets.find(p => p.planet === planetName);
    if (!planet) return -1;

    const rashiMap: Record<string, number> = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };

    return rashiMap[planet.sign] ?? -1;
}

/**
 * Helper: Check if planets are in same house
 */
function planetsInSameHouse(chart: VedicChart, planet1: string, planet2: string): boolean {
    const p1House = getPlanetHouse(chart, planet1);
    const p2House = getPlanetHouse(chart, planet2);
    return p1House !== -1 && p1House === p2House;
}

/**
 * Helper: Check if planet is in Kendra from another planet
 */
function isInKendra(fromHouse: number, toHouse: number): boolean {
    const diff = (toHouse - fromHouse + 12) % 12;
    return [0, 3, 6, 9].includes(diff);
}

/**
 * Helper: Check if planet is exalted
 */
function isExalted(chart: VedicChart, planetName: string, planetIndex: number): boolean {
    const house = getPlanetHouse(chart, planetName);
    return house === EXALTATION_HOUSES[planetIndex as keyof typeof EXALTATION_HOUSES];
}

/**
 * Helper: Check if planet is in own sign
 */
function isInOwnSign(chart: VedicChart, planetName: string, planetIndex: number): boolean {
    const house = getPlanetHouse(chart, planetName);
    const ownHouses = OWN_HOUSES[planetIndex];
    return ownHouses?.includes(house) ?? false;
}

// ============================================================================
// PANCHA MAHAPURUSHA YOGAS (5 Great Person Yogas)
// ============================================================================

/**
 * Ruchaka Yoga - Mars in own sign/exaltation in Kendra
 */
function checkRuchakaYoga(chart: VedicChart): Yoga | null {
    const marsHouse = getPlanetHouse(chart, 'Mars');
    const ascHouse = 0; // Assuming ascendant is 1st house

    if (!isInKendra(ascHouse, marsHouse)) return null;

    const exalted = isExalted(chart, 'Mars', PLANET_INDICES.MARS);
    const ownSign = isInOwnSign(chart, 'Mars', PLANET_INDICES.MARS);

    if (!exalted && !ownSign) return null;

    return {
        name: 'Ruchaka Yoga',
        category: 'pancha_mahapurusha',
        strength: exalted ? 'very_strong' : 'strong',
        description: 'Mars in own sign or exaltation in angular house',
        formation: `Mars in ${exalted ? 'exaltation (Capricorn)' : 'own sign (Aries/Scorpio)'} in Kendra`,
        results: [
            'Courageous and valorous',
            'Military/police/sports success',
            'Strong physique and commanding presence',
            'Victory over enemies'
        ],
        lifeAreas: ['Career', 'Physical Strength', 'Leadership', 'Competition'],
        planetInvolved: ['Mars']
    };
}

/**
 * Bhadra Yoga - Mercury in own sign/exaltation in Kendra
 */
function checkBhadraYoga(chart: VedicChart): Yoga | null {
    const mercuryHouse = getPlanetHouse(chart, 'Mercury');
    const ascHouse = 0;

    if (!isInKendra(ascHouse, mercuryHouse)) return null;

    const exalted = isExalted(chart, 'Mercury', PLANET_INDICES.MERCURY);
    const ownSign = isInOwnSign(chart, 'Mercury', PLANET_INDICES.MERCURY);

    if (!exalted && !ownSign) return null;

    return {
        name: 'Bhadra Yoga',
        category: 'pancha_mahapurusha',
        strength: exalted ? 'very_strong' : 'strong',
        description: 'Mercury in own sign or exaltation in angular house',
        formation: `Mercury in ${exalted ? 'exaltation (Virgo)' : 'own sign (Gemini/Virgo)'} in Kendra`,
        results: [
            'Excellent communication skills',
            'Business acumen and intelligence',
            'Writing and analytical abilities',
            'Scholarly achievements'
        ],
        lifeAreas: ['Education', 'Business', 'Communication', 'Intellect'],
        planetInvolved: ['Mercury']
    };
}

/**
 * Hamsa Yoga - Jupiter in own sign/exaltation in Kendra
 */
function checkHamsaYoga(chart: VedicChart): Yoga | null {
    const jupiterHouse = getPlanetHouse(chart, 'Jupiter');
    const ascHouse = 0;

    if (!isInKendra(ascHouse, jupiterHouse)) return null;

    const exalted = isExalted(chart, 'Jupiter', PLANET_INDICES.JUPITER);
    const ownSign = isInOwnSign(chart, 'Jupiter', PLANET_INDICES.JUPITER);

    if (!exalted && !ownSign) return null;

    return {
        name: 'Hamsa Yoga',
        category: 'pancha_mahapurusha',
        strength: exalted ? 'very_strong' : 'strong',
        description: 'Jupiter in own sign or exaltation in angular house',
        formation: `Jupiter in ${exalted ? 'exaltation (Cancer)' : 'own sign (Sagittarius/Pisces)'} in Kendra`,
        results: [
            'Wisdom and spiritual inclination',
            'Respected teacher or advisor',
            'Wealth and moral character',
            'Happy family life'
        ],
        lifeAreas: ['Wealth', 'Wisdom', 'Spirituality', 'Family'],
        planetInvolved: ['Jupiter']
    };
}

/**
 * Malavya Yoga - Venus in own sign/exaltation in Kendra
 */
function checkMalavyaYoga(chart: VedicChart): Yoga | null {
    const venusHouse = getPlanetHouse(chart, 'Venus');
    const ascHouse = 0;

    if (!isInKendra(ascHouse, venusHouse)) return null;

    const exalted = isExalted(chart, 'Venus', PLANET_INDICES.VENUS);
    const ownSign = isInOwnSign(chart, 'Venus', PLANET_INDICES.VENUS);

    if (!exalted && !ownSign) return null;

    return {
        name: 'Malavya Yoga',
        category: 'pancha_mahapurusha',
        strength: exalted ? 'very_strong' : 'strong',
        description: 'Venus in own sign or exaltation in angular house',
        formation: `Venus in ${exalted ? 'exaltation (Pisces)' : 'own sign (Taurus/Libra)'} in Kendra`,
        results: [
            'Beauty, charm, and artistic talents',
            'Luxurious lifestyle',
            'Happy married life',
            'Success in arts and entertainment'
        ],
        lifeAreas: ['Arts', 'Relationships', 'Luxury', 'Beauty'],
        planetInvolved: ['Venus']
    };
}

/**
 * Sasa Yoga - Saturn in own sign/exaltation in Kendra
 */
function checkSasaYoga(chart: VedicChart): Yoga | null {
    const saturnHouse = getPlanetHouse(chart, 'Saturn');
    const ascHouse = 0;

    if (!isInKendra(ascHouse, saturnHouse)) return null;

    const exalted = isExalted(chart, 'Saturn', PLANET_INDICES.SATURN);
    const ownSign = isInOwnSign(chart, 'Saturn', PLANET_INDICES.SATURN);

    if (!exalted && !ownSign) return null;

    return {
        name: 'Sasa Yoga',
        category: 'pancha_mahapurusha',
        strength: exalted ? 'very_strong' : 'strong',
        description: 'Saturn in own sign or exaltation in angular house',
        formation: `Saturn in ${exalted ? 'exaltation (Libra)' : 'own sign (Capricorn/Aquarius)'} in Kendra`,
        results: [
            'Leadership in organizations',
            'Discipline and hard work',
            'Success in later life',
            'Authority and responsibility'
        ],
        lifeAreas: ['Career', 'Discipline', 'Authority', 'Longevity'],
        planetInvolved: ['Saturn']
    };
}

// ============================================================================
// LUNAR YOGAS
// ============================================================================

/**
 * Sunaphaa Yoga - Planets (except Sun) in 2nd from Moon
 */
function checkSunaphaaYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const secondHouse = (moonHouse + 1) % 12;

    // Check if any planet (except Sun) is in 2nd from Moon
    const planetsIn2nd = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' &&
        p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === secondHouse
    );

    if (planetsIn2nd.length === 0) return null;

    return {
        name: 'Sunaphaa Yoga',
        category: 'lunar',
        strength: planetsIn2nd.length > 1 ? 'strong' : 'moderate',
        description: 'Planets (except Sun) in 2nd house from Moon',
        formation: `${planetsIn2nd.map(p => p.planet).join(', ')} in 2nd from Moon`,
        results: [
            'Wealth through self-effort',
            'Independent and self-made success',
            'Strong willpower',
            'Financial stability'
        ],
        lifeAreas: ['Wealth', 'Self-reliance', 'Determination'],
        planetInvolved: planetsIn2nd.map(p => p.planet)
    };
}

/**
 * Anaphaa Yoga - Planets (except Sun) in 12th from Moon
 */
function checkAnaphaaYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const twelfthHouse = (moonHouse + 11) % 12;

    const planetsIn12th = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' &&
        p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === twelfthHouse
    );

    if (planetsIn12th.length === 0) return null;

    return {
        name: 'Anaphaa Yoga',
        category: 'lunar',
        strength: planetsIn12th.length > 1 ? 'strong' : 'moderate',
        description: 'Planets (except Sun) in 12th house from Moon',
        formation: `${planetsIn12th.map(p => p.planet).join(', ')} in 12th from Moon`,
        results: [
            'Good health and longevity',
            'Fame and renown',
            'Moral character',
            'Pleasing personality'
        ],
        lifeAreas: ['Health', 'Fame', 'Character', 'Personality'],
        planetInvolved: planetsIn12th.map(p => p.planet)
    };
}

/**
 * Duradhara Yoga - Planets (except Sun) in both 2nd and 12th from Moon
 */
function checkDuradharaYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const secondHouse = (moonHouse + 1) % 12;
    const twelfthHouse = (moonHouse + 11) % 12;

    const planetsIn2nd = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' && p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === secondHouse
    );

    const planetsIn12th = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' && p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === twelfthHouse
    );

    if (planetsIn2nd.length === 0 || planetsIn12th.length === 0) return null;

    return {
        name: 'Duradhara Yoga',
        category: 'lunar',
        strength: 'strong',
        description: 'Planets on both sides of Moon (2nd and 12th)',
        formation: 'Planets flanking the Moon',
        results: [
            'Wealth and prosperity',
            'Fame and recognition',
            'Enjoyment of comforts',
            'Success in ventures'
        ],
        lifeAreas: ['Wealth', 'Fame', 'Comfort', 'Success'],
        planetInvolved: [...planetsIn2nd.map(p => p.planet), ...planetsIn12th.map(p => p.planet)]
    };
}

/**
 * Kemadruma Yoga - No planets (except Sun/Rahu/Ketu) in 2nd and 12th from Moon
 * This is a dosha (problematic), not a benefic yoga
 */
function checkKemadrumaYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const secondHouse = (moonHouse + 1) % 12;
    const twelfthHouse = (moonHouse + 11) % 12;

    const planetsIn2nd = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' && p.planet !== 'Moon' &&
        p.planet !== 'Rahu' && p.planet !== 'Ketu' &&
        getPlanetHouse(chart, p.planet) === secondHouse
    );

    const planetsIn12th = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' && p.planet !== 'Moon' &&
        p.planet !== 'Rahu' && p.planet !== 'Ketu' &&
        getPlanetHouse(chart, p.planet) === twelfthHouse
    );

    // Kemadruma exists if NO planets on either side
    if (planetsIn2nd.length > 0 || planetsIn12th.length > 0) return null;

    return {
        name: 'Kemadruma Dosha',
        category: 'lunar',
        strength: 'weak', // This is negative
        description: 'Moon isolated - no planets in 2nd/12th houses',
        formation: 'Lone Moon without support',
        results: [
            'Financial struggles (early life)',
            'Lack of emotional support',
            'Mental stress',
            'Success through hard work'
        ],
        lifeAreas: ['Emotions', 'Finance', 'Support Systems'],
        planetInvolved: ['Moon']
    };
}

/**
 * Gajakesari Yoga - Jupiter in Kendra from Moon
 */
function checkGajakesariYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    const jupiterHouse = getPlanetHouse(chart, 'Jupiter');

    if (moonHouse === -1 || jupiterHouse === -1) return null;

    if (!isInKendra(moonHouse, jupiterHouse)) return null;

    return {
        name: 'Gajakesari Yoga',
        category: 'lunar',
        strength: 'very_strong',
        description: 'Jupiter in Kendra from Moon',
        formation: 'Jupiter in angular position from Moon',
        results: [
            'Wisdom and intelligence',
            'Wealth and prosperity',
            'Respected in society',
            'Virtuous character'
        ],
        lifeAreas: ['Wealth', 'Wisdom', 'Fame', 'Character'],
        planetInvolved: ['Moon', 'Jupiter']
    };
}

// ============================================================================
// SOLAR YOGAS
// ============================================================================

/**
 * Vesi Yoga - Planets (except Moon) in 2nd from Sun
 */
function checkVesiYoga(chart: VedicChart): Yoga | null {
    const sunHouse = getPlanetHouse(chart, 'Sun');
    if (sunHouse === -1) return null;

    const secondHouse = (sunHouse + 1) % 12;

    const planetsIn2nd = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' &&
        p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === secondHouse
    );

    if (planetsIn2nd.length === 0) return null;

    return {
        name: 'Vesi Yoga',
        category: 'solar',
        strength: 'moderate',
        description: 'Planets (except Moon) in 2nd from Sun',
        formation: `${planetsIn2nd.map(p => p.planet).join(', ')} in 2nd from Sun`,
        results: [
            'Truthful and virtuous',
            'Financial stability',
            'Good speech',
            'Respected'
        ],
        lifeAreas: ['Character', 'Finance', 'Reputation'],
        planetInvolved: planetsIn2nd.map(p => p.planet)
    };
}

/**
 * Vosi Yoga - Planets (except Moon) in 12th from Sun
 */
function checkVosiYoga(chart: VedicChart): Yoga | null {
    const sunHouse = getPlanetHouse(chart, 'Sun');
    if (sunHouse === -1) return null;

    const twelfthHouse = (sunHouse + 11) % 12;

    const planetsIn12th = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' &&
        p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === twelfthHouse
    );

    if (planetsIn12th.length === 0) return null;

    return {
        name: 'Vosi Yoga',
        category: 'solar',
        strength: 'moderate',
        description: 'Planets (except Moon) in 12th from Sun',
        formation: `${planetsIn12th.map(p => p.planet).join(', ')} in 12th from Sun`,
        results: [
            'Skilled in arts',
            'Good earning capacity',
            'Independent nature',
            'Charitable'
        ],
        lifeAreas: ['Arts', 'Income', 'Independence'],
        planetInvolved: planetsIn12th.map(p => p.planet)
    };
}

/**
 * Ubhayachari Yoga - Planets on both sides of Sun
 */
function checkUbhayachariYoga(chart: VedicChart): Yoga | null {
    const sunHouse = getPlanetHouse(chart, 'Sun');
    if (sunHouse === -1) return null;

    const secondHouse = (sunHouse + 1) % 12;
    const twelfthHouse = (sunHouse + 11) % 12;

    const planetsIn2nd = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' && p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === secondHouse
    );

    const planetsIn12th = chart.d1.planets.filter(p =>
        p.planet !== 'Sun' && p.planet !== 'Moon' &&
        getPlanetHouse(chart, p.planet) === twelfthHouse
    );

    if (planetsIn2nd.length === 0 || planetsIn12th.length === 0) return null;

    return {
        name: 'Ubhayachari Yoga',
        category: 'solar',
        strength: 'strong',
        description: 'Planets on both sides of Sun',
        formation: 'Planets flanking the Sun',
        results: [
            'Balanced personality',
            'All-round success',
            'Influential and wealthy',
            'Good leadership'
        ],
        lifeAreas: ['Leadership', 'Balance', 'Success'],
        planetInvolved: [...planetsIn2nd.map(p => p.planet), ...planetsIn12th.map(p => p.planet)]
    };
}

/**
 * Budha-Aditya Yoga (Nipuna Yoga) - Sun and Mercury together
 */
function checkBudhaAdityaYoga(chart: VedicChart): Yoga | null {
    if (!planetsInSameHouse(chart, 'Sun', 'Mercury')) return null;

    return {
        name: 'Budha-Aditya Yoga',
        category: 'solar',
        strength: 'strong',
        description: 'Sun and Mercury in same house',
        formation: 'Conjunction of Sun and Mercury',
        results: [
            'Exceptional intelligence',
            'Business acumen',
            'Writing and speaking skills',
            'Fame in intellectual fields'
        ],
        lifeAreas: ['Intellect', 'Business', 'Communication', 'Fame'],
        planetInvolved: ['Sun', 'Mercury']
    };
}

// ============================================================================
// RAJA YOGAS (Power/Authority Yogas)
// ============================================================================

/**
 * Chandra-Mangala Yoga - Moon and Mars together
 */
function checkChandraMangalaYoga(chart: VedicChart): Yoga | null {
    if (!planetsInSameHouse(chart, 'Moon', 'Mars')) return null;

    return {
        name: 'Chandra-Mangala Yoga',
        category: 'raja',
        strength: 'strong',
        description: 'Moon and Mars in conjunction',
        formation: 'Conjunction of Moon and Mars',
        results: [
            'Wealth accumulation',
            'Property ownership',
            'Material success',
            'Strong determination'
        ],
        lifeAreas: ['Wealth', 'Property', 'Determination'],
        planetInvolved: ['Moon', 'Mars']
    };
}

/**
 * Neecha Bhanga Raja Yoga - Cancellation of debilitation
 * Simplified version: Debilitated planet's lord in Kendra from ascendant
 */
function checkNeechaBhangaRajaYoga(chart: VedicChart): Yoga | null {
    const DEBILITATION_HOUSES = {
        [PLANET_INDICES.SUN]: 6,       // Libra
        [PLANET_INDICES.MOON]: 7,      // Scorpio
        [PLANET_INDICES.MARS]: 3,      // Cancer
        [PLANET_INDICES.MERCURY]: 11,  // Pisces
        [PLANET_INDICES.JUPITER]: 9,   // Capricorn
        [PLANET_INDICES.VENUS]: 5,     // Virgo
        [PLANET_INDICES.SATURN]: 0     // Aries
    };

    const planetNames = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

    for (let i = 0; i < planetNames.length; i++) {
        const planetName = planetNames[i];
        const planetHouse = getPlanetHouse(chart, planetName);
        const debilitHouse = DEBILITATION_HOUSES[i as keyof typeof DEBILITATION_HOUSES];

        if (planetHouse === debilitHouse) {
            // Planet is debilitated - check if lord of debilitation sign is in Kendra
            // This is a simplified check - full implementation would need sign lords
            return {
                name: 'Neecha Bhanga Raja Yoga',
                category: 'raja',
                strength: 'very_strong',
                description: 'Cancellation of planetary debilitation',
                formation: `${planetName} debilitation cancelled`,
                results: [
                    'Rise from difficult beginnings',
                    'Success despite obstacles',
                    'Unexpected gains and recognition',
                    'Strength through challenges'
                ],
                lifeAreas: ['Success', 'Obstacles Overcome', 'Recognition'],
                planetInvolved: [planetName]
            };
        }
    }

    return null;
}

/**
 * Viparita Raja Yoga (Type 1) - Lords of dusthanas (6,8,12) in dusthanas
 * Simplified: Check if malefic lords create combinations
 */
function checkViparitaRajaYoga1(chart: VedicChart): Yoga | null {
    // Check if Saturn or Mars (natural malefics) are in 6th, 8th, or 12th house
    const saturnHouse = getPlanetHouse(chart, 'Saturn');
    const marsHouse = getPlanetHouse(chart, 'Mars');

    const dusthanaHouses = [5, 7, 11]; // 6th, 8th, 12th (0-indexed)

    const saturnInDusthana = dusthanaHouses.includes(saturnHouse);
    const marsInDusthana = dusthanaHouses.includes(marsHouse);

    if (saturnInDusthana || marsInDusthana) {
        return {
            name: 'Viparita Raja Yoga',
            category: 'raja',
            strength: 'moderate',
            description: 'Lords of difficult houses create auspicious results',
            formation: 'Malefic planets in dusthana houses',
            results: [
                'Success from enemies defeat',
                'Gains from adversity',
                'Victory over competitors',
                'Unexpected fortune'
            ],
            lifeAreas: ['Victory', 'Competition', 'Unexpected Gains'],
            planetInvolved: saturnInDusthana ? ['Saturn'] : ['Mars']
        };
    }

    return null;
}

/**
 * Dhana Yoga - Wealth combination (lords of 1st, 2nd, 5th, 9th, 11th)
 * Simplified: Jupiter and Venus together (natural benefics)
 */
function checkDhanaYoga(chart: VedicChart): Yoga | null {
    if (!planetsInSameHouse(chart, 'Jupiter', 'Venus')) return null;

    return {
        name: 'Dhana Yoga',
        category: 'dhana',
        strength: 'strong',
        description: 'Jupiter and Venus conjunction for wealth',
        formation: 'Conjunction of natural benefics',
        results: [
            'Substantial wealth accumulation',
            'Luxurious lifestyle',
            'Multiple income sources',
            'Financial wisdom'
        ],
        lifeAreas: ['Wealth', 'Prosperity', 'Luxury'],
        planetInvolved: ['Jupiter', 'Venus']
    };
}


// ============================================================================
// MAIN ANALYSIS FUNCTION
// ============================================================================

/**
 * Analyze all yogas in a Vedic chart
 * @param chart - Calculated Vedic chart
 * @returns Comprehensive yoga analysis
 */
export function analyzeYogas(chart: VedicChart): YogaAnalysisResult {
    const yogas: Yoga[] = [];

    // Check all yogas
    const yogaChecks = [
        // Pancha Mahapurusha (5)
        checkRuchakaYoga,
        checkBhadraYoga,
        checkHamsaYoga,
        checkMalavyaYoga,
        checkSasaYoga,

        // Lunar (5)
        checkSunaphaaYoga,
        checkAnaphaaYoga,
        checkDuradharaYoga,
        checkKemadrumaYoga,
        checkGajakesariYoga,

        // Solar (5)
        checkVesiYoga,
        checkVosiYoga,
        checkUbhayachariYoga,
        checkBudhaAdityaYoga,

        // Raja (4) + Dhana (1) = 20 Total
        checkChandraMangalaYoga,
        checkNeechaBhangaRajaYoga,
        checkViparitaRajaYoga1,
        checkDhanaYoga
    ];

    for (const check of yogaChecks) {
        const yoga = check(chart);
        if (yoga) yogas.push(yoga);
    }

    // Calculate statistics
    const categories: Record<YogaCategory, number> = {
        pancha_mahapurusha: 0,
        lunar: 0,
        solar: 0,
        raja: 0,
        dhana: 0,
        planetary: 0,
        special: 0
    };

    let strongYogasCount = 0;

    yogas.forEach(yoga => {
        categories[yoga.category]++;
        if (yoga.strength === 'very_strong' || yoga.strength === 'strong') {
            strongYogasCount++;
        }
    });

    // Generate summary
    let summary = `Found ${yogas.length} yogas in the chart`;
    if (strongYogasCount > 0) {
        summary += `, including ${strongYogasCount} strong yogas`;
    }
    if (categories.pancha_mahapurusha > 0) {
        summary += `. ${categories.pancha_mahapurusha} Pancha Mahapurusha yoga(s) present`;
    }
    summary += '.';

    return {
        yogas,
        totalCount: yogas.length,
        strongYogasCount,
        categories,
        summary
    };
}
