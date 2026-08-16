interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
        <span>
          שאלה {current} מתוך {total}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all duration-300 ease-out dark:bg-white"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
