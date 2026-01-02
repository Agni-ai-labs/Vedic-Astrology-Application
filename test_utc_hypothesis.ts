/**
 * CRITICAL TEST: Is "Standard Time" in Kundali actually UTC?
 * 7:50 Standard Time + 5:30 IST offset = 13:20 IST
 * This matches Ishta Kaal calculation of 13:09 IST!
 */

import { calculateAscendant } from './src/services/calculations/astronomy.js';

const latitude = 26.9025;
const longitude = 83.9822;
const timezoneOffset = 5.5; // IST

console.log('HYPOTHESIS: "7:50 Standard Time" means 7:50 UTC');
console.log('='.repeat(70));
console.log('');

// If 7:50 is UTC, then IST = 7:50 + 5:30 = 13:20
const utcTime = new Date(Date.UTC(1992, 4, 26, 7, 50));
const istTime1 = new Date(1992, 4, 26, 13, 20); // 7:50 UTC + 5:30
const istTime2 = new Date(1992, 4, 26, 13, 9); // From Ishta Kaal calculation

console.log('Test 1: 13:20 IST (7:50 UTC + 5:30)');
const asc1 = calculateAscendant(istTime1, latitude, longitude, timezoneOffset);
const sign1 = getSign(asc1);
console.log('  Ascendant: ' + asc1.toFixed(2) + ' deg = ' + sign1);
console.log('  Match Gemini?: ' + (sign1.startsWith('Gemini') ? 'YES!' : 'NO'));
console.log('');

console.log('Test 2: 13:09 IST (from Ishta Kaal)');
const asc2 = calculateAscendant(istTime2, latitude, longitude, timezoneOffset);
const sign2 = getSign(asc2);
console.log('  Ascendant: ' + asc2.toFixed(2) + ' deg = ' + sign2);
console.log('  Match Gemini?: ' + (sign2.startsWith('Gemini') ? 'YES!' : 'NO'));
console.log('');

console.log('For comparison, 7:50 IST:');
const istTime3 = new Date(1992, 4, 26, 7, 50);
const asc3 = calculateAscendant(istTime3, latitude, longitude, timezoneOffset);
const sign3 = getSign(asc3);
console.log('  Ascendant: ' + asc3.toFixed(2) + ' deg = ' + sign3);
console.log('');

console.log('='.repeat(70));
console.log('CONCLUSION:');
if (sign1.startsWith('Gemini') || sign2.startsWith('Gemini')) {
    console.log('  SUCCESS! "Standard Time" in Kundali PDF means UTC/GMT, not IST!');
    console.log('  Birth time is actually ' + (sign1.startsWith('Gemini') ? '13:20' : '13:09') + ' IST');
} else {
    console.log('  Still investigating...');
}

function getSign(deg) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(deg / 30)] + ' ' + (deg % 30).toFixed(2) + '°';
}
