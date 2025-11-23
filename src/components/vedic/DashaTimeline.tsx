import { DashaPeriod } from '@/types/vedic.types'
import { Calendar } from 'lucide-react'

interface DashaTimelineProps {
    dashas: DashaPeriod[]
}

export function DashaTimeline({ dashas }: DashaTimelineProps) {
    const now = new Date();

    // Find current dasha
    const currentDasha = dashas.find(d =>
        d.startDate <= now && d.endDate >= now
    );

    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-purple" />
                Vimshottari Dasha
            </h3>

            {currentDasha && (
                <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-4 mb-6">
                    <div className="text-sm text-text-tertiary mb-1">Current Mahadasha</div>
                    <div className="text-2xl font-bold text-accent-purple mb-2">{currentDasha.planet}</div>
                    <div className="text-sm text-text-secondary">
                        {currentDasha.startDate.toLocaleDateString()} - {currentDasha.endDate.toLocaleDateString()}
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {dashas.map((dasha, idx) => {
                    const isCurrent = dasha === currentDasha;
                    const isPast = dasha.endDate < now;

                    return (
                        <div
                            key={idx}
                            className={`border rounded-lg p-4 transition-all ${isCurrent
                                    ? 'border-accent-purple bg-accent-purple/5'
                                    : isPast
                                        ? 'border-border-secondary bg-bg-tertiary opacity-50'
                                        : 'border-border-secondary bg-bg-tertiary'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-text-primary">{dasha.planet} Mahadasha</div>
                                    <div className="text-xs text-text-tertiary mt-1">
                                        {dasha.startDate.toLocaleDateString()} - {dasha.endDate.toLocaleDateString()}
                                    </div>
                                </div>
                                {isCurrent && (
                                    <div className="px-3 py-1 bg-accent-purple text-white text-xs rounded-full">
                                        Active
                                    </div>
                                )}
                                {isPast && (
                                    <div className="text-xs text-text-tertiary">
                                        Completed
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
