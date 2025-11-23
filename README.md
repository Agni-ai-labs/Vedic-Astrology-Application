# Vedic Astrology Application

Comprehensive astrology application integrating Vedic, Lal Kitab, Numerology, Western, and Tarot systems with Lala Ramswaroop Calendar.

## Features

- **Vedic Astrology**: D1/D9 charts, Vimshottari Dasha, Yogas, Doshas, Transit analysis
- **Lal Kitab**: Rinanubandha analysis, Simple remedies (totke), Varshphal predictions
- **Numerology**: Life Path, Destiny, Soul Urge numbers, Name analysis
- **Western Astrology**: Sun/Moon/Rising signs, Monthly horoscopes, Natal charts
- **Tarot Readings**: Interactive cards with hover animations, Multiple spreads
- **Lala Ramswaroop Calendar**: Panchang, Muhurats, Festival dates, Remedy timing

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Apple/Vercel inspired design)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Design**: Dark theme with clean, minimal aesthetic

## Installation

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd vedic-astrology-application

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage (95% target)
npm run test:coverage

# Run tests in UI mode
npm run test:ui

# Run E2E tests
npm run test:e2e

# Run E2E tests with browser UI
npm run test:e2e:headed
```

## Project Structure

```
/src
  /components
    /tabs           - Main tab components (Vedic, LalKitab, Western, Tarot, etc.)
    /western        - Western astrology components (Sun/Moon/Rising sections)
    /tarot          - Tarot card components with animations
    /charts         - Chart visualization components
    /forms          - Birth details form
    /reports        - Report sections
    /ui             - Base UI components (Card, Button, Tabs, Badge)
  /services
    /calculations   - Calculation engines for all systems
    /scraping       - Web scraping services (respectful, rate-limited)
  /data             - JSON data files (ephemeris, tarot deck, panchang)
  /utils            - Utility functions
  /types            - TypeScript type definitions
  /styles           - CSS and animation files
  /hooks            - Custom React hooks
  /constants        - Constants and configuration
```

## Critical Technical Constraints

**ZERO TOLERANCE RULES:**
- NO emojis anywhere in the codebase
- NO localStorage/sessionStorage (privacy-first, React state only)
- NO file deletion without creating .backup files
- 95% minimum test coverage required
- Zero ESLint errors/warnings
- WCAG 2.1 AA accessibility compliance

## Design System

### Color Palette
- **Backgrounds**: #000000, #0a0a0a, #1a1a1a, #2a2a2a
- **Accents**: #0070f3 (blue), #7928ca (purple), #ff0080 (pink)
- **Text**: #ffffff, #e5e5e5, #a0a0a0
- **Status**: #10b981 (success), #f59e0b (warning), #ef4444 (error)
- **Elements**: Fire (#ef4444), Earth (#10b981), Air (#3b82f6), Water (#8b5cf6)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## Privacy & Security

- All calculations performed client-side
- No user data sent to servers
- No cookies or tracking
- No browser storage usage
- Content Security Policy enforced

## Quality Standards

- **Test Coverage**: 95% minimum (lines, functions, statements)
- **Performance**: Lighthouse score > 90
- **Bundle Size**: < 500KB gzipped
- **Accessibility**: WCAG 2.1 AA compliant
- **TypeScript**: Strict mode, no implicit any

## Development Status

### Completed
- [x] Project foundation with Vite + React + TypeScript
- [x] Tailwind CSS setup with custom design system
- [x] Type system for all astrology features
- [x] Git repository initialization
- [x] Testing infrastructure configuration

### In Progress
- [ ] Western Astrology components (Sun/Moon/Rising signs)
- [ ] Tarot card components with hover animations
- [ ] Lala Ramswaroop Calendar integration

### Planned
- [ ] Vedic Astrology tab
- [ ] Lal Kitab tab
- [ ] Numerology tab
- [ ] Combined Analysis tab
- [ ] Birth details form
- [ ] Chart visualizations
- [ ] Comprehensive test suite (95%+ coverage)
- [ ] Production deployment

## Contributing

1. Follow strict TypeScript typing (no `any` types)
2. Write tests for all new features (TDD approach)
3. Run linting before commits
4. Ensure accessibility standards
5. Update documentation

## License

[License information to be added]

## Acknowledgments

Built with respect for ancient astrological sciences and modern software engineering excellence.
