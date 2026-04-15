import type { DrawnCard, SpreadConfig } from '../../types/tarot'
import TarotCard from './TarotCard'
import { cn } from '../../utils/cn'

interface CardSpreadProps {
  spread: SpreadConfig
  drawnCards: DrawnCard[]
  onReveal: (index: number) => void
}

function CardSpread({ spread, drawnCards, onReveal }: CardSpreadProps) {
  const isCeltic = spread.type === 'celtic-cross'
  const isSingle = spread.type === 'single'

  if (isCeltic) {
    return (
      <div className="relative w-full max-w-2xl mx-auto" style={{ paddingBottom: '60%' }}>
        {drawnCards.map((drawn, i) => (
          <div
            key={i}
            className={cn(
              'absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500',
              drawn.revealed ? 'opacity-100' : 'opacity-80'
            )}
            style={{
              left: `${drawn.position.x * 100}%`,
              top: `${drawn.position.y * 100}%`,
              ...(drawn.position.rotation ? { transform: `translate(-50%, -50%) rotate(${drawn.position.rotation}deg)` } : {}),
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <TarotCard
                card={drawn.card}
                isReversed={drawn.isReversed}
                revealed={drawn.revealed}
                onReveal={() => onReveal(i)}
                size="sm"
              />
              <span className="text-xs text-text-muted/80 whitespace-nowrap">
                {drawn.position.labelZh}
              </span>
            </div>
          </div>
        ))}
        {/* Ghost positions for unfilled slots */}
        {spread.positions.slice(drawnCards.length).map((pos, i) => (
          <div
            key={`ghost-${i}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
              ...(pos.rotation ? { transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)` } : {}),
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-[100px] h-[160px] sm:w-[120px] sm:h-[192px] rounded-xl
                              border-2 border-dashed border-primary/20 bg-surface/30" />
              <span className="text-xs text-text-muted/50 whitespace-nowrap">{pos.labelZh}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn(
      'flex items-center justify-center gap-4 sm:gap-8 py-8',
      isSingle && 'flex-col'
    )}>
      {drawnCards.map((drawn, i) => (
        <div key={i} className="flex flex-col items-center gap-2 slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
          <TarotCard
            card={drawn.card}
            isReversed={drawn.isReversed}
            revealed={drawn.revealed}
            onReveal={() => onReveal(i)}
            size={isSingle ? 'lg' : 'md'}
          />
          <span className="text-sm text-text-muted font-serif">
            {drawn.position.labelZh}
          </span>
        </div>
      ))}
      {/* Ghost positions */}
      {spread.positions.slice(drawnCards.length).map((pos, i) => (
        <div key={`ghost-${i}`} className="flex flex-col items-center gap-2">
          <div className={cn(
            'rounded-xl border-2 border-dashed border-primary/20 bg-surface/30',
            isSingle ? 'w-[150px] h-[240px] sm:w-[180px] sm:h-[288px]' : 'w-[120px] h-[192px] sm:w-[150px] sm:h-[240px]'
          )} />
          <span className="text-sm text-text-muted/50 font-serif">{pos.labelZh}</span>
        </div>
      ))}
    </div>
  )
}

export default CardSpread
