import {
    calculatePlanets,
    calculateAscendant,
    calculateHouses,
    House as AstroHouse
} from './astronomy';
import { getZodiacSignData } from '@/data/zodiacSigns';
import { ZodiacSign } from '@/types/western.types';

export interface BirthDetails {
    name: string;
    date: Date;
    time: string; // HH:MM format
    latitude: number;
    longitude: number;
    timezone: string;
    gender?: string;
    concerns?: string[];
}

export interface PlanetaryPosition {
    sign: ZodiacSign;
    degree: number;
    house: number;
    isRetrograde: boolean;
    speed: number;
}

export interface BirthChart {
    sun: PlanetaryPosition;
    moon: PlanetaryPosition;
    mercury: PlanetaryPosition;
    venus: PlanetaryPosition;
    mars: PlanetaryPosition;
    jupiter: PlanetaryPosition;
    saturn: PlanetaryPosition;
    uranus: PlanetaryPosition;
    neptune: PlanetaryPosition;
    pluto: PlanetaryPosition;
    rahu: PlanetaryPosition;
    ketu: PlanetaryPosition;
    ascendant: {
        sign: ZodiacSign;
        degree: number;
    };
    houses: number[]; // 12 house cusps in degrees
}

function getZodiacPosition(siderealLon: number): { sign: ZodiacSign; degree: number } {
    const normalizedLon = ((siderealLon % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLon / 30);
    const degree = normalizedLon % 30;

    // Map to Sign Name (0 = Aries, etc.)
    const signNames = [
        'Aries', 'Taurus', 'Gemini', 'Cancer',
        'Leo', 'Virgo', 'Libra', 'Scorpio',
        'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const signName = signNames[signIndex];

    return {
        sign: getZodiacSignData(signName),
        degree: parseFloat(degree.toFixed(2))
    };
}

function getHouseForPlanet(planetLon: number, houses: AstroHouse[]): number {
    for (let i = 0; i < houses.length; i++) {
        const currentHouse = houses[i];
        const nextHouse = houses[(i + 1) % houses.length];

        let start = currentHouse.longitude;
        let end = nextHouse.longitude;

        // Handle wrap around
        if (end < start) {
            end += 360;
        }

        let pLon = planetLon;
        if (pLon < start) {
            pLon += 360;
        }

        if (pLon >= start && pLon < end) {
            return currentHouse.number;
        }
    }
    // Fallback
    return 1;
}

export function calculateBirthChart(details: BirthDetails): BirthChart {
    // Combine date and time
    const [hours, minutes] = details.time.split(':').map(Number);
    const birthDateTime = new Date(details.date);
    birthDateTime.setHours(hours, minutes, 0, 0);

    // Get time zone offset (simplified, ideally usage of timezone string)
    // For now assuming the date object already handles UTC or we need to pass numeric offset if available.
    // The details.timezone is a string (e.g. "Asia/Kolkata").
    // We'll trust the Date object construction if it's correct, OR we might need logic if 'details.date' is just YYYY-MM-DD.
    // Assuming birthDateTime is effectively Local Time.
    // calculatingPlanets in astronomy.ts takes (date, ...). 
    // It converts to UTC internally if we pass local date? No, it expects Date object which is absolute time.
    // So if birthDateTime is "2023-01-01T10:00:00" in Local, we need to ensure it represents the correct absolute time.

    // Let's rely on standard Date behavior for now.

    // 1. Calculate Planets
    const planets = calculatePlanets(birthDateTime, details.latitude, details.longitude);

    // 2. Calculate Houses
    const housesData = calculateHouses(birthDateTime, details.latitude, details.longitude);
    const houseCusps = housesData.map(h => h.longitude);

    // 3. Calculate Ascendant
    const ascendantLon = calculateAscendant(birthDateTime, details.latitude, details.longitude);
    const ascendant = getZodiacPosition(ascendantLon);

    // Helper to map AstroPlanet to PlanetaryPosition
    const mapPlanet = (planetName: string): PlanetaryPosition => {
        const p = planets.find(pl => pl.name === planetName);
        if (!p) {
            // Should not happen if astronomy.ts covers all
            // Return dummy or throw
            throw new Error(`Planet ${planetName} not found in calculation results`);
        }

        const pos = getZodiacPosition(p.longitude);
        const house = getHouseForPlanet(p.longitude, housesData);

        return {
            sign: pos.sign, // Full ZodiacSign object
            degree: parseFloat(p.degreeInSign.toFixed(2)),
            house: house,
            isRetrograde: p.isRetrograde,
            speed: parseFloat(p.speed.toFixed(4))
        };
    };

    return {
        sun: mapPlanet('Sun'),
        moon: mapPlanet('Moon'),
        mercury: mapPlanet('Mercury'),
        venus: mapPlanet('Venus'),
        mars: mapPlanet('Mars'),
        jupiter: mapPlanet('Jupiter'),
        saturn: mapPlanet('Saturn'),
        uranus: mapPlanet('Uranus'),
        neptune: mapPlanet('Neptune'),
        pluto: mapPlanet('Pluto'),
        rahu: mapPlanet('Rahu'),
        ketu: mapPlanet('Ketu'),
        ascendant,
        houses: houseCusps
    };
}
