"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { cn, inr } from "@/lib/utils"
import type React from "react"

const chips = [1000, 2000, 5000, 10000]
const methods = [
  { icon: "upi" as const, label: "UPI · anaya@okhdfc", sub: "Instant · no fee", sel: true },
  { icon: "card" as const, label: "HDFC ··4521", sub: "Debit card", sel: false },
  { icon: "bank" as const, label: "Net banking", sub: "All major banks", sel: false },
]
const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"]

export default function AddMoney() {
  const [amt, setAmt] = useState("5000")
  const [method, setMethod] = useState(0)
  const router = useRouter()

  const tap = (k: string) => {
    if (k === "⌫") return setAmt((a) => a.slice(0, -1) || "0")
    if (k === "." && amt.includes(".")) return
    setAmt((a) => (a === "0" ? k : a + k).slice(0, 7))
  }

  return (
    <Screen>
      <ScreenHeader title="Add money" />
      <div className="flex min-h-full flex-col px-5 pb-6">
        <section className="rise mt-3 rounded-3xl bg-paper p-5 text-center" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Amount
          </p>
          <p className="tabular mt-1 font-heading text-[38px] font-extrabold tracking-tight">
            {inr(Number(amt) || 0)}
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAmt(String(c))}
                className={cn(
                  "press rounded-full px-3.5 py-1.5 text-xs font-bold",
                  Number(amt) === c ? "bg-ink text-lime" : "bg-muted text-ink"
                )}
              >
                ₹{c / 1000}k
              </button>
            ))}
          </div>
        </section>

        <p className="rise mt-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground" style={{ "--i": 1 } as React.CSSProperties}>
          Pay with
        </p>
        <div className="rise mt-2 flex flex-col gap-2" style={{ "--i": 2 } as React.CSSProperties}>
          {methods.map((m, i) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setMethod(i)}
              aria-pressed={method === i}
              className={cn(
                "press flex items-center gap-3.5 rounded-2xl border bg-paper p-4 text-left",
                method === i ? "border-ink shadow-[3px_3px_0_0_#101915]" : "border-transparent"
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <Icon name={m.icon === "upi" ? "phone" : m.icon} size={18} />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold">{m.label}</span>
                <span className="block text-xs text-muted-foreground">{m.sub}</span>
              </span>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border",
                  method === i ? "border-ink bg-ink text-lime" : "border-line"
                )}
              >
                {method === i && <Icon name="tick" size={11} />}
              </span>
            </button>
          ))}
        </div>

        <div className="rise mt-5 grid grid-cols-3 gap-1.5" style={{ "--i": 3 } as React.CSSProperties}>
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => tap(k)}
              className="press flex h-13 items-center justify-center rounded-2xl font-heading text-xl font-bold text-ink hover:bg-paper"
            >
              {k}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => router.push("/receipt")}
          className="press mt-4 flex h-14 w-full items-center justify-center rounded-full bg-ink font-heading text-base font-bold text-paper"
        >
          Add {inr(Number(amt) || 0)}
        </button>
      </div>
    </Screen>
  )
}
