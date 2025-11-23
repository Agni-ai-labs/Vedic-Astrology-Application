/**
 * Tarot Card Type Definitions
 * For interactive tarot reading with hover animations
 */

export type TarotArcana = 'Major' | 'Minor';
export type TarotSuit = 'Cups' | 'Wands' | 'Swords' | 'Pentacles';
export type TarotOrientation = 'Upright' | 'Reversed';
export type SpreadType = 'ThreeCard' | 'CelticCross' | 'SingleCard';

export interface TarotCardMeaning {
    general: string;
    love: string;
    career: string;
    finance: string;
    health: string;
    keywords: string[];
    description: string; // Shortened description for display
}

export interface TarotCard {
    id: string;
    name: string;
    arcana: TarotArcana;
    suit?: TarotSuit | null;
    number: number | null;
    imageUrl: string;
    orientation?: TarotOrientation;
    meanings?: {
        upright: TarotCardMeaning;
        reversed: TarotCardMeaning;
    };
    // Simplified properties for component
    uprightMeaning: {
        keywords: string[];
        description: string;
    };
    reversedMeaning: {
        keywords: string[];
        description: string;
    };
    numerology?: number; // Numerological value
    zodiacSign?: string; // Zodiac/planet link
    astrologicalCorrespondence?: string;
    element?: 'Fire' | 'Water' | 'Air' | 'Earth';
}

export interface TarotCardAnimation {
    isHovered: boolean;
    isAnimating: boolean;
    showMeaning: boolean;
    scale: number;
    zIndex: number;
    opacity: number;
}

export interface TarotSpreadPosition {
    position: string;
    card: TarotCard;
    interpretation: string;
}

export interface TarotReading {
    spreadType: SpreadType;
    cards: TarotCard[];
    positions: TarotSpreadPosition[];
    overallInterpretation: string;
    guidance: string[];
    timing: string; // Based on Lala Ramswaroop Panchang
    createdAt: Date;
}
