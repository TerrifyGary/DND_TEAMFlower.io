export interface Character {
  id: string
  name: string
  class: string
  race: string
  level: number
  background: string
  alignment: string
  stats: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  hitPoints: {
    current: number
    maximum: number
  }
  armorClass: number
  proficiencyBonus: number
  speed: number
  skills: string[]
  equipment: string[]
  spells?: string[]
  backstory: string
  personality: string
  ideals: string
  bonds: string
  flaws: string
  image: string
}

export const sampleCharacters: Character[] = [
  {
    id: "1",
    name: "Thorin Ironforge",
    class: "Fighter",
    race: "Dwarf",
    level: 8,
    background: "Soldier",
    alignment: "Lawful Good",
    stats: {
      strength: 18,
      dexterity: 12,
      constitution: 16,
      intelligence: 10,
      wisdom: 14,
      charisma: 8,
    },
    hitPoints: { current: 72, maximum: 72 },
    armorClass: 18,
    proficiencyBonus: 3,
    speed: 25,
    skills: ["Athletics", "Intimidation", "Survival", "Perception"],
    equipment: ["Warhammer +1", "Plate Armor", "Shield", "Handaxe", "Javelin"],
    backstory: "A veteran warrior from the mountain halls, Thorin seeks to reclaim his clan's lost honor.",
    personality: "Gruff but loyal, speaks his mind without hesitation.",
    ideals: "Honor above all else. A warrior's word is their bond.",
    bonds: "My clan's ancient warhammer must be recovered from the dragon's hoard.",
    flaws: "I have trouble trusting those who haven't proven themselves in battle.",
    image: "/dwarf-fighter-with-warhammer-and-plate-armor.jpg",
  },
  {
    id: "2",
    name: "Luna Nightwhisper",
    class: "Rogue",
    race: "Half-Elf",
    level: 6,
    background: "Criminal",
    alignment: "Chaotic Neutral",
    stats: {
      strength: 10,
      dexterity: 18,
      constitution: 14,
      intelligence: 12,
      wisdom: 16,
      charisma: 15,
    },
    hitPoints: { current: 42, maximum: 42 },
    armorClass: 15,
    proficiencyBonus: 3,
    speed: 30,
    skills: ["Stealth", "Sleight of Hand", "Perception", "Investigation", "Deception"],
    equipment: ["Shortsword", "Shortbow", "Thieves' Tools", "Leather Armor", "Daggers"],
    backstory: "Once a street thief, Luna now uses her skills to uncover ancient secrets and lost treasures.",
    personality: "Quick-witted and observant, always looking for the next opportunity.",
    ideals: "Freedom is worth any price. Rules are made to be broken.",
    bonds: "I owe my mentor everything, and I'll find who killed them.",
    flaws: "I can't resist taking risks, even when they're clearly dangerous.",
    image: "/half-elf-rogue-with-bow-and-daggers-in-shadows.jpg",
  },
  {
    id: "3",
    name: "Eldara Starweaver",
    class: "Wizard",
    race: "High Elf",
    level: 7,
    background: "Sage",
    alignment: "Lawful Neutral",
    stats: {
      strength: 8,
      dexterity: 14,
      constitution: 12,
      intelligence: 18,
      wisdom: 15,
      charisma: 10,
    },
    hitPoints: { current: 38, maximum: 38 },
    armorClass: 12,
    proficiencyBonus: 3,
    speed: 30,
    skills: ["Arcana", "History", "Investigation", "Insight"],
    equipment: ["Spellbook", "Component Pouch", "Quarterstaff", "Robes", "Scroll Case"],
    spells: ["Fireball", "Magic Missile", "Shield", "Detect Magic", "Counterspell", "Teleport"],
    backstory: "A scholar of ancient magic, Eldara seeks to unlock the mysteries of the cosmos.",
    personality: "Methodical and precise, values knowledge above material wealth.",
    ideals: "Knowledge is power, and power should be used responsibly.",
    bonds: "My spellbook contains secrets that could change the world.",
    flaws: "I speak without thinking when it comes to my areas of expertise.",
    image: "/high-elf-wizard-with-spellbook-and-magical-robes.jpg",
  },
  {
    id: "4",
    name: "Brother Marcus",
    class: "Cleric",
    race: "Human",
    level: 5,
    background: "Acolyte",
    alignment: "Lawful Good",
    stats: {
      strength: 14,
      dexterity: 10,
      constitution: 15,
      intelligence: 12,
      wisdom: 18,
      charisma: 13,
    },
    hitPoints: { current: 41, maximum: 41 },
    armorClass: 16,
    proficiencyBonus: 3,
    speed: 30,
    skills: ["Medicine", "Religion", "Insight", "Persuasion"],
    equipment: ["Mace", "Scale Mail", "Shield", "Holy Symbol", "Healer's Kit"],
    spells: ["Cure Wounds", "Bless", "Hold Person", "Spiritual Weapon", "Dispel Magic"],
    backstory: "A devoted servant of the light, Marcus travels to heal the wounded and fight undead.",
    personality: "Compassionate and patient, always willing to help those in need.",
    ideals: "All life is sacred and worth protecting.",
    bonds: "My temple was destroyed by undead, and I seek to rebuild it.",
    flaws: "I'm too trusting of others, even when they don't deserve it.",
    image: "/human-cleric-with-holy-symbol-and-healing-light.jpg",
  },
  {
    id: "5",
    name: "Zara Wildstorm",
    class: "Barbarian",
    race: "Half-Orc",
    level: 6,
    background: "Outlander",
    alignment: "Chaotic Good",
    stats: {
      strength: 17,
      dexterity: 14,
      constitution: 16,
      intelligence: 8,
      wisdom: 12,
      charisma: 10,
    },
    hitPoints: { current: 58, maximum: 58 },
    armorClass: 14,
    proficiencyBonus: 3,
    speed: 40,
    skills: ["Athletics", "Survival", "Animal Handling", "Intimidation"],
    equipment: ["Greataxe", "Handaxes", "Hide Armor", "Explorer's Pack", "Tribal Totems"],
    backstory: "Raised by wolves after her tribe was scattered, Zara fights to protect the natural world.",
    personality: "Wild and free-spirited, more comfortable in nature than civilization.",
    ideals: "The natural world must be protected from those who would corrupt it.",
    bonds: "The wolf pack that raised me is my true family.",
    flaws: "I have trouble controlling my rage when innocents are threatened.",
    image: "/half-orc-barbarian-with-greataxe-and-tribal-markin.jpg",
  },
  {
    id: "6",
    name: "Pip Lightfinger",
    class: "Bard",
    race: "Halfling",
    level: 4,
    background: "Entertainer",
    alignment: "Chaotic Good",
    stats: {
      strength: 8,
      dexterity: 16,
      constitution: 12,
      intelligence: 14,
      wisdom: 10,
      charisma: 18,
    },
    hitPoints: { current: 28, maximum: 28 },
    armorClass: 13,
    proficiencyBonus: 2,
    speed: 25,
    skills: ["Performance", "Persuasion", "Deception", "Sleight of Hand", "Acrobatics"],
    equipment: ["Lute", "Rapier", "Leather Armor", "Entertainer's Pack", "Thieves' Tools"],
    spells: ["Vicious Mockery", "Healing Word", "Thunderwave", "Suggestion"],
    backstory: "A traveling musician with a talent for getting into and out of trouble.",
    personality: "Cheerful and optimistic, always ready with a joke or song.",
    ideals: "Life is meant to be enjoyed, and joy should be shared with others.",
    bonds: "My lute was a gift from my mentor, and it holds magical properties.",
    flaws: "I can't resist showing off, even when it puts me in danger.",
    image: "/halfling-bard-with-lute-and-colorful-performer-clo.jpg",
  },
]
