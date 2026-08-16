import sharp from "sharp"
import { readFileSync } from "node:fs"

const icon = readFileSync(new URL("./icon.svg", import.meta.url))
const maskable = readFileSync(new URL("./icon-maskable.svg", import.meta.url))

await sharp(icon).resize(192, 192).png().toFile("public/icons/icon-192.png")
await sharp(icon).resize(512, 512).png().toFile("public/icons/icon-512.png")
await sharp(maskable).resize(512, 512).png().toFile("public/icons/icon-maskable-512.png")
await sharp(icon).resize(180, 180).png().toFile("public/icons/apple-touch-icon.png")
await sharp(icon).resize(32, 32).png().toFile("public/favicon.png")

console.log("Icons generated.")
