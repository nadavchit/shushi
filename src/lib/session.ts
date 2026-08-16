import type { MCQuestion, Question } from "../types/question"
import { shuffle } from "./shuffle"

function shuffleMCOptions(question: MCQuestion): MCQuestion {
  const correctText = question.options[question.correctIndex]
  const options = shuffle(question.options)
  return { ...question, options, correctIndex: options.indexOf(correctText) }
}

export function prepareSessionQuestions(pool: Question[], count: number): Question[] {
  const picked = shuffle(pool).slice(0, count)
  return picked.map((q) => (q.type === "multiple-choice" ? shuffleMCOptions(q) : q))
}
