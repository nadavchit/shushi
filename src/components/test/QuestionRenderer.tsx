import type { Question } from "../../types/question"
import MultipleChoiceQuestion from "./MultipleChoiceQuestion"
import RemoteAssociationQuestion from "./RemoteAssociationQuestion"

interface QuestionRendererProps {
  question: Question
  revealed: boolean
  userAnswer: string | null
  onAnswer: (text: string) => void
  disabled: boolean
}

export default function QuestionRenderer({ question, ...rest }: QuestionRendererProps) {
  if (question.type === "multiple-choice") {
    return <MultipleChoiceQuestion question={question} {...rest} />
  }
  return <RemoteAssociationQuestion question={question} {...rest} />
}
