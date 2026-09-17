"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { usePersona, useStore } from "@/lib/store"
import { cn, inr } from "@/lib/utils"
import type React from "react"

const tint = { lime: "bg-lime", sand: "bg-sand", lilac: "bg-lilac" }

export default function Multiverse() {
  const [picked, setPicked] = useState("A")
  const p = usePersona()
  const { setPendingInvest, profile } = useStore()
  const router = useRouter()

  const corpus = Math.round((p.planAmount * 42) / 1000) * 1000
  const futures = [
    {
      id: "A",
      title: `Invest ${inr(p.planAmount)}/mo, skip nothing.`,
      amount: `${inr(corpus)} by 2029`,
      detail: `${p.goalDelta} · buffer intact`,
      tone: "lime" as const,
      featured: true,
    },
    {
      id: "B",
      title: "Career break, 4 months",
      amount: `${inr(Math.round(corpus * 0.65))} · goal delayed`,
      detail: "Buffer covers the gap. Goal moves 5 months right.",
      tone: "sand" as const,
      featured: false,
    },
    {
      id: "C",
      title: "Income dip, −30% earnings",
      amount: "Buffer holds 6 months",
      detail: "Autopilot pauses at ₹0 income. SIP resumes on recovery.",
      tone: "lilac" as const,
      featured: false,
    },
  ]

  const build = () => {
    setPendingInvest({
      amount: p.planAmount,
      product: "Nifty 50 index fund",
      goal: profile.firstGoal || "New laptop",
      future: picked,
    })
    router.push("/autopilot")
  }

  return (
    <Screen>
      <ScreenHeader title="Money Multiverse" action="sparkles" actionLabel="Ask Wise" actionHref="/wise" />
      <div className="flex min-h-full flex-col px-5 pb-8">
        <p className="rise mt-2 text-sm text-muted-foreground" style={{ "--i": 0 } as React.CSSProperties}>
          Same you. Different futures. Pick one to live in.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {futures.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setPicked(f.id)}
              aria-pressed={picked === f.id}
              className={cn(
                "press rise rounded-3xl border-2 p-5 text-left transition-all",
                tint[f.tone],
                f.featured && "min-h-44",
                picked === f.id ? "border-ink" : "border-transparent"
              )}
              style={{ "--i": 1 + i } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-paper">
                  Future {f.id}
                </span>
                <Icon name={f.featured ? "rocket" : "chart"} size={20} className="text-ink" />
              </div>
              <h2
                className={cn(
                  "mt-3 font-heading font-extrabold leading-tight tracking-tight text-ink",
                  f.featured ? "text-2xl" : "text-lg"
                )}
              >
                {f.title}
              </h2>
              <p className="tabular mt-1.5 text-sm font-bold text-ink/80">
                {f.amount}
              </p>
              <p className="mt-1 text-xs text-ink/60">{f.detail}</p>
            </button>
          ))}
        </div>

        <p className="rise mt-4 text-[11px] leading-relaxed text-muted-foreground" style={{ "--i": 4 } as React.CSSProperties}>
          Ranges, not promises — sized from your {inr(p.safeToInvest)} monthly
          surplus. Assumptions inside each future.
        </p>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={build}
            className="press flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink font-heading text-base font-bold text-paper"
          >
            Build my plan on Future {picked}
            <Icon name="next" size={18} />
          </button>
        </div>
      </div>
    </Screen>
  )
}
