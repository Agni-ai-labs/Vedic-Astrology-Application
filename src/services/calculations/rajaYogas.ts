/**
 * Raja Yogas Module
 * Power and authority yogas - combinations that grant leadership and status
 */

import { VedicChart } from '../../types/vedic.types';
import { Yoga } from '../../types/yoga.types';
import {
    PLANET_INDICES,
    EXALTATION_HOUSES
} from '../../types/yoga.types';

// Helper functions (duplicated for module independence)
function getAscendantSignIndex(chart: VedicChart): number {
    const ascendant = chart.d1.houses?.[0];
    if (!ascendant) return 0;

    const rashiMap: Record<string, number> = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };
    return rashiMap[ascendant.sign] ?? 0;
}

function getSignLord(signIndex: number): string {
    const lords = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
    return lords[signIndex % 12];
}

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

function isInKendra(fromHouse: number, toHouse: number): boolean {
    const diff = (toHouse - fromHouse + 12) % 12;
    return [0, 3, 6, 9].includes(diff);
}

function isInTrine(fromHouse: number, toHouse: number): boolean {
    const diff = (toHouse - fromHouse + 12) % 12;
    return [0, 4, 8].includes(diff);
}

function isExalted(chart: VedicChart, planetName: string, planetIndex: number): boolean {
    const house = getPlanetHouse(chart, planetName);
    return house === EXALTATION_HOUSES[planetIndex as keyof typeof EXALTATION_HOUSES];
}

function planetsInSameHouse(chart: VedicChart, planet1: string, planet2: string): boolean {
    const p1House = getPlanetHouse(chart, planet1);
    const p2House = getPlanetHouse(chart, planet2);
    return p1House !== -1 && p1House === p2House;
}

function getPlanetsInHouse(chart: VedicChart, houseIndex: number): string[] {
    return chart.d1.planets
        .filter(p => getPlanetHouse(chart, p.planet) === houseIndex)
        .map(p => p.planet);
}

function isNaturalBenefic(planetName: string): boolean {
    return ['Jupiter', 'Venus', 'Mercury', 'Moon'].includes(planetName);
}

/**
 * Dharma Karmadhipati Yoga - Lords of 9th and 10th together
 * Righteous action meets career - powerful yoga for success
 */
export function checkDharmaKarmadhipatiYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h9 = (ascSign + 8) % 12;
    const h10 = (ascSign + 9) % 12;

    const lord9 = getSignLord(h9);
    const lord10 = getSignLord(h10);

    if (planetsInSameHouse(chart, lord9, lord10)) {
        return {
            name: 'Dharma Karmadhipati Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: '9th and 10th lords conjunct',
            formation: 'Lords of fortune and career unite',
            results: ['Great success', 'High position', 'Ethical wealth', 'Respected'],
            lifeAreas: ['Career', 'Fortune', 'Status']
        };
    }
    return null;
}

/**
 * Lakshmi Yoga - Lord of 9th in own/exaltation in Kendra/Trikona
 * Goddess of wealth bestows prosperity
 */
export function checkLakshmiYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h9 = (ascSign + 8) % 12;
    const lord9 = getSignLord(h9);
    const lord9House = getPlanetHouse(chart, lord9);

    if (lord9House === -1) return null;

    const isKendra = isInKendra(ascSign, lord9House);
    const isTrikona = isInTrine(ascSign, lord9House);
    const planetIndex = PLANET_INDICES[lord9.toUpperCase() as keyof typeof PLANET_INDICES];
    const isExalt = isExalted(chart, lord9, planetIndex);

    if ((isKendra || isTrikona) && isExalt) {
        return {
            name: 'Lakshmi Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: '9th lord exalted in Kendra/Trikona',
            formation: 'Lord of fortune powerfully placed',
            results: ['Wealth', 'Prosperity', 'Fame', 'Good fortune'],
            lifeAreas: ['Wealth', 'Fortune', 'Prosperity']
        };
    }
    return null;
}

/**
 * Raja Sambandha Yoga - Mutual relation between 1st, 5th, 9th lords
 * Connection of self, intelligence, and fortune
 */
