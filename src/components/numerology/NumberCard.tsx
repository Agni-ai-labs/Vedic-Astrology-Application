import { NumerologyNumber } from '@/types/numerology.types'

interface NumberCardProps {
    data: NumerologyNumber;
    color?: string;
}

export function NumberCard({ data, color = 'bg-accent-purple' }: NumberCardProps) {
    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 relative overflow-hidden group hover:border-accent-purple/50 transition-colors">
            <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-text-secondary">{data.name}</h3>
                    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {data.value}
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Keywords</p>
                        <p className="text-text-primary font-medium">{data.description}</p>
                    </div>

                    <div>
                        <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Meaning</p>
                        <p className="text-sm text-text-secondary leading-relaxed">{data.meaning}</p>
                    </div>

                    {data.planet && (
                        <div className="pt-3 border-t border-border-secondary flex items-center gap-2">
                            <span className="text-xs text-text-tertiary">Ruling Planet:</span>
                            <span className="text-sm font-medium text-accent-blue">{data.planet}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
