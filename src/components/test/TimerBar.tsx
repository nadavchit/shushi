interface TimerBarProps {
  secondsLeft: number
  totalSeconds: number
}

export default function TimerBar({ secondsLeft, totalSeconds }: TimerBarProps) {
  const pct = totalSeconds > 0 ? Math.max(0, Math.min(100, (secondsLeft / totalSeconds) * 100)) : 0
  const urgent = pct <= 20
  const warning = pct <= 50 && !urgent

  const barColor = urgent
    ? "bg-red-500"
    : warning
      ? "bg-amber-500"
      : "bg-emerald-500"

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={`w-8 shrink-0 text-left text-sm tabular-nums ${
          urgent ? "font-semibold text-red-500" : "text-neutral-500 dark:text-neutral-400"
        }`}
      >
        {Math.ceil(secondsLeft)}
      </span>
    </div>
  )
}