export function checkRajaSambandhaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const lord1 = getSignLord(ascSign);
    const lord5 = getSignLord((ascSign + 4) % 12);
    const lord9 = getSignLord((ascSign + 8) % 12);



    // Check if any two are together
    const l1_l5 = planetsInSameHouse(chart, lord1, lord5);
    const l1_l9 = planetsInSameHouse(chart, lord1, lord9);
    const l5_l9 = planetsInSameHouse(chart, lord5, lord9);

    if (l1_l5 || l1_l9 || l5_l9) {
        return {
            name: 'Raja Sambandha Yoga',
            category: 'raja',
            strength: 'strong',
            description: 'Connection between lords of 1st, 5th, and 9th',
            formation: 'Trikona lords in mutual relationship',
            results: ['Leadership', 'Intelligence', 'Fortune', 'Success'],
            lifeAreas: ['Leadership', 'Intelligence', 'Fortune']
        };
    }
    return null;
}

/**
 * Yogakaraka Yoga - Planet ruling both Kendra and Trikona is strong
 * Especially important for certain ascendants
 */
export function checkYogakarakaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    // Yogakaraka planets for specific ascendants:
    // Taurus/Libra: Saturn (rules 4,5 or 9,10)
    // Cancer: Mars (rules 5,10)
    // Leo: Mars (rules 4,9)

    let yogakarakaPlanet: string | null = null;

    if (ascSign === 1 || ascSign === 6) { // Taurus, Libra
        yogakarakaPlanet = 'Saturn';
    } else if (ascSign === 3) { // Cancer
        yogakarakaPlanet = 'Mars';
    } else if (ascSign === 4) { // Leo
        yogakarakaPlanet = 'Mars';
    }

    if (!yogakarakaPlanet) return null;

    const planetIndex = PLANET_INDICES[yogakarakaPlanet.toUpperCase() as keyof typeof PLANET_INDICES];
    const house = getPlanetHouse(chart, yogakarakaPlanet);

    const isKendra = isInKendra(ascSign, house);
    const isExalt = isExalted(chart, yogakarakaPlanet, planetIndex);

    if (isKendra && isExalt) {
        return {
            name: 'Yogakaraka Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: `Yogakaraka ${yogakarakaPlanet} exalted in Kendra`,
            formation: 'Kendra-Trikona lord powerfully placed',
            results: ['Exceptional success', 'High status', 'Prosperity', 'Power'],
            lifeAreas: ['Success', 'Power', 'Status']
        };
    }
    return null;
}

/**
 * Mahabhagya Yoga - Great fortune yoga for day/night births
 * Male: day birth with Sun/Moon/Lagna in odd signs
 * Female: night birth with Sun/Moon/Lagna in even signs
 */
export function checkMahabhagyaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const sunHouse = getPlanetHouse(chart, 'Sun');
    const moonHouse = getPlanetHouse(chart, 'Moon');

    const oddSigns = [0, 2, 4, 6, 8, 10];


    const lagnaOdd = oddSigns.includes(ascSign);
    const sunOdd = oddSigns.includes(sunHouse);
    const moonOdd = oddSigns.includes(moonHouse);

    // Simplified: check if all three in odd signs (traditional would also check gender & day/night)
    if (lagnaOdd && sunOdd && moonOdd) {
        return {
            name: 'Mahabhagya Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Sun, Moon, and Ascendant all in odd signs',
            formation: 'Great fortune combination',
            results: ['Exceptionally fortunate', 'Wealthy', 'Famous', 'Virtuous'],
            lifeAreas: ['Fortune', 'Wealth', 'Fame']
        };
    }
    return null;
}

/**
 * Parvata Yoga - Benefics in Kendras, strong lord
 * Mountain-like stability and strength
 */
export function checkParvataYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const kendras = [0, 3, 6, 9].map(k => (ascSign + k) % 12);

    let beneficsInKendra = 0;
    for (const kendra of kendras) {
        const planets = getPlanetsInHouse(chart, kendra);
        beneficsInKendra += planets.filter(p => isNaturalBenefic(p)).length;
    }

    if (beneficsInKendra >= 2) {
        return {
            name: 'Parvata Yoga',
            category: 'raja',
            strength: 'strong',
            description: 'Multiple benefics in Kendras',
            formation: 'Stable, mountain-like strength',
            results: ['Prosperous', 'Charitable', 'Leader', 'Long life'],
            lifeAreas: ['Prosperity', 'Leadership', 'Longevity']
        };
    }
    return null;
}

/**
 * Kahala Yoga - 4th and 9th lords in mutual Kendras
 * Knowledge and fortune in angular relationship
 */
