import type { TarotCard } from '../types/tarot'
import { majorArcana } from './majorArcana'
import { minorArcana } from './minorArcana'

export const tarotDeck: TarotCard[] = [...majorArcana, ...minorArcana]

export function getCardById(id: number): TarotCard | undefined {
  return tarotDeck.find(card => card.id === id)
}

export function getCardsBySuit(suit: TarotCard['suit']): TarotCard[] {
  return tarotDeck.filter(card => card.suit === suit)
}
