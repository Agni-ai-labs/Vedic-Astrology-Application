/**
 * Terminal Verification Test for Vedic Calculations
 * Run with: npx tsx test_terminal.ts
 * 
 * Birth Data:
 * - Date: October 11, 1997
 * - Time: 6:45 AM IST
 * - Place: Pipraich (Gorakhpur), India
 * - Coordinates: 26.76 N, 83.37 E
 */

import { calculatePlanets, calculateAscendant, SIGNS, calculateVimshottariDasha } from './src/services/calculations/astronomy.js';

// Birth details
const birthDate = new Date(1997, 9, 11); // October 11, 1997 (month 0-indexed)
birthDate.setHours(6, 45, 0, 0);

const latitude = 26.76;   // Gorakhpur
const longitude = 83.37;
const timezoneOffset = 5.5; // IST

console.log('='.repeat(60));
console.log('VEDIC ASTROLOGY TERMINAL VERIFICATION TEST');
console.log('='.repeat(60));
console.log('');
console.log('Birth Details:');
console.log('  Date: October 11, 1997');
console.log('  Time: 6:45 AM IST');
console.log('  Place: Pipraich (Gorakhpur), India');
console.log('  Coordinates: 26.76 N, 83.37 E');
console.log('');

// Calculate planets
const planets = calculatePlanets(birthDate, latitude, longitude, timezoneOffset);

// Calculate Ascendant
const ascendantDeg = calculateAscendant(birthDate, latitude, longitude, timezoneOffset);
const ascSignIndex = Math.floor(ascendantDeg / 30);
const ascSign = SIGNS[ascSignIndex];

console.log('-'.repeat(60));
console.log('RESULTS');
console.log('-'.repeat(60));
console.log('');

// Ascendant
console.log('ASCENDANT (LAGNA):');
console.log('  Sign: ' + ascSign);
console.log('  Degree: ' + (ascendantDeg % 30).toFixed(2));
console.log('');

// Find Moon
const moon = planets.find(p => p.name === 'Moon');
if (moon) {
    console.log('MOON (RASHI):');
    console.log('  Sign: ' + moon.sign);
    console.log('  Degree: ' + moon.degreeInSign.toFixed(2));
    console.log('  Nakshatra: ' + moon.nakshatra);
    console.log('  Pada: ' + moon.pada);
    console.log('');
}

// Find Mars for Manglik check
const mars = planets.find(p => p.name === 'Mars');
if (mars) {
    // Calculate house from Lagna
    const marsHouse = ((mars.signIndex - ascSignIndex + 12) % 12) + 1;
    const manglikHouses = [1, 2, 4, 7, 8, 12];
    const isManglik = manglikHouses.includes(marsHouse);

    console.log('MANGLIK DOSHA:');
    console.log('  Mars Sign: ' + mars.sign);
    console.log('  Mars House from Lagna: ' + marsHouse);
    console.log('  Is Manglik: ' + (isManglik ? 'YES' : 'NO'));
    console.log('');
}

// Dasha
if (moon) {
    const moonLongitude = moon.longitude;
    const dashas = calculateVimshottariDasha(birthDate, moonLongitude);

    console.log('VIMSHOTTARI DASHA:');
    console.log('  First Dasha at birth: ' + dashas[0].lord);

    // Find current dasha
    const now = new Date();
    const currentDasha = dashas.find(d => now >= d.startDate && now <= d.endDate);
    if (currentDasha) {
        console.log('  Current Dasha: ' + currentDasha.lord);
    }
    console.log('');
}

// All planets summary
console.log('-'.repeat(60));
console.log('ALL PLANETARY POSITIONS');
console.log('-'.repeat(60));
console.log('');
console.log('Planet       Sign           Degree    Nakshatra          Retro');
console.log('-'.repeat(60));

planets.forEach(p => {
    const retro = p.isRetrograde ? 'R' : '-';
    const name = p.name.padEnd(12);
    const sign = p.sign.padEnd(14);
    const deg = p.degreeInSign.toFixed(2).padStart(6);
    const nak = p.nakshatra.padEnd(18);
    console.log(name + ' ' + sign + ' ' + deg + '    ' + nak + ' ' + retro);
});

console.log('');
console.log('='.repeat(60));
console.log('EXPECTED vs ACTUAL:');
console.log('  Moon Sign - Expected: Capricorn, Actual: ' + (moon?.sign || 'N/A'));
console.log('  Nakshatra - Expected: Shravana, Actual: ' + (moon?.nakshatra || 'N/A'));
console.log('  Manglik - Expected: NO');
console.log('='.repeat(60));
