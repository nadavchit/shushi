import type { Attempt } from "../../types/history"
import Card from "../ui/Card"

interface HistoryListProps {
  attempts: Attempt[]
  categoryNameOf: (categoryId: string) => string
  testNameOf: (categoryId: string, testId: string) => string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function HistoryList({ attempts, categoryNameOf, testNameOf }: HistoryListProps) {
  return (
    <div className="flex flex-col gap-2">
      {attempts.map((attempt) => {
        const pct =
          attempt.totalQuestions > 0 ? Math.round((attempt.correctCount / attempt.totalQuestions) * 100) : 0
        return (
          <Card key={attempt.id} className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">
                {categoryNameOf(attempt.categoryId)} · {testNameOf(attempt.categoryId, attempt.testId)}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {formatDate(attempt.dateISO)} · {attempt.mode === "timed" ? "מתוזמן" : "תרגול חופשי"}
              </p>
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold tabular-nums">{pct}%</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {attempt.correctCount}/{attempt.totalQuestions}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
