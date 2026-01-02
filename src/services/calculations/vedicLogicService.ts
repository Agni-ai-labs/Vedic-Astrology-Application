/**
 * Vedic Logic Service
 * 
 * Comprehensive calculation service for Vedic astrology analysis.
 * Implements classical principles from BPHS and B.V. Raman texts.
 */

import { RAMAN_YOGAS, PLANETARY_FRIENDSHIP, MARANA_KARAKA_STHANA, HOUSE_LORDS } from '@/data/vedicKnowledgeBase';
import { NAKSHATRAS_DATA } from '@/data/vedangaJyotishaData';
import { YogaRule } from '@/types/yoga.types';

// Constants
const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const DASHA_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17]; // Total 120 years

// Types
export interface ChartData {
    ascendant: string;
    planets: PlanetData[];
}

export interface PlanetData {
    name: string;
    sign: string;
    house: number;
    degree: number;
    isRetrograde?: boolean;
}

export interface DashaPeriod {
    planet: string;
    startDate: Date;
    endDate: Date;
    isCurrent: boolean;
}

export interface DoshaResult {
    name: string;
    present: boolean;
    description: string;
    severity?: 'Low' | 'Medium' | 'High' | 'None';
    remedies: string[];
}

export interface PlanetaryStrength {
    planet: string;
    score: number;
    status: 'Weak' | 'Average' | 'Strong' | 'Exalted' | 'Debilitated';
    components: {
        sthanabal: number;
        digbal: number;
        cheshtabal: number;
    };
}

// Service Class
export class VedicLogicService {

    /**
     * Calculate Nakshatra from Moon longitude
     */
    public calculateNakshatra(moonLongitude: number): { name: string, lord: string, pada: number, elapsed: number } {
        const nakshatraSpan = 360 / 27; // 13.3333 degrees
        const index = Math.floor(moonLongitude / nakshatraSpan);
        const nakshatra = NAKSHATRAS_DATA[index];

        const degreesInNakshatra = moonLongitude % nakshatraSpan;
        const pada = Math.floor(degreesInNakshatra / (nakshatraSpan / 4)) + 1;
        const elapsed = degreesInNakshatra / nakshatraSpan;

        return {
            name: nakshatra?.name || 'Unknown',
            lord: nakshatra?.lord || 'Unknown',
            pada,
            elapsed
        };
    }

    /**
     * Vimshottari Dasha System
     */
    public calculateVimshottariDasha(dob: Date, moonLongitude: number): DashaPeriod[] {
        const nakshatra = this.calculateNakshatra(moonLongitude);
        const startIndex = DASHA_LORDS.indexOf(nakshatra.lord);
        const balanceYears = DASHA_YEARS[startIndex] * (1 - nakshatra.elapsed);

        const periods: DashaPeriod[] = [];
        let currentDate = new Date(dob);

        // First Dasha (Balance)
        let endDate = new Date(currentDate);
        endDate.setFullYear(endDate.getFullYear() + Math.floor(balanceYears));
        const remDays = (balanceYears % 1) * 365.25;
        endDate.setDate(endDate.getDate() + remDays);

        periods.push({
            planet: DASHA_LORDS[startIndex],
            startDate: new Date(currentDate),
            endDate: new Date(endDate),
            isCurrent: false
        });

        currentDate = new Date(endDate);

        // Subsequent Dashas
        for (let i = 1; i < 9; i++) {
            const dashaIndex = (startIndex + i) % 9;
            const years = DASHA_YEARS[dashaIndex];

            endDate = new Date(currentDate);
            endDate.setFullYear(endDate.getFullYear() + years);

            periods.push({
                planet: DASHA_LORDS[dashaIndex],
                startDate: new Date(currentDate),
                endDate: new Date(endDate),
                isCurrent: false
            });

            currentDate = new Date(endDate);
        }

        // Mark current dasha
        const now = new Date();
        periods.forEach(p => {
            if (now >= p.startDate && now <= p.endDate) {
                p.isCurrent = true;
            }
        });

        return periods;
    }

