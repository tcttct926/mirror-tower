import { useCallback } from 'react'
import { useReadingStore } from '../store/useReadingStore'
import { generateFallbackInterpretation } from '../data/fallbackInterpretations'
import type { DrawnCard, SpreadType } from '../types/tarot'

function buildPrompt(cards: DrawnCard[], spreadType: SpreadType): string {
  const spreadNames: Record<SpreadType, string> = {
    'single': '单牌指引',
    'three-card': '三牌时序（过去-现在-未来）',
    'celtic-cross': '凯尔特十字',
  }

  let prompt = `你是一位精通塔罗牌的神秘学大师。请根据以下牌阵和牌面，为求问者提供一段深入、富有启发性的中文解读。\n\n`
  prompt += `牌阵类型：${spreadNames[spreadType]}\n\n`

  for (const drawn of cards) {
    const orientation = drawn.isReversed ? '逆位' : '正位'
    const keywords = drawn.isReversed ? drawn.card.keywordsReversed : drawn.card.keywordsUpright
    prompt += `位置：${drawn.position.labelZh}\n`
    prompt += `牌面：${drawn.card.nameZh}（${orientation}）\n`
    prompt += `关键词：${keywords.join('、')}\n\n`
  }

  prompt += `请按照以下结构组织你的解读：\n`
  prompt += `1. 整体能量概览（2-3句话，概括牌阵的整体氛围）\n`
  prompt += `2. 每个位置的详细解读（每个位置3-4句话，结合牌面含义与位置象征，语气温暖而深邃）\n`
  prompt += `3. 综合建议（3-4句话，给出具体可操作的建议）\n\n`
  prompt += `语气要求：温暖而深邃，像一位智慧的朋友在低语。避免过于宿命论的表达，强调人的主观能动性。`

  return prompt
}

async function callClaudeAPI(apiKey: string, cards: DrawnCard[], spreadType: SpreadType): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: buildPrompt(cards, spreadType),
      }],
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `API 请求失败: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

export function useInterpretation() {
  const apiKey = useReadingStore((s) => s.apiKey)
  const setInterpretation = useReadingStore((s) => s.setInterpretation)
  const setIsInterpreting = useReadingStore((s) => s.setIsInterpreting)

  const interpret = useCallback(async (cards: DrawnCard[], spreadType: SpreadType) => {
    setIsInterpreting(true)

    try {
      if (apiKey) {
        try {
          const text = await callClaudeAPI(apiKey, cards, spreadType)
          setInterpretation(text, 'ai')
          return
        } catch (err) {
          console.warn('AI 调用失败，使用本地解读:', err)
        }
      }

      // Fallback
      const text = generateFallbackInterpretation(cards, spreadType)
      setInterpretation(text, 'fallback')
    } finally {
      setIsInterpreting(false)
    }
  }, [apiKey, setInterpretation, setIsInterpreting])

  return { interpret }
}
