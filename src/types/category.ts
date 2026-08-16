import type { Question } from './question'

export interface TestCategory {
  id: string
  nameHe: string
  descriptionHe: string
  defaultPerQuestionSec: number
  questions: Question[]
}

export type TimerScope = 'per-question' | 'whole-exam'
export type TestMode = 'timed' | 'practice'

export interface TestSettings {
  questionCount: number
  mode: TestMode
  timerScope?: TimerScope
  perQuestionSeconds?: number
  totalSeconds?: number
}