    /**
     * Planetary Strength Calculation (Simplified Shadbala)
     */
    public calculatePlanetaryStrength(chart: ChartData): PlanetaryStrength[] {
        const exaltationSigns: Record<string, string> = {
            'Sun': 'Aries', 'Moon': 'Taurus', 'Mars': 'Capricorn',
            'Mercury': 'Virgo', 'Jupiter': 'Cancer', 'Venus': 'Pisces', 'Saturn': 'Libra'
        };

        const debilitationSigns: Record<string, string> = {
            'Sun': 'Libra', 'Moon': 'Scorpio', 'Mars': 'Cancer',
            'Mercury': 'Pisces', 'Jupiter': 'Capricorn', 'Venus': 'Virgo', 'Saturn': 'Aries'
        };

        const ownSigns: Record<string, string[]> = {
            'Sun': ['Leo'], 'Moon': ['Cancer'],
            'Mars': ['Aries', 'Scorpio'], 'Mercury': ['Gemini', 'Virgo'],
            'Jupiter': ['Sagittarius', 'Pisces'], 'Venus': ['Taurus', 'Libra'],
            'Saturn': ['Capricorn', 'Aquarius']
        };

        return chart.planets.map(planet => {
            let sthanabal = 50; // Base score
            let digbal = 0;
            let cheshtabal = 0;

            // 1. Sthana Bala (Positional Strength)
            if (exaltationSigns[planet.name] === planet.sign) {
                sthanabal += 30;
            } else if (debilitationSigns[planet.name] === planet.sign) {
                sthanabal -= 30;
            } else if (ownSigns[planet.name]?.includes(planet.sign)) {
                sthanabal += 20;
            }

            // Check if in friendly/enemy sign
            const signLord = HOUSE_LORDS[planet.sign];
            if (signLord && planet.name !== signLord) {
                const friendship = PLANETARY_FRIENDSHIP[planet.name];
                if (friendship?.friends.includes(signLord)) {
                    sthanabal += 10;
                } else if (friendship?.enemies.includes(signLord)) {
                    sthanabal -= 10;
                }
            }

            // 2. Digbala (Directional Strength)
            if (['Jupiter', 'Mercury'].includes(planet.name) && planet.house === 1) digbal = 15;
            if (['Sun', 'Mars'].includes(planet.name) && planet.house === 10) digbal = 15;
            if (planet.name === 'Saturn' && planet.house === 7) digbal = 15;
            if (['Moon', 'Venus'].includes(planet.name) && planet.house === 4) digbal = 15;

            // 3. Cheshta Bala (Retrograde strength)
            if (planet.isRetrograde && !['Rahu', 'Ketu'].includes(planet.name)) {
                cheshtabal = 20;
            }

            // Marana Karaka Sthana (planet loses strength)
            if (MARANA_KARAKA_STHANA[planet.name] === planet.house) {
                sthanabal -= 20;
            }

            const totalScore = sthanabal + digbal + cheshtabal;

            let status: PlanetaryStrength['status'] = 'Average';
            if (exaltationSigns[planet.name] === planet.sign) status = 'Exalted';
            else if (debilitationSigns[planet.name] === planet.sign) status = 'Debilitated';
            else if (totalScore > 75) status = 'Strong';
            else if (totalScore < 35) status = 'Weak';

            return {
                planet: planet.name,
                score: Math.max(0, Math.min(100, totalScore)),
                status,
                components: { sthanabal, digbal, cheshtabal }
            };
        });
    }

