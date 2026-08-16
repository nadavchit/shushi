import type { TestSource } from "../../types/category"

interface SourceBadgeProps {
  source: TestSource
}

const LABELS: Record<TestSource, string> = {
  lomda: "מהלומדה",
  generated: "נוצר אוטומטית",
}

const CLASSES: Record<TestSource, string> = {
  lomda: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  generated: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
}

export default function SourceBadge({ source }: SourceBadgeProps) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${CLASSES[source]}`}>
      {LABELS[source]}
    </span>
  )
}
