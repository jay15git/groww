"use client"

import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { trailSteps } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn, inr } from "@/lib/utils"
import type React from "react"

export default function Trail() {
  const { invested, investedAmount, pendingInvest, trailStep, setTrailStep } = useStore()
  const product = pendingInvest?.product ?? "Nifty 50 index fund"
  const amount = investedAmount || pendingInvest?.amount || 3000
  const steps = trailSteps.map((s, i) => ({
    ...s,
    state: !invested
      ? ("pending" as const)
      : i < trailStep
        ? ("done" as const)
        : i === trailStep
          ? ("active" as const)
          : ("pending" as const),
  }))

  return (
    <Screen nav>
      <ScreenHeader
        title="Money Trail"
        action="refresh"
        actionLabel="Refresh status"
        onAction={() => invested && setTrailStep(Math.min(trailStep + 1, trailSteps.length - 1))}
      />
      <div className="px-5 pb-6">
        <section className="rise mt-3 flex items-center gap-3.5 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="flex size-11 items-center justify-center rounded-2xl bg-lime/15 text-lime">
            <Icon name="package" size={20} />
          </span>
          <div className="flex-1">
            <p className="tabular font-heading text-base font-bold">
              {inr(amount)} · {product}
            </p>
            <p className="text-xs text-paper/60">Order #GW-8214 · UPI · simulated</p>
          </div>
          <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
            {invested ? "In transit" : "Preview"}
          </span>
        </section>

        <ol className="mt-5 flex flex-col">
          {steps.map((s, i) => (
            <li key={s.id} className="rise relative flex gap-4 pb-7 last:pb-0" style={{ "--i": 1 + i } as React.CSSProperties}>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "absolute left-[15px] top-8 h-[calc(100%-16px)] w-0.5 rounded-full",
                    s.state === "done" ? "bg-growwise" : "bg-line"
                  )}
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
                  s.state === "done" && "bg-growwise text-paper",
                  s.state === "active" && "pulse-dot bg-ink text-lime",
                  s.state === "pending" && "bg-paper text-muted-foreground"
                )}
              >
                <Icon
                  name={s.state === "done" ? "tick" : s.state === "active" ? "clock" : "circle"}
                  size={14}
                />
              </span>
              <div className="pt-0.5">
                <p
                  className={cn(
                    "font-heading text-[15px] font-bold",
                    s.state === "pending" && "text-muted-foreground"
                  )}
                >
                  {s.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rise mt-5 flex items-start gap-2.5 rounded-2xl bg-butter p-4" style={{ "--i": 7 } as React.CSSProperties}>
          <Icon name="info" size={16} className="mt-0.5 shrink-0 text-ink" />
          <p className="text-xs leading-relaxed text-ink/80">
            If anything fails, money auto-returns in 1–2 days. You never chase
            it.
          </p>
        </div>
      </div>
    </Screen>
  )
}
