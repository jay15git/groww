"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { promptfolio } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import type React from "react"

const suggestions = [
  "Indian consumer growth, no tobacco, medium risk, ₹1,000/mo",
  "Tech + AI in India, aggressive, ₹2,500/mo",
  "Safe as possible — better than FD, ₹500/mo",
]

export default function Promptfolio() {
  const [text, setText] = useState("")
  const [state, setState] = useState<"idle" | "thinking" | "done">("idle")
  const { setPendingInvest, profile } = useStore()

  const build = (t: string) => {
    setText(t)
    setState("thinking")
    setTimeout(() => setState("done"), 1400)
  }

  return (
    <Screen>
      <ScreenHeader
        title="Promptfolio"
        right={
          <span className="flex h-10 items-center gap-1.5 rounded-full bg-lime px-3.5 font-heading text-xs font-bold text-ink">
            <Icon name="sparkles" size={14} /> Wise
          </span>
        }
      />
      <div className="flex min-h-full flex-col px-5 pb-8">
        <p className="rise mt-2 text-sm text-muted-foreground" style={{ "--i": 0 } as React.CSSProperties}>
          Describe an investing idea in plain words. Wise drafts a basket —
          you inspect it before anything moves.
        </p>

        <form
          className="rise mt-4"
          style={{ "--i": 1 } as React.CSSProperties}
          onSubmit={(e) => {
            e.preventDefault()
            if (text.trim()) build(text)
          }}
        >
          <div className="flex items-start gap-2 rounded-2xl bg-paper p-4 shadow-sm">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Indian consumer growth, avoid tobacco, medium risk…"
              aria-label="Describe your investment idea"
              rows={3}
              className="min-w-0 flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => build(s)}
                className="press shrink-0 rounded-full border border-line/60 bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink"
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={!text.trim() || state === "thinking"}
            className={cn(
              "press mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full font-heading text-sm font-bold",
              text.trim() ? "bg-ink text-lime" : "bg-ink/10 text-muted-foreground"
            )}
          >
            <Icon name="sparkles" size={16} /> Build basket
          </button>
        </form>

        {state === "thinking" && (
          <div className="mt-6 flex items-center gap-2.5 rounded-2xl bg-paper p-4">
            <span className="flex size-7 items-center justify-center rounded-full bg-lime text-ink">
              <Icon name="sparkles" size={14} />
            </span>
            <p className="shimmer text-sm font-semibold">
              Reading the idea · screening exclusions · weighting…
            </p>
          </div>
        )}

        {state === "done" && (
          <>
            <section className="rise mt-5 rounded-3xl bg-paper p-5 shadow-sm" style={{ "--i": 0 } as React.CSSProperties}>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Wise read your idea as
              </p>
              <p className="mt-1.5 font-heading text-base font-bold leading-snug">
                {promptfolio.interpretation}
              </p>

              <div className="mt-4 flex flex-col divide-y divide-line/60">
                {promptfolio.holdings.map((h) => (
                  <div key={h.ticker} className="flex items-center gap-3 py-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-ink font-heading text-xs font-bold text-lime">
                      {h.ticker}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold">{h.name}</span>
                      <span className="block text-xs text-muted-foreground">{h.why}</span>
                    </span>
                    <span className="tabular font-heading text-sm font-extrabold">
                      {h.weight}%
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className="rise mt-3 flex flex-col gap-2.5" style={{ "--i": 1 } as React.CSSProperties}>
              {([
                { label: "Risk", text: promptfolio.risk, icon: "chart" },
                { label: "Stress test", text: promptfolio.stress, icon: "down2" },
                { label: "Exclusions", text: promptfolio.exclusions, icon: "shield" },
                { label: "Fees", text: promptfolio.fees, icon: "percent" },
                { label: "What breaks this", text: promptfolio.invalidators, icon: "warn" },
              ] as { label: string; text: string; icon: IconName }[]).map((r) => (
                <div key={r.label} className="flex items-start gap-3 rounded-2xl bg-paper p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-ink">
                    <Icon name={r.icon} size={15} />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold">{r.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="rise mt-3 text-[11px] leading-relaxed text-muted-foreground" style={{ "--i": 2 } as React.CSSProperties}>
              Mocked basket. Production version needs registered
              research/advisory controls — this shows the concept, not advice.
            </p>

            <div className="mt-auto flex gap-2.5 pt-5">
              <Link
                href="/reality-check"
                className="press flex h-13 flex-1 items-center justify-center rounded-full bg-muted font-heading text-sm font-bold text-ink"
              >
                Reality Check it
              </Link>
              <Link
                href="/receipt"
                onClick={() =>
                  setPendingInvest({
                    amount: 1000,
                    product: "Promptfolio basket",
                    goal: profile.firstGoal || "New laptop",
                  })
                }
                className="press flex h-13 flex-1 items-center justify-center rounded-full bg-ink font-heading text-sm font-bold text-paper"
              >
                Preview order
              </Link>
            </div>
          </>
        )}
      </div>
    </Screen>
  )
}
