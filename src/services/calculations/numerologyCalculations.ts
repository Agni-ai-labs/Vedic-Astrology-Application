import { NumerologyReport, NumerologyNumber, NumberMeaning } from '@/types/numerology.types';

// Pythagorean Numerology System

const LETTER_VALUES: Record<string, number> = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
};

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y']; // Y is conditional, simplified here

const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
    1: {
        keywords: ['Leadership', 'Independence', 'Innovation'],
        positiveTraits: ['Ambitious', 'Pioneering', 'Strong-willed'],
        negativeTraits: ['Aggressive', 'Domineering', 'Selfish'],
        careers: ['Entrepreneur', 'Manager', 'Inventor'],
        compatibility: [1, 3, 5, 7, 9]
    },
    2: {
        keywords: ['Cooperation', 'Diplomacy', 'Sensitivity'],
        positiveTraits: ['Gentle', 'Intuitive', 'Supportive'],
        negativeTraits: ['Oversensitive', 'Dependent', 'Passive'],
        careers: ['Counselor', 'Diplomat', 'Artist'],
        compatibility: [2, 4, 6, 8]
    },
    3: {
        keywords: ['Expression', 'Creativity', 'Joy'],
        positiveTraits: ['Optimistic', 'Artistic', 'Charismatic'],
        negativeTraits: ['Scattered', 'Superficial', 'Moody'],
        careers: ['Writer', 'Performer', 'Teacher'],
        compatibility: [1, 3, 5, 6, 9]
    },
    4: {
        keywords: ['Stability', 'Order', 'Work'],
        positiveTraits: ['Practical', 'Disciplined', 'Reliable'],
        negativeTraits: ['Rigid', 'Stubborn', 'Boring'],
        careers: ['Engineer', 'Accountant', 'Builder'],
        compatibility: [2, 4, 6, 8]
    },
    5: {
        keywords: ['Freedom', 'Change', 'Adventure'],
        positiveTraits: ['Versatile', 'Adaptable', 'Curious'],
        negativeTraits: ['Restless', 'Irresponsible', 'Impulsive'],
        careers: ['Sales', 'Travel Agent', 'Journalist'],
        compatibility: [1, 3, 5, 7, 9]
    },
    6: {
        keywords: ['Responsibility', 'Care', 'Harmony'],
        positiveTraits: ['Nurturing', 'Protective', 'Balanced'],
        negativeTraits: ['Meddling', 'Martyr-like', 'Critical'],
        careers: ['Healer', 'Teacher', 'Decorator'],
        compatibility: [2, 3, 4, 6, 8, 9]
    },
    7: {
        keywords: ['Analysis', 'Wisdom', 'Spirituality'],
        positiveTraits: ['Analytical', 'Introspective', 'Deep'],
        negativeTraits: ['Aloof', 'Cynical', 'Secretive'],
        careers: ['Researcher', 'Scientist', 'Philosopher'],
        compatibility: [1, 5, 7, 9]
    },
    8: {
        keywords: ['Power', 'Ambition', 'Success'],
        positiveTraits: ['Authoritative', 'Efficient', 'Goal-oriented'],
        negativeTraits: ['Materialistic', 'Power-hungry', 'Workaholic'],
        careers: ['Executive', 'Banker', 'Politician'],
        compatibility: [2, 4, 6, 8]
    },
    9: {
        keywords: ['Compassion', 'Humanitarianism', 'Completion'],
        positiveTraits: ['Generous', 'Idealistic', 'Selfless'],
        negativeTraits: ['Resentful', 'Over-emotional', 'Unrealistic'],
        careers: ['Philanthropist', 'Artist', 'Doctor'],
        compatibility: [1, 3, 5, 6, 7, 9]
    },
    11: {
        keywords: ['Illumination', 'Inspiration', 'Idealism'],
        positiveTraits: ['Visionary', 'Intuitive', 'Spiritual'],
        negativeTraits: ['Nervous', 'Impractical', 'Fanatical'],
        careers: ['Spiritual Leader', 'Inventor', 'Media'],
        compatibility: [2, 4, 6, 8]
    },
    22: {
        keywords: ['Master Builder', 'Realization', 'Power'],
        positiveTraits: ['Practical Genius', 'Organized', 'Ambitious'],
        negativeTraits: ['Overwhelmed', 'Manipulative', 'Destructive'],
        careers: ['Architect', 'Diplomat', 'Global Leader'],
        compatibility: [2, 4, 6, 8]
    }
};

function reduceNumber(num: number, isMasterNumberPossible: boolean = true): number {
    if (num === 0) return 0;
    if (isMasterNumberPossible && (num === 11 || num === 22 || num === 33)) return num;

    let sum = num;
    while (sum > 9 && !(isMasterNumberPossible && (sum === 11 || sum === 22 || sum === 33))) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
}

function calculateNameNumber(name: string, filter: 'all' | 'vowels' | 'consonants'): number {
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;

    for (const char of cleanName) {
        const isVowel = VOWELS.includes(char);
        if (filter === 'all' || (filter === 'vowels' && isVowel) || (filter === 'consonants' && !isVowel)) {
            sum += LETTER_VALUES[char] || 0;
        }
    }

    return reduceNumber(sum);
}

function getNumberDetails(value: number, name: string): NumerologyNumber {
    const meaning = NUMBER_MEANINGS[value] || NUMBER_MEANINGS[reduceNumber(value, false)];
    return {
        value,
        name,
        description: meaning?.keywords.join(', ') || '',
        meaning: `People with ${name} ${value} are often ${meaning?.positiveTraits.join(', ')}.`,
        planet: getPlanetForNumber(value)
    };
}

function getPlanetForNumber(num: number): string {
    const planets = ['Sun', 'Moon', 'Jupiter', 'Rahu', 'Mercury', 'Venus', 'Ketu', 'Saturn', 'Mars'];
    const reduced = reduceNumber(num, false);
    return planets[reduced - 1] || '';
}

export function calculateNumerology(name: string, birthDate: Date): NumerologyReport {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    // Life Path: Sum of full birth date
    const lifePathSum = reduceNumber(day) + reduceNumber(month) + reduceNumber(year);
    const lifePath = reduceNumber(lifePathSum);

    // Destiny (Expression): Sum of full name
    const destiny = calculateNameNumber(name, 'all');

    // Soul Urge (Heart's Desire): Sum of vowels
    const soulUrge = calculateNameNumber(name, 'vowels');

    // Personality: Sum of consonants
    const personality = calculateNameNumber(name, 'consonants');

    // Birth Day Number
    const birthDayNum = reduceNumber(day);

    // Personal Year
    const currentYear = new Date().getFullYear();
    const personalYear = reduceNumber(reduceNumber(day) + reduceNumber(month) + reduceNumber(currentYear));

    return {
        lifePath: getNumberDetails(lifePath, 'Life Path Number'),
        destiny: getNumberDetails(destiny, 'Destiny Number'),
        soulUrge: getNumberDetails(soulUrge, 'Soul Urge Number'),
        personality: getNumberDetails(personality, 'Personality Number'),
        birthDay: getNumberDetails(birthDayNum, 'Birth Day Number'),
        currentYear,
        personalYear
    };
}
