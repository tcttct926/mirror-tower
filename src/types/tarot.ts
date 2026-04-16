export interface TarotCard {
  id: number
  nameEn: string
  nameZh: string
  suit: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'
  number: number
  keywordsUpright: string[]
  keywordsReversed: string[]
  meaningUpright: string
  meaningReversed: string
  description: string
  imageSymbol: string
  /** Specific real-life situations this card commonly refers to (upright) */
  situationsUpright?: string[]
  /** Specific real-life situations this card commonly refers to (reversed) */
  situationsReversed?: string[]
  /** Detailed symbolic meanings of card imagery (Major Arcana) */
  symbolism?: string
  /** Practical advice this card offers */
  advice?: string
}

export type SpreadType = 'single' | 'three-card' | 'celtic-cross' | 'intuitive'

export interface SpreadPosition {
  index: number
  labelZh: string
  labelEn: string
  descriptionZh: string
  x: number
  y: number
  rotation?: number
}

export interface DrawnCard {
  card: TarotCard
  isReversed: boolean
  position: SpreadPosition
  revealed: boolean
}

export interface Reading {
  id: string
  timestamp: number
  spreadType: SpreadType
  cards: DrawnCard[]
  interpretation: string | null
  interpretationSource: 'fallback' | null
}

export interface SpreadConfig {
  type: SpreadType
  nameZh: string
  nameEn: string
  description: string
  positionCount: number
  positions: SpreadPosition[]
  intuitiveOptionCount?: number
}

export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water'

export interface User {
  id: string
  name: string
  birthDate: string
  birthDateLunar: string
  gender: 'male' | 'female' | 'other'
  phone: string
  passwordHash: string
  zodiacSign: ZodiacSign
  createdAt: number
}

export interface IntuitiveOption {
  card: TarotCard
  selected: boolean
}
