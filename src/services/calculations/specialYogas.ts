/**
 * Special and Miscellaneous Yogas Module
 * Artistic, spiritual, and other special combinations
 */

import { VedicChart } from '../../types/vedic.types';
import { Yoga } from '../../types/yoga.types';

// Helper functions (duplicated for module independence)
function getAscendantSignIndex(chart: VedicChart): number {
    const ascendant = chart.d1.houses?.[0];
    if (!ascendant) return 0;

    const rashiMap: Record<string, number> = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };
    return rashiMap[ascendant.sign] ?? 0;
}

function getSignLord(signIndex: number): string {
    const lords = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
    return lords[signIndex % 12];
}

function getPlanetHouse(chart: VedicChart, planetName: string): number {
    const planet = chart.d1.planets.find(p => p.planet === planetName);
    if (!planet) return -1;

    const rashiMap: Record<string, number> = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };
    return rashiMap[planet.sign] ?? -1;
}

function isInKendra(fromHouse: number, toHouse: number): boolean {
    const diff = (toHouse - fromHouse + 12) % 12;
    return [0, 3, 6, 9].includes(diff);
}





function getPlanetsInHouse(chart: VedicChart, houseIndex: number): string[] {
    return chart.d1.planets
        .filter(p => getPlanetHouse(chart, p.planet) === houseIndex)
        .map(p => p.planet);
}

function isNaturalBenefic(planetName: string): boolean {
    return ['Jupiter', 'Venus', 'Mercury', 'Moon'].includes(planetName);
}

function isNaturalMalefic(planetName: string): boolean {
    return ['Sun', 'Mars', 'Saturn', 'Rahu', 'Ketu'].includes(planetName);
}

/**
 * Saraswati Yoga - Mercury, Jupiter, Venus in Kendra/Trikona/2nd
 * Goddess of wisdom and arts
 */
export function checkSaraswatiYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    const mercHouse = getPlanetHouse(chart, 'Mercury');
    const jupHouse = getPlanetHouse(chart, 'Jupiter');
    const venHouse = getPlanetHouse(chart, 'Venus');

    if (mercHouse === -1 || jupHouse === -1 || venHouse === -1) return null;


    // Actually Kendra (1,4,7,10) + Trikona (5,9) + 2nd
    // Indices: 0, 3, 6, 9 (Kendra), 4, 8 (Trikona - 5,9), 1 (2nd)

    const isGoodPos = (house: number) => {
        const houseFromAsc = (house - ascSign + 12) % 12;
        return [0, 1, 3, 4, 6, 8, 9].includes(houseFromAsc);
    };

    if (isGoodPos(mercHouse) && isGoodPos(jupHouse) && isGoodPos(venHouse)) {
        // Jupiter should be strong (own/exalted/friendly) - simplified check for now
        return {
            name: 'Saraswati Yoga',
            category: 'artistic',
            strength: 'very_strong',
            description: 'Mercury, Jupiter, and Venus in Kendra, Trikona, or 2nd house',
            formation: 'Planets of wisdom and arts in strong positions',
            results: ['Highly intelligent', 'Artistic talent', 'Writer', 'Speaker', 'Famous'],
            lifeAreas: ['Intelligence', 'Arts', 'Education']
        };
    }
    return null;
}

/**
 * Amala Yoga - Benefic in 10th from Ascendant or Moon
 * Pure reputation
 */
export function checkAmalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const moonHouse = getPlanetHouse(chart, 'Moon');

    const h10FromAsc = (ascSign + 9) % 12;
    const h10FromMoon = moonHouse !== -1 ? (moonHouse + 9) % 12 : -1;

    const planetsIn10Asc = getPlanetsInHouse(chart, h10FromAsc);
    const planetsIn10Moon = h10FromMoon !== -1 ? getPlanetsInHouse(chart, h10FromMoon) : [];

    const hasBenefic = (planets: string[]) => planets.some(p => isNaturalBenefic(p));

    if (hasBenefic(planetsIn10Asc) || hasBenefic(planetsIn10Moon)) {
        return {
            name: 'Amala Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Natural benefic in 10th house from Ascendant or Moon',
            formation: 'Pure influence on career and reputation',
            results: ['Spotless reputation', 'Professional success', 'Helpful nature'],
            lifeAreas: ['Career', 'Reputation', 'Public Image']
        };
    }
    return null;
}

/**
 * Pushkala Yoga - Moon lord in Kendra with Lagna lord, strong
 */
