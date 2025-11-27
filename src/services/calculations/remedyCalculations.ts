import { VedicChart } from '../../types/vedic.types';
import { UserConcern, TargetedRemedy } from '../../types/astrology.types';

/**
 * Generates targeted remedies based on user concerns and Vedic chart analysis
 * @param chart - The user's Vedic birth chart
 * @param concerns - Array of user concerns to address
 * @returns Array of remedies sorted by effectiveness (descending)
 */
export const generateTargetedRemedies = (chart: VedicChart, concerns: UserConcern[]): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];

    concerns.forEach(concern => {
        switch (concern.type) {
            case 'relationship':
                remedies.push(...analyzeRelationship(chart));
                break;
            case 'finance':
                remedies.push(...analyzeFinance(chart));
                break;
            case 'health':
                remedies.push(...analyzeHealth(chart));
                break;
            case 'addiction':
                remedies.push(...analyzeAddiction(chart, concern.details));
                break;
            case 'career':
                remedies.push(...analyzeCareer(chart));
                break;
            case 'legal':
                remedies.push(...analyzeLegal(chart));
                break;
            case 'business':
                remedies.push(...analyzeBusiness(chart));
                break;
        }
    });

    // Sort by effectiveness (descending)
    return remedies.sort((a, b) => b.effectiveness - a.effectiveness);
};

const analyzeRelationship = (chart: VedicChart): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];
    // Check Venus position
    const venus = chart.d1.planets.find(p => p.planet === 'Venus');
    if (venus) {
        if (['Virgo', 'Scorpio', 'Capricorn'].includes(venus.sign)) {
            remedies.push({
                concernType: 'relationship',
                remedyType: 'Mantra',
                title: 'Venus Mantra',
                description: 'Strengthen Venus for better relationships.',
                instructions: 'Chant "Om Shukraya Namaha" 108 times on Fridays.',
                timing: 'Friday Morning',
                priority: 'high',
                cost: 'free',
                difficulty: 'easy',
                effectiveness: 9
            });
        }
    }
    // General relationship remedy
    remedies.push({
        concernType: 'relationship',
        remedyType: 'Ritual',
        title: 'Offer Water to Sun',
        description: 'Improves overall harmony.',
        instructions: 'Offer water to the rising sun every morning.',
        timing: 'Morning',
        priority: 'medium',
        cost: 'free',
        difficulty: 'easy',
        effectiveness: 7
    });
    return remedies;
};

const analyzeFinance = (chart: VedicChart): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];
    // Check Jupiter
    const jupiter = chart.d1.planets.find(p => p.planet === 'Jupiter');
    if (jupiter && ['Capricorn', 'Gemini', 'Virgo'].includes(jupiter.sign)) {
        remedies.push({
            concernType: 'finance',
            remedyType: 'Mantra',
            title: 'Jupiter Beej Mantra',
            description: 'Enhance financial wisdom and luck.',
            instructions: 'Chant "Om Gram Greem Groum Sah Gurave Namaha" on Thursdays.',
            timing: 'Thursday Morning',
            priority: 'high',
            cost: 'free',
            difficulty: 'medium',
            effectiveness: 9
        });
    }
    remedies.push({
        concernType: 'finance',
        remedyType: 'Donation',
        title: 'Donate Yellow Food',
        description: 'Appease Jupiter for wealth.',
        instructions: 'Donate bananas or chana dal on Thursdays.',
        timing: 'Thursday',
        priority: 'medium',
        cost: 'low',
        difficulty: 'easy',
        effectiveness: 8
    });
    return remedies;
};

const analyzeHealth = (chart: VedicChart): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];
    // Check Sun (Karaka for health)
    const sun = chart.d1.planets.find(p => p.planet === 'Sun');
    if (sun && ['Libra'].includes(sun.sign)) {
        remedies.push({
            concernType: 'health',
            remedyType: 'Mantra',
            title: 'Aditya Hridaya Stotram',
            description: 'Strengthen the Sun for vitality.',
            instructions: 'Recite Aditya Hridaya Stotram daily at sunrise.',
            timing: 'Sunrise',
            priority: 'high',
            cost: 'free',
            difficulty: 'medium',
            effectiveness: 10
        });
    }
    remedies.push({
        concernType: 'health',
        remedyType: 'Lifestyle',
        title: 'Surya Namaskar',
        description: 'Physical and spiritual health practice.',
        instructions: 'Perform 12 rounds of Surya Namaskar daily.',
        timing: 'Morning',
        priority: 'medium',
        cost: 'free',
        difficulty: 'medium',
        effectiveness: 8
    });
    return remedies;
};

