import type { Attempt } from '../types/history'

const HISTORY_KEY = 'shchakim:v1:history'

export function loadHistory(): Attempt[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveAttempt(attempt: Attempt): void {
  const history = loadHistory()
  history.unshift(attempt)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
