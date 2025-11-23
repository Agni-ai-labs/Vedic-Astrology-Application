export const COMPREHENSIVE_YOGA_DATASET = [
    {
        name: 'Gaja Kesari Yoga',
        category: 'Raj',
        rarity: 'Common',
        formation: {
            rule: 'Jupiter is in a Kendra (1st, 4th, 7th, 10th house) from the Moon',
            cancellationFactors: ['Jupiter or Moon combust', 'Jupiter or Moon debilitated'],
            strengtheningFactors: ['Jupiter exalted', 'Moon exalted', 'Both in own signs']
        },
        effects: {
            general: 'This yoga brings wealth, intelligence, fame, and virtuous conduct. The native gains respect in society and achieves success in endeavors.',
            lifeAreas: { wealth: 8, career: 7, fame: 9, health: 5, relationships: 6 }
        },
        remedies: {
            primary: [{
                type: 'Mantra',
                details: 'Om Brihaspataye Namaha (Jupiter mantra)',
                effectiveness: 8,
                cost: 'Low',
                duration: '40 days',
                timing: 'Thursday morning'
            }],
            secondary: [],
            mantras: ['Om Brihaspataye Namaha'],
            gemstones: ['Yellow Sapphire (for Jupiter)'],
            charities: ['Donate to educational institutions', 'Feed Brahmins on Thursdays']
        },
        classicalReferences: [{
            text: 'Brihat Parashara Hora Shastra',
            chapter: 'Chapter on Yogas',
            verse: '41-42',
            translation: 'When Jupiter is in a quadrant from the Moon, the person will be renowned, intelligent, and respected by rulers.'
        }],
        modernInterpretation: 'Success in education, law, teaching, or advisory roles. Strong analytical and communication abilities.',
        relatedYogas: ['Hamsa Yoga', 'Sunapha Yoga']
    },
    {
        name: 'Hamsa Yoga (Pancha Mahapurusha)',
        category: 'Raj',
        rarity: 'Moderate',
        formation: {
            rule: 'Jupiter in own sign (Sagittarius/Pisces) or exalted (Cancer) in a Kendra',
            cancellationFactors: ['Jupiter combust', 'Malefic conjunctions'],
            strengtheningFactors: ['Jupiter exalted in Cancer', 'No malefic aspects']
        },
        effects: {
            general: 'Bestows spiritual wisdom, righteousness, wealth, and charitable nature. The native becomes a respected leader and counselor.',
            lifeAreas: { wealth: 9, career: 8, fame: 9, health: 7, relationships: 7, spirituality: 10 }
        },
        remedies: {
            primary: [],
            secondary: [],
            mantras: ['Om Gram Greem Graum Sah Gurave Namaha'],
            gemstones: ['Yellow Sapphire']
        },
        classicalReferences: [{
            text: 'Brihat Parashara Hora Shastra',
            chapter: 'Pancha Mahapurusha Yogas',
            verse: '75',
            translation: 'One born in Hamsa Yoga will be righteous, will have marks of conch and lotus, will be charitable and have sweet voice.'
        }],
        modernInterpretation: 'Excellent for religious leaders, philosophers, professors, and ethical business leaders.'
    },
    {
        name: 'Malavya Yoga (Pancha Mahapurusha)',
        category: 'Raj',
        rarity: 'Moderate',
        formation: {
            rule: 'Venus in own sign (Taurus/Libra) or exalted (Pisces) in a Kendra',
            cancellationFactors: ['Venus combust', 'Malefic conjunctions'],
            strengtheningFactors: ['Venus exalted', 'Full Moon aspect']
        },
        effects: {
            general: 'Brings beauty, luxury, artistic talents, and material comforts. The native enjoys pleasures and has a charismatic personality.',
            lifeAreas: { wealth: 9, career: 7, fame: 8, health: 6, relationships: 10, arts: 10 }
        },
        remedies: {
            primary: [],
            secondary: [],
            mantras: ['Om Shum Shukraya Namaha'],
            gemstones: ['Diamond', 'White Sapphire']
        },
        classicalReferences: [{
            text: 'Brihat Parashara Hora Shastra',
            chapter: 'Pancha Mahapurusha Yogas',
            verse: '76',
            translation: 'One with Malavya Yoga will have beautiful spouse, vehicles, wealth, and enjoyment of all pleasures.'
        }],
        modernInterpretation: 'Ideal for artists, designers, entertainers, luxury brand executives, and diplomats.'
    },
    {
        name: 'Ruchaka Yoga (Pancha Mahapurusha)',
        category: 'Raj',
        rarity: 'Moderate',
        formation: {
            rule: 'Mars in own sign (Aries/Scorpio) or exalted (Capricorn) in a Kendra',
            cancellationFactors: ['Mars combust', 'Malefic conjunctions'],
            strengtheningFactors: ['Mars exalted in Capricorn', 'Sun aspect']
        },
        effects: {
            general: 'Grants courage, leadership, military prowess, and victory over enemies. The native is strong-willed and determined.',
            lifeAreas: { wealth: 7, career: 9, fame: 8, health: 9, leadership: 10, courage: 10 }
        },
        remedies: {
            primary: [],
            secondary: [],
            mantras: ['Om Kram Kreem Kraum Sah Bhaumaya Namaha'],
            gemstones: ['Red Coral']
        },
        classicalReferences: [{
            text: 'Brihat Parashara Hora Shastra',
            chapter: 'Pancha Mahapurusha Yogas',
            verse: '77',
            translation: 'One with Ruchaka Yoga will be leader of armies, cruel, wealthy, and have marks of chakra on feet.'
        }],
        modernInterpretation: 'Excellent for military officers, athletes, surgeons, and executives in competitive fields.'
    },
    {
        name: 'Bhadra Yoga (Pancha Mahapurusha)',
        category: 'Raj',
        rarity: 'Moderate',
        formation: {
            rule: 'Mercury in own sign (Gemini/Virgo) or exalted (Virgo) in a Kendra',
            cancellationFactors: ['Mercury combust', 'Malefic conjunctions'],
            strengtheningFactors: ['Mercury exalted', 'Sun conjunction (Budhaditya)']
        },
        effects: {
            general: 'Gives high intelligence, eloquence, longevity, and success in business. The native is witty and helpful to relatives.',
            lifeAreas: { wealth: 9, career: 9, fame: 8, health: 8, intelligence: 10, business: 10 }
        },
        remedies: {
            primary: [],
            secondary: [],
            mantras: ['Om Bram Breem Braum Sah Budhaya Namaha'],
            gemstones: ['Emerald']
        },
        classicalReferences: [{
            text: 'Brihat Parashara Hora Shastra',
            chapter: 'Pancha Mahapurusha Yogas',
            verse: '78',
            translation: 'One with Bhadra Yoga will be long-lived, intelligent, helpful to relatives, and will have marks of conch and fish.'
        }],
        modernInterpretation: 'Perfect for entrepreneurs, writers, tech professionals, and media personalities.'
    },
    {
        name: 'Shasha Yoga (Pancha Mahapurusha)',
        category: 'Raj',
        rarity: 'Rare',
        formation: {
            rule: 'Saturn in own sign (Capricorn/Aquarius) or exalted (Libra) in a Kendra',
            cancellationFactors: ['Saturn combust', 'Heavy afflictions'],
            strengtheningFactors: ['Saturn exalted in Libra', 'Venus aspect']
        },
        effects: {
            general: 'Grants longevity, discipline, administrative abilities, and control over resources. Success comes through perseverance.',
            lifeAreas: { wealth: 8, career: 9, fame: 7, health: 7, discipline: 10, longevity: 10 }
        },
        remedies: {
            primary: [],
            secondary: [],
            mantras: ['Om Pram Preem Praum Sah Shanaischaraya Namaha'],
            gemstones: ['Blue Sapphire']
        },
        classicalReferences: [{
            text: 'Brihat Parashara Hora Shastra',
            chapter: 'Pancha Mahapurusha Yogas',
            verse: '79',
            translation: 'One with Shasha Yoga will command servants, forests, forts, and will have marks of mace and elephant goad.'
        }],
        modernInterpretation: 'Ideal for senior executives, judges, administrators, miners, and real estate developers.'
    },
    {
        name: 'Adhi Yoga',
        category: 'Dhana',
        rarity: 'Common',
        formation: {
            rule: 'Benefics (Mercury, Venus, Jupiter) in 6th, 7th, or 8th houses from Moon',
            cancellationFactors: ['Benefics combust or debilitated', 'Malefic conjunctions'],
            strengtheningFactors: ['All three benefics present', 'Benefics exalted']
        },
        effects: {
            general: 'Brings wealth, ministerial position, longevity, and freedom from diseases. The native gains through authority and wisdom.',
            lifeAreas: { wealth: 9, career: 8, fame: 7, health: 8, relationships: 6 }
        },
        remedies: {
            primary: [],
            secondary: [],
            mantras: ['Chant mantras of benefic planets present']
        },
        classicalReferences: [{
            text: 'Saravali',
            chapter: 'Yogas',
            verse: 'Chapter 31',
            translation: 'If benefics occupy 6th-8th from Moon, the person will be polite, trustworthy, will have royal honor, and comforts.'
        }],
        modernInterpretation: 'Success in government service, ministry, advisory roles, and positions of authority.'
    },
    {
        name: 'Lakshmi Yoga',
        category: 'Dhana',
        rarity: 'Moderate',
        formation: {
            rule: 'Lord of 9th house is strong and placed in own sign or exalted in a Kendra or Trikona',
            cancellationFactors: ['9th lord combust', 'Malefic aspects on 9th lord'],
            strengtheningFactors: ['9th lord exalted', 'Venus well placed']
        },
        effects: {
            general: 'Bestows immense wealth, luxury, beauty, and gains from fortune. The native is blessed by Lakshmi (goddess of wealth).',
            lifeAreas: { wealth: 10, career: 8, fame: 8, health: 7, relationships: 8, fortune: 10 }
        },
        remedies: {
            primary: [{
                type: 'Lakshmi Puja',
                details: 'Worship Goddess Lakshmi on Fridays',
                effectiveness: 9,
                cost: 'Low',
                duration: 'Weekly',
                timing: 'Friday evening'
            }],
            secondary: [],
            mantras: ['Om Shreem Mahalakshmiyei Namaha']
        },
        classicalReferences: [{
            text: 'Jataka Parijata',
            chapter: 'Dhana Yogas',
            verse: '14-15',
            translation: 'When 9th lord is powerful in Kendra or Trina, the native enjoys wealth like that of Kubera (god of wealth).'
        }],
        modernInterpretation: 'Ideal for business owners, investors, luxury industry professionals, and inheritors of wealth.'
    },
    {
        name: 'Saraswati Yoga',
        category: 'Special',
        rarity: 'Rare',
        formation: {
            rule: 'Jupiter, Venus, Mercury in Kendras/Trikonas/2nd house from each other, Jupiter strong',
            cancellationFactors: ['Benefics combust', 'Heavy malefic afflictions'],
            strengtheningFactors: ['Jupiter exalted', 'All three in own signs']
        },
        effects: {
            general: 'Grants mastery over arts, sciences, and literature. The native is learned, eloquent, and famous for intellectual achievements.',
            lifeAreas: { wealth: 7, career: 9, fame: 10, intelligence: 10, arts: 10, learning: 10 }
        },
        remedies: {
            primary: [{
                type: 'Saraswati Puja',
                details: 'Worship Goddess Saraswati on Vasant Panchami',
                effectiveness: 9,
                cost: 'Low',
                duration: 'Annual with daily study',
                timing: 'Morning'
            }],
            secondary: [],
            mantras: ['Om Aim Saraswatyai Namaha']
        },
        classicalReferences: [{
            text: 'Brihat Parashara Hora Shastra',
            chapter: 'Special Yogas',
            verse: 'Chapter 39',
            translation: 'One with Saraswati Yoga will be poet, skilled in all arts, famous, and devotee of gods.'
        }],
        modernInterpretation: 'Perfect for scholars, authors, musicians, scientists, and spiritual teachers.'
    },
    {
        name: 'Budhaditya Yoga',
        category: 'General',
        rarity: 'Common',
        formation: {
            rule: 'Mercury and Sun conjunct in the same house (not within 14 degrees for best results)',
            cancellationFactors: ['Mercury combust (within 14 degrees of Sun)', 'Mercury or Sun in enemy sign'],
            strengtheningFactors: ['Both in own signs or exalted', 'Strong house placement (1st, 5th, 9th, 10th)']
        },
        effects: {
            general: 'Bestows intelligence, wit, communication skills, and success in intellectual pursuits. The native is skilled in speech and writing.',
            lifeAreas: { wealth: 6, career: 8, fame: 7, health: 5, relationships: 6, intelligence: 9 }
        },
        remedies: {
            primary: [],
            secondary: [],
            mantras: ['Om Budhaya Namaha', 'Om Suryaya Namaha']
        },
        classicalReferences: [{
            text: 'Phaladeepika',
            chapter: 'Yogas',
            verse: '6-8',
            translation: 'One with Sun-Mercury combination will be skilled in fine arts, astrology, and will have sweet speech.'
        }],
        modernInterpretation: 'Excellent for media, writing, teaching, technology, and business. Strong analytical abilities.'
    }
];