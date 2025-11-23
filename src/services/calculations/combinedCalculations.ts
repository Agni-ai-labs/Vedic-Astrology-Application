import { BirthDetails } from '@/services/calculations/chartCalculations';
import { calculateBirthChart } from '@/services/calculations/chartCalculations';
import { calculateVedicChart } from '@/services/calculations/vedicCalculations';
import { calculateLalKitabChart } from '@/services/calculations/lalkitabCalculations';
import { calculateNumerology } from '@/services/calculations/numerologyCalculations';

export interface Strength {
    area: string;
    score: number; // 0-100
    source: string[]; // e.g., ['Western', 'Vedic']
    description: string;
}

export interface Challenge {
    area: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    source: string[];
    description: string;
    remedy: string;
}

export interface CombinedAnalysis {
    strengths: Strength[];
    challenges: Challenge[];
    dominantElement: string;
    luckyFactors: {
        colors: string[];
        numbers: number[];
        days: string[];
        gemstones: string[];
    };
    actionPlan: {
        immediate: string[]; // 30 days
        shortTerm: string[]; // 60 days
        longTerm: string[]; // 90 days
    };
}

export function calculateCombinedAnalysis(details: BirthDetails): CombinedAnalysis {
    // 1. Calculate all charts
    const westernChart = calculateBirthChart(details);
    const vedicChart = calculateVedicChart(details);
    const lalkitabChart = calculateLalKitabChart(details);
    const numerology = calculateNumerology(details.name, new Date(`${details.date}T${details.time}`));

    // 2. Synthesize Strengths
    const strengths: Strength[] = [];

    // Example Synthesis Logic:
    // If Sun is strong in Western (Leo/Aries) OR Vedic (Exalted/Own Sign) -> Leadership Strength
    const westernSunStrong = ['Leo', 'Aries'].includes(westernChart.sun.sign.name);
    const vedicSunStrong = ['Leo', 'Aries'].includes(vedicChart.d1.planets.find(p => p.planet === 'Sun')?.sign || '');
    const lifePathLeader = [1, 8, 22].includes(numerology.lifePath.value);

    if (westernSunStrong || vedicSunStrong || lifePathLeader) {
        strengths.push({
            area: 'Leadership & Authority',
            score: (westernSunStrong ? 30 : 0) + (vedicSunStrong ? 40 : 0) + (lifePathLeader ? 30 : 0),
            source: [
                westernSunStrong ? 'Western Sun' : '',
                vedicSunStrong ? 'Vedic Sun' : '',
                lifePathLeader ? 'Numerology Life Path' : ''
            ].filter(Boolean),
            description: 'Natural ability to lead, command respect, and take initiative.'
        });
    }

    // 3. Synthesize Challenges
    const challenges: Challenge[] = [];

    // Example: Saturn Return or Sade Sati
    // Simplified check for Sade Sati (Moon in 12th, 1st, 2nd from Saturn) - Mock logic for now
    const isSadeSati = false; // Placeholder
    if (isSadeSati) {
        challenges.push({
            area: 'Mental Stress & Delays',
            severity: 'High',
            source: ['Vedic Saturn Transit'],
            description: 'Period of testing, discipline, and restructuring.',
            remedy: 'Chant Hanuman Chalisa and offer oil to Saturn on Saturdays.'
        });
    }

    // Karmic Debts from Lal Kitab
    lalkitabChart.debts.forEach(debt => {
        challenges.push({
            area: `Karmic Debt (${debt.type})`,
            severity: 'Medium',
            source: ['Lal Kitab'],
            description: debt.indication,
            remedy: debt.remedy
        });
    });

    // 4. Determine Dominant Element (Western)
    // Simplified count
    const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
    [westernChart.sun, westernChart.moon, westernChart.ascendant].forEach(p => {
        elements[p.sign.element as keyof typeof elements]++;
    });
    const dominantElement = Object.entries(elements).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    // 5. Generate Action Plan
    const actionPlan = {
        immediate: [
            `Start ${lalkitabChart.remedies[0]?.remedy || 'daily meditation'}`,
            `Wear ${dominantElement === 'Fire' ? 'Red' : 'Blue'} on important days`
        ],
        shortTerm: [
            'Focus on clearing karmic debts',
            'Plan major decisions around favorable Dasha periods'
        ],
        longTerm: [
            `Align career with Life Path ${numerology.lifePath.value}`,
            'Consider gemstone therapy for weak planets'
        ]
    };

    return {
        strengths,
        challenges,
        dominantElement,
        luckyFactors: {
            colors: ['Red', 'Gold'], // Placeholder logic
            numbers: [numerology.lifePath.value, numerology.destiny.value],
            days: ['Sunday', 'Tuesday'],
            gemstones: ['Ruby', 'Yellow Sapphire']
        },
        actionPlan
    };
}
