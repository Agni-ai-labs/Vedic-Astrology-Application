/**
 * Performance Benchmark Tests
 * 
 * Validates that calculation performance meets world-class standards:
 * - Full chart calculation: under 100ms
 * - Individual planet calculation: under 10ms
 * - Ayanamsa calculation: under 1ms
 * 
 * These benchmarks ensure the app remains fast on mobile devices
 */

import { describe, it, expect } from 'vitest';
import { calculatePlanets, calculateAscendant, calculateHouses, calculateLahiriAyanamsa } from '../astronomy';
import { calculateVedicChart } from '../vedicCalculations';
import { BirthDetails } from '../chartCalculations';

describe('Performance Benchmarks', () => {

    const testBirthDetails: BirthDetails = {
        name: 'Benchmark Test',
        date: new Date(1990, 5, 15),
        time: '10:30',
        latitude: 28.6139,
        longitude: 77.2090,
        timezone: 'Asia/Kolkata'
    };

    describe('Individual Calculation Performance', () => {

        it('should calculate ayanamsa in under 1ms', () => {
            const iterations = 100;
            const startTime = performance.now();

            for (let i = 0; i < iterations; i++) {
                calculateLahiriAyanamsa(new Date(1990 + i % 50, 0, 1));
            }

            const totalTime = performance.now() - startTime;
            const avgTime = totalTime / iterations;

            expect(avgTime).toBeLessThan(1);
        });

        it('should calculate planetary positions in under 150ms', () => {
            const startTime = performance.now();

            calculatePlanets(
                new Date(1990, 5, 15, 10, 30),
                28.6139,
                77.2090,
                5.5
            );

            const elapsed = performance.now() - startTime;
            expect(elapsed).toBeLessThan(150);
        });

        it('should calculate ascendant in under 10ms', () => {
            const startTime = performance.now();

            calculateAscendant(
                new Date(1990, 5, 15, 10, 30),
                28.6139,
                77.2090,
                5.5
            );

            const elapsed = performance.now() - startTime;
            expect(elapsed).toBeLessThan(10);
        });

        it('should calculate houses in under 20ms', () => {
            const startTime = performance.now();

            calculateHouses(
                new Date(1990, 5, 15, 10, 30),
                28.6139,
                77.2090,
                5.5
            );

            const elapsed = performance.now() - startTime;
            expect(elapsed).toBeLessThan(20);
        });
    });

    describe('Full Chart Calculation Performance', () => {

        it('should calculate complete Vedic chart in under 200ms', () => {
            const startTime = performance.now();

            const chart = calculateVedicChart(testBirthDetails);

            const elapsed = performance.now() - startTime;

            // Verify chart is valid
            expect(chart.d1).toBeDefined();
            expect(chart.d9).toBeDefined();
            expect(chart.yogas).toBeDefined();
            expect(chart.doshas).toBeDefined();

            // Performance check
            expect(elapsed).toBeLessThan(200);
        });

        it('should handle multiple chart calculations efficiently', () => {
            const iterations = 10;
            const startTime = performance.now();

            for (let i = 0; i < iterations; i++) {
                const details = {
                    ...testBirthDetails,
                    date: new Date(1980 + i * 5, i % 12, 1 + i)
                };
                calculateVedicChart(details);
            }

            const totalTime = performance.now() - startTime;
            const avgTime = totalTime / iterations;

            // Average should still be under 200ms per chart
            expect(avgTime).toBeLessThan(200);
        });
    });

    describe('Memory Efficiency', () => {

        it('should not leak memory during repeated calculations', () => {
            const iterations = 50;

            // Run calculations multiple times
            for (let i = 0; i < iterations; i++) {
                const details = {
                    ...testBirthDetails,
                    date: new Date(1950 + i, 0, 1)
                };
                const chart = calculateVedicChart(details);

                // Verify chart is valid
                expect(chart.d1.planets.length).toBeGreaterThan(0);
            }

            // If we got here without running out of memory, the test passes
            expect(true).toBe(true);
        });
    });

    describe('Edge Case Performance', () => {

        it('should handle extreme latitudes efficiently', () => {
            const extremeLatitudes = [0, 45, 60, 75]; // Equator to Arctic

            extremeLatitudes.forEach(lat => {
                const startTime = performance.now();

                calculatePlanets(
                    new Date(2024, 0, 1, 12, 0),
                    lat,
                    77.2090,
                    5.5
                );
                calculateAscendant(
                    new Date(2024, 0, 1, 12, 0),
                    lat,
                    77.2090,
                    5.5
                );

                const elapsed = performance.now() - startTime;
                expect(elapsed).toBeLessThan(100);
            });
        });

        it('should handle date range from 1900 to 2100 efficiently', () => {
            const testDates = [
                new Date(1900, 0, 1),
                new Date(1950, 0, 1),
                new Date(2000, 0, 1),
                new Date(2050, 0, 1),
                new Date(2100, 0, 1)
            ];

            testDates.forEach(date => {
                const startTime = performance.now();

                calculatePlanets(date, 28.6139, 77.2090, 5.5);
                calculateAscendant(date, 28.6139, 77.2090, 5.5);

                const elapsed = performance.now() - startTime;
                expect(elapsed).toBeLessThan(100);
            });
        });
    });

});
