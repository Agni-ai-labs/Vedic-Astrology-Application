import { TarotCard as TarotCardType, TarotReading, SpreadType } from '@/types/tarot.types'

/**
 * Get random cards from deck for a reading
 * Fisher-Yates shuffle algorithm
 */
export function shuffleDeck(deck: TarotCardType[]): TarotCardType[] {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

/**
 * Draw cards for a specific spread
 */
export function drawCards(deck: TarotCardType[], count: number): TarotCardType[] {
    const shuffled = shuffleDeck(deck)
    return shuffled.slice(0, count).map(card => ({
        ...card,
        // Randomly assign orientation
        orientation: Math.random() > 0.5 ? 'Upright' : 'Reversed'
    }))
}

/**
 * Get position meanings for Three-Card spread
 */
export function getThreeCardPositions(): { position: string; meaning: string }[] {
    return [
        { position: 'Past', meaning: 'Influences from your past that shape the present situation' },
        { position: 'Present', meaning: 'Current energies and circumstances you are experiencing now' },
        { position: 'Future', meaning: 'Potential outcomes and what lies ahead on your current path' },
    ]
}

/**
 * Get position meanings for Celtic Cross spread
 */
export function getCelticCrossPositions(): { position: string; meaning: string }[] {
    return [
        { position: '1. Present', meaning: 'The current situation or challenge you are facing' },
        { position: '2. Challenge', meaning: 'Obstacles, opposing forces, or what crosses you' },
        { position: '3. Foundation', meaning: 'Root cause, distant past, or subconscious influences' },
        { position: '4. Recent Past', meaning: 'Events or influences that are just passing' },
        { position: '5. Crown', meaning: 'Best possible outcome, goals, or conscious desires' },
        { position: '6. Near Future', meaning: 'What will manifest in the immediate future' },
        { position: '7. Self', meaning: 'Your attitude, beliefs, or how you see yourself' },
        { position: '8. Environment', meaning: 'External influences, other people\'s perceptions' },
        { position: '9. Hopes/Fears', meaning: 'Inner emotions, secret hopes, or hidden fears' },
        { position: '10. Outcome', meaning: 'Final result based on current trajectory' },
    ]
}

/**
 * Generate overall interpretation for a reading
 */
export function generateOverallInterpretation(
    _cards: TarotCardType[],
    spreadType: SpreadType
): string {
    if (spreadType === 'ThreeCard') {
        return `This three-card reading reveals a journey from past influences through present circumstances toward future potential. The cards suggest a narrative of transformation and growth, with each position offering guidance for your path forward.`
    } else if (spreadType === 'CelticCross') {
        return `The Celtic Cross spread provides a comprehensive view of your situation. The cards reveal deep insights into your past, present challenges, and future possibilities. Pay special attention to the relationship between the Present (1) and Challenge (2) cards, as they form the cross at the heart of this reading.`
    }
    return 'The cards have spoken. Reflect on their wisdom and how it applies to your current journey.'
}

/**
 * Generate guidance based on cards drawn
 */
export function generateGuidance(cards: TarotCardType[]): string[] {
    const guidance: string[] = []

    // Check for major arcana dominance
    const majorCount = cards.filter(c => c.arcana === 'Major').length
    if (majorCount >= cards.length / 2) {
        guidance.push('Multiple Major Arcana cards suggest significant life themes and karmic lessons at play.')
    }

    // Check for suit dominance (if cards have suits)
    const suits = cards.filter(c => c.suit).map(c => c.suit)
    const suitCounts = suits.reduce((acc, suit) => {
        if (suit) acc[suit] = (acc[suit] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const dominantSuit = Object.entries(suitCounts)
        .sort(([, a], [, b]) => b - a)[0]

    if (dominantSuit && dominantSuit[1] >= 2) {
        const suitMeanings: Record<string, string> = {
            'Cups': 'Strong emphasis on emotions, relationships, and the heart.',
            'Wands': 'Focus on passion, creativity, and taking inspired action.',
            'Swords': 'Mental clarity, communication, and decision-making are highlighted.',
            'Pentacles': 'Material concerns, practical matters, and earthly stability are key.',
        }
        guidance.push(suitMeanings[dominantSuit[0]] || '')
    }

    // General advice
    guidance.push('Trust your intuition as you interpret these cards in the context of your question.')
    guidance.push('Remember that tarot reveals possibilities, not fixed destinies. You always have free will.')

    return guidance.filter(Boolean)
}

/**
 * Get timing based on current time (Mock Panchang)
 */
export function getTiming(): string {
    const hour = new Date().getHours()
    if (hour >= 4 && hour < 6) return 'Brahma Muhurta - Best for spiritual insight'
    if (hour >= 6 && hour < 12) return 'Morning (Kapha) - Stable energy'
    if (hour >= 12 && hour < 18) return 'Afternoon (Pitta) - Active transformation'
    if (hour >= 18 && hour < 22) return 'Evening (Vata) - Creative & changeable'
    return 'Night - Deep subconscious connection'
}

/**
 * Create a complete tarot reading
 */
export function createReading(
    deck: TarotCardType[],
    spreadType: SpreadType
): TarotReading {
    const cardCount = spreadType === 'ThreeCard' ? 3 : spreadType === 'CelticCross' ? 10 : 1
    const cards = drawCards(deck, cardCount)

    const positionMeanings = spreadType === 'ThreeCard'
        ? getThreeCardPositions()
        : getCelticCrossPositions()

    const positions = cards.map((card, index) => ({
        position: positionMeanings[index]?.position || `Position ${index + 1}`,
        card,
        interpretation: positionMeanings[index]?.meaning || '',
    }))

    return {
        spreadType,
        cards,
        positions,
        overallInterpretation: generateOverallInterpretation(cards, spreadType),
        guidance: generateGuidance(cards),
        timing: getTiming(),
        createdAt: new Date()
    }
}
