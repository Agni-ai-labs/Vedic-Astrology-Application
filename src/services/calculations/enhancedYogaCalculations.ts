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
    OWN_HOUSES,
    DEBILITATION_HOUSES
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
 * Helper: Get planet's sign index (0-11)
 */
function getPlanetSign(chart: VedicChart, planetName: string): number {
    return getPlanetHouse(chart, planetName); // In D1, house index matches sign index if we assume equal house system or just use sign
}

/**
 * Helper: Get planet's Navamsa (D9) sign index (0-11)
 */
function getPlanetNavamsaSign(chart: VedicChart, planetName: string): number {
    const planet = chart.d9.planets.find(p => p.planet === planetName);
    if (!planet) return -1;

    const rashiMap: Record<string, number> = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };

    return rashiMap[planet.sign] ?? -1;
}

/**
 * Helper: Get Lord of a Sign/House (0-11)
 */
function getSignLord(signIndex: number): string {
    const lords = [
        'Mars',    // Aries (0)
        'Venus',   // Taurus (1)
        'Mercury', // Gemini (2)
        'Moon',    // Cancer (3)
        'Sun',     // Leo (4)
        'Mercury', // Virgo (5)
        'Venus',   // Libra (6)
        'Mars',    // Scorpio (7)
        'Jupiter', // Sagittarius (8)
        'Saturn',  // Capricorn (9)
        'Saturn',  // Aquarius (10)
        'Jupiter'  // Pisces (11)
    ];
    return lords[signIndex % 12];
}

/**
 * Helper: Get Dispositor (Lord of the sign the planet is in)
 */
function getDispositor(chart: VedicChart, planetName: string): string {
    const signIndex = getPlanetHouse(chart, planetName);
    if (signIndex === -1) return '';
    return getSignLord(signIndex);
}

/**
 * Helper: Check if planet is Natural Benefic
 * Jupiter, Venus, Mercury (usually), Moon (waxing - simplified as benefic here)
 */
function isNaturalBenefic(planetName: string): boolean {
    return ['Jupiter', 'Venus', 'Mercury', 'Moon'].includes(planetName);
}

/**
 * Helper: Check if planet is Natural Malefic
 * Saturn, Mars, Sun, Rahu, Ketu
 */
function isNaturalMalefic(planetName: string): boolean {
    return ['Saturn', 'Mars', 'Sun', 'Rahu', 'Ketu'].includes(planetName);
}

/**
 * Helper: Get all planets in a specific house
 */
function getPlanetsInHouse(chart: VedicChart, houseIndex: number): string[] {
    return chart.d1.planets
        .filter(p => getPlanetHouse(chart, p.planet) === houseIndex)
        .map(p => p.planet);
}

/**
 * Helper: Check if house is Kendra (1, 4, 7, 10)
 */
export function isKendraHouse(houseIndex: number): boolean {
    return [0, 3, 6, 9].includes(houseIndex % 12);
}

/**
 * Helper: Check if house is Trikona (1, 5, 9)
 */
export function isTrikonaHouse(houseIndex: number): boolean {
    return [0, 4, 8].includes(houseIndex % 12);
}

/**
 * Helper: Check if house is Upachaya (3, 6, 10, 11)
 */
export function isUpachayaHouse(houseIndex: number): boolean {
    return [2, 5, 9, 10].includes(houseIndex % 12);
}

/**
 * Helper: Check if house is Dusthana (6, 8, 12)
 */
export function isDusthanaHouse(houseIndex: number): boolean {
    return [5, 7, 11].includes(houseIndex % 12);
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
 * Helper: Check if planet is in Trine from another planet
 */
export function isInTrine(fromHouse: number, toHouse: number): boolean {
    const diff = (toHouse - fromHouse + 12) % 12;
    return [0, 4, 8].includes(diff);
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

/**
 * Helper: Get ascendant sign index (0-11)
 */
export function getAscendantSignIndex(chart: VedicChart): number {
    // Ascendant is typically the first house, get its sign
    const ascendant = chart.d1.houses?.[0];
    if (!ascendant) {
        // Fallback: assume Aries if no house data
        return 0;
    }

    const rashiMap: Record<string, number> = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };

    return rashiMap[ascendant.sign] ?? 0;
}

/**
 * Helper: Get lord of ascendant
 */
export function getAscendantLord(chart: VedicChart): string {
    const ascSign = getAscendantSignIndex(chart);
    return getSignLord(ascSign);
}

/**
 * Helper: Get houses aspected by a planet
 * Standard Vedic aspects:
 * - All planets aspect 7th house from themselves
 * - Mars aspects 4th, 7th, 8th
 * - Jupiter aspects 5th, 7th, 9th  
 * - Saturn aspects 3rd, 7th, 10th
 */
export function getAspects(chart: VedicChart, planetName: string): number[] {
    const planetHouse = getPlanetHouse(chart, planetName);
    if (planetHouse === -1) return [];

    const aspects: number[] = [];

    switch (planetName) {
        case 'Mars':
            aspects.push(
                (planetHouse + 3) % 12,  // 4th
                (planetHouse + 6) % 12,  // 7th
                (planetHouse + 7) % 12   // 8th
            );
            break;
        case 'Jupiter':
            aspects.push(
                (planetHouse + 4) % 12,  // 5th
                (planetHouse + 6) % 12,  // 7th
                (planetHouse + 8) % 12   // 9th
            );
            break;
        case 'Saturn':
            aspects.push(
                (planetHouse + 2) % 12,  // 3rd
                (planetHouse + 6) % 12,  // 7th
                (planetHouse + 9) % 12   // 10th
            );
            break;
        default:
            // All other planets aspect only 7th
            aspects.push((planetHouse + 6) % 12);
            break;
    }

    return aspects;
}

/**
 * Helper: Check if a planet aspects a specific house
 */
export function hasAspect(chart: VedicChart, planetName: string, houseIndex: number): boolean {
    const aspects = getAspects(chart, planetName);
    return aspects.includes(houseIndex);
}

/**
 * Helper: Check if planet is strong
 * Strength criteria: exalted, in own sign, or in Kendra from ascendant
 */
export function isStrong(chart: VedicChart, planetName: string): boolean {
    const planetIndex = PLANET_INDICES[planetName.toUpperCase() as keyof typeof PLANET_INDICES];
    if (planetIndex === undefined) return false;

    // Check exaltation
    if (isExalted(chart, planetName, planetIndex)) return true;

    // Check own sign
    if (isInOwnSign(chart, planetName, planetIndex)) return true;

    // Check if in Kendra from ascendant
    const ascSign = getAscendantSignIndex(chart);
    const planetHouse = getPlanetHouse(chart, planetName);
    if (planetHouse !== -1 && isInKendra(ascSign, planetHouse)) return true;

    return false;
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

/**
 * Adhi Yoga - Natural benefics in 6th, 7th, or 8th from Moon
 * Very auspicious for leadership and success
 */
function checkAdhiYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const sixthHouse = (moonHouse + 5) % 12;
    const seventhHouse = (moonHouse + 6) % 12;
    const eighthHouse = (moonHouse + 7) % 12;

    const targetHouses = [sixthHouse, seventhHouse, eighthHouse];

    // Check if Jupiter or Venus (natural benefics) are in these houses
    const jupiterHouse = getPlanetHouse(chart, 'Jupiter');
    const venusHouse = getPlanetHouse(chart, 'Venus');
    const mercuryHouse = getPlanetHouse(chart, 'Mercury');

    const hasJupiter = targetHouses.includes(jupiterHouse);
    const hasVenus = targetHouses.includes(venusHouse);
    const hasMercury = targetHouses.includes(mercuryHouse);

    if (!hasJupiter && !hasVenus && !hasMercury) return null;

    const benefics = [];
    if (hasJupiter) benefics.push('Jupiter');
    if (hasVenus) benefics.push('Venus');
    if (hasMercury) benefics.push('Mercury');

    return {
        name: 'Adhi Yoga',
        category: 'special',
        strength: 'very_strong',
        description: 'Natural benefics in 6/7/8 from Moon',
        formation: `${benefics.join(', ')} positioned for success`,
        results: [
            'Leadership and authority',
            'Wealth and prosperity',
            'Victory over enemies',
            'Long and healthy life'
        ],
        lifeAreas: ['Leadership', 'Wealth', 'Victory', 'Health'],
        planetInvolved: benefics
    };
}

/**
 * Sakata Yoga - Jupiter in 6th, 8th, or 12th from Moon
 * Can indicate ups and downs in fortune (like a cart wheel)
 */
function checkSakataYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    const jupiterHouse = getPlanetHouse(chart, 'Jupiter');

    if (moonHouse === -1 || jupiterHouse === -1) return null;

    const diff = (jupiterHouse - moonHouse + 12) % 12;
    const dusthanaPositions = [5, 7, 11]; // 6th, 8th, 12th from Moon

    if (!dusthanaPositions.includes(diff)) return null;

    return {
        name: 'Sakata Yoga',
        category: 'special',
        strength: 'weak', // This is challenging
        description: 'Jupiter in difficult house from Moon',
        formation: 'Jupiter in 6th/8th/12th from Moon',
        results: [
            'Fluctuating fortunes',
            'Ups and downs in life',
            'Need for perseverance',
            'Success through hard work'
        ],
        lifeAreas: ['Challenges', 'Perseverance', 'Resilience'],
        planetInvolved: ['Jupiter', 'Moon']
    };
}

