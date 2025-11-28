/**
 * Dhana Yogas Module
 * Wealth and prosperity yogas - combinations that grant financial success
 */

import { VedicChart } from '../../types/vedic.types';
import { Yoga } from '../../types/yoga.types';


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



function planetsInSameHouse(chart: VedicChart, planet1: string, planet2: string): boolean {
    const p1House = getPlanetHouse(chart, planet1);
    const p2House = getPlanetHouse(chart, planet2);
    return p1House !== -1 && p1House === p2House;
}



/**
 * Dhana Yoga 1 - Lord of 2nd in 11th
 * Wealth lord in gains house
 */
export function checkDhanaYoga1(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h11 = (ascSign + 10) % 12;

    const lord2 = getSignLord(h2);
    const lord2House = getPlanetHouse(chart, lord2);

    if (lord2House === h11) {
        return {
            name: 'Dhana Yoga (2nd Lord in 11th)',
            category: 'dhana',
            strength: 'strong',
            description: 'Lord of 2nd house in 11th house',
            formation: 'Wealth lord in house of gains',
            results: ['Great wealth', 'Financial success', 'Multiple income sources'],
            lifeAreas: ['Wealth', 'Income', 'Finance']
        };
    }
    return null;
}

/**
 * Dhana Yoga 2 - Lord of 11th in 2nd
 * Gains lord in wealth house
 */
export function checkDhanaYoga2(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h11 = (ascSign + 10) % 12;

    const lord11 = getSignLord(h11);
    const lord11House = getPlanetHouse(chart, lord11);

    if (lord11House === h2) {
        return {
            name: 'Dhana Yoga (11th Lord in 2nd)',
            category: 'dhana',
            strength: 'strong',
            description: 'Lord of 11th house in 2nd house',
            formation: 'Gains lord in house of wealth',
            results: ['Accumulated wealth', 'Family assets', 'Financial stability'],
            lifeAreas: ['Wealth', 'Assets', 'Family']
        };
    }
    return null;
}

/**
 * Dhana Yoga 3 - Lords of 2nd and 11th conjunct
 * Wealth and gains lords united
 */
export function checkDhanaYoga3(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h11 = (ascSign + 10) % 12;

    const lord2 = getSignLord(h2);
    const lord11 = getSignLord(h11);

    if (planetsInSameHouse(chart, lord2, lord11)) {
        return {
            name: 'Dhana Yoga (2nd and 11th Lords)',
            category: 'dhana',
            strength: 'very_strong',
            description: 'Lords of 2nd and 11th houses conjunct',
            formation: 'Union of wealth and gains',
            results: ['Massive wealth', 'Prosperity', 'Financial empire'],
            lifeAreas: ['Wealth', 'Business', 'Prosperity']
        };
    }
    return null;
}

/**
 * Dhana Yoga 4 - Lord of 2nd in Kendra aspected by Lord of 11th
 * Wealth lord strong and connected to gains
 */
export function checkDhanaYoga4(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h11 = (ascSign + 10) % 12;

    const lord2 = getSignLord(h2);
    const lord11 = getSignLord(h11);

    const lord2House = getPlanetHouse(chart, lord2);
    const lord11House = getPlanetHouse(chart, lord11);

    if (lord2House !== -1 && lord11House !== -1 && isInKendra(ascSign, lord2House)) {
        // Simplified aspect check: 7th house aspect only for now
        const opposition = Math.abs(lord2House - lord11House) === 6;

        if (opposition) {
            return {
                name: 'Dhana Yoga (Aspect)',
                category: 'dhana',
                strength: 'strong',
                description: '2nd Lord in Kendra aspected by 11th Lord',
                formation: 'Wealth lord strong and influenced by gains',
                results: ['Wealth through career', 'Public success', 'Status'],
                lifeAreas: ['Wealth', 'Career', 'Status']
            };
        }
    }
    return null;
}

/**
 * Dhana Yoga 5 - Lords of 5th and 9th conjunct
 * Speculation and fortune united
 */
export function checkDhanaYoga5(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h5 = (ascSign + 4) % 12;
    const h9 = (ascSign + 8) % 12;

    const lord5 = getSignLord(h5);
    const lord9 = getSignLord(h9);

    if (planetsInSameHouse(chart, lord5, lord9)) {
        return {
            name: 'Dhana Yoga (5th and 9th Lords)',
            category: 'dhana',
            strength: 'very_strong',
            description: 'Lords of 5th and 9th houses conjunct',
            formation: 'Divine grace and intelligence',
            results: ['Wealth through luck', 'Investments', 'Inheritance'],
            lifeAreas: ['Luck', 'Investments', 'Wealth']
        };
    }
    return null;
}

