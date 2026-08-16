import type { Question } from '../types/question'
import type { AnswerRecord, Attempt } from '../types/history'
import type { TestMode, TimerScope } from '../types/category'

function normalize(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

export function isCorrectAnswer(question: Question, userAnswer: string | null): boolean {
  if (userAnswer === null) return false
  if (question.type === 'multiple-choice') {
    return userAnswer === question.options[question.correctIndex]
  }
  const given = normalize(userAnswer)
  const accepted = [question.answer, ...(question.acceptableAnswers ?? [])].map(normalize)
  return accepted.includes(given)
}

export function gradeAnswer(
  question: Question,
  userAnswer: string | null,
  timedOut: boolean,
): AnswerRecord {
  return {
    questionId: question.id,
    userAnswer,
    correct: isCorrectAnswer(question, userAnswer),
    timedOut,
  }
}

export function buildAttempt(params: {
  categoryId: string
  testId: string
  mode: TestMode
  timerScope?: TimerScope
  durationSeconds: number
  answers: AnswerRecord[]
}): Attempt {
  const { categoryId, testId, mode, timerScope, durationSeconds, answers } = params
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    categoryId,
    testId,
    dateISO: new Date().toISOString(),
    mode,
    timerScope,
    totalQuestions: answers.length,
    correctCount: answers.filter((a) => a.correct).length,
    durationSeconds,
    answers,
  }
}
