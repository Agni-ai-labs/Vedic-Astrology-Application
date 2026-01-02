import { VedicChart, PlanetPosition, House, D1Chart, D9Chart, DashaPeriod, Yoga, Dosha } from '@/types/vedic.types';
import { BirthDetails } from './chartCalculations';
import {
    calculatePlanets,
    calculateAscendant,
    calculateVimshottariDasha,
    SIGNS
} from './astronomy';
import { vedicLogicService, ChartData } from './vedicLogicService';
import { PLANETARY_EFFECTS } from '@/data/vedicKnowledgeBase';

const HOUSE_LORDS: Record<string, string> = {
    'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
    'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
    'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
};

function getSignIndex(name: string): number {
    return SIGNS.indexOf(name);
}

// Convert timezone string to numeric offset in hours
function getTimezoneOffset(timezone: string): number {
    const timezoneOffsets: Record<string, number> = {
        'Asia/Kolkata': 5.5,
        'Asia/Calcutta': 5.5,
        'IST': 5.5,
        'UTC': 0,
        'GMT': 0,
        'America/New_York': -5,
        'America/Los_Angeles': -8,
        'Europe/London': 0,
        'Europe/Paris': 1,
        'Asia/Tokyo': 9,
        'Australia/Sydney': 10
    };

    // Return the offset or default to IST (5.5) for India locations
    return timezoneOffsets[timezone] ?? 5.5;
}

// Convert D1Chart to ChartData for vedicLogicService
function toChartData(d1: D1Chart): ChartData {
    return {
        ascendant: d1.ascendant,
        planets: d1.planets.map(p => ({
            name: p.planet,
            sign: p.sign,
            house: p.house,
            degree: p.degree,
            isRetrograde: p.isRetrograde
        }))
    };
}

// Calculate D1 (Rashi) Chart
export function calculateD1Chart(details: BirthDetails): D1Chart {
    // Parse time
    const [hours, minutes] = details.time.split(':').map(Number);
    const birthDateTime = new Date(details.date);
    birthDateTime.setHours(hours, minutes, 0, 0);

    // Get timezone offset in hours (IST = 5.5)
    const timezoneOffset = getTimezoneOffset(details.timezone);

    // Calculate planets using accurate astronomy engine with timezone
    const astronomyPlanets = calculatePlanets(birthDateTime, details.latitude, details.longitude, timezoneOffset);

    // Filter to only 9 traditional Vedic planets (exclude Uranus, Neptune, Pluto)
    const vedicPlanetNames = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    const vedicPlanets = astronomyPlanets.filter(p => vedicPlanetNames.includes(p.name));

    // Calculate ascendant with timezone and normalize to 0-360
    let ascendantLon = calculateAscendant(birthDateTime, details.latitude, details.longitude, timezoneOffset);
    // Ensure ascendant is always positive (0-360)
    ascendantLon = ((ascendantLon % 360) + 360) % 360;
    const ascSignIndex = Math.floor(ascendantLon / 30);
    const ascendant = SIGNS[ascSignIndex];
    const ascendantDegree = ascendantLon % 30;

    // Map planets to Vedic format (only 9 Vedic planets)
    const planets: PlanetPosition[] = vedicPlanets.map(p => {
        // Calculate house based on whole sign system
        const planetSignIndex = p.signIndex;
        const house = ((planetSignIndex - ascSignIndex + 12) % 12) + 1;

        return {
            planet: p.name,
            sign: p.sign,
            degree: parseFloat(p.degreeInSign.toFixed(2)),
            house,
            isRetrograde: p.isRetrograde
        };
    });

    // Calculate houses (Whole Sign system for D1)
    // In whole sign system, each house cusp is at the start of the sign (0 degrees)
    // except house 1 which uses the exact ascendant degree
    const houses: House[] = Array.from({ length: 12 }, (_, i) => {
        const houseSignIndex = (ascSignIndex + i) % 12;
        const signName = SIGNS[houseSignIndex];
        // House cusp degree: for house 1 use ascendant degree, 
        // for others calculate based on 30-degree sign progression
        const houseDegree = i === 0 ? parseFloat(ascendantDegree.toFixed(2)) :
            parseFloat((houseSignIndex * 30).toFixed(2));

        return {
            number: i + 1,
            sign: signName,
            degree: houseDegree,
            lord: HOUSE_LORDS[signName]
        };
    });

    return {
        ascendant,
        ascendantDegree: parseFloat(ascendantDegree.toFixed(2)),
        planets,
        houses
    };
}

