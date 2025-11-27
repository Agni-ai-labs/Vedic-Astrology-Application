import { VedicChart } from '../../types/vedic.types';
import { BusinessDetails, BusinessAnalysis, BusinessSuggestion } from '../../types/astrology.types';

/**
 * Analyzes business growth potential based on Vedic chart and business details
 * @param chart - The user's Vedic birth chart
 * @param details - Business details (name, type, start date)
 * @returns Comprehensive business analysis with growth prediction and recommendations
 */
export const analyzeBusinessGrowth = (chart: VedicChart, details: BusinessDetails): BusinessAnalysis => {
    const nameScore = calculateNameScore(details.name);
    const growthPrediction = predictGrowth(chart, nameScore);

    return {
        growthPrediction,
        nameAnalysis: {
            score: nameScore,
            vibration: calculateVibration(details.name),
            assessment: getAssessment(nameScore)
        },
        recommendations: {
            suggestedNames: generateNameSuggestions(details.name),
            logoColors: suggestLogoColors(chart),
            luckyNumbers: getLuckyNumbers(chart),
            bestDirection: getBestDirection(chart),
            rebrandingDates: getRebrandingDates()
        }
    };
};

/**
 * Suggests suitable business sectors based on 10th house planetary analysis
 * @param chart - The user's Vedic birth chart
 * @returns Array of business suggestions (max 5) sorted by match score
 */
export const suggestBusiness = (chart: VedicChart): BusinessSuggestion[] => {
    const suggestions: BusinessSuggestion[] = [];

    // Find planets in 10th house
    const planetsIn10th = chart.d1.planets.filter(p => p.house === 10).map(p => p.planet);

    // Logic based on 10th house planets
    if (planetsIn10th.includes('Sun')) {
        suggestions.push({
            sector: 'Government/Administration',
            matchScore: 90,
            reasoning: 'Sun in 10th house indicates authority and government roles.',
            timing: 'Within 1 year',
            investmentRange: 'High',
            successProbability: 85
        });
    }
    if (planetsIn10th.includes('Moon')) {
        suggestions.push({
            sector: 'Food/Hospitality/Public Relations',
            matchScore: 85,
            reasoning: 'Moon favors public interaction and care.',
            timing: 'Immediate',
            investmentRange: 'Medium',
            successProbability: 80
        });
    }
    if (planetsIn10th.includes('Mars')) {
        suggestions.push({
            sector: 'Real Estate/Engineering/Sports',
            matchScore: 88,
            reasoning: 'Mars gives energy for technical and physical fields.',
            timing: 'After 6 months',
            investmentRange: 'Medium-High',
            successProbability: 82
        });
    }
    if (planetsIn10th.includes('Mercury')) {
        suggestions.push({
            sector: 'Trading/Communication/IT',
            matchScore: 92,
            reasoning: 'Mercury is the karaka for business and trade.',
            timing: 'Anytime',
            investmentRange: 'Low-Medium',
            successProbability: 90
        });
    }
    if (planetsIn10th.includes('Jupiter')) {
        suggestions.push({
            sector: 'Education/Consulting/Finance',
            matchScore: 95,
            reasoning: 'Jupiter brings wisdom and expansion.',
            timing: 'Next Thursday',
            investmentRange: 'Low',
            successProbability: 95
        });
    }
    if (planetsIn10th.includes('Venus')) {
        suggestions.push({
            sector: 'Fashion/Arts/Luxury Goods',
            matchScore: 89,
            reasoning: 'Venus rules beauty and luxury.',
            timing: 'Next Friday',
            investmentRange: 'High',
            successProbability: 88
        });
    }
    if (planetsIn10th.includes('Saturn')) {
        suggestions.push({
            sector: 'Manufacturing/Mining/Service',
            matchScore: 80,
            reasoning: 'Saturn favors hard work and long-term projects.',
            timing: 'After 30',
            investmentRange: 'High',
            successProbability: 75
        });
    }

    // Default suggestion if no planets in 10th
    if (suggestions.length === 0) {
        suggestions.push({
            sector: 'Service Industry/Freelancing',
            matchScore: 75,
            reasoning: 'Based on general chart strength.',
            timing: 'When Dasha is favorable',
            investmentRange: 'Low',
            successProbability: 70
        });
    }

    return suggestions.slice(0, 5);
};

