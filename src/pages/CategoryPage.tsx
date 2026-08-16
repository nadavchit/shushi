import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategory } from "../data/categoryRegistry"
import { loadHistory } from "../lib/storage"
import { statsByTest } from "../lib/stats"
import TestCard from "../components/home/TestCard"
import Button from "../components/ui/Button"

export default function CategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const category = categoryId ? getCategory(categoryId) : undefined

  const stats = useMemo(() => {
    const relevant = loadHistory().filter((a) => a.categoryId === categoryId)
    return statsByTest(relevant)
  }, [categoryId])

  if (!category) {
    return (
      <div className="text-center">
        <p className="text-neutral-500 dark:text-neutral-400">קטגוריה לא נמצאה.</p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          לדף הבית
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{category.nameHe}</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">{category.descriptionHe}</p>

      <div className="mt-6 flex flex-col gap-3">
        {category.tests.map((test) => (
          <TestCard key={test.id} categoryId={category.id} test={test} stats={stats.get(test.id)} />
        ))}
      </div>
    </div>
  )
}
