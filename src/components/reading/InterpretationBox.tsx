import { useState, useEffect, useRef } from 'react'
import Button from '../ui/Button'
import { useReadingStore } from '../../store/useReadingStore'

interface InterpretationBoxProps {
  text: string | null
  source: 'ai' | 'fallback' | null
  isInterpreting: boolean
  onInterpret: () => void
  canInterpret: boolean
}

function InterpretationBox({ text, source, isInterpreting, onInterpret, canInterpret }: InterpretationBoxProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const indexRef = useRef(0)
  const saveReading = useReadingStore((s) => s.saveReading)

  // Typewriter effect
  useEffect(() => {
    if (!text) {
      setDisplayedText('')
      indexRef.current = 0
      return
    }

    setIsTyping(true)
    indexRef.current = 0
    setDisplayedText('')

    const interval = setInterval(() => {
      indexRef.current += 1
      setDisplayedText(text.slice(0, indexRef.current))

      if (indexRef.current >= text.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [text])

  if (!canInterpret && !text && !isInterpreting) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 slide-up">
      {!text && !isInterpreting && canInterpret && (
        <div className="text-center">
          <button
            onClick={onInterpret}
            className="glow-pulse px-8 py-3 rounded-xl bg-primary hover:bg-primary-glow
                       text-white font-serif text-lg transition-colors duration-200"
          >
            解读牌面
          </button>
        </div>
      )}

      {isInterpreting && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-text-muted font-serif">正在聆听宇宙的低语...</p>
        </div>
      )}

      {text && (
        <div className="parchment rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent text-sm">
              {source === 'ai' ? '🤖 AI 解读' : '📜 传统解读'}
            </span>
          </div>
          <div className="text-text-main/90 leading-relaxed whitespace-pre-line font-serif text-base">
            {displayedText}
            {isTyping && <span className="typing-cursor" />}
          </div>
          {!isTyping && (
            <div className="mt-6 text-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  saveReading()
                }}
              >
                保存本次占卜
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InterpretationBox
