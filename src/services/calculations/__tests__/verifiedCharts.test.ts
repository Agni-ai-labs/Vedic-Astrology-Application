/**
 * Verified Birth Chart Regression Tests
 * These tests validate calculations against known Kundali data
 * 
 * Sources:
 * - Kundali.pdf (included in project)
 * - Manual verification against Jagannatha Hora software
 */

import { describe, it, expect } from 'vitest';
import { calculatePlanets, calculateAscendant, SIGNS, NAKSHATRAS } from '../astronomy';

// Test Case Data based on verified Kundalis
interface VerifiedChart {
    name: string;
    birthDate: Date;
    latitude: number;
    longitude: number;
    timezone: number;
    expected: {
        moonSign: string;
        moonNakshatra: string;
        sunSign: string;
        ascendantSign: string;
    };
}

const verifiedCharts: VerifiedChart[] = [
    {
        // Case 1: Gorakhpur, India - Oct 11, 1997, 6:45 AM IST
        name: 'Test Case Gorakhpur 1997',
        birthDate: new Date(1997, 9, 11, 6, 45),
        latitude: 26.76,
        longitude: 83.37,
        timezone: 5.5,
        expected: {
            moonSign: 'Capricorn',
            moonNakshatra: 'Shravana',
            sunSign: 'Virgo',
            ascendantSign: 'Aquarius'
        }
    },
    {
        // Case 2: Padrauna, UP - May 26, 1992, 7:50 AM IST (from Kundali.pdf)
        name: 'Test Case Padrauna 1992',
        birthDate: new Date(1992, 4, 26, 7, 50),
        latitude: 26.9025,
        longitude: 83.9822,
        timezone: 5.5,
        expected: {
            moonSign: 'Aquarius',
            moonNakshatra: 'Purva Bhadrapada',
            sunSign: 'Taurus',
            ascendantSign: 'Taurus'
        }
    },
    {
        // Case 3: New Delhi - Jan 26, 1950, 10:18 AM IST (Republic Day)
        name: 'India Republic Chart',
        birthDate: new Date(1950, 0, 26, 10, 18),
        latitude: 28.6139,
        longitude: 77.2090,
        timezone: 5.5,
        expected: {
            moonSign: 'Aries',
            moonNakshatra: 'Ashwini',
            sunSign: 'Capricorn',
            ascendantSign: 'Virgo'
        }
    },
    {
        // Case 4: Mumbai - Aug 15, 1947, 00:00 AM IST (Independence)
        name: 'India Independence Chart',
        birthDate: new Date(1947, 7, 15, 0, 0),
        latitude: 18.9750,
        longitude: 72.8258,
        timezone: 5.5,
        expected: {
            moonSign: 'Cancer',
            moonNakshatra: 'Pushya',
            sunSign: 'Cancer',
            ascendantSign: 'Cancer'
        }
    },
    {
        // Case 5: Varanasi - Classic test date
        name: 'Varanasi Test 2000',
        birthDate: new Date(2000, 0, 1, 12, 0),
        latitude: 25.3176,
        longitude: 82.9739,
        timezone: 5.5,
        expected: {
            moonSign: 'Libra',
            moonNakshatra: 'Swati',
            sunSign: 'Sagittarius',
            ascendantSign: 'Leo'
        }
    }
];

describe('Verified Birth Chart Regression Tests', () => {

    verifiedCharts.forEach((chart) => {
        describe(chart.name, () => {

            it('should calculate Moon sign correctly', () => {
                const planets = calculatePlanets(
                    chart.birthDate,
                    chart.latitude,
                    chart.longitude,
                    chart.timezone
                );
                const moon = planets.find(p => p.name === 'Moon');

                expect(moon).toBeDefined();
                expect(moon!.sign).toBe(chart.expected.moonSign);
            });

            it('should calculate Moon nakshatra correctly', () => {
                const planets = calculatePlanets(
                    chart.birthDate,
                    chart.latitude,
                    chart.longitude,
                    chart.timezone
                );
                const moon = planets.find(p => p.name === 'Moon');

                expect(moon).toBeDefined();
                expect(moon!.nakshatra).toBe(chart.expected.moonNakshatra);
            });

            it('should calculate Sun sign correctly', () => {
                const planets = calculatePlanets(
                    chart.birthDate,
                    chart.latitude,
                    chart.longitude,
                    chart.timezone
                );
                const sun = planets.find(p => p.name === 'Sun');

                expect(sun).toBeDefined();
                expect(sun!.sign).toBe(chart.expected.sunSign);
            });

            it('should calculate Ascendant sign correctly', () => {
                const ascendantDeg = calculateAscendant(
                    chart.birthDate,
                    chart.latitude,
                    chart.longitude,
                    chart.timezone
                );

                // Normalize to 0-360
                const normalizedAsc = ((ascendantDeg % 360) + 360) % 360;
                const ascSignIndex = Math.floor(normalizedAsc / 30);
                const ascSign = SIGNS[ascSignIndex];

                expect(ascSign).toBe(chart.expected.ascendantSign);
            });
        });
    });

    // Additional validation tests
    describe('Calculation Integrity', () => {

        it('should always return positive longitude values', () => {
            verifiedCharts.forEach(chart => {
                const planets = calculatePlanets(
                    chart.birthDate,
                    chart.latitude,
                    chart.longitude,
                    chart.timezone
                );

                planets.forEach(p => {
                    expect(p.longitude).toBeGreaterThanOrEqual(0);
                    expect(p.longitude).toBeLessThan(360);
                });
            });
        });

        it('should always return valid nakshatra values', () => {
            verifiedCharts.forEach(chart => {
                const planets = calculatePlanets(
                    chart.birthDate,
                    chart.latitude,
                    chart.longitude,
                    chart.timezone
                );

                planets.forEach(p => {
                    expect(NAKSHATRAS).toContain(p.nakshatra);
                    expect(p.pada).toBeGreaterThanOrEqual(1);
                    expect(p.pada).toBeLessThanOrEqual(4);
                });
            });
        });

        it('should calculate Rahu and Ketu as exactly opposite', () => {
            verifiedCharts.forEach(chart => {
                const planets = calculatePlanets(
                    chart.birthDate,
                    chart.latitude,
                    chart.longitude,
                    chart.timezone
                );

                const rahu = planets.find(p => p.name === 'Rahu');
                const ketu = planets.find(p => p.name === 'Ketu');

                expect(rahu).toBeDefined();
                expect(ketu).toBeDefined();

                const diff = Math.abs(rahu!.longitude - ketu!.longitude);
                // Should be 180 degrees apart (with small tolerance for calculation)
                expect(Math.abs(diff - 180)).toBeLessThan(0.01);
            });
        });
    });
});
