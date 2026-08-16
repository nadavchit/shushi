import type { FixedTest, TestCategory } from "../types/category"
import type { Question } from "../types/question"
import { generalKnowledgeQuestions } from "./categories/generalKnowledge"
import { generalKnowledgeGenerated } from "./categories/generalKnowledgeGenerated"
import { remoteAssociationsQuestions } from "./categories/remoteAssociations"
import { remoteAssociationsGenerated } from "./categories/remoteAssociationsGenerated"

function buildTests(prefix: string, pool: Question[], perTest: number, startIndex = 1): FixedTest[] {
  const tests: FixedTest[] = []
  for (let i = 0; i < pool.length; i += perTest) {
    const number = startIndex + tests.length
    tests.push({
      id: `${prefix}-${number}`,
      nameHe: `מבחן ${number}`,
      source: "lomda",
      questions: pool.slice(i, i + perTest),
    })
  }
  return tests
}

const gkOriginalTests = buildTests("gk-test", generalKnowledgeQuestions, 19)
const gkGeneratedTests: FixedTest[] = generalKnowledgeGenerated.map((questions, i) => ({
  id: `gk-test-${gkOriginalTests.length + i + 1}`,
  nameHe: `מבחן ${gkOriginalTests.length + i + 1}`,
  source: "generated",
  questions,
}))

const ratOriginalTests = buildTests("rat-test", remoteAssociationsQuestions, 20)
const ratGeneratedTests: FixedTest[] = remoteAssociationsGenerated.map((questions, i) => ({
  id: `rat-test-${ratOriginalTests.length + i + 1}`,
  nameHe: `מבחן ${ratOriginalTests.length + i + 1}`,
  source: "generated",
  questions,
}))

export const categoryRegistry: TestCategory[] = [
  {
    id: "general-knowledge",
    nameHe: "ידע כללי",
    descriptionHe: "שאלות רב-ברירה במגוון תחומים: היסטוריה, גיאוגרפיה, תרבות ועוד.",
    defaultPerQuestionSec: 20,
    tests: [...gkOriginalTests, ...gkGeneratedTests],
  },
  {
    id: "remote-associations",
    nameHe: "הקשרים רחוקים",
    descriptionHe: "שלוש מילים, מילה אחת מקשרת ביניהן. מצאו אותה.",
    defaultPerQuestionSec: 30,
    tests: [...ratOriginalTests, ...ratGeneratedTests],
  },
]

export function getCategory(id: string): TestCategory | undefined {
  return categoryRegistry.find((c) => c.id === id)
}

export function getTest(categoryId: string, testId: string): FixedTest | undefined {
  return getCategory(categoryId)?.tests.find((t) => t.id === testId)
}
