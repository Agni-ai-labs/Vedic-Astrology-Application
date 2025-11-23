import { KarmicDebt, LalKitabRemedy } from '@/types/lalkitab.types'
import { AlertTriangle, ShieldCheck, Droplets } from 'lucide-react'

interface RemediesSectionProps {
    debts: KarmicDebt[];
    remedies: LalKitabRemedy[];
}

export function RemediesSection({ debts, remedies }: RemediesSectionProps) {
    return (
        <div className="space-y-6">
            {/* Karmic Debts */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-status-warning" />
                    Rinanubandha (Karmic Debts)
                </h3>

                {debts.length === 0 ? (
                    <p className="text-text-secondary italic">No major karmic debts detected in this chart.</p>
                ) : (
                    <div className="space-y-4">
                        {debts.map((debt, idx) => (
                            <div key={idx} className="border border-status-warning/30 bg-status-warning/5 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-text-primary">{debt.type} Rin (Debt)</h4>
                                    <span className="text-xs bg-status-warning/20 text-status-warning px-2 py-1 rounded">Active</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-text-tertiary text-xs uppercase mb-1">Cause</p>
                                        <p className="text-text-secondary">{debt.cause}</p>
                                    </div>
                                    <div>
                                        <p className="text-text-tertiary text-xs uppercase mb-1">Indication</p>
                                        <p className="text-text-secondary">{debt.indication}</p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-status-warning/20">
                                    <p className="text-text-tertiary text-xs uppercase mb-1">Remedy</p>
                                    <p className="text-text-primary font-medium">{debt.remedy}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* General Remedies */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent-purple" />
                    Lal Kitab Remedies
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    {remedies.map((remedy, idx) => (
                        <div key={idx} className="bg-bg-tertiary border border-border-secondary rounded-lg p-4 hover:border-accent-purple/50 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-text-primary">{remedy.planet}</span>
                                <span className="text-xs text-text-tertiary">• {remedy.type}</span>
                            </div>
                            <p className="text-xs text-status-error mb-2">{remedy.issue}</p>
                            <div className="flex items-start gap-2">
                                <Droplets className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-text-secondary font-medium">{remedy.remedy}</p>
                                    <p className="text-xs text-text-tertiary mt-1">Duration: {remedy.duration}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
