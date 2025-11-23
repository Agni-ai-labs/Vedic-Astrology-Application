export interface PanchangData {
    date: Date;
    location: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    tithi: {
        name: string;
        endTime: string;
    };
    nakshatra: {
        name: string;
        endTime: string;
    };
    yoga: {
        name: string;
        endTime: string;
    };
    karana: {
        name: string;
        endTime: string;
    };
    paksha: 'Shukla' | 'Krishna';
    ritu: string; // Season
    shakaSamvat: number;
    vikramSamvat: number;
}

export interface MuhuratTiming {
    name: string;
    startTime: string;
    endTime: string;
    isAuspicious: boolean;
    description: string;
}

export interface Choghadiya {
    name: string;
    startTime: string;
    endTime: string;
    isGood: boolean; // Good, Neutral, Bad
    ruler: string;
}

export interface Festival {
    id: string;
    name: string;
    date: string; // ISO date string
    description: string;
    significance: string;
}