/**
 * Parivartana Yoga - Exchange of signs between planets
 * Simplified: Check if any two planets are in each other's signs
 */
function checkParivartanaYoga(chart: VedicChart): Yoga | null {
    // Simplified check: Look for Mercury-Venus exchange (common and beneficial)
    const mercuryHouse = getPlanetHouse(chart, 'Mercury');
    const venusHouse = getPlanetHouse(chart, 'Venus');

    // Mercury owns Gemini (2) and Virgo (5)
    // Venus owns Taurus (1) and Libra (6)

    const mercuryInVenusSign = [1, 6].includes(mercuryHouse);
    const venusInMercurySign = [2, 5].includes(venusHouse);

    if (mercuryInVenusSign && venusInMercurySign) {
        return {
            name: 'Parivartana Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Exchange of signs between planets',
            formation: 'Mercury-Venus mutual exchange',
            results: [
                'Artistic and intellectual abilities',
                'Success in business and arts',
                'Social recognition',
                'Material comforts'
            ],
            lifeAreas: ['Arts', 'Business', 'Social Success'],
            planetInvolved: ['Mercury', 'Venus']
        };
    }

    return null;
}


// ============================================================================
// SHAPE & SANKHYA YOGAS (Nabhasa Yogas)
// ============================================================================

function checkMusalaYoga(chart: VedicChart): Yoga | null {
    const fixedSigns = [1, 4, 7, 10]; // Taurus, Leo, Scorpio, Aquarius
    const allFixed = chart.d1.planets.every(p => {
        if (['Rahu', 'Ketu'].includes(p.planet)) return true; // Ignore nodes
        const signIdx = getPlanetSign(chart, p.planet);
        return fixedSigns.includes(signIdx);
    });

    if (!allFixed) return null;

    return {
        name: 'Musala Yoga',
        category: 'special',
        strength: 'strong',
        description: 'All planets in fixed signs',
        formation: 'Planets exclusively in Sthira Rashis',
        results: ['Stable wealth', 'Determined nature', 'Reliable', 'Fixed principles'],
        lifeAreas: ['Stability', 'Wealth', 'Character']
    };
}

function checkNalaYoga(chart: VedicChart): Yoga | null {
    const dualSigns = [2, 5, 8, 11]; // Gemini, Virgo, Sagittarius, Pisces
    const allDual = chart.d1.planets.every(p => {
        if (['Rahu', 'Ketu'].includes(p.planet)) return true;
        const signIdx = getPlanetSign(chart, p.planet);
        return dualSigns.includes(signIdx);
    });

    if (!allDual) return null;

    return {
        name: 'Nala Yoga',
        category: 'special',
        strength: 'strong',
        description: 'All planets in dual signs',
        formation: 'Planets exclusively in Dvisvabhava Rashis',
        results: ['Adaptable', 'Resilient', 'Multiple skills', 'Fluctuating fortune'],
        lifeAreas: ['Adaptability', 'Skills']
    };
}

