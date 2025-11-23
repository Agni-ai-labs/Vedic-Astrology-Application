import { TarotCard as TarotCardType } from '@/types/tarot.types'

interface ThreeCardSpreadProps {
    cards: TarotCardType[]
    positions: Array<{ position: string; meaning: string }>
}

export function ThreeCardSpread({ cards, positions }: ThreeCardSpreadProps) {
    if (cards.length !== 3) return null

    return (
        <div className="space-y-6">
            {/* Spread Title */}
            <div className="text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-2">Three-Card Spread</h3>
                <p className="text-text-secondary text-sm">Past • Present • Future</p>
            </div>

            {/* Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {cards.map((card, index) => (
                    <div key={card.id} className="space-y-4">
                        {/* Position Label */}
                        <div className="text-center">
                            <div className="inline-block px-4 py-2 bg-accent-purple/10 border border-accent-purple/30 rounded-lg">
                                <p className="text-accent-purple font-semibold">{positions[index].position}</p>
                            </div>
                        </div>

                        {/* Card Display */}
                        <div className="bg-bg-secondary border-2 border-border-primary rounded-xl p-4 min-h-[300px]">
                            <div className="text-center mb-3">
                                <h4 className="text-lg font-semibold text-text-primary">{card.name}</h4>
                                <p className="text-text-tertiary text-xs mt-1">
                                    {card.arcana} Arcana {card.suit && `• ${card.suit}`}
                                </p>
                                {card.orientation === 'Reversed' && (
                                    <p className="text-status-warning text-xs mt-1">Reversed</p>
                                )}
                            </div>

                            {/* Keywords */}
                            <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                                {(card.orientation === 'Reversed' ? card.reversedMeaning : card.uprightMeaning)
                                    .keywords.slice(0, 3)
                                    .map((keyword, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs px-2 py-1 bg-accent-purple/10 text-accent-purple rounded-full border border-accent-purple/20"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                            </div>

                            {/* Meaning */}
                            <p className="text-text-secondary text-sm leading-relaxed">
                                {card.orientation === 'Reversed'
                                    ? card.reversedMeaning.description
                                    : card.uprightMeaning.description}
                            </p>
                        </div>

                        {/* Position Meaning */}
                        <div className="bg-bg-tertiary border border-border-secondary rounded-lg p-3">
                            <p className="text-text-tertiary text-xs leading-relaxed">
                                {positions[index].meaning}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
