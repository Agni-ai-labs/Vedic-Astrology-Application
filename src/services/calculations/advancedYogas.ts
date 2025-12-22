import { VedicChart } from '@/types/vedic.types';
import { Yoga, PLANET_INDICES } from '@/types/yoga.types';
import {
    getPlanetHouse,
    getPlanetNavamsaSign,
    getSignLord,
    isNaturalBenefic,
    isNaturalMalefic,
    getPlanetsInHouse,
    planetsInSameHouse,
    isInKendra,
    isExalted,
    getAscendantSignIndex,
    getAscendantLord,
    hasAspect,
    isStrong
} from './yogaHelpers';

// ============================================================================
// ADVANCED YOGAS (A-C)
// ============================================================================

export function checkAmsaavataraYoga(chart: VedicChart): Yoga | null {
    // Jupiter & Venus in Kendra, Saturn Exalted in Kendra
    const jupHouse = getPlanetHouse(chart, 'Jupiter');
    const venHouse = getPlanetHouse(chart, 'Venus');
    const satHouse = getPlanetHouse(chart, 'Saturn');

    const ascSign = getAscendantSignIndex(chart);
    const isKendra = (h: number) => isInKendra(ascSign, h);

    if (isKendra(jupHouse) && isKendra(venHouse) && isKendra(satHouse)) {
        if (isExalted(chart, 'Saturn', PLANET_INDICES.SATURN)) {
            return {
                name: 'Amsaavatara Yoga',
                category: 'special',
                strength: 'very_strong',
                description: 'Jupiter, Venus and Exalted Saturn in Kendras',
                formation: 'Benefics and strong Saturn in angles',
                results: ['Pure reputation', 'Ruler or equal to ruler', 'Long life', 'Scholar'],
                lifeAreas: ['Fame', 'Authority', 'Longevity']
            };
        }
    }
    return null;
}

export function checkAsubhaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    // Malefics in Lagna
    const planetsInLagna = getPlanetsInHouse(chart, ascSign);
    const hasMaleficInLagna = planetsInLagna.some(p => isNaturalMalefic(p));

    if (hasMaleficInLagna) {
        return {
            name: 'Asubha Yoga',
            category: 'special',
            strength: 'weak', // Negative
            description: 'Malefics in Lagna',
            formation: 'Natural malefics occupying Ascendant',
            results: ['Health issues', 'Struggles', 'Impulsive'],
            lifeAreas: ['Health', 'Personality']
        };
    }

    // Paapa Kartari (Malefics in 12 and 2)
    const h12 = (ascSign + 11) % 12;
    const h2 = (ascSign + 1) % 12;

    const p12 = getPlanetsInHouse(chart, h12);
    const p2 = getPlanetsInHouse(chart, h2);

    const maleficIn12 = p12.some(p => isNaturalMalefic(p));
    const maleficIn2 = p2.some(p => isNaturalMalefic(p));

    if (maleficIn12 && maleficIn2) {
        return {
            name: 'Asubha Yoga (Paapa Kartari)',
            category: 'special',
            strength: 'weak',
            description: 'Lagna hemmed between malefics',
            formation: 'Malefics in 2nd and 12th from Lagna',
            results: ['Restricted growth', 'Obstacles', 'Health concerns'],
            lifeAreas: ['Growth', 'Health']
        };
    }

    return null;
}

export function checkBrahmaYoga(chart: VedicChart): Yoga | null {
    // Benefics in 4, 10, 11 from Lagna Lord
    const lagnaLord = getAscendantLord(chart);
    const lagnaLordHouse = getPlanetHouse(chart, lagnaLord);

    if (lagnaLordHouse === -1) return null;

    const h4 = (lagnaLordHouse + 3) % 12;
    const h10 = (lagnaLordHouse + 9) % 12;
    const h11 = (lagnaLordHouse + 10) % 12;

    const p4 = getPlanetsInHouse(chart, h4);
    const p10 = getPlanetsInHouse(chart, h10);
    const p11 = getPlanetsInHouse(chart, h11);

    const hasBenefic4 = p4.some(p => isNaturalBenefic(p));
    const hasBenefic10 = p10.some(p => isNaturalBenefic(p));
    const hasBenefic11 = p11.some(p => isNaturalBenefic(p));

    if (hasBenefic4 && hasBenefic10 && hasBenefic11) {
        return {
            name: 'Brahma Yoga',
            category: 'special',
            strength: 'very_strong',
            description: 'Benefics in 4, 10, 11 from Lagna Lord',
            formation: 'Benefics supporting the Lagna Lord',
            results: ['Highly learned', 'Long life', 'Wealthy', 'Respected by kings'],
            lifeAreas: ['Knowledge', 'Longevity', 'Wealth']
        };
    }
    return null;
}