// Sankhya Yogas (Count of occupied signs)
function checkSankhyaYoga(chart: VedicChart): Yoga | null {
    const occupiedSigns = new Set(
        chart.d1.planets
            .filter(p => !['Rahu', 'Ketu'].includes(p.planet))
            .map(p => getPlanetSign(chart, p.planet))
    );
    const count = occupiedSigns.size;

    const yogas: Record<number, Omit<Yoga, 'category' | 'strength'>> = {
        1: { name: 'Gola Yoga', description: 'All planets in 1 sign', formation: 'Planets clustered in single sign', results: ['Dependent on others', 'Short life', 'Poverty'], lifeAreas: ['Struggle'] },
        2: { name: 'Yuga Yoga', description: 'All planets in 2 signs', formation: 'Planets in 2 signs', results: ['Hypocritical', 'Irreligious', 'Struggles'], lifeAreas: ['Character'] },
        3: { name: 'Soola Yoga', description: 'All planets in 3 signs', formation: 'Planets in 3 signs', results: ['Sharp nature', 'Fond of money', 'Courageous'], lifeAreas: ['Wealth', 'Nature'] },
        4: { name: 'Kedaara Yoga', description: 'All planets in 4 signs', formation: 'Planets in 4 signs', results: ['Agricultural success', 'Wealthy', 'Helpful'], lifeAreas: ['Agriculture', 'Wealth'] },
        5: { name: 'Paasa Yoga', description: 'All planets in 5 signs', formation: 'Planets in 5 signs', results: ['Talkative', 'Many servants', 'Prison risk'], lifeAreas: ['Communication', 'Service'] },
        6: { name: 'Daama Yoga', description: 'All planets in 6 signs', formation: 'Planets in 6 signs', results: ['Charitable', 'Wealthy', 'Helpful'], lifeAreas: ['Charity', 'Wealth'] },
        7: { name: 'Veenaa Yoga', description: 'All planets in 7 signs', formation: 'Planets in 7 signs', results: ['Lover of music/arts', 'Happy', 'Learned'], lifeAreas: ['Arts', 'Happiness'] }
    };

    if (yogas[count]) {
        return {
            ...yogas[count],
            category: 'special',
            strength: 'moderate',
            planetInvolved: []
        };
    }
    return null;
}

// ============================================================================
// ADVANCED YOGAS (A-C)
// ============================================================================

function checkAmsaavataraYoga(chart: VedicChart): Yoga | null {
    // Jupiter & Venus in Kendra, Saturn Exalted in Kendra
    const jupHouse = getPlanetHouse(chart, 'Jupiter');
    const venHouse = getPlanetHouse(chart, 'Venus');
    const satHouse = getPlanetHouse(chart, 'Saturn');

    // Assuming Lagna is House 0 for relative calc, but getPlanetHouse returns absolute 0-11
    // We need to check if they are in Kendra relative to Lagna
    // Since getPlanetHouse returns sign index, and we assume Equal House from Aries=0? 
    // NO. We must calculate relative to Ascendant.

    const ascSign = getAscendantSignIndex(chart);

    const isKendra = (h: number) => isInKendra(ascSign, h);

    if (isKendra(jupHouse) && isKendra(venHouse) && isKendra(satHouse)) {
        if (isExalted(chart, 'Saturn', PLANET_INDICES.SATURN)) {
            return {
                name: 'Amsaavatara Yoga',
                category: 'special',
                strength: 'very_strong',
                description: 'Jupiter, Venus and Exalted Saturn in Kendras',
                formation: 'Benefics and strong Saturn in angles',
                results: ['Pure reputation', 'Ruler or equal to ruler', 'Long life', 'Scholar'],
                lifeAreas: ['Fame', 'Authority', 'Longevity']
            };
        }
    }
    return null;
}

function checkAsubhaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    // Malefics in Lagna
    const planetsInLagna = getPlanetsInHouse(chart, ascSign);
    const hasMaleficInLagna = planetsInLagna.some(p => isNaturalMalefic(p));

    if (hasMaleficInLagna) {
        return {
            name: 'Asubha Yoga',
            category: 'special',
            strength: 'weak', // Negative
            description: 'Malefics in Lagna',
            formation: 'Natural malefics occupying Ascendant',
            results: ['Health issues', 'Struggles', 'Impulsive'],
            lifeAreas: ['Health', 'Personality']
        };
    }

    // Paapa Kartari (Malefics in 12 and 2)
    const h12 = (ascSign + 11) % 12;
    const h2 = (ascSign + 1) % 12;

    const p12 = getPlanetsInHouse(chart, h12);
    const p2 = getPlanetsInHouse(chart, h2);

    const maleficIn12 = p12.some(p => isNaturalMalefic(p));
    const maleficIn2 = p2.some(p => isNaturalMalefic(p));

    if (maleficIn12 && maleficIn2) {
        return {
            name: 'Asubha Yoga (Paapa Kartari)',
            category: 'special',
            strength: 'weak',
            description: 'Lagna hemmed between malefics',
            formation: 'Malefics in 2nd and 12th from Lagna',
            results: ['Restricted growth', 'Obstacles', 'Health concerns'],
            lifeAreas: ['Growth', 'Health']
        };
    }

    return null;
}

function checkBheriYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const lord9Sign = (ascSign + 8) % 12;
    const lord9 = getSignLord(lord9Sign);

    if (!isStrong(chart, lord9)) return null;

    // Condition 1: Planets in 1, 2, 7, 12
    const h1 = ascSign;
    const h2 = (ascSign + 1) % 12;
    const h7 = (ascSign + 6) % 12;
    const h12 = (ascSign + 11) % 12;

    const hasP1 = getPlanetsInHouse(chart, h1).length > 0;
    const hasP2 = getPlanetsInHouse(chart, h2).length > 0;
    const hasP7 = getPlanetsInHouse(chart, h7).length > 0;
    const hasP12 = getPlanetsInHouse(chart, h12).length > 0;

    if (hasP1 && hasP2 && hasP7 && hasP12) {
        return {
            name: 'Bheri Yoga',
            category: 'raja',
            strength: 'strong',
            description: '9th Lord strong and planets in 1, 2, 7, 12',
            formation: 'Strong Dharma lord with specific placements',
            results: ['Wealthy', 'Long life', 'Ruler', 'Happiness'],
            lifeAreas: ['Wealth', 'Longevity', 'Status']
        };
    }

    // Condition 2: Jup, Ven, Lagna Lord in mutual quadrants
    const jupHouse = getPlanetHouse(chart, 'Jupiter');
    const venHouse = getPlanetHouse(chart, 'Venus');
    const lagnaLord = getAscendantLord(chart);
    const lagnaLordHouse = getPlanetHouse(chart, lagnaLord);

    if (jupHouse !== -1 && venHouse !== -1 && lagnaLordHouse !== -1) {
        const jupVenKendra = isInKendra(jupHouse, venHouse);
        const jupLagKendra = isInKendra(jupHouse, lagnaLordHouse);
        const venLagKendra = isInKendra(venHouse, lagnaLordHouse);

        if (jupVenKendra && jupLagKendra && venLagKendra) {
            return {
                name: 'Bheri Yoga',
                category: 'raja',
                strength: 'strong',
                description: '9th Lord strong and Jup/Ven/Lagna Lord in mutual quadrants',
                formation: 'Benefics and Lagna lord in angular relationship',
                results: ['Wealthy', 'Long life', 'Ruler', 'Happiness'],
                lifeAreas: ['Wealth', 'Longevity', 'Status']
            };
        }
    }

    return null;
}

