/**
 * Debug Test Case 2 Ascendant Calculation
 * Kundali PDF shows Gemini, but app calculates Taurus
 */

import { calculateAscendant, SiderealTime } from './src/services/calculations/astronomy.js';

// Birth data from Kundali PDF
const birthDate = new Date(1992, 4, 26, 7, 50); // May 26, 1992, 7:50 AM
const latitude = 26.9025;
const longitude = 83.9822;
const timezoneOffset = 5.5; // IST

console.log('='.repeat(70));
console.log('DEBUGGING TEST CASE 2 ASCENDANT');
console.log('='.repeat(70));
console.log('');
console.log('Birth Details:');
console.log('  Date: May 26, 1992');
console.log('  Time: 7:50 AM IST');
console.log('  Place: Padrauna, UP');
console.log('  Coordinates: 26.9025 N, 83.9822 E');
console.log('');
console.log('Expected from Kundali PDF: Gemini (Mithuna)');
console.log('Gemini range: 60-90 degrees');
console.log('');

// Calculate Ascendant
const ascDeg = calculateAscendant(birthDate, latitude, longitude, timezoneOffset);
const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ascSign = signs[Math.floor(ascDeg / 30)];

console.log('='.repeat(70));
console.log('OUR CALCULATION:');
console.log('  Ascendant: ' + ascSign + ' at ' + (ascDeg % 30).toFixed(2) + ' degrees');
console.log('  Absolute longitude: ' + ascDeg.toFixed(2) + ' degrees');
console.log('');

if (ascSign !== 'Gemini') {
    console.log('ERROR: Mismatch!');
    console.log('  Expected: Gemini (60-90 deg)');
    console.log('  Actual: ' + ascSign + ' (' + ascDeg.toFixed(2) + ' deg)');
    console.log('  Difference: ' + Math.abs(75 - ascDeg).toFixed(2) + ' degrees off from Gemini midpoint');
} else {
    console.log('SUCCESS: Matches Kundali PDF!');
}
console.log('');

// Additional verification using Ishta Kaal
console.log('='.repeat(70));
console.log('ADDITIONAL INFO FROM KUNDALI PDF:');
console.log('  Ishta Kaal: 6 Ghati 35 Pal');
console.log('  (Time from sunrise = ~2 hours 38 minutes)');
console.log('  Sun Sign: Taurus (Vrishabha)');
console.log('  Karana: Gara');
console.log('='.repeat(70));
