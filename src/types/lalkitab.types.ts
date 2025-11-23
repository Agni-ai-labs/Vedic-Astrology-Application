export interface LalKitabPlanet {
    planet: string;
    house: number;
    sign: string;
    status: 'Benefic' | 'Malefic';
    isSleeping: boolean; // Planet sleeping in a house
}

export interface LalKitabHouse {
    number: number;
    planets: LalKitabPlanet[];
    isSleeping: boolean; // House with no planets or aspect
}

export interface KarmicDebt {
    type: 'Pitra' | 'Matru' | 'Stri' | 'Guru' | 'Nadi' | 'Rinanubandha';
    present: boolean;
    cause: string;
    indication: string;
    remedy: string;
}

export interface LalKitabRemedy {
    planet: string;
    issue: string;
    remedy: string;
    type: 'General' | 'Specific' | 'Precaution';
    duration: string; // e.g., "43 days"
}

export interface VarshphalChart {
    year: number;
    planets: LalKitabPlanet[];
    predictions: string[];
}

export interface LalKitabChart {
    planets: LalKitabPlanet[];
    houses: LalKitabHouse[];
    debts: KarmicDebt[];
    remedies: LalKitabRemedy[];
    varshphal: VarshphalChart;
}
