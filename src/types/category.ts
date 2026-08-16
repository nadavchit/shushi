import type { Question } from './question'

/** 'lomda' = taken from Nadav's original source material; 'generated' = written for extra practice. */
export type TestSource = 'lomda' | 'generated'

export interface FixedTest {
  id: string
  nameHe: string
  source: TestSource
  questions: Question[]
}

export interface TestCategory {
  id: string
  nameHe: string
  descriptionHe: string
  defaultPerQuestionSec: number
  tests: FixedTest[]
}

export type TimerScope = 'per-question' | 'whole-exam'
export type TestMode = 'timed' | 'practice'

export interface TestSettings {
  mode: TestMode
  timerScope?: TimerScope
  perQuestionSeconds?: number
  totalSeconds?: number
}
