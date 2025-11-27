// ---------------------------------------------------------
// EXISTING 10 YOGAS (From your input)
// ---------------------------------------------------------
const EXISTING_YOGAS = [
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

// ---------------------------------------------------------
// ADDITIONAL 21 YOGAS
// ---------------------------------------------------------
const ADDITIONAL_YOGAS = [
    {
        name: 'Chandra-Mangala Yoga',
        category: 'Dhana',
        rarity: 'Common',
        formation: {
            rule: 'Moon and Mars conjunct or mutual aspect',
            cancellationFactors: ['Planets debilitated', 'Aspect from Saturn'],
            strengtheningFactors: ['In favorable houses (2, 9, 10, 11)', 'Supported by Venus']
        },
        effects: {
            general: 'Grants wealth through earnings, business acumen, and restless energy. May indicate earnings through women or liquid products.',
            lifeAreas: { wealth: 9, career: 7, relationships: 5, courage: 8 }
        },
        remedies: {
            mantras: ['Om Angarkaya Namaha', 'Om Som Somaya Namaha'],
            gemstones: ['Pearl', 'Red Coral (with caution)']
        },
        classicalReferences: [{ text: 'Phaladeepika', chapter: 'Yogas', translation: 'One who deals in drinks, earthern jars, women and is wealthy.' }],
        modernInterpretation: 'Success in chemical engineering, beverage industry, nursing, or finance.'
    },
    // --- Dhana Yogas (5 Variants) ---
    {
        name: 'Dhana Yoga (2nd Lord in 11th)',
        category: 'Dhana',
        rarity: 'Moderate',
        formation: {
            rule: 'Lord of 2nd house placed in 11th house',
            cancellationFactors: ['Lords in enemy sign', 'Combust'],
            strengtheningFactors: ['Aspect by Jupiter', 'Exalted lords']
        },
        effects: {
            general: 'Significant accumulation of wealth. Earnings come from multiple sources and investments grow rapidly.',
            lifeAreas: { wealth: 10, career: 8, investments: 10 }
        },
        remedies: { mantras: ['Om Shreem Mahalakshmiyei Namaha'] },
        classicalReferences: [{ text: 'BPHS', chapter: 'Dhana Yogas', translation: 'The native will be famous and wealthy through his own efforts.' }],
        modernInterpretation: 'Excellent for investors, bankers, and entrepreneurs.'
    },
    {
        name: 'Dhana Yoga (5th Lord in 9th)',
        category: 'Dhana',
        rarity: 'Moderate',
        formation: {
            rule: 'Lord of 5th house placed in 9th house',
            cancellationFactors: ['Lords debilitated', 'Afflicted by Rahu/Ketu'],
            strengtheningFactors: ['Parivartana Yoga between 5th and 9th lords']
        },
        effects: {
            general: 'Wealth through speculation, creativity, children, or publications. Indicates strong past-life merit.',
            lifeAreas: { wealth: 9, career: 7, fortune: 10, creativity: 9 }
        },
        remedies: { mantras: ['Om Vishnuve Namaha'] },
        classicalReferences: [{ text: 'BPHS', chapter: 'Dhana Yogas', translation: 'The person will be a king or equal to a king, very wealthy and fortunate.' }],
        modernInterpretation: 'Authors, stock traders, and creative directors.'
    },
    {
        name: 'Dhana Yoga (9th Lord in 2nd)',
        category: 'Dhana',
        rarity: 'Moderate',
        formation: {
            rule: 'Lord of 9th house placed in 2nd house',
            cancellationFactors: ['Malefic aspects'],
            strengtheningFactors: ['9th lord exalted']
        },
        effects: {
            general: 'Wealth through inheritance, family business, or higher knowledge. Lucky with money management.',
            lifeAreas: { wealth: 10, family: 9, knowledge: 8 }
        },
        remedies: { mantras: ['Om Brihaspataye Namaha'] },
        classicalReferences: [{ text: 'Jataka Parijata', translation: 'Native will be wealthy, learned and happy.' }],
        modernInterpretation: 'Family business successors, professors, financial advisors.'
    },
    {
        name: 'Dhana Yoga (11th Lord in 2nd)',
        category: 'Dhana',
        rarity: 'Moderate',
        formation: {
            rule: 'Lord of 11th house placed in 2nd house',
            cancellationFactors: ['Affliction by 6/8/12 lords'],
            strengtheningFactors: ['Both lords natural benefics']
        },
        effects: {
            general: 'High liquidity and cash flow. The native creates large financial networks.',
            lifeAreas: { wealth: 10, networking: 9, business: 9 }
        },
        remedies: { mantras: ['Om Kuberaya Namaha'] },
        classicalReferences: [{ text: 'BPHS', translation: 'Native will be endowed with wealth, grains and family happiness.' }],
        modernInterpretation: 'Large scale traders, network marketers, CFOs.'
    },
    {
        name: 'Dhana Yoga (Lagnesha-Dhana Parivartana)',
        category: 'Dhana',
        rarity: 'Rare',
        formation: {
            rule: 'Exchange of signs between 1st Lord and 2nd Lord',
            cancellationFactors: ['Lords debilitated'],
            strengtheningFactors: ['Both lords in friendly signs']
        },
        effects: {
            general: 'Self-made wealth. The person accumulates riches through personal effort and personality.',
            lifeAreas: { wealth: 9, self: 10, career: 8 }
        },
        remedies: { mantras: ['Om Adityaya Namaha'] },
        classicalReferences: [{ text: 'Saravali', translation: 'One gains wealth through his own valour and efforts.' }],
        modernInterpretation: 'Self-made billionaires, celebrities, personal brands.'
    },
    // --- Viparita Raja Yogas ---
    {
        name: 'Harsha Yoga (Viparita)',
        category: 'Raj',
        rarity: 'Rare',
        formation: {
            rule: '6th Lord placed in 6th, 8th, or 12th house',
            cancellationFactors: ['Conjunction with non-dusthana lords'],
            strengtheningFactors: ['No aspect from benefics (pure maleficence reinforces defense)']
        },
        effects: {
            general: 'Protection from enemies, strong constitution, and success through overcoming obstacles.',
            lifeAreas: { health: 8, enemies: 10, career: 7 }
        },
        remedies: { mantras: ['Om Durgayei Namaha'] },
        classicalReferences: [{ text: 'Phaladeepika', translation: 'One is happy, invincible, physically strong, and wealthy.' }],
        modernInterpretation: 'Success in litigation, competitive sports, or defense.'
    },
    {
        name: 'Sarala Yoga (Viparita)',
        category: 'Raj',
        rarity: 'Rare',
        formation: {
            rule: '8th Lord placed in 6th, 8th, or 12th house',
            cancellationFactors: ['Conjunction with benefic lords'],
            strengtheningFactors: ['8th lord in 8th']
        },
        effects: {
            general: 'Longevity, fearlessness, and sudden gains. Ability to survive crises and prosper.',
            lifeAreas: { longevity: 10, wealth: 8, occult: 9 }
        },
        remedies: { mantras: ['Om Mrityunjayaya Namaha'] },
        classicalReferences: [{ text: 'Phaladeepika', translation: 'Long lived, fearless, learned, a terror to enemies and wealthy.' }],
        modernInterpretation: 'Risk management, insurance, research, mining.'
    },
    {
        name: 'Vimala Yoga (Viparita)',
        category: 'Raj',
        rarity: 'Rare',
        formation: {
            rule: '12th Lord placed in 6th, 8th, or 12th house',
            cancellationFactors: ['Conjunction with Lagna lord'],
            strengtheningFactors: ['12th lord in 12th']
        },
        effects: {
            general: 'Frugal, independent, happy, and spiritually inclined. Accumulates wealth through saving.',
            lifeAreas: { spirituality: 9, wealth: 7, independence: 10 }
        },
        remedies: { mantras: ['Om Namah Shivaya'] },
        classicalReferences: [{ text: 'Phaladeepika', translation: 'Frugal, happy, independent and possessed of good qualities.' }],
        modernInterpretation: 'Foreign services, auditors, spiritual healers.'
    },
    // --- Aristha Yogas ---
    {
        name: 'Kemudruma Yoga',
        category: 'Aristha',
        rarity: 'Moderate',
        formation: {
            rule: 'No planets (except Sun/Rahu/Ketu) in 2nd or 12th from Moon',
            cancellationFactors: ['Planets in Kendra from Moon or Lagna (Kemudruma Bhanga)'],
            strengtheningFactors: ['Moon isolated and debilitated']
        },
        effects: {
            general: 'Can cause mental loneliness, poverty, and struggle. However, often found in charts of great leaders who feel isolated.',
            lifeAreas: { wealth: 3, mentalPeace: 2, career: 5 }
        },
        remedies: { mantras: ['Om Namah Shivaya'], gemstones: ['Pearl'], charities: ['Donate milk on Mondays'] },
        classicalReferences: [{ text: 'BPHS', translation: 'The person will be dirty, sorrowful, doing unrighteous deeds, and poor.' }],
        modernInterpretation: 'Depression, isolation, but potential for great spiritual depth if cancelled.'
    },
    {
        name: 'Shakata Yoga',
        category: 'Aristha',
        rarity: 'Common',
        formation: {
            rule: 'Moon in 6th, 8th, or 12th from Jupiter',
            cancellationFactors: ['Moon in Kendra to Lagna'],
            strengtheningFactors: ['Moon debilitated']
        },
        effects: {
            general: 'Fluctuating fortune. Life moves like a wheel—sometimes high, sometimes low.',
            lifeAreas: { wealth: 4, stability: 3, career: 5 }
        },
        remedies: { mantras: ['Om Gurave Namaha'], charities: ['Yellow items on Thursday'] },
        classicalReferences: [{ text: 'Jataka Parijata', translation: 'Native loses wealth and regains it, undergoing much mental anguish.' }],
        modernInterpretation: 'Freelancers, seasonal business owners, cyclical financial status.'
    },
    {
        name: 'Daridra Yoga',
        category: 'Aristha',
        rarity: 'Common',
        formation: {
            rule: 'Lord of 11th house in 6th, 8th, or 12th house',
            cancellationFactors: ['11th lord exalted'],
            strengtheningFactors: ['Aspect by malefics']
        },
        effects: {
            general: 'Difficulty in retaining gains, debts, or limited income sources.',
            lifeAreas: { wealth: 3, debt: 8, career: 4 }
        },
        remedies: { mantras: ['Kanakadhara Stotram'], charities: ['Service to poor'] },
        classicalReferences: [{ text: 'BPHS', translation: 'The native will be in debts, cruel, poor and mean.' }],
        modernInterpretation: 'Financial instability, bad investments.'
    },
    // --- Additional Raj Yogas ---
    {
        name: 'Mahabhagya Yoga',
        category: 'Raj',
        rarity: 'Rare',
        formation: {
            rule: 'Males: Day birth, Sun, Moon, Lagna in odd signs. Females: Night birth, Sun, Moon, Lagna in even signs.',
            cancellationFactors: ['Weak Sun or Moon'],
            strengtheningFactors: ['Benefic aspects']
        },
        effects: {
            general: 'Great fortune, popularity, and leadership. The native is blessed by destiny.',
            lifeAreas: { fortune: 10, fame: 10, wealth: 9 }
        },
        remedies: { mantras: ['Gayatri Mantra'] },
        classicalReferences: [{ text: 'Phaladeepika', translation: 'Native causes immense pleasure to eyes of onlookers, is a lord of lands and generous.' }],
        modernInterpretation: 'Public figures, celebrities, charismatic leaders.'
    },
    {
        name: 'Amala Yoga',
        category: 'Raj',
        rarity: 'Common',
        formation: {
            rule: 'Benefic planet (Jupiter, Venus, Mercury) in 10th house from Moon or Lagna',
            cancellationFactors: ['Benefic combust'],
            strengtheningFactors: ['Benefic exalted']
        },
        effects: {
            general: 'Professional success, stainless reputation, and humanitarian nature.',
            lifeAreas: { career: 10, reputation: 10, ethics: 9 }
        },
        remedies: { charities: ['Social work'] },
        classicalReferences: [{ text: 'Phaladeepika', translation: 'Person will be revered by the king, have a spotless character and be wealthy.' }],
        modernInterpretation: 'NGO leaders, judges, reputable professionals.'
    },
    {
        name: 'Parvata Yoga',
        category: 'Raj',
        rarity: 'Moderate',
        formation: {
            rule: 'Benefics in Kendras, and 6th/8th houses either empty or occupied by benefics',
            cancellationFactors: ['Malefics in Kendras'],
            strengtheningFactors: ['Lagna lord strong']
        },
        effects: {
            general: 'Lasting political power, wealth, and stability. Like a mountain (Parvata).',
            lifeAreas: { stability: 10, wealth: 8, politics: 9 }
        },
        remedies: { mantras: ['Om Namah Shivaya'] },
        classicalReferences: [{ text: 'Phaladeepika', translation: 'Native will possess everlasting wealth and happiness and will be a lord of the earth.' }],
        modernInterpretation: 'Land owners, political positions, stable administrative roles.'
    },
    {
        name: 'Kahala Yoga',
        category: 'Raj',
        rarity: 'Moderate',
        formation: {
            rule: 'Lords of 4th and 9th in mutual Kendras, and Lagna lord is strong',
            cancellationFactors: ['Combustion'],
            strengtheningFactors: ['Lords exalted']
        },
        effects: {
            general: 'Aggressive, daring, and commands a force/team. Success through execution.',
            lifeAreas: { leadership: 9, courage: 9, military: 10 }
        },
        remedies: { mantras: ['Hanuman Chalisa'] },
        classicalReferences: [{ text: 'BPHS', translation: 'Native will be daring, head of a small army and wealthy.' }],
        modernInterpretation: 'Police chiefs, military commanders, operations directors.'
    },
    // --- Moon Yogas ---
    {
        name: 'Sunapha Yoga',
        category: 'Moon',
        rarity: 'Common',
        formation: {
            rule: 'Planet (excluding Sun) in 2nd house from Moon',
            cancellationFactors: ['Planet combust or debilitated'],
            strengtheningFactors: ['Planet is benefic']
        },
        effects: {
            general: 'Self-acquisition of wealth, intelligence, and good reputation.',
            lifeAreas: { wealth: 8, career: 7, intelligence: 7 }
        },
        remedies: { mantras: ['Chandra Mantra'] },
        classicalReferences: [{ text: 'BPHS', translation: 'Native will be a king, wealthy, intelligent and renowned.' }],
        modernInterpretation: 'Self-made professionals, steady income.'
    },
    {
        name: 'Anapha Yoga',
        category: 'Moon',
        rarity: 'Common',
        formation: {
            rule: 'Planet (excluding Sun) in 12th house from Moon',
            cancellationFactors: ['Planet combust'],
            strengtheningFactors: ['Planet is Venus or Jupiter']
        },
        effects: {
            general: 'Good manners, enjoyment of pleasures, and freedom from disease.',
            lifeAreas: { health: 8, comfort: 9, manners: 9 }
        },
        remedies: { mantras: ['Chandra Mantra'] },
        classicalReferences: [{ text: 'BPHS', translation: 'Native will be a king, free from disease, virtuous and happy.' }],
        modernInterpretation: 'Luxury lifestyle, diplomats, hospitality.'
    },
    {
        name: 'Durudhura Yoga',
        category: 'Moon',
        rarity: 'Moderate',
        formation: {
            rule: 'Planets (excluding Sun) in both 2nd and 12th from Moon',
            cancellationFactors: ['Malefics in both sides'],
            strengtheningFactors: ['Benefics in both sides']
        },
        effects: {
            general: 'Balance, wealth, vehicles, and comforts. Enjoyment of life.',
            lifeAreas: { wealth: 9, vehicles: 8, happiness: 9 }
        },
        remedies: { mantras: ['Chandra Mantra'] },
        classicalReferences: [{ text: 'BPHS', translation: 'Native will enjoy comforts of conveyances and servants.' }],
        modernInterpretation: 'Balanced life, transport business, logistics.'
    },
    // --- Nabhasa Yogas ---
    {
        name: 'Vallaki (Vina) Yoga',
        category: 'Nabhasa (Sankhya)',
        rarity: 'Rare',
        formation: {
            rule: 'All 7 planets distributed in exactly 7 signs',
            cancellationFactors: ['N/A (Nabhasa yogas usually have no cancellation)'],
            strengtheningFactors: ['Planets in friendly signs']
        },
        effects: {
            general: 'Love for music, arts, and refined skills. Varied interests.',
            lifeAreas: { arts: 10, social: 8, skills: 9 }
        },
        remedies: { mantras: ['Saraswati Mantra'] },
        classicalReferences: [{ text: 'BPHS', translation: 'Native will be fond of music, dance and will be learned.' }],
        modernInterpretation: 'Musicians, multi-talented artists.'
    },
    {
        name: 'Gada Yoga',
        category: 'Nabhasa (Akriti)',
        rarity: 'Rare',
        formation: {
            rule: 'All planets located in two adjacent Kendras (e.g., 1st and 4th)',
            cancellationFactors: ['N/A'],
            strengtheningFactors: ['Benefics in Lagna']
        },
        effects: {
            general: 'Wealthy, proud, performs sacrifices, and is skilled in weapons/tools.',
            lifeAreas: { wealth: 8, security: 9, ritual: 7 }
        },
        remedies: { mantras: ['Vishnu Sahasranamam'] },
        classicalReferences: [{ text: 'BPHS', translation: 'Native will be wealthy, versed in Shastras and fearsome.' }],
        modernInterpretation: 'Security experts, manufacturing, technical trades.'
    }
];

// Combine for export
export const COMPREHENSIVE_YOGA_DATASET = [...EXISTING_YOGAS, ...ADDITIONAL_YOGAS];

// ---------------------------------------------------------
// NEW DOSHA DATASET (10 Major Doshas)
// ---------------------------------------------------------
export const COMPREHENSIVE_DOSHA_DATASET = [
    {
        name: 'Kala Sarpa Dosha',
        type: 'Major',
        formation: {
            rule: 'All 7 planets situated between Rahu and Ketu axis',
            nuances: ['Anant Kaal Sarp (Rahu in 1st)', 'Kulik Kaal Sarp (Rahu in 2nd)', 'Total vs Partial'],
            severity: 'High'
        },
        effects: {
            general: 'Struggle in early life, sudden rises and falls, feeling of restriction. Success often comes late (after 42).',
            impactAreas: ['Career delay', 'Mental anxiety', 'Unexpected obstacles']
        },
        remedies: {
            poojas: ['Kala Sarpa Shanti Puja at Trimbakeshwar'],
            mantras: ['Om Namah Shivaya', 'Maha Mrityunjaya Mantra'],
            gemstones: ['Gomed (Hessonite) - only after consultation'],
            lifestyle: ['Avoid harming snakes', 'Worship Lord Shiva']
        }
    },
    {
        name: 'Mangal Dosha (Kuja Dosha)',
        type: 'Martial',
        formation: {
            rule: 'Mars in 1st, 4th, 7th, 8th, or 12th house',
            nuances: ['Low Mangal (Anshik)', 'High Mangal', 'Exceptions exist (e.g., Mars in Aries/Scorpio/Capricorn, or after age 28)'],
            severity: 'Moderate to High'
        },
        effects: {
            general: 'Aggression in relationships, delay in marriage, or marital discord.',
            impactAreas: ['Marriage', 'Temperament', 'Spousal health']
        },
        remedies: {
            poojas: ['Mangal Nath Puja', 'Kumbh Vivah (symbolic marriage)'],
            mantras: ['Hanuman Chalisa', 'Om Angarkaya Namaha'],
            lifestyle: ['Marry another Manglik', 'Donate red lentils/blood donation']
        }
    },
    {
        name: 'Pitri Dosha',
        type: 'Ancestral',
        formation: {
            rule: 'Sun or Moon afflicted by Rahu/Ketu, or 9th house heavily afflicted',
            nuances: ['Sun+Rahu (Pitri)', 'Moon+Ketu (Matri)'],
            severity: 'High'
        },
        effects: {
            general: 'Ancestral debt causing lack of progress, progeny issues, or constant family disputes.',
            impactAreas: ['Progeny', 'Family harmony', 'Unexplained failures']
        },
        remedies: {
            poojas: ['Pind Daan at Gaya', 'Shraddh ceremonies'],
            mantras: ['Om Pitribhyo Namaha'],
            lifestyle: ['Respect elders', 'Feed crows/cows']
        }
    },
    {
        name: 'Shrapit Dosha',
        type: 'Karmic',
        formation: {
            rule: 'Conjunction of Saturn and Rahu in a single house',
            nuances: ['Aspect relationship also considered by some'],
            severity: 'High'
        },
        effects: {
            general: 'Curse from past life. Brings chronic bad luck and negation of other good yogas in the chart.',
            impactAreas: ['General luck', 'Chronic health', 'Delay in all works']
        },
        remedies: {
            poojas: ['Rudra Abhishek'],
            mantras: ['Om Shanishcharaya Namaha', 'Om Raahave Namaha'],
            lifestyle: ['Service to handicapped/lepers']
        }
    },
    {
        name: 'Grahan Dosha',
        type: 'Eclipse',
        formation: {
            rule: 'Sun or Moon conjunct Rahu or Ketu',
            nuances: ['Solar Eclipse (Surya Grahan)', 'Lunar Eclipse (Chandra Grahan)'],
            severity: 'Moderate'
        },
        effects: {
            general: 'Mental cloudiness, lack of confidence (Sun), or emotional instability (Moon). parental health issues.',
            impactAreas: ['Confidence', 'Emotion', 'Reputation']
        },
        remedies: {
            poojas: ['Surya/Chandra Shanti'],
            mantras: ['Aditya Hridaya Stotram (Sun)', 'Om Som Somaya Namaha (Moon)'],
            lifestyle: ['Offer water to Sun', 'Respect mother']
        }
    },
    {
        name: 'Guru Chandal Dosha',
        type: 'Wisdom',
        formation: {
            rule: 'Jupiter and Rahu conjunct',
            nuances: ['Ketu connection forms Ganesha Yoga (different effect)'],
            severity: 'Moderate'
        },
        effects: {
            general: 'Corruption of wisdom, disrespect towards teachers, atheism, or using knowledge for unethical gains.',
            impactAreas: ['Education', 'Ethics', 'Liver health']
        },
        remedies: {
            poojas: ['Guru Puja'],
            mantras: ['Om Gram Greem Graum Sah Gurave Namaha'],
            lifestyle: ['Respect teachers', 'Donate yellow pulses']
        }
    },
    {
        name: 'Angarak Dosha',
        type: 'Temperament',
        formation: {
            rule: 'Mars and Rahu conjunct',
            nuances: ['Close degrees increase severity'],
            severity: 'High'
        },
        effects: {
            general: 'Extreme volatility, anger, accident proneness, and explosive energy.',
            impactAreas: ['Safety', 'Relationships', 'Legal issues']
        },
        remedies: {
            poojas: ['Hanuman worship'],
            mantras: ['Om Ham Hanumate Namaha'],
            lifestyle: ['Avoid rash driving', 'Meditation for anger management']
        }
    },
    {
        name: 'Vish Dosha',
        type: 'Mental',
        formation: {
            rule: 'Moon and Saturn conjunct',
            nuances: ['Aspect relationship also considered'],
            severity: 'Moderate'
        },
        effects: {
            general: 'Depression, negativity, emotional heaviness, and feeling "poisoned" by life circumstances.',
            impactAreas: ['Mental health', 'Mother’s health', 'Optimism']
        },
        remedies: {
            poojas: ['Shiva Abhishekam with milk'],
            mantras: ['Om Namah Shivaya'],
            lifestyle: ['Avoid loneliness', 'Drink water from silver glass']
        }
    },
    {
        name: 'Nadi Dosha',
        type: 'Matchmaking/Biological',
        formation: {
            rule: 'Usually applied in matching (same Nadi), but in charts refers to physiological weakness based on Nakshatra element.',
            nuances: ['Adi', 'Madhya', 'Antya'],
            severity: 'High (for progeny)'
        },
        effects: {
            general: 'Primarily affects progeny health and genetic compatibility in marriage. In individuals, indicates Ayurvedic constitution imbalance.',
            impactAreas: ['Childbirth', 'Genetic health', 'Marital compatibility']
        },
        remedies: {
            poojas: ['Nadi Dosha Nivaran Puja'],
            mantras: ['Maha Mrityunjaya Mantra'],
            lifestyle: ['Ayurvedic balancing', 'Donating grains equal to weight']
        }
    },
    {
        name: 'Putra Dosha',
        type: 'Progeny',
        formation: {
            rule: 'Affliction to 5th house/lord or Jupiter by malefics (Rahu/Ketu/Saturn)',
            nuances: ['Specific curse of Brahmins or Serpents usually involved'],
            severity: 'Moderate'
        },
        effects: {
            general: 'Delay or difficulty in having children, or worried about child welfare.',
            impactAreas: ['Progeny', 'Creativity', 'Speculation']
        },
        remedies: {
            poojas: ['Santana Gopala Puja'],
            mantras: ['Om Namo Bhagavate Vasudevaya'],
            lifestyle: ['Service to children', 'Planting trees']
        }
    }
];