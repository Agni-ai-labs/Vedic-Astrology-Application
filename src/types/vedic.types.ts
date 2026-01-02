export interface PlanetPosition {
    planet: string;
    sign: string;
    degree: number;
    house: number;
    isRetrograde: boolean;
}

export interface House {
    number: number;
    sign: string;
    degree: number;
    lord: string;
}

export interface D1Chart {
    ascendant: string;
    ascendantDegree: number;
    planets: PlanetPosition[];
    houses: House[];
}

export interface D9Chart {
    ascendant: string;
    planets: PlanetPosition[];
}

export interface DashaPeriod {
    planet: string;
    startDate: Date;
    endDate: Date;
    level: 'Mahadasha' | 'Antardasha' | 'Pratyantardasha';
}

export interface Yoga {
    name: string;
    type: 'Raj' | 'Dhana' | 'Spiritual' | 'Negative' | 'Arista' | 'General';
    planets: string[];
    description: string;
    effects: string;
    strength: 'Strong' | 'Moderate' | 'Weak';
}

export interface Dosha {
    name: 'Manglik' | 'Kaal Sarp' | 'Pitra' | 'Shani' | 'Rahu-Ketu' | 'Sade Sati';
    present: boolean;
    severity: 'High' | 'Medium' | 'Low' | 'None';
    details: string;
    remedies: string[];
}

export interface VedicChart {
    birthDetails: {
        date: Date;
        time: string;
        latitude: number;
        longitude: number;
    };
    d1: D1Chart;
    d9: D9Chart;
    currentDasha: DashaPeriod[];
    yogas: Yoga[];
    doshas: Dosha[];
}
