/**
 * Test different time/coordinate scenarios for Test Case 2
 * to match Gemini Ascendant from Kundali PDF
 */

import { calculateAscendant } from './src/services/calculations/astronomy.js';

const latitude = 26.9025;
const longitude = 83.9822;
const timezoneOffset = 5.5; // IST

console.log('Testing different scenarios to match Gemini Ascendant');
console.log('='.repeat(70));
console.log('');

// Scenario 1: Original (7:50 AM IST)
const time1 = new Date(1992, 4, 26, 7, 50);
const asc1 = calculateAscendant(time1, latitude, longitude, timezoneOffset);
console.log('Scenario 1: 7:50 AM IST');
console.log('  Ascendant: ' + asc1.toFixed(2) + ' deg = ' + getSign(asc1));
console.log('');

// Scenario 2: If "Standard Time" means UTC+5:30 but interpreted as local
const time2 = new Date(1992, 4, 26, 7, 50);
const asc2 = calculateAscendant(time2, latitude, longitude, 0); // No timezone offset
console.log('Scenario 2: 7:50 as UTC (no offset)');
console.log('  Ascendant: ' + asc2.toFixed(2) + ' deg = ' + getSign(asc2));
console.log('');

// Scenario 3: Try 30 minutes earlier
const time3 = new Date(1992, 4, 26, 7, 20);
const asc3 = calculateAscendant(time3, latitude, longitude, timezoneOffset);
console.log('Scenario 3: 7:20 AM IST (30 min earlier)');
console.log('  Ascendant: ' + asc3.toFixed(2) + ' deg = ' + getSign(asc3));
console.log('');

// Scenario 4: Try 30 minutes later  
const time4 = new Date(1992, 4, 26, 8, 20);
const asc4 = calculateAscendant(time4, latitude, longitude, timezoneOffset);
console.log('Scenario 4: 8:20 AM IST (30 min later)');
console.log('  Ascendant: ' + asc4.toFixed(2) + ' deg = ' + getSign(asc4));
console.log('');

// Scenario 5: Calculate what time would give Gemini 15 deg (midpoint)
console.log('='.repeat(70));
console.log('FINDING CORRECT TIME FOR GEMINI ASCENDANT:');
console.log('');

// Binary search for time that gives ~75 degrees (Gemini midpoint)
let bestTime = time1;
let bestDiff = Math.abs(75 - asc1);

for (let offset = -60; offset <= 60; offset += 5) {
    const testTime = new Date(1992, 4, 26, 7, 50 + offset);
    const testAsc = calculateAscendant(testTime, latitude, longitude, timezoneOffset);
    const diff = Math.abs(75 - testAsc);

    if (diff < bestDiff) {
        bestDiff = diff;
        bestTime = testTime;
    }
}

const finalAsc = calculateAscendant(bestTime, latitude, longitude, timezoneOffset);
console.log('Best match found:');
console.log('  Time: ' + bestTime.toLocaleTimeString());
console.log('  Ascendant: ' + finalAsc.toFixed(2) + ' deg = ' + getSign(finalAsc));
console.log('  Deviation from Gemini midpoint: ' + Math.abs(75 - finalAsc).toFixed(2) + ' degrees');

function getSign(deg) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(deg / 30)] + ' ' + (deg % 30).toFixed(2) + '°';
}
