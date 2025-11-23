import { createContext, useContext, useState, ReactNode } from 'react';
import { BirthChart, BirthDetails } from '@/services/calculations/chartCalculations';
import { TarotCard } from '@/types/tarot.types';

interface AstrologyContextType {
    // Birth details
    birthDetails: BirthDetails | null;
    setBirthDetails: (details: BirthDetails | null) => void;

    // Western astrology
    birthChart: BirthChart | null;
    setBirthChart: (chart: BirthChart | null) => void;

    // Tarot
    dailyTarotCard: { card: TarotCard; date: string } | null;
    setDailyTarotCard: (cardData: { card: TarotCard; date: string } | null) => void;

    // Clear all data
    clearAllData: () => void;
}

const AstrologyContext = createContext<AstrologyContextType | undefined>(undefined);

interface AstrologyProviderProps {
    children: ReactNode;
}

export function AstrologyProvider({ children }: AstrologyProviderProps) {
    const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
    const [birthChart, setBirthChart] = useState<BirthChart | null>(null);
    const [dailyTarotCard, setDailyTarotCard] = useState<{ card: TarotCard; date: string } | null>(null);

    const clearAllData = () => {
        setBirthDetails(null);
        setBirthChart(null);
        setDailyTarotCard(null);
    };

    return (
        <AstrologyContext.Provider
            value={{
                birthDetails,
                setBirthDetails,
                birthChart,
                setBirthChart,
                dailyTarotCard,
                setDailyTarotCard,
                clearAllData,
            }}
        >
            {children}
        </AstrologyContext.Provider>
    );
}

export function useAstrology() {
    const context = useContext(AstrologyContext);
    if (context === undefined) {
        throw new Error('useAstrology must be used within an AstrologyProvider');
    }
    return context;
}
