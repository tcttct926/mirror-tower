import { useState } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'
import type { TarotCard as TarotCardType } from '../../types/tarot'
import { cn } from '../../utils/cn'

interface TarotCardProps {
  card: TarotCardType
  isReversed: boolean
  revealed: boolean
  onReveal?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-[100px] h-[160px] sm:w-[120px] sm:h-[192px]',
  md: 'w-[120px] h-[192px] sm:w-[150px] sm:h-[240px]',
  lg: 'w-[150px] h-[240px] sm:w-[180px] sm:h-[288px]',
}

function TarotCardComponent({ card, isReversed, revealed, onReveal, className, size = 'md' }: TarotCardProps) {
  const [hasBurst, setHasBurst] = useState(false)

  const handleFlip = () => {
    if (!revealed && onReveal) {
      onReveal()
      setHasBurst(true)
      setTimeout(() => setHasBurst(false), 600)
    }
  }

  return (
    <div
      className={cn('tarot-card-container relative', sizeMap[size], className)}
      onClick={handleFlip}
      style={{ cursor: revealed ? 'default' : 'pointer' }}
    >
      <div className={cn('tarot-card', revealed && 'flipped')}>
        {/* Back face */}
        <div className="card-face">
          <CardBack />
        </div>
        {/* Front face */}
        <div className="card-face card-front">
          <CardFront card={card} isReversed={isReversed} />
        </div>
      </div>

      {/* Reveal burst effect */}
      {hasBurst && <div className="reveal-burst" />}

      {/* Glow effect when revealed */}
      {revealed && (
        <div className="absolute inset-0 rounded-xl pointer-events-none
                        shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
      )}
    </div>
  )
}

export default TarotCardComponent
