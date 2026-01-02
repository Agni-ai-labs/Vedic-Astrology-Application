/**
 * Debug Ascendant Calculation 
 * Trace through step-by-step to find the error
 */

import { SiderealTime } from 'astronomy-engine';

// Birth data for Test Case 1
const birthDate = new Date(1997, 9, 11, 6, 45); // Oct 11, 1997, 6:45 AM
const latitude = 26.76;
const longitude = 83.37;
const timezoneOffset = 5.5;

console.log('DEBUG: Ascendant Calculation for Oct 11, 1997, 6:45 AM, Gorakhpur');
console.log('='.repeat(70));
console.log('');

// Step 1: Convert to UTC
console.log('STEP 1: Convert local time to UTC');
console.log(`  Input Date object: ${birthDate}`);
console.log(`  Local time set: ${birthDate.toLocaleString()}`);
console.log(`  Timezone offset (IST): ${timezoneOffset} hours`);

const systemOffsetMinutes = birthDate.getTimezoneOffset();
const birthOffsetMinutes = timezoneOffset * 60;
const adjustmentMs = (birthOffsetMinutes + systemOffsetMinutes) * 60 * 1000;
const utcDate = new Date(birthDate.getTime() - adjustmentMs);

console.log(`  System timezone offset: ${systemOffsetMinutes} minutes`);
console.log(`  Birth timezone offset: ${birthOffsetMinutes} minutes`);
console.log(`  Adjustment: ${adjustmentMs} ms`);
console.log(`  UTC Date: ${utcDate.toISOString()}`);
console.log('');

// Step 2: Calculate Sidereal Time
console.log('STEP 2: Calculate Greenwich Sidereal Time');
const gstHours = SiderealTime(utcDate);
console.log(`  GST: ${gstHours} hours`);
console.log('');

// Step 3: Calculate Local Sidereal Time
console.log('STEP 3: Calculate Local Sidereal Time');
const lstHours = gstHours + longitude / 15.0;
const lstDeg = ((lstHours * 15) % 360 + 360) % 360;
console.log(`  Longitude: ${longitude} degrees`);
console.log(`  LST Hours: ${lstHours}`);
console.log(`  LST Degrees: ${lstDeg}`);
console.log('');

// Step 4: Calculate RAMC
console.log('STEP 4: Calculate RAMC');
const ramc = lstDeg * (Math.PI / 180);
console.log(`  RAMC (radians): ${ramc}`);
console.log(`  RAMC (degrees): ${ramc * (180 / Math.PI)}`);
console.log('');

// Step 5: Calculate Obliquity
console.log('STEP 5: Calculate Obliquity of Ecliptic');
const J2000 = new Date('2000-01-01T12:00:00Z');
const daysSinceJ2000 = (utcDate.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
const t = daysSinceJ2000 / 36525.0;
const epsDeg = 23.43929111 - 0.013004167 * t - 0.000000163889 * t * t + 0.000000503611 * t * t * t;
const eps = epsDeg * (Math.PI / 180);
console.log(`  Days since J2000: ${daysSinceJ2000}`);
console.log(`  T (Julian centuries): ${t}`);
console.log(`  Epsilon (degrees): ${epsDeg}`);
console.log('');

// Step 6: Calculate Ascendant
console.log('STEP 6: Calculate Tropical Ascendant');
const latitudeRad = latitude * (Math.PI / 180);
const sinEps = Math.sin(eps);
const cosEps = Math.cos(eps);
const tanLat = Math.tan(latitudeRad);

const y = -Math.cos(ramc);
const x = Math.sin(ramc) * cosEps + tanLat * sinEps;

console.log(`  Latitude: ${latitude} degrees`);
console.log(`  tan(lat): ${tanLat}`);
console.log(`  y = -cos(RAMC): ${y}`);
console.log(`  x = sin(RAMC)*cos(eps) + tan(lat)*sin(eps): ${x}`);

const ascRad = Math.atan2(y, x);
const ascDegRaw = ascRad * (180 / Math.PI);
const ascDegTropical = ((ascDegRaw % 360) + 360) % 360;

console.log(`  atan2(y, x) (radians): ${ascRad}`);
console.log(`  Raw degrees: ${ascDegRaw}`);
console.log(`  Tropical Ascendant: ${ascDegTropical} degrees`);
console.log('');

// Step 7: Calculate Ayanamsa
console.log('STEP 7: Calculate Lahiri Ayanamsa');
const ayanamsa = 23.8541667 + (50.290966 / 3600) * (daysSinceJ2000 / 365.25);
const ayanamsaNorm = ((ayanamsa % 360) + 360) % 360;
console.log(`  Ayanamsa (raw): ${ayanamsa}`);
console.log(`  Ayanamsa (normalized): ${ayanamsaNorm}`);
console.log('');

// Step 8: Convert to Sidereal
console.log('STEP 8: Convert to Sidereal Ascendant');
const ascDegSidereal = ((ascDegTropical - ayanamsaNorm) % 360 + 360) % 360;
const ascSign = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(ascDegSidereal / 30)];

console.log(`  Tropical: ${ascDegTropical} degrees`);
console.log(`  Minus Ayanamsa: ${ayanamsaNorm} degrees`);
console.log(`  Sidereal: ${ascDegSidereal} degrees`);
console.log(`  Sign: ${ascSign} at ${ascDegSidereal % 30} degrees`);
console.log('');

console.log('='.repeat(70));
console.log('RESULT:');
console.log(`  Ascendant: ${ascSign} at ${(ascDegSidereal % 30).toFixed(2)} degrees`);
console.log('');
console.log('EXPECTED: Virgo (for NOT Manglik with Mars in Scorpio)');
console.log('='.repeat(70));
