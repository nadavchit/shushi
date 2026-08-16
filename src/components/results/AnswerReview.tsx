import type { Question } from "../../types/question"
import type { AnswerRecord } from "../../types/history"
import Card from "../ui/Card"
import ExplanationCard from "../test/ExplanationCard"

interface AnswerReviewProps {
  questions: Question[]
  answers: AnswerRecord[]
}

export default function AnswerReview({ questions, answers }: AnswerReviewProps) {
  return (
    <div className="flex flex-col gap-3">
      {questions.map((q, i) => {
        const answer = answers[i]
        const correctText = q.type === "multiple-choice" ? q.options[q.correctIndex] : q.answer
        const promptText = q.type === "multiple-choice" ? q.prompt : q.words.join(" / ")
        const correct = answer?.correct ?? false

        return (
          <Card key={q.id} className={correct ? "border-emerald-500/30" : "border-red-500/30"}>
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium leading-relaxed">
                {i + 1}. {promptText}
              </p>
              <span className={`shrink-0 text-lg ${correct ? "text-emerald-500" : "text-red-500"}`} aria-hidden>
                {correct ? "✓" : "✗"}
              </span>
            </div>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              <p>
                התשובה שלך: {answer?.userAnswer ?? "לא נענתה"}
                {answer?.timedOut && !answer.userAnswer ? " (הזמן נגמר)" : ""}
              </p>
              {!correct && <p>התשובה הנכונה: {correctText}</p>}
            </div>
            <div className="mt-3">
              <ExplanationCard text={q.explanation} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
