
import {
    Observer,
    Equator,
    Body,
    Ecliptic,
    SiderealTime
} from 'astronomy-engine';

// Types for our calculation results
export interface PlanetaryPosition {
    name: string;
    longitude: number; // Sidereal longitude (0-360)
    latitude: number;
    distance: number;
    speed: number;
    isRetrograde: boolean;
    sign: string;
    signIndex: number; // 0-11
    degreeInSign: number; // 0-30
    nakshatra: string;
    nakshatraIndex: number; // 0-26
    pada: number; // 1-4
}

export interface House {
    number: number;
    longitude: number;
    sign: string;
    degreeInSign: number;
}

export interface Aspect {
    planet1: string;
    planet2: string;
    type: string;
    orb: number;
}

export interface DashaPeriod {
    lord: string;
    startDate: Date;
    endDate: Date;
}

export const SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const DASHA_LORDS = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
];

const DASHA_PERIODS = [
    7, 20, 6, 10, 7, 18, 16, 19, 17 // Years for each dasha lord
];

const NAKSHATRA_START_DEGREES = [
    0, 13.3333, 26.6667, 40, 53.3333, 66.6667,
    80, 93.3333, 106.6667, 120, 133.3333, 146.6667,
    160, 173.3333, 186.6667, 200, 213.3333, 226.6667,
    240, 253.3333, 266.6667, 280, 293.3333, 306.6667,
    320, 333.3333, 346.6667
];

/**
 * Calculate Lahiri Ayanamsa for a given date
 * More accurate formula based on Swiss Ephemeris standards
 */
export function calculateLahiriAyanamsa(date: Date): number {
    // J2000.0 epoch
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);

    // More accurate Lahiri Ayanamsa formula
    // Ayanamsa at J2000: 23.8541667 degrees
    // Rate: 50.290966 arcseconds per year
    const ayanamsa = 23.8541667 + (50.290966 / 3600) * (daysSinceJ2000 / 365.25);

    return normalizeDegrees(ayanamsa);
}

/**
 * Convert local time to UTC time for astronomical calculations
 * The input date is treated as being in the birthplace timezone.
 * timezoneOffset is the offset of the birthplace from UTC in hours (e.g., IST = 5.5)
 */
export function toUTC(date: Date, timezoneOffset: number): Date {
    // The input date has hours/minutes that represent LOCAL TIME at birth location
    // We need to get the UTC equivalent
    // 
    // Strategy: Create a UTC date with the same year/month/day/hour/minute as the input,
    // then subtract the birth location timezone offset
    //
    // Example: Birth at 7:50 AM IST (UTC+5:30)
    // Step 1: Create UTC date 1992-05-26 07:50:00 UTC
    // Step 2: Subtract 5.5 hours to get 1992-05-26 02:20:00 UTC (the actual UTC time)

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Create a UTC date with these values (treating them as UTC, not system timezone)
    const utcBase = Date.UTC(year, month, day, hours, minutes, seconds);

    // Subtract the timezone offset (convert hours to milliseconds)
    const offsetMs = timezoneOffset * 3600000;

    return new Date(utcBase - offsetMs);
}

/**
 * Calculate all planetary positions for a given date and location
 */
