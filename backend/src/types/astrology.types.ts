export interface BirthChart {
    id: string;
    userId: string;
    birthDate: string;
    birthTime: string;
    location: {
        latitude: number;
        longitude: number;
        timezone: string;
    };
    planets: {
        [key: string]: PlanetPosition;
    };
    houses: {
        [key: number]: HouseData;
    };
    ascendant: string;
}

export interface PlanetPosition {
    name: string;
    sign: string;
    degree: number;
    house: number;
    isRetrograde: boolean;
    nakshatra: string;
    pada: number;
}

export interface HouseData {
    number: number;
    sign: string;
    degree: number;
    planets: string[];
}

export interface Prediction {
    id: string;
    chartId: string;
    type: string;
    description: string;
    timing?: string;
    remedies?: any[];
    confidence: number;
}