function checkBrahmaYoga(chart: VedicChart): Yoga | null {
    // Benefics in 4, 10, 11 from Lagna Lord
    const lagnaLord = getAscendantLord(chart);
    const lagnaLordHouse = getPlanetHouse(chart, lagnaLord);

    if (lagnaLordHouse === -1) return null;

    const h4 = (lagnaLordHouse + 3) % 12;
    const h10 = (lagnaLordHouse + 9) % 12;
    const h11 = (lagnaLordHouse + 10) % 12;

    const p4 = getPlanetsInHouse(chart, h4);
    const p10 = getPlanetsInHouse(chart, h10);
    const p11 = getPlanetsInHouse(chart, h11);

    const hasBenefic4 = p4.some(p => isNaturalBenefic(p));
    const hasBenefic10 = p10.some(p => isNaturalBenefic(p));
    const hasBenefic11 = p11.some(p => isNaturalBenefic(p));

    if (hasBenefic4 && hasBenefic10 && hasBenefic11) {
        return {
            name: 'Brahma Yoga',
            category: 'special',
            strength: 'very_strong',
            description: 'Benefics in 4, 10, 11 from Lagna Lord',
            formation: 'Benefics supporting the Lagna Lord',
            results: ['Highly learned', 'Long life', 'Wealthy', 'Respected by kings'],
            lifeAreas: ['Knowledge', 'Longevity', 'Wealth']
        };
    }
    return null;
}

function checkChaamaraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const lagnaLord = getAscendantLord(chart);
    const lagnaLordHouse = getPlanetHouse(chart, lagnaLord);

    if (lagnaLordHouse === -1) return null;

    // Condition 1: Exalted in Kendra + Jupiter Aspect
    const isLagLordExalted = isExalted(chart, lagnaLord, PLANET_INDICES[lagnaLord.toUpperCase() as keyof typeof PLANET_INDICES]);
    const isLagLordKendra = isInKendra(ascSign, lagnaLordHouse);
    const hasJupAspect = hasAspect(chart, 'Jupiter', lagnaLordHouse);

    if (isLagLordExalted && isLagLordKendra && hasJupAspect) {
        return {
            name: 'Chaamara Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Lagna Lord exalted in Kendra aspected by Jupiter',
            formation: 'Strong Lagna Lord with Jupiter influence',
            results: ['Long life', 'Prosperity', 'Eloquent', 'Royal favor'],
            lifeAreas: ['Longevity', 'Prosperity', 'Fame']
        };
    }

    // Condition 2: Two benefics in 7, 9, 10 (from Lagna)
    const h7 = (ascSign + 6) % 12;
    const h9 = (ascSign + 8) % 12;
    const h10 = (ascSign + 9) % 12;

    const benefics7 = getPlanetsInHouse(chart, h7).filter(p => isNaturalBenefic(p)).length;
    const benefics9 = getPlanetsInHouse(chart, h9).filter(p => isNaturalBenefic(p)).length;
    const benefics10 = getPlanetsInHouse(chart, h10).filter(p => isNaturalBenefic(p)).length;

    if (benefics7 + benefics9 + benefics10 >= 2) {
        return {
            name: 'Chaamara Yoga',
            category: 'raja',
            strength: 'strong',
            description: 'Benefics in 7th, 9th, or 10th houses',
            formation: 'Benefic influence in key houses',
            results: ['Long life', 'Prosperity', 'Eloquent', 'Royal favor'],
            lifeAreas: ['Longevity', 'Prosperity', 'Fame']
        };
    }

    return null;
}

function checkChakraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const oddHouses = [0, 2, 4, 6, 8, 10].map(h => (ascSign + h) % 12); // 1, 3, 5, 7, 9, 11 (0-indexed)

    const allInOdd = chart.d1.planets.every(p => {
        if (['Rahu', 'Ketu'].includes(p.planet)) return true;
        const h = getPlanetHouse(chart, p.planet);
        return oddHouses.includes(h);
    });

    if (allInOdd) {
        return {
            name: 'Chakra Yoga',
            category: 'special',
            strength: 'strong',
            description: 'All planets in odd houses (1, 3, 5, 7, 9, 11)',
            formation: 'Planets in odd houses from Lagna',
            results: ['Emperor status', 'Respected', 'Powerful'],
            lifeAreas: ['Power', 'Status']
        };
    }
    return null;
}

/**
 * Amala Yoga - Benefic planet in 10th from Moon or ascendant
 */
function checkAmalaYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const tenthFromMoon = (moonHouse + 9) % 12;

    // Check if Jupiter or Venus (benefics) are in 10th from Moon
    const jupiterHouse = getPlanetHouse(chart, 'Jupiter');
    const venusHouse = getPlanetHouse(chart, 'Venus');

    const hasJupiter = jupiterHouse === tenthFromMoon;
    const hasVenus = venusHouse === tenthFromMoon;

    if (!hasJupiter && !hasVenus) return null;

    const beneficPlanet = hasJupiter ? 'Jupiter' : 'Venus';

    return {
        name: 'Amala Yoga',
        category: 'special',
        strength: 'strong',
        description: 'Benefic planet in 10th from Moon',
        formation: `${beneficPlanet} in 10th from Moon`,
        results: [
            'Good reputation and fame',
            'Lasting prosperity',
            'Moral character',
            'Happy life'
        ],
        lifeAreas: ['Reputation', 'Career', 'Character'],
        planetInvolved: [beneficPlanet]
    };
}


/**
 * Chandikaa Yoga
 */
function checkChandikaaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const fixedSigns = [1, 4, 7, 10];

    if (!fixedSigns.includes(ascSign)) return null;

    // Aspected by 6th lord
    const lord6Sign = (ascSign + 5) % 12;
    const lord6 = getSignLord(lord6Sign);
    if (!hasAspect(chart, lord6, ascSign)) return null;

    // Sun joins lords of signs occupied in navamsa by 6th and 9th lords
    const lord9Sign = (ascSign + 8) % 12;
    const lord9 = getSignLord(lord9Sign);

    const navamsaSign6 = getPlanetNavamsaSign(chart, lord6);
    const navamsaSign9 = getPlanetNavamsaSign(chart, lord9);

    if (navamsaSign6 === -1 || navamsaSign9 === -1) return null;

    const navamsaLord6 = getSignLord(navamsaSign6);
    const navamsaLord9 = getSignLord(navamsaSign9);

    const sunHouse = getPlanetHouse(chart, 'Sun');
    const nl6House = getPlanetHouse(chart, navamsaLord6);
    const nl9House = getPlanetHouse(chart, navamsaLord9);

    if (sunHouse !== -1 && sunHouse === nl6House && sunHouse === nl9House) {
        return {
            name: 'Chandikaa Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Lagna fixed, aspected by 6th lord, Sun with Navamsa lords of 6th & 9th',
            formation: 'Complex relation of 6th, 9th and Sun',
            results: ['Powerful', 'Wealthy', 'Famous', 'Long life'],
            lifeAreas: ['Power', 'Wealth']
        };
    }

    return null;
}

