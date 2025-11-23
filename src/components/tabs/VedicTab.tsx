import { D1ChartVisualization } from '../vedic/D1Chart'
import { DashaTimeline } from '../vedic/DashaTimeline'
import { BirthDetailsForm } from '../forms/BirthDetailsForm'
import { calculateVedicChart } from '@/services/calculations/vedicCalculations'
import { BirthDetails } from '@/services/calculations/chartCalculations'
import { useAstrology } from '@/context/AstrologyContext'
import { useState } from 'react'
import { VedicChart, Yoga, Dosha } from '@/types/vedic.types'
import { Star, TrendingUp, AlertTriangle } from 'lucide-react'

export function VedicTab() {
    const { birthDetails, clearAllData } = useAstrology();
    const [vedicChart, setVedicChart] = useState<VedicChart | null>(null);

    const handleBirthDetailsSubmit = (details: BirthDetails) => {
        const chart = calculateVedicChart(details);
        setVedicChart(chart);
    };

    // Auto-calculate if birth details exist
    if (birthDetails && !vedicChart) {
        const chart = calculateVedicChart(birthDetails);
        setVedicChart(chart);
    }

    if (!vedicChart) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Vedic Astrology</h1>
                    <p className="text-text-secondary">
                        Calculate your Vedic chart with D1, D9, Dashas, Yogas, and Doshas
                    </p>
                </div>
                <BirthDetailsForm onSubmit={handleBirthDetailsSubmit} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-2">
                    <Star className="w-8 h-8 text-accent-purple" />
                    Vedic Astrology Chart
                </h1>
                <p className="text-text-secondary">Based on Sidereal calculations</p>
                <button
                    onClick={clearAllData}
                    className="mt-2 text-sm text-accent-purple hover:underline"
                >
                    Change Birth Details
                </button>
            </div>

            {/* D1 Chart */}
            <D1ChartVisualization chart={vedicChart.d1} />

            {/* Dasha Timeline */}
            <DashaTimeline dashas={vedicChart.currentDasha} />

            {/* Yogas */}
            {vedicChart.yogas.length > 0 && (
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-status-success" />
                        Yogas (Auspicious Combinations)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {vedicChart.yogas.map((yoga: Yoga, idx: number) => (
                            <div key={idx} className="bg-bg-tertiary border border-border-secondary rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-text-primary">{yoga.name}</h4>
                                    <span className={`text-xs px-2 py-1 rounded-full ${yoga.strength === 'Strong' ? 'bg-status-success/20 text-status-success' :
                                            yoga.strength === 'Moderate' ? 'bg-accent-blue/20 text-accent-blue' :
                                                'bg-text-tertiary/20 text-text-tertiary'
                                        }`}>
                                        {yoga.strength}
                                    </span>
                                </div>
                                <p className="text-text-secondary text-sm mb-2">{yoga.description}</p>
                                <p className="text-accent-purple text-sm italic">{yoga.effects}</p>
                                <div className="mt-2 text-xs text-text-tertiary">
                                    Planets: {yoga.planets.join(', ')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Doshas */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-status-warning" />
                    Doshas (Afflictions)
                </h3>
                <div className="space-y-4">
                    {vedicChart.doshas.map((dosha: Dosha, idx: number) => (
                        <div key={idx} className={`border rounded-lg p-4 ${dosha.present
                                ? dosha.severity === 'High' ? 'border-status-error bg-status-error/5' :
                                    dosha.severity === 'Medium' ? 'border-status-warning bg-status-warning/5' :
                                        'border-accent-blue bg-accent-blue/5'
                                : 'border-border-secondary bg-bg-tertiary opacity-60'
                            }`}>
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-text-primary">{dosha.name} Dosha</h4>
                                <span className={`text-xs px-3 py-1 rounded-full ${!dosha.present ? 'bg-status-success/20 text-status-success' :
                                        dosha.severity === 'High' ? 'bg-status-error/20 text-status-error' :
                                            dosha.severity === 'Medium' ? 'bg-status-warning/20 text-status-warning' :
                                                'bg-accent-blue/20 text-accent-blue'
                                    }`}>
                                    {dosha.present ? dosha.severity : 'Not Present'}
                                </span>
                            </div>
                            <p className="text-text-secondary text-sm mb-3">{dosha.details}</p>
                            {dosha.remedies.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-text-tertiary mb-2">Remedies:</p>
                                    <ul className="space-y-1">
                                        {dosha.remedies.map((remedy, rIdx) => (
                                            <li key={rIdx} className="text-xs text-text-secondary flex items-start gap-2">
                                                <span className="text-accent-purple">•</span>
                                                {remedy}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
