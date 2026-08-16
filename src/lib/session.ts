import type { MCQuestion, Question } from "../types/question"
import { shuffle } from "./shuffle"

function shuffleMCOptions(question: MCQuestion): MCQuestion {
  const correctText = question.options[question.correctIndex]
  const options = shuffle(question.options)
  return { ...question, options, correctIndex: options.indexOf(correctText) }
}

export function prepareSessionQuestions(questions: Question[]): Question[] {
  return questions.map((q) => (q.type === "multiple-choice" ? shuffleMCOptions(q) : q))
}
