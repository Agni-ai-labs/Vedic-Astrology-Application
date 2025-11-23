/**
 * Western Astrology Calculation Engine
 * Calculates Sun sign, Moon sign, and Rising sign (Ascendant)
 */

import { ZodiacSign } from '@/types/western.types'
import zodiacSignsData from '@/data/zodiacSigns.json'

interface BirthData {
    date: Date
    time: string // HH:MM format
    latitude: number
    longitude: number
}

/**
 * Calculate Sun sign based on birth date (Tropical zodiac)
 */
export function calculateSunSign(birthDate: Date): ZodiacSign {
    const month = birthDate.getMonth() + 1 // 1-12
    const day = birthDate.getDate()

    // Tropical zodiac date ranges
    const signRanges = [
        { sign: 'Capricorn', start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
        { sign: 'Aquarius', start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
        { sign: 'Pisces', start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
        { sign: 'Aries', start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
        { sign: 'Taurus', start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
        { sign: 'Gemini', start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
        { sign: 'Cancer', start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
        { sign: 'Leo', start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
        { sign: 'Virgo', start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
        { sign: 'Libra', start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
        { sign: 'Scorpio', start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
        { sign: 'Sagittarius', start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
    ]

    for (const range of signRanges) {
        if (range.start.month === range.end.month) {
            // Same month range
            if (month === range.start.month && day >= range.start.day && day <= range.end.day) {
                return getZodiacSignData(range.sign)
            }
        } else {
            // Crosses month boundary
            if (
                (month === range.start.month && day >= range.start.day) ||
                (month === range.end.month && day <= range.end.day)
            ) {
                return getZodiacSignData(range.sign)
            }
        }
    }

    // Fallback (should never reach)
    return getZodiacSignData('Aries')
}

/**
 * Calculate Moon sign (simplified - requires ephemeris for accuracy)
 * This is a placeholder that returns a sign based on date cycling
 * TODO: Integrate Swiss Ephemeris for accurate moon position
 */
export function calculateMoonSign(birthDate: Date): ZodiacSign {
    // Moon changes sign approximately every 2.5 days
    // This is a simplified calculation for demonstration
    const dayOfYear = getDayOfYear(birthDate)
    const moonCycle = Math.floor((dayOfYear % 30) / 2.5)
    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ]

    return getZodiacSignData(signs[moonCycle % 12])
}

/**
 * Calculate Rising sign (Ascendant) - requires birth time and location
 * This is a simplified calculation
 * TODO: Integrate proper house system calculations
 */
export function calculateRisingSign(birthData: BirthData): ZodiacSign {
    // Simplified calculation based on birth time
    // Rising sign changes approximately every 2 hours
    const [hours, minutes] = birthData.time.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes
    const signIndex = Math.floor((totalMinutes / 120) % 12)

    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ]

    return getZodiacSignData(signs[signIndex])
}

/**
 * Get zodiac sign data from JSON file
 */
function getZodiacSignData(signName: string): ZodiacSign {
    const sign = zodiacSignsData.find(s => s.name === signName)
    if (!sign) {
        throw new Error(`Zodiac sign ${signName} not found`)
    }
    return sign as ZodiacSign
}

/**
 * Helper: Get day of year
 */
function getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
}

/**
 * Generate Sun sign essence description
 */
export function generateSunSignEssence(sign: ZodiacSign): string {
    const essences: Record<string, string> = {
        Aries: 'Aries individuals are natural leaders with pioneering spirit. Bold, courageous, and dynamic, they initiate action and embrace challenges with enthusiasm.',
        Taurus: 'Taurus natives are grounded and reliable with strong determination. Practical, patient, and devoted, they build stability and appreciate life\'s pleasures.',
        Gemini: 'Gemini personalities are versatile communicators with curious minds. Adaptable, witty, and sociable, they thrive on mental stimulation and variety.',
        Cancer: 'Cancer souls are deeply intuitive and nurturing protectors. Emotional, caring, and family-oriented, they create safe havens for loved ones.',
        Leo: 'Leo hearts are generous leaders with creative flair. Confident, warm, and charismatic, they naturally inspire and bring joy to others.',
        Virgo: 'Virgo minds are analytical and service-oriented perfectionists. Practical, diligent, and helpful, they excel through attention to detail.',
        Libra: 'Libra spirits seek harmony and beauty in all things. Diplomatic, charming, and balanced, they create peace and appreciate aesthetics.',
        Scorpio: 'Scorpio natures are intense and transformative powerhouses. Passionate, resourceful, and brave, they dive deep into life\'s mysteries.',
        Sagittarius: 'Sagittarius adventurers are optimistic truth-seekers. Freedom-loving, philosophical, and honest, they explore life with enthusiasm.',
        Capricorn: 'Capricorn ambitions are disciplined and achievement-focused. Responsible, practical, and persistent, they build lasting success.',
        Aquarius: 'Aquarius visionaries are innovative and humanitarian. Progressive, independent, and original, they champion collective evolution.',
        Pisces: 'Pisces dreamers are compassionate and spiritually attuned. Artistic, empathetic, and wise, they connect deeply with universal emotions.',
    }

    return essences[sign.name] || 'A unique and multifaceted personality.'
}

/**
 * Generate Moon sign emotional significance
 */
export function generateMoonSignSignificance(sign: ZodiacSign): string {
    const significances: Record<string, string> = {
        Aries: 'Aries Moon individuals feel emotions intensely and react quickly. Your emotional nature is independent and courageous, needing freedom and excitement to feel alive.',
        Taurus: 'Taurus Moon individuals seek emotional security and stability. Your feelings are deep and steady, requiring physical comfort and reliable connections to thrive.',
        Gemini: 'Gemini Moon individuals process emotions intellectually. Your inner world is curious and changeable, needing communication and mental variety for emotional balance.',
        Cancer: 'Cancer Moon individuals feel deeply and nurture others instinctively. Your emotions are tied to home and family, seeking security through close bonds.',
        Leo: 'Leo Moon individuals express emotions warmly and generously. Your inner child is playful and creative, needing recognition and appreciation to feel emotionally fulfilled.',
        Virgo: 'Virgo Moon individuals analyze their feelings carefully. Your emotional nature is practical and helpful, finding comfort in being useful and organized.',
        Libra: 'Libra Moon individuals seek emotional harmony and partnership. Your feelings thrive in balanced relationships, needing beauty and fairness for inner peace.',
        Scorpio: 'Scorpio Moon individuals experience emotions with great intensity. Your inner world is deep and transformative, requiring absolute honesty and profound connections.',
        Sagittarius: 'Sagittarius Moon individuals need emotional freedom and adventure. Your feelings are optimistic and philosophical, seeking meaning and growth for inner satisfaction.',
        Capricorn: 'Capricorn Moon individuals handle emotions with maturity. Your inner nature is disciplined and cautious, finding security through achievement and structure.',
        Aquarius: 'Aquarius Moon individuals process feelings uniquely and independently. Your emotional nature is humanitarian and detached, needing intellectual connection and freedom.',
        Pisces: 'Pisces Moon individuals feel everything deeply and empathetically. Your inner world is intuitive and compassionate, absorbing others\' emotions like a spiritual sponge.',
    }

    return significances[sign.name] || 'Your emotional nature is unique and complex.'
}

/**
 * Generate Rising sign first impressions
 */
export function generateRisingSignImpressions(sign: ZodiacSign): string {
    const impressions: Record<string, string> = {
        Aries: 'Aries Rising individuals project confidence and directness. You naturally command attention with your bold presence, and others see you as energetic, courageous, and ready for action.',
        Taurus: 'Taurus Rising individuals appear calm and grounded. You project stability and reliability, and others perceive you as patient, practical, and pleasantly steady.',
        Gemini: 'Gemini Rising individuals come across as curious and communicative. You naturally engage others with your wit, and people see you as versatile, intelligent, and sociable.',
        Cancer: 'Cancer Rising individuals emanate warmth and protectiveness. You project nurturing energy, and others experience you as caring, sensitive, and emotionally intuitive.',
        Leo: 'Leo Rising individuals project confidence and warmth. You naturally command attention and others see you as charismatic, creative, and dignified.',
        Virgo: 'Virgo Rising individuals appear modest and analytical. You project competence and attention to detail, and people perceive you as helpful, intelligent, and refined.',
        Libra: 'Libra Rising individuals exude charm and diplomacy. You naturally create harmony, and others see you as gracious, balanced, and aesthetically aware.',
        Scorpio: 'Scorpio Rising individuals project intensity and mystery. You command respect through your powerful presence, and people sense your depth, passion, and magnetic allure.',
        Sagittarius: 'Sagittarius Rising individuals appear optimistic and adventurous. You project enthusiasm and openness, and others see you as honest, philosophical, and free-spirited.',
        Capricorn: 'Capricorn Rising individuals emanate maturity and competence. You project authority and discipline, and people perceive you as responsible, ambitious, and dignified.',
        Aquarius: 'Aquarius Rising individuals appear unique and progressive. You project originality and independence, and others see you as innovative, friendly, and intellectually oriented.',
        Pisces: 'Pisces Rising individuals exude gentleness and compassion. You naturally empathize with others, and people sense your artistic, spiritual, and dreamy nature.',
    }

    return impressions[sign.name] || 'You make a memorable first impression.'
}
