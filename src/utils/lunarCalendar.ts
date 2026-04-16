import { Solar } from 'lunar-javascript'

export interface LunarDate {
  year: number
  month: number
  day: number
  monthName: string
  yearGanZhi: string
  dayGanZhi: string
}

export function solarToLunar(year: number, month: number, day: number): LunarDate {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()
  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    monthName: lunar.getMonthInChinese(),
    yearGanZhi: lunar.getYearInGanZhi(),
    dayGanZhi: lunar.getDayInGanZhi(),
  }
}

export function formatLunarDate(lunar: LunarDate): string {
  const monthStr = lunar.month < 0 ? `闰${lunar.monthName}` : lunar.monthName
  const dayNames = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
  const dayStr = dayNames[lunar.day - 1] || String(lunar.day)
  return `${lunar.yearGanZhi}年${monthStr}月${dayStr}`
}
