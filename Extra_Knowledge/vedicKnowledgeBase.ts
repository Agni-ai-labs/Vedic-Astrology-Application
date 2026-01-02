import { YogaRule } from '../types';

// Inspired by B.V. Raman's "Three Hundred Important Combinations" and other classical texts.
// This Knowledge Base powers the intelligent analysis engine.

export const RAMAN_YOGAS: YogaRule[] = [
  // --- RAJA YOGAS (Royal Combinations) ---
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
    result: "The person will be religious, very lucky, and respected by kings (authorities). Marks of a lotus or fish on hands/feet."
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
  
  // --- DHANA YOGAS (Wealth Combinations) ---
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

  // --- ARISTA YOGAS (Misfortune/Difficulties) ---
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

  // --- SPECIAL YOGAS ---
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

// Planetary Effects (Bhavartha Ratnakara / Phaladeepika)
export const PLANETARY_EFFECTS: Record<string, Record<string, string>> = {
  'Sun': {
    '1': 'Sun in 1st: Confidence, vitality, ego, heat in body, thinning hair.',
    '2': 'Sun in 2nd: Expenses on government, eye trouble, bold speech.',
    '10': 'Sun in 10th: Leadership, government favor, professional success, high status.'
  },
  'Moon': {
    '1': 'Moon in 1st: Handsome, emotional, love for travel, changeable nature.',
    '4': 'Moon in 4th: Happiness from mother, vehicle comforts, emotional stability.',
    '12': 'Moon in 12th: Emotional isolation, intuitive, sleep disturbances, expense on charity.'
  },
  'Mars': {
    '1': 'Mars in 1st: Hot constitution, scars, aggressive, adventurous.',
    '7': 'Mars in 7th: Mangal Dosha, conflict in partnership, passionate spouse.',
    '10': 'Mars in 10th: Executive ability, energy in career, dynamic leader.'
  },
  'Jupiter': {
    '1': 'Jupiter in 1st: Wisdom, dignity, obesity, optimistic, lucky.',
    '5': 'Jupiter in 5th: Intelligence, good children, speculative gains.',
    '9': 'Jupiter in 9th: Religious, philosophical, foreign travel, guru\'s grace.'
  },
  'Saturn': {
    '1': 'Saturn in 1st: Discipline, delay, lean body, hard working, serious.',
    '7': 'Saturn in 7th: Delayed marriage, mature partner, stable but cold relationship.',
    '10': 'Saturn in 10th: Career rise after 30, authority, hard work, fall from grace if unethical.'
  }
  // ... Add more as needed
};
