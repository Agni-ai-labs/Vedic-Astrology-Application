/**
 * Scratch file for Nabhasa Yoga implementations
 * These implementations were moved to enhancedYogaCalculations.ts
 */

import { VedicChart } from './src/types/vedic.types';
import { Yoga } from './src/types/yoga.types';

// Mock helper functions (actual implementations are in enhancedYogaCalculations.ts)
const getPlanetHouse = (chart: VedicChart, planetName: string): number => -1;
const getAscendantSignIndex = (chart: VedicChart): number => 0;

// ============================================================================
// NABHASA YOGAS (Sky/Directional Yogas)
// ============================================================================

/**
 * Chakra Yoga - All planets in odd houses (1, 3, 5, 7, 9, 11)
 */
function checkChakraYoga(chart: VedicChart): Yoga | null {
    const oddHouses = [0, 2, 4, 6, 8, 10]; // 0-indexed: 1st, 3rd, 5th, 7th, 9th, 11th

    const allInOdd = chart.d1.planets.every(p => {
        if (['Rahu', 'Ketu'].includes(p.planet)) return true;
        const house = getPlanetHouse(chart, p.planet);
        return oddHouses.includes(house);
    });

    if (!allInOdd) return null;

    return {
        name: 'Chakra Yoga',
        category: 'nabhasa',
        strength: 'strong',
        description: 'All planets in odd houses',
        formation: 'Planets exclusively in houses 1, 3, 5, 7, 9, 11',
        results: ['Ruler/king-like', 'Powerful', 'Commanding presence', 'Leadership'],
        lifeAreas: ['Power', 'Leadership', 'Authority']
    };
}

/**
 * Samudra Yoga - All planets in even houses (2, 4, 6, 8, 10, 12)
 */
function checkSamudraYoga(chart: VedicChart): Yoga | null {
    const evenHouses = [1, 3, 5, 7, 9, 11]; // 0-indexed: 2nd, 4th, 6th, 8th, 10th, 12th

    const allInEven = chart.d1.planets.every(p => {
        if (['Rahu', 'Ketu'].includes(p.planet)) return true;
        const house = getPlanetHouse(chart, p.planet);
        return evenHouses.includes(house);
    });

    if (!allInEven) return null;

    return {
        name: 'Samudra Yoga',
        category: 'nabhasa',
        strength: 'strong',
        description: 'All planets in even houses',
        formation: 'Planets exclusively in houses 2, 4, 6, 8, 10, 12',
        results: ['Wealth accumulation', 'Materialistic', 'Enjoys pleasures', 'Prosperous'],
        lifeAreas: ['Wealth', 'Material Success', 'Pleasure']
    };
}

/**
 * Ardha Chandra Yoga - All planets in 7 consecutive houses from Panapara (2,5,8,11)
 */
function checkArdhaChandraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const panapara = [1, 4, 7, 10]; // 2nd, 5th, 8th, 11th (0-indexed: 1, 4, 7, 10)

    // Check each panapara as starting point
    for (const start of panapara) {
        const houses: number[] = [];
        for (let i = 0; i < 7; i++) {
            houses.push((ascSign + start + i) % 12);
        }

        const allIn = chart.d1.planets.every(p => {
            if (['Rahu', 'Ketu'].includes(p.planet)) return true;
            const h = getPlanetHouse(chart, p.planet);
            return houses.includes(h);
        });

        if (allIn) {
            return {
                name: 'Ardha Chandra Yoga',
                category: 'nabhasa',
                strength: 'moderate',
                description: 'All planets in 7 consecutive houses from Panapara',
                formation: 'Planets in 7 houses from 2nd/5th/8th/11th',
                results: ['Handsome', 'Wealthy', 'Princely comforts'],
                lifeAreas: ['Wealth', 'Comfort', 'Appearance']
            };
        }
    }

    return null;
}

/**
 * Nauka Yoga - All planets in any 7 consecutive houses
 */
function checkNaukaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    // Try each house as starting point
    for (let start = 0; start < 12; start++) {
        const houses: number[] = [];
        for (let i = 0; i < 7; i++) {
            houses.push((ascSign + start + i) % 12);
        }

        const allIn = chart.d1.planets.every(p => {
            if (['Rahu', 'Ketu'].includes(p.planet)) return true;
            const h = getPlanetHouse(chart, p.planet);
            return houses.includes(h);
        });

        if (allIn) {
            // Make sure it's not another named yoga (Chatra, Chaapa, Koota, Ardha Chandra)
            // Chatra is 7-1, Chaapa is 10-4, Koota is 4-10
            const isChatra = start === 6;
            const isChaapa = start === 9;
            const isKoota = start === 3;

            if (!isChatra && !isChaapa && !isKoota) {
                return {
                    name: 'Nauka Yoga',
                    category: 'nabhasa',
                    strength: 'moderate',
                    description: 'All planets in 7 consecutive houses',
                    formation: `Planets in 7 consecutive houses from ${start + 1}`,
                    results: ['Fond of water sports', 'Traveler', 'Adventurous'],
                    lifeAreas: ['Travel', 'Adventure', 'Water']
                };
            }
        }
    }

    return null;
}
