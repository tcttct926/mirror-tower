import { useNavigate } from 'react-router-dom'
import { useReadingStore } from '../store/useReadingStore'
import { useCardDraw } from '../hooks/useCardDraw'
import { useInterpretation } from '../hooks/useInterpretation'
import { getSpreadByType } from '../data/spreads'
import CardSpread from '../components/cards/CardSpread'
import CardDeck from '../components/cards/CardDeck'
import IntuitiveCardSelector from '../components/reading/IntuitiveCardSelector'
import InterpretationBox from '../components/reading/InterpretationBox'
import Button from '../components/ui/Button'

function ReadingPage() {
  const navigate = useNavigate()
  const currentSpread = useReadingStore((s) => s.currentSpread)
  const drawnCards = useReadingStore((s) => s.drawnCards)
  const drawCard = useReadingStore((s) => s.drawCard)
  const revealCard = useReadingStore((s) => s.revealCard)
  const interpretation = useReadingStore((s) => s.interpretation)
  const isInterpreting = useReadingStore((s) => s.isInterpreting)
  const intuitiveOptions = useReadingStore((s) => s.intuitiveOptions)
  const clearCurrentReading = useReadingStore((s) => s.clearCurrentReading)

  const { draw, remaining, canDraw, totalPositions } = useCardDraw(currentSpread)
  const { interpret } = useInterpretation()

  const spread = currentSpread ? getSpreadByType(currentSpread) : null
  const isIntuitiveSpread = currentSpread === 'intuitive'

  if (!currentSpread || !spread) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-text-muted font-serif text-xl">请先选择一个牌阵</p>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>
    )
  }

  const allRevealed = drawnCards.length === totalPositions && drawnCards.every((c) => c.revealed)
  const canInterpret = allRevealed && !interpretation && !isInterpreting

  const handleDraw = () => {
    const result = draw()
    if (result) {
      const nextIndex = drawnCards.length
      drawCard(result.card, result.position)
      // Auto-reveal after a delay
      setTimeout(() => {
        revealCard(nextIndex)
      }, 800)
    }
  }

  const handleIntuitiveConfirm = () => {
    const selected = intuitiveOptions?.find((o) => o.selected)
    if (!selected) return
    const position = spread.positions[0]
    drawCard(selected.card, position)
    setTimeout(() => {
      revealCard(0)
    }, 800)
  }

  const handleInterpret = () => {
    if (drawnCards.length > 0) {
      interpret(drawnCards, currentSpread)
    }
  }

  const handleReset = () => {
    clearCurrentReading()
    navigate('/')
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center py-8">
      {/* Spread title */}
      <h2 className="font-serif text-2xl text-primary-glow mb-2">{spread.nameZh}</h2>
      <p className="text-text-muted text-sm mb-6">{spread.description}</p>

      {/* Intuitive spread: card selector */}
      {isIntuitiveSpread && drawnCards.length === 0 ? (
        <IntuitiveCardSelector onConfirm={handleIntuitiveConfirm} />
      ) : (
        <>
          {/* Progress */}
          {!isIntuitiveSpread && (
            <div className="text-text-muted text-sm mb-8">
              已抽 {drawnCards.length} / {totalPositions} 张
            </div>
          )}

          {/* Card spread area */}
          <div className="w-full px-4 mb-8">
            <CardSpread
              spread={spread}
              drawnCards={drawnCards}
              onReveal={revealCard}
            />
          </div>

          {/* Deck or interpret */}
          {!isIntuitiveSpread && canDraw && !allRevealed ? (
            <div className="py-4">
              <CardDeck remaining={remaining} onDraw={handleDraw} />
            </div>
          ) : null}
        </>
      )}

      {/* Interpretation */}
      <InterpretationBox
        text={interpretation}
        isInterpreting={isInterpreting}
        onInterpret={handleInterpret}
        canInterpret={canInterpret}
      />

      {/* Actions */}
      {(interpretation || allRevealed) && (
        <div className="flex gap-4 mt-6 mb-8">
          <Button variant="ghost" onClick={handleReset}>
            重新占卜
          </Button>
        </div>
      )}
    </div>
  )
}

export default ReadingPage
