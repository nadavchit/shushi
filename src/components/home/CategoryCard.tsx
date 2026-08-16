import { Link } from "react-router-dom"
import type { TestCategory } from "../../types/category"
import Card from "../ui/Card"

interface CategoryCardProps {
  category: TestCategory
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const questionCount = category.tests.reduce((sum, t) => sum + t.questions.length, 0)

  return (
    <Link
      to={`/category/${category.id}`}
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
    >
      <Card className="transition-all duration-300 hover:border-violet-300/60 hover:shadow-[0_0_28px_-8px_rgba(124,58,237,0.35)] active:scale-[0.99] dark:hover:border-cyan-400/40 dark:hover:shadow-[0_0_28px_-8px_rgba(34,211,238,0.3)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{category.nameHe}</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{category.descriptionHe}</p>
            <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
              {category.tests.length} מבחנים · {questionCount} שאלות
            </p>
          </div>
          <span className="shrink-0 text-2xl text-neutral-300 dark:text-neutral-600" aria-hidden>
            ‹
          </span>
        </div>
      </Card>
    </Link>
  )
}
