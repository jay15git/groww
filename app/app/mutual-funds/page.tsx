"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { TickerLogo } from "@/components/goal-icon"
import { funds } from "@/lib/data"
import { cn, inr } from "@/lib/utils"
import type React from "react"

const cats = ["All", "Flexi cap", "Large cap", "Small cap"]

export default function MutualFunds() {
  const [cat, setCat] = useState("All")
  const shown = cat === "All" ? funds : funds.filter((f) => f.category === cat)
  const total = funds.reduce((s, f) => s + (f.value ?? 0), 0)
  return (
    <Screen>
      <ScreenHeader title="Mutual funds" action="sparkles" actionLabel="Ask GR-1" actionHref="/gr1" />
      <div className="px-5 pb-8">
        <section className="rise mt-2 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs uppercase tracking-wider text-paper/50">MF portfolio</p>
          <p className="tabular mt-1 font-heading text-[32px] font-extrabold leading-none tracking-tight">
            {inr(total, { decimals: 2 })}
          </p>
          <p className="tabular mt-2 text-xs font-bold text-groww">▲ 0.8% today</p>
        </section>

        <div className="rise mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" style={{ "--i": 1 } as React.CSSProperties}>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "press shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
                cat === c ? "bg-ink text-lime" : "bg-paper text-muted-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <h2 className="rise mt-5 font-heading text-base font-bold uppercase tracking-wide text-muted-foreground" style={{ "--i": 2 } as React.CSSProperties}>
          Your funds
        </h2>
        <div className="mt-3 flex flex-col gap-2.5">
          {shown.map((f, i) => (
            <Link
              key={f.id}
              href={`/funds/${f.id}`}
              className="press rise rounded-2xl bg-paper p-4"
              style={{ "--i": 3 + i } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <TickerLogo ticker={f.ticker} />
                <div className="flex-1">
                  <p className="text-sm font-bold">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.category} · NAV {inr(f.nav, { decimals: 2 })}</p>
                </div>
                <div className="text-right">
                  <p className="tabular text-sm font-bold">{inr(f.value ?? 0, { decimals: 0 })}</p>
                  <p className={cn("tabular text-xs font-bold", f.day >= 0 ? "text-groww" : "text-loss")}>
                    {f.day >= 0 ? "+" : "−"}{Math.abs(f.day)}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="rise mt-4 rounded-2xl bg-sand p-4" style={{ "--i": 6 } as React.CSSProperties}>
          <div className="flex items-center gap-2">
            <Icon name="sparkles" size={16} />
            <p className="font-heading text-sm font-bold">GR-1 says</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
            Your small-cap sleeve swings the most — only park money there that
            you won&rsquo;t need for 5+ years.
          </p>
        </div>
      </div>
    </Screen>
  )
}
