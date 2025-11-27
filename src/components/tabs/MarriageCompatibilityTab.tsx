/**
 * Marriage Compatibility Tab Component
 * 
 * Allows users to input boy and girl birth star details
 * and view comprehensive Ashtakoota compatibility analysis
 */

import { useState } from 'react';
import { calculateMarriageCompatibility } from '@/services/calculations/compatibilityCalculations';
import { CompatibilityInput, AshtakootaResult } from '@/types/compatibility.types';
import { NAKSHATRA_NAMES } from '@/types/compatibility.types';
import { Heart, AlertTriangle, CheckCircle } from 'lucide-react';

export const MarriageCompatibilityTab = () => {
    const [boyNakshatra, setBoyNakshatra] = useState<number>(1);
    const [boyPada, setBoyPada] = useState<number>(1);
    const [girlNakshatra, setGirlNakshatra] = useState<number>(1);
    const [girlPada, setGirlPada] = useState<number>(1);
    const [result, setResult] = useState<AshtakootaResult | null>(null);

    const handleCalculate = () => {
        const input: CompatibilityInput = {
            boy: { nakshatra: boyNakshatra, pada: boyPada },
            girl: { nakshatra: girlNakshatra, pada: girlPada }
        };

        const compatibility = calculateMarriageCompatibility(input);
        setResult(compatibility);
    };

    const getCompatibilityColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-400';
        if (percentage >= 60) return 'text-blue-400';
        if (percentage >= 40) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreColor = (obtained: number, maximum: number) => {
        const percent = (obtained / maximum) * 100;
        if (percent >= 80) return 'bg-green-600';
        if (percent >= 50) return 'bg-yellow-600';
        return 'bg-red-600';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <h2 className="text-3xl font-bold mb-2">Marriage Compatibility</h2>
                <p className="text-text-secondary">Ashtakoota Matching System</p>
            </div>

            {/* Input Form */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Boy's Details */}
                <div className="bg-bg-secondary rounded-lg p-6 border border-border-subtle">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Boy's Birth Star</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nakshatra</label>
                            <select
                                value={boyNakshatra}
                                onChange={(e) => setBoyNakshatra(Number(e.target.value))}
                                className="w-full px-4 py-2 bg-bg-elevated border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {NAKSHATRA_NAMES.map((name, idx) => (
                                    <option key={idx} value={idx + 1}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Pada (Quarter)</label>
                            <select
                                value={boyPada}
                                onChange={(e) => setBoyPada(Number(e.target.value))}
                                className="w-full px-4 py-2 bg-bg-elevated border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {[1, 2, 3, 4].map((pada) => (
                                    <option key={pada} value={pada}>
                                        Pada {pada}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Girl's Details */}
                <div className="bg-bg-secondary rounded-lg p-6 border border-border-subtle">
                    <h3 className="text-xl font-semibold mb-4 text-pink-400">Girl's Birth Star</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nakshatra</label>
                            <select
                                value={girlNakshatra}
                                onChange={(e) => setGirlNakshatra(Number(e.target.value))}
                                className="w-full px-4 py-2 bg-bg-elevated border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {NAKSHATRA_NAMES.map((name, idx) => (
                                    <option key={idx} value={idx + 1}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Pada (Quarter)</label>
                            <select
                                value={girlPada}
                                onChange={(e) => setGirlPada(Number(e.target.value))}
                                className="w-full px-4 py-2 bg-bg-elevated border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {[1, 2, 3, 4].map((pada) => (
                                    <option key={pada} value={pada}>
                                        Pada {pada}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
                <button
                    onClick={handleCalculate}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                    Calculate Compatibility
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="bg-gradient-to-br from-bg-secondary to-bg-elevated rounded-xl p-8 border border-border-subtle text-center">
                        <div className={`text-6xl font-bold mb-2 ${getCompatibilityColor(result.percentage)}`}>
                            {result.totalScore}/{result.maximumScore}
                        </div>
                        <div className="text-2xl font-semibold mb-2">{result.percentage.toFixed(1)}%</div>
                        <div className="text-lg text-text-secondary capitalize">{result.compatibility.replace('_', ' ')}</div>
                    </div>

                    {/* 8 Poruthams */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Eight-Fold Compatibility (Ashtakoota)</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[result.varna, result.vasya, result.tara, result.yoni, result.grahaMaitri, result.gana, result.bhakut, result.nadi].map((porutham, idx) => (
                                <div key={idx} className="bg-bg-secondary rounded-lg p-4 border border-border-subtle">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-semibold">{porutham.name}</h4>
                                            <p className="text-sm text-text-secondary">{porutham.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold">{porutham.obtained}/{porutham.maximum}</div>
                                            <div className="text-xs text-text-secondary">{porutham.percentage.toFixed(0)}%</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${getScoreColor(porutham.obtained, porutham.maximum)}`}
                                            style={{ width: `${porutham.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-sm">{porutham.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Poruthams */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Additional Checks (South Indian)</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { name: 'Mahendra', value: result.mahendra },
                                { name: 'Vedha', value: result.vedha },
                                { name: 'Rajju', value: result.rajju },
                                { name: 'Stree Dheergha', value: result.streeDheergha }
                            ].map((check, idx) => (
                                <div key={idx} className={`p-4 rounded-lg border ${check.value ? 'bg-green-900/20 border-green-600' : 'bg-red-900/20 border-red-600'}`}>
                                    <div className="flex items-center gap-2">
                                        {check.value ? <CheckCircle className="w-5 h-5 text-green-400" /> : <AlertTriangle className="w-5 h-5 text-red-400" />}
                                        <span className="font-semibold">{check.name}</span>
                                    </div>
                                    <div className="text-sm mt-1">{check.value ? 'Favorable' : 'Unfavorable'}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warnings */}
                    {result.warnings.length > 0 && (
                        <div className="bg-red-900/20 border border-red-600 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6" />
                                Important Warnings
                            </h3>
                            <ul className="space-y-2">
                                {result.warnings.map((warning, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>{warning}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Recommendation */}
                    <div className="bg-bg-secondary rounded-lg p-6 border border-border-subtle">
                        <h3 className="text-xl font-semibold mb-3">Recommendation</h3>
                        <p className="text-lg leading-relaxed">{result.recommendation}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
