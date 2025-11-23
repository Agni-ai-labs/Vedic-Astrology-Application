# Data Sources for Vedic Astrology Application

This document outlines all external data sources for astrological calculations and predictions.

## Calendar & Panchang Sources

### 1. Lala Ramswaroop Calendar
**URL**: https://lalaramswaroop.net/
**Data to Scrape**:
- Daily Panchang (Tithi, Nakshatra, Yoga, Karan)
- Festival dates (Hindu, Islam, Christianity, Sikhism, Jainism, Buddhism)
- Muhurat timings (Wedding, Business, Travel, Home Purchase, etc.)
- Monthly Rashifal (horoscope predictions)
- Vrat (fasting) days and timings
- Inauspicious periods (Rahu Kaal, Yamaganda, Gulika)
- Auspicious periods (Abhijit Muhurat, Amrit Kaal)

**Scraping Frequency**: Monthly
**Storage**: `src/data/lalaRamswaroopPanchang.json`

### 2. Thakur Prasad Calendar
**URL**: https://thakurprasad.com/
**Data to Scrape**:
- Panchang data with precise timings
- Nakshatra transit details
- Planetary positions
- Eclipse timings and effects
- Kundli Dosh analysis
- Remedy suggestions (totke)
- Regional variations in Panchang
- Agricultural timings (crop sowing, harvesting)

**Scraping Frequency**: Monthly
**Storage**: `src/data/thakurPrasadPanchang.json`

**Integration Strategy**:
- Cross-reference both calendars for accuracy
- Use average if timings differ slightly
- Flag major discrepancies for user review
- Prefer Thakur Prasad for Nakshatra-specific data
- Prefer Lala Ramswaroop for festival dates

---

## Vedic Astrology Sources

### 3. AstroSage.com
**URL**: https://www.astrosage.com/
**Data to Extract**:
- Kundli interpretations
- Dasha predictions
- Yoga explanations
- Dosha analysis (Manglik, Kaal Sarp, Pitra)
- Gemstone recommendations
- Transit effects
- Compatibility reports

**Respect ToS**: 
- Rate limit: 1 request per 3 seconds
- Cache: 7 days
- User-Agent: Include proper identification

**Storage**: Dynamic cache in memory

### 4. GaneshaSpeaks.com
**URL**: https://www.ganeshaspeaks.com/
**Data to Extract**:
- Remedy suggestions
- Transit predictions
- Daily horoscope insights
- Career guidance
- Relationship compatibility

**Storage**: Dynamic cache in memory

### 5. AstroVed.com
**URL**: https://www.astroved.com/
**Data to Extract**:
- Vedang Jyotish principles
- Bhrigu Samhita predictions
- Temple/puja recommendations
- Yantra suggestions

**Storage**: Dynamic cache in memory

---

## Lal Kitab Sources

### 6. LalKitab.com
**URL**: http://www.lalkitab.com/
**Data to Extract**:
- Varshphal calculations
- Rinanubandha analysis
- Simple remedies (totke) without donations
- Blind planets identification
- Lal Kitab birth chart interpretations

**Storage**: `src/data/lalKitabRemedies.json`

### 7. Additional Hindu Kundli Sources

#### 7a. Clickastro.com
**URL**: https://www.clickastro.com/
**Data**: Comprehensive kundli analysis, marriage compatibility

#### 7b. Mpanchang.com
**URL**: https://www.mpanchang.com/
**Data**: Detailed Panchang, Muhurat, Kundli matching

#### 7c. DrikPanchang.com
**URL**: https://www.drikpanchang.com/
**Data**: Precise Hindu calendar, Panchang, Festival dates

#### 7d. Prokerala.com
**URL**: https://www.prokerala.com/astrology/
**Data**: Free kundli, horoscope matching, numerology

#### 7e. AstroSanhita.com
**URL**: https://astrosanhita.com/
**Data**: Vedic astrology articles, kundli analysis

---

## Western Astrology Sources

### 8. Cafe Astrology
**URL**: https://cafeastrology.com/
**Data to Extract**:
- Monthly horoscopes for all 12 signs
- Transit interpretations
- Aspect meanings
- House system explanations

**Scraping Frequency**: Monthly (at month start)
**Storage**: `src/data/monthlyHoroscopes.json`

