import { describe, it, expect } from 'vitest';
import { generateTargetedRemedies } from '../remedyCalculations';
import { VedicChart } from '@/types/vedic.types';
import { UserConcern } from '@/types/astrology.types';

const mockChart: VedicChart = {
    birthDetails: {
        date: new Date(),
        time: '12:00',
        latitude: 0,
        longitude: 0
    },
    d1: {
        ascendant: 'Aries',
        ascendantDegree: 0,
        planets: [
            { planet: 'Sun', sign: 'Libra', degree: 10, house: 7, isRetrograde: false }, // Debilitated Sun
            { planet: 'Moon', sign: 'Taurus', degree: 15, house: 2, isRetrograde: false },
            { planet: 'Mars', sign: 'Capricorn', degree: 28, house: 10, isRetrograde: false },
            { planet: 'Mercury', sign: 'Pisces', degree: 5, house: 12, isRetrograde: false }, // Debilitated Mercury
            { planet: 'Jupiter', sign: 'Cancer', degree: 20, house: 4, isRetrograde: false },
            { planet: 'Venus', sign: 'Virgo', degree: 2, house: 6, isRetrograde: false }, // Debilitated Venus
            { planet: 'Saturn', sign: 'Aries', degree: 10, house: 1, isRetrograde: false }, // Debilitated Saturn
            { planet: 'Rahu', sign: 'Scorpio', degree: 12, house: 8, isRetrograde: false },
            { planet: 'Ketu', sign: 'Taurus', degree: 12, house: 2, isRetrograde: false }
        ],
        houses: Array.from({ length: 12 }, (_, i) => ({ number: i + 1, sign: 'Aries', degree: 0, lord: 'Mars' }))
    },
    d9: { ascendant: 'Aries', planets: [] },
    currentDasha: [],
    yogas: [],
    doshas: []
};

describe('remedyCalculations', () => {
    it('should generate relationship remedies for debilitated Venus', () => {
        const concerns: UserConcern[] = [{ type: 'relationship' }];
        const remedies = generateTargetedRemedies(mockChart, concerns);

        expect(remedies.some(r => r.title === 'Venus Mantra')).toBe(true);
        expect(remedies.some(r => r.title === 'Offer Water to Sun')).toBe(true);
    });

    it('should generate health remedies for debilitated Sun', () => {
        const concerns: UserConcern[] = [{ type: 'health' }];
        const remedies = generateTargetedRemedies(mockChart, concerns);

        expect(remedies.some(r => r.title === 'Aditya Hridaya Stotram')).toBe(true);
    });

    it('should generate addiction remedies for Rahu in Scorpio', () => {
        const concerns: UserConcern[] = [{ type: 'addiction', details: 'Alcohol' }];
        const remedies = generateTargetedRemedies(mockChart, concerns);

        expect(remedies.some(r => r.title === 'Hessonite (Gomed)')).toBe(true);
        expect(remedies.some(r => r.title === 'Maha Mrityunjaya Mantra')).toBe(true);
    });

    it('should generate career remedies for debilitated Saturn', () => {
        const concerns: UserConcern[] = [{ type: 'career' }];
        const remedies = generateTargetedRemedies(mockChart, concerns);

        expect(remedies.some(r => r.title === 'Shani Mantra')).toBe(true);
    });

    it('should generate business remedies for debilitated Mercury', () => {
        const concerns: UserConcern[] = [{ type: 'business' }];
        const remedies = generateTargetedRemedies(mockChart, concerns);

        expect(remedies.some(r => r.title === 'Budh Mantra')).toBe(true);
    });

    it('should include enhanced fields (priority, cost, difficulty, effectiveness)', () => {
        const concerns: UserConcern[] = [{ type: 'health' }];
        const remedies = generateTargetedRemedies(mockChart, concerns);

        expect(remedies.length).toBeGreaterThan(0);
        remedies.forEach(remedy => {
            expect(remedy.priority).toMatch(/^(high|medium|low)$/);
            expect(remedy.cost).toMatch(/^(free|low|medium|high)$/);
            expect(remedy.difficulty).toMatch(/^(easy|medium|hard)$/);
            expect(remedy.effectiveness).toBeGreaterThanOrEqual(1);
            expect(remedy.effectiveness).toBeLessThanOrEqual(10);
        });
    });

    it('should sort remedies by effectiveness (descending)', () => {
        const concerns: UserConcern[] = [{ type: 'health' }];
        const remedies = generateTargetedRemedies(mockChart, concerns);

        for (let i = 0; i < remedies.length - 1; i++) {
            expect(remedies[i].effectiveness).toBeGreaterThanOrEqual(remedies[i + 1].effectiveness);
        }
    });
});
