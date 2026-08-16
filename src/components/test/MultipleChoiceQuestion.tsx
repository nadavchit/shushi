import type { MCQuestion } from "../../types/question"

interface MultipleChoiceQuestionProps {
  question: MCQuestion
  revealed: boolean
  userAnswer: string | null
  onAnswer: (text: string) => void
  disabled: boolean
}

const LETTERS = ["א", "ב", "ג", "ד", "ה"]

export default function MultipleChoiceQuestion({
  question,
  revealed,
  userAnswer,
  onAnswer,
  disabled,
}: MultipleChoiceQuestionProps) {
  const correctText = question.options[question.correctIndex]

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold leading-relaxed">{question.prompt}</h2>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => {
          const isCorrect = revealed && opt === correctText
          const isWrongSelected = revealed && userAnswer === opt && opt !== correctText
          return (
            <button
              key={opt}
              type="button"
              disabled={disabled}
              onClick={() => onAnswer(opt)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-default ${
                isCorrect
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                  : isWrongSelected
                    ? "border-red-500 bg-red-50 dark:bg-red-500/10"
                    : "border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                {LETTERS[i]}
              </span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
