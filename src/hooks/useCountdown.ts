import { useEffect, useRef, useState } from "react"

interface UseCountdownOptions {
  durationSeconds: number
  onExpire: () => void
  resetKey: string | number
  active: boolean
}

export function useCountdown({ durationSeconds, onExpire, resetKey, active }: UseCountdownOptions): number {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    setSecondsLeft(durationSeconds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, durationSeconds])

  useEffect(() => {
    if (!active) return
    if (secondsLeft <= 0) {
      onExpireRef.current()
      return
    }
    const id = setTimeout(() => setSecondsLeft((s) => Math.max(0, s - 0.1)), 100)
    return () => clearTimeout(id)
  }, [secondsLeft, active])

  return secondsLeft
}