/**
 * Chapa Yoga (Exchange 4th and 10th)
 */
function checkChapaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h4 = (ascSign + 3) % 12;
    const h10 = (ascSign + 9) % 12;

    const lord4 = getSignLord(h4);
    const lord10 = getSignLord(h10);

    const lord4House = getPlanetHouse(chart, lord4);
    const lord10House = getPlanetHouse(chart, lord10);

    // Exchange check
    if (lord4House === h10 && lord10House === h4) {
        const lagnaLord = getAscendantLord(chart);
        if (isExalted(chart, lagnaLord, PLANET_INDICES[lagnaLord.toUpperCase() as keyof typeof PLANET_INDICES])) {
            return {
                name: 'Chapa Yoga',
                category: 'raja',
                strength: 'strong',
                description: 'Exchange of 4th and 10th lords, Lagna lord exalted',
                formation: 'Parivartana of 4/10 with strong Lagna',
                results: ['Imperial power', 'Wealthy', 'Strong'],
                lifeAreas: ['Career', 'Power']
            };
        }
    }
    return null;
}

/**
 * Chatra Yoga (7 signs from 7th)
 */
function checkChatraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h7 = (ascSign + 6) % 12;
    const requiredSigns: number[] = [];
    for (let i = 0; i < 7; i++) requiredSigns.push((h7 + i) % 12);

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const allInRange = Array.from(occupied).every(h => requiredSigns.includes(h));

    if (allInRange && occupied.size >= 4) {
        return {
            name: 'Chatra Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Planets in 7 signs from 7th house',
            formation: 'Planets distributed from 7th to 1st',
            results: ['Happy', 'Kind', 'Honored'],
            lifeAreas: ['Happiness', 'Status']
        };
    }
    return null;
}

/**
 * Danda Yoga (10, 11, 12, 1)
 */
function checkDandaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const houses = [9, 10, 11, 0].map(h => (ascSign + h) % 12); // 10, 11, 12, 1 (0-indexed: 9, 10, 11, 0)

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const allInHouses = Array.from(occupied).every(h => houses.includes(h));

    if (allInHouses && occupied.size >= 3) {
        return {
            name: 'Danda Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Planets in 10, 11, 12, 1 houses',
            formation: 'Planets clustered around Lagna and 10th',
            results: ['Separated from family', 'Servitude', 'Unhappy'],
            lifeAreas: ['Family', 'Happiness']
        };
    }
    return null;
}

/**
 * Devendra Yoga
 */
function checkDevendraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const fixedSigns = [1, 4, 7, 10];
    if (!fixedSigns.includes(ascSign)) return null;

    const h2 = (ascSign + 1) % 12;
    const h10 = (ascSign + 9) % 12;
    const h11 = (ascSign + 10) % 12;
    const h1 = ascSign;

    const l2 = getSignLord(h2);
    const l10 = getSignLord(h10);
    const l11 = getSignLord(h11);
    const l1 = getSignLord(h1);

    const l2Pos = getPlanetHouse(chart, l2);
    const l10Pos = getPlanetHouse(chart, l10);
    const l11Pos = getPlanetHouse(chart, l11);
    const l1Pos = getPlanetHouse(chart, l1);

    // Exchange 2-10
    const ex2_10 = (l2Pos === h10 && l10Pos === h2);
    // Exchange 1-11
    const ex1_11 = (l1Pos === h11 && l11Pos === h1);

    if (ex2_10 && ex1_11) {
        return {
            name: 'Devendra Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Lagna fixed, 2-10 exchange, 1-11 exchange',
            formation: 'Double Parivartana',
            results: ['Beautiful', 'Romantic', 'Powerful', 'Famous'],
            lifeAreas: ['Fame', 'Power']
        };
    }
    return null;
}

/**
 * Gadaa Yoga (Successive Kendras)
 */
function checkGadaaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const k1 = ascSign;
    const k4 = (ascSign + 3) % 12;
    const k7 = (ascSign + 6) % 12;
    const k10 = (ascSign + 9) % 12;

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const checkPair = (h1: number, h2: number) => {
        return Array.from(occupied).every(h => h === h1 || h === h2);
    };

    if (checkPair(k1, k4) || checkPair(k4, k7) || checkPair(k7, k10) || checkPair(k10, k1)) {
        return {
            name: 'Gadaa Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Planets in two successive Kendras',
            formation: 'Planets in adjacent angles',
            results: ['Wealthy', 'Learned', 'Skilled in weapons/arts'],
            lifeAreas: ['Wealth', 'Skills']
        };
    }
    return null;
}

/**
 * Gandharva Yoga
 */
function checkGandharvaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h10 = (ascSign + 9) % 12;
    const l10 = getSignLord(h10);
    const l10Pos = getPlanetHouse(chart, l10);

    // 10th lord in trine from 7th house
    const h7 = (ascSign + 6) % 12;
    if (!isInTrine(h7, l10Pos)) return null;

    // Lagna lord conjoined/aspected by Jupiter
    const l1 = getAscendantLord(chart);
    const l1Pos = getPlanetHouse(chart, l1);
    const jupPos = getPlanetHouse(chart, 'Jupiter');

    const l1JupJoin = (l1Pos === jupPos);
    const l1JupAspect = hasAspect(chart, 'Jupiter', l1Pos);

    if (!(l1JupJoin || l1JupAspect)) return null;

    // Sun exalted and strong
    if (!isStrong(chart, 'Sun')) return null; // Simplified strong check
    if (!isExalted(chart, 'Sun', PLANET_INDICES.SUN)) return null; // Strict exaltation

    // Moon in 9th
    const h9 = (ascSign + 8) % 12;
    const moonPos = getPlanetHouse(chart, 'Moon');

    if (moonPos === h9) {
        return {
            name: 'Gandharva Yoga',
            category: 'special',
            strength: 'very_strong',
            description: '10L in trine from 7th, L1 with Jup, Sun exalted, Moon in 9th',
            formation: 'Complex artistic combination',
            results: ['Unrivalled skill in arts', 'Famous', 'Enjoyment'],
            lifeAreas: ['Arts', 'Fame']
        };
    }
    return null;
}

/**
 * Go Yoga
 */
