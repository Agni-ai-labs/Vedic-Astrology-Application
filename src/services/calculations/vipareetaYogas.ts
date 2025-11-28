/**
 * Vipareeta Raja Yogas Module
 * Three transformation yogas where dusthana lords in own houses create strength
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
    return lords[signIndex];
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

/**
 * Harsha Yoga - 6th lord in 6th house
 * Victory over enemies, health strength
 */
export function checkHarshaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const house6Sign = (ascSign + 5) % 12;
    const lord6 = getSignLord(house6Sign);
    const lord6House = getPlanetHouse(chart, lord6);

    if (lord6House === house6Sign) {
        return {
            name: 'Harsha Yoga',
            category: 'vipareeta',
            strength: 'strong',
            description: '6th lord occupies 6th house',
            formation: 'Vipareeta Raja Yoga - Adversity transforms to victory',
            results: ['Victory over enemies', 'Prosperity', 'Happiness', 'Fame'],
            lifeAreas: ['Enemies', 'Health', 'Success']
        };
    }
    return null;
}

/**
 * Sarala Yoga - 8th lord in 8th house
 * Fearlessness, longevity, occult knowledge
 */
export function checkSaralaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const house8Sign = (ascSign + 7) % 12;
    const lord8 = getSignLord(house8Sign);
    const lord8House = getPlanetHouse(chart, lord8);

    if (lord8House === house8Sign) {
        return {
            name: 'Sarala Yoga',
            category: 'vipareeta',
            strength: 'strong',
            description: '8th lord occupies 8th house',
            formation: 'Vipareeta Raja Yoga - Transformation through adversity',
            results: ['Fearless', 'Long life', 'Fame through occult', 'Learned'],
            lifeAreas: ['Longevity', 'Occult', 'Transformation']
        };
    }
    return null;
}

/**
 * Vimala Yoga - 12th lord in 12th house
 * Independence, virtue, spiritual liberation
 */
export function checkVimalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const house12Sign = (ascSign + 11) % 12;
    const lord12 = getSignLord(house12Sign);
    const lord12House = getPlanetHouse(chart, lord12);

    if (lord12House === house12Sign) {
        return {
            name: 'Vimala Yoga',
            category: 'vipareeta',
            strength: 'strong',
            description: '12th lord occupies 12th house',
            formation: 'Vipareeta Raja Yoga - Liberation through loss',
            results: ['Independent', 'Happy', 'Virtuous', 'Frugal'],
            lifeAreas: ['Expenses', 'Liberation', 'Spirituality']
        };
    }
    return null;
}
