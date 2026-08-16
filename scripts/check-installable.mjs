import { chromium } from "playwright"

const URL = process.env.URL ?? "https://shushi-psi.vercel.app"
const browser = await chromium.launch()
const page = await browser.newPage()

await page.goto(URL, { waitUntil: "networkidle" })

// Wait for the service worker to reach "activated" rather than sampling once.
const swState = await page.evaluate(async () => {
  const reg = await navigator.serviceWorker.ready.catch(() => null)
  if (!reg) return { ready: false }
  // "activating" -> "activated" is asynchronous; poll until it settles.
  const deadline = Date.now() + 15000
  while (reg.active?.state !== "activated" && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 250))
  }
  return {
    ready: true,
    active: reg.active?.state,
    installing: reg.installing?.state ?? null,
    waiting: reg.waiting?.state ?? null,
    scope: reg.scope,
  }
})

const manifest = await page.evaluate(async () => {
  const res = await fetch("/manifest.webmanifest")
  const m = await res.json()
  return {
    name: m.name,
    display: m.display,
    startUrl: m.start_url,
    sizes: (m.icons ?? []).map((i) => i.sizes),
    maskable: (m.icons ?? []).some((i) => i.purpose === "maskable"),
  }
})

const cached = await page.evaluate(async () => {
  const names = await caches.keys()
  let total = 0
  for (const n of names) total += (await (await caches.open(n)).keys()).length
  return { cacheNames: names, entries: total }
})

console.log("service worker:", JSON.stringify(swState, null, 2))
console.log("manifest:", JSON.stringify(manifest, null, 2))
console.log("caches:", JSON.stringify(cached, null, 2))

const ok =
  swState.active === "activated" &&
  manifest.display === "standalone" &&
  manifest.sizes.includes("192x192") &&
  manifest.sizes.includes("512x512")
console.log(ok ? "\nINSTALLABLE: all Chrome/Android criteria met" : "\nNOT INSTALLABLE")
await browser.close()
