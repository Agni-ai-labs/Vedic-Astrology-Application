import { describe, it, expect } from 'vitest';
import { calculateNumerology } from '../numerologyCalculations';

describe('calculateNumerology', () => {
    const mockName = 'John Doe';
    const mockDate = new Date('1990-01-01T12:00:00');

    it('should calculate Life Path number correctly', () => {
        // 1+1+1990 = 1992 -> 1+9+9+2 = 21 -> 3
        const result = calculateNumerology(mockName, mockDate);
        expect(result.lifePath.value).toBe(3);
        expect(result.lifePath.name).toBe('Life Path Number');
    });

    it('should calculate Destiny number correctly', () => {
        // JOHN DOE = 1+6+8+5 + 4+6+5 = 20 + 15 = 35 -> 8
        const result = calculateNumerology(mockName, mockDate);
        expect(result.destiny.value).toBe(8);
    });

    it('should calculate Soul Urge number correctly', () => {
        // O + O + E = 6 + 6 + 5 = 17 -> 8
        const result = calculateNumerology(mockName, mockDate);
        expect(result.soulUrge.value).toBe(8);
    });

    it('should calculate Personality number correctly', () => {
        // J+H+N + D = 1+8+5 + 4 = 18 -> 9
        const result = calculateNumerology(mockName, mockDate);
        expect(result.personality.value).toBe(9);
    });

    it('should calculate Personal Year', () => {
        const result = calculateNumerology(mockName, mockDate);
        expect(result.personalYear).toBeGreaterThan(0);
        // Personal Year can be 1-9 or 11, 22
        const validYears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22];
        expect(validYears).toContain(result.personalYear);
    });

    it('should handle master numbers correctly', () => {
        // 11/11/2009 -> 11 + 11 + 11 = 33
        const masterDate = new Date('2009-11-11');
        const result = calculateNumerology('Test', masterDate);
        expect(result.lifePath.value).toBe(33); // Should preserve master number
    });
});
