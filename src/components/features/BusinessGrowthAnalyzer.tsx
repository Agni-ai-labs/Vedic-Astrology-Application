import { useState } from 'react';
import { VedicChart } from '@/types/vedic.types';
import { BusinessDetails, BusinessAnalysis } from '@/types/astrology.types';
import { analyzeBusinessGrowth } from '@/services/calculations/businessCalculations';
import { TrendingUp, AlertTriangle, ArrowRight, Palette, Compass, Calendar } from 'lucide-react';

interface BusinessGrowthAnalyzerProps {
    chart: VedicChart;
}

export function BusinessGrowthAnalyzer({ chart }: BusinessGrowthAnalyzerProps) {
    const [details, setDetails] = useState<BusinessDetails>({
        name: '',
        type: '',
        startDate: new Date(),
    });
    const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null);

    const handleAnalyze = () => {
        if (!details.name) return;
        const result = analyzeBusinessGrowth(chart, details);
        setAnalysis(result);
    };

    return (
        <div className="space-y-8">
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">Business Growth Analyzer</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Business Name</label>
                        <input
                            type="text"
                            value={details.name}
                            onChange={(e) => setDetails({ ...details, name: e.target.value })}
                            className="w-full bg-bg-tertiary border border-border-secondary rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-purple"
                            placeholder="Enter business name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Business Type</label>
                        <input
                            type="text"
                            value={details.type}
                            onChange={(e) => setDetails({ ...details, type: e.target.value })}
                            className="w-full bg-bg-tertiary border border-border-secondary rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-purple"
                            placeholder="e.g. Tech, Retail"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Start Date</label>
                        <input
                            type="date"
                            value={details.startDate.toISOString().split('T')[0]}
                            onChange={(e) => setDetails({ ...details, startDate: new Date(e.target.value) })}
                            className="w-full bg-bg-tertiary border border-border-secondary rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-purple"
                        />
                    </div>
                </div>
                <button
                    onClick={handleAnalyze}
                    disabled={!details.name}
                    className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Analyze Business
                </button>
            </div>

            {analysis && (
                <div className="space-y-6">
                    {/* Growth Prediction */}
                    <div className={`bg-bg-secondary border rounded-lg p-6 ${analysis.growthPrediction.willGrow ? 'border-status-success/50' : 'border-status-warning/50'
                        }`}>
                        <div className="flex items-center gap-3 mb-4">
                            {analysis.growthPrediction.willGrow ? (
                                <TrendingUp className="w-8 h-8 text-status-success" />
                            ) : (
                                <AlertTriangle className="w-8 h-8 text-status-warning" />
                            )}
                            <div>
                                <h4 className="text-lg font-bold text-text-primary">
                                    {analysis.growthPrediction.willGrow ? 'Positive Growth Outlook' : 'Challenges Predicted'}
                                </h4>
                                <p className="text-text-secondary text-sm">{analysis.growthPrediction.timeline}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <span className="text-2xl font-bold text-text-primary">{analysis.growthPrediction.confidence}%</span>
                                <p className="text-xs text-text-tertiary">Confidence</p>
                            </div>
                        </div>
                    </div>

                    {/* Name Analysis */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                            <h4 className="text-lg font-bold text-text-primary mb-4">Name Analysis</h4>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-text-secondary text-sm">Numerology Score</p>
                                    <p className="text-3xl font-bold text-accent-purple">{analysis.nameAnalysis.score}/100</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${analysis.nameAnalysis.assessment === 'Excellent' ? 'bg-status-success/20 text-status-success' :
                                    analysis.nameAnalysis.assessment === 'Good' ? 'bg-accent-blue/20 text-accent-blue' :
                                        'bg-status-warning/20 text-status-warning'
                                    }`}>
                                    {analysis.nameAnalysis.assessment}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-text-primary">Suggested Alternatives:</p>
                                <ul className="space-y-1">
                                    {analysis.recommendations.suggestedNames.map((name, idx) => (
                                        <li key={idx} className="text-sm text-text-secondary flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-accent-purple" />
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                            <h4 className="text-lg font-bold text-text-primary mb-4">Strategic Recommendations</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Palette className="w-5 h-5 text-accent-pink" />
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">Logo Colors</p>
                                        <p className="text-sm text-text-secondary">{analysis.recommendations.logoColors.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Compass className="w-5 h-5 text-accent-blue" />
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">Best Direction</p>
                                        <p className="text-sm text-text-secondary">{analysis.recommendations.bestDirection}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-status-success" />
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">Rebranding Dates</p>
                                        <p className="text-sm text-text-secondary">
                                            {analysis.recommendations.rebrandingDates.map(d => d.toLocaleDateString()).join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
