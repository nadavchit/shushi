import { Link } from "react-router-dom"
import type { TestCategory } from "../../types/category"
import Card from "../ui/Card"

interface CategoryCardProps {
  category: TestCategory
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/test/${category.id}`}
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
    >
      <Card className="transition hover:border-neutral-300 hover:shadow-md active:scale-[0.99] dark:hover:border-neutral-700">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{category.nameHe}</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{category.descriptionHe}</p>
            <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
              {category.questions.length} שאלות זמינות
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