export function checkKahalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const lord4 = getSignLord((ascSign + 3) % 12);
    const lord9 = getSignLord((ascSign + 8) % 12);

    const l4House = getPlanetHouse(chart, lord4);
    const l9House = getPlanetHouse(chart, lord9);

    if (l4House !== -1 && l9House !== -1 && isInKendra(l4House, l9House)) {
        return {
            name: 'Kahala Yoga',
            category: 'raja',
            strength: 'strong',
            description: '4th and 9th lords in mutual Kendras',
            formation: 'Knowledge and fortune united',
            results: ['Bold', 'Commanding', 'Wealthy', 'Respected'],
            lifeAreas: ['Authority', 'Wealth', 'Respect']
        };
    }
    return null;
}

/**
 * Chamara Yoga - Lagna lord exalted in Kendra aspected by benefic
 * Royal fan/whisk - symbol of royalty
 */
export function checkChamaraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const lagnaLord = getSignLord(ascSign);
    const lagnaLordHouse = getPlanetHouse(chart, lagnaLord);

    if (lagnaLordHouse === -1) return null;

    const planetIndex = PLANET_INDICES[lagnaLord.toUpperCase() as keyof typeof PLANET_INDICES];
    const isExalt = isExalted(chart, lagnaLord, planetIndex);
    const isKendra = isInKendra(ascSign, lagnaLordHouse);

    if (isExalt && isKendra) {
        return {
            name: 'Chamara Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Lagna lord exalted in Kendra',
            formation: 'Royal insignia yoga',
            results: ['Long life', 'Prosperity', 'Learned', 'Famous'],
            lifeAreas: ['Longevity', 'Fame', 'Learning']
        };
    }
    return null;
}

/**
 * Sankha Yoga - 5th and 6th lords in mutual Kendras
 * Conch shell - auspicious symbol
 */
export function checkSankhaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const lord5 = getSignLord((ascSign + 4) % 12);
    const lord6 = getSignLord((ascSign + 5) % 12);

    const l5House = getPlanetHouse(chart, lord5);
    const l6House = getPlanetHouse(chart, lord6);

    if (l5House !== -1 && l6House !== -1 && isInKendra(l5House, l6House)) {
        return {
            name: 'Sankha Yoga',
            category: 'raja',
            strength: 'strong',
            description: '5th and 6th lords in mutual Kendras',
            formation: 'Intelligence overcomes obstacles',
            results: ['Compassionate', 'Wealthy', 'Learned', 'Virtuous'],
            lifeAreas: ['Wealth', 'Learning', 'Virtue']
        };
    }
    return null;
}

/**
 * Bheri Yoga - Strong lord of 9th with specific planet placements
 * Drum/kettle drum - announces arrival of royalty
 */
export function checkBheriYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const jupHouse = getPlanetHouse(chart, 'Jupiter');
    const venHouse = getPlanetHouse(chart, 'Venus');
    const lagnaLordHouse = getPlanetHouse(chart, getSignLord(ascSign));

    // Check if Jupiter, Venus, and Lagna lord in mutual Kendras
    if (jupHouse !== -1 && venHouse !== -1 && lagnaLordHouse !== -1) {
        const jupVenKendra = isInKendra(jupHouse, venHouse);
        const jupLagKendra = isInKendra(jupHouse, lagnaLordHouse);

        if (jupVenKendra && jupLagKendra) {
            return {
                name: 'Bheri Yoga',
                category: 'raja',
                strength: 'strong',
                description: 'Jupiter, Venus, Lagna lord in mutual Kendras',
                formation: 'Benefics and significator united',
                results: ['Wealthy', 'Long life', 'Happy', 'Famous'],
                lifeAreas: ['Wealth', 'Happiness', 'Longevity']
            };
        }
    }
    return null;
}

/**
 * Mridanga Yoga - Planets in 1st and 7th or 4th and 10th
 * Drum yoga - announces fame
 */
export function checkMridangaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h1 = ascSign;
    const h7 = (ascSign + 6) % 12;
    const h4 = (ascSign + 3) % 12;
    const h10 = (ascSign + 9) % 12;

    const p1 = getPlanetsInHouse(chart, h1).length;
    const p7 = getPlanetsInHouse(chart, h7).length;
    const p4 = getPlanetsInHouse(chart, h4).length;
    const p10 = getPlanetsInHouse(chart, h10).length;

    if ((p1 > 0 && p7 > 0) || (p4 > 0 && p10 > 0)) {
        return {
            name: 'Mridanga Yoga',
            category: 'raja',
            strength: 'moderate',
            description: 'Planets in opposite Kendras',
            formation: 'Balance and strength in angles',
            results: ['Happy', 'Wealthy', 'Respected', 'Charitable'],
            lifeAreas: ['Happiness', 'Wealth', 'Respect']
        };
    }
    return null;
}

