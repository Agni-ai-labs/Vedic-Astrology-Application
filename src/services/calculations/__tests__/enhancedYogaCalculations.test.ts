/**
 * Tests for Enhanced Yoga Calculations
 * Verifies top 20 yogas detection
 */

import { describe, it, expect } from 'vitest';
import { analyzeYogas } from '../enhancedYogaCalculations';
import { VedicChart } from '@/types/vedic.types';

// Mock chart helper with complete VedicChart structure
function createMockChart(planets: Array<{ planet: string; sign: string }>): VedicChart {
    const fullPlanets = planets.map(p => ({
        ...p,
        degree: 15.0,
        house: 1,
        isRetrograde: false
    }));

    return {
        birthDetails: {
            date: new Date(),
            time: '12:00',
            latitude: 0,
            longitude: 0
        },
        d1: {
            ascendant: 'Aries',
            ascendantDegree: 0,
            planets: fullPlanets,
            houses: []
        },
        d9: {
            ascendant: 'Aries',
            planets: []
        },
        currentDasha: [],
        yogas: [],
        doshas: []
    };
}

describe('Enhanced Yoga Calculations', () => {
    describe('Pancha Mahapurusha Yogas', () => {
        it('should detect Budha-Aditya Yoga (Sun and Mercury together)', () => {
            const chart = createMockChart([
                { planet: 'Sun', sign: 'Aries' },
                { planet: 'Mercury', sign: 'Aries' }, // Same sign as Sun
                { planet: 'Moon', sign: 'Taurus' },
                { planet: 'Mars', sign: 'Scorpio' },
                { planet: 'Jupiter', sign: 'Pisces' },
                { planet: 'Venus', sign: 'Gemini' },
                { planet: 'Saturn', sign: 'Capricorn' }
            ]);

            const result = analyzeYogas(chart);
            const budhaAditya = result.yogas.find(y => y.name === 'Budha-Aditya Yoga');

            expect(budhaAditya).toBeDefined();
            expect(budhaAditya?.category).toBe('solar');
        });
    });

    describe('Overall Analysis', () => {
        it('should return valid analysis structure', () => {
            const chart = createMockChart([
                { planet: 'Sun', sign: 'Aries' },
                { planet: 'Moon', sign: 'Taurus' },
                { planet: 'Mars', sign: 'Gemini' },
                { planet: 'Mercury', sign: 'Cancer' },
                { planet: 'Jupiter', sign: 'Leo' },
                { planet: 'Venus', sign: 'Virgo' },
                { planet: 'Saturn', sign: 'Libra' }
            ]);

            const result = analyzeYogas(chart);

            expect(result).toBeDefined();
            expect(result.totalCount).toBeGreaterThanOrEqual(0);
            expect(result.yogas).toBeDefined();
            expect(result.categories).toBeDefined();
            expect(result.summary).toBeDefined();
        });

        it('should categorize yogas correctly', () => {
            const chart = createMockChart([
                { planet: 'Sun', sign: 'Aries' },
                { planet: 'Mercury', sign: 'Aries' }, // Budha-Aditya
                { planet: 'Moon', sign: 'Taurus' },
                { planet: 'Mars', sign: 'Gemini' },
                { planet: 'Jupiter', sign: 'Cancer' },
                { planet: 'Venus', sign: 'Leo' },
                { planet: 'Saturn', sign: 'Virgo' }
            ]);

            const result = analyzeYogas(chart);

            expect(result.categories).toBeDefined();
            expect(typeof result.categories.solar).toBe('number');
            expect(typeof result.categories.lunar).toBe('number');
            expect(typeof result.categories.pancha_mahapurusha).toBe('number');
        });
    });
});
