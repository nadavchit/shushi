interface TimerBarProps {
  secondsLeft: number
  totalSeconds: number
}

function format(seconds: number): string {
  const s = Math.max(0, Math.ceil(seconds))
  if (s < 60) return String(s)
  const m = Math.floor(s / 60)
  return `${m}:${(s % 60).toString().padStart(2, "0")}`
}

export default function TimerBar({ secondsLeft, totalSeconds }: TimerBarProps) {
  const pct = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0
  const urgent = pct <= 15
  const warning = pct <= 40 && !urgent

  const color = urgent
    ? "text-red-500"
    : warning
      ? "text-amber-500"
      : "text-neutral-400 dark:text-neutral-500"

  return (
    <div className="flex justify-center">
      <span className={`text-sm tabular-nums transition-colors ${color}`} aria-live="off">
        {format(secondsLeft)}
      </span>
    </div>
  )
}
