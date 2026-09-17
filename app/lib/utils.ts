import { cn } from "cn"

export { cn }

export function inr(n: number, opts: { decimals?: number } = {}) {
  const d = opts.decimals ?? 0
  const [int, frac] = Math.abs(n).toFixed(d).split(".")
  const last3 = int.slice(-3)
  const rest = int.slice(0, -3)
  const grouped =
    (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "") + last3
  return `${n < 0 ? "−" : ""}₹${grouped}${frac ? "." + frac : ""}`
}

export function pct(n: number) {
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(2)}%`
}