export function checkChandikaaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const fixedSigns = [1, 4, 7, 10];

    if (!fixedSigns.includes(ascSign)) return null;

    // Aspected by 6th lord
    const lord6Sign = (ascSign + 5) % 12;
    const lord6 = getSignLord(lord6Sign);
    if (!hasAspect(chart, lord6, ascSign)) return null;

    // Sun joins lords of signs occupied in navamsa by 6th and 9th lords
    const lord9Sign = (ascSign + 8) % 12;
    const lord9 = getSignLord(lord9Sign);

    const navamsaSign6 = getPlanetNavamsaSign(chart, lord6);
    const navamsaSign9 = getPlanetNavamsaSign(chart, lord9);

    if (navamsaSign6 === -1 || navamsaSign9 === -1) return null;

    const navamsaLord6 = getSignLord(navamsaSign6);
    const navamsaLord9 = getSignLord(navamsaSign9);

    const sunHouse = getPlanetHouse(chart, 'Sun');
    const nl6House = getPlanetHouse(chart, navamsaLord6);
    const nl9House = getPlanetHouse(chart, navamsaLord9);

    if (sunHouse !== -1 && sunHouse === nl6House && sunHouse === nl9House) {
        return {
            name: 'Chandikaa Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Lagna fixed, aspected by 6th lord, Sun with Navamsa lords of 6th & 9th',
            formation: 'Complex relation of 6th, 9th and Sun',
            results: ['Powerful', 'Wealthy', 'Famous', 'Long life'],
            lifeAreas: ['Power', 'Wealth']
        };
    }

    return null;
}

export function checkChapaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h4 = (ascSign + 3) % 12;
    const h10 = (ascSign + 9) % 12;

    const lord4 = getSignLord(h4);
    const lord10 = getSignLord(h10);

    const lord4House = getPlanetHouse(chart, lord4);
    const lord10House = getPlanetHouse(chart, lord10);

    // Exchange check
    if (lord4House === h10 && lord10House === h4) {
        const lagnaLord = getAscendantLord(chart);
        if (isExalted(chart, lagnaLord, PLANET_INDICES[lagnaLord.toUpperCase() as keyof typeof PLANET_INDICES])) {
            return {
                name: 'Chapa Yoga',
                category: 'raja',
                strength: 'strong',
                description: 'Exchange of 4th and 10th lords, Lagna lord exalted',
                formation: 'Parivartana of 4/10 with strong Lagna',
                results: ['Imperial power', 'Wealthy', 'Strong'],
                lifeAreas: ['Career', 'Power']
            };
        }
    }
    return null;
}

export function checkChatraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h7 = (ascSign + 6) % 12;
    const requiredSigns: number[] = [];
    for (let i = 0; i < 7; i++) requiredSigns.push((h7 + i) % 12);

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const allInRange = Array.from(occupied).every(h => requiredSigns.includes(h));

    if (allInRange && occupied.size >= 4) {
        return {
            name: 'Chatra Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Planets in 7 signs from 7th house',
            formation: 'Planets distributed from 7th to 1st',
            results: ['Happy', 'Kind', 'Honored'],
            lifeAreas: ['Happiness', 'Status']
        };
    }
    return null;
}

