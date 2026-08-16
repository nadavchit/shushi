import { useState } from "react"
import type { TestCategory, TestMode, TestSettings, TimerScope } from "../../types/category"
import Button from "../ui/Button"
import Card from "../ui/Card"

interface TestSettingsPanelProps {
  category: TestCategory
  onStart: (settings: TestSettings) => void
}

const PER_QUESTION_OPTIONS = [15, 20, 30, 45, 60]
const TOTAL_MINUTE_OPTIONS = [5, 10, 15, 20, 30]

function OptionPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${
        active
          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      }`}
    >
      {children}
    </button>
  )
}

function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function nearestOption(options: number[], value: number): number {
  return options.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev))
}

export default function TestSettingsPanel({ category, onStart }: TestSettingsPanelProps) {
  const total = category.questions.length
  const countOptions = [10, 20, total].filter((n, i, arr) => n <= total && n > 0 && arr.indexOf(n) === i)

  const [mode, setMode] = useState<TestMode>("timed")
  const [timerScope, setTimerScope] = useState<TimerScope>("per-question")
  const [perQuestionSeconds, setPerQuestionSeconds] = useState(
    nearestOption(PER_QUESTION_OPTIONS, category.defaultPerQuestionSec),
  )
  const [questionCount, setQuestionCount] = useState(countOptions.includes(20) ? 20 : countOptions[0])
  const [totalMinutes, setTotalMinutes] = useState(
    nearestOption(TOTAL_MINUTE_OPTIONS, Math.round((category.defaultPerQuestionSec * questionCount) / 60)),
  )

  function handleStart() {
    onStart({
      questionCount,
      mode,
      timerScope: mode === "timed" ? timerScope : undefined,
      perQuestionSeconds: mode === "timed" && timerScope === "per-question" ? perQuestionSeconds : undefined,
      totalSeconds: mode === "timed" && timerScope === "whole-exam" ? totalMinutes * 60 : undefined,
    })
  }

  return (
    <Card className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">{category.nameHe}</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{category.descriptionHe}</p>
      </div>

      <SettingsRow label="מצב מבחן">
        <OptionPill active={mode === "timed"} onClick={() => setMode("timed")}>
          מתוזמן
        </OptionPill>
        <OptionPill active={mode === "practice"} onClick={() => setMode("practice")}>
          תרגול חופשי
        </OptionPill>
      </SettingsRow>

      {mode === "timed" && (
        <SettingsRow label="סוג הגבלת הזמן">
          <OptionPill active={timerScope === "per-question"} onClick={() => setTimerScope("per-question")}>
            לכל שאלה
          </OptionPill>
          <OptionPill active={timerScope === "whole-exam"} onClick={() => setTimerScope("whole-exam")}>
            לכל המבחן
          </OptionPill>
        </SettingsRow>
      )}

      {mode === "timed" && timerScope === "per-question" && (
        <SettingsRow label="זמן לשאלה">
          {PER_QUESTION_OPTIONS.map((sec) => (
            <OptionPill key={sec} active={perQuestionSeconds === sec} onClick={() => setPerQuestionSeconds(sec)}>
              {sec} שנ׳
            </OptionPill>
          ))}
        </SettingsRow>
      )}

      {mode === "timed" && timerScope === "whole-exam" && (
        <SettingsRow label="זמן כולל למבחן">
          {TOTAL_MINUTE_OPTIONS.map((min) => (
            <OptionPill key={min} active={totalMinutes === min} onClick={() => setTotalMinutes(min)}>
              {min} דק׳
            </OptionPill>
          ))}
        </SettingsRow>
      )}

      <SettingsRow label="מספר שאלות">
        {countOptions.map((n) => (
          <OptionPill key={n} active={questionCount === n} onClick={() => setQuestionCount(n)}>
            {n === total ? `הכל (${total})` : n}
          </OptionPill>
        ))}
      </SettingsRow>

      {mode === "practice" ? (
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          ללא הגבלת זמן — התשובה הנכונה וההסבר יוצגו מיד אחרי כל שאלה.
        </p>
      ) : (
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          התשובות וההסברים יוצגו רק בסיום המבחן, כמו במבחן אמיתי.
        </p>
      )}

      <Button onClick={handleStart} className="w-full">
        התחל מבחן
      </Button>
    </Card>
  )
}
