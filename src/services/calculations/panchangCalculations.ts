import { PanchangData, MuhuratTiming, Choghadiya } from '@/types/panchang.types'

/**
 * Mock calculation for Panchang data
 * In a real app, this would use an ephemeris library like swisseph
 */
export function calculatePanchang(date: Date, location: { lat: number; lng: number }): PanchangData {
    // Mock data generation based on date to ensure consistency
    const day = date.getDate()
    const month = date.getMonth()

    // Tithis cycle every 30 days roughly
    const tithiIndex = (day + month * 30) % 30
    const tithis = [
        'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
        'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
        'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
    ]
    const currentTithi = tithis[tithiIndex % 15]
    const paksha = tithiIndex < 15 ? 'Shukla' : 'Krishna'

    // Nakshatras cycle every 27 days
    const nakshatraIndex = (day + month * 27) % 27
    const nakshatras = [
        'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
        'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
        'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
        'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
        'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ]

    return {
        date,
        location: `${location.lat.toFixed(2)}°N, ${location.lng.toFixed(2)}°E`,
        sunrise: '06:15 AM',
        sunset: '06:45 PM',
        moonrise: '07:30 PM',
        moonset: '05:20 AM',
        tithi: {
            name: `${currentTithi} ${paksha} Paksha`,
            endTime: '04:30 PM'
        },
        nakshatra: {
            name: nakshatras[nakshatraIndex],
            endTime: '08:15 PM'
        },
        yoga: {
            name: 'Siddha',
            endTime: '02:00 PM'
        },
        karana: {
            name: 'Bava',
            endTime: '04:30 PM'
        },
        paksha,
        ritu: getRitu(month),
        shakaSamvat: 1947,
        vikramSamvat: 2082
    }
}

function getRitu(month: number): string {
    if (month >= 0 && month <= 1) return 'Shishir (Winter)'
    if (month >= 2 && month <= 3) return 'Vasant (Spring)'
    if (month >= 4 && month <= 5) return 'Grishma (Summer)'
    if (month >= 6 && month <= 7) return 'Varsha (Monsoon)'
    if (month >= 8 && month <= 9) return 'Sharad (Autumn)'
    return 'Hemant (Pre-winter)'
}

export function getDailyMuhurats(_date: Date): MuhuratTiming[] {
    // Mock timings based on sunrise 6:00 AM
    return [
        {
            name: 'Abhijit Muhurat',
            startTime: '11:45 AM',
            endTime: '12:30 PM',
            isAuspicious: true,
            description: 'Best time for starting new ventures'
        },
        {
            name: 'Rahu Kaal',
            startTime: '04:30 PM',
            endTime: '06:00 PM',
            isAuspicious: false,
            description: 'Avoid starting important work'
        },
        {
            name: 'Yamaganda',
            startTime: '09:00 AM',
            endTime: '10:30 AM',
            isAuspicious: false,
            description: 'Inauspicious period'
        },
        {
            name: 'Gulika Kaal',
            startTime: '01:30 PM',
            endTime: '03:00 PM',
            isAuspicious: true,
            description: 'Good for new beginnings'
        }
    ]
}

export function getChoghadiyas(_date: Date): Choghadiya[] {
    return [
        { name: 'Udveg', startTime: '06:00 AM', endTime: '07:30 AM', isGood: false, ruler: 'Sun' },
        { name: 'Char', startTime: '07:30 AM', endTime: '09:00 AM', isGood: true, ruler: 'Venus' },
        { name: 'Labh', startTime: '09:00 AM', endTime: '10:30 AM', isGood: true, ruler: 'Mercury' },
        { name: 'Amrit', startTime: '10:30 AM', endTime: '12:00 PM', isGood: true, ruler: 'Moon' },
        { name: 'Kaal', startTime: '12:00 PM', endTime: '01:30 PM', isGood: false, ruler: 'Saturn' },
        { name: 'Shubh', startTime: '01:30 PM', endTime: '03:00 PM', isGood: true, ruler: 'Jupiter' },
        { name: 'Rog', startTime: '03:00 PM', endTime: '04:30 PM', isGood: false, ruler: 'Mars' },
        { name: 'Udveg', startTime: '04:30 PM', endTime: '06:00 PM', isGood: false, ruler: 'Sun' }
    ]
}
