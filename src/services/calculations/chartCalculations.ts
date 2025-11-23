import * as Astronomy from 'astronomy-engine';
import { getZodiacSignData } from '@/data/zodiacSigns';
import { ZodiacSign } from '@/types/western.types';

export interface BirthDetails {
    name: string;
    date: Date;
    time: string; // HH:MM format
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface PlanetaryPosition {
    sign: ZodiacSign;
    degree: number;
    house: number;
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
    ascendant: {
        sign: ZodiacSign;
        degree: number;
    };
    houses: number[]; // 12 house cusps in degrees
}



const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function getZodiacPosition(eclipticLongitude: number): { sign: ZodiacSign; degree: number } {
    const normalizedLon = ((eclipticLongitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLon / 30);
    const degree = normalizedLon % 30;
    const signName = ZODIAC_SIGNS[signIndex];

    return {
        sign: getZodiacSignData(signName),
        degree: parseFloat(degree.toFixed(2))
    };
}

function calculateHouseCusp(ascendantDegree: number, houseNumber: number): number {
    // Simple Placidus-style calculation (simplified for now)
    const cuspDegree = (ascendantDegree + (houseNumber - 1) * 30) % 360;
    return cuspDegree;
}

function getHouseForPlanet(planetDegree: number, houses: number[]): number {
    for (let i = 0; i < 12; i++) {
        const currentHouse = houses[i];
        const nextHouse = houses[(i + 1) % 12];

        if (nextHouse > currentHouse) {
            if (planetDegree >= currentHouse && planetDegree < nextHouse) {
                return i + 1;
            }
        } else {
            // Handle wrap-around at 360 degrees
            if (planetDegree >= currentHouse || planetDegree < nextHouse) {
                return i + 1;
            }
        }
    }
    return 1; // Default to 1st house if calculation fails
}

export function calculateBirthChart(details: BirthDetails): BirthChart {
    // Combine date and time
    const [hours, minutes] = details.time.split(':').map(Number);
    const birthDateTime = new Date(details.date);
    birthDateTime.setHours(hours, minutes, 0, 0);

    // Calculate Sun position (SunPosition returns ecliptic coordinates)
    const sunPos = Astronomy.SunPosition(birthDateTime);
    const sun = getZodiacPosition(sunPos.elon);

    // Calculate Moon position  
    const moonLon = Astronomy.EclipticLongitude(Astronomy.Body.Moon, birthDateTime);
    const moon = getZodiacPosition(moonLon);

    // Calculate other planets using GeoVector
    const mercuryVec = Astronomy.GeoVector(Astronomy.Body.Mercury, birthDateTime, false);
    const mercuryEcl = Astronomy.Ecliptic(mercuryVec);
    const mercury = getZodiacPosition(mercuryEcl.elon);

    const venusVec = Astronomy.GeoVector(Astronomy.Body.Venus, birthDateTime, false);
    const venusEcl = Astronomy.Ecliptic(venusVec);
    const venus = getZodiacPosition(venusEcl.elon);

    const marsVec = Astronomy.GeoVector(Astronomy.Body.Mars, birthDateTime, false);
    const marsEcl = Astronomy.Ecliptic(marsVec);
    const mars = getZodiacPosition(marsEcl.elon);

    const jupiterVec = Astronomy.GeoVector(Astronomy.Body.Jupiter, birthDateTime, false);
    const jupiterEcl = Astronomy.Ecliptic(jupiterVec);
    const jupiter = getZodiacPosition(jupiterEcl.elon);

    const saturnVec = Astronomy.GeoVector(Astronomy.Body.Saturn, birthDateTime, false);
    const saturnEcl = Astronomy.Ecliptic(saturnVec);
    const saturn = getZodiacPosition(saturnEcl.elon);

    const uranusVec = Astronomy.GeoVector(Astronomy.Body.Uranus, birthDateTime, false);
    const uranusEcl = Astronomy.Ecliptic(uranusVec);
    const uranus = getZodiacPosition(uranusEcl.elon);

    const neptuneVec = Astronomy.GeoVector(Astronomy.Body.Neptune, birthDateTime, false);
    const neptuneEcl = Astronomy.Ecliptic(neptuneVec);
    const neptune = getZodiacPosition(neptuneEcl.elon);

    const plutoVec = Astronomy.GeoVector(Astronomy.Body.Pluto, birthDateTime, false);
    const plutoEcl = Astronomy.Ecliptic(plutoVec);
    const pluto = getZodiacPosition(plutoEcl.elon);

    // Calculate Ascendant (Rising Sign)
    // Using sidereal time and latitude to approximate ascendant
    const lst = Astronomy.SiderealTime(birthDateTime);
    const ascendantDegree = ((lst * 15 + details.longitude) % 360 + 360) % 360;
    const ascendant = getZodiacPosition(ascendantDegree);

    // Calculate house cusps
    const houses: number[] = [];
    for (let i = 1; i <= 12; i++) {
        houses.push(calculateHouseCusp(ascendantDegree, i));
    }

    return {
        sun: { ...sun, house: getHouseForPlanet(sunPos.elon, houses) },
        moon: { ...moon, house: getHouseForPlanet(moonLon, houses) },
        mercury: { ...mercury, house: getHouseForPlanet(mercuryEcl.elon, houses) },
        venus: { ...venus, house: getHouseForPlanet(venusEcl.elon, houses) },
        mars: { ...mars, house: getHouseForPlanet(marsEcl.elon, houses) },
        jupiter: { ...jupiter, house: getHouseForPlanet(jupiterEcl.elon, houses) },
        saturn: { ...saturn, house: getHouseForPlanet(saturnEcl.elon, houses) },
        uranus: { ...uranus, house: getHouseForPlanet(uranusEcl.elon, houses) },
        neptune: { ...neptune, house: getHouseForPlanet(neptuneEcl.elon, houses) },
        pluto: { ...pluto, house: getHouseForPlanet(plutoEcl.elon, houses) },
        ascendant,
        houses
    };
}
