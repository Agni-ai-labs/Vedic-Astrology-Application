import { describe, it, expect } from 'vitest';
import { calculatePlanets, calculateHouses, SIGNS, NAKSHATRAS } from './src/services/calculations/astronomy';

describe('Ephemeris Calculations', () => {
  it('should calculate sidereal planetary positions', () => {
    const date = new Date(Date.UTC(2025, 10, 28, 1, 22, 0));
    const lat = 28.6139;
    const lng = 77.2090;
    const timezoneOffset = 5.5; // IST

    const planets = calculatePlanets(date, lat, lng, timezoneOffset);

    expect(planets.length).toBeGreaterThan(0);
    planets.forEach(p => {
      expect(p.longitude).toBeGreaterThanOrEqual(0);
      expect(p.longitude).toBeLessThan(360);
      expect(SIGNS).toContain(p.sign);
      expect(NAKSHATRAS).toContain(p.nakshatra);
    });
  });

  it('should calculate house cusps', () => {
    const date = new Date(Date.UTC(2025, 10, 28, 1, 22, 0));
    const lat = 28.6139;
    const lng = 77.2090;
    const timezoneOffset = 5.5;

    const houses = calculateHouses(date, lat, lng, timezoneOffset);

    expect(houses.length).toBe(12);
    houses.forEach(h => {
      expect(h.longitude).toBeGreaterThanOrEqual(0);
      expect(h.longitude).toBeLessThan(360);
      expect(h.number).toBeGreaterThanOrEqual(1);
      expect(h.number).toBeLessThanOrEqual(12);
    });
  });
});

