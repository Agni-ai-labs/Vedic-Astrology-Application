import { describe, it, expect } from 'vitest';
import { calculateLalKitabChart } from '../lalkitabCalculations';
import { BirthDetails } from '../chartCalculations';

describe('calculateLalKitabChart', () => {
    const mockBirthDetails: BirthDetails = {
        name: 'Test User',
        date: new Date('1990-01-01'),
        time: '12:00',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: 'America/New_York'
    };

    it('should calculate Lal Kitab chart structure', () => {
        const chart = calculateLalKitabChart(mockBirthDetails);
        expect(chart.houses).toHaveLength(12);
        expect(chart.planets).toHaveLength(9);
    });

    it('should identify sleeping houses', () => {
        const chart = calculateLalKitabChart(mockBirthDetails);
        const sleepingHouses = chart.houses.filter(h => h.isSleeping);
        // Random mock logic, but should be boolean
        expect(typeof sleepingHouses[0]?.isSleeping).toBe('boolean');
    });

    it('should calculate karmic debts', () => {
        const chart = calculateLalKitabChart(mockBirthDetails);
        expect(chart.debts).toBeDefined();
        expect(Array.isArray(chart.debts)).toBe(true);

        if (chart.debts.length > 0) {
            expect(chart.debts[0].type).toBeDefined();
            expect(chart.debts[0].remedy).toBeDefined();
        }
    });

    it('should generate remedies', () => {
        const chart = calculateLalKitabChart(mockBirthDetails);
        expect(chart.remedies).toBeDefined();
        expect(chart.remedies.length).toBeGreaterThan(0);
        expect(chart.remedies[0].type).toBeDefined();
    });

    it('should calculate Varshphal', () => {
        const chart = calculateLalKitabChart(mockBirthDetails);
        expect(chart.varshphal).toBeDefined();
        expect(chart.varshphal.year).toBe(new Date().getFullYear());
        expect(chart.varshphal.predictions.length).toBeGreaterThan(0);
    });
});
