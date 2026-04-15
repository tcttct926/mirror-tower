import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DrawnCard, Reading, SpreadType, TarotCard, SpreadPosition } from '../types/tarot'

interface ReadingStore {
  currentSpread: SpreadType | null
  drawnCards: DrawnCard[]
  interpretation: string | null
  interpretationSource: 'ai' | 'fallback' | null
  isInterpreting: boolean
  apiKey: string | null
  readings: Reading[]

  selectSpread: (spread: SpreadType) => void
  drawCard: (card: TarotCard, position: SpreadPosition) => void
  revealCard: (index: number) => void
  setInterpretation: (text: string, source: 'ai' | 'fallback') => void
  setIsInterpreting: (val: boolean) => void
  saveReading: () => void
  clearCurrentReading: () => void
  setApiKey: (key: string) => void
  deleteReading: (id: string) => void
}

export const useReadingStore = create<ReadingStore>()(
  persist(
    (set, get) => ({
      currentSpread: null,
      drawnCards: [],
      interpretation: null,
      interpretationSource: null,
      isInterpreting: false,
      apiKey: null,
      readings: [],

      selectSpread: (spread) =>
        set({
          currentSpread: spread,
          drawnCards: [],
          interpretation: null,
          interpretationSource: null,
          isInterpreting: false,
        }),

      drawCard: (card, position) => {
        const isReversed = Math.random() < 0.4
        const newCard: DrawnCard = {
          card,
          isReversed,
          position,
          revealed: false,
        }
        set((state) => ({
          drawnCards: [...state.drawnCards, newCard],
        }))
      },

      revealCard: (index) =>
        set((state) => ({
          drawnCards: state.drawnCards.map((c, i) =>
            i === index ? { ...c, revealed: true } : c
          ),
        })),

      setInterpretation: (text, source) =>
        set({ interpretation: text, interpretationSource: source }),

      setIsInterpreting: (val) => set({ isInterpreting: val }),

      saveReading: () => {
        const { currentSpread, drawnCards, interpretation, interpretationSource, readings } = get()
        if (!currentSpread || drawnCards.length === 0) return

        const reading: Reading = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
          timestamp: Date.now(),
          spreadType: currentSpread,
          cards: drawnCards,
          interpretation: interpretation,
          interpretationSource: interpretationSource,
        }
        set({ readings: [reading, ...readings] })
      },

      clearCurrentReading: () =>
        set({
          currentSpread: null,
          drawnCards: [],
          interpretation: null,
          interpretationSource: null,
          isInterpreting: false,
        }),

      setApiKey: (key) => set({ apiKey: key }),

      deleteReading: (id) =>
        set((state) => ({
          readings: state.readings.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'mirror-tower-storage',
      partialize: (state) => ({
        apiKey: state.apiKey,
        readings: state.readings,
      }),
    }
  )
)
