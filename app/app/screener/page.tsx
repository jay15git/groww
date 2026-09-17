"use client"

import { useState } from "react"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { StockRow } from "@/components/market"
import { allStocks, screenerFilters, volumeShockers } from "@/lib/data"
import { cn } from "@/lib/utils"
import type React from "react"

export default function Screener() {
  const [f, setF] = useState(0)

  const results = (() => {
    const all = [...allStocks]
    switch (screenerFilters[f]) {
      case "Gainers":
        return all.filter((s) => s.change > 0).sort((a, b) => b.change - a.change)
      case "Losers":
        return all.filter((s) => s.change < 0).sort((a, b) => a.change - b.change)
      case "52W high":
      case "RSI > 70":
        return all.filter((s) => s.change > 2).sort((a, b) => b.change - a.change)
      case "52W low":
      case "RSI < 30":
        return all.filter((s) => s.change < -1).sort((a, b) => a.change - b.change)
      case "High volume":
        return []
      default:
        return all
    }
  })()

  const isVol = screenerFilters[f] === "High volume"

  return (
    <Screen className="bg-ink">
      <ScreenHeader title="Intraday screener" dark />
      <div className="px-5 pb-8">
        <div className="rise mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" style={{ "--i": 0 } as React.CSSProperties}>
          {screenerFilters.map((x, i) => (
            <button
              key={x}
              type="button"
              onClick={() => setF(i)}
              aria-pressed={f === i}
              className={cn(
                "press shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold",
                f === i ? "bg-lime text-ink" : "bg-paper/8 text-paper/60"
              )}
            >
              {x}
            </button>
          ))}
        </div>

        {isVol ? (
          <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 1 } as React.CSSProperties}>
            {volumeShockers.map((v) => (
              <div key={v.id} className="flex items-center gap-3 py-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-paper/10 font-heading text-xs font-bold text-paper">
                  {v.ticker}
                </span>
                <p className="min-w-0 flex-1 truncate text-sm font-bold text-paper">{v.name}</p>
                <div className="text-right">
                  <p className="tabular text-sm font-bold text-growwise">+{v.spike.toLocaleString("en-IN")}%</p>
                  <p className="tabular text-[11px] text-paper/45">vol {v.volume}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 1 } as React.CSSProperties}>
            {results.map((s) => (
              <StockRow
                key={s.id}
                ticker={s.ticker}
                name={s.name}
                price={s.price}
                change={s.change}
                changeAbs={s.changeAbs}
                href={`/stocks/${s.id}`}
              />
            ))}
            {results.length === 0 && (
              <p className="py-6 text-center text-sm text-paper/45">No matches today</p>
            )}
          </div>
        )}

        <p className="rise mt-4 text-center text-xs text-paper/35" style={{ "--i": 2 } as React.CSSProperties}>
          {isVol ? `${volumeShockers.length} volume shockers` : `${results.length} stocks match`} · demo data
        </p>
      </div>
    </Screen>
  )
}
