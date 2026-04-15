import CardBack from './CardBack'

interface CardDeckProps {
  remaining: number
  onDraw: () => void
}

function CardDeck({ remaining, onDraw }: CardDeckProps) {
  if (remaining <= 0) return null

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onDraw}
        className="relative float hover:scale-105 transition-transform duration-200"
      >
        {/* Stack effect - cards underneath */}
        {remaining > 2 && (
          <div className="absolute top-1 left-1 w-[120px] h-[192px] sm:w-[150px] sm:h-[240px]
                         rounded-xl bg-surface-light border border-primary/10 opacity-50" />
        )}
        {remaining > 1 && (
          <div className="absolute top-0.5 left-0.5 w-[120px] h-[192px] sm:w-[150px] sm:h-[240px]
                         rounded-xl bg-surface border border-primary/20 opacity-70" />
        )}
        {/* Top card */}
        <div className="w-[120px] h-[192px] sm:w-[150px] sm:h-[240px]">
          <CardBack />
        </div>
      </button>
      <div className="text-text-muted text-sm">
        点击抽牌 · 剩余 {remaining} 张
      </div>
    </div>
  )
}

export default CardDeck
