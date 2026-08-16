import type { HTMLAttributes } from "react"

export default function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900 ${className}`}
      {...props}
    />
  )
}