/**
 * Parijata Yoga - Ascendant lord in Kendra/Trikona/Own/Exaltation
 * Celestial tree - wish-fulfilling
 */
export function checkParijataYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const lagnaLord = getSignLord(ascSign);
    const lagnaLordHouse = getPlanetHouse(chart, lagnaLord);

    if (lagnaLordHouse === -1) return null;

    const planetIndex = PLANET_INDICES[lagnaLord.toUpperCase() as keyof typeof PLANET_INDICES];
    const isKendra = isInKendra(ascSign, lagnaLordHouse);
    const isTrikona = isInTrine(ascSign, lagnaLordHouse);
    const isExalt = isExalted(chart, lagnaLord, planetIndex);

    if (isKendra || isTrikona || isExalt) {
        return {
            name: 'Parijata Yoga',
            category: 'raja',
            strength: 'strong',
            description: 'Ascendant lord well-placed',
            formation: 'Self-significator powerfully positioned',
            results: ['Happy', 'Honored', 'Compassionate', 'Wealthy'],
            lifeAreas: ['Happiness', 'Honor', 'Wealth']
        };
    }
    return null;
}

/**
 * Gaja Yoga - All benefics in Kendras
 * Elephant yoga - strength and wisdom
 */
export function checkGajaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const kendras = [0, 3, 6, 9].map(k => (ascSign + k) % 12);

    const benefics = ['Jupiter', 'Venus', 'Mercury', 'Moon'];
    let allBeneficsInKendra = true;

    for (const benefic of benefics) {
        const house = getPlanetHouse(chart, benefic);
        if (house !== -1 && !kendras.includes(house)) {
            allBeneficsInKendra = false;
            break;
        }
    }

    if (allBeneficsInKendra) {
        return {
            name: 'Gaja Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'All benefics in Kendras',
            formation: 'Elephant-like strength and wisdom',
            results: ['Powerful', 'Wise', 'Wealthy', 'Long life'],
            lifeAreas: ['Power', 'Wisdom', 'Wealth']
        };
    }
    return null;
}

/**
 * Shrinatha Yoga - Exalted lord of 7th in 10th
 * Lord of partnerships elevated in career house
 */
export function checkShrinathaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h7 = (ascSign + 6) % 12;
    const h10 = (ascSign + 9) % 12;

    const lord7 = getSignLord(h7);
    const lord7House = getPlanetHouse(chart, lord7);

    if (lord7House === h10) {
        const planetIndex = PLANET_INDICES[lord7.toUpperCase() as keyof typeof PLANET_INDICES];
        const isExalt = isExalted(chart, lord7, planetIndex);

        if (isExalt) {
            return {
                name: 'Shrinatha Yoga',
                category: 'raja',
                strength: 'strong',
                description: '7th lord exalted in 10th',
                formation: 'Partnerships elevate career',
                results: ['Successful partnerships', 'Career growth', 'Wealth', 'Fame'],
                lifeAreas: ['Partnership', 'Career', 'Wealth']
            };
        }
    }
    return null;
}

/**
 * Vasumathi Yoga - Benefics in Upachaya houses (3, 6, 10, 11)
 * Wealth accumulation yoga
 */
export function checkVasumathiYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const upachayas = [2, 5, 9, 10].map(u => (ascSign + u) % 12); // 3rd, 6th, 10th, 11th

    let beneficsInUpachaya = 0;
    for (const upachaya of upachayas) {
        const planets = getPlanetsInHouse(chart, upachaya);
        beneficsInUpachaya += planets.filter(p => isNaturalBenefic(p)).length;
    }

    if (beneficsInUpachaya >= 2) {
        return {
            name: 'Vasumathi Yoga',
            category: 'raja',
            strength: 'strong',
            description: 'Benefics in Upachaya houses',
            formation: 'Wealth grows through effort',
            results: ['Wealth accumulation', 'Property', 'Vehicles', 'Comforts'],
            lifeAreas: ['Wealth', 'Property', 'Comforts']
        };
    }
    return null;
}
