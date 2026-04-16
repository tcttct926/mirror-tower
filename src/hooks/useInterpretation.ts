import { useCallback } from 'react'
import { useReadingStore } from '../store/useReadingStore'
import { generateFallbackInterpretation } from '../data/fallbackInterpretations'
import type { DrawnCard, SpreadType } from '../types/tarot'

export function useInterpretation() {
  const setInterpretation = useReadingStore((s) => s.setInterpretation)
  const setIsInterpreting = useReadingStore((s) => s.setIsInterpreting)

  const interpret = useCallback(async (cards: DrawnCard[], spreadType: SpreadType) => {
    setIsInterpreting(true)
    try {
      const zodiacSign = useReadingStore.getState().currentUser?.zodiacSign
      const text = generateFallbackInterpretation(cards, spreadType, zodiacSign)
      setInterpretation(text)
    } finally {
      setIsInterpreting(false)
    }
  }, [setInterpretation, setIsInterpreting])

  return { interpret }
}
