import { useState } from 'react'
import { useAstrology } from '@/context/AstrologyContext'
import { BirthDetailsForm } from '../forms/BirthDetailsForm'
import { calculateCombinedAnalysis, CombinedAnalysis } from '@/services/calculations/combinedCalculations'
import { Layers, Shield, TrendingUp, Zap, Calendar } from 'lucide-react'
import { BirthDetails } from '@/services/calculations/chartCalculations'

export function CombinedTab() {
    const { birthDetails, clearAllData } = useAstrology();
    const [analysis, setAnalysis] = useState<CombinedAnalysis | null>(null);

    const handleBirthDetailsSubmit = (details: BirthDetails) => {
        const result = calculateCombinedAnalysis(details);
        setAnalysis(result);
    };

    // Auto-calculate if birth details exist
    if (birthDetails && !analysis) {
        const result = calculateCombinedAnalysis(birthDetails);
        setAnalysis(result);
    }

    if (!analysis) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Combined Analysis</h1>
                    <p className="text-text-secondary">
                        Holistic insights synthesizing Western, Vedic, Lal Kitab, and Numerology
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
                    <Layers className="w-8 h-8 text-accent-purple" />
                    Holistic Analysis
                </h1>
                <p className="text-text-secondary">Synthesized insights from all astrological systems</p>
                <button
                    onClick={clearAllData}
                    className="mt-2 text-sm text-accent-purple hover:underline"
                >
                    Change Details
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Strengths Section */}
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-status-success" />
                        Key Strengths
                    </h3>
                    <div className="space-y-4">
                        {analysis.strengths.map((strength, idx) => (
                            <div key={idx} className="bg-bg-tertiary rounded-lg p-4 border-l-4 border-status-success">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-text-primary">{strength.area}</h4>
                                    <span className="text-xs font-bold bg-status-success/20 text-status-success px-2 py-1 rounded">
                                        Score: {strength.score}
                                    </span>
                                </div>
                                <p className="text-sm text-text-secondary mb-2">{strength.description}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {strength.source.map((src, i) => (
                                        <span key={i} className="text-[10px] uppercase tracking-wider bg-bg-elevated px-2 py-1 rounded text-text-tertiary">
                                            {src}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Challenges Section */}
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-status-warning" />
                        Challenges & Remedies
                    </h3>
                    <div className="space-y-4">
                        {analysis.challenges.map((challenge, idx) => (
                            <div key={idx} className="bg-bg-tertiary rounded-lg p-4 border-l-4 border-status-warning">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-text-primary">{challenge.area}</h4>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${challenge.severity === 'Critical' ? 'bg-status-error/20 text-status-error' : 'bg-status-warning/20 text-status-warning'
                                        }`}>
                                        {challenge.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-text-secondary mb-2">{challenge.description}</p>
                                <div className="mt-2 pt-2 border-t border-border-secondary">
                                    <p className="text-xs text-text-tertiary uppercase mb-1">Suggested Remedy</p>
                                    <p className="text-sm font-medium text-text-primary">{challenge.remedy}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Plan */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent-blue" />
                    Strategic Action Plan
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h4 className="font-bold text-accent-purple flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Immediate (30 Days)
                        </h4>
                        <ul className="space-y-2">
                            {analysis.actionPlan.immediate.map((item, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-1.5 flex-shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-accent-blue flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Short Term (60 Days)
                        </h4>
                        <ul className="space-y-2">
                            {analysis.actionPlan.shortTerm.map((item, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-status-success flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Long Term (90 Days)
                        </h4>
                        <ul className="space-y-2">
                            {analysis.actionPlan.longTerm.map((item, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-status-success mt-1.5 flex-shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
