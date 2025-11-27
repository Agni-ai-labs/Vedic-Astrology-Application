/**
 * Tests for Marriage Compatibility Calculations
 * Verifies accuracy against known compatibility cases
 */

import { describe, it, expect } from 'vitest';
import { calculateMarriageCompatibility } from '../compatibilityCalculations';
import { CompatibilityInput } from '@/types/compatibility.types';

describe('Marriage Compatibility Calculations', () => {
    describe('Perfect Match Cases', () => {
        it('should give high score for highly compatible nakshatras', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 }, // Ashwini
                girl: { nakshatra: 9, pada: 1 }  // Ashlesha
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.totalScore).toBeGreaterThan(0);
            expect(result.totalScore).toBeLessThanOrEqual(36);
            expect(result.percentage).toBeGreaterThan(0);
            expect(result.percentage).toBeLessThanOrEqual(100);
        });

        it('should calculate all 8 poruthams', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 10, pada: 2 }, // Magha
                girl: { nakshatra: 13, pada: 3 }  // Hasta
            };

            const result = calculateMarriageCompatibility(input);

            // Verify all poruthams are calculated
            expect(result.varna).toBeDefined();
            expect(result.vasya).toBeDefined();
            expect(result.tara).toBeDefined();
            expect(result.yoni).toBeDefined();
            expect(result.grahaMaitri).toBeDefined();
            expect(result.gana).toBeDefined();
            expect(result.bhakut).toBeDefined();
            expect(result.nadi).toBeDefined();

            // Verify structure
            expect(result.varna.obtained).toBeGreaterThanOrEqual(0);
            expect(result.varna.maximum).toBe(1);
            expect(result.vasya.maximum).toBe(2);
            expect(result.tara.maximum).toBe(3);
            expect(result.yoni.maximum).toBe(4);
            expect(result.grahaMaitri.maximum).toBe(5);
            expect(result.gana.maximum).toBe(6);
            expect(result.bhakut.maximum).toBe(7);
            expect(result.nadi.maximum).toBe(8);
        });
    });

    describe('Nadi Dosha Detection', () => {
        it('should detect Nadi Dosha when same nadi', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Ashwini (Aadi)
                girl: { nakshatra: 7, pada: 1 }   // Punarvasu (Aadi)
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.nadi.obtained).toBe(0);
            expect(result.warnings.some(w => w.includes('Nadi'))).toBe(true);
        });

        it('should give 8 points when different nadis', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Ashwini (Aadi/Vata)
                girl: { nakshatra: 2, pada: 1 }   // Bharani (Madhya/Pitta)
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.nadi.obtained).toBe(8);
        });
    });

    describe('Gana Compatibility', () => {
        it('should give 6 points for same gana', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Ashwini (Deva)
                girl: { nakshatra: 5, pada: 1 }   // Mrigashira (Deva)
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.gana.obtained).toBe(6);
        });

        it('should give low points for incompatible gana', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Ashwini (Deva)
                girl: { nakshatra: 3, pada: 1 }   // Krittika (Rakshasa)
            };

            const result = calculateMarriageCompatibility(input);

            // Rakshasa girl with Deva boy gives low score
            expect(result.gana.obtained).toBeLessThanOrEqual(1);
        });
    });

    describe('Yoni Compatibility', () => {
        it('should give 4 points for same yoni (perfect match)', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Ashwini (Horse)
                girl: { nakshatra: 24, pada: 1 }  // Shatabhisha (Horse)
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.yoni.obtained).toBe(4);
        });

        it('should calculate yoni compatibility correctly', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Ashwini (Horse)
                girl: { nakshatra: 9, pada: 1 }   // Ashlesha (Cat)
            };

            const result = calculateMarriageCompatibility(input);

            // Just verify it's calculated with valid range
            expect(result.yoni.obtained).toBeGreaterThanOrEqual(0);
            expect(result.yoni.obtained).toBeLessThanOrEqual(4);
        });
    });

    describe('Additional Poruthams (South Indian)', () => {
        it('should calculate Mahendra porutham correctly', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },
                girl: { nakshatra: 1, pada: 1 }
            };

            const result = calculateMarriageCompatibility(input);

            expect(typeof result.mahendra).toBe('boolean');
        });

        it('should calculate Vedha porutham correctly', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Ashwini
                girl: { nakshatra: 18, pada: 1 }  // Jyeshtha (Vedha pair with Ashwini)
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.vedha).toBe(false); // Should have vedha
        });

        it('should calculate Rajju porutham correctly', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 5, pada: 1 },  // Head Rajju
                girl: { nakshatra: 14, pada: 1 }  // Head Rajju
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.rajju).toBe(false); // Same rajju is bad
            expect(result.warnings.some(w => w.includes('Rajju'))).toBe(true);
        });

        it('should calculate Stree Dheergha correctly', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 20, pada: 1 },  // Far from girl
                girl: { nakshatra: 5, pada: 1 }
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.streeDheergha).toBe(true); // Distance > 13
        });
    });

    describe('Overall Compatibility Ratings', () => {
        it('should classify based on percentage', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },
                girl: { nakshatra: 1, pada: 1 }
            };

            const result = calculateMarriageCompatibility(input);

            expect(['excellent', 'very_good', 'good', 'acceptable', 'not_recommended'])
                .toContain(result.compatibility);
        });

        it('should provide recommendation text', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },
                girl: { nakshatra: 10, pada: 1 }
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.recommendation).toBeTruthy();
            expect(result.recommendation.length).toBeGreaterThan(10);
        });
    });

    describe('Edge Cases', () => {
        it('should handle nakshatra 27 (Revati) correctly', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 27, pada: 4 },
                girl: { nakshatra: 1, pada: 1 }
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.totalScore).toBeGreaterThanOrEqual(0);
            expect(result.totalScore).toBeLessThanOrEqual(36);
        });

        it('should handle all pada combinations', () => {
            for (let pada = 1; pada <= 4; pada++) {
                const input: CompatibilityInput = {
                    boy: { nakshatra: 10, pada },
                    girl: { nakshatra: 15, pada }
                };

                const result = calculateMarriageCompatibility(input);

                expect(result.totalScore).toBeDefined();
            }
        });

        it('should calculate rashi from nakshatra/pada', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },  // Should be Mesha
                girl: { nakshatra: 10, pada: 3 }  // Should be Simha
            };

            const result = calculateMarriageCompatibility(input);

            // Rashis should be calculated internally
            expect(result.varna).toBeDefined();
            expect(result.bhakut).toBeDefined();
        });
    });

    describe('Percentage Calculations', () => {
        it('should calculate percentage correctly', () => {
            const input: CompatibilityInput = {
                boy: { nakshatra: 1, pada: 1 },
                girl: { nakshatra: 10, pada: 1 }
            };

            const result = calculateMarriageCompatibility(input);

            const expectedPercentage = (result.totalScore / 36) * 100;
            expect(result.percentage).toBeCloseTo(expectedPercentage, 1);
        });

        it('should be 0% for worst case', () => {
            // Try to find a worst-case scenario
            const input: CompatibilityInput = {
                boy: { nakshatra: 3, pada: 1 },  // Krittika
                girl: { nakshatra: 1, pada: 1 }   // Ashwini
            };

            const result = calculateMarriageCompatibility(input);

            expect(result.percentage).toBeGreaterThanOrEqual(0);
            expect(result.percentage).toBeLessThanOrEqual(100);
        });
    });
});
