/**
 * Calculate sunrise time and verify using Ishta Kaal
 * Ishta Kaal from Kundali: 6 Ghati 35 Pal = 2 hours 38 minutes from sunrise
 */

import { SearchRiseSet, Body, Observer, MakeTime } from 'astronomy-engine';

const latitude = 26.9025;
const longitude = 83.9822;

console.log('Calculating Sunrise for May 26, 1992, Padrauna');
console.log('='.repeat(70));
console.log('');

// Create observer
const observer = new Observer(latitude, longitude, 0);

// Create date for May 26, 1992
const searchDate = MakeTime(new Date(1992, 4, 26, 0, 0, 0));

// Find sunrise
const sunrise = SearchRiseSet(Body.Sun, observer, 1, searchDate, 1);

if (sunrise) {
    console.log('Sunrise (UTC): ' + sunrise.date.toISOString());

    // Convert to IST (+5:30)
    const sunriseIST = new Date(sunrise.date.getTime() + 5.5 * 3600000);
    console.log('Sunrise (IST): ' + sunriseIST.toLocaleTimeString());
    console.log('');

    // Calculate time from sunrise
    console.log('From Kundali PDF:');
    console.log('  Ishta Kaal: 6 Ghati 35 Pal');

    // Convert Ghati and Pal to hours/minutes
    const ghati = 6;
    const pal = 35;
    const totalMinutes = ghati * 24 + (pal * 24) / 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    console.log('  = ' + hours + ' hours ' + minutes + ' minutes from sunrise');
    console.log('');

    // Calculate birth time
    const birthTimeFromSunrise = new Date(sunriseIST.getTime() + totalMinutes * 60000);
    console.log('Calculated Birth Time (IST):');
    console.log('  ' + birthTimeFromSunrise.toLocaleTimeString());
    console.log('  or ' + birthTimeFromSunrise.getHours() + ':' + String(birthTimeFromSunrise.getMinutes()).padStart(2, '0'));
    console.log('');

    console.log('='.repeat(70));
    console.log('VERDICT:');
    console.log('  Kundali states: 7:50 (Standard Time)');
    console.log('  Calculated from Ishta Kaal: ' + birthTimeFromSunrise.toLocaleTimeString());
    console.log('');

    const diff = Math.abs(birthTimeFromSunrise.getTime() - new Date(1992, 4, 26, 7, 50).getTime());
    const diffMins = Math.round(diff / 60000);

    if (diffMins < 10) {
        console.log('  MATCH: Time matches within ' + diffMins + ' minutes');
    } else {
        console.log('  DISCREPANCY: ' + diffMins + ' minutes difference');
        console.log('  This suggests "Standard Time" may mean something different');
    }
}
