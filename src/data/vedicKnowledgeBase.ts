/**
 * Vedic Knowledge Base
 * 
 * Based on B.V. Raman's "Three Hundred Important Combinations"
 * and other classical Vedic astrology texts.
 * 
 * This Knowledge Base powers the intelligent analysis engine.
 */

import { YogaRule } from '@/types/yoga.types';

// B.V. Raman's Yoga Definitions
export const RAMAN_YOGAS: YogaRule[] = [
    // RAJA YOGAS (Royal Combinations)
    {
        name: "Gajakesari Yoga",
        type: "Raj Yoga",
        requiredPlanets: ["Jupiter", "Moon"],
        condition: "Jupiter in a Kendra (1, 4, 7, 10) from the Moon.",
        result: "Gives many relations, polite behavior, polite speech, and a lasting reputation. The person will be wealthy and intelligent."
    },
    {
        name: "Budhaditya Yoga",
        type: "Raj Yoga",
        requiredPlanets: ["Sun", "Mercury"],
        condition: "Sun and Mercury conjoined in the same house (Nipuna Yoga).",
        result: "Highly intelligent, skillful in work, good reputation, and personal comfort."
    },
    {
        name: "Pancha Mahapurusha Yoga (Hamsa)",
        type: "Raj Yoga",
        requiredPlanets: ["Jupiter"],
        condition: "Jupiter in Kendra, exalted (Cancer) or in own sign (Sagittarius/Pisces).",
        result: "The person will be religious, very lucky, and respected by authorities. Marks of a lotus or fish on hands/feet."
    },
    {
        name: "Pancha Mahapurusha Yoga (Malavya)",
        type: "Raj Yoga",
        requiredPlanets: ["Venus"],
        condition: "Venus in Kendra, exalted (Pisces) or in own sign (Taurus/Libra).",
        result: "Strong sense of aesthetics, wealthy, happy with family, and enjoys worldly pleasures."
    },
    {
        name: "Pancha Mahapurusha Yoga (Ruchaka)",
        type: "Raj Yoga",
        requiredPlanets: ["Mars"],
        condition: "Mars in Kendra, exalted (Capricorn) or in own sign (Aries/Scorpio).",
        result: "Bold, courageous, victorious over enemies, and physically strong. Born leader."
    },
    {
        name: "Pancha Mahapurusha Yoga (Bhadra)",
        type: "Raj Yoga",
        requiredPlanets: ["Mercury"],
        condition: "Mercury in Kendra, exalted (Virgo) or in own sign (Gemini/Virgo).",
        result: "Sharp intellect, good orator, long life, and helpful to relatives."
    },
    {
        name: "Pancha Mahapurusha Yoga (Sasa)",
        type: "Raj Yoga",
        requiredPlanets: ["Saturn"],
        condition: "Saturn in Kendra, exalted (Libra) or in own sign (Capricorn/Aquarius).",
        result: "Commands many servants, leader of a group, slightly questionable character but powerful."
    },
    {
        name: "Dharma Karma Adhipati Yoga",
        type: "Raj Yoga",
        requiredPlanets: [],
        condition: "Lords of 9th and 10th houses conjoined or exchanging signs.",
        result: "The person attains a high position, is dutiful, and enjoys royal favor. A very powerful Raja Yoga."
    },

    // DHANA YOGAS (Wealth Combinations)
    {
        name: "Lakshmi Yoga",
        type: "Dhana Yoga",
        requiredPlanets: ["Venus", "Moon"],
        condition: "Lord of 9th in Kendra/Trikona, exalted/own sign, and allied with Venus.",
        result: "Graceful, wealthy, noble, and learned. One of the best wealth yogas."
    },
    {
        name: "Chandra-Mangala Yoga",
        type: "Dhana Yoga",
        requiredPlanets: ["Moon", "Mars"],
        condition: "Moon and Mars conjoined.",
        result: "Earnings through unscrupulous means (in some interpretations), but generally gives wealth, energy, and business acumen."
    },
    {
        name: "Vasumathi Yoga",
        type: "Dhana Yoga",
        requiredPlanets: ["Jupiter", "Venus", "Mercury"],
        condition: "Benefics (Jupiter, Venus, Mercury) in Upachaya houses (3, 6, 10, 11) from Lagna or Moon.",
        result: "The person will be extremely wealthy and live like a king."
    },

    // ARISTA YOGAS (Misfortune/Difficulties)
    {
        name: "Kemadruma Yoga",
        type: "Arista Yoga",
        requiredPlanets: ["Moon"],
        condition: "No planets (except Sun/Nodes) in 2nd and 12th from Moon.",
        result: "Mental unrest, loss of wealth/status, and struggles. (Cancelled if Moon is in Kendra or aspected by Jupiter)."
    },
    {
        name: "Sakat Yoga",
        type: "Arista Yoga",
        requiredPlanets: ["Moon", "Jupiter"],
        condition: "Moon in 6th, 8th, or 12th from Jupiter.",
        result: "Fluctuations in fortune, like a wheel. Ups and downs in life."
    },

    // VIPAREETA RAJA YOGAS
    {
        name: "Vipareeta Raja Yoga (Harsha)",
        type: "Raj Yoga",
        requiredPlanets: [],
        condition: "Lord of 6th in 6th, 8th, or 12th house.",
        result: "Happiness, strong constitution, conquers enemies, but may have questionable morals."
    },
    {
        name: "Vipareeta Raja Yoga (Sarala)",
        type: "Raj Yoga",
        requiredPlanets: [],
        condition: "Lord of 8th in 6th, 8th, or 12th house.",
        result: "Long life, fearless, learned, victorious over enemies."
    },
    {
        name: "Vipareeta Raja Yoga (Vimala)",
        type: "Raj Yoga",
        requiredPlanets: [],
        condition: "Lord of 12th in 6th, 8th, or 12th house.",
        result: "Frugal, happy, independent, and good behavior."
    },

    // SPECIAL YOGAS
    {
        name: "Amala Yoga",
        type: "General",
        requiredPlanets: ["Jupiter", "Venus", "Mercury"],
        condition: "Benefic planet in the 10th house from Lagna or Moon.",
        result: "Lasting fame and reputation. The person is virtuous and charitable."
    },
    {
        name: "Parivartana Yoga",
        type: "General",
        requiredPlanets: [],
        condition: "Mutual exchange of signs between two planets.",
        result: "Strengthens the houses involved. Can be Maha (good houses), Khala (one bad house), or Dainya (two bad houses)."
    }
];

