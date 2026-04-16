import { useNavigate } from 'react-router-dom'
import { useReadingStore } from '../../store/useReadingStore'
import { spreads } from '../../data/spreads'
import type { SpreadType } from '../../types/tarot'
import SvgIcon from '../ui/SvgIcon'

const MAX_DAILY_PER_SPREAD = 1

const spreadIconNames: Record<SpreadType, string> = {
  'single': 'star-burst',
  'three-card': 'crescent-moon',
  'celtic-cross': 'sparkle',
  'intuitive': 'eye-intuitive',
}

function getTodayCount(readings: { timestamp: number; spreadType: SpreadType }[], spreadType: SpreadType): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const startOfDay = today.getTime()
  return readings.filter((r) => r.timestamp >= startOfDay && r.spreadType === spreadType).length
}

function SpreadSelector() {
  const navigate = useNavigate()
  const selectSpread = useReadingStore((s) => s.selectSpread)
  const readingAttempts = useReadingStore((s) => s.readingAttempts)

  const handleSelect = (type: SpreadType) => {
    if (getTodayCount(readingAttempts, type) >= MAX_DAILY_PER_SPREAD) return
    selectSpread(type)
    navigate('/reading')
  }

  return (
    <div className="px-4 pb-12">
      <h2 className="font-serif text-2xl text-center text-primary-glow mb-8">选择牌阵</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {spreads.map((spread) => {
          const usedToday = getTodayCount(readingAttempts, spread.type)
          const isLimitReached = usedToday >= MAX_DAILY_PER_SPREAD

          return (
            <button
              key={spread.type}
              onClick={() => handleSelect(spread.type)}
              disabled={isLimitReached}
              className={`group relative bg-surface/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-left
                         transition-all duration-300
                         ${isLimitReached
                           ? 'opacity-50 cursor-not-allowed'
                           : 'hover:border-primary/60 hover:bg-surface-light/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1'
                         }`}
            >
              <SvgIcon name={spreadIconNames[spread.type]} size={36} className="mb-4 text-primary-glow" />
              <h3 className={`font-serif text-xl mb-2 transition-colors ${
                isLimitReached ? 'text-text-muted' : 'text-text-main group-hover:text-primary-glow'
              }`}>
                {spread.nameZh}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{spread.description}</p>
              <div className="mt-4 text-xs text-primary/60">
                {spread.positionCount} 张牌 · 今日 {usedToday}/{MAX_DAILY_PER_SPREAD}
              </div>
              {isLimitReached && (
                <div className="absolute inset-0 rounded-xl bg-background/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="text-text-muted text-sm font-serif">今日已达上限</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SpreadSelector
