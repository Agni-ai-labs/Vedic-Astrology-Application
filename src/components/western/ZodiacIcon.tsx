import { ZodiacElement } from '@/types/western.types'

interface ZodiacIconProps {
    sign: string
    element: ZodiacElement
    size?: number
    className?: string
}

export function ZodiacIcon({ sign, element, size = 48, className = '' }: ZodiacIconProps) {
    // Element-based colors (NO emojis, using proper color system)
    const elementColor = {
        Fire: '#ef4444',
        Earth: '#10b981',
        Air: '#3b82f6',
        Water: '#8b5cf6',
    }[element]

    // SVG path data for each zodiac sign
    const zodiacPaths: Record<string, string> = {
        Aries: 'M12 4L8 12h8L12 4zM12 12v8M8 16h8', // Ram horns
        Taurus: 'M6 12c0-4 2-6 6-6s6 2 6 6M6 12a6 6 0 0012 0', // Bull horns
        Gemini: 'M8 4v16M16 4v16M8 8h8M8 16h8', // Roman numeral II
        Cancer: 'M12 4a4 4 0 014 4v8a4 4 0 01-8 0V8a4 4 0 014-4z', // Crab claws
        Leo: 'M12 4a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zM12 8v8M8 12h8', // Lion mane
        Virgo: 'M6 4v12a4 4 0 008 0V4M14 10a4 4 0 014 4v2', // Maiden symbol
        Libra: 'M4 12h16M8 8a4 4 0 018 0M8 16a4 4 0 008 0', // Scales
        Scorpio: 'M6 4v12M10 4v12M14 4v12M18 8l-4 4 4 4', // Scorpion tail
        Sagittarius: 'M4 20l16-16M20 8v-4h-4M12 12l4 4', // Archer arrow
        Capricorn: 'M6 8a4 4 0 018 0v8a4 4 0 01-4 4M14 12a4 4 0 014-4', // Sea-goat
        Aquarius: 'M4 10h16M4 14h16M8 10l-2 4M16 10l2 4', // Water waves
        Pisces: 'M12 4v16M6 8a4 4 0 016 0M18 16a4 4 0 01-6 0', // Two fish
    }

    const path = zodiacPaths[sign] || zodiacPaths.Aries

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={elementColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            role="img"
            aria-label={`${sign} zodiac symbol`}
        >
            <path d={path} />
        </svg>
    )
}
