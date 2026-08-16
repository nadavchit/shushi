import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategory } from "../data/categoryRegistry"
import type { TestSettings } from "../types/category"
import type { Question } from "../types/question"
import type { AnswerRecord } from "../types/history"
import { prepareSessionQuestions } from "../lib/session"
import { gradeAnswer, buildAttempt } from "../lib/scoring"
import { saveAttempt } from "../lib/storage"
import { useCountdown } from "../hooks/useCountdown"
import TestSettingsPanel from "../components/test/TestSettingsPanel"
import QuestionRenderer from "../components/test/QuestionRenderer"
import ProgressBar from "../components/test/ProgressBar"
import TimerBar from "../components/test/TimerBar"
import ExplanationCard from "../components/test/ExplanationCard"
import Button from "../components/ui/Button"

type Phase = "settings" | "active"

export default function TestSessionPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const category = categoryId ? getCategory(categoryId) : undefined

  const [phase, setPhase] = useState<Phase>("settings")
  const [settings, setSettings] = useState<TestSettings | null>(null)
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [revealed, setRevealed] = useState(false)
  const [currentAnswerText, setCurrentAnswerText] = useState<string | null>(null)
  const startTimeRef = useRef(0)

  const currentQuestion = sessionQuestions[index]

  function finish(finalAnswers: AnswerRecord[]) {
    let complete = finalAnswers
    if (complete.length < sessionQuestions.length) {
      const missing = sessionQuestions.slice(complete.length).map((q) => gradeAnswer(q, null, true))
      complete = [...complete, ...missing]
    }
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)
    const attempt = buildAttempt({
      categoryId: category!.id,
      mode: settings!.mode,
      timerScope: settings!.timerScope,
      durationSeconds,
      answers: complete,
    })
    saveAttempt(attempt)
    navigate("/results", { state: { attempt, questions: sessionQuestions } })
  }

  function advance(answersSoFar: AnswerRecord[]) {
    if (index + 1 >= sessionQuestions.length) {
      finish(answersSoFar)
    } else {
      setIndex((i) => i + 1)
      setRevealed(false)
      setCurrentAnswerText(null)
    }
  }

  function commitAnswer(answerText: string | null, timedOut: boolean) {
    if (!currentQuestion || !settings) return
    const record = gradeAnswer(currentQuestion, answerText, timedOut)
    const nextAnswers = [...answers, record]
    setAnswers(nextAnswers)

    if (settings.mode === "practice") {
      setCurrentAnswerText(answerText)
      setRevealed(true)
    } else {
      advance(nextAnswers)
    }
  }

  const perQuestionActive = phase === "active" && settings?.mode === "timed" && settings.timerScope === "per-question"
  const wholeExamActive = phase === "active" && settings?.mode === "timed" && settings.timerScope === "whole-exam"

  const perQuestionSecondsLeft = useCountdown({
    durationSeconds: settings?.perQuestionSeconds ?? 20,
    onExpire: () => commitAnswer(null, true),
    resetKey: index,
    active: perQuestionActive,
  })

  const wholeExamSecondsLeft = useCountdown({
    durationSeconds: settings?.totalSeconds ?? 600,
    onExpire: () => finish(answers),
    resetKey: phase,
    active: wholeExamActive,
  })

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

  function handleStart(s: TestSettings) {
    const qs = prepareSessionQuestions(category!.questions, s.questionCount)
    setSettings(s)
    setSessionQuestions(qs)
    setIndex(0)
    setAnswers([])
    setRevealed(false)
    setCurrentAnswerText(null)
    startTimeRef.current = Date.now()
    setPhase("active")
  }

  if (phase === "settings" || !currentQuestion || !settings) {
    return <TestSettingsPanel category={category} onStart={handleStart} />
  }

  const isLast = index === sessionQuestions.length - 1

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar current={index + 1} total={sessionQuestions.length} />

      {settings.mode === "timed" && settings.timerScope === "per-question" && (
        <TimerBar secondsLeft={perQuestionSecondsLeft} totalSeconds={settings.perQuestionSeconds ?? 20} />
      )}
      {settings.mode === "timed" && settings.timerScope === "whole-exam" && (
        <TimerBar secondsLeft={wholeExamSecondsLeft} totalSeconds={settings.totalSeconds ?? 600} />
      )}

      <QuestionRenderer
        key={currentQuestion.id}
        question={currentQuestion}
        revealed={revealed}
        userAnswer={currentAnswerText}
        onAnswer={(text) => commitAnswer(text, false)}
        disabled={revealed}
      />

      {revealed && (
        <>
          <ExplanationCard text={currentQuestion.explanation} />
          <Button onClick={() => advance(answers)} className="w-full">
            {isLast ? "סיום וצפייה בתוצאות" : "הבא"}
          </Button>
        </>
      )}
    </div>
  )
}
