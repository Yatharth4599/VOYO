export function getAnonymousUserId(): string {
  const KEY = 'anonUserId'
  let anonId = localStorage.getItem(KEY)

  if (!anonId) {
    anonId = crypto.randomUUID()
    localStorage.setItem(KEY, anonId)
  }

  return anonId
}
