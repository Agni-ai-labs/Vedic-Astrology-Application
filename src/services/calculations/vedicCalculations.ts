import { VedicChart, PlanetPosition, House, D1Chart, D9Chart, DashaPeriod, Yoga, Dosha } from '@/types/vedic.types';
import { BirthDetails } from './chartCalculations';

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const PLANETS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

const HOUSE_LORDS: Record<string, string> = {
    'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
    'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
    'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
};

// Mock function - replace with actual astronomical calculations
function calculatePlanetPosition(_planet: string, _date: Date): { sign: string; degree: number; isRetrograde: boolean } {
    // This is a placeholder - real implementation would use Swiss Ephemeris or similar
    const signIndex = Math.floor(Math.random() * 12);
    const degree = Math.random() * 30;

    return {
        sign: ZODIAC_SIGNS[signIndex],
        degree: parseFloat(degree.toFixed(2)),
        isRetrograde: Math.random() > 0.8 // 20% chance of retrograde
    };
}

// Calculate house for a planet based on its longitude
function calculateHouse(planetDegree: number, ascendantDegree: number): number {
    let house = Math.floor(((planetDegree - ascendantDegree + 360) % 360) / 30) + 1;
    return house > 12 ? house - 12 : house;
}

// Calculate D1 (Rashi) Chart
export function calculateD1Chart(details: BirthDetails): D1Chart {
    const birthDate = new Date(details.date);

    // Calculate ascendant (simplified - real implementation needs sidereal time)
    const ascendantIndex = Math.floor((details.longitude / 30)) % 12;
    const ascendantDegree = (details.longitude % 30);
    const ascendant = ZODIAC_SIGNS[ascendantIndex];

    // Calculate planetary positions
    const planets: PlanetPosition[] = PLANETS.map(planet => {
        const pos = calculatePlanetPosition(planet, birthDate);
        const signIndex = ZODIAC_SIGNS.indexOf(pos.sign);
        const totalDegree = signIndex * 30 + pos.degree;
        const house = calculateHouse(totalDegree, ascendantIndex * 30 + ascendantDegree);

        return {
            planet,
            sign: pos.sign,
            degree: pos.degree,
            house,
            isRetrograde: pos.isRetrograde
        };
    });

    // Calculate houses
    const houses: House[] = Array.from({ length: 12 }, (_, i) => {
        const houseSignIndex = (ascendantIndex + i) % 12;
        const houseSign = ZODIAC_SIGNS[houseSignIndex];

        return {
            number: i + 1,
            sign: houseSign,
            degree: i === 0 ? ascendantDegree : 0,
            lord: HOUSE_LORDS[houseSign]
        };
    });

    return {
        ascendant,
        ascendantDegree,
        planets,
        houses
    };
}

// Calculate D9 (Navamsa) Chart
export function calculateD9Chart(d1: D1Chart): D9Chart {
    // Navamsa calculation: divide each sign into 9 parts (3°20' each)
    const planets: PlanetPosition[] = d1.planets.map(planet => {
        const signIndex = ZODIAC_SIGNS.indexOf(planet.sign);
        const navamsaPart = Math.floor(planet.degree / (30 / 9));
        const navamsaSignIndex = ((signIndex * 9) + navamsaPart) % 12;

        return {
            ...planet,
            sign: ZODIAC_SIGNS[navamsaSignIndex],
            degree: (planet.degree % (30 / 9)) * 9,
            house: 0 // Houses not typically used in D9
        };
    });

    const ascendantPlanet = d1.planets.find(p => p.planet.includes('Ascendant'));
    const navamsaAsc = ascendantPlanet ? planets[0].sign : d1.ascendant;

    return {
        ascendant: navamsaAsc,
        planets
    };
}

