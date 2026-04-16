import type { TarotCard } from '../../types/tarot'
import SvgIcon from '../ui/SvgIcon'
import { cn } from '../../utils/cn'

const suitGlow: Record<TarotCard['suit'], string> = {
  major: 'shadow-purple-500/40 border-purple-400/40',
  wands: 'shadow-red-500/40 border-red-400/40',
  cups: 'shadow-blue-500/40 border-blue-400/40',
  swords: 'shadow-slate-400/40 border-slate-400/40',
  pentacles: 'shadow-yellow-500/40 border-yellow-400/40',
}

const suitIconName: Record<TarotCard['suit'], string> = {
  major: 'suit-major',
  wands: 'suit-wands',
  cups: 'suit-cups',
  swords: 'suit-swords',
  pentacles: 'suit-pentacles',
}

const suitGradient: Record<TarotCard['suit'], string> = {
  major: 'from-purple-900/40 via-[#1a1a2e] to-purple-900/20',
  wands: 'from-red-900/40 via-[#1a1a2e] to-red-900/20',
  cups: 'from-blue-900/40 via-[#1a1a2e] to-blue-900/20',
  swords: 'from-slate-700/40 via-[#1a1a2e] to-slate-700/20',
  pentacles: 'from-yellow-900/40 via-[#1a1a2e] to-yellow-900/20',
}

interface CardFrontProps {
  card: TarotCard
  isReversed: boolean
}

function CardFront({ card, isReversed }: CardFrontProps) {
  return (
    <div
      className={cn(
        'w-full h-full rounded-xl bg-gradient-to-br border-2 shadow-lg flex flex-col items-center justify-center p-3 gap-2 relative',
        suitGradient[card.suit],
        suitGlow[card.suit],
      )}
    >
      {/* Reversed overlay - subtle red tint */}
      {isReversed && (
        <div className="absolute inset-0 rounded-xl bg-red-900/15 pointer-events-none" />
      )}

      {/* Suit symbol */}
      <div className={cn('opacity-80', isReversed && 'rotate-180')}>
        {card.suit === 'major' ? (
          <SvgIcon name="suit-major" size={28} />
        ) : (
          <SvgIcon name={suitIconName[card.suit]} size={28} />
        )}
      </div>

      {/* Card name */}
      <div className={cn('font-serif text-lg text-text-main text-center leading-tight font-bold', isReversed && 'rotate-180')}>
        {card.nameZh}
      </div>

      {/* English name (small) */}
      <div className={cn('text-[10px] text-text-muted/60 text-center leading-tight', isReversed && 'rotate-180')}>
        {card.nameEn}
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap justify-center gap-1 mt-1">
        {(isReversed ? card.keywordsReversed : card.keywordsUpright).slice(0, 3).map((kw) => (
          <span
            key={kw}
            className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary-glow/80 border border-primary/20"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Reversed indicator - always upright */}
      {isReversed && (
        <div className="text-[10px] text-red-400/80 mt-1 font-bold">↑ 逆位</div>
      )}

      {/* Corner ornaments */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent/20" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/20" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent/20" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent/20" />
    </div>
  )
}

export default CardFront
