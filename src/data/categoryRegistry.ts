import type { TestCategory } from "../types/category"
import { generalKnowledgeQuestions } from "./categories/generalKnowledge"
import { remoteAssociationsQuestions } from "./categories/remoteAssociations"

export const categoryRegistry: TestCategory[] = [
  {
    id: "general-knowledge",
    nameHe: "ידע כללי",
    descriptionHe: "שאלות רב-ברירה במגוון תחומים: היסטוריה, גיאוגרפיה, תרבות ועוד.",
    defaultPerQuestionSec: 20,
    questions: generalKnowledgeQuestions,
  },
  {
    id: "remote-associations",
    nameHe: "הקשרים רחוקים",
    descriptionHe: "שלוש מילים, מילה אחת מקשרת ביניהן. מצאו אותה.",
    defaultPerQuestionSec: 30,
    questions: remoteAssociationsQuestions,
  },
]

export function getCategory(id: string): TestCategory | undefined {
  return categoryRegistry.find((c) => c.id === id)
}
