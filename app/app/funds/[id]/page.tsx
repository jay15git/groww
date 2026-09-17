"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { AreaChart } from "@/components/chart"
import { TickerLogo } from "@/components/goal-icon"
import { funds } from "@/lib/data"
import { cn, inr } from "@/lib/utils"
import type React from "react"

const navLine = [4, 4.6, 4.3, 5, 5.4, 5.1, 5.8, 6.2, 6, 6.5, 6.9, 7.3]

export default function FundDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const f = funds.find((x) => x.id === id) ?? funds[0]

  const stats = [
    { label: "3Y return", value: `${f.threeY}%` },
    { label: "Min SIP", value: inr(f.minSip) },
    { label: "Expense", value: `${f.expense}%` },
    { label: "Fund size", value: f.aum },
  ]

  return (
    <Screen>
      <ScreenHeader
        title={f.category}
        right={
          <button
            type="button"
            aria-label={saved ? "Remove saved fund" : "Save fund"}
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
            className={cn(
              "press flex size-10 items-center justify-center rounded-full",
              saved ? "bg-ink text-lime" : "bg-paper text-ink shadow-sm"
            )}
          >
            <Icon name="bookmark" size={16} />
          </button>
        }
      />
      <div className="flex min-h-full flex-col px-5 pb-6">
        <section className="rise mt-2 flex items-center gap-3.5" style={{ "--i": 0 } as React.CSSProperties}>
          <TickerLogo ticker={f.ticker} />
          <div>
            <h1 className="font-heading text-lg font-extrabold leading-tight tracking-tight">
              {f.name}
            </h1>
            <p className="text-xs text-muted-foreground">
              NAV {inr(f.nav, { decimals: 2 })} ·{" "}
              <span className={f.day >= 0 ? "text-groww" : "text-loss"}>
                {f.day >= 0 ? "+" : "−"}{Math.abs(f.day)}%
              </span>
            </p>
          </div>
        </section>

        <section className="rise mt-4 rounded-3xl bg-paper p-4" style={{ "--i": 1 } as React.CSSProperties}>
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            NAV · 3Y
          </p>
          <div className="mt-2">
            <AreaChart data={navLine} height={150} />
          </div>
        </section>

        <section className="rise mt-3 grid grid-cols-4 gap-2 rounded-2xl bg-paper p-4" style={{ "--i": 2 } as React.CSSProperties}>
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
              <p className="tabular mt-0.5 font-heading text-[13px] font-bold">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="rise mt-3 rounded-2xl bg-mint2 p-4" style={{ "--i": 3 } as React.CSSProperties}>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-ink text-lime">
              <Icon name="sparkles" size={14} />
            </span>
            <p className="font-heading text-sm font-bold">Fits your goals?</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink/80">{f.gr1}</p>
        </section>

        <div className="mt-auto flex gap-2.5 pt-5">
          <button
            type="button"
            onClick={() => router.push("/receipt")}
            className="press h-13 flex-1 rounded-full bg-ink font-heading text-sm font-bold text-paper"
          >
            One-time
          </button>
          <button
            type="button"
            onClick={() => router.push("/autopilot")}
            className="press h-13 flex-1 rounded-full bg-lime font-heading text-sm font-bold text-ink"
          >
            Start SIP
          </button>
        </div>
      </div>
    </Screen>
  )
}
