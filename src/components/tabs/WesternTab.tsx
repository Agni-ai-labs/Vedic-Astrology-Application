import { SunSignSection } from '../western/SunSignSection'
import { MoonSignSection } from '../western/MoonSignSection'
import { RisingSignSection } from '../western/RisingSignSection'
import { MonthlyHoroscopeSection } from '../western/MonthlyHoroscopeSection'
import { BirthDetailsForm } from '../forms/BirthDetailsForm'
import { calculateBirthChart, BirthDetails } from '@/services/calculations/chartCalculations'
import { useAstrology } from '@/context/AstrologyContext'
import {
    generateSunSignEssence,
    generateMoonSignSignificance,
    generateRisingSignImpressions
} from '@/services/calculations/westernCalculations'
import { SunSignData, MoonSignData, RisingSignData, MonthlyHoroscope } from '@/types/western.types'

export function WesternTab() {
    const { birthChart, setBirthChart, setBirthDetails, clearAllData } = useAstrology();

    const handleBirthDetailsSubmit = (details: BirthDetails) => {
        const chart = calculateBirthChart(details);
        setBirthChart(chart);
        setBirthDetails(details);
    };

    if (!birthChart) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Western Astrology</h1>
                    <p className="text-text-secondary">
                        Calculate your natal chart with precise planetary positions
                    </p>
                </div>
                <BirthDetailsForm onSubmit={handleBirthDetailsSubmit} />
            </div>
        );
    }

    const sunSignData: SunSignData = {
        sign: birthChart.sun.sign,
        degree: birthChart.sun.degree,
        house: birthChart.sun.house,
        coreEssence: generateSunSignEssence(birthChart.sun.sign),
        lifeApproach: 'Lead with heart and generosity',
        selfExpression: 'Creative and confident',
        creativeOutlet: 'Performance and leadership',
    }

    const moonSignData: MoonSignData = {
        sign: birthChart.moon.sign,
        degree: birthChart.moon.degree,
        house: birthChart.moon.house,
        emotionalSignificance: generateMoonSignSignificance(birthChart.moon.sign),
        emotionalNeeds: [
            'Safety and emotional security',
            'Recognition and appreciation',
            'Creative self-expression',
            'Loyal and supportive relationships',
        ],
        comfortZone: 'Familiar settings with trusted people',
        instinctiveReactions: 'React with warmth and protectiveness',
        nurturingStyle: 'Generous and encouraging',
        innerChild: 'Playful and seeking attention',
    }

    const risingSignData: RisingSignData = {
        sign: birthChart.ascendant.sign,
        degree: birthChart.ascendant.degree,
        firstImpressions: generateRisingSignImpressions(birthChart.ascendant.sign),
        socialPersona: [
            'Confident and outgoing presence',
            'Natural leadership abilities',
            'Warm and approachable demeanor',
            'Creative self-expression',
            'Generous with time and energy',
        ],
        physicalAppearance: 'Strong, dignified bearing with bright eyes',
        lifeApproach: 'Lead with confidence, seek recognition, express individuality boldly',
        mask: 'The charismatic leader who brightens any room',
        chartRuler: birthChart.ascendant.sign.rulingPlanet,
    }

    const monthlyHoroscope: MonthlyHoroscope = {
        sign: birthChart.sun.sign.name,
        month: new Date().toLocaleDateString('en-US', { month: 'long' }),
        year: new Date().getFullYear(),
        overview: 'This month brings powerful opportunities for growth and self-discovery.',
        keyDates: [],
        opportunities: ['Personal growth', 'Creative expression', 'New connections'],
        challenges: ['Balancing work and life', 'Managing expectations'],
        advice: 'Focus on what truly matters to you and trust your inner guidance.',
        luckyDays: [7, 14, 21],
        colors: ['Blue', 'Silver'],
        areas: {
            love: { rating: 7, description: 'Positive energy in relationships' },
            career: { rating: 8, description: 'Professional opportunities arise' },
            finance: { rating: 6, description: 'Steady financial progress' },
            health: { rating: 7, description: 'Good energy levels' }
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Your Natal Chart</h1>
                <p className="text-text-secondary">Based on your birth details</p>
                <button
                    onClick={clearAllData}
                    className="mt-2 text-sm text-accent-purple hover:underline"
                >
                    Change Birth Details
                </button>
            </div>

            <SunSignSection data={sunSignData} />
            <MoonSignSection data={moonSignData} />
            <RisingSignSection data={risingSignData} />
            <MonthlyHoroscopeSection data={monthlyHoroscope} />
        </div>
    )
}
