import { describe, it, expect } from 'vitest';
import { calculateBirthChart } from '../chartCalculations';

describe('calculateBirthChart', () => {
    const mockBirthDetails = {
        name: 'Test User',
        date: new Date('1990-01-01'),
        time: '12:00',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: 'America/New_York'
    };

    it('should calculate sun sign correctly', () => {
        const chart = calculateBirthChart(mockBirthDetails);
        expect(chart.sun).toBeDefined();
        // Sidereal sun sign on Jan 1st is Sagittarius (tropical Capricorn minus ~24 degree ayanamsa)
        expect(chart.sun.sign.name).toBe('Sagittarius');
    });

    it('should calculate moon position', () => {
        const chart = calculateBirthChart(mockBirthDetails);
        expect(chart.moon).toBeDefined();
        expect(chart.moon.sign).toBeDefined();
        expect(chart.moon.degree).toBeGreaterThanOrEqual(0);
        expect(chart.moon.degree).toBeLessThan(30);
    });

    it('should calculate ascendant', () => {
        const chart = calculateBirthChart(mockBirthDetails);
        expect(chart.ascendant).toBeDefined();
        expect(chart.ascendant.sign).toBeDefined();
    });

    it('should calculate all 12 houses', () => {
        const chart = calculateBirthChart(mockBirthDetails);
        expect(chart.houses).toHaveLength(12);
        chart.houses.forEach(cusp => {
            expect(cusp).toBeGreaterThanOrEqual(0);
            expect(cusp).toBeLessThan(360);
        });
    });

    it('should calculate all major planets', () => {
        const chart = calculateBirthChart(mockBirthDetails);
        const planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

        planets.forEach(planet => {
            expect(chart[planet as keyof typeof chart]).toBeDefined();
            // @ts-ignore
            expect(chart[planet].sign).toBeDefined();
        });
    });
});