// Planetary Effects by House (Bhavartha Ratnakara / Phaladeepika)
export const PLANETARY_EFFECTS: Record<string, Record<string, string>> = {
    'Sun': {
        '1': 'Sun in 1st: Confidence, vitality, ego, heat in body, thinning hair.',
        '2': 'Sun in 2nd: Expenses on government, eye trouble, bold speech.',
        '3': 'Sun in 3rd: Courageous, good siblings, short travels.',
        '4': 'Sun in 4th: Discontent with home, issues with mother, trouble with property.',
        '5': 'Sun in 5th: Few children, intelligent, government connections.',
        '6': 'Sun in 6th: Victory over enemies, good health, service oriented.',
        '7': 'Sun in 7th: Late marriage, dominating spouse, business challenges.',
        '8': 'Sun in 8th: Health issues, inheritance matters, occult interest.',
        '9': 'Sun in 9th: Righteous, good fortune, respect from elders.',
        '10': 'Sun in 10th: Leadership, government favor, professional success, high status.',
        '11': 'Sun in 11th: Gains through government, influential friends.',
        '12': 'Sun in 12th: Eye problems, foreign residence, spiritual inclination.'
    },
    'Moon': {
        '1': 'Moon in 1st: Handsome, emotional, love for travel, changeable nature.',
        '2': 'Moon in 2nd: Wealthy, good family life, sweet speech.',
        '3': 'Moon in 3rd: Brave, good siblings, short journeys.',
        '4': 'Moon in 4th: Happiness from mother, vehicle comforts, emotional stability.',
        '5': 'Moon in 5th: Intelligent children, speculative gains, romantic.',
        '6': 'Moon in 6th: Enemies, digestive issues, service oriented.',
        '7': 'Moon in 7th: Beautiful spouse, partnerships, emotional in relationships.',
        '8': 'Moon in 8th: Health fluctuations, inheritance, emotional struggles.',
        '9': 'Moon in 9th: Religious, fortunate, good with elders.',
        '10': 'Moon in 10th: Famous, popular career, public dealing.',
        '11': 'Moon in 11th: Gains, many friends, fulfilled desires.',
        '12': 'Moon in 12th: Emotional isolation, intuitive, sleep disturbances, expense on charity.'
    },
    'Mars': {
        '1': 'Mars in 1st (Manglik): Hot constitution, scars, aggressive, adventurous.',
        '2': 'Mars in 2nd (Manglik): Harsh speech, family discord, good earnings.',
        '3': 'Mars in 3rd: Extremely brave, athletic, good siblings.',
        '4': 'Mars in 4th (Manglik): Property issues, mother troubles, no peace at home.',
        '5': 'Mars in 5th: Few children, speculative, sharp intellect.',
        '6': 'Mars in 6th: Victory over enemies, good health, legal success.',
        '7': 'Mars in 7th (Manglik): Conflict in partnership, passionate spouse.',
        '8': 'Mars in 8th (Manglik): Accidents, surgery, inheritance through conflict.',
        '9': 'Mars in 9th: Religious disputes, foreign connections, father issues.',
        '10': 'Mars in 10th: Executive ability, energy in career, dynamic leader.',
        '11': 'Mars in 11th: Gains through courage, powerful friends.',
        '12': 'Mars in 12th (Manglik): Hidden enemies, expenses, bed pleasures.'
    },
    'Mercury': {
        '1': 'Mercury in 1st: Intelligent, youthful appearance, good communicator.',
        '2': 'Mercury in 2nd: Wealthy through skills, good speaker, business minded.',
        '3': 'Mercury in 3rd: Writer, good siblings, clever.',
        '4': 'Mercury in 4th: Educated, scholarly mother, comfortable home.',
        '5': 'Mercury in 5th: Intelligent children, good adviser, creative.',
        '6': 'Mercury in 6th: Wins arguments, good in service, analytical.',
        '7': 'Mercury in 7th: Intelligent spouse, business partnerships.',
        '8': 'Mercury in 8th: Research ability, occult knowledge, longevity.',
        '9': 'Mercury in 9th: Religious scholar, fortunate, good education.',
        '10': 'Mercury in 10th: Successful career, communication field, adaptable.',
        '11': 'Mercury in 11th: Gains through intellect, many contacts.',
        '12': 'Mercury in 12th: Silent, secretive, expenses on education.'
    },
    'Jupiter': {
        '1': 'Jupiter in 1st: Wisdom, dignity, obesity, optimistic, lucky.',
        '2': 'Jupiter in 2nd: Wealthy, good family, sweet speech, generous.',
        '3': 'Jupiter in 3rd: Few siblings, short travels, religious writing.',
        '4': 'Jupiter in 4th: Happy home, good mother, vehicles, properties.',
        '5': 'Jupiter in 5th: Intelligence, good children, speculative gains.',
        '6': 'Jupiter in 6th: Destroys enemies through wisdom, legal victory.',
        '7': 'Jupiter in 7th: Wise spouse, good marriage, successful partnerships.',
        '8': 'Jupiter in 8th: Longevity, inheritance, interest in occult.',
        '9': 'Jupiter in 9th: Religious, philosophical, foreign travel, guru grace.',
        '10': 'Jupiter in 10th: High position, respected career, righteous work.',
        '11': 'Jupiter in 11th: Great gains, influential friends, fulfilled desires.',
        '12': 'Jupiter in 12th: Spiritual, foreign residence, expenses on good causes.'
    },
    'Venus': {
        '1': 'Venus in 1st: Beautiful, charming, artistic, loves luxury.',
        '2': 'Venus in 2nd: Wealthy, poetic speech, good family life.',
        '3': 'Venus in 3rd: Artistic siblings, short travels, creative expression.',
        '4': 'Venus in 4th: Beautiful home, vehicles, happy mother.',
        '5': 'Venus in 5th: Romantic, artistic children, entertainment gains.',
        '6': 'Venus in 6th: Difficulties in love, service in arts.',
        '7': 'Venus in 7th: Beautiful spouse, happy marriage, successful partnerships.',
        '8': 'Venus in 8th: Wealth through marriage, occult interests, sexual.',
        '9': 'Venus in 9th: Artistic achievements, religious art, foreign gains.',
        '10': 'Venus in 10th: Career in arts, fame through beauty.',
        '11': 'Venus in 11th: Gains through arts, wealthy friends.',
        '12': 'Venus in 12th: Bed pleasures, foreign residence, artistic expenses.'
    },
    'Saturn': {
        '1': 'Saturn in 1st: Discipline, delay, lean body, hard working, serious.',
        '2': 'Saturn in 2nd: Slow wealth accumulation, harsh speech.',
        '3': 'Saturn in 3rd: Few siblings, courageous after effort.',
        '4': 'Saturn in 4th: No peace at home, mother troubles, property issues.',
        '5': 'Saturn in 5th: Few/delayed children, speculative losses.',
        '6': 'Saturn in 6th: Wins over enemies through patience, good health.',
        '7': 'Saturn in 7th: Delayed marriage, mature partner, stable but cold relationship.',
        '8': 'Saturn in 8th: Long life, chronic issues, inheritance delays.',
        '9': 'Saturn in 9th: Religious struggles, delayed fortune, serious father.',
        '10': 'Saturn in 10th: Career rise after 30, authority, hard work, fall from grace if unethical.',
        '11': 'Saturn in 11th: Gains through hard work, lasting friendships.',
        '12': 'Saturn in 12th: Losses, confinement, spiritual pursuits.'
    },
    'Rahu': {
        '1': 'Rahu in 1st: Unconventional personality, foreign connections.',
        '2': 'Rahu in 2nd: Sudden wealth gains, harsh speech.',
        '3': 'Rahu in 3rd: Courageous, success in media.',
        '4': 'Rahu in 4th: Foreign property, restless home life.',
        '5': 'Rahu in 5th: Unusual children, speculation risks.',
        '6': 'Rahu in 6th: Destroys enemies, health issues from unknown sources.',
        '7': 'Rahu in 7th: Unconventional marriage, foreign spouse possible.',
        '8': 'Rahu in 8th: Sudden events, occult abilities.',
        '9': 'Rahu in 9th: Unorthodox beliefs, foreign fortune.',
        '10': 'Rahu in 10th: Sudden rise in career, unconventional work.',
        '11': 'Rahu in 11th: Large gains, influential foreign friends.',
        '12': 'Rahu in 12th: Foreign residence, hidden enemies, spiritual confusion.'
    },
    'Ketu': {
        '1': 'Ketu in 1st: Spiritual, detached, mysterious personality.',
        '2': 'Ketu in 2nd: Speech issues, sudden losses, spiritual speech.',
        '3': 'Ketu in 3rd: Spiritual courage, detached from siblings.',
        '4': 'Ketu in 4th: Detached from home, spiritual mother.',
        '5': 'Ketu in 5th: Spiritual children, past life connections.',
        '6': 'Ketu in 6th: Destroys enemies, unusual health issues.',
        '7': 'Ketu in 7th: Spiritual partner, detached relationships.',
        '8': 'Ketu in 8th: Occult mastery, past life karma, sudden events.',
        '9': 'Ketu in 9th: Spiritual pursuits, unconventional beliefs.',
        '10': 'Ketu in 10th: Unexpected career changes, spiritual work.',
        '11': 'Ketu in 11th: Gains through spirituality, unusual friends.',
        '12': 'Ketu in 12th: Moksha, liberation, spiritual attainment.'
    }
};