    /**
     * Mangal Dosha (Kuja Dosha)
     * Mars in 1, 2, 4, 7, 8, 12 from Lagna, Moon, or Venus
     */
    public calculateMangalDosha(chart: ChartData): DoshaResult {
        const mars = chart.planets.find(p => p.name === 'Mars');
        const moon = chart.planets.find(p => p.name === 'Moon');
        const venus = chart.planets.find(p => p.name === 'Venus');

        if (!mars) {
            return { name: 'Mangal Dosha', present: false, severity: 'None', description: 'Mars not found', remedies: [] };
        }

        const doshaHouses = [1, 2, 4, 7, 8, 12];

        const fromLagna = mars.house;
        const fromMoon = moon ? ((mars.house - moon.house + 12) % 12 || 12) : 0;
        const fromVenus = venus ? ((mars.house - venus.house + 12) % 12 || 12) : 0;

        const isDoshaLagna = doshaHouses.includes(fromLagna);
        const isDoshaMoon = doshaHouses.includes(fromMoon);
        const isDoshaVenus = doshaHouses.includes(fromVenus);

        if (isDoshaLagna || isDoshaMoon || isDoshaVenus) {
            const sources: string[] = [];
            if (isDoshaLagna) sources.push('Lagna');
            if (isDoshaMoon) sources.push('Moon');
            if (isDoshaVenus) sources.push('Venus');

            let severity: 'Low' | 'Medium' | 'High' = 'Low';
            if (sources.length >= 2) severity = 'High';
            else if (isDoshaLagna) severity = 'Medium';

            return {
                name: 'Mangal Dosha (Kuja Dosha)',
                present: true,
                description: `Mars is in house ${mars.house}, creating Manglik influence from: ${sources.join(', ')}. This affects marital harmony and relationships.`,
                severity,
                remedies: [
                    'Kumbh Vivah (ceremonial marriage to a pot/tree) before actual marriage',
                    'Chant Hanuman Chalisa every Tuesday',
                    'Visit a Lord Kartikeya temple',
                    'Donate red lentils (masoor dal) on Tuesdays',
                    'Wear a coral (Moonga) gemstone after consultation'
                ]
            };
        }

        return {
            name: 'Mangal Dosha',
            present: false,
            severity: 'None',
            description: 'No Mangal Dosha detected. Mars is well-placed.',
            remedies: []
        };
    }

    /**
     * Kaal Sarp Dosha
     * All planets hemmed between Rahu and Ketu
     */
    public calculateKaalSarpDosha(chart: ChartData): DoshaResult {
        const rahu = chart.planets.find(p => p.name === 'Rahu');
        const ketu = chart.planets.find(p => p.name === 'Ketu');

        if (!rahu || !ketu) {
            return { name: 'Kaal Sarp Dosha', present: false, severity: 'None', description: 'Nodes missing from chart', remedies: [] };
        }

        const otherPlanets = chart.planets.filter(p => !['Rahu', 'Ketu'].includes(p.name));

        // Calculate arc from Rahu to Ketu
        const arc1Houses: number[] = [];
        let h = rahu.house;
        while (h !== ketu.house) {
            arc1Houses.push(h);
            h = (h % 12) + 1;
        }
        arc1Houses.push(ketu.house);

        // Calculate arc from Ketu to Rahu  
        const arc2Houses: number[] = [];
        h = ketu.house;
        while (h !== rahu.house) {
            arc2Houses.push(h);
            h = (h % 12) + 1;
        }
        arc2Houses.push(rahu.house);

        const inArc1 = otherPlanets.every(p => arc1Houses.includes(p.house));
        const inArc2 = otherPlanets.every(p => arc2Houses.includes(p.house));

        if (inArc1 || inArc2) {
            const direction = inArc1 ? 'ascending' : 'descending';
            return {
                name: 'Kaal Sarp Dosha',
                present: true,
                description: `All planets are hemmed between Rahu and Ketu in ${direction} pattern. This creates intensity and struggles but can lead to great success after age 42.`,
                severity: 'High',
                remedies: [
                    'Chant the Maha Mrityunjaya Mantra daily',
                    'Perform Rudra Abhishek on Mondays',
                    'Visit Trimbakeshwar or Kalahasti temple',
                    'Donate to snake conservation causes',
                    'Wear a Gomed (Hessonite) after consultation'
                ]
            };
        }

        return {
            name: 'Kaal Sarp Dosha',
            present: false,
            severity: 'None',
            description: 'No Kaal Sarp Dosha detected. Planets are not hemmed between nodes.',
            remedies: []
        };
    }

