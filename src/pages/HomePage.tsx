import { categoryRegistry } from "../data/categoryRegistry"
import CategoryCard from "../components/home/CategoryCard"

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">בחר קטגוריית תרגול</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">תרגול לקראת מבחני שחקים</p>

      <div className="mt-6 flex flex-col gap-4">
        {categoryRegistry.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
