import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DrawnCard, Reading, SpreadType, TarotCard, SpreadPosition, User, IntuitiveOption } from '../types/tarot'
import { simpleHash } from '../utils/hash'
import { getZodiacSign } from '../utils/zodiac'
import { solarToLunar, formatLunarDate } from '../utils/lunarCalendar'

const USERS_KEY = 'mirror-tower-users'

function getStoredUsers(): (User & { passwordHash: string })[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function setStoredUsers(users: (User & { passwordHash: string })[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

interface ReadingAttempt {
  timestamp: number
  spreadType: SpreadType
}

interface ReadingStore {
  currentSpread: SpreadType | null
  drawnCards: DrawnCard[]
  interpretation: string | null
  isInterpreting: boolean
  readings: Reading[]
  currentUser: User | null
  intuitiveOptions: IntuitiveOption[] | null
  readingAttempts: ReadingAttempt[]

  selectSpread: (spread: SpreadType) => void
  drawCard: (card: TarotCard, position: SpreadPosition) => void
  revealCard: (index: number) => void
  setInterpretation: (text: string) => void
  setIsInterpreting: (val: boolean) => void
  saveReading: () => void
  clearCurrentReading: () => void
  deleteReading: (id: string) => void
  registerUser: (data: { name: string; birthDate: string; gender: 'male' | 'female' | 'other'; phone: string; password: string }) => boolean
  loginUser: (phone: string, password: string) => boolean
  logoutUser: () => void
  updateProfile: (data: Partial<Pick<User, 'name' | 'gender' | 'birthDate'>>) => void
  setIntuitiveOptions: (options: IntuitiveOption[]) => void
  selectIntuitiveCard: (cardId: number) => void
}

export const useReadingStore = create<ReadingStore>()(
  persist(
    (set, get) => ({
      currentSpread: null,
      drawnCards: [],
      interpretation: null,
      isInterpreting: false,
      readings: [],
      currentUser: null,
      intuitiveOptions: null,
      readingAttempts: [],

      selectSpread: (spread) => {
        const now = Date.now()
        const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000
        const { readingAttempts } = get()
        // Clean old attempts and record new one
        const cleaned = readingAttempts.filter((a) => a.timestamp >= twoDaysAgo)
        set({
          currentSpread: spread,
          drawnCards: [],
          interpretation: null,
          isInterpreting: false,
          intuitiveOptions: null,
          readingAttempts: [...cleaned, { timestamp: now, spreadType: spread }],
        })
      },

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

      setInterpretation: (text) =>
        set({ interpretation: text }),

      setIsInterpreting: (val) => set({ isInterpreting: val }),

      saveReading: () => {
        const { currentSpread, drawnCards, interpretation, readings } = get()
        if (!currentSpread || drawnCards.length === 0) return

        const reading: Reading = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
          timestamp: Date.now(),
          spreadType: currentSpread,
          cards: drawnCards,
          interpretation: interpretation,
          interpretationSource: 'fallback',
        }
        set({ readings: [reading, ...readings] })
      },

      clearCurrentReading: () =>
        set({
          currentSpread: null,
          drawnCards: [],
          interpretation: null,
          isInterpreting: false,
          intuitiveOptions: null,
        }),

      deleteReading: (id) =>
        set((state) => ({
          readings: state.readings.filter((r) => r.id !== id),
        })),

      registerUser: (data) => {
        const users = getStoredUsers()
        if (users.some((u) => u.phone === data.phone)) return false

        const [year, month, day] = data.birthDate.split('-').map(Number)
        const zodiacSign = getZodiacSign(month, day)
        const lunar = solarToLunar(year, month, day)
        const birthDateLunar = formatLunarDate(lunar)

        const user: User = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
          name: data.name,
          birthDate: data.birthDate,
          birthDateLunar,
          gender: data.gender,
          phone: data.phone,
          passwordHash: simpleHash(data.password),
          zodiacSign,
          createdAt: Date.now(),
        }

        setStoredUsers([...users, user])
        set({ currentUser: user })
        return true
      },

      loginUser: (phone, password) => {
        const users = getStoredUsers()
        const user = users.find((u) => u.phone === phone && u.passwordHash === simpleHash(password))
        if (!user) return false
        set({ currentUser: user })
        return true
      },

      logoutUser: () => set({ currentUser: null }),

      updateProfile: (data) => {
        const { currentUser } = get()
        if (!currentUser) return
        let updated = { ...currentUser, ...data }
        // Recalculate zodiacSign and lunar date if birthDate changed
        if (data.birthDate && data.birthDate !== currentUser.birthDate) {
          const [year, month, day] = data.birthDate.split('-').map(Number)
          updated.zodiacSign = getZodiacSign(month, day)
          const lunar = solarToLunar(year, month, day)
          updated.birthDateLunar = formatLunarDate(lunar)
        }
        const users = getStoredUsers()
        setStoredUsers(users.map((u) => (u.id === updated.id ? updated : u)))
        set({ currentUser: updated })
      },

      setIntuitiveOptions: (options) => set({ intuitiveOptions: options }),

      selectIntuitiveCard: (cardId) =>
        set((state) => ({
          intuitiveOptions: state.intuitiveOptions?.map((o) => ({
            ...o,
            selected: o.card.id === cardId,
          })) || null,
        })),
    }),
    {
      name: 'mirror-tower-storage',
      partialize: (state) => ({
        readings: state.readings,
        currentUser: state.currentUser,
        readingAttempts: state.readingAttempts,
      }),
    }
  )
)