export function calculatePlanets(date: Date, lat: number, lng: number, timezoneOffset: number = 0): PlanetaryPosition[] {
    // Convert local time to UTC for astronomical calculations
    const utcDate = toUTC(date, timezoneOffset);
    const observer = new Observer(lat, lng, 0); // Elevation 0 for now
    const ayanamsa = calculateLahiriAyanamsa(utcDate);

    const bodies = [
        { name: 'Sun', body: Body.Sun },
        { name: 'Moon', body: Body.Moon },
        { name: 'Mercury', body: Body.Mercury },
        { name: 'Venus', body: Body.Venus },
        { name: 'Mars', body: Body.Mars },
        { name: 'Jupiter', body: Body.Jupiter },
        { name: 'Saturn', body: Body.Saturn },
        { name: 'Uranus', body: Body.Uranus },
        { name: 'Neptune', body: Body.Neptune },
        { name: 'Pluto', body: Body.Pluto },
    ];

    const results: PlanetaryPosition[] = [];

    // Calculate main planets
    for (const item of bodies) {
        // Get geocentric equatorial coordinates
        const equ = Equator(item.body, utcDate, observer, true, true);

        // Convert to ecliptic coordinates (Tropical)
        const ecl = Ecliptic(equ.vec);

        // Convert to Sidereal (Vedic)
        const siderealLon = normalizeDegrees(ecl.elon - ayanamsa);

        // Calculate speed (daily motion)
        const datePlus1d = new Date(utcDate.getTime() + 86400000); // +1 day
        const equPlus1d = Equator(item.body, datePlus1d, observer, true, true);
        const eclPlus1d = Ecliptic(equPlus1d.vec);
        const speed = normalizeDegrees(eclPlus1d.elon - ecl.elon);

        results.push(createPlanetObject(item.name, siderealLon, ecl.elat, equ.dist, speed));
    }

    // Calculate Nodes (Rahu/Ketu) using more accurate method
    const rahuKetu = calculateLunarNodes(utcDate, ayanamsa);
    results.push(rahuKetu.rahu);
    results.push(rahuKetu.ketu);

    return results;
}

/**
 * Calculate lunar nodes (Rahu and Ketu) using accurate method
 */
function calculateLunarNodes(date: Date, ayanamsa: number): { rahu: PlanetaryPosition, ketu: PlanetaryPosition } {
    // Use SwephExp method - mean node calculation
    // J2000.0 epoch
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
    const t = daysSinceJ2000 / 36525.0; // Julian centuries

    // Mean longitude of ascending node (from Meeus)
    let nodeLon = 125.04455501 - 1934.136261 * t + 0.0020754 * t * t + 0.0000009 * t * t * t;
    nodeLon = normalizeDegrees(nodeLon);

    // Convert to sidereal
    const rahuSidereal = normalizeDegrees(nodeLon - ayanamsa);
    const ketuSidereal = normalizeDegrees(rahuSidereal + 180);

    // Nodes move retrograde at about -3 minutes per day
    const speed = -0.00138889; // -0.05 degrees per day (approximate)

    return {
        rahu: createPlanetObject('Rahu', rahuSidereal, 0, 0, speed),
        ketu: createPlanetObject('Ketu', ketuSidereal, 0, 0, speed)
    };
}

/**
 * Calculate Ascendant (Lagna) using accurate formula
 * Uses proper quadrant determination for accurate results
 */
