"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { Sparkline } from "@/components/chart"
import { TickerLogo } from "@/components/goal-icon"
import { indices, stocks } from "@/lib/data"
import { inr, pct } from "@/lib/utils"
import type React from "react"

const tabs = ["Stocks", "F&O", "Indices", "Commodity"]

export default function Markets() {
  return (
    <Screen dark className="bg-ink">
      <ScreenHeader title="Markets" dark action="search" actionLabel="Search markets" />
      <div className="px-5 pb-8 text-paper">
        <div className="rise mt-2 flex gap-6 border-b border-paper/10" style={{ "--i": 0 } as React.CSSProperties}>
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              className={
                i === 0
                  ? "border-b-2 border-lime pb-2.5 font-heading text-sm font-bold text-paper"
                  : "pb-2.5 text-sm font-medium text-paper/45"
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="rise mt-4 flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5 [scrollbar-width:none]" style={{ "--i": 1 } as React.CSSProperties}>
          {indices.map((ix) => (
            <div key={ix.name} className="min-w-36 shrink-0 rounded-2xl bg-paper/5 p-3.5">
              <p className="text-[11px] font-semibold text-paper/50">{ix.name}</p>
              <p className="tabular mt-0.5 font-heading text-sm font-bold">{ix.value}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className={ix.change >= 0 ? "tabular text-[11px] font-bold text-groww" : "tabular text-[11px] font-bold text-[#ff8a8a]"}>
                  {ix.change >= 0 ? "+" : "−"}{Math.abs(ix.change)}%
                </span>
                <Sparkline data={ix.spark} width={48} height={16} color={ix.change >= 0 ? "#00b386" : "#ff8a8a"} />
              </div>
            </div>
          ))}
        </div>

        <h2 className="rise mt-6 font-heading text-base font-bold uppercase tracking-wide text-paper/45" style={{ "--i": 2 } as React.CSSProperties}>
          Most traded
        </h2>
        <div className="rise mt-3 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 3 } as React.CSSProperties}>
          {stocks.map((s) => (
            <Link key={s.id} href={`/stocks/${s.id}`} className="press flex items-center gap-3 py-3.5">
              <TickerLogo ticker={s.ticker} dark />
              <div className="flex-1">
                <p className="text-sm font-bold">{s.name}</p>
                <p className="text-xs text-paper/45">{s.exchange} · Equity</p>
              </div>
              <div className="text-right">
                <p className="tabular text-sm font-bold">{inr(s.price, { decimals: 2 })}</p>
                <p className={s.change >= 0 ? "tabular text-xs font-bold text-groww" : "tabular text-xs font-bold text-[#ff8a8a]"}>
                  {pct(s.change)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/reality-check"
          className="press rise mt-5 flex items-center gap-3 rounded-2xl bg-lime p-4 text-ink"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <Icon name="shield" size={20} />
          <p className="flex-1 font-heading text-sm font-bold">
            Saw a hot tip about one of these?
          </p>
          <Icon name="next" size={16} />
        </Link>
      </div>
    </Screen>
  )
}
