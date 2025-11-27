/**
 * Scratch file for Vipareeta Raja Yoga implementations
 * These implementations can be moved to enhancedYogaCalculations.ts
 */

import { VedicChart } from './src/types/vedic.types';
import { Yoga } from './src/types/yoga.types';

// Mock helper functions (actual implementations are in enhancedYogaCalculations.ts)
const getPlanetHouse = (chart: VedicChart, planetName: string): number => -1;
const getAscendantSignIndex = (chart: VedicChart): number => 0;
const getSignLord = (signIndex: number): string => 'Sun';

// ============================================================================
// VIPAREETA RAJA YOGAS (Reversal/Transformation Yogas)
// ============================================================================

/**
 * Helper: Get house lord (returns planet that lords the given house)
 */
function getHouseLord(chart: VedicChart, houseIndex: number): string {
    const ascSign = getAscendantSignIndex(chart);
    const signOfHouse = (ascSign + houseIndex) % 12;
    return getSignLord(signOfHouse);
}

/**
 * Harsha Yoga - 6th lord in 6th house
 * Vipareeta Raja Yoga type 1
 */
function checkHarshaYoga(chart: VedicChart): Yoga | null {
    const lord6 = getHouseLord(chart, 5); // 6th house (0-indexed as 5)
    const house6 = getPlanetHouse(chart, lord6);

    const ascSign = getAscendantSignIndex(chart);
    const house6Index = (ascSign + 5) % 12;

    if (house6 === house6Index) {
        return {
            name: 'Harsha Yoga',
            category: 'vipareeta',
            strength: 'strong',
            description: '6th lord occupies 6th house',
            formation: 'Vipareeta Raja Yoga - Lord of Dusthana in own Dusthana',
            results: ['Victory over enemies', 'Prosperity', 'Happiness', 'Fame'],
            lifeAreas: ['Enemies', 'Health', 'Success']
        };
    }
    return null;
}

/**
 * Sarala Yoga - 8th lord in 8th house
 * Vipareeta Raja Yoga type 2
 */
function checkSaralaYoga(chart: VedicChart): Yoga | null {
    const lord8 = getHouseLord(chart, 7); // 8th house (0-indexed as 7)
    const house8 = getPlanetHouse(chart, lord8);

    const ascSign = getAscendantSignIndex(chart);
    const house8Index = (ascSign + 7) % 12;

    if (house8 === house8Index) {
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
 * Vipareeta Raja Yoga type 3
 */
function checkVimalaYoga(chart: VedicChart): Yoga | null {
    const lord12 = getHouseLord(chart, 11); // 12th house (0-indexed as 11)
    const house12 = getPlanetHouse(chart, lord12);

    const ascSign = getAscendantSignIndex(chart);
    const house12Index = (ascSign + 11) % 12;

    if (house12 === house12Index) {
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
