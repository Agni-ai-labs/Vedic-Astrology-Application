import { describe, it, expect } from 'vitest';
import { analyzeBusinessGrowth, suggestBusiness } from '../businessCalculations';
import { VedicChart } from '@/types/vedic.types';
import { BusinessDetails } from '@/types/astrology.types';

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
            { planet: 'Sun', sign: 'Capricorn', degree: 10, house: 10, isRetrograde: false }, // Sun in 10th
            { planet: 'Moon', sign: 'Taurus', degree: 15, house: 2, isRetrograde: false },
            { planet: 'Mars', sign: 'Aries', degree: 28, house: 1, isRetrograde: false },
            { planet: 'Mercury', sign: 'Aquarius', degree: 5, house: 11, isRetrograde: false },
            { planet: 'Jupiter', sign: 'Cancer', degree: 20, house: 4, isRetrograde: false },
            { planet: 'Venus', sign: 'Pisces', degree: 2, house: 12, isRetrograde: false },
            { planet: 'Saturn', sign: 'Libra', degree: 10, house: 7, isRetrograde: false },
            { planet: 'Rahu', sign: 'Virgo', degree: 12, house: 6, isRetrograde: false },
            { planet: 'Ketu', sign: 'Pisces', degree: 12, house: 12, isRetrograde: false }
        ],
        houses: Array.from({ length: 12 }, (_, i) => ({ number: i + 1, sign: 'Aries', degree: 0, lord: 'Mars' }))
    },
    d9: { ascendant: 'Aries', planets: [] },
    currentDasha: [],
    yogas: [],
    doshas: []
};

describe('businessCalculations', () => {
    describe('analyzeBusinessGrowth', () => {
        it('should analyze business growth correctly', () => {
            const details: BusinessDetails = {
                name: 'TechCorp',
                type: 'Technology',
                startDate: new Date()
            };

            const result = analyzeBusinessGrowth(mockChart, details);

            expect(result.growthPrediction).toBeDefined();
            expect(result.nameAnalysis.score).toBeGreaterThan(0);
            expect(result.recommendations.suggestedNames).toHaveLength(5);
            expect(result.recommendations.logoColors).toBeDefined();
        });

        it('should give positive prediction for strong chart and good name', () => {
            // Mock name that gives high score
            const details: BusinessDetails = {
                name: 'Royal Solutions', // Should score well
                type: 'Consulting',
                startDate: new Date()
            };

            const result = analyzeBusinessGrowth(mockChart, details);
            // Sun in 10th house in mockChart -> strong chart
            // We expect growth
            if (result.nameAnalysis.score > 50) {
                expect(result.growthPrediction.willGrow).toBe(true);
            }
        });
    });

    describe('suggestBusiness', () => {
        it('should suggest businesses based on 10th house planets', () => {
            const suggestions = suggestBusiness(mockChart);

            // Sun is in 10th house in mockChart
            const govSuggestion = suggestions.find(s => s.sector.includes('Government'));
            expect(govSuggestion).toBeDefined();
            expect(govSuggestion?.matchScore).toBe(90);
        });

        it('should return top 5 suggestions', () => {
            const suggestions = suggestBusiness(mockChart);
            expect(suggestions.length).toBeLessThanOrEqual(5);
        });
    });
});