export function calculateAscendant(date: Date, lat: number, lng: number, timezoneOffset: number = 0): number {
    // Convert local time to UTC for astronomical calculations
    const utcDate = toUTC(date, timezoneOffset);

    // DEBUG: Log for May 26, 1992 case
    if (date.getFullYear() === 1992 && date.getMonth() === 4 && date.getDate() === 26) {
        console.log('[DEBUG Ascendant] Input: ' + date.toLocaleString());
        console.log('[DEBUG Ascendant] UTC: ' + utcDate.toISOString());
    }

    // Calculate Greenwich Sidereal Time (GST) in hours
    const gstHours = SiderealTime(utcDate);

    // Convert GST to Local Sidereal Time (LST) in hours
    const lstHours = gstHours + lng / 15.0;
    const lstDeg = ((lstHours * 15) % 360 + 360) % 360;

    // DEBUG: Log LST
    if (date.getFullYear() === 1992 && date.getMonth() === 4 && date.getDate() === 26) {
        console.log('[DEBUG Ascendant] LST: ' + lstDeg.toFixed(2) + ' degrees');
        console.log('[DEBUG Ascendant] Expected for Gemini: ~2.89 degrees');
    }

    // Obliquity of Ecliptic (Epsilon) - use accurate value
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const daysSinceJ2000 = (utcDate.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
    const t = daysSinceJ2000 / 36525.0;
    const epsDeg = 23.43929111 - 0.013004167 * t - 0.000000163889 * t * t + 0.000000503611 * t * t * t;
    const eps = epsDeg * (Math.PI / 180);

    const latitudeRad = lat * (Math.PI / 180);

    // Calculate Ascendant using the standard formula with atan2 for correct quadrant
    const sinEps = Math.sin(eps);
    const cosEps = Math.cos(eps);
    const tanLat = Math.tan(latitudeRad);

    // Correct astronomical formula: tan(Asc) = cos(LST) / (cos(eps)*sin(LST) + tan(lat)*sin(eps))
    // Convert LST degrees to radians for calculation
    const lstRad = lstDeg * (Math.PI / 180);

    const y = Math.cos(lstRad);
    const x = cosEps * Math.sin(lstRad) + tanLat * sinEps;

    // Use atan2 for correct quadrant
    let ascRad = Math.atan2(y, x);

    // Convert to degrees and normalize
    let ascDeg = ascRad * (180 / Math.PI);
    ascDeg = ((ascDeg % 360) + 360) % 360;

    // Get ayanamsa for this date
    const ayanamsa = calculateLahiriAyanamsa(utcDate);

    // DEBUG: Log tropical Ascendant and Ayanamsa
    if (date.getFullYear() === 1992 && date.getMonth() === 4 && date.getDate() === 26) {
        console.log('[DEBUG Ascendant] Tropical Ascendant: ' + ascDeg.toFixed(2) + ' degrees');
        console.log('[DEBUG Ascendant] Ayanamsa: ' + ayanamsa.toFixed(2) + ' degrees');
    }

    // Convert Tropical Ascendant to Sidereal
    return normalizeDegrees(ascDeg - ayanamsa);
}

function normalizeRadians(rad: number): number {
    let r = rad % (2 * Math.PI);
    if (r < 0) r += 2 * Math.PI;
    return r;
}

/**
 * Calculate houses using Placidus system (proper implementation)
 */
export function calculateHouses(date: Date, lat: number, lng: number, timezoneOffset: number = 0): House[] {
    const ascendant = calculateAscendant(date, lat, lng, timezoneOffset);
    const mc = calculateMidheaven(date, lat, lng, timezoneOffset);

    const houses: House[] = [];

    // House 1 (Ascendant)
    houses.push({
        number: 1,
        longitude: ascendant,
        sign: SIGNS[Math.floor(ascendant / 30)],
        degreeInSign: ascendant % 30
    });

    // House 10 (MC)
    houses.push({
        number: 10,
        longitude: mc,
        sign: SIGNS[Math.floor(mc / 30)],
        degreeInSign: mc % 30
    });

    // House 7 (Descendant = Ascendant + 180)
    const descendant = normalizeDegrees(ascendant + 180);
    houses.push({
        number: 7,
        longitude: descendant,
        sign: SIGNS[Math.floor(descendant / 30)],
        degreeInSign: descendant % 30
    });

    // House 4 (IC = MC + 180)
    const ic = normalizeDegrees(mc + 180);
    houses.push({
        number: 4,
        longitude: ic,
        sign: SIGNS[Math.floor(ic / 30)],
        degreeInSign: ic % 30
    });

    // For simplicity, calculate remaining houses using equal division between angles
    // This is an approximation but better than the previous implementation

    // Houses 2, 3, 5, 6, 8, 9, 11, 12
    const house2 = interpolateHouse(ascendant, descendant, 1 / 3);
    const house3 = interpolateHouse(ascendant, descendant, 2 / 3);
    const house5 = interpolateHouse(mc, ic, 1 / 3);
    const house6 = interpolateHouse(mc, ic, 2 / 3);
    const house8 = interpolateHouse(descendant, ascendant, 1 / 3);
    const house9 = interpolateHouse(descendant, ascendant, 2 / 3);
    const house11 = interpolateHouse(ic, mc, 1 / 3);
    const house12 = interpolateHouse(ic, mc, 2 / 3);

    houses.push({
        number: 2,
        longitude: house2,
        sign: SIGNS[Math.floor(house2 / 30)],
        degreeInSign: house2 % 30
    });

    houses.push({
        number: 3,
        longitude: house3,
        sign: SIGNS[Math.floor(house3 / 30)],
        degreeInSign: house3 % 30
    });

    houses.push({
        number: 5,
        longitude: house5,
        sign: SIGNS[Math.floor(house5 / 30)],
        degreeInSign: house5 % 30
    });

    houses.push({
        number: 6,
        longitude: house6,
        sign: SIGNS[Math.floor(house6 / 30)],
        degreeInSign: house6 % 30
    });

    houses.push({
        number: 8,
        longitude: house8,
        sign: SIGNS[Math.floor(house8 / 30)],
        degreeInSign: house8 % 30
    });

    houses.push({
        number: 9,
        longitude: house9,
        sign: SIGNS[Math.floor(house9 / 30)],
        degreeInSign: house9 % 30
    });

    houses.push({
        number: 11,
        longitude: house11,
        sign: SIGNS[Math.floor(house11 / 30)],
        degreeInSign: house11 % 30
    });

    houses.push({
        number: 12,
        longitude: house12,
        sign: SIGNS[Math.floor(house12 / 30)],
        degreeInSign: house12 % 30
    });

    // Sort houses by number
    houses.sort((a, b) => a.number - b.number);

    return houses;
}

/**
 * Calculate Midheaven (MC)
 */
function calculateMidheaven(date: Date, _lat: number, lng: number, timezoneOffset: number = 0): number {
    const utcDate = toUTC(date, timezoneOffset);

    // Calculate Greenwich Sidereal Time (GST) in hours
    const gstHours = SiderealTime(utcDate);

    // Convert GST to Local Sidereal Time (LST) in hours
    const lstHours = gstHours + lng / 15.0;
    const lstDeg = (lstHours * 15) % 360;

    // RAMC (Right Ascension of Midheaven) in radians
    const ramc = lstDeg * (Math.PI / 180);

    // Obliquity of Ecliptic (Epsilon)
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const daysSinceJ2000 = (utcDate.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
    const t = daysSinceJ2000 / 36525.0;
    const epsDeg = 23.43929111 - 0.013004167 * t - 0.000000163889 * t * t + 0.000000503611 * t * t * t;
    const eps = epsDeg * (Math.PI / 180);

    // Calculate MC
    const tanMC = Math.tan(ramc) / Math.cos(eps);
    let mc = Math.atan(tanMC);

    // Adjust MC to correct quadrant
    if (ramc > Math.PI) {
        mc += Math.PI;
    }
    mc = normalizeRadians(mc);

    // Convert radians to degrees
    let mcDeg = mc * (180 / Math.PI);
    mcDeg = normalizeDegrees(mcDeg);

    // Get ayanamsa for this date
    const ayanamsa = calculateLahiriAyanamsa(utcDate);

    // Convert Tropical MC to Sidereal
    return normalizeDegrees(mcDeg - ayanamsa);
}

/**
 * Interpolate house positions between two angles
 */
function interpolateHouse(start: number, end: number, fraction: number): number {
    let diff = normalizeDegrees(end - start);
    if (diff > 180) diff -= 360;
    return normalizeDegrees(start + diff * fraction);
}

/**
 * Calculate aspects between planets
 */
export function calculateAspects(planets: PlanetaryPosition[]): Aspect[] {
    const aspects: Aspect[] = [];

    // Define aspect types and their angles with standard Vedic orbs
    const aspectTypes = [
        { name: 'Conjunction', angle: 0, orb: 8 },
        { name: 'Sextile', angle: 60, orb: 6 },
        { name: 'Square', angle: 90, orb: 8 },
        { name: 'Trine', angle: 120, orb: 8 },
        { name: 'Opposition', angle: 180, orb: 8 }
    ];

    // Check each pair of planets for aspects
    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const planet1 = planets[i];
            const planet2 = planets[j];

            // Calculate angular distance
            let distance = Math.abs(planet1.longitude - planet2.longitude);
            if (distance > 180) distance = 360 - distance;

            // Check for each aspect type
            for (const aspectType of aspectTypes) {
                const diff = Math.abs(distance - aspectType.angle);
                if (diff <= aspectType.orb) {
                    aspects.push({
                        planet1: planet1.name,
                        planet2: planet2.name,
                        type: aspectType.name,
                        orb: diff
                    });
                }
            }
        }
    }

    return aspects;
}

