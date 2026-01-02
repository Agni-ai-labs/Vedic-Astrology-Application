/**
 * Verify LST calculation for May 26, 1992, 7:50 AM at Padrauna
 * Cross-check with manual calculation
 */

import { SiderealTime } from 'astronomy-engine';

const year = 1992;
const month = 4; // May (0-indexed)
const day = 26;
const hours = 7;
const minutes = 50;

const longitude = 83.9822;
const timezoneOffset = 5.5;

// Create UTC date (7:50 IST = 02:20 UTC)
const utcBase = Date.UTC(year, month, day, hours, minutes, 0);
const offsetMs = timezoneOffset * 3600000;
const utcDate = new Date(utcBase - offsetMs);

console.log('LST Verification for May 26, 1992, 7:50 AM IST, Padrauna');
console.log('='.repeat(70));
console.log('');
console.log('UTC Time: ' + utcDate.toISOString());
console.log('Longitude: ' + longitude + '° E');
console.log('');

// Calculate GST
const gstHours = SiderealTime(utcDate);
console.log('Greenwich Sidereal Time: ' + gstHours.toFixed(6) + ' hours');
console.log('  = ' + (gstHours * 15).toFixed(2) + ' degrees');
console.log('');

// Calculate LST
const lstHours = gstHours + longitude / 15.0;
const lstDeg = ((lstHours * 15) % 360 + 360) % 360;

console.log('Local Sidereal Time:');
console.log('  Hours: ' + lstHours.toFixed(6));
console.log('  Degrees: ' + lstDeg.toFixed(2));
console.log('  This should be the ecliptic longitude on the eastern horizon');
console.log('');

// Expected Ascendant calculation
const lat = 26.9025;
const latRad = lat * (Math.PI / 180);

// Obliquity
const J2000 = new Date('2000-01-01T12:00:00Z');
const daysSinceJ2000 = (utcDate.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
const t = daysSinceJ2000 / 36525.0;
const epsDeg = 23.43929111 - 0.013004167 * t;
const eps = epsDeg * (Math.PI / 180);

console.log('Obliquity of Ecliptic: ' + epsDeg.toFixed(4) + '°');
console.log('');

// Ascendant formula
const lstRad = lstDeg * (Math.PI / 180);
const y = Math.cos(lstRad);
const x = Math.cos(eps) * Math.sin(lstRad) + Math.tan(latRad) * Math.sin(eps);

const ascRad = Math.atan2(y, x);
const ascDeg = ((ascRad * (180 / Math.PI)) % 360 + 360) % 360;

console.log('Tropical Ascendant Calculation:');
console.log('  atan2(cos(LST), cos(ε)*sin(LST) + tan(lat)*sin(ε))');
console.log('  = ' + ascDeg.toFixed(2) + '°');
console.log('  Sign: ' + getSign(ascDeg));
console.log('');

// With Ayanamsa
const ayanamsa = 23.8541667 + (50.290966 / 3600) * (daysSinceJ2000 / 365.25);
const siderealAsc = ((ascDeg - ayanamsa) % 360 + 360) % 360;

console.log('Sidereal Ascendant:');
console.log('  Ayanamsa: ' + ayanamsa.toFixed(2) + '°');
console.log('  Sidereal = ' + siderealAsc.toFixed(2) + '°');
console.log('  Sign: ' + getSign(siderealAsc));
console.log('');

console.log('='.repeat(70));
console.log('Expected from Kundali: Gemini (60-90° sidereal)');
console.log('Our calculation: ' + getSign(siderealAsc));

function getSign(deg: number): string {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const idx = Math.floor(deg / 30);
    return signs[idx] + ' ' + (deg % 30).toFixed(2) + '°';
}