// Calculate Vimshottari Dasha
export function calculateDasha(birthDate: Date, _moonSign: string, moonDegree: number): DashaPeriod[] {
    // Simplified Vimshottari Dasha calculation
    const dashaLords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
    const dashaYears = [7, 20, 6, 10, 7, 18, 16, 19, 17];

    // Determine starting Dasha based on Moon's Nakshatra
    const nakshatra = Math.floor((moonDegree * 12 / 30) % 27);
    const startingDashaIndex = nakshatra % 9;

    const dashas: DashaPeriod[] = [];
    let currentDate = new Date(birthDate);

    // Calculate next 3 Mahadashas
    for (let i = 0; i < 3; i++) {
        const dashaIndex = (startingDashaIndex + i) % 9;
        const planet = dashaLords[dashaIndex];
        const years = dashaYears[dashaIndex];

        const endDate = new Date(currentDate);
        endDate.setFullYear(endDate.getFullYear() + years);

        dashas.push({
            planet,
            startDate: new Date(currentDate),
            endDate,
            level: 'Mahadasha'
        });

        currentDate = endDate;
    }

    return dashas;
}

// Detect Yogas
export function detectYogas(d1: D1Chart): Yoga[] {
    const yogas: Yoga[] = [];

    // Example: Raja Yoga (simplified)
    const lords = d1.planets.filter(p => ['Jupiter', 'Venus'].includes(p.planet));
    if (lords.length >= 2) {
        yogas.push({
            name: 'Raja Yoga',
            type: 'Raj',
            planets: lords.map(l => l.planet),
            description: 'Combination of benefic planets in favorable houses',
            effects: 'Success, authority, respect, and prosperity',
            strength: 'Moderate'
        });
    }

    // Example: Dhana Yoga (wealth)
    const wealthPlanets = d1.planets.filter(p => [2, 5, 9, 11].includes(p.house));
    if (wealthPlanets.length >= 3) {
        yogas.push({
            name: 'Dhana Yoga',
            type: 'Dhana',
            planets: wealthPlanets.map(p => p.planet),
            description: 'Planets in wealth-giving houses',
            effects: 'Financial prosperity and material abundance',
            strength: 'Strong'
        });
    }

    return yogas;
}

// Detect Doshas
export function detectDoshas(d1: D1Chart): Dosha[] {
    const doshas: Dosha[] = [];

    // Manglik Dosha
    const mars = d1.planets.find(p => p.planet === 'Mars');
    const isManglik = mars && [1, 4, 7, 8, 12].includes(mars.house);

    doshas.push({
        name: 'Manglik',
        present: !!isManglik,
        severity: isManglik ? 'Medium' : 'None',
        details: isManglik
            ? `Mars in ${mars?.house}th house indicates Manglik Dosha`
            : 'No Manglik Dosha present',
        remedies: isManglik
            ? ['Worship Lord Hanuman on Tuesdays', 'Donate red items on Tuesdays', 'Chant Hanuman Chalisa']
            : []
    });

    // Kaal Sarp Dosha
    const rahu = d1.planets.find(p => p.planet === 'Rahu');
    const ketu = d1.planets.find(p => p.planet === 'Ketu');
    const allPlanetsBetween = rahu && ketu && d1.planets
        .filter(p => !['Rahu', 'Ketu'].includes(p.planet))
        .every(p => {
            const rahuHouse = rahu.house;
            const ketuHouse = ketu.house;
            return (p.house > rahuHouse && p.house < ketuHouse) ||
                (rahuHouse > ketuHouse && (p.house > rahuHouse || p.house < ketuHouse));
        });

    doshas.push({
        name: 'Kaal Sarp',
        present: !!allPlanetsBetween,
        severity: allPlanetsBetween ? 'High' : 'None',
        details: allPlanetsBetween
            ? 'All planets hemmed between Rahu and Ketu'
            : 'No Kaal Sarp Dosha',
        remedies: allPlanetsBetween
            ? ['Visit Trimbakeshwar Temple', 'Perform Kaal Sarp Puja', 'Donate on Nag Panchami']
            : []
    });

    return doshas;
}

// Main function to calculate complete Vedic chart
export function calculateVedicChart(details: BirthDetails): VedicChart {
    const d1 = calculateD1Chart(details);
    const d9 = calculateD9Chart(d1);

    const moon = d1.planets.find(p => p.planet === 'Moon');
    const currentDasha = moon
        ? calculateDasha(details.date, moon.sign, moon.degree)
        : [];

    const yogas = detectYogas(d1);
    const doshas = detectDoshas(d1);

    return {
        birthDetails: details,
        d1,
        d9,
        currentDasha,
        yogas,
        doshas
    };
}