export function checkDandaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const houses = [9, 10, 11, 0].map(h => (ascSign + h) % 12); // 10, 11, 12, 1 (0-indexed: 9, 10, 11, 0)

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const allInHouses = Array.from(occupied).every(h => houses.includes(h));

    if (allInHouses && occupied.size >= 3) {
        return {
            name: 'Danda Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Planets in 10, 11, 12, 1 houses',
            formation: 'Planets clustered around Lagna and 10th',
            results: ['Separated from family', 'Servitude', 'Unhappy'],
            lifeAreas: ['Family', 'Happiness']
        };
    }
    return null;
}

export function checkDevendraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const fixedSigns = [1, 4, 7, 10];
    if (!fixedSigns.includes(ascSign)) return null;

    const h2 = (ascSign + 1) % 12;
    const h10 = (ascSign + 9) % 12;
    const h11 = (ascSign + 10) % 12;
    const h1 = ascSign;

    const l2 = getSignLord(h2);
    const l10 = getSignLord(h10);
    const l11 = getSignLord(h11);
    const l1 = getSignLord(h1);

    const l2Pos = getPlanetHouse(chart, l2);
    const l10Pos = getPlanetHouse(chart, l10);
    const l11Pos = getPlanetHouse(chart, l11);
    const l1Pos = getPlanetHouse(chart, l1);

    // Exchange 2-10
    const ex2_10 = (l2Pos === h10 && l10Pos === h2);
    // Exchange 1-11
    const ex1_11 = (l1Pos === h11 && l11Pos === h1);

    if (ex2_10 && ex1_11) {
        return {
            name: 'Devendra Yoga',
            category: 'raja',
            strength: 'very_strong',
            description: 'Lagna fixed, 2-10 exchange, 1-11 exchange',
            formation: 'Double Parivartana',
            results: ['Beautiful', 'Romantic', 'Powerful', 'Famous'],
            lifeAreas: ['Fame', 'Power']
        };
    }
    return null;
}

export function checkGadaaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const k1 = ascSign;
    const k4 = (ascSign + 3) % 12;
    const k7 = (ascSign + 6) % 12;
    const k10 = (ascSign + 9) % 12;

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const checkPair = (h1: number, h2: number) => {
        return Array.from(occupied).every(h => h === h1 || h === h2);
    };

    if (checkPair(k1, k4) || checkPair(k4, k7) || checkPair(k7, k10) || checkPair(k10, k1)) {
        return {
            name: 'Gadaa Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Planets in two successive Kendras',
            formation: 'Planets in adjacent angles',
            results: ['Wealthy', 'Learned', 'Skilled in weapons/arts'],
            lifeAreas: ['Wealth', 'Skills']
        };
    }
    return null;
}

export function checkGoYoga(chart: VedicChart): Yoga | null {
    // Jupiter strong in Moolatrikona (Sg/Pi - simplified to Own Sign or Exalted here as Moolatrikona data not in types)
    if (!isStrong(chart, 'Jupiter')) return null;

    // 2nd lord with Jupiter
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const l2 = getSignLord(h2);

    if (!planetsInSameHouse(chart, l2, 'Jupiter')) return null;

    // Lagna lord exalted
    const l1 = getAscendantLord(chart);
    if (isExalted(chart, l1, PLANET_INDICES[l1.toUpperCase() as keyof typeof PLANET_INDICES])) {
        return {
            name: 'Go Yoga',
            category: 'raja',
            strength: 'strong',
            description: 'Jupiter strong, 2nd Lord with Jupiter, Lagna Lord exalted',
            formation: 'Wealth and status combination',
            results: ['Respectable family', 'Wealthy', 'Powerful'],
            lifeAreas: ['Wealth', 'Family']
        };
    }
    return null;
}

export function checkGuruMangalaYoga(chart: VedicChart): Yoga | null {
    const jupPos = getPlanetHouse(chart, 'Jupiter');
    const marPos = getPlanetHouse(chart, 'Mars');

    if (jupPos === -1 || marPos === -1) return null;

    const same = (jupPos === marPos);
    const seventh = (Math.abs(jupPos - marPos) === 6);

    if (same || seventh) {
        return {
            name: 'Guru-Mangala Yoga',
            category: 'planetary',
            strength: 'strong',
            description: 'Jupiter and Mars conjunct or in opposition',
            formation: 'Jupiter-Mars relation',
            results: ['Righteous', 'Energetic', 'Leader', 'Wealthy'],
            lifeAreas: ['Leadership', 'Wealth']
        };
    }
    return null;
}

