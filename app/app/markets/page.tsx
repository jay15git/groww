"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { Sparkline } from "@/components/chart"
import { TickerLogo } from "@/components/goal-icon"
import { commodityRows, fnoRows, indices, stocks } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import type React from "react"

const tabs = ["Stocks", "F&O", "Indices", "Commodity"]

export default function Markets() {
  const [tab, setTab] = useState(0)
  const [q, setQ] = useState("")

  const query = q.trim().toLowerCase()
  const stockRows = stocks.filter(
    (s) => !query || s.name.toLowerCase().includes(query)
  )
  const fno = fnoRows.filter(
    (f) => !query || f.name.toLowerCase().includes(query)
  )
  const cmdty = commodityRows.filter(
    (c) => !query || c.name.toLowerCase().includes(query)
  )
  const ix = indices.filter(
    (i) => !query || i.name.toLowerCase().includes(query)
  )

  return (
    <Screen dark className="bg-ink">
      <ScreenHeader title="Markets" dark />
      <div className="px-5 pb-8 text-paper">
        <div className="rise mt-2 flex items-center gap-2 rounded-full bg-paper/5 px-4 py-3" style={{ "--i": 0 } as React.CSSProperties}>
          <Icon name="search" size={16} className="text-paper/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search NSE / BSE…"
            aria-label="Search markets"
            className="min-w-0 flex-1 bg-transparent text-sm text-paper outline-none placeholder:text-paper/40"
          />
          {q && (
            <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="text-paper/40">
              <Icon name="close" size={14} />
            </button>
          )}
        </div>

        <div className="rise mt-3 flex gap-6 border-b border-paper/10" role="tablist" aria-label="Market segments" style={{ "--i": 1 } as React.CSSProperties}>
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={
                tab === i
                  ? "border-b-2 border-lime pb-2.5 font-heading text-sm font-bold text-paper"
                  : "pb-2.5 text-sm font-medium text-paper/45"
              }
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <>
            <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5 [scrollbar-width:none]">
              {indices.map((i) => (
                <div key={i.name} className="min-w-36 shrink-0 rounded-2xl bg-paper/5 p-3.5">
                  <p className="text-[11px] font-semibold text-paper/50">{i.name}</p>
                  <p className="tabular mt-0.5 font-heading text-sm font-bold">{i.value}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className={i.change >= 0 ? "tabular text-[11px] font-bold text-groww" : "tabular text-[11px] font-bold text-[#ff8a8a]"}>
                      {i.change >= 0 ? "+" : "−"}{Math.abs(i.change)}%
                    </span>
                    <Sparkline data={i.spark} width={48} height={16} color={i.change >= 0 ? "#00b386" : "#ff8a8a"} />
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-6 font-heading text-base font-bold uppercase tracking-wide text-paper/45">
              Most traded
            </h2>
            <div className="mt-3 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4">
              {stockRows.map((s) => (
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
              {stockRows.length === 0 && (
                <p className="py-6 text-center text-sm text-paper/45">
                  No matches for &ldquo;{q}&rdquo;
                </p>
              )}
            </div>
          </>
        )}

        {tab === 1 && (
          <>
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-mango/10 p-4">
              <Icon name="warn" size={16} className="mt-0.5 shrink-0 text-mango" />
              <p className="text-xs leading-relaxed text-paper/70">
                F&O is where most first-year losses happen — SEBI: 9 in 10
                individual F&O traders lose money. Viewing only; no trading
                here.
              </p>
            </div>
            <div className="mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4">
              {fno.map((f) => (
                <div key={f.id} className="flex items-center gap-3 py-3.5">
                  <TickerLogo ticker={f.name[0]} dark />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{f.name}</p>
                    <p className="text-xs text-paper/45">{f.meta} · {f.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="tabular text-sm font-bold">{inr(f.price, { decimals: 2 })}</p>
                    <p className={f.change >= 0 ? "tabular text-xs font-bold text-groww" : "tabular text-xs font-bold text-[#ff8a8a]"}>
                      {pct(f.change)}
                    </p>
                  </div>
                </div>
              ))}
              {fno.length === 0 && (
                <p className="py-6 text-center text-sm text-paper/45">
                  No matches for &ldquo;{q}&rdquo;
                </p>
              )}
            </div>
          </>
        )}

        {tab === 2 && (
          <div className="mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4">
            {ix.map((i) => (
              <div key={i.name} className="flex items-center gap-3 py-3.5">
                <TickerLogo ticker={i.name[0]} dark />
                <div className="flex-1">
                  <p className="text-sm font-bold">{i.name}</p>
                  <p className="text-xs text-paper/45">{i.meta}</p>
                </div>
                <Sparkline data={i.spark} width={52} height={20} color={i.change >= 0 ? "#00b386" : "#ff8a8a"} />
                <div className="w-24 text-right">
                  <p className="tabular text-sm font-bold">{i.value}</p>
                  <p className={i.change >= 0 ? "tabular text-xs font-bold text-groww" : "tabular text-xs font-bold text-[#ff8a8a]"}>
                    {i.change >= 0 ? "+" : "−"}{Math.abs(i.change)}%
                  </p>
                </div>
              </div>
            ))}
            {ix.length === 0 && (
              <p className="py-6 text-center text-sm text-paper/45">
                No matches for &ldquo;{q}&rdquo;
              </p>
            )}
          </div>
        )}

        {tab === 3 && (
          <div className="mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4">
            {cmdty.map((c) => (
              <div key={c.id} className="flex items-center gap-3 py-3.5">
                <TickerLogo ticker={c.name[0]} dark />
                <div className="flex-1">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-xs text-paper/45">{c.meta}</p>
                </div>
                <Sparkline data={c.spark} width={52} height={20} color={c.change >= 0 ? "#00b386" : "#ff8a8a"} />
                <div className="text-right">
                  <p className="tabular text-sm font-bold">{inr(c.price)}</p>
                  <p className={c.change >= 0 ? "tabular text-xs font-bold text-groww" : "tabular text-xs font-bold text-[#ff8a8a]"}>
                    {pct(c.change)}
                  </p>
                </div>
              </div>
            ))}
            {cmdty.length === 0 && (
              <p className="py-6 text-center text-sm text-paper/45">
                No matches for &ldquo;{q}&rdquo;
              </p>
            )}
          </div>
        )}

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
