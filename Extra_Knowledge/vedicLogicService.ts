import { ChartData, PlanetPosition, YogaRule, ZodiacSignData } from '../types';
import { ZODIAC_SIGNS } from '../constants';
import { RAMAN_YOGAS, PLANETARY_EFFECTS } from '../data/vedicKnowledgeBase';
import { astronomyEngine } from './astronomyEngine';

// --- Constants ---
const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
  'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const DASHA_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17]; // Total 120 years

const FRIENDSHIP_TABLE: Record<string, { friends: string[], neutral: string[], enemies: string[] }> = {
  'Sun': { friends: ['Moon', 'Mars', 'Jupiter'], neutral: ['Mercury'], enemies: ['Venus', 'Saturn'] },
  'Moon': { friends: ['Sun', 'Mercury'], neutral: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [] }, // Moon has no enemies
  'Mars': { friends: ['Sun', 'Moon', 'Jupiter'], neutral: ['Venus', 'Saturn'], enemies: ['Mercury'] },
  'Mercury': { friends: ['Sun', 'Venus'], neutral: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'] },
  'Jupiter': { friends: ['Sun', 'Moon', 'Mars'], neutral: ['Saturn'], enemies: ['Mercury', 'Venus'] },
  'Venus': { friends: ['Mercury', 'Saturn'], neutral: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
  'Saturn': { friends: ['Mercury', 'Venus'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] },
  'Rahu': { friends: ['Venus', 'Saturn', 'Mercury'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] },
  'Ketu': { friends: ['Mars', 'Venus', 'Saturn'], neutral: ['Mercury', 'Jupiter'], enemies: ['Sun', 'Moon'] }
};

// --- Types ---
export interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
}

export interface DoshaResult {
  name: string;
  present: boolean;
  description: string;
  severity?: 'Low' | 'Medium' | 'High';
  remedies: string[];
}

export interface PlanetaryStrength {
  planet: string;
  score: number; // 0-100 (Conceptually similar to Rupas)
  status: 'Weak' | 'Average' | 'Strong' | 'Exalted' | 'Debilitated';
}

// --- Service Class ---
export class VedicLogicService {

  // --- Nakshatra Calculation ---
  public calculateNakshatra(moonLongitude: number): { name: string, lord: string, pada: number, elapsed: number } {
    // 360 degrees / 27 nakshatras = 13.3333 degrees per nakshatra
    const nakshatraSpan = 360 / 27;
    const index = Math.floor(moonLongitude / nakshatraSpan);
    const nakshatraName = NAKSHATRAS[index];
    
    // Lord based on Vimshottari sequence. Sequence starts with Ashwini -> Ketu
    // 0: Ashwini (Ketu), 1: Bharani (Venus)... 
    // Sequence repeats every 9 nakshatras.
    const lordIndex = index % 9; 
    const lord = DASHA_LORDS[lordIndex];
    
    const degreesInNakshatra = moonLongitude % nakshatraSpan;
    const pada = Math.floor(degreesInNakshatra / (nakshatraSpan / 4)) + 1;
    const elapsed = degreesInNakshatra / nakshatraSpan; // 0 to 1 fraction

    return { name: nakshatraName, lord, pada, elapsed };
  }

  // --- Vimshottari Dasha System ---
  public calculateVimshottariDasha(dob: Date, moonLongitude: number): DashaPeriod[] {
    const nakshatra = this.calculateNakshatra(moonLongitude);
    
    // Find starting Dasha index
    const startIndex = DASHA_LORDS.indexOf(nakshatra.lord);
    const balanceYears = DASHA_YEARS[startIndex] * (1 - nakshatra.elapsed);
    
    const periods: DashaPeriod[] = [];
    let currentDate = new Date(dob);
    
    // First Dasha (Balance)
    let endDate = new Date(currentDate);
    endDate.setFullYear(endDate.getFullYear() + Math.floor(balanceYears));
    // Add remaining days approx
    const remDays = (balanceYears % 1) * 365.25;
    endDate.setDate(endDate.getDate() + remDays);
    
    periods.push({
      planet: DASHA_LORDS[startIndex],
      startDate: new Date(currentDate),
      endDate: new Date(endDate),
      isCurrent: false
    });
    
    currentDate = new Date(endDate);
    
    // Subsequent Dashas
    for (let i = 1; i < 9; i++) {
      const dashaIndex = (startIndex + i) % 9;
      const years = DASHA_YEARS[dashaIndex];
      
      endDate = new Date(currentDate);
      endDate.setFullYear(endDate.getFullYear() + years);
      
      periods.push({
        planet: DASHA_LORDS[dashaIndex],
        startDate: new Date(currentDate),
        endDate: new Date(endDate),
        isCurrent: false
      });
      
      currentDate = new Date(endDate);
    }
    
    // Mark current dasha
    const now = new Date();
    periods.forEach(p => {
      if (now >= p.startDate && now <= p.endDate) {
        p.isCurrent = true;
      }
    });
    
    return periods;
  }

  // --- Planetary Strength (Simplified Shadbala) ---
  public calculatePlanetaryStrength(chart: ChartData): PlanetaryStrength[] {
    return chart.planets.map(planet => {
      let score = 50; // Base score
      
      // 1. Exaltation/Debilitation
      // Simplified degree check or sign check
      // Sun Exalted in Aries, Debilitated in Libra
      if (planet.name === 'Sun') {
        if (planet.sign === 'Aries') score += 30;
        if (planet.sign === 'Libra') score -= 30;
      }
      // ... (Add more rules for each planet)
      // Mars Exalted in Capricorn
      if (planet.name === 'Mars') {
        if (planet.sign === 'Capricorn') score += 30;
        if (planet.sign === 'Cancer') score -= 30;
      }
      // Jupiter Exalted in Cancer
      if (planet.name === 'Jupiter') {
        if (planet.sign === 'Cancer') score += 30;
        if (planet.sign === 'Capricorn') score -= 30;
      }
       // Saturn Exalted in Libra
      if (planet.name === 'Saturn') {
        if (planet.sign === 'Libra') score += 30;
        if (planet.sign === 'Aries') score -= 30;
      }
      // Venus Exalted in Pisces
      if (planet.name === 'Venus') {
        if (planet.sign === 'Pisces') score += 30;
        if (planet.sign === 'Virgo') score -= 30;
      }
      // Mercury Exalted in Virgo
      if (planet.name === 'Mercury') {
        if (planet.sign === 'Virgo') score += 30; // Also own sign
        if (planet.sign === 'Pisces') score -= 30;
      }
      // Moon Exalted in Taurus
      if (planet.name === 'Moon') {
        if (planet.sign === 'Taurus') score += 30;
        if (planet.sign === 'Scorpio') score -= 30;
      }

      // 2. House Placement (Digbala - Directional Strength)
      // Jupiter/Mercury strong in 1st (East)
      if (['Jupiter', 'Mercury'].includes(planet.name) && planet.house === 1) score += 15;
      // Sun/Mars strong in 10th (South)
      if (['Sun', 'Mars'].includes(planet.name) && planet.house === 10) score += 15;
      // Saturn strong in 7th (West)
      if (planet.name === 'Saturn' && planet.house === 7) score += 15;
      // Moon/Venus strong in 4th (North)
      if (['Moon', 'Venus'].includes(planet.name) && planet.house === 4) score += 15;

      // 3. Retrograde (Cheshta Bala approximation)
      if (planet.isRetrograde && planet.name !== 'Rahu' && planet.name !== 'Ketu') {
        score += 20; // Retrograde planets are often considered strong (Chesta Bala)
      }

      // Determine Status
      let status: PlanetaryStrength['status'] = 'Average';
      if (score > 75) status = 'Exalted'; // Or 'Very Strong'
      else if (score > 60) status = 'Strong';
      else if (score < 35) status = 'Debilitated'; // Or 'Weak'
      else if (score < 45) status = 'Weak';

      return { planet: planet.name, score, status };
    });
  }

  // --- Dosha Calculations ---

  // Mangal Dosha (Mars Dosha)
  // Mars in 1, 2, 4, 7, 8, 12 from Lagna, Moon, or Venus.
  // Exceptions exist (e.g., Mars in own sign, Mars in Aries/Scorpio/Capricorn/Cancer in specific houses) - implementing basic first.
  public calculateMangalDosha(chart: ChartData): DoshaResult {
    const mars = chart.planets.find(p => p.name === 'Mars');
    const moon = chart.planets.find(p => p.name === 'Moon');
    const venus = chart.planets.find(p => p.name === 'Venus');
    
    if (!mars) return { name: 'Mangal Dosha', present: false, description: 'Mars not found', remedies: [] };

    const doshaHouses = [1, 2, 4, 7, 8, 12];
    
    // From Lagna
    const fromLagna = mars.house;
    
    // From Moon
    // (Mars House - Moon House + 1) normalized to 1-12
    const fromMoon = moon ? ((mars.house - moon.house + 12) % 12 || 12) : 0;
    
    // From Venus
    const fromVenus = venus ? ((mars.house - venus.house + 12) % 12 || 12) : 0;
    
    const isDoshaLagna = doshaHouses.includes(fromLagna);
    const isDoshaMoon = doshaHouses.includes(fromMoon);
    const isDoshaVenus = doshaHouses.includes(fromVenus);

    if (isDoshaLagna || isDoshaMoon || isDoshaVenus) {
      return {
        name: 'Mangal Dosha (Kuja Dosha)',
        present: true,
        description: `Mars is placed in a sensitive position (${fromLagna} from Lagna, ${fromMoon} from Moon, ${fromVenus} from Venus), creating Mangal Dosha. This can affect marital harmony and relationships.`,
        severity: (isDoshaLagna && isDoshaMoon) ? 'High' : 'Medium',
        remedies: [
          'Kumbh Vivah (Ceremonial marriage to a pot/tree) before actual marriage.',
          'Chant Hanuman Chalisa every Tuesday.',
          'Visit a Lord Kartikeya temple.',
          'Donate red lentils (masoor dal) on Tuesdays.'
        ]
      };
    }

    return {
      name: 'Mangal Dosha',
      present: false,
      description: 'No Mangal Dosha detected. Mars is well-placed.',
      remedies: []
    };
  }

  // Sade Sati
  // Saturn in 12th, 1st, 2nd from Natal Moon
  public calculateSadeSati(chart: ChartData): DoshaResult {
    const moon = chart.planets.find(p => p.name === 'Moon');
    if (!moon) return { name: 'Sade Sati', present: false, description: 'Moon position unknown', remedies: [] };

    // Get Current Transit Saturn
    const now = new Date();
    const transitChart = astronomyEngine.calculateChart(
      now.toISOString().split('T')[0], 
      '12:00', 
      'New Delhi' // Geo location matters less for planet sign
    );
    const transitSaturn = transitChart.planets.find(p => p.name === 'Saturn');

    if (!transitSaturn) return { name: 'Sade Sati', present: false, description: 'Transit data unavailable', remedies: [] };

    const moonSignIndex = ZODIAC_SIGNS.indexOf(moon.sign);
    const saturnSignIndex = ZODIAC_SIGNS.indexOf(transitSaturn.sign);

    // Calculate distance from Moon to Saturn (0 to 11)
    // Sade Sati is when Saturn is in 12th (11 signs away), 1st (0 signs), or 2nd (1 sign away) relative to Moon
    let dist = (saturnSignIndex - moonSignIndex + 12) % 12;
    
    if (dist === 11 || dist === 0 || dist === 1) {
      const phases = { 11: 'First Phase (Rising)', 0: 'Second Phase (Peak)', 1: 'Third Phase (Setting)' };
      return {
        name: 'Sade Sati',
        present: true,
        description: `Saturn is transiting ${transitSaturn.sign}, which is the ${phases[dist as 0|1|11]} relative to your Moon sign (${moon.sign}). This is a period of transformation, discipline, and karmic balancing.`,
        severity: dist === 0 ? 'High' : 'Medium',
        remedies: [
          'Chant Hanuman Chalisa.',
          'Light a sesame oil lamp under a Peepal tree on Saturdays.',
          'Perform Shani Abhishekam.',
          'Help the elderly and disabled.'
        ]
      };
    }

    return {
      name: 'Sade Sati',
      present: false,
      description: `Saturn is in ${transitSaturn.sign}, which is ${dist + 1} houses away from your Moon. No Sade Sati currently.`,
      remedies: []
    };
  }
  
  // Kalsarpa Dosha
  // All planets hemmed between Rahu and Ketu
  public calculateKalsarpaDosha(chart: ChartData): DoshaResult {
    const rahu = chart.planets.find(p => p.name === 'Rahu');
    const ketu = chart.planets.find(p => p.name === 'Ketu');
    
    if (!rahu || !ketu) return { name: 'Kaal Sarp Dosha', present: false, description: 'Nodes missing', remedies: [] };

    // Calculate the arc from Rahu to Ketu
    // Positions in absolute degrees (approx logic based on House for now, better with degrees)
    // If all other 7 planets are in houses between Rahu and Ketu (one side)
    
    // Let's use house numbers.
    // Rahu House = R, Ketu House = K
    // R to K (Forward): R, R+1, ... K
    // K to R (Forward): K, K+1, ... R
    
    const otherPlanets = chart.planets.filter(p => p.name !== 'Rahu' && p.name !== 'Ketu');
    
    // Check arc 1: Rahu -> Ketu
    let arc1Houses: number[] = [];
    let h = rahu.house;
    while (h !== ketu.house) {
      arc1Houses.push(h);
      h = (h % 12) + 1;
    }
    arc1Houses.push(ketu.house); // Include boundaries
    
    // Check arc 2: Ketu -> Rahu
    let arc2Houses: number[] = [];
    h = ketu.house;
    while (h !== rahu.house) {
      arc2Houses.push(h);
      h = (h % 12) + 1;
    }
    arc2Houses.push(rahu.house);

    const inArc1 = otherPlanets.every(p => arc1Houses.includes(p.house));
    const inArc2 = otherPlanets.every(p => arc2Houses.includes(p.house));

    if (inArc1 || inArc2) {
      return {
        name: 'Kaal Sarp Dosha',
        present: true,
        description: 'All major planets are hemmed between Rahu and Ketu. This creates intensity and struggles but can lead to great success after age 42.',
        severity: 'High',
        remedies: [
          'Chant the Maha Mrityunjaya Mantra.',
          'Worship Lord Shiva regularly (Rudra Abhishek).',
          'Release a pair of snakes (silver/copper) into a flowing river.',
          'Avoid harming snakes.'
        ]
      };
    }
    
    return {
        name: 'Kaal Sarp Dosha',
        present: false,
        description: 'No Kaal Sarp Dosha detected.',
        remedies: []
    };
  }

  // --- Yoga Detection Logic ---
  public findYogas(chart: ChartData): YogaRule[] {
    const detectedYogas: YogaRule[] = [];
    
    // Helper to get planet
    const getPlanet = (name: string) => chart.planets.find(p => p.name === name);
    
    RAMAN_YOGAS.forEach(yoga => {
        let isPresent = false;
        
        // 1. Gajakesari
        if (yoga.name.includes("Gajakesari")) {
            const jup = getPlanet("Jupiter");
            const moon = getPlanet("Moon");
            if (jup && moon) {
                const dist = (jup.house - moon.house + 12) % 12;
                if ([0, 3, 6, 9].includes(dist)) isPresent = true; // 1, 4, 7, 10
            }
        }
        // 2. Budhaditya
        else if (yoga.name.includes("Budhaditya")) {
            const sun = getPlanet("Sun");
            const mer = getPlanet("Mercury");
            if (sun && mer && sun.house === mer.house) isPresent = true;
        }
        // 3. Pancha Mahapurusha
        else if (yoga.name.includes("Pancha Mahapurusha")) {
            const pName = yoga.requiredPlanets[0];
            const p = getPlanet(pName);
            if (p) {
                const isKendra = [1, 4, 7, 10].includes(p.house);
                // Check Exaltation or Own Sign
                // Simplified: I'll use a hardcoded map for sign ownership/exaltation here for speed
                const rules: Record<string, string[]> = {
                    'Mars': ['Aries', 'Scorpio', 'Capricorn'],
                    'Mercury': ['Gemini', 'Virgo'],
                    'Jupiter': ['Sagittarius', 'Pisces', 'Cancer'],
                    'Venus': ['Taurus', 'Libra', 'Pisces'],
                    'Saturn': ['Capricorn', 'Aquarius', 'Libra']
                };
                if (isKendra && rules[pName]?.includes(p.sign)) isPresent = true;
            }
        }
        // 4. Chandra-Mangala
        else if (yoga.name.includes("Chandra-Mangala")) {
            const moon = getPlanet("Moon");
            const mars = getPlanet("Mars");
            if (moon && mars && moon.house === mars.house) isPresent = true;
        }
        // 5. Amala
        else if (yoga.name.includes("Amala")) {
             // Benefic in 10th from Lagna (House 10)
             const benefics = chart.planets.filter(p => ['Jupiter', 'Venus', 'Mercury'].includes(p.name) && p.house === 10);
             if (benefics.length > 0) isPresent = true;
        }
        // 6. Parivartana (Generic)
        else if (yoga.name.includes("Parivartana")) {
             // Exchange logic
             const lords: Record<string, string> = {
               'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
               'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
               'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
             };
             for (let p1 of chart.planets) {
                 for (let p2 of chart.planets) {
                     if (p1 === p2) continue;
                     const lord1 = lords[p1.sign];
                     const lord2 = lords[p2.sign];
                     if (lord1 === p2.name && lord2 === p1.name) isPresent = true;
                 }
             }
        }
        // 7. Kemadruma
        else if (yoga.name.includes("Kemadruma")) {
            const moon = getPlanet("Moon");
            if (moon) {
                const prev = (moon.house - 2 + 12) % 12 + 1; // 12th from Moon
                const next = (moon.house) % 12 + 1; // 2nd from Moon
                const hasPrev = chart.planets.some(p => p.house === prev && !['Sun', 'Rahu', 'Ketu', 'Moon'].includes(p.name));
                const hasNext = chart.planets.some(p => p.house === next && !['Sun', 'Rahu', 'Ketu', 'Moon'].includes(p.name));
                // Also check cancellation (Kendra from Lagna) - simplified: just check houses
                if (!hasPrev && !hasNext) isPresent = true;
            }
        }
        // 8. Vipareeta
        else if (yoga.name.includes("Vipareeta")) {
            // Need house lords which requires knowing Ascendant.
            // Chart data has 'ascendant' sign.
            const lords: Record<string, string> = {
               'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
               'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
               'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
            };
            // Ascendant sign index
            const signs = ZODIAC_SIGNS;
            const ascIndex = signs.indexOf(chart.ascendant);
            
            const getLordOfHouse = (h: number) => {
                const signIndex = (ascIndex + h - 1) % 12;
                return lords[signs[signIndex]];
            };
            
            const lord6 = getLordOfHouse(6);
            const lord8 = getLordOfHouse(8);
            const lord12 = getLordOfHouse(12);
            
            const getHouseOfPlanet = (pName: string) => chart.planets.find(p => p.name === pName)?.house;
            
            const dusthana = [6, 8, 12];
            
            if (yoga.name.includes("Harsha") && dusthana.includes(getHouseOfPlanet(lord6) || 0)) isPresent = true;
            if (yoga.name.includes("Sarala") && dusthana.includes(getHouseOfPlanet(lord8) || 0)) isPresent = true;
            if (yoga.name.includes("Vimala") && dusthana.includes(getHouseOfPlanet(lord12) || 0)) isPresent = true;
        }
        // 9. Dharma Karma Adhipati
        else if (yoga.name.includes("Dharma Karma")) {
             const signs = ZODIAC_SIGNS;
             const lords: Record<string, string> = {
               'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
               'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
               'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
             };
             const ascIndex = signs.indexOf(chart.ascendant);
             const getLordOfHouse = (h: number) => lords[signs[(ascIndex + h - 1) % 12]];
             
             const lord9 = getLordOfHouse(9);
             const lord10 = getLordOfHouse(10);
             
             const p9 = getPlanet(lord9);
             const p10 = getPlanet(lord10);
             
             if (p9 && p10) {
                 // Conjoined
                 if (p9.house === p10.house) isPresent = true;
                 // Exchange
                 const lord9SignLord = lords[p9.sign];
                 const lord10SignLord = lords[p10.sign];
                 if (lord9SignLord === lord10 && lord10SignLord === lord9) isPresent = true;
             }
        }
        // 10. Vasumathi
        else if (yoga.name.includes("Vasumathi")) {
            const upachaya = [3, 6, 10, 11];
            const benefics = ['Jupiter', 'Venus', 'Mercury'];
            // Check from Lagna
            const allInUpachaya = benefics.every(b => {
                const p = getPlanet(b);
                return p && upachaya.includes(p.house);
            });
            if (allInUpachaya) isPresent = true;
        }
        
        if (isPresent) detectedYogas.push(yoga);
    });
    
    return detectedYogas;
  }

}

export const vedicLogicService = new VedicLogicService();
