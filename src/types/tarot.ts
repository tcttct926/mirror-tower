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
}

export type SpreadType = 'single' | 'three-card' | 'celtic-cross'

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
  interpretationSource: 'ai' | 'fallback' | null
}

export interface SpreadConfig {
  type: SpreadType
  nameZh: string
  nameEn: string
  description: string
  positionCount: number
  positions: SpreadPosition[]
}
