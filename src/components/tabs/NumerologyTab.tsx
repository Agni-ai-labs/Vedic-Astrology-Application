import { useState } from 'react'
import { useAstrology } from '@/context/AstrologyContext'
import { BirthDetailsForm } from '../forms/BirthDetailsForm'
import { calculateNumerology } from '@/services/calculations/numerologyCalculations'
import { NumerologyReport } from '@/types/numerology.types'
import { NumberCard } from '../numerology/NumberCard'
import { Hash, Calendar } from 'lucide-react'
import { BirthDetails } from '@/services/calculations/chartCalculations'

export function NumerologyTab() {
    const { birthDetails, clearAllData } = useAstrology();
    const [report, setReport] = useState<NumerologyReport | null>(null);

    const handleBirthDetailsSubmit = (details: BirthDetails) => {
        // details.date is already a Date object
        const numReport = calculateNumerology(details.name, details.date);
        setReport(numReport);
    };

    // Auto-calculate if birth details exist
    if (birthDetails && !report) {
        // birthDetails.date is already a Date object
        const numReport = calculateNumerology(birthDetails.name, birthDetails.date);
        setReport(numReport);
    }

    if (!report) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Numerology Analysis</h1>
                    <p className="text-text-secondary">
                        Unlock the hidden meaning behind your name and birth date
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
                    <Hash className="w-8 h-8 text-accent-purple" />
                    Numerology Report
                </h1>
                <p className="text-text-secondary">Pythagorean System Analysis</p>
                <button
                    onClick={clearAllData}
                    className="mt-2 text-sm text-accent-purple hover:underline"
                >
                    Change Details
                </button>
            </div>

            {/* Core Numbers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NumberCard
                    data={report.lifePath}
                    color="bg-accent-purple"
                />
                <NumberCard
                    data={report.destiny}
                    color="bg-accent-blue"
                />
                <NumberCard
                    data={report.soulUrge}
                    color="bg-status-error"
                />
                <NumberCard
                    data={report.personality}
                    color="bg-status-success"
                />
                <NumberCard
                    data={report.birthDay}
                    color="bg-status-warning"
                />
            </div>

            {/* Personal Year Section */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-8 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-text-tertiary" />
                        Personal Year {report.currentYear}
                    </h3>
                    <p className="text-text-secondary max-w-2xl">
                        You are currently in a <span className="font-bold text-accent-purple">Personal Year {report.personalYear}</span>.
                        This marks a specific phase in your 9-year cycle, influencing the themes and opportunities you'll encounter throughout the year.
                    </p>
                </div>
                <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-bg-tertiary rounded-full border-4 border-accent-purple">
                    <span className="text-3xl font-bold text-text-primary">{report.personalYear}</span>
                    <span className="text-[10px] uppercase tracking-wider text-text-tertiary">Cycle</span>
                </div>
            </div>
        </div>
    )
}
