import type { ZodiacSign, ZodiacElement } from '../types/tarot'

const zodiacRanges: { sign: ZodiacSign; startMonth: number; startDay: number; endMonth: number; endDay: number }[] = [
  { sign: 'capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { sign: 'aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { sign: 'pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { sign: 'aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { sign: 'taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { sign: 'gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { sign: 'cancer', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { sign: 'leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { sign: 'virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { sign: 'libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  { sign: 'scorpio', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  { sign: 'sagittarius', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
]

export function getZodiacSign(month: number, day: number): ZodiacSign {
  for (const z of zodiacRanges) {
    if (z.startMonth === z.endMonth) {
      if (month === z.startMonth && day >= z.startDay && day <= z.endDay) return z.sign
    } else if (z.startMonth > z.endMonth) {
      if ((month === z.startMonth && day >= z.startDay) || (month === z.endMonth && day <= z.endDay)) return z.sign
    } else {
      if ((month === z.startMonth && day >= z.startDay) || (month === z.endMonth && day <= z.endDay)) return z.sign
    }
  }
  return 'capricorn'
}

const zodiacNamesZh: Record<ZodiacSign, string> = {
  aries: '白羊座', taurus: '金牛座', gemini: '双子座', cancer: '巨蟹座',
  leo: '狮子座', virgo: '处女座', libra: '天秤座', scorpio: '天蝎座',
  sagittarius: '射手座', capricorn: '摩羯座', aquarius: '水瓶座', pisces: '双鱼座',
}

export function getZodiacNameZh(sign: ZodiacSign): string {
  return zodiacNamesZh[sign]
}

const zodiacElements: Record<ZodiacSign, ZodiacElement> = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
}

export function getZodiacElement(sign: ZodiacSign): ZodiacElement {
  return zodiacElements[sign]
}

const elementNamesZh: Record<ZodiacElement, string> = {
  fire: '火', earth: '土', air: '风', water: '水',
}

export function getElementNameZh(element: ZodiacElement): string {
  return elementNamesZh[element]
}

const zodiacTraits: Record<ZodiacSign, string> = {
  aries: '你天生具有冲劲与勇气，白羊的火焰让你敢于面对一切挑战',
  taurus: '你务实而坚定，金牛的沉稳让你在变化中保持从容',
  gemini: '你聪慧而好奇，双子的灵活让你总能看到事物的不同面向',
  cancer: '你敏感而深情，巨蟹的温柔让你与内心世界深度连接',
  leo: '你自信而热烈，狮子的光芒让你天生拥有引领的力量',
  virgo: '你细腻而严谨，处女的洞察让你总能发现隐藏的细节',
  libra: '你优雅而公正，天秤的平衡感让你在纷繁中找到和谐',
  scorpio: '你深邃而坚韧，天蝎的洞察力让你能穿透表象触及真相',
  sagittarius: '你自由而乐观，射手的探索精神让你永远向往更远的地方',
  capricorn: '你坚毅而务实，摩羯的耐心让你在漫长的道路上稳步前行',
  aquarius: '你独立而创新，水瓶的前瞻性让你总能看到别人看不到的可能',
  pisces: '你敏感而富有同理心，双鱼的直觉让你与灵性世界深度共鸣',
}

export function getZodiacTrait(sign: ZodiacSign): string {
  return zodiacTraits[sign]
}

export function getZodiacSymbol(sign: ZodiacSign): string {
  const symbols: Record<ZodiacSign, string> = {
    aries: '\u2648', taurus: '\u2649', gemini: '\u264A', cancer: '\u264B',
    leo: '\u264C', virgo: '\u264D', libra: '\u264E', scorpio: '\u264F',
    sagittarius: '\u2650', capricorn: '\u2651', aquarius: '\u2652', pisces: '\u2653',
  }
  return symbols[sign]
}
