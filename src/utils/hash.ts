export function simpleHash(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff
  }
  return hash.toString(36)
}

export function verifyHash(str: string, hash: string): boolean {
  return simpleHash(str) === hash
}
