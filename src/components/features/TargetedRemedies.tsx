import { useState, useEffect } from 'react';
import { VedicChart } from '@/types/vedic.types';
import { UserConcern, TargetedRemedy } from '@/types/astrology.types';
import { generateTargetedRemedies } from '@/services/calculations/remedyCalculations';
import { Heart, DollarSign, Activity, Flame, Briefcase, Scale, TrendingUp, AlertCircle, Clock, Target } from 'lucide-react';

interface TargetedRemediesProps {
    chart: VedicChart;
}

const concernIcons: Record<string, any> = {
    relationship: Heart,
    finance: DollarSign,
    health: Activity,
    addiction: Flame,
    career: TrendingUp,
    legal: Scale,
    business: Briefcase
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return 'border-status-error';
        case 'medium': return 'border-status-warning';
        case 'low': return 'border-status-success';
        default: return 'border-border-secondary';
    }
};

const getCostLabel = (cost: string) => {
    switch (cost) {
        case 'free': return 'Free';
        case 'low': return '₹';
        case 'medium': return '₹₹';
        case 'high': return '₹₹₹';
        default: return cost;
    }
};

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'easy': return 'text-status-success';
        case 'medium': return 'text-status-warning';
        case 'hard': return 'text-status-error';
        default: return 'text-text-tertiary';
    }
};

export function TargetedRemedies({ chart }: TargetedRemediesProps) {
    const [selectedConcerns, setSelectedConcerns] = useState<UserConcern[]>([]);
    const [remedies, setRemedies] = useState<TargetedRemedy[]>([]);

    const availableConcerns: UserConcern[] = [
        { type: 'relationship' },
        { type: 'finance' },
        { type: 'health' },
        { type: 'addiction', details: '' },
        { type: 'career' },
        { type: 'legal' },
        { type: 'business' }
    ];

    const toggleConcern = (concernType: UserConcern['type']) => {
        const exists = selectedConcerns.find(c => c.type === concernType);
        if (exists) {
            setSelectedConcerns(selectedConcerns.filter(c => c.type !== concernType));
        } else {
            setSelectedConcerns([...selectedConcerns, { type: concernType }]);
        }
    };

    const updateConcernDetails = (concernType: UserConcern['type'], details: string) => {
        setSelectedConcerns(selectedConcerns.map(c =>
            c.type === concernType ? { ...c, details } : c
        ));
    };

    useEffect(() => {
        if (selectedConcerns.length > 0) {
            const generatedRemedies = generateTargetedRemedies(chart, selectedConcerns);
            setRemedies(generatedRemedies);
        } else {
            setRemedies([]);
        }
    }, [selectedConcerns, chart]);

    return (
        <div className="space-y-6">
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">Select Your Concerns</h3>
                <p className="text-text-secondary mb-4">
                    Choose the areas where you need guidance
                </p>

                <div className="flex flex-wrap gap-3">
                    {availableConcerns.map((concern) => {
                        const Icon = concernIcons[concern.type];
                        const isSelected = selectedConcerns.some(c => c.type === concern.type);
                        return (
                            <button
                                key={concern.type}
                                onClick={() => toggleConcern(concern.type)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all capitalize ${isSelected
                                        ? 'bg-accent-purple text-white'
                                        : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {concern.type}
                            </button>
                        );
                    })}
                </div>

                {selectedConcerns.some(c => c.type === 'addiction') && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Addiction Details (optional)
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., alcohol, smoking, gambling"
                            className="w-full px-4 py-2 bg-bg-tertiary border border-border-secondary rounded-lg text-text-primary focus:outline-none focus:border-accent-purple"
                            onChange={(e) => updateConcernDetails('addiction', e.target.value)}
                        />
                    </div>
                )}
            </div>

            {remedies.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-text-primary">
                        Recommended Remedies ({remedies.length})
                    </h3>

                    {remedies.map((remedy, idx) => (
                        <div
                            key={idx}
                            className={`bg-bg-secondary border-l-4 ${getPriorityColor(remedy.priority)} rounded-lg p-5 hover:bg-bg-elevated transition-colors`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-bold text-text-primary">{remedy.title}</h4>
                                        <span className={`text-xs px-2 py-1 rounded-full ${remedy.priority === 'high' ? 'bg-status-error/20 text-status-error' :
                                                remedy.priority === 'medium' ? 'bg-status-warning/20 text-status-warning' :
                                                    'bg-status-success/20 text-status-success'
                                            }`}>
                                            {remedy.priority.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-tertiary capitalize">
                                        {remedy.remedyType} • {remedy.concernType}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="flex items-center gap-1">
                                        <Target className="w-4 h-4 text-accent-purple" />
                                        <span className="text-2xl font-bold text-accent-purple">
                                            {remedy.effectiveness}/10
                                        </span>
                                    </div>
                                    <span className="text-xs text-text-tertiary">Effectiveness</span>
                                </div>
                            </div>

                            <p className="text-text-secondary mb-3">{remedy.description}</p>

                            <div className="bg-bg-tertiary rounded-lg p-3 mb-3">
                                <p className="text-sm text-text-primary font-medium mb-1">How to Perform:</p>
                                <p className="text-sm text-text-secondary">{remedy.instructions}</p>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                {remedy.timing && (
                                    <div className="flex items-center gap-1 text-text-tertiary">
                                        <Clock className="w-4 h-4" />
                                        <span>{remedy.timing}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1 text-text-tertiary">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{getCostLabel(remedy.cost)}</span>
                                </div>
                                <div className={`flex items-center gap-1 ${getDifficultyColor(remedy.difficulty)}`}>
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="capitalize">{remedy.difficulty}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedConcerns.length > 0 && remedies.length === 0 && (
                <div className="text-center py-8 text-text-tertiary">
                    Analyzing chart for remedies...
                </div>
            )}
        </div>
    );
}
