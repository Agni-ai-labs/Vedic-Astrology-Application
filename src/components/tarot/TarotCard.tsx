import { useState } from 'react'
import { TarotCard as TarotCardType } from '@/types/tarot.types'
import { RotateCw, Flame, Droplets, Sword, Coins, Sparkles } from 'lucide-react'

interface TarotCardProps {
    card: TarotCardType
    isReversed?: boolean
    isFlipped?: boolean
    onFlip?: () => void
}

// Helper to get suit icon component
function getSuitIcon(suit: string | null | undefined) {
    switch (suit) {
        case 'Wands': return Flame
        case 'Cups': return Droplets
        case 'Swords': return Sword
        case 'Pentacles': return Coins
        default: return Sparkles
    }
}

// Helper to get suit gradient color
function getSuitGradient(suit: string | null | undefined) {
    switch (suit) {
        case 'Wands': return 'from-orange-500 to-red-500'
        case 'Cups': return 'from-blue-500 to-cyan-500'
        case 'Swords': return 'from-gray-400 to-slate-600'
        case 'Pentacles': return 'from-yellow-500 to-amber-600'
        default: return 'from-purple-500 to-indigo-600'
    }
}

export function TarotCard({ card, isReversed = false, isFlipped = false, onFlip }: TarotCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const meaning = isReversed ? card.reversedMeaning : card.uprightMeaning
    const SuitIcon = getSuitIcon(card.suit)
    const suitGradient = getSuitGradient(card.suit)

    return (
        <div
            className="relative group cursor-pointer perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onFlip?.()
                }
            }}
            aria-label={`${card.name} tarot card${isReversed ? ' reversed' : ''}`}
        >
            {/* Card Container with 3D flip */}
            <div className={`relative w-48 h-72 min-w-[192px] min-h-[288px] transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Card Back */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl border-2 border-accent-purple/50 flex items-center justify-center shadow-lg">
                        <Sparkles className="text-white/20" size={64} />
                    </div>
                </div>

                {/* Card Front */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isReversed ? 'rotate-180' : ''}`}>
                    <div className="w-full h-full bg-bg-secondary border-2 border-border-primary rounded-xl overflow-hidden flex flex-col shadow-lg">
                        {/* Card Header */}
                        <div className="bg-bg-tertiary border-b border-border-primary p-2 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-text-primary font-semibold text-sm truncate">{card.name}</h3>
                                {isReversed && (
                                    <RotateCw className="w-4 h-4 text-status-warning flex-shrink-0" aria-label="Reversed" />
                                )}
                            </div>
                            <p className="text-text-tertiary text-xs mt-0.5 truncate">
                                {card.arcana} {card.suit && `• ${card.suit}`}
                            </p>
                        </div>

                        {/* Beautiful SVG Card Art */}
                        <div className={`h-32 bg-gradient-to-br ${suitGradient} flex items-center justify-center border-b border-border-secondary flex-shrink-0 relative overflow-hidden`}>
                            {/* Decorative corners */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-2 left-2"><SuitIcon size={12} className="text-white" /></div>
                                <div className="absolute top-2 right-2"><SuitIcon size={12} className="text-white" /></div>
                                <div className="absolute bottom-2 left-2"><SuitIcon size={12} className="text-white" /></div>
                                <div className="absolute bottom-2 right-2"><SuitIcon size={12} className="text-white" /></div>
                            </div>

                            {/* Main icon and number */}
                            <div className="relative z-10 flex flex-col items-center gap-2">
                                <SuitIcon size={40} className="text-white drop-shadow-2xl" />
                                {card.number !== null && (
                                    <div className="text-white text-2xl font-bold drop-shadow-2xl">
                                        {card.number === 1 ? 'A' :
                                            card.number === 11 ? 'J' :
                                                card.number === 12 ? 'Q' :
                                                    card.number === 13 ? 'K' :
                                                        card.number}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Scrollable content with custom scrollbar */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                            {/* Keywords */}
                            <div className="flex flex-wrap gap-1 mb-2">
                                {meaning.keywords.slice(0, 3).map((keyword, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-1.5 py-0.5 bg-accent-purple/10 text-accent-purple rounded border border-accent-purple/30"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>

                            {/* Meaning (visible on hover) */}
                            {isHovered && (
                                <div className="backdrop-blur-sm bg-bg-elevated/95 border border-accent-purple/30 rounded-lg p-2 animate-fade-in">
                                    <p className="text-text-secondary text-xs leading-relaxed">
                                        {meaning.description}
                                    </p>
                                </div>
                            )}

                            {/* Element & Zodiac */}
                            {!isHovered && (
                                <div className="flex items-center justify-between mt-2 text-xs text-text-tertiary">
                                    {card.element && <span>Element: {card.element}</span>}
                                    {card.zodiacSign && <span>{card.zodiacSign}</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover hint */}
            {!isFlipped && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-text-tertiary text-xs whitespace-nowrap">
                        Click to reveal
                    </p>
                </div>
            )}
        </div>
    )
}
