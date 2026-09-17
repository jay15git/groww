"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { TickerLogo } from "@/components/goal-icon"
import { allStocks, fnoTopTraded, funds, ipos } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import type React from "react"

export default function Search() {
  const [q, setQ] = useState("")
  const query = q.trim().toLowerCase()
  const hit = (n: string) => !query || n.toLowerCase().includes(query)

  const stockHits = allStocks.filter((s) => hit(s.name))
  const fundHits = funds.filter((f) => hit(f.name) || hit(f.category))
  const fnoHits = fnoTopTraded.filter((f) => hit(f.name))
  const ipoHits = ipos.filter((i) => hit(i.name))
  const empty = query && !stockHits.length && !fundHits.length && !fnoHits.length && !ipoHits.length

  return (
    <Screen>
      <ScreenHeader title="Search" />
      <div className="px-5 pb-8">
        <div className="rise mt-2 flex items-center gap-2 rounded-full bg-paper px-4 py-3 shadow-sm" style={{ "--i": 0 } as React.CSSProperties}>
          <Icon name="search" size={16} className="text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Stocks, funds, F&O, IPOs…"
            aria-label="Search everything"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <button type="button" aria-label="Clear" onClick={() => setQ("")} className="press text-muted-foreground">
              <Icon name="close" size={14} />
            </button>
          )}
        </div>

        {empty && (
          <p className="rise mt-8 text-center text-sm text-muted-foreground" style={{ "--i": 1 } as React.CSSProperties}>
            Nothing matches “{q}”
          </p>
        )}

        {stockHits.length > 0 && (
          <Group title="Stocks" i={1}>
            {stockHits.map((s) => (
              <Link key={s.id} href={`/stocks/${s.id}`} className="press flex items-center gap-3 py-3">
                <TickerLogo ticker={s.ticker} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">{s.exchange} · Equity</span>
                </span>
                <span className="text-right">
                  <span className="tabular block text-sm font-bold">{inr(s.price, { decimals: 2 })}</span>
                  <span className={cn("tabular block text-xs font-bold", s.change >= 0 ? "text-growwise" : "text-loss")}>{pct(s.change)}</span>
                </span>
              </Link>
            ))}
          </Group>
        )}

        {fundHits.length > 0 && (
          <Group title="Mutual funds" i={2}>
            {fundHits.map((f) => (
              <Link key={f.id} href={`/funds/${f.id}`} className="press flex items-center gap-3 py-3">
                <TickerLogo ticker={f.ticker} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{f.name}</span>
                  <span className="block text-xs text-muted-foreground">{f.category}</span>
                </span>
                <span className="text-right">
                  <span className="tabular block text-sm font-bold text-growwise">{pct(f.threeY)}</span>
                  <span className="block text-[10px] text-muted-foreground">3Y</span>
                </span>
              </Link>
            ))}
          </Group>
        )}

        {fnoHits.length > 0 && (
          <Group title="F&O" i={3}>
            {fnoHits.map((f) => (
              <Link key={f.id} href={f.chain ? `/fno/chain/${f.id}` : "/fno"} className="press flex items-center gap-3 py-3">
                <TickerLogo ticker={f.ticker} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{f.name}</span>
                  <span className="block text-xs text-muted-foreground">{f.kind === "equity" ? "Index/Stock F&O" : "Commodity"}</span>
                </span>
                <span className="text-right">
                  <span className="tabular block text-sm font-bold">{inr(f.price, { decimals: 2 })}</span>
                  <span className={cn("tabular block text-xs font-bold", f.change >= 0 ? "text-growwise" : "text-loss")}>{pct(f.change)}</span>
                </span>
              </Link>
            ))}
          </Group>
        )}

        {ipoHits.length > 0 && (
          <Group title="IPOs" i={4}>
            {ipoHits.map((i) => (
              <Link key={i.id} href="/ipo" className="press flex items-center gap-3 py-3">
                <TickerLogo ticker={i.ticker} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{i.name}</span>
                  <span className="block text-xs text-muted-foreground">{i.dates} · {i.band}</span>
                </span>
                <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold", i.status === "open" ? "bg-mint2 text-growwise" : "bg-muted text-muted-foreground")}>
                  {i.status === "open" ? "Open" : i.status === "upcoming" ? "Soon" : "Closed"}
                </span>
              </Link>
            ))}
          </Group>
        )}
      </div>
    </Screen>
  )
}

function Group({ title, i, children }: { title: string; i: number; children: React.ReactNode }) {
  return (
    <div className="rise mt-5" style={{ "--i": i } as React.CSSProperties}>
      <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="mt-2 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4">
        {children}
      </div>
    </div>
  )
}