    /**
     * Sade Sati Detection
     * Saturn transiting 12th, 1st, or 2nd from natal Moon
     */
    public calculateSadeSati(natalMoonSign: string, transitSaturnSign: string): DoshaResult {
        const moonSignIndex = ZODIAC_SIGNS.indexOf(natalMoonSign);
        const saturnSignIndex = ZODIAC_SIGNS.indexOf(transitSaturnSign);

        if (moonSignIndex === -1 || saturnSignIndex === -1) {
            return { name: 'Sade Sati', present: false, severity: 'None', description: 'Unable to determine positions', remedies: [] };
        }

        const dist = (saturnSignIndex - moonSignIndex + 12) % 12;

        if (dist === 11 || dist === 0 || dist === 1) {
            const phases: Record<number, string> = {
                11: 'First Phase (Rising) - Saturn entering 12th from Moon',
                0: 'Second Phase (Peak) - Saturn over natal Moon',
                1: 'Third Phase (Setting) - Saturn in 2nd from Moon'
            };

            return {
                name: 'Sade Sati',
                present: true,
                description: `${phases[dist]}. This 7.5 year period of Saturn transit brings transformation, discipline, and karmic balancing.`,
                severity: dist === 0 ? 'High' : 'Medium',
                remedies: [
                    'Chant Hanuman Chalisa, especially on Saturdays',
                    'Light sesame oil lamp under a Peepal tree on Saturdays',
                    'Perform Shani Abhishekam or Shani Puja',
                    'Help the elderly and disabled',
                    'Donate black items on Saturdays',
                    'Wear a Blue Sapphire (Neelam) only after expert consultation'
                ]
            };
        }

        return {
            name: 'Sade Sati',
            present: false,
            severity: 'None',
            description: `Saturn is ${dist + 1} houses away from your Moon sign. No Sade Sati currently active.`,
            remedies: []
        };
    }