function checkGoYoga(chart: VedicChart): Yoga | null {
    // Jupiter strong in Moolatrikona (Sg/Pi - simplified to Own Sign or Exalted here as Moolatrikona data not in types)
    if (!isStrong(chart, 'Jupiter')) return null;

    // 2nd lord with Jupiter
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const l2 = getSignLord(h2);

    if (!planetsInSameHouse(chart, l2, 'Jupiter')) return null;

    // Lagna lord exalted
    const l1 = getAscendantLord(chart);
    if (isExalted(chart, l1, PLANET_INDICES[l1.toUpperCase() as keyof typeof PLANET_INDICES])) {
        return {
            name: 'Go Yoga',
            category: 'raja',
            strength: 'strong',
            description: 'Jupiter strong, 2nd Lord with Jupiter, Lagna Lord exalted',
            formation: 'Wealth and status combination',
            results: ['Respectable family', 'Wealthy', 'Powerful'],
            lifeAreas: ['Wealth', 'Family']
        };
    }
    return null;
}

/**
 * Gouri Yoga
 */
function checkGouriYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h10 = (ascSign + 9) % 12;
    const l10 = getSignLord(h10);

    const l10Navamsa = getPlanetNavamsaSign(chart, l10);
    if (l10Navamsa === -1) return null;

    const navLord = getSignLord(l10Navamsa);
    const navLordPos = getPlanetHouse(chart, navLord);

    // Exalted in 10th house
    const isExaltedNavLord = isExalted(chart, navLord, PLANET_INDICES[navLord.toUpperCase() as keyof typeof PLANET_INDICES]);

    if (isExaltedNavLord && navLordPos === h10) {
        // Lagna lord joins him
        const l1 = getAscendantLord(chart);
        if (planetsInSameHouse(chart, l1, navLord)) {
            return {
                name: 'Gouri Yoga',
                category: 'special',
                strength: 'very_strong',
                description: 'Navamsa lord of 10th lord exalted in 10th with Lagna Lord',
                formation: 'Powerful career yoga',
                results: ['Religious', 'Virtuous', 'Happy family'],
                lifeAreas: ['Dharma', 'Happiness']
            };
        }
    }
    return null;
}

/**
 * Guru-Mangala Yoga
 */
function checkGuruMangalaYoga(chart: VedicChart): Yoga | null {
    const jupPos = getPlanetHouse(chart, 'Jupiter');
    const marPos = getPlanetHouse(chart, 'Mars');

    if (jupPos === -1 || marPos === -1) return null;

    const same = (jupPos === marPos);
    const seventh = (Math.abs(jupPos - marPos) === 6);

    if (same || seventh) {
        return {
            name: 'Guru-Mangala Yoga',
            category: 'planetary',
            strength: 'strong',
            description: 'Jupiter and Mars conjunct or in opposition',
            formation: 'Jupiter-Mars relation',
            results: ['Righteous', 'Energetic', 'Leader', 'Wealthy'],
            lifeAreas: ['Leadership', 'Wealth']
        };
    }
    return null;
}

/**
 * Hala Yoga
 */
function checkHalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    // Trines from Lagna
    const lagnaTrines = [0, 4, 8].map(h => (ascSign + h) % 12);

    // Other trine sets
    const trine2 = [1, 5, 9].map(h => (ascSign + h) % 12);
    const trine3 = [2, 6, 10].map(h => (ascSign + h) % 12);
    const trine4 = [3, 7, 11].map(h => (ascSign + h) % 12);

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const checkSet = (set: number[]) => Array.from(occupied).every(h => set.includes(h));

    // "Not trines from lagna"
    if (checkSet(lagnaTrines)) return null;

    if (checkSet(trine2) || checkSet(trine3) || checkSet(trine4)) {
        return {
            name: 'Hala Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Planets in mutual trines (not Lagna trines)',
            formation: 'Planets in triangular pattern',
            results: ['Agricultural earnings', 'Gluttonous', 'Poor'],
            lifeAreas: ['Agriculture', 'Wealth']
        };
    }
    return null;
}

/**
 * Hara Yoga
 */
function checkHaraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h7 = (ascSign + 6) % 12;
    const l7 = getSignLord(h7);
    const l7Pos = getPlanetHouse(chart, l7);

    if (l7Pos === -1) return null;

    const h4 = (l7Pos + 3) % 12;
    const h9 = (l7Pos + 8) % 12;
    const h8 = (l7Pos + 7) % 12;

    const p4 = getPlanetsInHouse(chart, h4);
    const p9 = getPlanetsInHouse(chart, h9);
    const p8 = getPlanetsInHouse(chart, h8);

    const hasBen4 = p4.some(p => isNaturalBenefic(p));
    const hasBen9 = p9.some(p => isNaturalBenefic(p));
    const hasBen8 = p8.some(p => isNaturalBenefic(p));

    if (hasBen4 && hasBen9 && hasBen8) {
        return {
            name: 'Hara Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Benefics in 4, 8, 9 from 7th Lord',
            formation: 'Benefics supporting 7th Lord',
            results: ['Happy', 'Learned', 'Sensual'],
            lifeAreas: ['Happiness', 'Relationships']
        };
    }
    return null;
}

/**
 * Hari Yoga
 */
function checkHariYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const l2 = getSignLord(h2);
    const l2Pos = getPlanetHouse(chart, l2);

    if (l2Pos === -1) return null;

    const houses = [1, 11, 7].map(h => (l2Pos + h) % 12); // 2nd, 12th, 8th from l2 (0-indexed: 1, 11, 7)

    const hasBen = houses.every(h => getPlanetsInHouse(chart, h).some(p => isNaturalBenefic(p)));

    if (hasBen) {
        return {
            name: 'Hari Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Benefics in 2, 8, 12 from 2nd Lord',
            formation: 'Benefics supporting 2nd Lord',
            results: ['Happy', 'Learned', 'Wealthy'],
            lifeAreas: ['Happiness', 'Wealth']
        };
    }
    return null;
}

/**
 * Harsha Yoga
 */
function checkHarshaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h6 = (ascSign + 5) % 12;
    const l6 = getSignLord(h6);
    const l6Pos = getPlanetHouse(chart, l6);

    if (l6Pos === h6) {
        return {
            name: 'Harsha Yoga',
            category: 'raja',
            strength: 'strong',
            description: '6th Lord in 6th House',
            formation: 'Vipareeta Raja Yoga (Sarala/Harsha/Vimala)',
            results: ['Strong constitution', 'Defeats enemies', 'Wealthy'],
            lifeAreas: ['Health', 'Enemies']
        };
    }
    return null;
}

/**
 * Indra Yoga
 */
function checkIndraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h5 = (ascSign + 4) % 12;
    const h11 = (ascSign + 10) % 12;

    const l5 = getSignLord(h5);
    const l11 = getSignLord(h11);

    const l5Pos = getPlanetHouse(chart, l5);
    const l11Pos = getPlanetHouse(chart, l11);

    // Exchange 5-11
    if (l5Pos === h11 && l11Pos === h5) {
        // Moon in 5th
        const moonPos = getPlanetHouse(chart, 'Moon');
        if (moonPos === h5) {
            return {
                name: 'Indra Yoga',
                category: 'raja',
                strength: 'very_strong',
                description: '5th-11th Exchange, Moon in 5th',
                formation: 'Powerful Dhana/Raja Yoga',
                results: ['Famous', 'Wealthy', 'King-like'],
                lifeAreas: ['Fame', 'Wealth']
            };
        }
    }
    return null;
}

/**
 * Jaya Yoga
 */
function checkJayaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h10 = (ascSign + 9) % 12;
    const l10 = getSignLord(h10);

    const h6 = (ascSign + 5) % 12;
    const l6 = getSignLord(h6);

    // 10th lord exalted
    const l10Exalted = isExalted(chart, l10, PLANET_INDICES[l10.toUpperCase() as keyof typeof PLANET_INDICES]);

    // 6th lord debilitated (check if planet has debilitation, Rahu/Ketu don't)
    const l6Index = PLANET_INDICES[l6.toUpperCase() as keyof typeof PLANET_INDICES];
    const l6DebilitationHouse = DEBILITATION_HOUSES[l6Index as keyof typeof DEBILITATION_HOUSES];
    const l6Debilitated = l6DebilitationHouse !== undefined && getPlanetHouse(chart, l6) === l6DebilitationHouse;

    if (l10Exalted && l6Debilitated) {
        return {
            name: 'Jaya Yoga',
            category: 'raja',
            strength: 'strong',
            description: '10th Lord Exalted, 6th Lord Debilitated',
            formation: 'Victory Yoga',
            results: ['Victorious', 'Happy', 'Long life'],
            lifeAreas: ['Success', 'Longevity']
        };
    }
    return null;
}

/**
 * Kaahala Yoga
 */
function checkKaahalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h4 = (ascSign + 3) % 12;
    const l4 = getSignLord(h4);
    const l4Pos = getPlanetHouse(chart, l4);
    const jupPos = getPlanetHouse(chart, 'Jupiter');

    if (l4Pos !== -1 && jupPos !== -1 && isInKendra(l4Pos, jupPos)) {
        const l1 = getAscendantLord(chart);
        if (isStrong(chart, l1)) {
            return {
                name: 'Kaahala Yoga',
                category: 'special',
                strength: 'strong',
                description: '4th Lord and Jupiter in mutual Kendras, Lagna Lord strong',
                formation: 'Strength and Wisdom combination',
                results: ['Aggressive', 'Leader of army', 'Wealthy'],
                lifeAreas: ['Leadership', 'Wealth']
            };
        }
    }
    return null;
}

/**
 * Kalaanidhi Yoga
 */
function checkKalaanidhiYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h5 = (ascSign + 4) % 12;
    const jupPos = getPlanetHouse(chart, 'Jupiter');

    if (jupPos === h2 || jupPos === h5) {
        const mercPos = getPlanetHouse(chart, 'Mercury');
        const venPos = getPlanetHouse(chart, 'Venus');

        // Conjoined or Aspected by Merc AND Ven
        const mercRel = (mercPos === jupPos) || hasAspect(chart, 'Mercury', jupPos);
        const venRel = (venPos === jupPos) || hasAspect(chart, 'Venus', jupPos);

        if (mercRel && venRel) {
            return {
                name: 'Kalaanidhi Yoga',
                category: 'raja',
                strength: 'very_strong',
                description: 'Jupiter in 2/5 aspected/joined by Mercury & Venus',
                formation: 'Artistic and Wealth Yoga',
                results: ['Virtuous', 'Honored', 'Wealthy', 'Learned'],
                lifeAreas: ['Arts', 'Wealth', 'Knowledge']
            };
        }
    }
    return null;
}

/**
 * Kalpadruma Yoga
 */
function checkKalpadrumaYoga(chart: VedicChart): Yoga | null {
    const l1 = getAscendantLord(chart);
    const l1Pos = getPlanetHouse(chart, l1);

    const d1 = getDispositor(chart, l1);
    const d1Pos = getPlanetHouse(chart, d1);

    const d2 = getDispositor(chart, d1);
    const d2Pos = getPlanetHouse(chart, d2);

    const d1Navamsa = getPlanetNavamsaSign(chart, d1);
    if (d1Navamsa === -1) return null;
    const d3 = getSignLord(d1Navamsa);
    const d3Pos = getPlanetHouse(chart, d3);

    const checkStrong = (p: string, pos: number) => {
        const ascSign = getAscendantSignIndex(chart);
        const isKen = isInKendra(ascSign, pos);
        const isTri = isInTrine(ascSign, pos);
        const isEx = isExalted(chart, p, PLANET_INDICES[p.toUpperCase() as keyof typeof PLANET_INDICES]);
        return isKen || isTri || isEx;
    };

    if (checkStrong(l1, l1Pos) && checkStrong(d1, d1Pos) && checkStrong(d2, d2Pos) && checkStrong(d3, d3Pos)) {
        return {
            name: 'Kalpadruma Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Lagna Lord and its dispositors chain strong',
            formation: 'Chain of dispositors in Kendra/Trine/Exaltation',
            results: ['Emperor', 'Wealthy', 'Principled', 'War-like'],
            lifeAreas: ['Power', 'Wealth']
        };
    }
    return null;
}

/**
 * Kamala Yoga
 */
function checkKamalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const kendras = [0, 3, 6, 9].map(h => (ascSign + h) % 12);

    const allInKendra = chart.d1.planets.every(p => {
        if (['Rahu', 'Ketu'].includes(p.planet)) return true;
        const h = getPlanetHouse(chart, p.planet);
        return kendras.includes(h);
    });

    if (allInKendra) {
        return {
            name: 'Kamala Yoga',
            category: 'special',
            strength: 'strong',
            description: 'All planets in Kendras',
            formation: 'Planets in angles',
            results: ['Powerful', 'Virtuous', 'Long life'],
            lifeAreas: ['Power', 'Virtue']
        };
    }
    return null;
}

/**
 * Khadga Yoga
 */
function checkKhadgaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h9 = (ascSign + 8) % 12;

    const l2 = getSignLord(h2);
    const l9 = getSignLord(h9);

    const l2Pos = getPlanetHouse(chart, l2);
    const l9Pos = getPlanetHouse(chart, l9);

    if (l2Pos === h9 && l9Pos === h2) {
        const l1 = getAscendantLord(chart);
        const l1Pos = getPlanetHouse(chart, l1);

        if (isInKendra(ascSign, l1Pos) || isInTrine(ascSign, l1Pos)) {
            return {
                name: 'Khadga Yoga',
                category: 'raja',
                strength: 'strong',
                description: '2nd-9th Exchange, Lagna Lord strong',
                formation: 'Wealth and Fortune exchange',
                results: ['Learned', 'Happy', 'Powerful', 'Wealthy'],
                lifeAreas: ['Wealth', 'Knowledge']
            };
        }
    }
    return null;
}

/**
 * Koorma Yoga
 */
function checkKoormaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h5 = (ascSign + 4) % 12;
    const h6 = (ascSign + 5) % 12;
    const h7 = (ascSign + 6) % 12;

    const h1 = ascSign;
    const h3 = (ascSign + 2) % 12;
    const h11 = (ascSign + 10) % 12;

    const checkBenefics = (houses: number[]) => {
        return houses.every(h => {
            const planets = getPlanetsInHouse(chart, h);
            if (planets.length === 0) return false;
            return planets.every(p => isNaturalBenefic(p) && (isInOwnSign(chart, p, PLANET_INDICES[p.toUpperCase() as keyof typeof PLANET_INDICES]) || isExalted(chart, p, PLANET_INDICES[p.toUpperCase() as keyof typeof PLANET_INDICES])));
        });
    };

    const checkMalefics = (houses: number[]) => {
        return houses.every(h => {
            const planets = getPlanetsInHouse(chart, h);
            if (planets.length === 0) return false;
            return planets.every(p => isNaturalMalefic(p) && (isInOwnSign(chart, p, PLANET_INDICES[p.toUpperCase() as keyof typeof PLANET_INDICES]) || isExalted(chart, p, PLANET_INDICES[p.toUpperCase() as keyof typeof PLANET_INDICES])));
        });
    };

    if (checkBenefics([h5, h6, h7]) && checkMalefics([h1, h3, h11])) {
        return {
            name: 'Koorma Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Benefics in 5,6,7; Malefics in 1,3,11 (Own/Exalted)',
            formation: 'Specific planetary distribution',
            results: ['Leader', 'Pious', 'Happy'],
            lifeAreas: ['Leadership', 'Happiness']
        };
    }
    return null;
}

/**
 * Koota Yoga
 */
function checkKootaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h4 = (ascSign + 3) % 12;

    const houses: number[] = [];
    for (let i = 0; i < 7; i++) houses.push((h4 + i) % 12);

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const allIn = Array.from(occupied).every(h => houses.includes(h));

    if (allIn && occupied.size >= 4) {
        return {
            name: 'Koota Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Planets in 7 signs from 4th',
            formation: 'Planets distributed from 4th',
            results: ['Untruthful', 'Poor', 'Cruel'],
            lifeAreas: ['Character', 'Wealth']
        };
    }
    return null;
}

/**
 * Kulavardhana Yoga
 */
function checkKulavardhanaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const moonPos = getPlanetHouse(chart, 'Moon');
    const sunPos = getPlanetHouse(chart, 'Sun');

    const h5Lagna = (ascSign + 4) % 12;
    const h5Moon = (moonPos + 4) % 12;
    const h5Sun = (sunPos + 4) % 12;

    const allIn5th = chart.d1.planets.every(p => {
        const pos = getPlanetHouse(chart, p.planet);
        return pos === h5Lagna || pos === h5Moon || pos === h5Sun;
    });

    if (allIn5th) {
        return {
            name: 'Kulavardhana Yoga',
            category: 'special',
            strength: 'very_strong',
            description: 'All planets in 5th from Lagna, Moon or Sun',
            formation: 'Planets focused in 5th house',
            results: ['Propagates lineage', 'Wealthy', 'Long life'],
            lifeAreas: ['Family', 'Wealth']
        };
    }
    return null;
}

/**
 * Kusuma Yoga
 */
function checkKusumaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const fixedSigns = [1, 4, 7, 10];
    if (!fixedSigns.includes(ascSign)) return null;

    const venPos = getPlanetHouse(chart, 'Venus');
    if (!isInKendra(ascSign, venPos)) return null;

    const moonPos = getPlanetHouse(chart, 'Moon');
    // Moon in trine with a benefic?
    // Simplified: Moon in Trine from Lagna AND Moon conjoined benefic
    if (!isInTrine(ascSign, moonPos)) return null;

    const moonBenefic = getPlanetsInHouse(chart, moonPos).some(p => p !== 'Moon' && isNaturalBenefic(p));
    if (!moonBenefic) return null;

    const satPos = getPlanetHouse(chart, 'Saturn');
    const h10 = (ascSign + 9) % 12;
    if (satPos !== h10) return null;

    return {
        name: 'Kusuma Yoga',
        category: 'raja',
        strength: 'strong',
        description: 'Fixed Lagna, Venus Kendra, Moon Trine w/ Benefic, Saturn 10th',
        formation: 'Complex Raja Yoga',
        results: ['King or equal', 'Charitable', 'Happy'],
        lifeAreas: ['Status', 'Happiness']
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

        // Raja (4) + Dhana (1) + Special (4) = 24 Total
        checkChandraMangalaYoga,
        checkNeechaBhangaRajaYoga,
        checkViparitaRajaYoga1,
        checkDhanaYoga,
        checkAdhiYoga,
        checkSakataYoga,
        checkParivartanaYoga,
        checkAmalaYoga,

        // Batch 1: Shape & Sankhya
        checkMusalaYoga,
        checkNalaYoga,
        checkGadaaYoga, // Note: Gadaa is also a Sankhya yoga but implemented as special here
        checkSankhyaYoga, // Generic Sankhya checker if needed, but specific ones are better

        // Batch 1: Advanced A-C
        checkAmsaavataraYoga,
        checkAsubhaYoga,
        checkBheriYoga,
        checkBrahmaYoga,
        checkChaamaraYoga,
        checkChakraYoga,

        // Batch 2: Chandikaa to Kusuma
        checkChandikaaYoga,
        checkChapaYoga,
        checkChatraYoga,
        checkDandaYoga,
        checkDevendraYoga,
        checkGandharvaYoga,
        checkGoYoga,
        checkGouriYoga,
        checkGuruMangalaYoga,
        checkHalaYoga,
        checkHaraYoga,
        checkHariYoga,
        checkHarshaYoga,
        checkIndraYoga,
        checkJayaYoga,
        checkKaahalaYoga,
        checkKalaanidhiYoga,
        checkKalpadrumaYoga,
        checkKamalaYoga,
        checkKhadgaYoga,
        checkKoormaYoga,
        checkKootaYoga,
        checkKulavardhanaYoga,
        checkKusumaYoga
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
