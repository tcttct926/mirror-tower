import { useReadingStore } from '../store/useReadingStore'
import { formatDate } from '../utils/formatDate'
import Button from '../components/ui/Button'
import SvgIcon from '../components/ui/SvgIcon'
import { useState } from 'react'

const spreadNames: Record<string, string> = {
  'single': '单牌指引',
  'three-card': '三牌时序',
  'celtic-cross': '凯尔特十字',
  'intuitive': '直觉选牌',
}

function HistoryPage() {
  const readings = useReadingStore((s) => s.readings)
  const deleteReading = useReadingStore((s) => s.deleteReading)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (readings.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <SvgIcon name="scroll" size={48} className="opacity-60 text-primary-glow" />
        <p className="text-text-muted font-serif text-lg">尚无占卜记录</p>
        <p className="text-text-muted/50 text-sm">完成一次占卜后，记录会出现在这里</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="font-serif text-2xl text-primary-glow mb-6 text-center">占卜记录</h2>
      <div className="space-y-4">
        {readings.map((reading) => (
          <div key={reading.id} className="bg-surface/80 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden">
            {/* Summary */}
            <button
              className="w-full text-left p-4 hover:bg-surface-light/50 transition-colors"
              onClick={() => setExpandedId(expandedId === reading.id ? null : reading.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-serif text-text-main">
                    {spreadNames[reading.spreadType] || reading.spreadType}
                  </div>
                  <div className="text-text-muted text-sm mt-1">
                    {formatDate(reading.timestamp)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {reading.cards.slice(0, 5).map((c, i) => (
                      <div
                        key={i}
                        className="w-8 h-12 rounded bg-gradient-to-br from-[#2a1a4a] to-[#0a1a2a]
                                   border border-primary/30 flex items-center justify-center text-[8px] text-primary-glow"
                      >
                        {c.card.nameZh.slice(0, 2)}
                      </div>
                    ))}
                    {reading.cards.length > 5 && (
                      <div className="w-8 h-12 rounded bg-surface-light border border-primary/20
                                     flex items-center justify-center text-[10px] text-text-muted">
                        +{reading.cards.length - 5}
                      </div>
                    )}
                  </div>
                  <span className="text-text-muted/60 text-sm">
                    {expandedId === reading.id ? '▲' : '▼'}
                  </span>
                </div>
              </div>
            </button>

            {/* Expanded detail */}
            {expandedId === reading.id && (
              <div className="border-t border-primary/10 p-4 slide-up">
                {/* Cards */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {reading.cards.map((c, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs font-serif text-text-main">
                        {c.card.nameZh}
                        {c.isReversed && <span className="text-red-400/80 ml-1">逆</span>}
                      </div>
                      <div className="text-[10px] text-text-muted/60">{c.position.labelZh}</div>
                    </div>
                  ))}
                </div>

                {/* Interpretation */}
                {reading.interpretation && (
                  <div className="text-text-main/80 text-sm leading-relaxed whitespace-pre-line font-serif mb-4 p-4 bg-background/50 rounded-lg">
                    {reading.interpretation}
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReading(reading.id)}
                  >
                    删除
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryPage
