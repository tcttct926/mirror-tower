import type { DrawnCard, SpreadType, ZodiacSign, ZodiacElement } from '../types/tarot'
import { getZodiacTrait, getZodiacNameZh, getZodiacElement } from '../utils/zodiac'

// Brief position framing — one sentence to contextualize the card meaning in each position
const positionFrames: Record<string, string> = {
  '今日指引': '',
  '过去': '这股能量来自你过去的经历——',
  '现在': '此刻你正面对——',
  '未来': '未来的走向暗示——',
  '现状': '你当前的核心状况——',
  '挑战': '你面对的挑战——',
  '潜意识': '在你没有意识到的层面——',
  '近因': '最近影响你的事情——',
  '可能结果': '如果维持现状——',
  '近未来': '即将到来的变化——',
  '自我': '你内心真实的态度——',
  '环境': '你周围的环境——',
  '希望与恐惧': '你既期待又害怕的——',
  '最终结果': '综合所有能量的最终走向——',
  '直觉之选': '你凭直觉选中的这张牌——',
}

// Brief zodiac closing notes (1 sentence per element, 2 variations)
const zodiacClosings: Record<ZodiacElement, string[]> = {
  fire: [
    '致{zodiacName}：把牌面的讯息转化为你今天就能做的一步，行动永远比等待更符合你的本性。',
    '致{zodiacName}：你的直觉比分析更快——相信此刻的第一反应，然后去做。',
  ],
  earth: [
    '致{zodiacName}：你的稳重让你不会被情绪带着走，但今天也许需要你迈出舒适区一步。',
    '致{zodiacName}：务实地面对，把牌面的提示变成一件今天就能做的小事。',
  ],
  air: [
    '致{zodiacName}：你的理性是优势，但有些答案光靠分析得不到——试着感受一下。',
    '致{zodiacName}：你擅长看到事物的另一面，这张牌的含义在你这里可能有更深的解读。',
  ],
  water: [
    '致{zodiacName}：你的直觉让你能感受到文字之外的讯息，相信你此刻的感应。',
    '致{zodiacName}：这张牌触及的可能比你看到的更深——给自己一点时间去体会。',
  ],
}

// Per-zodiac brief note for card-specific interaction (used for key positions only)
const zodiacCardNotes: Record<ZodiacSign, (cardName: string) => string> = {
  aries: (c) => `以白羊的行动力，面对${c}的讯息，你可能会想立刻动手——先想清楚方向再冲。`,
  taurus: (c) => `金牛的务实让你对${c}的提示不会过度解读，但也要注意是否在抗拒变化。`,
  gemini: (c) => `双子能同时看到${c}的正反两面，这是优势，但别在可能性中迷失了方向。`,
  cancer: (c) => `巨蟹的直觉让你对${c}的感受比语言更深，相信你此刻的感应。`,
  leo: (c) => `狮子面对${c}的讯息，有把挑战变成舞台的天赋——但有时退一步比冲上去更需要勇气。`,
  virgo: (c) => `处女擅长从${c}中捕捉细节，但有时候放下分析让直觉说话，答案反而更清晰。`,
  libra: (c) => `天秤对${c}中的平衡与失衡格外敏感，但有时候做出选择比两全其美更重要。`,
  scorpio: (c) => `天蝎不会满足于${c}的表面含义——你本能地想挖到最深处，这是你的力量。`,
  sagittarius: (c) => `射手对${c}的讯息充满期待，但真正的智慧是在乐观中保持清醒。`,
  capricorn: (c) => `摩羯面对${c}会本能地想制定计划——这很好，但偶尔也要允许自己不按剧本走。`,
  aquarius: (c) => `水瓶总能从${c}中读出超越当下的含义——相信你那个与众不同的直觉。`,
  pisces: (c) => `双鱼对${c}的感受近乎本能，但在感受的同时也要守护好自己的边界。`,
}

function fillTemplate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, key) => vars[key] || '')
}

export function generateFallbackInterpretation(
  drawnCards: DrawnCard[],
  spreadType: SpreadType,
  zodiacSign?: ZodiacSign
): string {
  const parts: string[] = []

  // Spread type label
  const spreadLabels: Record<SpreadType, string> = {
    'single': '今日单牌指引',
    'three-card': '过去·现在·未来',
    'celtic-cross': '凯尔特十字牌阵',
    'intuitive': '直觉选牌',
  }
  parts.push(spreadLabels[spreadType])
  parts.push('')

  // Brief zodiac opening (1 sentence only)
  if (zodiacSign) {
    const zodiacName = getZodiacNameZh(zodiacSign)
    const trait = getZodiacTrait(zodiacSign)
    parts.push(`${zodiacName}，${trait}。`)
    parts.push('')
  }

  // Card summary
  const cardList = drawnCards
    .map((d) => `${d.card.nameZh}${d.isReversed ? '（逆位）' : '（正位）'}`)
    .join('、')
  parts.push(`你抽到的牌：${cardList}`)
  parts.push('')

  // Find a key major arcana card for advice (prefer "self/now/core" positions)
  const majorCards = drawnCards.filter((d) => d.card.suit === 'major')
  const keyCard = majorCards.find((d) =>
    ['现在', '现状', '自我', '直觉之选', '今日指引'].includes(d.position.labelZh)
  ) || majorCards[0]

  // Each card's reading
  for (const drawn of drawnCards) {
    const card = drawn.card
    const meaning = drawn.isReversed ? card.meaningReversed : card.meaningUpright
    const orientation = drawn.isReversed ? '逆位' : '正位'
    const positionLabel = drawn.position.labelZh
    const frame = positionFrames[positionLabel] || ''

    // Position header
    parts.push(`【${positionLabel}】${card.nameZh}·${orientation}`)
    parts.push('')

    // Position framing + card meaning (use the actual card meaning text)
    parts.push(frame ? `${frame}${meaning}` : meaning)

    // For major arcana, add a concrete real-life situation example
    if (card.suit === 'major') {
      const situations = drawn.isReversed ? card.situationsReversed : card.situationsUpright
      if (situations && situations.length > 0) {
        const sit = situations[Math.floor(Math.random() * situations.length)]
        parts.push('')
        parts.push(`比如：${sit}`)
      }
    }

    // For key positions, add zodiac-card connection (1 sentence only)
    if (zodiacSign) {
      const isKeyPosition = positionLabel === '现在'
        || positionLabel === '现状'
        || positionLabel === '自我'
        || positionLabel === '直觉之选'
        || positionLabel === '今日指引'

      if (isKeyPosition) {
        parts.push('')
        parts.push(zodiacCardNotes[zodiacSign](card.nameZh))
      }
    }

    parts.push('')
  }

  // Add advice from a key major arcana card
  if (keyCard && keyCard.card.advice) {
    parts.push(`建议：${keyCard.card.advice}`)
    parts.push('')
  }

  // Brief zodiac closing (1 sentence)
  if (zodiacSign) {
    const element = getZodiacElement(zodiacSign)
    const zodiacName = getZodiacNameZh(zodiacSign)
    const notes = zodiacClosings[element]
    const note = notes[Math.floor(Math.random() * notes.length)]
    parts.push(fillTemplate(note, { zodiacName }))
  }

  return parts.join('\n')
}
