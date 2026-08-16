import { chromium } from "playwright"
import { mkdirSync } from "node:fs"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:5175"
const SHOT_DIR = "scripts/screenshots"
mkdirSync(SHOT_DIR, { recursive: true })

function assert(condition, message) {
  if (!condition) throw new Error(`ASSERTION FAILED: ${message}`)
  console.log(`  ok: ${message}`)
}

async function waitForText(page, text, message) {
  await page.getByText(text).first().waitFor({ state: "visible", timeout: 5000 })
  console.log(`  ok: ${message ?? `saw "${text}"`}`)
}

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
const page = await context.newPage()
page.on("pageerror", (err) => console.error("PAGE ERROR:", err))
page.on("console", (msg) => {
  if (msg.type() === "error") console.error("CONSOLE ERROR:", msg.text())
})

try {
  console.log("\n[1] Home page")
  await page.goto(BASE_URL)
  await waitForText(page, "ידע כללי", "General knowledge card visible")
  await waitForText(page, "הקשרים רחוקים", "Remote associations card visible")
  await assert((await page.getByRole("link", { name: "היסטוריה" }).count()) > 0, "History link visible on home")
  await page.screenshot({ path: `${SHOT_DIR}/01-home.png` })

  console.log("\n[2] General knowledge - timed per-question mode")
  await page.getByRole("link").filter({ hasText: "ידע כללי" }).click()
  await page.waitForURL(/\/test\/general-knowledge/)
  await waitForText(page, "סוג הגבלת הזמן", "timer scope row visible (timed is default)")
  await page.getByText("10", { exact: true }).click()
  await page.screenshot({ path: `${SHOT_DIR}/02-settings.png` })
  await page.getByRole("button", { name: "התחל מבחן" }).click()
  await waitForText(page, "שאלה 1 מתוך 10", "session started with 10 questions")

  const optionButtons = page.locator("main button").filter({ hasNotText: /^(הבא|אישור)$/ })
  const firstOptionText = (await optionButtons.first().textContent())?.trim()
  await optionButtons.first().click()
  await waitForText(page, "שאלה 2 מתוך 10", `timed mode advanced immediately after clicking "${firstOptionText}"`)
  await assert(
    (await page.locator("text=✓").count()) === 0 && (await page.locator("text=✗").count()) === 0,
    "no correctness reveal shown in timed mode",
  )
  await page.screenshot({ path: `${SHOT_DIR}/03-timed-question.png` })

  console.log("\n[3] Remote associations - practice mode with explanation reveal")
  await page.goto(`${BASE_URL}/test/remote-associations`)
  await page.getByRole("button", { name: "תרגול חופשי" }).click()
  await page.getByText("10", { exact: true }).click()
  await page.getByRole("button", { name: "התחל מבחן" }).click()
  await waitForText(page, "שאלה 1 מתוך 10", "RAT session started")

  const words = (await page.locator("main span").allTextContents()).filter((t) => t.trim())
  console.log(`  clue words: ${words.slice(0, 3).join(", ")}`)
  const input = page.getByPlaceholder("הקלידו את המילה...")
  await input.fill("תשובה שגויה")
  await input.press("Enter")
  await waitForText(page, "התשובה הנכונה", "correct answer revealed immediately")
  await assert((await page.locator(".animate-fade-in-up").count()) > 0, "explanation card shown")
  await page.screenshot({ path: `${SHOT_DIR}/04-practice-reveal.png` })
  await page.getByRole("button", { name: "הבא" }).click()
  await waitForText(page, "שאלה 2 מתוך 10", "advanced after clicking next")

  console.log("\n[4] Finish RAT practice session -> results page")
  for (let i = 0; i < 9; i++) {
    await page.getByPlaceholder("הקלידו את המילה...").fill("x")
    await page.getByPlaceholder("הקלידו את המילה...").press("Enter")
    await page.getByRole("button", { name: /הבא|סיום/ }).click()
  }
  await page.waitForURL(/\/results/, { timeout: 5000 })
  assert(true, "navigated to /results after finishing all questions")
  await waitForText(page, "מתוך 10 נכונות", "results summary shows score out of 10")
  await waitForText(page, "סקירת תשובות", "answer review section present")
  await page.screenshot({ path: `${SHOT_DIR}/05-results.png`, fullPage: true })

  console.log("\n[5] History page reflects saved attempt")
  await page.getByRole("link", { name: "היסטוריה" }).click()
  await page.waitForURL(/\/history/)
  await waitForText(page, "הקשרים רחוקים", "category appears in history")
  await waitForText(page, "ניסיונות אחרונים", "recent attempts section present")
  await page.screenshot({ path: `${SHOT_DIR}/06-history.png` })

  console.log("\n[6] Whole-exam timer option")
  await page.goto(`${BASE_URL}/test/general-knowledge`)
  await page.getByRole("button", { name: "לכל המבחן" }).click()
  await waitForText(page, "זמן כולל למבחן", "total-minutes picker shown for whole-exam scope")
  await page.screenshot({ path: `${SHOT_DIR}/07-whole-exam-settings.png` })

  console.log("\nAll smoke tests passed.\n")
} catch (err) {
  await page.screenshot({ path: `${SHOT_DIR}/FAILURE.png` })
  console.error("\nSMOKE TEST FAILED:", err.message, "\n")
  process.exitCode = 1
} finally {
  await browser.close()
}
