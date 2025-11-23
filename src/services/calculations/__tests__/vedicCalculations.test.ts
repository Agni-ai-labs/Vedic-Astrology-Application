import { describe, it, expect } from 'vitest';
import { calculateVedicChart } from '../vedicCalculations';
import { BirthDetails } from '../chartCalculations';

describe('calculateVedicChart', () => {
    const mockBirthDetails: BirthDetails = {
        name: 'Test User',
        date: new Date('1990-01-01'),
        time: '12:00',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: 'America/New_York'
    };

    it('should calculate D1 chart', () => {
        const chart = calculateVedicChart(mockBirthDetails);
        expect(chart.d1).toBeDefined();
        expect(chart.d1.planets).toHaveLength(9); // Sun to Ketu
        expect(chart.d1.houses).toHaveLength(12);
        expect(chart.d1.ascendant).toBeDefined();
    });

    it('should calculate D9 chart', () => {
        const chart = calculateVedicChart(mockBirthDetails);
        expect(chart.d9).toBeDefined();
        expect(chart.d9.planets).toHaveLength(9);
    });

    it('should calculate Vimshottari Dasha', () => {
        const chart = calculateVedicChart(mockBirthDetails);
        expect(chart.currentDasha).toBeDefined();
        expect(chart.currentDasha.length).toBeGreaterThan(0);

        const currentDasha = chart.currentDasha[0];
        expect(currentDasha.level).toBe('Mahadasha');
        expect(currentDasha.startDate).toBeInstanceOf(Date);
        expect(currentDasha.endDate).toBeInstanceOf(Date);
    });

    it('should detect Yogas', () => {
        const chart = calculateVedicChart(mockBirthDetails);
        expect(chart.yogas).toBeDefined();
        // Since it's mocked, we might get random yogas, but array should exist
        expect(Array.isArray(chart.yogas)).toBe(true);
    });

    it('should detect Doshas', () => {
        const chart = calculateVedicChart(mockBirthDetails);
        expect(chart.doshas).toBeDefined();
        expect(chart.doshas.length).toBeGreaterThan(0);

        const manglik = chart.doshas.find(d => d.name === 'Manglik');
        expect(manglik).toBeDefined();
    });
});
