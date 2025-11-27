import { useState, useEffect } from 'react';
import { VedicChart } from '@/types/vedic.types';
import { BusinessSuggestion } from '@/types/astrology.types';
import { suggestBusiness } from '@/services/calculations/businessCalculations';
import { Briefcase, Clock, DollarSign, TrendingUp } from 'lucide-react';

interface BusinessSuggesterProps {
    chart: VedicChart;
}

export function BusinessSuggester({ chart }: BusinessSuggesterProps) {
    const [suggestions, setSuggestions] = useState<BusinessSuggestion[]>([]);

    useEffect(() => {
        if (chart) {
            const results = suggestBusiness(chart);
            setSuggestions(results);
        }
    }, [chart]);

    return (
        <div className="space-y-6">
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">Business Opportunities</h3>
                <p className="text-text-secondary mb-6">
                    Based on your 10th House analysis and planetary influences
                </p>

                <div className="space-y-4">
                    {suggestions.map((suggestion, idx) => (
                        <div key={idx} className="bg-bg-tertiary border border-border-secondary rounded-lg p-4 hover:border-accent-purple transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-accent-purple" />
                                    {suggestion.sector}
                                </h4>
                                <div className="flex flex-col items-end">
                                    <span className="text-2xl font-bold text-status-success">{suggestion.successProbability}%</span>
                                    <span className="text-xs text-text-tertiary">Success Prob.</span>
                                </div>
                            </div>

                            <p className="text-text-secondary text-sm mb-4 italic">
                                "{suggestion.reasoning}"
                            </p>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Clock className="w-4 h-4 text-accent-blue" />
                                    <span>{suggestion.timing}</span>
                                </div>
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <DollarSign className="w-4 h-4 text-status-warning" />
                                    <span>{suggestion.investmentRange} Inv.</span>
                                </div>
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <TrendingUp className="w-4 h-4 text-status-success" />
                                    <span>Match: {suggestion.matchScore}/100</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
