/**
 * Vedanga Jyotisha Data
 * 
 * Classical Sanskrit principles from the Vedanga Jyotisha text,
 * one of the six auxiliary disciplines (Vedangas) of the Vedas.
 */

export interface VedangaJyotishaRule {
    id: string;
    category: 'Nakshatra' | 'Tithi' | 'Karana' | 'Yoga' | 'Vara' | 'Muhurta';
    verse: string;
    translation: string;
    principle: string;
    application: string;
    modernRelevance: string;
}

export const VEDANGA_JYOTISHA_PRINCIPLES: VedangaJyotishaRule[] = [
    {
        id: 'vj_nakshatra_001',
        category: 'Nakshatra',
        verse: 'tareshu chandrama rajanya vicharati. shadvimshatisthareshu chatushcharaneshu.',
        translation: 'The Moon travels among the stars at night. There are 27 nakshatras with 4 padas (quarters) each.',
        principle: 'The zodiac is divided into 27 equal parts of 13 degrees 20 minutes each, called nakshatras',
        application: 'Used for timing ceremonies, marriages, agriculture, and determining personality traits',
        modernRelevance: 'Foundation of Vedic astrology nakshatra system, used in birth chart analysis and muhurta selection'
    },
    {
        id: 'vj_tithi_001',
        category: 'Tithi',
        verse: 'panchadasha tithayah shuklapakshe krishnapakshe cha.',
        translation: 'There are 15 tithis in the bright half (Shukla Paksha) and 15 in the dark half (Krishna Paksha)',
        principle: 'Lunar month divided into 30 tithis based on Moon-Sun angular separation',
        application: 'Determines auspicious and inauspicious days for various activities',
        modernRelevance: 'Foundation of Hindu calendar, used in muhurta selection and festival determination'
    },
    {
        id: 'vj_karana_001',
        category: 'Karana',
        verse: 'ekadasha karanani. bava balava kaulava taitila gara vanij vishtih shakuni chatushpada naga kimstughnah.',
        translation: 'There are 11 karanas: Bava, Balava, Kaulava, Taitila, Garaja, Vanija, Vishti (Bhadra), Shakuni, Chatushpada, Naga, Kimstughna',
        principle: 'Half of a tithi equals one karana. 7 are movable (repeated), 4 are fixed',
        application: 'Determines quality of time for specific activities',
        modernRelevance: 'Used in muhurta selection, especially for travel and business activities'
    },
    {
        id: 'vj_yoga_001',
        category: 'Yoga',
        verse: 'saptavimshatihi yogaah. vishkambhadih vadhritayantah.',
        translation: 'There are 27 yogas from Vishkambha to Vaidhrti',
        principle: 'Yogas formed by combined motion of Sun and Moon (13 degrees 20 minutes divisions)',
        application: 'Determines auspiciousness of time periods',
        modernRelevance: 'Used in panchanga and muhurta selection'
    },
    {
        id: 'vj_vara_001',
        category: 'Vara',
        verse: 'sapta varaah. adityah somah mangalah budhah guruh shukrah shanih.',
        translation: 'There are 7 varas (weekdays): Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn',
        principle: 'Seven-day week based on planetary rulership',
        application: 'Each day ruled by a planet influences activities',
        modernRelevance: 'Foundation of remedial measures (e.g., fasting on specific days)'
    },
    {
        id: 'vj_muhurta_001',
        category: 'Muhurta',
        verse: 'ahoratrau trimshatmuhurtau.',
        translation: 'The day and night together contain 30 muhurtas',
        principle: 'Each muhurta equals 48 minutes. Day has 15 muhurtas, night has 15 muhurtas.',
        application: 'Selecting auspicious time windows for important activities',
        modernRelevance: 'Abhijit Muhurta (victory muhurta) at midday is universally auspicious'
    }
];