export function checkPushkalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const moonHouse = getPlanetHouse(chart, 'Moon');
    if (moonHouse === -1) return null;

    const moonSignLord = getSignLord(moonHouse);
    const moonLordHouse = getPlanetHouse(chart, moonSignLord);
    const lagnaLord = getSignLord(ascSign);
    const lagnaLordHouse = getPlanetHouse(chart, lagnaLord);

    if (moonLordHouse !== -1 && lagnaLordHouse !== -1) {
        // Moon lord and Lagna lord together in Kendra
        if (moonLordHouse === lagnaLordHouse && isInKendra(ascSign, moonLordHouse)) {
            return {
                name: 'Pushkala Yoga',
                category: 'special',
                strength: 'strong',
                description: 'Lord of Moon sign conjunct Lagna Lord in Kendra',
                formation: 'Union of self and mind in power',
                results: ['Wealthy', 'Honored by kings', 'Famous'],
                lifeAreas: ['Status', 'Wealth', 'Fame']
            };
        }
    }
    return null;
}

/**
 * Kalanidhi Yoga - Jupiter in 2nd/5th conjunct Mercury/Venus
 * Treasure of arts
 */
export function checkKalanidhiYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h5 = (ascSign + 4) % 12;

    const jupHouse = getPlanetHouse(chart, 'Jupiter');

    if (jupHouse === h2 || jupHouse === h5) {
        const planetsWithJup = getPlanetsInHouse(chart, jupHouse);
        if (planetsWithJup.includes('Mercury') || planetsWithJup.includes('Venus')) {
            return {
                name: 'Kalanidhi Yoga',
                category: 'artistic',
                strength: 'strong',
                description: 'Jupiter in 2nd or 5th with Mercury or Venus',
                formation: 'Wisdom combined with artistic skill',
                results: ['Expert in arts', 'Good qualities', 'Healthy', 'Respected'],
                lifeAreas: ['Arts', 'Character', 'Health']
            };
        }
    }
    return null;
}

/**
 * Gandharva Yoga - 10th lord in Kama Trikona (3, 7, 11) etc.
 * Simplified: 10th lord in 3, 7, 11 associated with Sun/Moon
 */
export function checkGandharvaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h10 = (ascSign + 9) % 12;
    const lord10 = getSignLord(h10);
    const lord10House = getPlanetHouse(chart, lord10);

    if (lord10House !== -1) {
        const houseFromAsc = (lord10House - ascSign + 12) % 12;
        // Kama houses: 3 (index 2), 7 (index 6), 11 (index 10)
        if ([2, 6, 10].includes(houseFromAsc)) {
            return {
                name: 'Gandharva Yoga',
                category: 'artistic',
                strength: 'moderate',
                description: '10th Lord in Kama Trikona (3, 7, 11)',
                formation: 'Career connected to desires and arts',
                results: ['Musician', 'Artist', 'Enjoyment of life', 'Famous'],
                lifeAreas: ['Arts', 'Music', 'Enjoyment']
            };
        }
    }
    return null;
}

/**
 * Shakata Yoga - Moon in 6/8/12 from Jupiter
 * Wheel of fortune (ups and downs)
 */
export function checkShakataYoga(chart: VedicChart): Yoga | null {
    const moonHouse = getPlanetHouse(chart, 'Moon');
    const jupHouse = getPlanetHouse(chart, 'Jupiter');

    if (moonHouse !== -1 && jupHouse !== -1) {
        const diff = (moonHouse - jupHouse + 12) % 12;
        // 6th (5), 8th (7), 12th (11) positions
        if ([5, 7, 11].includes(diff)) {
            // Cancelled if Moon is in Kendra to Lagna (simplified exception)
            const ascSign = getAscendantSignIndex(chart);
            if (!isInKendra(ascSign, moonHouse)) {
                return {
                    name: 'Shakata Yoga',
                    category: 'miscellaneous',
                    strength: 'moderate', // Negative yoga
                    description: 'Moon in 6th, 8th, or 12th from Jupiter',
                    formation: 'Disconnect between mind and wisdom',
                    results: ['Fluctuating fortune', 'Financial ups and downs', 'Emotional distress'],
                    lifeAreas: ['Finance', 'Emotions', 'Stability']
                };
            }
        }
    }
    return null;
}

/**
 * Subhakartari Yoga - Lagna hemmed between benefics
 * Auspicious scissors
 */
