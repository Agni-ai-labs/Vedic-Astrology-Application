import { useState } from 'react'
import { useAstrology } from '@/context/AstrologyContext'
import { BirthDetailsForm } from '../forms/BirthDetailsForm'
import { calculateLalKitabChart } from '@/services/calculations/lalkitabCalculations'
import { LalKitabChart } from '@/types/lalkitab.types'
import { LalKitabChartVisualization } from '../lalkitab/LalKitabChart'
import { RemediesSection } from '../lalkitab/RemediesSection'
import { BookOpen, Calendar } from 'lucide-react'
import { BirthDetails } from '@/services/calculations/chartCalculations'

export function LalKitabTab() {
    const { birthDetails, clearAllData } = useAstrology();
    const [lkChart, setLkChart] = useState<LalKitabChart | null>(null);

    const handleBirthDetailsSubmit = (details: BirthDetails) => {
        const chart = calculateLalKitabChart(details);
        setLkChart(chart);
    };

    // Auto-calculate if birth details exist
    if (birthDetails && !lkChart) {
        const chart = calculateLalKitabChart(birthDetails);
        setLkChart(chart);
    }

    if (!lkChart) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Lal Kitab Astrology</h1>
                    <p className="text-text-secondary">
                        Discover unique remedies and karmic insights from the Red Book
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
                    <BookOpen className="w-8 h-8 text-status-error" />
                    Lal Kitab Analysis
                </h1>
                <p className="text-text-secondary">Unique system of planetary remedies</p>
                <button
                    onClick={clearAllData}
                    className="mt-2 text-sm text-accent-purple hover:underline"
                >
                    Change Birth Details
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Chart Visualization */}
                <LalKitabChartVisualization chart={lkChart} />

                {/* Varshphal Predictions */}
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-accent-blue" />
                        Varshphal (Annual Predictions)
                    </h3>
                    <div className="space-y-4">
                        {lkChart.varshphal.predictions.map((pred, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-bg-tertiary rounded-lg">
                                <span className="text-accent-purple font-bold text-lg">{idx + 1}</span>
                                <p className="text-text-secondary">{pred}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Remedies & Debts */}
            <RemediesSection debts={lkChart.debts} remedies={lkChart.remedies} />
        </div>
    )
}
