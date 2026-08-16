import type { Attempt } from "../types/history"

export interface TestStats {
  attemptCount: number
  bestPct: number
  lastAttemptISO: string
}

function pctOf(attempt: Attempt): number {
  return attempt.totalQuestions > 0 ? (attempt.correctCount / attempt.totalQuestions) * 100 : 0
}

export function statsByTest(attempts: Attempt[]): Map<string, TestStats> {
  const map = new Map<string, TestStats>()
  for (const attempt of attempts) {
    const existing = map.get(attempt.testId)
    const pct = pctOf(attempt)
    if (!existing) {
      map.set(attempt.testId, {
        attemptCount: 1,
        bestPct: pct,
        lastAttemptISO: attempt.dateISO,
      })
    } else {
      existing.attemptCount += 1
      existing.bestPct = Math.max(existing.bestPct, pct)
      if (attempt.dateISO > existing.lastAttemptISO) existing.lastAttemptISO = attempt.dateISO
    }
  }
  return map
}
