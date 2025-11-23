import { TarotCard as TarotCardType } from '@/types/tarot.types'

interface CelticCrossSpreadProps {
    cards: TarotCardType[]
    positions: Array<{ position: string; meaning: string }>
}

export function CelticCrossSpread({ cards, positions }: CelticCrossSpreadProps) {
    if (cards.length !== 10) return null

    return (
        <div className="space-y-6">
            {/* Spread Title */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">Celtic Cross Spread</h3>
                <p className="text-text-secondary text-sm">Comprehensive 10-card reading</p>
            </div>

            {/* Celtic Cross Layout */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Left Column - Staff (positions 7-10) */}
                    <div className="col-span-12 md:col-span-3 space-y-4">
                        {[6, 7, 8, 9].map((index) => (
                            <CardPosition
                                key={index}
                                card={cards[index]}
                                position={positions[index]}
                                number={index + 1}
                            />
                        ))}
                    </div>

                    {/* Center Cross */}
                    <div className="col-span-12 md:col-span-9">
                        <div className="relative">
                            {/* Cross Formation */}
                            <div className="grid grid-cols-3 grid-rows-3 gap-4 max-w-2xl mx-auto">
                                {/* Row 1 */}
                                <div></div>
                                <div><CardPosition card={cards[3]} position={positions[3]} number={4} /></div>
                                <div></div>

                                {/* Row 2 - The Cross */}
                                <div><CardPosition card={cards[2]} position={positions[2]} number={3} /></div>
                                <div className="relative">
                                    <CardPosition card={cards[0]} position={positions[0]} number={1} />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="rotate-90">
                                            <CardPosition card={cards[1]} position={positions[1]} number={2} compact />
                                        </div>
                                    </div>
                                </div>
                                <div><CardPosition card={cards[5]} position={positions[5]} number={6} /></div>

                                {/* Row 3 */}
                                <div></div>
                                <div><CardPosition card={cards[4]} position={positions[4]} number={5} /></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CardPositionProps {
    card: TarotCardType
    position: { position: string; meaning: string }
    number: number
    compact?: boolean
}

function CardPosition({ card, position, number, compact = false }: CardPositionProps) {
    const meaning = card.orientation === 'Reversed' ? card.reversedMeaning : card.uprightMeaning

    return (
        <div className={`bg-bg-secondary border-2 border-border-primary rounded-lg p-3 ${compact ? 'opacity-75' : ''}`}>
            {/* Position Number */}
            <div className="flex items-start justify-between mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-accent-purple text-white rounded-full text-xs font-bold">
                    {number}
                </span>
                {card.orientation === 'Reversed' && (
                    <span className="text-status-warning text-xs">Rev.</span>
                )}
            </div>

            {/* Card Name */}
            <h4 className="text-sm font-semibold text-text-primary mb-1">{card.name}</h4>

            {/* Position Name */}
            <p className="text-xs text-accent-purple font-medium mb-2">{position.position}</p>

            {/* Keywords */}
            {!compact && (
                <div className="flex flex-wrap gap-1 mb-2">
                    {meaning.keywords.slice(0, 2).map((keyword, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-accent-purple/10 text-accent-purple rounded-full"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            )}

            {/* Position Meaning */}
            <p className="text-xs text-text-tertiary leading-tight">{position.meaning}</p>
        </div>
    )
}
