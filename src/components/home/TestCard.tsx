import { Link } from "react-router-dom"
import type { FixedTest } from "../../types/category"
import type { TestStats } from "../../lib/stats"
import Card from "../ui/Card"
import SourceBadge from "../ui/SourceBadge"

interface TestCardProps {
  categoryId: string
  test: FixedTest
  stats?: TestStats
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit" })
}

export default function TestCard({ categoryId, test, stats }: TestCardProps) {
  return (
    <Link
      to={`/test/${categoryId}/${test.id}`}
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
    >
      <Card className="transition hover:border-neutral-300 hover:shadow-md active:scale-[0.99] dark:hover:border-neutral-700">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{test.nameHe}</h2>
              <SourceBadge source={test.source} />
            </div>
            <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
              {test.questions.length} שאלות
            </p>
            {stats ? (
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                {stats.attemptCount} ניסיונות · שיא {Math.round(stats.bestPct)}% · אחרון{" "}
                {formatDate(stats.lastAttemptISO)}
              </p>
            ) : (
              <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">טרם נוסה</p>
            )}
          </div>
          <span className="shrink-0 text-2xl text-neutral-300 dark:text-neutral-600" aria-hidden>
            ‹
          </span>
        </div>
      </Card>
    </Link>
  )
}