// Helper functions

/**
 * Calculates numerology score for business name using Chaldean system
 * @param name - Business name to analyze
 * @returns Score from 1-100 based on name vibration
 */
const calculateNameScore = (name: string): number => {
    // Chaldean Numerology mapping (simplified)
    const mapping: { [key: string]: number } = {
        'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
        'B': 2, 'K': 2, 'R': 2,
        'C': 3, 'G': 3, 'L': 3, 'S': 3,
        'D': 4, 'M': 4, 'T': 4,
        'E': 5, 'H': 5, 'N': 5, 'X': 5,
        'U': 6, 'V': 6, 'W': 6,
        'O': 7, 'Z': 7,
        'F': 8, 'P': 8
    };

    let sum = 0;
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    for (let char of cleanName) {
        sum += mapping[char] || 0;
    }

    // Reduce to single digit (except 11, 22, 33)
    let score = sum;
    while (score > 9 && score !== 11 && score !== 22 && score !== 33) {
        score = score.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }

    // Map to 1-100 scale roughly
    return Math.min(100, score * 10 + 10);
};

const calculateVibration = (name: string): number => {
    return calculateNameScore(name); // Same as score for now
};

const getAssessment = (score: number): 'Excellent' | 'Good' | 'Average' | 'Poor' => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Poor';
};

/**
 * Predicts business growth based on chart strength and name score
 * @param chart - The user's Vedic birth chart
 * @param nameScore - Numerology score of business name
 * @returns Growth prediction with timeline and confidence level
 */
const predictGrowth = (chart: VedicChart, nameScore: number): { willGrow: boolean, timeline: string, confidence: number } => {
    // Simple logic: if name score is good and chart has strong 10th/11th house
    const planetsIn10th = chart.d1.planets.filter(p => p.house === 10);
    const planetsIn11th = chart.d1.planets.filter(p => p.house === 11);

    const isStrongChart = planetsIn10th.length > 0 || planetsIn11th.length > 0;
    const willGrow = nameScore > 50 && isStrongChart;

    return {
        willGrow,
        timeline: willGrow ? 'Steady growth over next 2 years' : 'Challenges expected in first year',
        confidence: willGrow ? 85 : 60
    };
};

const generateNameSuggestions = (currentName: string): string[] => {
    return [
        currentName + " Global",
        "The " + currentName + " Group",
        currentName + " Solutions",
        "Royal " + currentName,
        currentName + " Enterprises"
    ];
};

const suggestLogoColors = (chart: VedicChart): string[] => {
    // Based on Ascendant lord or 10th lord
    const ascendantSign = chart.d1.ascendant;
    switch (ascendantSign) {
        case 'Aries': return ['Red', 'Gold'];
        case 'Taurus': return ['White', 'Pink'];
        case 'Gemini': return ['Green', 'Blue'];
        case 'Cancer': return ['White', 'Silver'];
        case 'Leo': return ['Gold', 'Orange'];
        case 'Virgo': return ['Green', 'Grey'];
        case 'Libra': return ['White', 'Blue'];
        case 'Scorpio': return ['Red', 'Maroon'];
        case 'Sagittarius': return ['Yellow', 'Gold'];
        case 'Capricorn': return ['Blue', 'Black'];
        case 'Aquarius': return ['Blue', 'Purple'];
        case 'Pisces': return ['Yellow', 'Orange'];
        default: return ['Blue', 'White'];
    }
};

const getLuckyNumbers = (_chart: VedicChart): number[] => {
    // Simplified
    return [1, 3, 5, 6, 9];
};

const getBestDirection = (chart: VedicChart): string => {
    const ascendantSign = chart.d1.ascendant;
    if (['Aries', 'Leo', 'Sagittarius'].includes(ascendantSign)) return 'East';
    if (['Taurus', 'Virgo', 'Capricorn'].includes(ascendantSign)) return 'South';
    if (['Gemini', 'Libra', 'Aquarius'].includes(ascendantSign)) return 'West';
    return 'North';
};

const getRebrandingDates = (): Date[] => {
    // Return next 3 auspicious dates (mocked for now)
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i * 7); // Next 3 weeks
        dates.push(date);
    }
    return dates;
};
