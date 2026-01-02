/**
 * Comprehensive Vedic Astrology Terminal Test
 * Tests 2 birth charts to verify calculations
 * Run with: npx tsx test_comprehensive.ts
 */

import { calculatePlanets, calculateAscendant, SIGNS, calculateVimshottariDasha } from './src/services/calculations/astronomy.js';

interface TestCase {
    name: string;
    date: Date;
    latitude: number;
    longitude: number;
    location: string;
    expectedRashi: string;
    expectedNakshatra: string;
    expectedManglik: boolean;
}

const testCases: TestCase[] = [
    {
        name: 'Test Case 1',
        date: new Date(1997, 9, 11, 6, 45), // Oct 11, 1997, 6:45 AM
        latitude: 26.76,
        longitude: 83.37,
        location: 'Pipraich (Gorakhpur), India',
        expectedRashi: 'Capricorn',
        expectedNakshatra: 'Shravana',
        expectedManglik: false
    },
    {
        name: 'Test Case 2',
        date: new Date(1992, 4, 26, 7, 50), // May 26, 1992, 7:50 AM per Kundali PDF
        latitude: 26.9025,
        longitude: 83.9822,
        location: 'Padrauna, UP, India',
        expectedRashi: 'Aquarius',
        expectedNakshatra: 'Shatabhisha or Dhanishta',
        expectedManglik: false
    }
];

const timezoneOffset = 5.5; // IST

console.log('='.repeat(70));
console.log('COMPREHENSIVE VEDIC ASTROLOGY VERIFICATION TEST');
console.log('='.repeat(70));
console.log('');

testCases.forEach((testCase, index) => {
    console.log('='.repeat(70));
    console.log(`${testCase.name.toUpperCase()}`);
    console.log('='.repeat(70));
    console.log(`  Date: ${testCase.date.toLocaleDateString()}`);
    console.log(`  Time: ${testCase.date.toLocaleTimeString('en-US', { hour12: true })}`);
    console.log(`  Location: ${testCase.location}`);
    console.log(`  Coordinates: ${testCase.latitude}N, ${testCase.longitude}E`);
    console.log('');

    // Calculate planets
    const planets = calculatePlanets(testCase.date, testCase.latitude, testCase.longitude, timezoneOffset);

    // Calculate Ascendant
    const ascendantDeg = calculateAscendant(testCase.date, testCase.latitude, testCase.longitude, timezoneOffset);
    const ascSignIndex = Math.floor(ascendantDeg / 30);
    const ascSign = SIGNS[ascSignIndex];

    // Find Moon
    const moon = planets.find(p => p.name === 'Moon');

    // Find Mars
    const mars = planets.find(p => p.name === 'Mars');

    console.log('RESULTS:');
    console.log('-'.repeat(70));

    // Ascendant
    console.log(`  Ascendant (Lagna): ${ascSign} at ${(ascendantDeg % 30).toFixed(2)}°`);
    console.log('');

    // Moon
    if (moon) {
        console.log(`  Moon Sign (Rashi): ${moon.sign}`);
        console.log(`  Moon Degree: ${moon.degreeInSign.toFixed(2)}°`);
        console.log(`  Nakshatra: ${moon.nakshatra} (Pada ${moon.pada})`);
        console.log('');
    }

    // Manglik check
    if (mars && moon) {
        const marsHouseFromLagna = ((mars.signIndex - ascSignIndex + 12) % 12) + 1;
        const marsHouseFromMoon = ((mars.signIndex - moon.signIndex + 12) % 12) + 1;

        const manglikHouses = [1, 2, 4, 7, 8, 12];
        const isManglikLagna = manglikHouses.includes(marsHouseFromLagna);
        const isManglikMoon = manglikHouses.includes(marsHouseFromMoon);
        const isManglik = isManglikLagna || isManglikMoon;

        console.log(`  Mars: ${mars.sign} at ${mars.degreeInSign.toFixed(2)}°`);
        console.log(`  Mars House from Lagna: ${marsHouseFromLagna}${isManglikLagna ? ' (MANGLIK)' : ''}`);
        console.log(`  Mars House from Moon: ${marsHouseFromMoon}${isManglikMoon ? ' (MANGLIK)' : ''}`);
        console.log(`  Overall Manglik Status: ${isManglik ? 'YES' : 'NO'}`);
        console.log('');
    }

    // Dasha
    if (moon) {
        const dashas = calculateVimshottariDasha(testCase.date, moon.longitude);
        console.log(`  Dasha at Birth: ${dashas[0].lord} Mahadasha`);

        const now = new Date();
        const currentDasha = dashas.find(d => now >= d.startDate && now <= d.endDate);
        if (currentDasha) {
            console.log(`  Current Dasha: ${currentDasha.lord} Mahadasha`);
        }
        console.log('');
    }

    // Comparison
    console.log('EXPECTED vs ACTUAL:');
    console.log('-'.repeat(70));

    const rashiMatch = moon?.sign === testCase.expectedRashi;
    const nakshatraMatch = moon?.nakshatra === testCase.expectedNakshatra ||
        testCase.expectedNakshatra.includes(moon?.nakshatra || '');

    console.log(`  Rashi:`);
    console.log(`    Expected: ${testCase.expectedRashi}`);
    console.log(`    Actual: ${moon?.sign || 'N/A'}`);
    console.log(`    Match: ${rashiMatch ? 'YES ✓' : 'NO ✗'}`);
    console.log('');

    console.log(`  Nakshatra:`);
    console.log(`    Expected: ${testCase.expectedNakshatra}`);
    console.log(`    Actual: ${moon?.nakshatra || 'N/A'}`);
    console.log(`    Match: ${nakshatraMatch ? 'YES ✓' : 'NO ✗'}`);
    console.log('');

    if (mars) {
        const marsHouseFromLagna = ((mars.signIndex - ascSignIndex + 12) % 12) + 1;
        const marsHouseFromMoon = ((mars.signIndex - (moon?.signIndex || 0) + 12) % 12) + 1;
        const manglikHouses = [1, 2, 4, 7, 8, 12];
        const isManglik = manglikHouses.includes(marsHouseFromLagna) || manglikHouses.includes(marsHouseFromMoon);
        const manglikMatch = isManglik === testCase.expectedManglik;

        console.log(`  Manglik:`);
        console.log(`    Expected: ${testCase.expectedManglik ? 'YES' : 'NO'}`);
        console.log(`    Actual: ${isManglik ? 'YES' : 'NO'}`);
        console.log(`    Match: ${manglikMatch ? 'YES ✓' : 'NO ✗'}`);
    }

    console.log('');

    // Planetary positions table
    console.log('ALL PLANETARY POSITIONS:');
    console.log('-'.repeat(70));
    console.log('Planet       Sign           Degree    Nakshatra          House  Retro');
    console.log('-'.repeat(70));

    planets.forEach(p => {
        const retro = p.isRetrograde ? 'R' : '-';
        const house = ((p.signIndex - ascSignIndex + 12) % 12) + 1;
        const name = p.name.padEnd(12);
        const sign = p.sign.padEnd(14);
        const deg = p.degreeInSign.toFixed(2).padStart(6);
        const nak = p.nakshatra.padEnd(18);
        console.log(`${name} ${sign} ${deg}    ${nak} ${house.toString().padStart(2)}     ${retro}`);
    });

    console.log('');
});

console.log('='.repeat(70));
console.log('TEST SUMMARY');
console.log('='.repeat(70));
console.log('');
console.log('If all tests show matches (✓), calculations are accurate!');
console.log('If any test shows (✗), there may be calculation issues to fix.');
console.log('');
