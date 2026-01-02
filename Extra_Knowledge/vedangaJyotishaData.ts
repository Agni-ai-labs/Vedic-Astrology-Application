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
    verse: 'तारेषु चन्द्रमा रजन्या विचरति। षड्विंशतिस्तारेषु चतुश्चरणेषु।',
    translation: 'The Moon travels among the stars at night. There are 27 nakshatras with 4 padas (quarters) each.',
    principle: 'The zodiac is divided into 27 equal parts of 13°20\' each, called nakshatras',
    application: 'Used for timing ceremonies, marriages, agriculture, and determining personality traits',
    modernRelevance: 'Foundation of Vedic astrology\'s nakshatra system, used in birth chart analysis and muhurta selection'
  },
  {
    id: 'vj_tithi_001',
    category: 'Tithi',
    verse: 'पञ्चदश तिथयः शुक्लपक्षे कृष्णपक्षे च।',
    translation: 'There are 15 tithis in the bright half (Shukla Paksha) and 15 in the dark half (Krishna Paksha)',
    principle: 'Lunar month divided into 30 tithis based on Moon-Sun angular separation',
    application: 'Determines auspicious and inauspicious days for various activities',
    modernRelevance: 'Foundation of Hindu calendar, used in muhurta selection and festival determination'
  },
  {
    id: 'vj_karana_001',
    category: 'Karana',
    verse: 'एकादश करणानि। बव बालव कौलव तैतिल गर वणिज विष्टिः शकुनि चतुष्पाद नाग किम्स्तुघ्नः।',
    translation: 'There are 11 karanas: Bava, Balava, Kaulava, Taitila, Garaja, Vanija, Vishti (Bhadra), Shakuni, Chatushpada, Naga, Kimstughna',
    principle: 'Half of a tithi equals one karana. 7 are movable (repeated), 4 are fixed',
    application: 'Determines quality of time for specific activities',
    modernRelevance: 'Used in muhurta selection, especially for travel and business activities'
  },
  {
    id: 'vj_yoga_001',
    category: 'Yoga',
    verse: 'सप्तविंशतिः योगाः। विष्कम्भादिः वैधृत्यन्तः।',
    translation: 'There are 27 yogas from Vishkambha to Vaidhrti',
    principle: 'Yogas formed by combined motion of Sun and Moon (13°20\' divisions)',
    application: 'Determines auspiciousness of time periods',
    modernRelevance: 'Used in panchanga and muhurta selection'
  },
  {
    id: 'vj_vara_001',
    category: 'Vara',
    verse: 'सप्त वाराः। आदित्यः सोमः मङ्गलः बुधः गुरुः शुक्रः शनिः।',
    translation: 'There are 7 varas (weekdays): Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn',
    principle: 'Seven-day week based on planetary rulership',
    application: 'Each day ruled by a planet influences activities',
    modernRelevance: 'Foundation of remedial measures (e.g., fasting on specific days)'
  }
];
