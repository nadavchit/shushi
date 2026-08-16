export interface QuestionBase {
  id: string
  explanation: string
}

export interface MCQuestion extends QuestionBase {
  type: 'multiple-choice'
  prompt: string
  options: string[]
  correctIndex: number
}

export interface RATQuestion extends QuestionBase {
  type: 'remote-association'
  words: [string, string, string]
  answer: string
  acceptableAnswers?: string[]
}

export type Question = MCQuestion | RATQuestion
