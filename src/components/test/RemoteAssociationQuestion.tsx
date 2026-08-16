import { useState } from "react"
import type { RATQuestion } from "../../types/question"
import { isCorrectAnswer } from "../../lib/scoring"
import Button from "../ui/Button"

interface RemoteAssociationQuestionProps {
  question: RATQuestion
  revealed: boolean
  userAnswer: string | null
  onAnswer: (text: string) => void
  disabled: boolean
}

export default function RemoteAssociationQuestion({
  question,
  revealed,
  userAnswer,
  onAnswer,
  disabled,
}: RemoteAssociationQuestionProps) {
  const [value, setValue] = useState("")

  function submit() {
    const trimmed = value.trim()
    if (disabled || !trimmed) return
    onAnswer(trimmed)
  }

  const wasCorrect = revealed && userAnswer !== null && isCorrectAnswer(question, userAnswer)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap justify-center gap-3">
        {question.words.map((w) => (
          <span
            key={w}
            className="rounded-xl bg-neutral-100 px-4 py-2 text-lg font-medium dark:bg-neutral-800"
          >
            {w}
          </span>
        ))}
      </div>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">מהי המילה המקשרת?</p>

      {!revealed ? (
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit()
            }}
            disabled={disabled}
            placeholder="הקלידו את המילה..."
            className="flex-1 rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-lg outline-none focus:border-neutral-400 dark:border-neutral-800 dark:focus:border-neutral-600"
          />
          <Button onClick={submit} disabled={disabled || !value.trim()}>
            אישור
          </Button>
        </div>
      ) : (
        <div
          className={`rounded-xl border px-4 py-3 text-center ${
            wasCorrect
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
              : "border-red-500 bg-red-50 dark:bg-red-500/10"
          }`}
        >
          {userAnswer && (
            <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">התשובה שלך: {userAnswer}</p>
          )}
          <p className="text-lg font-medium">התשובה הנכונה: {question.answer}</p>
        </div>
      )}
    </div>
  )
}
