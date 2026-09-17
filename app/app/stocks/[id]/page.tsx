"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { AreaChart } from "@/components/chart"
import { TickerLogo } from "@/components/goal-icon"
import { stocks } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const periods = ["1D", "1W", "1M", "6M", "1Y"]

export default function StockDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { watchIds, toggleWatch } = useStore()
  const s = stocks.find((x) => x.id === id) ?? stocks[0]
  const [range, setRange] = useState(0)
  const watched = watchIds.includes(s.id)
  const neg = s.change < 0

  const facts = [
    { label: "Open", value: inr(s.open, { decimals: 2 }) },
    { label: "Prev. close", value: inr(s.prevClose, { decimals: 2 }) },
    { label: "Day high", value: inr(s.high, { decimals: 2 }) },
    { label: "Day low", value: inr(s.low, { decimals: 2 }) },
    { label: "Market cap", value: s.mcap },
    { label: "P/E", value: String(s.pe) },
  ]

  return (
    <Screen>
      <ScreenHeader
        title={s.name}
        right={
          <button
            type="button"
            aria-label={watched ? "Remove from watchlist" : "Add to watchlist"}
            aria-pressed={watched}
            onClick={() => toggleWatch(s.id)}
            className={cn(
              "press flex size-10 items-center justify-center rounded-full",
              watched ? "bg-ink text-lime" : "bg-paper text-ink shadow-sm"
            )}
          >
            <Icon name="bookmark" size={16} />
          </button>
        }
      />
      <div className="flex min-h-full flex-col px-5 pb-6">
        <section className="rise mt-2 flex items-center gap-3.5" style={{ "--i": 0 } as React.CSSProperties}>
          <TickerLogo ticker={s.ticker} />
          <div>
            <p className="tabular font-heading text-[26px] font-extrabold leading-none tracking-tight">
              {inr(s.price, { decimals: 2 })}
            </p>
            <p className={cn("tabular mt-1 text-xs font-bold", neg ? "text-loss" : "text-groww")}>
              {neg ? "▼" : "▲"} {inr(Math.abs(s.changeAbs), { decimals: 2 })} ({pct(s.change)}) today
            </p>
          </div>
        </section>

        <section className="rise mt-4 rounded-3xl bg-paper p-4" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="flex gap-1.5">
            {periods.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setRange(i)}
                aria-pressed={range === i}
                className={cn(
                  "press rounded-full px-3 py-1.5 text-[11px] font-bold",
                  range === i ? "bg-ink text-lime" : "text-muted-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <AreaChart data={s.spark} negative={neg} height={160} />
          </div>
        </section>

        <section className="rise mt-3 rounded-2xl bg-mint2 p-4" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-ink text-lime">
              <Icon name="sparkles" size={14} />
            </span>
            <p className="font-heading text-sm font-bold">GR-1 read</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink/80">
            {neg
              ? `Down ${Math.abs(s.change)}% today — normal daily range for ${s.name}. Nothing about your plan changed.`
              : `${s.name} up ${s.change}% today. One green day isn't a thesis — check it in Reality Check before acting on tips.`}
          </p>
        </section>

        <section className="rise mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-paper p-4" style={{ "--i": 3 } as React.CSSProperties}>
          {facts.map((f) => (
            <div key={f.label}>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{f.label}</p>
              <p className="tabular mt-0.5 font-heading text-[13px] font-bold">{f.value}</p>
            </div>
          ))}
        </section>

        <div className="mt-auto flex gap-2.5 pt-5">
          <button
            type="button"
            onClick={() => router.push("/receipt")}
            className="press h-13 flex-1 rounded-full bg-ink font-heading text-sm font-bold text-paper"
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => router.push("/reality-check")}
            className="press h-13 flex-1 rounded-full bg-lime font-heading text-sm font-bold text-ink"
          >
            Reality Check
          </button>
        </div>
      </div>
    </Screen>
  )
}
