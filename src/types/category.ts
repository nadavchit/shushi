import type { Question } from './question'

export interface FixedTest {
  id: string
  nameHe: string
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
