import { MonthlyHoroscope } from '@/types/western.types'
import { Calendar, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react'

interface MonthlyHoroscopeSectionProps {
    data: MonthlyHoroscope
}

export function MonthlyHoroscopeSection({ data }: MonthlyHoroscopeSectionProps) {
    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-7 h-7 text-accent-purple" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-primary">
                        MONTHLY HOROSCOPE - {data.month.toUpperCase()} {data.year}
                    </h2>
                    <p className="text-text-tertiary text-sm mt-1">
                        Sun Sign: {data.sign}
                    </p>
                </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-purple rounded"></span>
                    Overview
                </h3>
                <p className="text-text-secondary leading-relaxed">
                    {data.overview}
                </p>
            </div>

            {/* Key Dates */}
            {data.keyDates.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-accent-blue rounded"></span>
                        Key Dates
                    </h3>
                    <div className="space-y-3">
                        {data.keyDates.map((dateInfo, idx) => (
                            <div key={idx} className="bg-bg-tertiary rounded-lg p-4 border border-border-secondary">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <p className="text-accent-blue font-semibold">{dateInfo.date}</p>
                                    <span className="text-text-tertiary text-xs">{dateInfo.event}</span>
                                </div>
                                <p className="text-text-secondary text-sm">{dateInfo.significance}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Opportunities & Challenges Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Opportunities */}
                <div>
                    <h3 className="text-status-success font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Opportunities
                    </h3>
                    <ul className="space-y-2">
                        {data.opportunities.map((opp, idx) => (
                            <li key={idx} className="text-text-secondary flex items-start gap-3 text-sm">
                                <span className="text-status-success mt-0.5">+</span>
                                <span>{opp}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Challenges */}
                <div>
                    <h3 className="text-status-warning font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Challenges
                    </h3>
                    <ul className="space-y-2">
                        {data.challenges.map((challenge, idx) => (
                            <li key={idx} className="text-text-secondary flex items-start gap-3 text-sm">
                                <span className="text-status-warning mt-0.5">!</span>
                                <span>{challenge}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Life Areas Ratings */}
            <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-4">Life Areas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(data.areas).map(([area, info]) => (
                        <div key={area} className="bg-bg-elevated rounded-lg p-4 border border-border-secondary">
                            <p className="text-text-tertiary text-xs mb-2 uppercase">{area}</p>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex-1 bg-bg-tertiary rounded-full h-2">
                                    <div
                                        className="bg-accent-blue h-2 rounded-full transition-all"
                                        style={{ width: `${info.rating * 10}%` }}
                                    ></div>
                                </div>
                                <span className="text-text-primary font-bold text-sm">{info.rating}/10</span>
                            </div>
                            <p className="text-text-secondary text-xs leading-relaxed">{info.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Advice */}
            <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-4">
                <h3 className="text-text-primary font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent-purple" />
                    Guidance & Advice
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                    {data.advice}
                </p>
            </div>

            {/* Lucky Elements */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
                <div>
                    <p className="text-text-tertiary text-xs mb-2">LUCKY DAYS</p>
                    <div className="flex gap-2">
                        {data.luckyDays.map((day, idx) => (
                            <span key={idx} className="inline-flex items-center justify-center w-8 h-8 bg-status-success/20 text-status-success rounded-full text-sm font-semibold">
                                {day}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-text-tertiary text-xs mb-2">LUCKY COLORS</p>
                    <div className="flex gap-2">
                        {data.colors.map((color, idx) => (
                            <span key={idx} className="px-3 py-1 bg-bg-elevated border border-border-secondary rounded-full text-text-secondary text-sm">
                                {color}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