/**
 * Chandra-Mangala Yoga - Moon and Mars conjunct
 * Wealth through enterprise
 */
export function checkChandraMangalaYoga(chart: VedicChart): Yoga | null {
    if (planetsInSameHouse(chart, 'Moon', 'Mars')) {
        return {
            name: 'Chandra-Mangala Yoga',
            category: 'dhana',
            strength: 'strong',
            description: 'Moon and Mars conjunct',
            formation: 'Mind and energy united for wealth',
            results: ['Wealth through enterprise', 'Real estate', 'Aggressive earnings'],
            lifeAreas: ['Business', 'Real Estate', 'Wealth']
        };
    }
    return null;
}

/**
 * Gauri Yoga - Moon in Taurus/Cancer in Kendra aspected by Jupiter
 * Goddess Gauri's blessing
 */
export function checkGauriYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const moonHouse = getPlanetHouse(chart, 'Moon');
    const jupHouse = getPlanetHouse(chart, 'Jupiter');

    if (moonHouse === -1 || jupHouse === -1) return null;

    // Moon in Taurus (1) or Cancer (3)
    const moonSign = moonHouse; // In D1 house=sign
    if (moonSign !== 1 && moonSign !== 3) return null;

    // Moon in Kendra
    if (!isInKendra(ascSign, moonHouse)) return null;

    // Aspected by Jupiter (5, 7, 9)
    const diff = (moonHouse - jupHouse + 12) % 12;
    if ([4, 6, 8].includes(diff)) { // 5th, 7th, 9th aspect
        return {
            name: 'Gauri Yoga',
            category: 'dhana',
            strength: 'very_strong',
            description: 'Strong Moon in Kendra aspected by Jupiter',
            formation: 'Pure and auspicious wealth',
            results: ['Wealthy', 'Virtuous', 'Happy family', 'Respected'],
            lifeAreas: ['Wealth', 'Family', 'Virtue']
        };
    }
    return null;
}

/**
 * Indu Lagna Yoga - Wealth based on Indu Lagna calculation
 * (Simplified version checking 9th lord from Moon)
 */
export function checkInduLagnaYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const h9FromMoon = (moonHouse + 8) % 12;
    const lord9 = getSignLord(h9FromMoon);
    const lord9House = getPlanetHouse(chart, lord9);

    if (lord9House !== -1 && isInKendra(moonHouse, lord9House)) {
        return {
            name: 'Indu Lagna Yoga (Simplified)',
            category: 'dhana',
            strength: 'moderate',
            description: '9th lord from Moon in Kendra from Moon',
            formation: 'Lunar fortune strength',
            results: ['Financial stability', 'Comforts', 'Liquid cash'],
            lifeAreas: ['Finance', 'Comforts']
        };
    }
    return null;
}

/**
 * Vishnu Yoga - Lord of 9th and 10th in 2nd
 * Preserver's wealth
 */
export function checkVishnuYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h9 = (ascSign + 8) % 12;
    const h10 = (ascSign + 9) % 12;

    const lord9 = getSignLord(h9);
    const lord10 = getSignLord(h10);

    const l9House = getPlanetHouse(chart, lord9);
    const l10House = getPlanetHouse(chart, lord10);

    if (l9House === h2 && l10House === h2) {
        return {
            name: 'Vishnu Yoga',
            category: 'dhana',
            strength: 'very_strong',
            description: 'Lords of 9th and 10th in 2nd house',
            formation: 'Dharma and Karma feeding wealth',
            results: ['Immense wealth', 'Government favor', 'High status'],
            lifeAreas: ['Wealth', 'Status', 'Government']
        };
    }
    return null;
}

/**
 * Kubera Yoga - Jupiter in 2nd, Lord of 2nd in 11th
 * God of wealth
 */
export function checkKuberaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h11 = (ascSign + 10) % 12;

    const jupHouse = getPlanetHouse(chart, 'Jupiter');
    const lord2 = getSignLord(h2);
    const lord2House = getPlanetHouse(chart, lord2);

    if (jupHouse === h2 && lord2House === h11) {
        return {
            name: 'Kubera Yoga',
            category: 'dhana',
            strength: 'very_strong',
            description: 'Jupiter in 2nd, 2nd Lord in 11th',
            formation: 'Ultimate wealth combination',
            results: ['Limitless wealth', 'Banking', 'Treasury'],
            lifeAreas: ['Wealth', 'Banking', 'Assets']
        };
    }
    return null;
}
