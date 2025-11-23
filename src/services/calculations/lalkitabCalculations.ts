import { LalKitabChart, LalKitabPlanet, LalKitabHouse, KarmicDebt, LalKitabRemedy, VarshphalChart } from '@/types/lalkitab.types';
import { BirthDetails } from './chartCalculations';
import { calculateD1Chart } from './vedicCalculations';

// Lal Kitab treats houses as fixed to signs (House 1 = Aries, etc.)
// But planet positions change based on birth chart

export function calculateLalKitabPlanets(details: BirthDetails): LalKitabPlanet[] {
    const d1 = calculateD1Chart(details);

    return d1.planets.map(p => {
        // Simplified logic for Benefic/Malefic based on house placement
        // In real Lal Kitab, this is very complex involving "Pakka Ghar", friends/enemies
        const isBenefic = [1, 2, 4, 5, 9].includes(p.house);

        return {
            planet: p.planet,
            house: p.house,
            sign: p.sign, // In Lal Kitab, signs are often secondary to houses
            status: isBenefic ? 'Benefic' : 'Malefic',
            isSleeping: Math.random() > 0.8 // Mock logic
        };
    });
}

export function calculateKarmicDebts(planets: LalKitabPlanet[]): KarmicDebt[] {
    const debts: KarmicDebt[] = [];

    // Pitra Rin (Father's Debt) - Jupiter in 2, 5, 9, 12 afflicted
    const jupiter = planets.find(p => p.planet === 'Jupiter');
    if (jupiter && [2, 5, 9, 12].includes(jupiter.house) && jupiter.status === 'Malefic') {
        debts.push({
            type: 'Pitra',
            present: true,
            cause: 'Disrespect towards elders or destruction of temples in past life',
            indication: 'Obstacles in education, progeny issues, grey hair at young age',
            remedy: 'Collect money from all family members and donate to a temple'
        });
    }

    // Matru Rin (Mother's Debt) - Ketu in 4th house
    const ketu = planets.find(p => p.planet === 'Ketu');
    if (ketu && ketu.house === 4) {
        debts.push({
            type: 'Matru',
            present: true,
            cause: 'Neglect of mother or pollution of water sources',
            indication: 'Mental peace disturbed, accumulation of wealth difficult',
            remedy: 'Drop silver coins in flowing water'
        });
    }

    return debts;
}

export function generateRemedies(planets: LalKitabPlanet[]): LalKitabRemedy[] {
    const remedies: LalKitabRemedy[] = [];

    planets.filter(p => p.status === 'Malefic').forEach(p => {
        let remedyText = '';
        switch (p.planet) {
            case 'Sun': remedyText = 'Throw copper coin in flowing water'; break;
            case 'Moon': remedyText = 'Keep a vessel of water at bedside at night'; break;
            case 'Mars': remedyText = 'Distribute sweets to brothers/friends'; break;
            case 'Mercury': remedyText = 'Clean your teeth with alum (fitkari)'; break;
            case 'Jupiter': remedyText = 'Apply saffron on forehead daily'; break;
            case 'Venus': remedyText = 'Keep a silver piece in wallet'; break;
            case 'Saturn': remedyText = 'Offer oil to Shani temple on Saturdays'; break;
            case 'Rahu': remedyText = 'Keep a silver ball in pocket'; break;
            case 'Ketu': remedyText = 'Feed dogs regularly'; break;
        }

        remedies.push({
            planet: p.planet,
            issue: `Malefic ${p.planet} in House ${p.house}`,
            remedy: remedyText,
            type: 'General',
            duration: '43 days'
        });
    });

    return remedies;
}

export function calculateVarshphal(birthDetails: BirthDetails, year: number): VarshphalChart {
    // Mock Varshphal calculation
    // Real calculation involves progressing the chart by solar return
    const planets = calculateLalKitabPlanets(birthDetails); // Using natal for now as placeholder

    return {
        year,
        planets,
        predictions: [
            'Focus on career growth this year',
            'Health needs attention in the 3rd quarter',
            'Financial stability improves after birthday'
        ]
    };
}

export function calculateLalKitabChart(details: BirthDetails): LalKitabChart {
    const planets = calculateLalKitabPlanets(details);

    // Calculate houses
    const houses: LalKitabHouse[] = Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        planets: planets.filter(p => p.house === i + 1),
        isSleeping: !planets.some(p => p.house === i + 1)
    }));

    const debts = calculateKarmicDebts(planets);
    const remedies = generateRemedies(planets);
    const varshphal = calculateVarshphal(details, new Date().getFullYear());

    return {
        planets,
        houses,
        debts,
        remedies,
        varshphal
    };
}
