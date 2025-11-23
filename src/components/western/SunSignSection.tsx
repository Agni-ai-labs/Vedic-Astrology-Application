import { SunSignData } from '@/types/western.types'
import { ZodiacIcon } from './ZodiacIcon'

interface SunSignSectionProps {
    data: SunSignData
}

export function SunSignSection({ data }: SunSignSectionProps) {
    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
            {/* Header with Icon */}
            <div className="flex items-center gap-4 mb-6">
                <ZodiacIcon
                    sign={data.sign.name}
                    element={data.sign.element}
                    size={56}
                    className="flex-shrink-0"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-primary">
                        {data.sign.name.toUpperCase()} SUN SIGN
                    </h2>
                    <p className="text-text-tertiary text-sm mt-1">
                        {data.sign.dateRange.start} - {data.sign.dateRange.end}
                    </p>
                </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-bg-tertiary rounded p-3">
                    <p className="text-text-tertiary text-xs mb-1">Ruling Planet</p>
                    <p className="text-text-primary font-semibold">{data.sign.rulingPlanet}</p>
                </div>
                <div className="bg-bg-tertiary rounded p-3">
                    <p className="text-text-tertiary text-xs mb-1">Element & Quality</p>
                    <p className="text-text-primary font-semibold">
                        {data.sign.element} | {data.sign.modality}
                    </p>
                </div>
            </div>

            {/* Core Essence */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-blue rounded"></span>
                    Core Essence
                </h3>
                <p className="text-text-secondary leading-relaxed">
                    {data.coreEssence}
                </p>
            </div>

            {/* Key Traits */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-purple rounded"></span>
                    Key Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                    {data.sign.coreTraits.map((trait, idx) => (
                        <span
                            key={idx}
                            className="bg-bg-elevated text-text-secondary px-3 py-1.5 rounded-full text-sm border border-border-secondary hover:border-accent-blue transition-colors"
                        >
                            {trait}
                        </span>
                    ))}
                </div>
            </div>

            {/* Strengths & Challenges */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-status-success font-semibold mb-3 text-sm">
                        Strengths
                    </h3>
                    <ul className="space-y-2">
                        {data.sign.strengths.slice(0, 4).map((strength, idx) => (
                            <li key={idx} className="text-text-secondary flex items-start gap-2 text-sm">
                                <span className="text-status-success mt-0.5">+</span>
                                <span>{strength}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-status-warning font-semibold mb-3 text-sm">
                        Challenges
                    </h3>
                    <ul className="space-y-2">
                        {data.sign.challenges.slice(0, 4).map((challenge, idx) => (
                            <li key={idx} className="text-text-secondary flex items-start gap-2 text-sm">
                                <span className="text-status-warning mt-0.5">!</span>
                                <span>{challenge}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
