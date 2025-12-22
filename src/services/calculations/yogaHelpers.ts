import { VedicChart } from '@/types/vedic.types';
import { PLANET_INDICES, EXALTATION_HOUSES, OWN_HOUSES } from '@/types/yoga.types';

/**
 * Get house index (0-11) for a planet
 */
export function getPlanetHouse(chart: VedicChart, planetName: string): number {
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
 * Get planet's sign index (0-11)
 */
export function getPlanetSign(chart: VedicChart, planetName: string): number {
    return getPlanetHouse(chart, planetName);
}

/**
 * Get planet's Navamsa (D9) sign index (0-11)
 */
export function getPlanetNavamsaSign(chart: VedicChart, planetName: string): number {
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
 * Get Lord of a Sign/House (0-11)
 */
export function getSignLord(signIndex: number): string {
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
 * Get Dispositor (Lord of the sign the planet is in)
 */
export function getDispositor(chart: VedicChart, planetName: string): string {
    const signIndex = getPlanetHouse(chart, planetName);
    if (signIndex === -1) return '';
    return getSignLord(signIndex);
}

/**
 * Check if planet is Natural Benefic
 */
export function isNaturalBenefic(planetName: string): boolean {
    return ['Jupiter', 'Venus', 'Mercury', 'Moon'].includes(planetName);
}

/**
 * Check if planet is Natural Malefic
 */
export function isNaturalMalefic(planetName: string): boolean {
    return ['Saturn', 'Mars', 'Sun', 'Rahu', 'Ketu'].includes(planetName);
}

/**
 * Get all planets in a specific house
 */
export function getPlanetsInHouse(chart: VedicChart, houseIndex: number): string[] {
    return chart.d1.planets
        .filter(p => getPlanetHouse(chart, p.planet) === houseIndex)
        .map(p => p.planet);
}

/**
 * Check if house is Kendra (1, 4, 7, 10)
 */
export function isKendraHouse(houseIndex: number): boolean {
    return [0, 3, 6, 9].includes(houseIndex % 12);
}

/**
 * Check if house is Trikona (1, 5, 9)
 */
export function isTrikonaHouse(houseIndex: number): boolean {
    return [0, 4, 8].includes(houseIndex % 12);
}

/**
 * Check if house is Upachaya (3, 6, 10, 11)
 */
export function isUpachayaHouse(houseIndex: number): boolean {
    return [2, 5, 9, 10].includes(houseIndex % 12);
}

/**
 * Check if house is Dusthana (6, 8, 12)
 */
export function isDusthanaHouse(houseIndex: number): boolean {
    return [5, 7, 11].includes(houseIndex % 12);
}

/**
 * Check if planets are in same house
 */
export function planetsInSameHouse(chart: VedicChart, planet1: string, planet2: string): boolean {
    const p1House = getPlanetHouse(chart, planet1);
    const p2House = getPlanetHouse(chart, planet2);
    return p1House !== -1 && p1House === p2House;
}

/**
 * Check if planet is in Kendra from another planet
 */
export function isInKendra(fromHouse: number, toHouse: number): boolean {
    const diff = (toHouse - fromHouse + 12) % 12;
    return [0, 3, 6, 9].includes(diff);
}

/**
 * Check if planet is in Trine from another planet
 */
export function isInTrine(fromHouse: number, toHouse: number): boolean {
    const diff = (toHouse - fromHouse + 12) % 12;
    return [0, 4, 8].includes(diff);
}

/**
 * Check if planet is exalted
 */
export function isExalted(chart: VedicChart, planetName: string, planetIndex: number): boolean {
    const house = getPlanetHouse(chart, planetName);
    return house === EXALTATION_HOUSES[planetIndex as keyof typeof EXALTATION_HOUSES];
}

/**
 * Check if planet is in own sign
 */
export function isInOwnSign(chart: VedicChart, planetName: string, planetIndex: number): boolean {
    const house = getPlanetHouse(chart, planetName);
    const ownHouses = OWN_HOUSES[planetIndex];
    return ownHouses?.includes(house) ?? false;
}

/**
 * Get ascendant sign index (0-11)
 */
export function getAscendantSignIndex(chart: VedicChart): number {
    const ascendant = chart.d1.houses?.[0];
    if (!ascendant) return 0;

    const rashiMap: Record<string, number> = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };

    return rashiMap[ascendant.sign] ?? 0;
}

/**
 * Get lord of ascendant
 */
export function getAscendantLord(chart: VedicChart): string {
    const ascSign = getAscendantSignIndex(chart);
    return getSignLord(ascSign);
}

/**
 * Get houses aspected by a planet
 */
export function getAspects(chart: VedicChart, planetName: string): number[] {
    const planetHouse = getPlanetHouse(chart, planetName);
    if (planetHouse === -1) return [];

    const aspects: number[] = [];

    switch (planetName) {
        case 'Mars':
            aspects.push(
                (planetHouse + 3) % 12,
                (planetHouse + 6) % 12,
                (planetHouse + 7) % 12
            );
            break;
        case 'Jupiter':
            aspects.push(
                (planetHouse + 4) % 12,
                (planetHouse + 6) % 12,
                (planetHouse + 8) % 12
            );
            break;
        case 'Saturn':
            aspects.push(
                (planetHouse + 2) % 12,
                (planetHouse + 6) % 12,
                (planetHouse + 9) % 12
            );
            break;
        default:
            aspects.push((planetHouse + 6) % 12);
            break;
    }

    return aspects;
}

/**
 * Check if a planet aspects a specific house
 */
export function hasAspect(chart: VedicChart, planetName: string, houseIndex: number): boolean {
    const aspects = getAspects(chart, planetName);
    return aspects.includes(houseIndex);
}

/**
 * Check if planet is strong
 */
export function isStrong(chart: VedicChart, planetName: string): boolean {
    const planetIndex = PLANET_INDICES[planetName.toUpperCase() as keyof typeof PLANET_INDICES];
    if (planetIndex === undefined) return false;

    if (isExalted(chart, planetName, planetIndex)) return true;
    if (isInOwnSign(chart, planetName, planetIndex)) return true;

    const ascSign = getAscendantSignIndex(chart);
    const planetHouse = getPlanetHouse(chart, planetName);
    if (planetHouse !== -1 && isInKendra(ascSign, planetHouse)) return true;

    return false;
}
