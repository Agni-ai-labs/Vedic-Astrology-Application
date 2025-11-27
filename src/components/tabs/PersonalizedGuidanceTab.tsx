import { useState, useEffect } from 'react';
import { useAstrology } from '@/context/AstrologyContext';
import { calculateVedicChart } from '@/services/calculations/vedicCalculations';
import { VedicChart } from '@/types/vedic.types';
import { TargetedRemedies } from '../features/TargetedRemedies';
import { BusinessGrowthAnalyzer } from '../features/BusinessGrowthAnalyzer';
import { BusinessSuggester } from '../features/BusinessSuggester';
import { Sparkles, Briefcase, Target } from 'lucide-react';

type SubTab = 'remedies' | 'business-growth' | 'business-ideas';

export function PersonalizedGuidanceTab() {
    const { birthDetails } = useAstrology();
    const [vedicChart, setVedicChart] = useState<VedicChart | null>(null);
    const [activeSubTab, setActiveSubTab] = useState<SubTab>('remedies');

    useEffect(() => {
        if (birthDetails) {
            const chart = calculateVedicChart(birthDetails);
            setVedicChart(chart);
        }
    }, [birthDetails]);

    if (!birthDetails) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Enter Birth Details</h2>
                <p className="text-text-secondary">Please provide your birth details in the Vedic tab to unlock personalized guidance.</p>
            </div>
        );
    }

    if (!vedicChart) {
        return <div className="text-center py-12 text-text-secondary">Analyzing chart...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-accent-purple" />
                    Personalized Guidance
                </h1>
                <p className="text-text-secondary">
                    Specific remedies and business insights tailored to your chart.
                </p>
            </div>

            {/* Sub-navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border-primary">
                <button
                    onClick={() => setActiveSubTab('remedies')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-all whitespace-nowrap border-b-2 ${activeSubTab === 'remedies'
                        ? 'border-accent-purple text-accent-purple bg-accent-purple/5'
                        : 'border-transparent text-text-tertiary hover:text-text-primary'
                        }`}
                >
                    <Target className="w-4 h-4" />
                    Targeted Remedies
                </button>
                <button
                    onClick={() => setActiveSubTab('business-growth')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-all whitespace-nowrap border-b-2 ${activeSubTab === 'business-growth'
                        ? 'border-accent-purple text-accent-purple bg-accent-purple/5'
                        : 'border-transparent text-text-tertiary hover:text-text-primary'
                        }`}
                >
                    <TrendingUpIcon className="w-4 h-4" />
                    Business Growth
                </button>
                <button
                    onClick={() => setActiveSubTab('business-ideas')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-all whitespace-nowrap border-b-2 ${activeSubTab === 'business-ideas'
                        ? 'border-accent-purple text-accent-purple bg-accent-purple/5'
                        : 'border-transparent text-text-tertiary hover:text-text-primary'
                        }`}
                >
                    <Briefcase className="w-4 h-4" />
                    Business Ideas
                </button>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeSubTab === 'remedies' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <TargetedRemedies chart={vedicChart} />
                    </div>
                )}
                {activeSubTab === 'business-growth' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <BusinessGrowthAnalyzer chart={vedicChart} />
                    </div>
                )}
                {activeSubTab === 'business-ideas' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <BusinessSuggester chart={vedicChart} />
                    </div>
                )}
            </div>
        </div>
    );
}

function TrendingUpIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    )
}
