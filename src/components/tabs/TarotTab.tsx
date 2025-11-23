import { useState } from 'react'
import { TarotCard } from '../tarot/TarotCard'
import { ThreeCardSpread } from '../tarot/ThreeCardSpread'
import { CelticCrossSpread } from '../tarot/CelticCrossSpread'
import { DailyDraw } from '../tarot/DailyDraw'
import tarotDeckData from '@/data/tarotDeck.json'
import { TarotCard as TarotCardType, SpreadType } from '@/types/tarot.types'
import { createReading, getThreeCardPositions, getCelticCrossPositions } from '@/services/tarot/tarotReading'
import { Sparkles, Shuffle } from 'lucide-react'

type ViewMode = 'cards' | 'spread'

export function TarotTab() {
    const [viewMode, setViewMode] = useState<ViewMode>('cards')
    const [selectedSpread, setSelectedSpread] = useState<SpreadType>('ThreeCard')
    const [currentReading, setCurrentReading] = useState<ReturnType<typeof createReading> | null>(null)
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

    const handleNewReading = () => {
        const reading = createReading(tarotDeckData as TarotCardType[], selectedSpread)
        setCurrentReading(reading)
        setViewMode('spread')
    }

    const handleCardFlip = (cardId: string) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev)
            if (newSet.has(cardId)) {
                newSet.delete(cardId)
            } else {
                newSet.add(cardId)
            }
            return newSet
        })
    }

    return (
        <div className="space-y-6">
            {/* Tab Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-accent-purple" />
                    Tarot Reading
                </h1>
                <p className="text-text-secondary">
                    Explore mystical wisdom through the ancient art of tarot
                </p>
            </div>

            {/* Mode Selector */}
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => setViewMode('cards')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${viewMode === 'cards'
                        ? 'bg-accent-purple text-white'
                        : 'bg-bg-secondary text-text-tertiary border border-border-primary hover:bg-bg-tertiary'
                        }`}
                >
                    Browse Cards
                </button>
                <button
                    onClick={() => setViewMode('spread')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${viewMode === 'spread'
                        ? 'bg-accent-purple text-white'
                        : 'bg-bg-secondary text-text-tertiary border border-border-primary hover:bg-bg-tertiary'
                        }`}
                >
                    Get Reading
                </button>
            </div>

            {/* Cards View */}
            {viewMode === 'cards' && (
                <>
                    <DailyDraw deck={tarotDeckData as TarotCardType[]} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8">
                        {(tarotDeckData as TarotCardType[]).map((card) => (
                            <TarotCard
                                key={card.id}
                                card={card}
                                isFlipped={flippedCards.has(card.id)}
                                onFlip={() => handleCardFlip(card.id)}
                            />
                        ))}
                    </div>

                    <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                        <h3 className="text-text-primary font-semibold mb-3">How to Use</h3>
                        <ul className="space-y-2 text-text-secondary text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-accent-purple">1.</span>
                                <span>Click any card to flip it and reveal its meaning</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent-purple">2.</span>
                                <span>Hover over a flipped card to see detailed interpretation (glass-morphism overlay)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent-purple">3.</span>
                                <span>Use keyboard navigation (Tab + Enter/Space) for accessibility</span>
                            </li>
                        </ul>
                    </div>
                </>
            )}

            {/* Spread View */}
            {viewMode === 'spread' && (
                <>
                    {/* Spread Selection */}
                    {!currentReading && (
                        <div className="space-y-6">
                            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                                <h3 className="text-text-primary font-semibold mb-4">Choose Your Spread</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Three Card */}
                                    <button
                                        onClick={() => {
                                            setSelectedSpread('ThreeCard')
                                            handleNewReading()
                                        }}
                                        className="text-left p-6 bg-bg-tertiary border-2 border-border-primary rounded-lg hover:border-accent-purple transition-all group"
                                    >
                                        <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-purple">
                                            Three-Card Spread
                                        </h4>
                                        <p className="text-text-secondary text-sm mb-3">
                                            Perfect for quick insights into past, present, and future
                                        </p>
                                        <p className="text-accent-purple text-xs">3 cards • 5 minutes</p>
                                    </button>

                                    {/* Celtic Cross */}
                                    <button
                                        onClick={() => {
                                            setSelectedSpread('CelticCross')
                                            handleNewReading()
                                        }}
                                        className="text-left p-6 bg-bg-tertiary border-2 border-border-primary rounded-lg hover:border-accent-purple transition-all group"
                                    >
                                        <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-purple">
                                            Celtic Cross
                                        </h4>
                                        <p className="text-text-secondary text-sm mb-3">
                                            Comprehensive reading covering all aspects of your situation
                                        </p>
                                        <p className="text-accent-purple text-xs">10 cards • 15 minutes</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reading Display */}
                    {currentReading && (
                        <div className="space-y-8">
                            {/* New Reading Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleNewReading}
                                    className="px-6 py-3 bg-accent-purple text-white rounded-lg font-medium hover:bg-accent-purple/90 transition-all flex items-center gap-2"
                                >
                                    <Shuffle className="w-5 h-5" />
                                    Draw New Reading
                                </button>
                            </div>

                            {/* Spread Display */}
                            {currentReading.spreadType === 'ThreeCard' && (
                                <ThreeCardSpread
                                    cards={currentReading.cards}
                                    positions={getThreeCardPositions()}
                                />
                            )}

                            {currentReading.spreadType === 'CelticCross' && (
                                <CelticCrossSpread
                                    cards={currentReading.cards}
                                    positions={getCelticCrossPositions()}
                                />
                            )}

                            {/* Overall Interpretation */}
                            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-accent-purple" />
                                    Overall Interpretation
                                </h3>
                                <div className="flex items-center gap-2 mb-4 text-xs text-text-tertiary">
                                    <span className="bg-accent-purple/10 text-accent-purple px-2 py-1 rounded">
                                        {currentReading.timing}
                                    </span>
                                    <span>•</span>
                                    <span>{currentReading.createdAt.toLocaleDateString()} {currentReading.createdAt.toLocaleTimeString()}</span>
                                </div>
                                <p className="text-text-secondary leading-relaxed mb-4">
                                    {currentReading.overallInterpretation}
                                </p>

                                <h4 className="text-text-primary font-semibold mb-2 text-sm">Guidance</h4>
                                <ul className="space-y-2">
                                    {currentReading.guidance.map((guide, idx) => (
                                        <li key={idx} className="text-text-secondary text-sm flex items-start gap-2">
                                            <span className="text-accent-purple mt-1">•</span>
                                            <span>{guide}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