// Nakshatra Lords for Vimshottari Dasha
export const NAKSHATRA_LORDS = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
];

// Dasha Years for Vimshottari
export const DASHA_YEARS: Record<string, number> = {
    'Ketu': 7,
    'Venus': 20,
    'Sun': 6,
    'Moon': 10,
    'Mars': 7,
    'Rahu': 18,
    'Jupiter': 16,
    'Saturn': 19,
    'Mercury': 17
};

// Planetary Friendship Table (Natural)
export const PLANETARY_FRIENDSHIP: Record<string, { friends: string[], neutral: string[], enemies: string[] }> = {
    'Sun': { friends: ['Moon', 'Mars', 'Jupiter'], neutral: ['Mercury'], enemies: ['Venus', 'Saturn'] },
    'Moon': { friends: ['Sun', 'Mercury'], neutral: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [] },
    'Mars': { friends: ['Sun', 'Moon', 'Jupiter'], neutral: ['Venus', 'Saturn'], enemies: ['Mercury'] },
    'Mercury': { friends: ['Sun', 'Venus'], neutral: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'] },
    'Jupiter': { friends: ['Sun', 'Moon', 'Mars'], neutral: ['Saturn'], enemies: ['Mercury', 'Venus'] },
    'Venus': { friends: ['Mercury', 'Saturn'], neutral: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
    'Saturn': { friends: ['Mercury', 'Venus'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] },
    'Rahu': { friends: ['Venus', 'Saturn', 'Mercury'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] },
    'Ketu': { friends: ['Mars', 'Venus', 'Saturn'], neutral: ['Mercury', 'Jupiter'], enemies: ['Sun', 'Moon'] }
};

// Marana Karaka Sthana (Death-like positions)
export const MARANA_KARAKA_STHANA: Record<string, number> = {
    'Sun': 12,
    'Moon': 8,
    'Mars': 7,
    'Mercury': 7,
    'Jupiter': 3,
    'Venus': 6,
    'Saturn': 1,
    'Rahu': 9
};

// House Lords by Ascendant Sign
export const HOUSE_LORDS: Record<string, string> = {
    'Aries': 'Mars',
    'Taurus': 'Venus',
    'Gemini': 'Mercury',
    'Cancer': 'Moon',
    'Leo': 'Sun',
    'Virgo': 'Mercury',
    'Libra': 'Venus',
    'Scorpio': 'Mars',
    'Sagittarius': 'Jupiter',
    'Capricorn': 'Saturn',
    'Aquarius': 'Saturn',
    'Pisces': 'Jupiter'
};
