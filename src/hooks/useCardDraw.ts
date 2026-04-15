import { useState, useCallback } from 'react'
import { tarotDeck } from '../data/tarotDeck'
import { getSpreadByType } from '../data/spreads'
import { shuffle } from '../utils/shuffle'
import type { TarotCard, SpreadType } from '../types/tarot'

export function useCardDraw(spreadType: SpreadType | null) {
  const [deck, setDeck] = useState<TarotCard[]>(() => shuffle(tarotDeck))
  const [drawnCount, setDrawnCount] = useState(0)

  const spread = spreadType ? getSpreadByType(spreadType) : null
  const totalPositions = spread?.positionCount ?? 0
  const remaining = deck.length
  const canDraw = drawnCount < totalPositions && remaining > 0

  const draw = useCallback(() => {
    if (!canDraw || !spread) return null

    const position = spread.positions[drawnCount]
    const card = deck[deck.length - 1]

    setDeck((prev) => prev.slice(0, -1))
    setDrawnCount((prev) => prev + 1)

    return { card, position }
  }, [canDraw, deck, drawnCount, spread])

  const reset = useCallback(() => {
    setDeck(shuffle(tarotDeck))
    setDrawnCount(0)
  }, [])

  return { draw, reset, remaining, canDraw, drawnCount, totalPositions }
}
