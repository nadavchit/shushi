import type { Attempt } from "../../types/history"
import Card from "../ui/Card"

interface CategoryStatsProps {
  categoryNameHe: string
  attempts: Attempt[]
}

function pctOf(attempt: Attempt): number {
  return attempt.totalQuestions > 0 ? (attempt.correctCount / attempt.totalQuestions) * 100 : 0
}

export default function CategoryStats({ categoryNameHe, attempts }: CategoryStatsProps) {
  const percentages = attempts.map(pctOf)
  const best = Math.round(Math.max(...percentages))
  const avg = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length)

  return (
    <Card>
      <h3 className="font-semibold">{categoryNameHe}</h3>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-2xl font-bold tabular-nums">{attempts.length}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">ניסיונות</p>
        </div>
        <div>
          <p className="text-2xl font-bold tabular-nums">{avg}%</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">ממוצע</p>
        </div>
        <div>
          <p className="text-2xl font-bold tabular-nums">{best}%</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">שיא</p>
        </div>
      </div>
    </Card>
  )
}
