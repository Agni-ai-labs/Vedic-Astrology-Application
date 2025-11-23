import { RisingSignData } from '@/types/western.types'
import { ArrowUpCircle } from 'lucide-react'

interface RisingSignSectionProps {
    data: RisingSignData
}

export function RisingSignSection({ data }: RisingSignSectionProps) {
    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
            {/* Header with Ascendant Icon */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-accent-blue/20 flex items-center justify-center flex-shrink-0">
                    <ArrowUpCircle className="w-7 h-7 text-accent-blue" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-primary">
                        {data.sign.name.toUpperCase()} RISING (ASCENDANT)
                    </h2>
                    <p className="text-text-tertiary text-sm mt-1">
                        {data.degree.toFixed(2)}° {data.sign.name}
                    </p>
                </div>
            </div>

            {/* First Impressions */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-blue rounded"></span>
                    First Impressions
                </h3>
                <p className="text-text-secondary leading-relaxed">
                    {data.firstImpressions}
                </p>
            </div>

            {/* Social Persona */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-blue rounded"></span>
                    Social Persona
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.socialPersona.map((trait, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary text-sm">{trait}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Life Approach */}
            <div className="bg-bg-tertiary rounded-lg p-4 border border-border-secondary mb-6">
                <h3 className="text-text-primary font-semibold mb-2 text-sm">
                    Life Approach
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                    {data.lifeApproach}
                </p>
            </div>

            {/* Chart Ruler */}
            <div className="flex items-center justify-between bg-bg-elevated rounded-lg p-4 border border-accent-blue/30">
                <div>
                    <p className="text-text-tertiary text-xs mb-1">Chart Ruler</p>
                    <p className="text-text-primary font-semibold">{data.chartRuler}</p>
                </div>
                <div className="text-right">
                    <p className="text-text-tertiary text-xs mb-1">Modality</p>
                    <p className="text-text-primary font-semibold">{data.sign.modality}</p>
                </div>
            </div>
        </div>
    )
}
