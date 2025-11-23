import { useState, useEffect } from 'react'
import { TarotCard as TarotCardType } from '@/types/tarot.types'
import { TarotCard } from './TarotCard'
import { Sparkles, RefreshCw } from 'lucide-react'
import { drawCards } from '@/services/tarot/tarotReading'
import { useAstrology } from '@/context/AstrologyContext'

interface DailyDrawProps {
    deck: TarotCardType[]
}

export function DailyDraw({ deck }: DailyDrawProps) {
    const { dailyTarotCard, setDailyTarotCard } = useAstrology();
    const [isRevealed, setIsRevealed] = useState(false)

    // Check if we have a card drawn today
    useEffect(() => {
        const today = new Date().toDateString();

        if (dailyTarotCard && dailyTarotCard.date === today) {
            setIsRevealed(true);
        } else if (dailyTarotCard && dailyTarotCard.date !== today) {
            // Clear yesterday's card
            setDailyTarotCard(null);
            setIsRevealed(false);
        }
    }, [dailyTarotCard, setDailyTarotCard])

    const handleDraw = () => {
        const [card] = drawCards(deck, 1)
        const today = new Date().toDateString();

        setDailyTarotCard({ card, date: today });
        setIsRevealed(false);
    }

    const handleReveal = () => {
        setIsRevealed(true)
    }

    const drawnCard = dailyTarotCard?.card || null;

    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-8 text-center mb-8">
            <div className="flex flex-col items-center justify-center space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6 text-accent-purple" />
                        Card of the Day
                    </h3>
                    <p className="text-text-secondary">
                        Discover the energy guiding you today
                    </p>
                </div>

                {!drawnCard ? (
                    <button
                        onClick={handleDraw}
                        className="group relative w-48 h-72 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl border-2 border-accent-purple/50 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-accent-purple/20"
                    >
                        <div className="text-white/20 group-hover:scale-110 transition-transform">
                            <Sparkles size={64} strokeWidth={1} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-bg-elevated/90 px-4 py-2 rounded-full text-text-primary font-medium text-sm backdrop-blur-sm">
                                Draw Card
                            </span>
                        </div>
                    </button>
                ) : (
                    <div className="animate-fade-in">
                        <TarotCard
                            card={drawnCard}
                            isFlipped={isRevealed}
                            onFlip={handleReveal}
                        />
                    </div>
                )}

                {drawnCard && isRevealed && (
                    <div className="max-w-md mx-auto mt-6 animate-slide-up">
                        <h4 className="text-xl font-semibold text-accent-purple mb-2">
                            {drawnCard.name}
                        </h4>
                        <p className="text-text-secondary leading-relaxed">
                            {drawnCard.uprightMeaning.description}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {drawnCard.uprightMeaning.keywords.map((keyword, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={handleDraw}
                            className="mt-6 text-xs text-text-tertiary hover:text-accent-purple flex items-center justify-center gap-1 mx-auto transition-colors"
                        >
                            <RefreshCw className="w-3 h-3" />
                            Draw Again Tomorrow
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
