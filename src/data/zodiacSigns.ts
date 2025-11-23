import { ZodiacSign } from '@/types/western.types';

export const ZODIAC_SIGNS_DATA: Record<string, ZodiacSign> = {
    'Aries': {
        name: 'Aries',
        symbol: '♈',
        dateRange: { start: 'March 21', end: 'April 19' },
        element: 'Fire',
        modality: 'Cardinal',
        rulingPlanet: 'Mars',
        coreTraits: ['Bold', 'Pioneering', 'Energetic', 'Independent'],
        strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic'],
        challenges: ['Impatient', 'Impulsive', 'Short-tempered'],
        keywords: ['Action', 'Initiative', 'Leadership'],
        colors: ['Red', 'Scarlet'],
        luckyNumbers: [1, 8, 17],
        compatibleSigns: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius']
    },
    'Taurus': {
        name: 'Taurus',
        symbol: '♉',
        dateRange: { start: 'April 20', end: 'May 20' },
        element: 'Earth',
        modality: 'Fixed',
        rulingPlanet: 'Venus',
        coreTraits: ['Stable', 'Reliable', 'Practical', 'Devoted'],
        strengths: ['Patient', 'Dependable', 'Responsible', 'Devoted'],
        challenges: ['Stubborn', 'Possessive', 'Uncompromising'],
        keywords: ['Stability', 'Security', 'Sensuality'],
        colors: ['Green', 'Pink'],
        luckyNumbers: [2, 6, 9, 12, 24],
        compatibleSigns: ['Cancer', 'Virgo', 'Capricorn', 'Pisces']
    },
    'Gemini': {
        name: 'Gemini',
        symbol: '♊',
        dateRange: { start: 'May 21', end: 'June 20' },
        element: 'Air',
        modality: 'Mutable',
        rulingPlanet: 'Mercury',
        coreTraits: ['Curious', 'Adaptable', 'Communicative', 'Witty'],
        strengths: ['Versatile', 'Quick-witted', 'Social', 'Eloquent'],
        challenges: ['Inconsistent', 'Indecisive', 'Nervous'],
        keywords: ['Communication', 'Versatility', 'Intellect'],
        colors: ['Yellow', 'Light Green'],
        luckyNumbers: [5, 7, 14, 23],
        compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius']
    },
    'Cancer': {
        name: 'Cancer',
        symbol: '♋',
        dateRange: { start: 'June 21', end: 'July 22' },
        element: 'Water',
        modality: 'Cardinal',
        rulingPlanet: 'Moon',
        coreTraits: ['Nurturing', 'Protective', 'Intuitive', 'Emotional'],
        strengths: ['Loyal', 'Empathetic', 'Tenacious', 'Caring'],
        challenges: ['Moody', 'Overly Sensitive', 'Clingy'],
        keywords: ['Emotion', 'Home', 'Family'],
        colors: ['Silver', 'White'],
        luckyNumbers: [2, 3, 15, 20],
        compatibleSigns: ['Taurus', 'Virgo', 'Scorpio', 'Pisces']
    },
    'Leo': {
        name: 'Leo',
        symbol: '♌',
        dateRange: { start: 'July 23', end: 'August 22' },
        element: 'Fire',
        modality: 'Fixed',
        rulingPlanet: 'Sun',
        coreTraits: ['Confident', 'Generous', 'Creative', 'Charismatic'],
        strengths: ['Warm-hearted', 'Cheerful', 'Humorous', 'Passionate'],
        challenges: ['Arrogant', 'Stubborn', 'Self-centered'],
        keywords: ['Leadership', 'Creativity', 'Pride'],
        colors: ['Gold', 'Yellow', 'Orange'],
        luckyNumbers: [1, 3, 10, 19],
        compatibleSigns: ['Aries', 'Gemini', 'Libra', 'Sagittarius']
    },
    'Virgo': {
        name: 'Virgo',
        symbol: '♍',
        dateRange: { start: 'August 23', end: 'September 22' },
        element: 'Earth',
        modality: 'Mutable',
        rulingPlanet: 'Mercury',
        coreTraits: ['Analytical', 'Practical', 'Diligent', 'Modest'],
        strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking'],
        challenges: ['Overly Critical', 'Worrisome', 'Perfectionist'],
        keywords: ['Service', 'Analysis', 'Precision'],
        colors: ['Navy Blue', 'Grey'],
        luckyNumbers: [5, 14, 15, 23, 32],
        compatibleSigns: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn']
    },
    'Libra': {
        name: 'Libra',
        symbol: '♎',
        dateRange: { start: 'September 23', end: 'October 22' },
        element: 'Air',
        modality: 'Cardinal',
        rulingPlanet: 'Venus',
        coreTraits: ['Diplomatic', 'Fair', 'Social', 'Idealistic'],
        strengths: ['Cooperative', 'Gracious', 'Fair-minded', 'Social'],
        challenges: ['Indecisive', 'Avoiding Confrontation', 'Self-pitying'],
        keywords: ['Balance', 'Harmony', 'Justice'],
        colors: ['Pink', 'Green'],
        luckyNumbers: [4, 6, 13, 15, 24],
        compatibleSigns: ['Gemini', 'Leo', 'Sagittarius', 'Aquarius']
    },
    'Scorpio': {
        name: 'Scorpio',
        symbol: '♏',
        dateRange: { start: 'October 23', end: 'November 21' },
        element: 'Water',
        modality: 'Fixed',
        rulingPlanet: 'Pluto',
        coreTraits: ['Passionate', 'Intense', 'Resourceful', 'Brave'],
        strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn'],
        challenges: ['Jealous', 'Secretive', 'Resentful'],
        keywords: ['Transformation', 'Power', 'Intensity'],
        colors: ['Scarlet', 'Red', 'Rust'],
        luckyNumbers: [8, 11, 18, 22],
        compatibleSigns: ['Cancer', 'Virgo', 'Capricorn', 'Pisces']
    },
    'Sagittarius': {
        name: 'Sagittarius',
        symbol: '♐',
        dateRange: { start: 'November 22', end: 'December 21' },
        element: 'Fire',
        modality: 'Mutable',
        rulingPlanet: 'Jupiter',
        coreTraits: ['Optimistic', 'Free-spirited', 'Adventurous', 'Philosophical'],
        strengths: ['Generous', 'Idealistic', 'Great sense of humor'],
        challenges: ['Impatient', 'Tactless', 'Overconfident'],
        keywords: ['Adventure', 'Philosophy', 'Freedom'],
        colors: ['Blue', 'Purple'],
        luckyNumbers: [3, 7, 9, 12, 21],
        compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius']
    },
    'Capricorn': {
        name: 'Capricorn',
        symbol: '♑',
        dateRange: { start: 'December 22', end: 'January 19' },
        element: 'Earth',
        modality: 'Cardinal',
        rulingPlanet: 'Saturn',
        coreTraits: ['Ambitious', 'Disciplined', 'Responsible', 'Patient'],
        strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
        challenges: ['Know-it-all', 'Unforgiving', 'Condescending'],
        keywords: ['Ambition', 'Structure', 'Achievement'],
        colors: ['Brown', 'Black'],
        luckyNumbers: [4, 8, 13, 22],
        compatibleSigns: ['Taurus', 'Virgo', 'Scorpio', 'Pisces']
    },
    'Aquarius': {
        name: 'Aquarius',
        symbol: '♒',
        dateRange: { start: 'January 20', end: 'February 18' },
        element: 'Air',
        modality: 'Fixed',
        rulingPlanet: 'Uranus',
        coreTraits: ['Progressive', 'Independent', 'Humanitarian', 'Intellectual'],
        strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
        challenges: ['Temperamental', 'Uncompromising', 'Aloof'],
        keywords: ['Innovation', 'Friendship', 'Idealism'],
        colors: ['Light Blue', 'Silver'],
        luckyNumbers: [4, 7, 11, 22, 29],
        compatibleSigns: ['Aries', 'Gemini', 'Libra', 'Sagittarius']
    },
    'Pisces': {
        name: 'Pisces',
        symbol: '♓',
        dateRange: { start: 'February 19', end: 'March 20' },
        element: 'Water',
        modality: 'Mutable',
        rulingPlanet: 'Neptune',
        coreTraits: ['Compassionate', 'Intuitive', 'Artistic', 'Gentle'],
        strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise'],
        challenges: ['Overly Trusting', 'Sad', 'Escapist'],
        keywords: ['Spirituality', 'Compassion', 'Imagination'],
        colors: ['Mauve', 'Lilac', 'Purple', 'Violet', 'Sea green'],
        luckyNumbers: [3, 9, 12, 15, 18, 24],
        compatibleSigns: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn']
    }
};

export function getZodiacSignData(signName: string): ZodiacSign {
    const sign = ZODIAC_SIGNS_DATA[signName];
    if (!sign) {
        // Fallback to a default if sign not found
        return ZODIAC_SIGNS_DATA['Aries'];
    }
    return sign;
}
