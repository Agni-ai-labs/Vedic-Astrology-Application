const fs = require('fs');
const path = require('path');

const suits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const ranks = [
    { name: 'Ace', number: 1, keywords: ['New beginnings', 'Potential', 'Pure energy'] },
    { name: 'Two', number: 2, keywords: ['Balance', 'Partnership', 'Duality'] },
    { name: 'Three', number: 3, keywords: ['Growth', 'Creativity', 'Groups'] },
    { name: 'Four', number: 4, keywords: ['Stability', 'Structure', 'Rest'] },
    { name: 'Five', number: 5, keywords: ['Conflict', 'Change', 'Loss'] },
    { name: 'Six', number: 6, keywords: ['Harmony', 'Adjustment', 'Help'] },
    { name: 'Seven', number: 7, keywords: ['Strategy', 'Choices', 'Assessment'] },
    { name: 'Eight', number: 8, keywords: ['Movement', 'Power', 'Action'] },
    { name: 'Nine', number: 9, keywords: ['Fulfillment', 'Completion', 'Solitude'] },
    { name: 'Ten', number: 10, keywords: ['Culmination', 'End of cycle', 'Legacy'] },
    { name: 'Page', number: 11, keywords: ['Message', 'Youth', 'Potential'] },
    { name: 'Knight', number: 12, keywords: ['Action', 'Quest', 'Movement'] },
    { name: 'Queen', number: 13, keywords: ['Nurturing', 'Maturity', 'Intuition'] },
    { name: 'King', number: 14, keywords: ['Authority', 'Mastery', 'Control'] }
];

const majorArcana = [
    { name: 'The Fool', number: 0, element: 'Air', zodiac: 'Uranus', keywords: ['New beginnings', 'Innocence', 'Spontaneity'] },
    { name: 'The Magician', number: 1, element: 'Air', zodiac: 'Mercury', keywords: ['Manifestation', 'Power', 'Action'] },
    { name: 'The High Priestess', number: 2, element: 'Water', zodiac: 'Moon', keywords: ['Intuition', 'Mystery', 'Subconscious'] },
    { name: 'The Empress', number: 3, element: 'Earth', zodiac: 'Venus', keywords: ['Fertility', 'Nurturing', 'Abundance'] },
    { name: 'The Emperor', number: 4, element: 'Fire', zodiac: 'Aries', keywords: ['Authority', 'Structure', 'Control'] },
    { name: 'The Hierophant', number: 5, element: 'Earth', zodiac: 'Taurus', keywords: ['Tradition', 'Beliefs', 'Conformity'] },
    { name: 'The Lovers', number: 6, element: 'Air', zodiac: 'Gemini', keywords: ['Love', 'Union', 'Choices'] },
    { name: 'The Chariot', number: 7, element: 'Water', zodiac: 'Cancer', keywords: ['Willpower', 'Victory', 'Determination'] },
    { name: 'Strength', number: 8, element: 'Fire', zodiac: 'Leo', keywords: ['Courage', 'Patience', 'Compassion'] },
    { name: 'The Hermit', number: 9, element: 'Earth', zodiac: 'Virgo', keywords: ['Introspection', 'Solitude', 'Guidance'] },
    { name: 'Wheel of Fortune', number: 10, element: 'Fire', zodiac: 'Jupiter', keywords: ['Change', 'Cycles', 'Destiny'] },
    { name: 'Justice', number: 11, element: 'Air', zodiac: 'Libra', keywords: ['Fairness', 'Truth', 'Law'] },
    { name: 'The Hanged Man', number: 12, element: 'Water', zodiac: 'Neptune', keywords: ['Surrender', 'Perspective', 'Sacrifice'] },
    { name: 'Death', number: 13, element: 'Water', zodiac: 'Scorpio', keywords: ['Endings', 'Transformation', 'Transition'] },
    { name: 'Temperance', number: 14, element: 'Fire', zodiac: 'Sagittarius', keywords: ['Balance', 'Moderation', 'Patience'] },
    { name: 'The Devil', number: 15, element: 'Earth', zodiac: 'Capricorn', keywords: ['Addiction', 'Materialism', 'Bondage'] },
    { name: 'The Tower', number: 16, element: 'Fire', zodiac: 'Mars', keywords: ['Disaster', 'Upheaval', 'Revelation'] },
    { name: 'The Star', number: 17, element: 'Air', zodiac: 'Aquarius', keywords: ['Hope', 'Faith', 'Rejuvenation'] },
    { name: 'The Moon', number: 18, element: 'Water', zodiac: 'Pisces', keywords: ['Illusion', 'Fear', 'Anxiety'] },
    { name: 'The Sun', number: 19, element: 'Fire', zodiac: 'Sun', keywords: ['Joy', 'Success', 'Vitality'] },
    { name: 'Judgement', number: 20, element: 'Fire', zodiac: 'Pluto', keywords: ['Rebirth', 'Calling', 'Absolution'] },
    { name: 'The World', number: 21, element: 'Earth', zodiac: 'Saturn', keywords: ['Completion', 'Integration', 'Travel'] }
];

const deck = [];

// Generate Major Arcana
majorArcana.forEach(card => {
    deck.push({
        id: `major-${card.number}`,
        name: card.name,
        number: card.number,
        arcana: 'Major',
        suit: null,
        uprightMeaning: {
            keywords: card.keywords,
            description: `${card.name} represents ${card.keywords.join(', ').toLowerCase()}. It signifies a time of ${card.keywords[0].toLowerCase()} and ${card.keywords[1].toLowerCase()}.`
        },
        reversedMeaning: {
            keywords: card.keywords.map(k => `Blocked ${k.toLowerCase()}`),
            description: `Reversed, ${card.name} suggests issues with ${card.keywords.join(', ').toLowerCase()}. You may be experiencing blocked energy or resistance.`
        },
        zodiacSign: card.zodiac,
        element: card.element,
        imageUrl: `/tarot/major-${String(card.number).padStart(2, '0')}-${card.name.toLowerCase().replace(/\s+/g, '-')}.svg`
    });
});

// Generate Minor Arcana
suits.forEach(suit => {
    ranks.forEach(rank => {
        const element = suit === 'Wands' ? 'Fire' : suit === 'Cups' ? 'Water' : suit === 'Swords' ? 'Air' : 'Pentacles' ? 'Earth' : 'Unknown';
        deck.push({
            id: `${suit.toLowerCase()}-${rank.name.toLowerCase()}`,
            name: `${rank.name} of ${suit}`,
            number: rank.number,
            arcana: 'Minor',
            suit: suit,
            uprightMeaning: {
                keywords: [...rank.keywords, suit],
                description: `The ${rank.name} of ${suit} represents ${rank.keywords.join(', ').toLowerCase()} in the realm of ${suit}.`
            },
            reversedMeaning: {
                keywords: rank.keywords.map(k => `Blocked ${k.toLowerCase()}`),
                description: `Reversed, the ${rank.name} of ${suit} suggests challenges with ${rank.keywords.join(', ').toLowerCase()}.`
            },
            element: element,
            imageUrl: `/tarot/${suit.toLowerCase()}-${rank.name.toLowerCase()}.svg`
        });
    });
});

const outputPath = path.join('d:', 'Vedic Astrology Application', 'src', 'data', 'tarotDeck.json');
fs.writeFileSync(outputPath, JSON.stringify(deck, null, 4));
console.log(`Generated ${deck.length} cards to ${outputPath}`);
