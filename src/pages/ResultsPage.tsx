import { useLocation, useNavigate } from "react-router-dom"
import type { Attempt } from "../types/history"
import type { Question } from "../types/question"
import { getCategory } from "../data/categoryRegistry"
import Button from "../components/ui/Button"
import ResultsSummary from "../components/results/ResultsSummary"
import AnswerReview from "../components/results/AnswerReview"

interface ResultsLocationState {
  attempt: Attempt
  questions: Question[]
}

export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultsLocationState | null

  if (!state) {
    return (
      <div className="text-center">
        <p className="text-neutral-500 dark:text-neutral-400">לא נמצאו תוצאות להצגה.</p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          לדף הבית
        </Button>
      </div>
    )
  }

  const { attempt, questions } = state
  const category = getCategory(attempt.categoryId)

  return (
    <div className="flex flex-col gap-6">
      <ResultsSummary attempt={attempt} categoryNameHe={category?.nameHe ?? attempt.categoryId} />

      <div className="flex gap-3">
        <Button className="flex-1" onClick={() => navigate(`/test/${attempt.categoryId}`)}>
          נסה שוב
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => navigate("/")}>
          לדף הבית
        </Button>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">סקירת תשובות</h2>
        <AnswerReview questions={questions} answers={attempt.answers} />
      </div>
    </div>
  )
}