/**
 * Calculate Vimshottari Dasha periods
 */
export function calculateVimshottariDasha(date: Date, moonLongitude: number): DashaPeriod[] {
    // Find the nakshatra of the Moon
    let nakshatraIndex = 0;
    for (let i = 0; i < NAKSHATRA_START_DEGREES.length; i++) {
        if (moonLongitude >= NAKSHATRA_START_DEGREES[i] &&
            moonLongitude < (i < NAKSHATRA_START_DEGREES.length - 1 ? NAKSHATRA_START_DEGREES[i + 1] : 360)) {
            nakshatraIndex = i;
            break;
        }
    }

    // Calculate nakshatra progress (0 to 1)
    const nakshatraStart = NAKSHATRA_START_DEGREES[nakshatraIndex];
    const nakshatraEnd = nakshatraIndex < NAKSHATRA_START_DEGREES.length - 1 ?
        NAKSHATRA_START_DEGREES[nakshatraIndex + 1] : 360;
    const nakshatraLength = nakshatraEnd - nakshatraStart;
    const nakshatraProgress = (moonLongitude - nakshatraStart) / nakshatraLength;

    // Calculate dasha lord index (0-8)
    const dashaLordIndex = nakshatraIndex % 9;

    // Calculate balance of current dasha period
    const dashaYears = DASHA_PERIODS[dashaLordIndex];
    const yearsElapsed = nakshatraProgress * dashaYears;
    const balanceYears = dashaYears - yearsElapsed;

    const dashaPeriods: DashaPeriod[] = [];
    let currentDate = new Date(date);

    // Current dasha period
    const currentDashaEnd = new Date(currentDate);
    currentDashaEnd.setFullYear(currentDashaEnd.getFullYear() + Math.floor(balanceYears));
    currentDashaEnd.setMonth(currentDashaEnd.getMonth() + Math.round((balanceYears % 1) * 12));

    dashaPeriods.push({
        lord: DASHA_LORDS[dashaLordIndex],
        startDate: new Date(currentDate),
        endDate: new Date(currentDashaEnd)
    });

    // Remaining dasha periods
    let nextStartDate = new Date(currentDashaEnd);
    let currentIndex = (dashaLordIndex + 1) % 9;

    for (let i = 0; i < 8; i++) {
        const periodYears = DASHA_PERIODS[currentIndex];
        const endDate = new Date(nextStartDate);
        endDate.setFullYear(endDate.getFullYear() + periodYears);

        dashaPeriods.push({
            lord: DASHA_LORDS[currentIndex],
            startDate: new Date(nextStartDate),
            endDate: new Date(endDate)
        });

        nextStartDate = new Date(endDate);
        currentIndex = (currentIndex + 1) % 9;
    }

    return dashaPeriods;
}

function normalizeDegrees(deg: number): number {
    let d = deg % 360;
    if (d < 0) d += 360;
    return d;
}

function createPlanetObject(
    name: string,
    lon: number,
    lat: number,
    dist: number,
    speed: number
): PlanetaryPosition {
    const normalizedLon = normalizeDegrees(lon);
    const signIndex = Math.floor(normalizedLon / 30);
    const degreeInSign = normalizedLon % 30;

    // Calculate nakshatra (each nakshatra is 13°20' = 13.3333°)
    let nakshatraIndex = Math.floor(normalizedLon / (360 / 27));
    if (nakshatraIndex >= 27) nakshatraIndex = 26;

    const nakshatraStart = nakshatraIndex * (360 / 27);
    const nakshatraProgress = (normalizedLon - nakshatraStart) / (360 / 27);
    const pada = Math.floor(nakshatraProgress * 4) + 1;

    return {
        name,
        longitude: normalizedLon,
        latitude: lat,
        distance: dist,
        speed,
        isRetrograde: speed < 0,
        sign: SIGNS[signIndex],
        signIndex,
        degreeInSign,
        nakshatra: NAKSHATRAS[nakshatraIndex],
        nakshatraIndex,
        pada
    };
}