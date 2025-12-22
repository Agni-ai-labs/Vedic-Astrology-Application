import { 
    calculatePlanets, 
    calculateAscendant, 
    calculateHouses,
    calculateAspects,
    calculateVimshottariDasha,
    toUTC,
    SIGNS
} from './src/services/calculations/astronomy.ts';

// Test with the exact time from prokerala.com
const date = new Date('2025-11-28T06:52:00'); // 6:52 AM local time
const lat = 28.6139; // New Delhi
const lng = 77.2090;
const timezoneOffset = 5.5; // IST is UTC+5:30

// Convert to UTC for display
const utcDate = toUTC(date, timezoneOffset);

console.log(`Calculating chart for ${date.toLocaleString()} local time (${utcDate.toISOString()} UTC) at ${lat}, ${lng}`);

try {
    const planets = calculatePlanets(date, lat, lng, timezoneOffset);
    const ascendant = calculateAscendant(date, lat, lng, timezoneOffset);
    const houses = calculateHouses(date, lat, lng, timezoneOffset);
    const aspects = calculateAspects(planets);
    
    // Find Moon for dasha calculation
    const moon = planets.find(p => p.name === 'Moon');
    const dashaPeriods = moon ? calculateVimshottariDasha(date, moon.longitude) : [];

    console.log('\n=== Planetary Positions ===');
    planets.forEach(p => {
        console.log(`${p.name}: ${p.sign} ${p.degreeInSign.toFixed(2)}° (${p.longitude.toFixed(2)}°) - ${p.nakshatra} ${p.isRetrograde ? '(R)' : ''}`);
    });

    console.log('\n=== Ascendant ===');
    const ascSignIndex = Math.floor(ascendant / 30);
    const ascDegreeInSign = ascendant % 30;
    console.log(`Ascendant: ${SIGNS[ascSignIndex]} ${ascDegreeInSign.toFixed(2)}° (${ascendant.toFixed(2)}°)`);

    console.log('\n=== Houses (Whole Sign System) ===');
    houses.forEach(h => {
        console.log(`House ${h.number}: ${h.sign}`);
    });

    console.log('\n=== Major Aspects ===');
    aspects.forEach(a => {
        console.log(`${a.planet1} ${a.type} ${a.planet2} (orb: ${a.orb.toFixed(2)}°)`);
    });

    console.log('\n=== Vimshottari Dasha ===');
    const currentDasha = dashaPeriods.find(d => date >= d.startDate && date <= d.endDate);
    if (currentDasha) {
        console.log(`Current Dasha: ${currentDasha.lord} (${currentDasha.startDate.toLocaleDateString()} to ${currentDasha.endDate.toLocaleDateString()})`);
    }
    
    console.log('\nUpcoming Dashas:');
    const upcomingIndex = currentDasha ? dashaPeriods.findIndex(d => d.lord === currentDasha.lord) + 1 : 0;
    for (let i = upcomingIndex; i < Math.min(upcomingIndex + 3, dashaPeriods.length); i++) {
        const d = dashaPeriods[i];
        console.log(`${d.lord}: ${d.startDate.toLocaleDateString()} to ${d.endDate.toLocaleDateString()}`);
    }

} catch (error) {
    console.error('Error calculating chart:', error);
}