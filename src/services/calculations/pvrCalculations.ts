/**
 * Advanced Vedic Calculations - PVR Narasimha Rao Principles
 * 
 * Based on "Lessons on Vedic Astrology" by PVR Narasimha Rao
 * Implements:
 * - Arudha Padas (A1-A12)
 * - Chara Karakas (8 Soul Significators)
 * - Marana Karaka Sthana
 */

import { D1Chart } from '@/types/vedic.types';

// Constants
const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const HOUSE_LORDS: Record<string, string> = {
    'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
    'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
    'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
};

// Chara Karaka names based on degree (highest to lowest)
const CHARA_KARAKA_NAMES = [
    'Atmakaraka (AK)',      // Highest degree - Soul
    'Amatyakaraka (AmK)',   // 2nd - Career/Mind
    'Bhratrikaraka (BK)',   // 3rd - Siblings
    'Matrikaraka (MK)',     // 4th - Mother
    'Pitrikaraka (PiK)',    // 5th - Father
    'Putrakaraka (PuK)',    // 6th - Children
    'Gnyatikaraka (GK)',    // 7th - Relatives/Enemies
    'Darakaraka (DK)'       // Lowest - Spouse
];

// Marana Karaka Sthana - Houses where planets lose strength
const MARANA_KARAKA_STHANA: Record<string, number> = {
    'Sun': 12,
    'Moon': 8,
    'Mars': 7,
    'Mercury': 7,
    'Jupiter': 3,
    'Venus': 6,
    'Saturn': 1,
    'Rahu': 9
};

// Types
export interface ArudhaPada {
    house: number;           // Original house (1-12)
    arudhaSign: string;      // Sign where Arudha falls
    arudhaHouse: number;     // House number of Arudha from Lagna
    lord: string;            // Lord of the original house
    lordHouse: number;       // House where lord sits
    interpretation: string;  // PVR-based interpretation
}

export interface CharaKaraka {
    planet: string;
    karaka: string;
    degree: number;
    significance: string;
    interpretation: string;
}

export interface MaranaKarakaSthana {
    planet: string;
    house: number;
    isAffected: boolean;
    interpretation: string;
}

/**
 * Calculate Arudha Padas (A1-A12)
 * 
 * Formula: Count from house to its lord, then count same from lord
 * Exception: If Arudha falls in 1st or 7th from original, count to 10th
 * 
 * Based on PVR Lesson 11-12
 */
export function calculateArudhaPadas(d1: D1Chart): ArudhaPada[] {
    const arudhas: ArudhaPada[] = [];
    const ascIndex = ZODIAC_SIGNS.indexOf(d1.ascendant);

    for (let house = 1; house <= 12; house++) {
        // Get sign of this house
        const houseSignIndex = (ascIndex + house - 1) % 12;
        const houseSign = ZODIAC_SIGNS[houseSignIndex];
        const lord = HOUSE_LORDS[houseSign];

        // Find where the lord is placed
        const lordPlanet = d1.planets.find(p => p.planet === lord);
        if (!lordPlanet) continue;

        const lordHouse = lordPlanet.house;

        // Count from house to lord
        const countToLord = ((lordHouse - house + 12) % 12) || 12;

        // Apply same count from lord
        let arudhaHouse = ((lordHouse + countToLord - 1) % 12) + 1;

        // Exception: If Arudha falls in same or 7th from original house
        const relativePos = ((arudhaHouse - house + 12) % 12);
        if (relativePos === 0 || relativePos === 6) {
            // Move to 10th from calculated position
            arudhaHouse = ((arudhaHouse + 9 - 1) % 12) + 1;
        }

        const arudhaSignIndex = (ascIndex + arudhaHouse - 1) % 12;
        const arudhaSign = ZODIAC_SIGNS[arudhaSignIndex];

        arudhas.push({
            house,
            arudhaSign,
            arudhaHouse,
            lord,
            lordHouse,
            interpretation: getArudhaInterpretation(house, arudhaHouse)
        });
    }

    return arudhas;
}

/**
 * Calculate Chara Karakas (8 Variable Significators)
 * 
 * Sort planets by degree (highest to lowest) and assign Karaka role
 * Rahu uses reverse degree (30 - degree)
 * 
 * Based on PVR Lesson 12-13
 */
export function calculateCharaKarakas(d1: D1Chart): CharaKaraka[] {
    // Filter to 8 planets (exclude Ketu)
    const planets = d1.planets
        .filter(p => p.planet !== 'Ketu')
        .map(p => ({
            ...p,
            // Rahu uses reverse degree
            adjustedDegree: p.planet === 'Rahu' ? (30 - p.degree) : p.degree
        }));

    // Sort by adjusted degree (highest first)
    planets.sort((a, b) => b.adjustedDegree - a.adjustedDegree);

    return planets.map((p, index) => ({
        planet: p.planet,
        karaka: CHARA_KARAKA_NAMES[index] || 'Unknown',
        degree: p.degree,
        significance: getKarakaSignificance(index),
        interpretation: getKarakaInterpretation(p.planet, index, p.sign)
    }));
}

/**
 * Calculate Marana Karaka Sthana positions
 * 
 * Planets in these houses are severely weakened
 * Based on PVR Lesson 8
 */
