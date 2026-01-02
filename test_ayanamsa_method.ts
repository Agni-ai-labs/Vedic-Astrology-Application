/**
 * Test whether Ayanamsa should be added or subtracted
 * Current: Tropical - Ayanamsa = Sidereal
 * Maybe: Tropical + Ayanamsa = Sidereal??
 */

const tropicalAsc = 76.05;
const ayanamsa = 23.75;

console.log('Testing Ayanamsa Application');
console.log('='.repeat(60));
console.log('');
console.log('Tropical Ascendant: ' + tropicalAsc + ' degrees (Gemini 16.05)');
console.log('Ayanamsa (Lahiri 1992): ' + ayanamsa + ' degrees');
console.log('');

// Method 1: Current (Subtract)
const sidereal1 = ((tropicalAsc - ayanamsa + 360) % 360);
const sign1 = getSign(sidereal1);
console.log('Method 1 (Tropical - Ayanamsa):');
console.log('  Result: ' + sidereal1.toFixed(2) + ' = ' + sign1);
console.log('  Matches Kundali Gemini?: ' + (sign1.startsWith('Gemini') ? 'YES' : 'NO'));
console.log('');

// Method 2: Add
const sidereal2 = ((tropicalAsc + ayanamsa) % 360);
const sign2 = getSign(sidereal2);
console.log('Method 2 (Tropical + Ayanamsa):');
console.log('  Result: ' + sidereal2.toFixed(2) + ' = ' + sign2);
console.log('  Matches Kundali Gemini?: ' + (sign2.startsWith('Gemini') ? 'YES' : 'NO'));
console.log('');

// Method 3: Maybe the tropical calculation itself is wrong?
// If Kundali shows sidereal Gemini (let's say 75 degrees)
// Then tropical = sidereal + ayanamsa = 75 + 23.75 = 98.75 (Cancer)
console.log('Method 3 (Reverse calculation):');
console.log('  If sidereal should be Gemini 75°:');
console.log('    Tropical = 75 + 23.75 = 98.80° (Cancer)');
console.log('    Our tropical = 76.05° (Gemini)');
console.log('    Difference suggests our tropical might be correct');
console.log('');

console.log('='.repeat(60));
console.log('CONCLUSION:');
console.log('The formula Tropical - Ayanamsa = Sidereal is standard.');
console.log('If we are getting Taurus when expecting Gemini,');
console.log('the tropical Ascendant formula itself may have an issue.');

function getSign(deg: number): string {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const idx = Math.floor(deg / 30);
    return signs[idx] + ' ' + (deg % 30).toFixed(2) + '°';
}
