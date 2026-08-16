import { useMemo } from "react"
import { loadHistory } from "../lib/storage"
import { categoryRegistry, getCategory, getTest } from "../data/categoryRegistry"
import type { Attempt } from "../types/history"
import CategoryStats from "../components/history/CategoryStats"
import HistoryList from "../components/history/HistoryList"

function categoryNameOf(categoryId: string): string {
  return getCategory(categoryId)?.nameHe ?? categoryId
}

function testNameOf(categoryId: string, testId: string): string {
  return getTest(categoryId, testId)?.nameHe ?? testId
}

export default function HistoryPage() {
  const history = useMemo(() => loadHistory(), [])

  const attemptsByCategory = useMemo(() => {
    const map = new Map<string, Attempt[]>()
    for (const attempt of history) {
      const list = map.get(attempt.categoryId) ?? []
      list.push(attempt)
      map.set(attempt.categoryId, list)
    }
    return map
  }, [history])

  if (history.length === 0) {
    return (
      <div className="text-center text-neutral-500 dark:text-neutral-400">
        <p>עדיין אין היסטוריית תרגול.</p>
        <p className="mt-1 text-sm">התוצאות שלכם יופיעו כאן אחרי המבחן הראשון.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-4 text-xl font-bold">סטטיסטיקה לפי קטגוריה</h1>
        <div className="flex flex-col gap-4">
          {categoryRegistry
            .filter((c) => attemptsByCategory.has(c.id))
            .map((c) => (
              <CategoryStats key={c.id} categoryNameHe={c.nameHe} attempts={attemptsByCategory.get(c.id)!} />
            ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">ניסיונות אחרונים</h2>
        <HistoryList attempts={history} categoryNameOf={categoryNameOf} testNameOf={testNameOf} />
      </div>
    </div>
  )
}
