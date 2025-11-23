import { MoonSignData } from '@/types/western.types'
import { Moon } from 'lucide-react'

interface MoonSignSectionProps {
    data: MoonSignData
}

export function MoonSignSection({ data }: MoonSignSectionProps) {
    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
            {/* Header with Moon Icon */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-element-water/20 flex items-center justify-center flex-shrink-0">
                    <Moon className="w-7 h-7 text-element-water" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-primary">
                        {data.sign.name.toUpperCase()} MOON SIGN
                    </h2>
                    <p className="text-text-tertiary text-sm mt-1">
                        Emotional Nature & Inner Self
                    </p>
                </div>
            </div>

            {/* Emotional Significance */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-element-water rounded"></span>
                    Emotional Significance
                </h3>
                <p className="text-text-secondary leading-relaxed">
                    {data.emotionalSignificance}
                </p>
            </div>

            {/* Emotional Needs */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-element-water rounded"></span>
                    Emotional Needs
                </h3>
                <div className="space-y-3">
                    {data.emotionalNeeds.map((need, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-element-water mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary">{need}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Comfort Zone */}
            <div className="bg-bg-tertiary rounded-lg p-4 border border-border-secondary">
                <h3 className="text-text-primary font-semibold mb-2 text-sm">
                    Comfort Zone
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                    {data.comfortZone}
                </p>
            </div>

            {/* Inner Nature Keywords */}
            <div className="mt-6">
                <h3 className="text-text-tertiary text-xs mb-3">INNER QUALITIES</h3>
                <div className="flex flex-wrap gap-2">
                    {data.sign.keywords.slice(0, 6).map((keyword, idx) => (
                        <span
                            key={idx}
                            className="bg-element-water/10 text-element-water px-3 py-1.5 rounded-full text-sm border border-element-water/30"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