export function checkHalaYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);

    // Trines from Lagna
    const lagnaTrines = [0, 4, 8].map(h => (ascSign + h) % 12);

    // Other trine sets
    const trine2 = [1, 5, 9].map(h => (ascSign + h) % 12);
    const trine3 = [2, 6, 10].map(h => (ascSign + h) % 12);
    const trine4 = [3, 7, 11].map(h => (ascSign + h) % 12);

    const occupied = new Set<number>();
    chart.d1.planets.forEach(p => {
        if (!['Rahu', 'Ketu'].includes(p.planet)) {
            occupied.add(getPlanetHouse(chart, p.planet));
        }
    });

    const checkSet = (set: number[]) => Array.from(occupied).every(h => set.includes(h));

    // "Not trines from lagna"
    if (checkSet(lagnaTrines)) return null;

    if (checkSet(trine2) || checkSet(trine3) || checkSet(trine4)) {
        return {
            name: 'Hala Yoga',
            category: 'special',
            strength: 'moderate',
            description: 'Planets in mutual trines (not Lagna trines)',
            formation: 'Planets in triangular pattern',
            results: ['Agricultural earnings', 'Gluttonous', 'Poor'],
            lifeAreas: ['Agriculture', 'Wealth']
        };
    }
    return null;
}

export function checkHaraYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h7 = (ascSign + 6) % 12;
    const l7 = getSignLord(h7);
    const l7Pos = getPlanetHouse(chart, l7);

    if (l7Pos === -1) return null;

    const h4 = (l7Pos + 3) % 12;
    const h9 = (l7Pos + 8) % 12;
    const h8 = (l7Pos + 7) % 12;

    const p4 = getPlanetsInHouse(chart, h4);
    const p9 = getPlanetsInHouse(chart, h9);
    const p8 = getPlanetsInHouse(chart, h8);

    const hasBen4 = p4.some(p => isNaturalBenefic(p));
    const hasBen9 = p9.some(p => isNaturalBenefic(p));
    const hasBen8 = p8.some(p => isNaturalBenefic(p));

    if (hasBen4 && hasBen9 && hasBen8) {
        return {
            name: 'Hara Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Benefics in 4, 8, 9 from 7th Lord',
            formation: 'Benefics supporting 7th Lord',
            results: ['Happy', 'Learned', 'Sensual'],
            lifeAreas: ['Happiness', 'Relationships']
        };
    }
    return null;
}

export function checkHariYoga(chart: VedicChart): Yoga | null {
    const ascSign = getAscendantSignIndex(chart);
    const h2 = (ascSign + 1) % 12;
    const l2 = getSignLord(h2);
    const l2Pos = getPlanetHouse(chart, l2);

    if (l2Pos === -1) return null;

    // Benefics in 4, 8, 9 from 2nd Lord
    const h4 = (l2Pos + 3) % 12;
    const h8 = (l2Pos + 7) % 12;
    const h9 = (l2Pos + 8) % 12;

    const p4 = getPlanetsInHouse(chart, h4);
    const p8 = getPlanetsInHouse(chart, h8);
    const p9 = getPlanetsInHouse(chart, h9);

    const hasBen4 = p4.some(p => isNaturalBenefic(p));
    const hasBen8 = p8.some(p => isNaturalBenefic(p));
    const hasBen9 = p9.some(p => isNaturalBenefic(p));

    if (hasBen4 && hasBen8 && hasBen9) {
        return {
            name: 'Hari Yoga',
            category: 'special',
            strength: 'strong',
            description: 'Benefics in 4, 8, 9 from 2nd Lord',
            formation: 'Benefics supporting 2nd Lord',
            results: ['Happy', 'Learned', 'Wealthy'],
            lifeAreas: ['Happiness', 'Wealth']
        };
    }
    return null;
}
