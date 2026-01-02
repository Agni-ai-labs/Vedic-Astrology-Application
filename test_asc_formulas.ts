/**
 * Test different Ascendant formula variations
 * Our current formula gives Taurus, but Kundali shows Gemini
 * 
 * Current formula: y = cos(LST), x = cos(eps)*sin(LST) + tan(lat)*sin(eps)
 * Testing alternatives
 */

import { SiderealTime } from 'astronomy-engine';

const birthDate = new Date(1992, 4, 26, 7, 50);
const latitude = 26.9025;
const longitude = 83.9822;
const timezoneOffset = 5.5;

console.log('Testing Ascendant Formula Variations');
console.log('Target: Gemini (60-90 degrees)');
console.log('='.repeat(70));
console.log('');

// Calculate UTC date
const systemOffsetMinutes = birthDate.getTimezoneOffset();
const birthOffsetMinutes = timezoneOffset * 60;
const adjustmentMs = (birthOffsetMinutes + systemOffsetMinutes) * 60 * 1000;
const utcDate = new Date(birthDate.getTime() - adjustmentMs);

// GST and LST
const gstHours = SiderealTime(utcDate);
const lstHours = gstHours + longitude / 15.0;
const lstDeg = ((lstHours * 15) % 360 + 360) % 360;
const lstRad = lstDeg * (Math.PI / 180);

// Obliquity
const J2000 = new Date('2000-01-01T12:00:00Z');
const daysSinceJ2000 = (utcDate.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
const t = daysSinceJ2000 / 36525.0;
const epsDeg = 23.43929111 - 0.013004167 * t;
const eps = epsDeg * (Math.PI / 180);

const latRad = latitude * (Math.PI / 180);

console.log('Intermediate values:');
console.log('  LST: ' + lstDeg.toFixed(2) + ' degrees');
console.log('  Obliquity: ' + epsDeg.toFixed(2) + ' degrees');
console.log('  Latitude: ' + latitude + ' degrees');
console.log('');

// Formula 1: Current (gives Taurus)
const y1 = Math.cos(lstRad);
const x1 = Math.cos(eps) * Math.sin(lstRad) + Math.tan(latRad) * Math.sin(eps);
const asc1 = Math.atan2(y1, x1) * (180 / Math.PI);
const asc1Norm = ((asc1 % 360) + 360) % 360;
console.log('Formula 1 (Current): cos(LST) / (cos(eps)*sin(LST) + tan(lat)*sin(eps))');
console.log('  Result: ' + asc1Norm.toFixed(2) + ' deg = ' + getSign(asc1Norm));
console.log('');

// Formula 2: Swap numerator/denominator
const asc2 = Math.atan2(x1, y1) * (180 / Math.PI);
const asc2Norm = ((asc2 % 360) + 360) % 360;
console.log('Formula 2 (Swapped): reversed');
console.log('  Result: ' + asc2Norm.toFixed(2) + ' deg = ' + getSign(asc2Norm));
console.log('');

// Formula 3: Use sin(LST) in numerator
const y3 = Math.sin(lstRad);
const x3 = Math.cos(eps) * Math.cos(lstRad) - Math.tan(latRad) * Math.sin(eps);
const asc3 = Math.atan2(y3, x3) * (180 / Math.PI);
const asc3Norm = ((asc3 % 360) + 360) % 360;
console.log('Formula 3 (Alternative): sin(LST) / (cos(eps)*cos(LST) - tan(lat)*sin(eps))');
console.log('  Result: ' + asc3Norm.toFixed(2) + ' deg = ' + getSign(asc3Norm));
console.log('');

// Formula 4: Check if LST itself needs to be Ascendant base
const asc4 = lstDeg;
console.log('Formula 4 (LST as base):');
console.log('  Result: ' + asc4.toFixed(2) + ' deg = ' + getSign(asc4));
console.log('');

// Formula 5: Add 90 degrees to current result
const asc5Norm = ((asc1Norm + 90) % 360);
console.log('Formula 5 (Current + 90deg):');
console.log('  Result: ' + asc5Norm.toFixed(2) + ' deg = ' + getSign(asc5Norm));
console.log('');

// Check Lahiri Ayanamsa
const ayanamsa = 23.8541667 + (50.290966 / 3600) * (daysSinceJ2000 / 365.25);
console.log('Ayanamsa: ' + ayanamsa.toFixed(2) + ' degrees');

function getSign(deg) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const idx = Math.floor(deg / 30);
    return signs[idx] + ' ' + (deg % 30).toFixed(2) + '°';
}