const analyzeAddiction = (chart: VedicChart, details?: string): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];
    // Check Rahu and Mars
    const rahu = chart.d1.planets.find(p => p.planet === 'Rahu');

    if (details?.toLowerCase().includes('alcohol')) {
        remedies.push({
            concernType: 'addiction',
            remedyType: 'Mantra',
            title: 'Maha Mrityunjaya Mantra',
            description: 'For overcoming bad habits and health issues.',
            instructions: 'Chant Maha Mrityunjaya Mantra 108 times daily.',
            timing: 'Anytime',
            priority: 'high',
            cost: 'free',
            difficulty: 'medium',
            effectiveness: 10
        });
    }

    if (rahu && ['Scorpio', 'Sagittarius'].includes(rahu.sign)) {
        remedies.push({
            concernType: 'addiction',
            remedyType: 'Gemstone',
            title: 'Hessonite (Gomed)',
            description: 'To control Rahu\'s negative influence.',
            instructions: 'Consult an astrologer before wearing.',
            timing: 'Saturday',
            priority: 'medium',
            cost: 'high',
            difficulty: 'hard',
            effectiveness: 7
        });
    }

    remedies.push({
        concernType: 'addiction',
        remedyType: 'Ritual',
        title: 'Hanuman Chalisa',
        description: 'For strength and willpower.',
        instructions: 'Recite Hanuman Chalisa every Tuesday and Saturday.',
        timing: 'Tuesday/Saturday',
        priority: 'high',
        cost: 'free',
        difficulty: 'easy',
        effectiveness: 9
    });

    return remedies;
};

const analyzeCareer = (chart: VedicChart): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];
    // Check Saturn
    const saturn = chart.d1.planets.find(p => p.planet === 'Saturn');
    if (saturn && ['Aries'].includes(saturn.sign)) {
        remedies.push({
            concernType: 'career',
            remedyType: 'Mantra',
            title: 'Shani Mantra',
            description: 'Remove obstacles in career.',
            instructions: 'Chant "Om Sham Shanicharaya Namaha" on Saturdays.',
            timing: 'Saturday Evening',
            priority: 'high',
            cost: 'free',
            difficulty: 'easy',
            effectiveness: 9
        });
    }
    remedies.push({
        concernType: 'career',
        remedyType: 'Donation',
        title: 'Feed Crows',
        description: 'Appease Saturn.',
        instructions: 'Feed crows or black dogs on Saturdays.',
        timing: 'Saturday',
        priority: 'medium',
        cost: 'low',
        difficulty: 'easy',
        effectiveness: 7
    });
    return remedies;
};

const analyzeLegal = (chart: VedicChart): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];
    // Check 6th house (Litigation)
    // Simplified check - if 6th house has malefic planets
    const malefics = ['Mars', 'Saturn', 'Rahu', 'Ketu'];
    const hasMalefics = chart.d1.planets.some(p => p.house === 6 && malefics.includes(p.planet));

    if (hasMalefics) {
        remedies.push({
            concernType: 'legal',
            remedyType: 'Ritual',
            title: 'Sunderkand Path',
            description: 'To overcome enemies and legal troubles.',
            instructions: 'Recite Sunderkand on Tuesdays.',
            timing: 'Tuesday Evening',
            priority: 'high',
            cost: 'free',
            difficulty: 'medium',
            effectiveness: 9
        });
    }

    remedies.push({
        concernType: 'legal',
        remedyType: 'Mantra',
        title: 'Baglamukhi Mantra',
        description: 'For victory in legal matters.',
        instructions: 'Chant Baglamukhi Mantra with devotion.',
        timing: 'Night',
        priority: 'medium',
        cost: 'free',
        difficulty: 'hard',
        effectiveness: 8
    });
    return remedies;
};

const analyzeBusiness = (chart: VedicChart): TargetedRemedy[] => {
    const remedies: TargetedRemedy[] = [];
    // Check Mercury
    const mercury = chart.d1.planets.find(p => p.planet === 'Mercury');
    if (mercury && ['Pisces'].includes(mercury.sign)) {
        remedies.push({
            concernType: 'business',
            remedyType: 'Mantra',
            title: 'Budh Mantra',
            description: 'Enhance business intelligence.',
            instructions: 'Chant "Om Bum Budhaya Namaha" on Wednesdays.',
            timing: 'Wednesday Morning',
            priority: 'high',
            cost: 'free',
            difficulty: 'easy',
            effectiveness: 9
        });
    }
    remedies.push({
        concernType: 'business',
        remedyType: 'Ritual',
        title: 'Ganesh Worship',
        description: 'Remover of obstacles.',
        instructions: 'Offer Durva grass to Lord Ganesha on Wednesdays.',
        timing: 'Wednesday',
        priority: 'medium',
        cost: 'low',
        difficulty: 'easy',
        effectiveness: 8
    });
    return remedies;
};