// Calculate D9 (Navamsa) Chart
export function calculateD9Chart(d1: D1Chart): D9Chart {
    if (d1.planets.length === 0) {
        return { ascendant: d1.ascendant, planets: [] };
    }

    const planets: PlanetPosition[] = d1.planets.map(planet => {
        const signIndex = getSignIndex(planet.sign);
        const navamsaPart = Math.floor(planet.degree / 3.333333333);
        const navamsaSignIndex = ((signIndex * 9) + navamsaPart) % 12;
        const navamsaSign = SIGNS[navamsaSignIndex];
        const degreesInNavamsa = (planet.degree % 3.333333333) * 9;

        return {
            ...planet,
            sign: navamsaSign,
            degree: parseFloat(degreesInNavamsa.toFixed(2)),
            house: 0
        };
    });

    // Calculate D9 Lagna
    const ascSignIndex = getSignIndex(d1.ascendant);
    const ascNavamsaPart = Math.floor(d1.ascendantDegree / 3.333333333);
    const ascNavamsaSignIndex = ((ascSignIndex * 9) + ascNavamsaPart) % 12;
    const navamsaAsc = SIGNS[ascNavamsaSignIndex];

    return {
        ascendant: navamsaAsc,
        planets
    };
}

// Calculate Vimshottari Dasha
export function calculateDasha(birthDate: Date, moonSign: string, moonDegree: number): DashaPeriod[] {
    const signIndex = getSignIndex(moonSign);
    const absLon = signIndex * 30 + moonDegree;

    const dashas = calculateVimshottariDasha(birthDate, absLon);

    return dashas.map(d => ({
        planet: d.lord,
        startDate: d.startDate,
        endDate: d.endDate,
        level: 'Mahadasha' as const
    }));
}

// Enhanced Yoga Detection using B.V. Raman rules
export function detectYogas(d1: D1Chart): Yoga[] {
    const yogas: Yoga[] = [];
    const chartData = toChartData(d1);

    // Use vedicLogicService for B.V. Raman yoga detection
    const ramanYogas = vedicLogicService.findYogas(chartData);

    // Convert YogaRule to Yoga type
    ramanYogas.forEach(yogaRule => {
        yogas.push({
            name: yogaRule.name,
            type: yogaRule.type === 'Raj Yoga' ? 'Raj' :
                yogaRule.type === 'Dhana Yoga' ? 'Dhana' :
                    yogaRule.type === 'Arista Yoga' ? 'Arista' : 'General',
            planets: yogaRule.requiredPlanets,
            description: yogaRule.condition,
            effects: yogaRule.result,
            strength: 'Moderate'
        });
    });

    // Additional Gajakesari Yoga check (Moon-Jupiter in kendras)
    const jupiter = d1.planets.find(p => p.planet === 'Jupiter');
    const moon = d1.planets.find(p => p.planet === 'Moon');

    if (jupiter && moon) {
        const dist = Math.abs(jupiter.house - moon.house);
        const normalizedDist = dist > 6 ? 12 - dist : dist;
        const isGajakesari = [0, 3, 6].includes(normalizedDist);

        if (isGajakesari && !yogas.some(y => y.name.includes('Gajakesari'))) {
            yogas.push({
                name: 'Gajakesari Yoga',
                type: 'Raj',
                planets: ['Jupiter', 'Moon'],
                description: 'Jupiter in Kendra from Moon',
                effects: 'Fame, wealth, intelligence, and lasting reputation',
                strength: 'Strong'
            });
        }
    }

    // Dhana Yoga detection
    const wealthHouses = [2, 5, 9, 11];
    const planetsInWealthHouses = d1.planets.filter(p => wealthHouses.includes(p.house));

    if (planetsInWealthHouses.length >= 3 && !yogas.some(y => y.name === 'Dhana Yoga')) {
        yogas.push({
            name: 'Dhana Yoga',
            type: 'Dhana',
            planets: planetsInWealthHouses.map(p => p.planet),
            description: 'Multiple planets in wealth-giving houses (2, 5, 9, 11)',
            effects: 'Financial prosperity and material abundance',
            strength: 'Strong'
        });
    }

    return yogas;
}

