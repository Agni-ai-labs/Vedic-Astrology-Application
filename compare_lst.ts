/**
 * Compare LST calculation: working test vs astronomy.ts
 */

import { calculateAscendant, SiderealTime } from './src/services/calculations/astronomy.js';

const birth = new Date(1992, 4, 26, 7, 50);
const lat = 26.9025;
const lng = 83.9822;
const tz = 5.5;

console.log('Comparing astronomy.ts vs manual calculation');
console.log('='.repeat(70));
console.log('');

// Call astronomy.ts
const result = calculateAscendant(birth, lat, lng, tz);
console.log('astronomy.ts result: ' + result.toFixed(2) + ' deg = ' + getSign(result));
console.log('');

// Manual calculation (matching test_asc_formulas.ts)
const systemOffsetMinutes = birth.getTimezoneOffset();
const birthOffsetMinutes = tz * 60;
const adjustmentMs = (birthOffsetMinutes + systemOffsetMinutes) * 60 * 1000;
const utcDate = new Date(birth.getTime() - adjustmentMs);

console.log('Manual calculation:');
console.log('  Birth time: ' + birth.toLocaleTimString());
console.log('  UTC time (old method): ' + utcDate.toISOString());

// Try new toUTC method
const year = birth.getFullYear();
const month = birth.getMonth();
const day = birth.getDate();
const hours = birth.getHours();
const minutes = birth.getMinutes();
const seconds = birth.getSeconds();

const utcBase = Date.UTC(year, month, day, hours, minutes, seconds);
const offsetMs = tz * 3600000;
const utcNew = new Date(utcBase - offsetMs);

console.log('  UTC time (new method): ' + utcNew.toISOString());

const gst = SiderealTime(utcNew);
const lstHours = gst + lng / 15.0;
const lstDeg = ((lstHours * 15) % 360 + 360) % 360;

console.log('  LST: ' + lstDeg.toFixed(2) + ' degrees');
console.log('  Expected for Gemini: ~2.89 degrees');

function getSign(deg) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(deg / 30)] + ' ' + (deg % 30).toFixed(2) + '°';
}
