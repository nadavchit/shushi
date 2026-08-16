import type { Attempt } from "../../types/history"
import Card from "../ui/Card"

interface ResultsSummaryProps {
  attempt: Attempt
  categoryNameHe: string
}

export default function ResultsSummary({ attempt, categoryNameHe }: ResultsSummaryProps) {
  const pct = attempt.totalQuestions > 0 ? Math.round((attempt.correctCount / attempt.totalQuestions) * 100) : 0
  const minutes = Math.floor(attempt.durationSeconds / 60)
  const seconds = attempt.durationSeconds % 60

  return (
    <Card className="text-center">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{categoryNameHe}</p>
      <p className="mt-2 text-5xl font-bold tabular-nums">{pct}%</p>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">
        {attempt.correctCount} מתוך {attempt.totalQuestions} נכונות
      </p>
      <p className="mt-3 text-sm text-neutral-400 dark:text-neutral-500">
        זמן כולל: {minutes}:{seconds.toString().padStart(2, "0")} ·{" "}
        {attempt.mode === "timed" ? "מצב מתוזמן" : "תרגול חופשי"}
      </p>
    </Card>
  )
}