### 9. Astro.com (Swiss Ephemeris)
**URL**: https://www.astro.com/
**Data to Extract**:
- Planetary positions (use Swiss Ephemeris data)
- Chart calculations
- Aspect tables
- House cusps

**Storage**: `src/data/ephemeris.json`

---

## Tarot Sources

### 10. Biddy Tarot
**URL**: https://www.biddytarot.com/
**Data to Extract**:
- Rider-Waite card meanings
- Upright and reversed interpretations
- Spread layouts
- Reading techniques

**Storage**: `src/data/tarotDeck.json`

### 11. Labyrinthos
**URL**: https://labyrinthos.co/
**Data**: Card meanings, astrological correspondences

---

## Numerology Sources

### 12. Numerology.com
**URL**: https://www.numerology.com/
**Data to Extract**:
- Life Path meanings
- Destiny Number interpretations
- Master Numbers (11, 22, 33)
- Name numerology calculations

**Storage**: `src/data/numerologyMeanings.json`

### 13. Token Rock
**URL**: https://www.tokenrock.com/numerology/
**Data**: Pythagorean and Chaldean systems

---

## Ephemeris & Astronomical Data

### 14. NASA JPL Horizons
**URL**: https://ssd.jpl.nasa.gov/horizons/
**Data**: Precise planetary positions for calculations
**Usage**: Backup for Swiss Ephemeris

### 15. TimeAndDate.com
**URL**: https://www.timeanddate.com/
**Data**: Timezone conversions, sunrise/sunset times

---

## Scraping Best Practices

### Ethical Guidelines
1. **robots.txt Compliance**: Check and respect robots.txt
2. **Rate Limiting**: Minimum 2-3 seconds between requests
3. **Caching**: Cache for at least 24 hours to reduce server load
4. **User-Agent**: Identify as educational/personal use
5. **No Overload**: Never send parallel requests to same domain
6. **Attribution**: Credit sources in generated reports

### Implementation Strategy
```typescript
interface ScraperConfig {
  url: string;
  rateLimit: number; // milliseconds
  cacheExpiry: number; // milliseconds
  userAgent: string;
  respectRobotsTxt: boolean;
}

const scraperConfigs = {
  lalaRamswaroop: {
    url: 'https://lalaramswaroop.net/',
    rateLimit: 2000,
    cacheExpiry: 2592000000, // 30 days
    userAgent: 'VedicAstrologyApp/1.0 (Educational)',
    respectRobotsTxt: true,
  },
  thakurPrasad: {
    url: 'https://thakurprasad.com/',
    rateLimit: 3000,
    cacheExpiry: 2592000000, // 30 days
    userAgent: 'VedicAstrologyApp/1.0 (Educational)',
    respectRobotsTxt: true,
  },
  // ... other configs
};
```

### Data Validation
- Cross-reference multiple sources for accuracy
- Flag conflicting data for manual review
- Use majority consensus for predictions
- Document data source provenance

---

## Offline Fallback Data

For times when scraping is unavailable, maintain:
1. **Static Zodiac Data**: `zodiacSigns.json` (already created)
2. **Basic Tarot Meanings**: Core 78 cards with standard interpretations
3. **Ephemeris Tables**: 10-year planetary position tables
4. **Panchang Calculations**: Algorithmic calculation as backup

---

## Data Update Schedule

| Source | Frequency | Priority |
|--------|-----------|----------|
| Lala Ramswaroop Panchang | Monthly | High |
| Thakur Prasad Panchang | Monthly | High |
| Monthly Horoscopes | Monthly | High |
| Vedic Site Data | On-demand | Medium |
| Tarot Deck | Once | Low |
| Numerology Meanings | Once | Low |
| Ephemeris | Yearly | Medium |

---

## Implementation Priority

**Phase 1** (Current): Static data files, zodiac signs
**Phase 2**: Lala Ramswaroop Calendar integration
**Phase 3**: Thakur Prasad Calendar integration
**Phase 4**: Monthly horoscope scraping (Western)
**Phase 5**: On-demand Vedic kundli data
**Phase 6**: Complete tarot deck with images
**Phase 7**: Advanced numerology calculations

---

## Legal & Privacy Considerations

- All scraped data used for personal/educational purposes only
- No commercial distribution of scraped content
- User birth data never sent to external servers
- All calculations performed client-side
- No tracking or analytics without consent