export function checkSubhakartariYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h12 = (ascSign + 11) % 12;

    const p2 = getPlanetsInHouse(chart, h2);
    const p12 = getPlanetsInHouse(chart, h12);

    const hasBenefic2 = p2.some(p => isNaturalBenefic(p));
    const hasBenefic12 = p12.some(p => isNaturalBenefic(p));
    const hasMalefic2 = p2.some(p => isNaturalMalefic(p));
    const hasMalefic12 = p12.some(p => isNaturalMalefic(p));

    if (hasBenefic2 && hasBenefic12 && !hasMalefic2 && !hasMalefic12) {
        return {
            name: 'Subhakartari Yoga',
            category: 'miscellaneous',
            strength: 'strong',
            description: 'Lagna hemmed between natural benefics',
            formation: 'Protection and support from both sides',
            results: ['Protection', 'Good health', 'Financial gain', 'Happiness'],
            lifeAreas: ['General Well-being', 'Health', 'Protection']
        };
    }
    return null;
}

/**
 * Papakartari Yoga - Lagna hemmed between malefics
 * Inauspicious scissors
 */
export function checkPapakartariYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const h12 = (ascSign + 11) % 12;

    const p2 = getPlanetsInHouse(chart, h2);
    const p12 = getPlanetsInHouse(chart, h12);

    const hasMalefic2 = p2.some(p => isNaturalMalefic(p));
    const hasMalefic12 = p12.some(p => isNaturalMalefic(p));
    const hasBenefic2 = p2.some(p => isNaturalBenefic(p));
    const hasBenefic12 = p12.some(p => isNaturalBenefic(p));

    if (hasMalefic2 && hasMalefic12 && !hasBenefic2 && !hasBenefic12) {
        return {
            name: 'Papakartari Yoga',
            category: 'miscellaneous',
            strength: 'strong', // Negative
            description: 'Lagna hemmed between natural malefics',
            formation: 'Restriction and pressure from both sides',
            results: ['Obstacles', 'Health issues', 'Financial struggles', 'Anxiety'],
            lifeAreas: ['General Well-being', 'Health', 'Obstacles']
        };
    }
    return null;
}

/**
 * Matsya Yoga - Benefics in 1st & 9th, Malefics in 4th & 8th, Benefics in 5th
 * Fish yoga
 */
export function checkMatsyaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h1 = ascSign;
    const h9 = (ascSign + 8) % 12;
    const h4 = (ascSign + 3) % 12;
    const h8 = (ascSign + 7) % 12;
    const h5 = (ascSign + 4) % 12;

    const hasBenefic = (h: number) => getPlanetsInHouse(chart, h).some(p => isNaturalBenefic(p));
    const hasMalefic = (h: number) => getPlanetsInHouse(chart, h).some(p => isNaturalMalefic(p));

    if (hasBenefic(h1) && hasBenefic(h9) && hasMalefic(h4) && hasMalefic(h8) && hasBenefic(h5)) {
        return {
            name: 'Matsya Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Benefics in 1/9/5, Malefics in 4/8',
            formation: 'Mystical fish formation',
            results: ['Compassionate', 'Religious', 'Wise', 'Astrologer'],
            lifeAreas: ['Spirituality', 'Wisdom', 'Compassion']
        };
    }
    return null;
}

/**
 * Kurma Yoga - Benefics in 5/6/7, Malefics in 1/3/11
 * Turtle yoga
 */
export function checkKurmaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    // Check benefics in 5, 6, 7 (at least one in each or spread?) 
    // Strict definition: Benefics occupying 5, 6, 7. Malefics in 1, 3, 11.
    // We'll check for presence in the group.

    const beneficsIn567 = [4, 5, 6].some(offset => {
        const h = (ascSign + offset) % 12;
        return getPlanetsInHouse(chart, h).some(p => isNaturalBenefic(p));
    });

    const maleficsIn1311 = [0, 2, 10].some(offset => {
        const h = (ascSign + offset) % 12;
        return getPlanetsInHouse(chart, h).some(p => isNaturalMalefic(p));
    });

    // This is a simplified check. Real Kurma is rarer.
    if (beneficsIn567 && maleficsIn1311) {
        return {
            name: 'Kurma Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Benefics in 5/6/7, Malefics in 1/3/11',
            formation: 'Stable turtle formation',
            results: ['Stable wealth', 'Happy', 'Helpful to others', 'Grateful'],
            lifeAreas: ['Stability', 'Happiness', 'Service']
        };
    }
    return null;
}