// 27 Nakshatras with their lords and characteristics
export const NAKSHATRAS_DATA = [
    { name: 'Ashwini', lord: 'Ketu', deity: 'Ashwini Kumaras', nature: 'Swift', quality: 'Light' },
    { name: 'Bharani', lord: 'Venus', deity: 'Yama', nature: 'Fierce', quality: 'Balanced' },
    { name: 'Krittika', lord: 'Sun', deity: 'Agni', nature: 'Mixed', quality: 'Sharp' },
    { name: 'Rohini', lord: 'Moon', deity: 'Brahma', nature: 'Fixed', quality: 'Soft' },
    { name: 'Mrigashira', lord: 'Mars', deity: 'Soma', nature: 'Soft', quality: 'Tender' },
    { name: 'Ardra', lord: 'Rahu', deity: 'Rudra', nature: 'Sharp', quality: 'Harsh' },
    { name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi', nature: 'Movable', quality: 'Light' },
    { name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati', nature: 'Light', quality: 'Nurturing' },
    { name: 'Ashlesha', lord: 'Mercury', deity: 'Serpent', nature: 'Sharp', quality: 'Harsh' },
    { name: 'Magha', lord: 'Ketu', deity: 'Pitris', nature: 'Fierce', quality: 'Royal' },
    { name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga', nature: 'Fierce', quality: 'Creative' },
    { name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman', nature: 'Fixed', quality: 'Balanced' },
    { name: 'Hasta', lord: 'Moon', deity: 'Savitar', nature: 'Light', quality: 'Swift' },
    { name: 'Chitra', lord: 'Mars', deity: 'Vishwakarma', nature: 'Soft', quality: 'Brilliant' },
    { name: 'Swati', lord: 'Rahu', deity: 'Vayu', nature: 'Movable', quality: 'Light' },
    { name: 'Vishakha', lord: 'Jupiter', deity: 'Indra-Agni', nature: 'Mixed', quality: 'Soft' },
    { name: 'Anuradha', lord: 'Saturn', deity: 'Mitra', nature: 'Soft', quality: 'Tender' },
    { name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra', nature: 'Sharp', quality: 'Fierce' },
    { name: 'Mula', lord: 'Ketu', deity: 'Nirriti', nature: 'Sharp', quality: 'Fierce' },
    { name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas', nature: 'Fierce', quality: 'Invincible' },
    { name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishvedevas', nature: 'Fixed', quality: 'Steadfast' },
    { name: 'Shravana', lord: 'Moon', deity: 'Vishnu', nature: 'Movable', quality: 'Gentle' },
    { name: 'Dhanishta', lord: 'Mars', deity: 'Vasus', nature: 'Movable', quality: 'Fierce' },
    { name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna', nature: 'Movable', quality: 'Harsh' },
    { name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada', nature: 'Fierce', quality: 'Fierce' },
    { name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahir Budhnya', nature: 'Fixed', quality: 'Balanced' },
    { name: 'Revati', lord: 'Mercury', deity: 'Pushan', nature: 'Soft', quality: 'Tender' }
];

// 30 Tithis with their meanings
export const TITHIS_DATA = [
    // Shukla Paksha (Bright Half)
    { number: 1, name: 'Pratipada', paksha: 'Shukla', lord: 'Agni', nature: 'Nanda' },
    { number: 2, name: 'Dwitiya', paksha: 'Shukla', lord: 'Brahma', nature: 'Bhadra' },
    { number: 3, name: 'Tritiya', paksha: 'Shukla', lord: 'Gauri', nature: 'Jaya' },
    { number: 4, name: 'Chaturthi', paksha: 'Shukla', lord: 'Ganesha', nature: 'Rikta' },
    { number: 5, name: 'Panchami', paksha: 'Shukla', lord: 'Nagas', nature: 'Purna' },
    { number: 6, name: 'Shashthi', paksha: 'Shukla', lord: 'Kartikeya', nature: 'Nanda' },
    { number: 7, name: 'Saptami', paksha: 'Shukla', lord: 'Surya', nature: 'Bhadra' },
    { number: 8, name: 'Ashtami', paksha: 'Shukla', lord: 'Shiva', nature: 'Jaya' },
    { number: 9, name: 'Navami', paksha: 'Shukla', lord: 'Durga', nature: 'Rikta' },
    { number: 10, name: 'Dashami', paksha: 'Shukla', lord: 'Yama', nature: 'Purna' },
    { number: 11, name: 'Ekadashi', paksha: 'Shukla', lord: 'Vishnu', nature: 'Nanda' },
    { number: 12, name: 'Dwadashi', paksha: 'Shukla', lord: 'Hari', nature: 'Bhadra' },
    { number: 13, name: 'Trayodashi', paksha: 'Shukla', lord: 'Kamadeva', nature: 'Jaya' },
    { number: 14, name: 'Chaturdashi', paksha: 'Shukla', lord: 'Shiva', nature: 'Rikta' },
    { number: 15, name: 'Purnima', paksha: 'Shukla', lord: 'Chandra', nature: 'Purna' },
    // Krishna Paksha (Dark Half)
    { number: 16, name: 'Pratipada', paksha: 'Krishna', lord: 'Agni', nature: 'Nanda' },
    { number: 17, name: 'Dwitiya', paksha: 'Krishna', lord: 'Brahma', nature: 'Bhadra' },
    { number: 18, name: 'Tritiya', paksha: 'Krishna', lord: 'Gauri', nature: 'Jaya' },
    { number: 19, name: 'Chaturthi', paksha: 'Krishna', lord: 'Ganesha', nature: 'Rikta' },
    { number: 20, name: 'Panchami', paksha: 'Krishna', lord: 'Nagas', nature: 'Purna' },
    { number: 21, name: 'Shashthi', paksha: 'Krishna', lord: 'Kartikeya', nature: 'Nanda' },
    { number: 22, name: 'Saptami', paksha: 'Krishna', lord: 'Surya', nature: 'Bhadra' },
    { number: 23, name: 'Ashtami', paksha: 'Krishna', lord: 'Shiva', nature: 'Jaya' },
    { number: 24, name: 'Navami', paksha: 'Krishna', lord: 'Durga', nature: 'Rikta' },
    { number: 25, name: 'Dashami', paksha: 'Krishna', lord: 'Yama', nature: 'Purna' },
    { number: 26, name: 'Ekadashi', paksha: 'Krishna', lord: 'Vishnu', nature: 'Nanda' },
    { number: 27, name: 'Dwadashi', paksha: 'Krishna', lord: 'Hari', nature: 'Bhadra' },
    { number: 28, name: 'Trayodashi', paksha: 'Krishna', lord: 'Kamadeva', nature: 'Jaya' },
    { number: 29, name: 'Chaturdashi', paksha: 'Krishna', lord: 'Shiva', nature: 'Rikta' },
    { number: 30, name: 'Amavasya', paksha: 'Krishna', lord: 'Pitris', nature: 'Purna' }
];

// 27 Yogas of Panchanga
export const YOGAS_DATA = [
    { name: 'Vishkambha', meaning: 'Obstruction', nature: 'Bad' },
    { name: 'Priti', meaning: 'Love', nature: 'Good' },
    { name: 'Ayushman', meaning: 'Long Life', nature: 'Good' },
    { name: 'Saubhagya', meaning: 'Good Fortune', nature: 'Good' },
    { name: 'Shobhana', meaning: 'Splendor', nature: 'Good' },
    { name: 'Atiganda', meaning: 'Great Danger', nature: 'Bad' },
    { name: 'Sukarma', meaning: 'Good Deeds', nature: 'Good' },
    { name: 'Dhriti', meaning: 'Firmness', nature: 'Good' },
    { name: 'Shoola', meaning: 'Pain', nature: 'Bad' },
    { name: 'Ganda', meaning: 'Danger', nature: 'Bad' },
    { name: 'Vriddhi', meaning: 'Growth', nature: 'Good' },
    { name: 'Dhruva', meaning: 'Steady', nature: 'Good' },
    { name: 'Vyaghata', meaning: 'Slaughter', nature: 'Bad' },
    { name: 'Harshana', meaning: 'Joy', nature: 'Good' },
    { name: 'Vajra', meaning: 'Thunderbolt', nature: 'Mixed' },
    { name: 'Siddhi', meaning: 'Success', nature: 'Good' },
    { name: 'Vyatipata', meaning: 'Calamity', nature: 'Bad' },
    { name: 'Variyan', meaning: 'Comfort', nature: 'Good' },
    { name: 'Parigha', meaning: 'Obstacle', nature: 'Bad' },
    { name: 'Shiva', meaning: 'Auspicious', nature: 'Good' },
    { name: 'Siddha', meaning: 'Perfect', nature: 'Good' },
    { name: 'Sadhya', meaning: 'Achievable', nature: 'Good' },
    { name: 'Shubha', meaning: 'Fortunate', nature: 'Good' },
    { name: 'Shukla', meaning: 'Bright', nature: 'Good' },
    { name: 'Brahma', meaning: 'Creator', nature: 'Good' },
    { name: 'Indra', meaning: 'Lord of Gods', nature: 'Good' },
    { name: 'Vaidhriti', meaning: 'Discord', nature: 'Bad' }
];

// 11 Karanas
export const KARANAS_DATA = [
    // Movable Karanas (repeat 8 times in a month)
    { name: 'Bava', nature: 'Movable', meaning: 'Good for starting' },
    { name: 'Balava', nature: 'Movable', meaning: 'Good for auspicious works' },
    { name: 'Kaulava', nature: 'Movable', meaning: 'Good for friends' },
    { name: 'Taitila', nature: 'Movable', meaning: 'Good for luxuries' },
    { name: 'Gara', nature: 'Movable', meaning: 'Good for agriculture' },
    { name: 'Vanija', nature: 'Movable', meaning: 'Good for trade' },
    { name: 'Vishti', nature: 'Movable', meaning: 'Inauspicious (Bhadra)' },
    // Fixed Karanas (appear once in a month)
    { name: 'Shakuni', nature: 'Fixed', meaning: 'Mixed results' },
    { name: 'Chatushpada', nature: 'Fixed', meaning: 'Good for animals' },
    { name: 'Naga', nature: 'Fixed', meaning: 'Inauspicious' },
    { name: 'Kimstughna', nature: 'Fixed', meaning: 'Very auspicious' }
];
