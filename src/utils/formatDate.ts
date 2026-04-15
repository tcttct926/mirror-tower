export function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${year}年${month}月${day}日 ${hour}:${minute}`
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