    /**
     * Yoga Detection using B.V. Raman rules
     */
    public findYogas(chart: ChartData): YogaRule[] {
        const detectedYogas: YogaRule[] = [];
        const getPlanet = (name: string) => chart.planets.find(p => p.name === name);
        const ascIndex = ZODIAC_SIGNS.indexOf(chart.ascendant);

        RAMAN_YOGAS.forEach(yoga => {
            let isPresent = false;

            // Gajakesari Yoga
            if (yoga.name.includes("Gajakesari")) {
                const jup = getPlanet("Jupiter");
                const moon = getPlanet("Moon");
                if (jup && moon) {
                    const dist = Math.abs(jup.house - moon.house);
                    const normalizedDist = dist > 6 ? 12 - dist : dist;
                    if ([0, 3, 6].includes(normalizedDist)) isPresent = true;
                }
            }
            // Budhaditya Yoga
            else if (yoga.name.includes("Budhaditya")) {
                const sun = getPlanet("Sun");
                const mer = getPlanet("Mercury");
                if (sun && mer && sun.house === mer.house) isPresent = true;
            }
            // Pancha Mahapurusha Yogas
            else if (yoga.name.includes("Pancha Mahapurusha")) {
                const planetName = yoga.requiredPlanets[0];
                const planet = getPlanet(planetName);
                if (planet) {
                    const isKendra = [1, 4, 7, 10].includes(planet.house);
                    const mahapurushaRules: Record<string, string[]> = {
                        'Mars': ['Aries', 'Scorpio', 'Capricorn'],
                        'Mercury': ['Gemini', 'Virgo'],
                        'Jupiter': ['Sagittarius', 'Pisces', 'Cancer'],
                        'Venus': ['Taurus', 'Libra', 'Pisces'],
                        'Saturn': ['Capricorn', 'Aquarius', 'Libra']
                    };
                    if (isKendra && mahapurushaRules[planetName]?.includes(planet.sign)) {
                        isPresent = true;
                    }
                }
            }
            // Chandra-Mangala Yoga
            else if (yoga.name.includes("Chandra-Mangala")) {
                const moon = getPlanet("Moon");
                const mars = getPlanet("Mars");
                if (moon && mars && moon.house === mars.house) isPresent = true;
            }
            // Amala Yoga
            else if (yoga.name.includes("Amala")) {
                const benefics = chart.planets.filter(p =>
                    ['Jupiter', 'Venus', 'Mercury'].includes(p.name) && p.house === 10
                );
                if (benefics.length > 0) isPresent = true;
            }
            // Dharma Karma Adhipati Yoga
            else if (yoga.name.includes("Dharma Karma")) {
                const sign9 = ZODIAC_SIGNS[(ascIndex + 8) % 12];
                const sign10 = ZODIAC_SIGNS[(ascIndex + 9) % 12];
                const lord9 = HOUSE_LORDS[sign9];
                const lord10 = HOUSE_LORDS[sign10];
                const p9 = getPlanet(lord9);
                const p10 = getPlanet(lord10);
                if (p9 && p10 && p9.house === p10.house) isPresent = true;
            }
            // Kemadruma Yoga (inauspicious)
            else if (yoga.name.includes("Kemadruma")) {
                const moon = getPlanet("Moon");
                if (moon) {
                    const prev = ((moon.house - 2 + 12) % 12) + 1;
                    const next = (moon.house % 12) + 1;
                    const hasPrev = chart.planets.some(p =>
                        p.house === prev && !['Sun', 'Rahu', 'Ketu', 'Moon'].includes(p.name)
                    );
                    const hasNext = chart.planets.some(p =>
                        p.house === next && !['Sun', 'Rahu', 'Ketu', 'Moon'].includes(p.name)
                    );
                    if (!hasPrev && !hasNext) isPresent = true;
                }
            }
            // Vipareeta Raja Yogas
            else if (yoga.name.includes("Vipareeta")) {
                const dusthana = [6, 8, 12];
                if (yoga.name.includes("Harsha")) {
                    const sign6 = ZODIAC_SIGNS[(ascIndex + 5) % 12];
                    const lord6 = HOUSE_LORDS[sign6];
                    const p6 = getPlanet(lord6);
                    if (p6 && dusthana.includes(p6.house)) isPresent = true;
                }
                if (yoga.name.includes("Sarala")) {
                    const sign8 = ZODIAC_SIGNS[(ascIndex + 7) % 12];
                    const lord8 = HOUSE_LORDS[sign8];
                    const p8 = getPlanet(lord8);
                    if (p8 && dusthana.includes(p8.house)) isPresent = true;
                }
                if (yoga.name.includes("Vimala")) {
                    const sign12 = ZODIAC_SIGNS[(ascIndex + 11) % 12];
                    const lord12 = HOUSE_LORDS[sign12];
                    const p12 = getPlanet(lord12);
                    if (p12 && dusthana.includes(p12.house)) isPresent = true;
                }
            }

            if (isPresent) detectedYogas.push(yoga);
        });

        return detectedYogas;
    }

    /**
     * Get planet interpretation based on house placement
     */
    public getPlanetInterpretation(planetName: string, house: number): string {
        const { PLANETARY_EFFECTS } = require('@/data/vedicKnowledgeBase');
        return PLANETARY_EFFECTS[planetName]?.[house.toString()] ||
            `${planetName} in house ${house}: General planetary influence.`;
    }
}

// Export singleton instance
export const vedicLogicService = new VedicLogicService();
