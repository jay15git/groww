"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { TickerLogo } from "@/components/goal-icon"
import { allStocks, bonds, etfs, mtfInfo, stockSipIdeas } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import type React from "react"

export default function ProductTool() {
  const { tool } = useParams<{ tool: string }>()
  if (!["mtf", "stock-sip", "etf", "bonds", "events"].includes(tool)) notFound()

  return (
    <Screen>
      <ScreenHeader
        title={
          tool === "mtf" ? "MTF" :
          tool === "stock-sip" ? "Stock SIP" :
          tool === "etf" ? "ETFs" :
          tool === "bonds" ? "Bonds & FDs" : "Events"
        }
      />
      <div className="px-5 pb-8">
        {tool === "mtf" && <Mtf />}
        {tool === "stock-sip" && <StockSip />}
        {tool === "etf" && <Etf />}
        {tool === "bonds" && <Bonds />}
        {tool === "events" && <Events />}
      </div>
    </Screen>
  )
}

function Hero({ title, sub, i }: { title: string; sub: string; i: number }) {
  return (
    <section className="rise mt-2 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": i } as React.CSSProperties}>
      <p className="font-heading text-lg font-extrabold leading-snug">{title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-paper/60">{sub}</p>
    </section>
  )
}

function StockList({ ids, i }: { ids: string[]; i: number }) {
  const rows = ids
    .map((id) => allStocks.find((s) => s.id === id))
    .filter((s): s is (typeof allStocks)[number] => Boolean(s))
  return (
    <div className="rise mt-4 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": i } as React.CSSProperties}>
      {rows.map((s) => (
        <Link key={s.id} href={`/stocks/${s.id}`} className="press flex items-center gap-3 py-3.5">
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
    </div>
  )
}

function Mtf() {
  return (
    <>
      <Hero i={0} title={mtfInfo.tagline} sub={`Pay part now, GrowWise fronts the rest · ${mtfInfo.rate} · pledge your shares`} />
      <div className="rise mt-4 rounded-2xl bg-sand p-4" style={{ "--i": 1 } as React.CSSProperties}>
        <div className="flex items-center gap-2">
          <Icon name="warn" size={16} className="text-ink/70" />
          <p className="font-heading text-sm font-bold">Leverage cuts both ways</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
          4× buying power means 4× losses too. Interest accrues daily. Not for
          first investments.
        </p>
      </div>
      <h2 className="rise mt-5 font-heading text-base font-bold" style={{ "--i": 2 } as React.CSSProperties}>
        Most traded in MTF
      </h2>
      <StockList ids={mtfInfo.examples} i={3} />
    </>
  )
}

function StockSip() {
  return (
    <>
      <Hero i={0} title="SIP, but for single stocks" sub="Auto-buy a fixed rupee amount of a stock every week or month — same discipline as a fund SIP." />
      <h2 className="rise mt-5 font-heading text-base font-bold" style={{ "--i": 1 } as React.CSSProperties}>
        Start with liquid names
      </h2>
      <StockList ids={stockSipIdeas} i={2} />
      <div className="rise mt-4 rounded-2xl bg-mint2 p-4" style={{ "--i": 3 } as React.CSSProperties}>
        <div className="flex items-center gap-2">
          <Icon name="sparkles" size={16} />
          <p className="font-heading text-sm font-bold">Wise says</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
          Single-stock SIPs concentrate risk. Cap them at ~20% of your monthly
          investing — funds do the boring diversification better.
        </p>
      </div>
    </>
  )
}

function Etf() {
  return (
    <>
      <Hero i={0} title="ETFs — index funds that trade like stocks" sub="Buy and sell on the exchange during market hours. Low cost, intraday liquidity." />
      <h2 className="rise mt-5 font-heading text-base font-bold" style={{ "--i": 1 } as React.CSSProperties}>
        All ETFs
      </h2>
      <div className="rise mt-4 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 2 } as React.CSSProperties}>
        {etfs.map((e) => (
          <div key={e.id} className="flex items-center gap-3 py-3.5">
            <TickerLogo ticker={e.ticker} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{e.name}</span>
              {e.byGrowWise && <span className="block text-[10px] font-bold uppercase tracking-wide text-growwise">By GrowWise</span>}
            </span>
            <span className="text-right">
              <span className="tabular block text-sm font-bold">{inr(e.price, { decimals: 2 })}</span>
              <span className={cn("tabular block text-xs font-bold", e.change >= 0 ? "text-growwise" : "text-loss")}>{pct(e.change)}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

function Bonds() {
  return (
    <>
      <Hero i={0} title="Fixed income, actually fixed" sub="Bonds and FDs with known returns. For the part of your money that shouldn't swing." />
      <div className="rise mt-4 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 1 } as React.CSSProperties}>
        {bonds.map((b) => (
          <div key={b.id} className="flex items-center gap-3 py-3.5">
            <span className="flex size-10 items-center justify-center rounded-full bg-butter text-ink">
              <Icon name="banknote" size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{b.name}</span>
              <span className="block text-xs text-muted-foreground">
                {b.rating} · {b.tenure} · min {inr(b.min)}
              </span>
            </span>
            <span className="tabular text-sm font-bold text-growwise">{b.yieldPct}%</span>
          </div>
        ))}
      </div>
      <p className="rise mt-4 text-center text-xs text-muted-foreground" style={{ "--i": 2 } as React.CSSProperties}>
        Yields are indicative. Credit rating ≠ zero risk.
      </p>
    </>
  )
}

function Events() {
  const events = [
    { icon: "gift" as const, title: "Dividends", sub: "3 holdings pay out this month", amount: "+₹412 est." },
    { icon: "exchange" as const, title: "Stock splits", sub: "Raymond 1:5 record date Fri", amount: "" },
    { icon: "handCoins" as const, title: "Buybacks", sub: "TCS buyback window opens Oct 2", amount: "" },
  ]
  return (
    <>
      <Hero i={0} title="Corporate events" sub="Dividends, splits, buybacks and bonuses across your holdings and watchlist." />
      <div className="rise mt-4 flex flex-col gap-2.5" style={{ "--i": 1 } as React.CSSProperties}>
        {events.map((e) => (
          <div key={e.title} className="flex items-center gap-3 rounded-2xl bg-paper p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-mint2 text-ink">
              <Icon name={e.icon} size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold">{e.title}</span>
              <span className="block text-xs text-muted-foreground">{e.sub}</span>
            </span>
            {e.amount && <span className="tabular text-sm font-bold text-growwise">{e.amount}</span>}
          </div>
        ))}
      </div>
    </>
  )
}