export function calculateMaranaKarakaSthana(d1: D1Chart): MaranaKarakaSthana[] {
    return d1.planets
        .filter(p => MARANA_KARAKA_STHANA[p.planet] !== undefined)
        .map(p => {
            const mksHouse = MARANA_KARAKA_STHANA[p.planet];
            const isAffected = p.house === mksHouse;

            return {
                planet: p.planet,
                house: p.house,
                isAffected,
                interpretation: isAffected
                    ? `${p.planet} is in Marana Karaka Sthana (House ${mksHouse}). This significantly weakens the planet and its significations, creating struggle in related life areas.`
                    : `${p.planet} is not in Marana Karaka Sthana. Normal strength applies.`
            };
        });
}

// Helper functions for interpretations
function getArudhaInterpretation(originalHouse: number, arudhaHouse: number): string {
    const interpretations: Record<number, string> = {
        1: 'Arudha Lagna (AL) shows your perceived image and how the world sees you',
        2: 'A2 indicates perceived wealth and family status',
        3: 'A3 shows courage and initiative as perceived by others',
        4: 'A4 indicates perceived happiness and property ownership',
        5: 'A5 shows perceived intelligence and romantic image',
        6: 'A6 indicates enemies and obstacles as perceived',
        7: 'A7 (Darapada) shows perceived marriage partner and business partnerships',
        8: 'A8 indicates perceived vulnerabilities and hidden matters',
        9: 'A9 shows perceived fortune and spiritual standing',
        10: 'A10 (Rajapada) indicates career image and professional reputation',
        11: 'A11 shows perceived gains and aspirations',
        12: 'A12 (Upapada) indicates the nature of spouse and marriage perception'
    };

    const base = interpretations[originalHouse] || `A${originalHouse} interpretation`;
    return `${base}. Arudha falls in House ${arudhaHouse}.`;
}

function getKarakaSignificance(index: number): string {
    const meanings: Record<number, string> = {
        0: 'Soul, Self, Overall Life Direction',
        1: 'Career, Professional Life, Advisory Role',
        2: 'Siblings, Courage, Short Journeys',
        3: 'Mother, Nurturing, Emotional Well-being',
        4: 'Father, Authority, Divine Grace',
        5: 'Children, Creativity, Intelligence',
        6: 'Relatives, Diseases, Competition',
        7: 'Spouse, Partnership, Relationships'
    };
    return meanings[index] || 'General significance';
}

function getKarakaInterpretation(planet: string, index: number, sign: string): string {
    const karaka = CHARA_KARAKA_NAMES[index];

    if (index === 0) { // Atmakaraka
        return `${planet} as Atmakaraka in ${sign} indicates your soul's primary lesson in this life relates to ${planet}'s significations. This is the most important planet in your chart.`;
    } else if (index === 7) { // Darakaraka
        return `${planet} as Darakaraka in ${sign} indicates the nature of your spouse and marriage. ${planet}'s qualities will manifest in your life partner.`;
    } else if (index === 1) { // Amatyakaraka
        return `${planet} as Amatyakaraka in ${sign} guides your career and professional path. Your work should align with ${planet}'s significations.`;
    }

    return `${planet} as ${karaka.split(' ')[0]} in ${sign} influences the related life area according to classical principles.`;
}

/**
 * Get comprehensive chart analysis using PVR principles
 */
export function getPVRAnalysis(d1: D1Chart): {
    arudhaPadas: ArudhaPada[];
    charaKarakas: CharaKaraka[];
    maranaSthanas: MaranaKarakaSthana[];
    summary: string;
} {
    const arudhaPadas = calculateArudhaPadas(d1);
    const charaKarakas = calculateCharaKarakas(d1);
    const maranaSthanas = calculateMaranaKarakaSthana(d1);

    // Find key indicators
    const atmakaraka = charaKarakas[0];
    const darakaraka = charaKarakas[7];
    const arudhaLagna = arudhaPadas.find(a => a.house === 1);
    const upapada = arudhaPadas.find(a => a.house === 12);
    const affectedPlanets = maranaSthanas.filter(m => m.isAffected);

    let summary = `CHART SUMMARY (PVR Principles):\n\n`;
    summary += `ATMAKARAKA: ${atmakaraka?.planet} - The soul indicator and most important planet.\n`;
    summary += `DARAKARAKA: ${darakaraka?.planet} - Indicates spouse characteristics.\n`;
    summary += `ARUDHA LAGNA: House ${arudhaLagna?.arudhaHouse} (${arudhaLagna?.arudhaSign}) - Your public image.\n`;
    summary += `UPAPADA: House ${upapada?.arudhaHouse} (${upapada?.arudhaSign}) - Marriage and spouse.\n`;

    if (affectedPlanets.length > 0) {
        summary += `\nWEAKENED PLANETS (Marana Karaka Sthana): ${affectedPlanets.map(p => p.planet).join(', ')}\n`;
    }

    return {
        arudhaPadas,
        charaKarakas,
        maranaSthanas,
        summary
    };
}

export default {
    calculateArudhaPadas,
    calculateCharaKarakas,
    calculateMaranaKarakaSthana,
    getPVRAnalysis
};
