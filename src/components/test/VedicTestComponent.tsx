/**
 * Vedic Astrology Test Component
 * 
 * Test Case:
 * - Date of Birth: October 11, 1997
 * - Time of Birth: 6:45 AM IST
 * - Place: Pipraich (Gorakhpur), Uttar Pradesh, India
 */

import { useEffect, useState } from 'react';
import { calculateVedicChart } from '@/services/calculations/vedicCalculations';
import { vedicLogicService } from '@/services/calculations/vedicLogicService';
import { SIGNS } from '@/services/calculations/astronomy';

export function VedicTestComponent() {
    const [results, setResults] = useState<string>('Calculating...');

    useEffect(() => {
        runTests();
    }, []);

    const runTests = () => {
        try {
            // Test Birth Details
            const birthDetails = {
                name: 'Test Subject',
                date: new Date(1997, 9, 11), // October 11, 1997
                time: '06:45',
                latitude: 26.8167,  // Pipraich, Gorakhpur
                longitude: 83.7500,
                timezone: 'Asia/Kolkata',
                location: 'Pipraich, Gorakhpur, India'
            };

            const vedicChart = calculateVedicChart(birthDetails);
            const d1 = vedicChart.d1;
            const moon = d1.planets.find(p => p.planet === 'Moon');
            const sun = d1.planets.find(p => p.planet === 'Sun');

            let output: string[] = [];

            output.push('='.repeat(50));
            output.push('VEDIC ASTROLOGY VALIDATION');
            output.push('Birth: Oct 11, 1997, 6:45 AM, Pipraich, Gorakhpur');
            output.push('='.repeat(50));

            // Rashi and Nakshatra
            if (moon) {
                const moonLon = (SIGNS.indexOf(moon.sign) * 30) + moon.degree;
                const nakshatra = vedicLogicService.calculateNakshatra(moonLon);

                output.push('');
                output.push('RASHI (MOON SIGN):');
                output.push(`  Moon Sign: ${moon.sign}`);
                output.push(`  Moon Degree: ${moon.degree.toFixed(2)}`);
                output.push(`  Nakshatra: ${nakshatra.name}`);
                output.push(`  Nakshatra Pada: ${nakshatra.pada}`);
                output.push(`  Nakshatra Lord: ${nakshatra.lord}`);
            }

            output.push('');
            output.push('LAGNA (ASCENDANT):');
            output.push(`  Ascendant: ${d1.ascendant}`);
            output.push(`  Degree: ${d1.ascendantDegree.toFixed(2)}`);

            if (sun) {
                output.push('');
                output.push('SUN SIGN:');
                output.push(`  Sun in: ${sun.sign}`);
            }

            output.push('');
            output.push('ALL PLANETS:');
            d1.planets.forEach(p => {
                output.push(`  ${p.planet}: ${p.sign} at ${p.degree.toFixed(2)} (House ${p.house})${p.isRetrograde ? ' R' : ''}`);
            });

            output.push('');
            output.push('DOSHAS:');
            vedicChart.doshas.forEach(d => {
                output.push(`  ${d.name}: ${d.present ? 'YES - ' + d.severity : 'No'}`);
                if (d.present) {
                    output.push(`    ${d.details}`);
                }
            });

            output.push('');
            output.push('YOGAS:');
            if (vedicChart.yogas.length > 0) {
                vedicChart.yogas.forEach(y => {
                    output.push(`  ${y.name} (${y.type}): ${y.strength}`);
                });
            } else {
                output.push('  No major yogas detected');
            }

            output.push('');
            output.push('CURRENT DASHA:');
            const currentDasha = vedicChart.currentDasha.find(d => {
                const now = new Date();
                return now >= d.startDate && now <= d.endDate;
            });
            if (currentDasha) {
                output.push(`  ${currentDasha.planet} Mahadasha`);
                output.push(`  From: ${currentDasha.startDate.toDateString()}`);
                output.push(`  To: ${currentDasha.endDate.toDateString()}`);
            }

            output.push('');
            output.push('D9 NAVAMSA LAGNA:');
            output.push(`  ${vedicChart.d9.ascendant}`);

            setResults(output.join('\n'));

        } catch (error) {
            setResults(`Error: ${error}`);
        }
    };

    return (
        <div style={{
            padding: '20px',
            fontFamily: 'monospace',
            backgroundColor: '#0a0a0a',
            color: '#e0e0e0',
            minHeight: '100vh',
            whiteSpace: 'pre-wrap'
        }}>
            <h1 style={{ color: '#fff', marginBottom: '20px' }}>Vedic Astrology Test</h1>
            <pre style={{
                backgroundColor: '#111',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #333',
                lineHeight: '1.6'
            }}>
                {results}
            </pre>
        </div>
    );
}

export default VedicTestComponent;
