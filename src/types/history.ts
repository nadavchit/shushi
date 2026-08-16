import type { TestMode, TimerScope } from './category'

export interface AnswerRecord {
  questionId: string
  userAnswer: string | null
  correct: boolean
  timedOut: boolean
}

export interface Attempt {
  id: string
  categoryId: string
  testId: string
  dateISO: string
  mode: TestMode
  timerScope?: TimerScope
  totalQuestions: number
  correctCount: number
  durationSeconds: number
  answers: AnswerRecord[]
}
