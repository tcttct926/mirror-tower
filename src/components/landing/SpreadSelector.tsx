import { useNavigate } from 'react-router-dom'
import { useReadingStore } from '../../store/useReadingStore'
import { spreads } from '../../data/spreads'
import type { SpreadType } from '../../types/tarot'

const spreadIcons: Record<SpreadType, string> = {
  'single': '🌟',
  'three-card': '🌙',
  'celtic-cross': '✨',
}

function SpreadSelector() {
  const navigate = useNavigate()
  const selectSpread = useReadingStore((s) => s.selectSpread)

  const handleSelect = (type: SpreadType) => {
    selectSpread(type)
    navigate('/reading')
  }

  return (
    <div className="px-4 pb-12">
      <h2 className="font-serif text-2xl text-center text-primary-glow mb-8">选择牌阵</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {spreads.map((spread) => (
          <button
            key={spread.type}
            onClick={() => handleSelect(spread.type)}
            className="group relative bg-surface/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-left
                       transition-all duration-300 hover:border-primary/60 hover:bg-surface-light/80
                       hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">{spreadIcons[spread.type]}</div>
            <h3 className="font-serif text-xl text-text-main mb-2 group-hover:text-primary-glow transition-colors">
              {spread.nameZh}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">{spread.description}</p>
            <div className="mt-4 text-xs text-primary/60">
              {spread.positionCount} 张牌
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SpreadSelector