// Enhanced Dosha Detection using vedicLogicService
export function detectDoshas(d1: D1Chart): Dosha[] {
    const doshas: Dosha[] = [];
    const chartData = toChartData(d1);

    // Enhanced Manglik Dosha (from Lagna, Moon, AND Venus)
    const mangalResult = vedicLogicService.calculateMangalDosha(chartData);
    doshas.push({
        name: 'Manglik',
        present: mangalResult.present,
        severity: mangalResult.severity || 'None',
        details: mangalResult.description,
        remedies: mangalResult.remedies
    });

    // Enhanced Kaal Sarp Dosha (arc-based calculation)
    const kaalSarpResult = vedicLogicService.calculateKaalSarpDosha(chartData);
    doshas.push({
        name: 'Kaal Sarp',
        present: kaalSarpResult.present,
        severity: kaalSarpResult.severity || 'None',
        details: kaalSarpResult.description,
        remedies: kaalSarpResult.remedies
    });

    // Sade Sati (with current transit data approximation)
    const moon = d1.planets.find(p => p.planet === 'Moon');
    if (moon) {
        // Note: For accurate Sade Sati, we would need current Saturn transit
        // This is a placeholder that would need real-time transit data
        const currentDate = new Date();
        // Saturn's approximate sign (this would need proper transit calculation)
        const saturnApproxSign = SIGNS[Math.floor((currentDate.getFullYear() - 2020) * 0.4) % 12];

        const sadeSatiResult = vedicLogicService.calculateSadeSati(moon.sign, saturnApproxSign);
        doshas.push({
            name: 'Sade Sati',
            present: sadeSatiResult.present,
            severity: sadeSatiResult.severity || 'None',
            details: sadeSatiResult.description,
            remedies: sadeSatiResult.remedies
        });
    }

    return doshas;
}

// Get planetary interpretation from knowledge base
export function getPlanetaryInterpretation(planetName: string, house: number): string {
    return PLANETARY_EFFECTS[planetName]?.[house.toString()] ||
        `${planetName} in house ${house}: Influences the matters of this house according to its natural significations.`;
}

// Get all planetary interpretations for a chart
export function getAllPlanetaryInterpretations(d1: D1Chart): Record<string, string> {
    const interpretations: Record<string, string> = {};

    d1.planets.forEach(planet => {
        interpretations[planet.planet] = getPlanetaryInterpretation(planet.planet, planet.house);
    });

    return interpretations;
}

// Calculate Planetary Strength (Shadbala approximation)
export function calculatePlanetaryStrengths(d1: D1Chart) {
    const chartData = toChartData(d1);
    return vedicLogicService.calculatePlanetaryStrength(chartData);
}

// Main function to calculate complete Vedic chart
export function calculateVedicChart(details: BirthDetails): VedicChart {
    const d1 = calculateD1Chart(details);
    const d9 = calculateD9Chart(d1);

    // Calculate Dasha
    let currentDasha: DashaPeriod[] = [];
    const moon = d1.planets.find(p => p.planet === 'Moon');
    if (moon) {
        currentDasha = calculateDasha(details.date, moon.sign, moon.degree);
    }

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

// Export additional utilities
export {
    toChartData,
    HOUSE_LORDS
};
