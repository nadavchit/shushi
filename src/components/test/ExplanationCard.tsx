interface ExplanationCardProps {
  text: string
}

export default function ExplanationCard({ text }: ExplanationCardProps) {
  return (
    <div className="animate-fade-in-up flex gap-3 rounded-xl border-s-4 border-s-neutral-300 bg-neutral-50 px-4 py-3 text-sm leading-relaxed text-neutral-600 dark:border-s-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
      <span className="mt-0.5 shrink-0 text-neutral-400 dark:text-neutral-500" aria-hidden>
        ⓘ
      </span>
      <p>{text}</p>
    </div>
  )
}
