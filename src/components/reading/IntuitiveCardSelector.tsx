import { useReadingStore } from '../../store/useReadingStore'
import { generateIntuitiveOptions } from '../../hooks/useCardDraw'
import CardFront from '../cards/CardFront'
import Button from '../ui/Button'
import type { IntuitiveOption } from '../../types/tarot'

interface IntuitiveCardSelectorProps {
  onConfirm: () => void
}

function IntuitiveCardSelector({ onConfirm }: IntuitiveCardSelectorProps) {
  const intuitiveOptions = useReadingStore((s) => s.intuitiveOptions)
  const setIntuitiveOptions = useReadingStore((s) => s.setIntuitiveOptions)
  const selectIntuitiveCard = useReadingStore((s) => s.selectIntuitiveCard)

  const selectedOption = intuitiveOptions?.find((o) => o.selected)

  const handleStart = () => {
    const options = generateIntuitiveOptions().map((card) => ({
      card,
      selected: false,
    }))
    setIntuitiveOptions(options)
  }

  const handleSelect = (cardId: number) => {
    selectIntuitiveCard(cardId)
  }

  // Not yet generated options — show start button
  if (!intuitiveOptions) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted font-serif mb-6">闭上双眼，深呼吸，让直觉引领你</p>
        <button
          onClick={handleStart}
          className="glow-pulse px-8 py-3 rounded-xl bg-primary hover:bg-primary-glow
                     text-white font-serif text-lg transition-colors duration-200"
        >
          展示牌面
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-text-muted font-serif text-center mb-8">凭直觉选择一张吸引你的牌</p>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 justify-items-center">
        {intuitiveOptions.map((option: IntuitiveOption) => (
          <button
            key={option.card.id}
            onClick={() => handleSelect(option.card.id)}
            className={`
              w-full max-w-[100px] aspect-[2/3] rounded-xl transition-all duration-300
              ${option.selected
                ? 'ring-2 ring-primary-glow ring-offset-2 ring-offset-[#0a0a1a] scale-105 shadow-lg shadow-primary/30'
                : 'hover:scale-105 hover:shadow-md hover:shadow-primary/10'
              }
            `}
          >
            <CardFront card={option.card} isReversed={false} />
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="text-center mt-8 slide-up">
          <p className="text-primary-glow font-serif mb-4">
            你选择了「{selectedOption.card.nameZh}」
          </p>
          <Button variant="primary" onClick={onConfirm}>
            确认选择
          </Button>
        </div>
      )}
    </div>
  )
}

export default IntuitiveCardSelector
