"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import {
  IndexCard,
  MarketHeader,
  SectionTitle,
  StockRow,
  StockTile,
  SubTabs,
} from "@/components/market"
import {
  allStocks,
  commodityChips,
  fnoTopTraded,
  indexFutures,
  indices,
  stockFutures,
} from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const tabs = ["Explore", "Positions", "Orders", "All watchlists"]
const kinds = ["Equity", "Commodities"]

export default function Fno() {
  const [tab, setTab] = useState(0)
  return (
    <Screen nav className="bg-ink">
      <MarketHeader title="F&O" />
      <div className="mt-3 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
        {indices.slice(0, 3).map((ix, i) => (
          <IndexCard key={ix.name} i={i} idx={ix} />
        ))}
      </div>
      <SubTabs tabs={tabs} active={tab} onChange={setTab} />
      <div className="px-5 pb-8">
        {tab === 0 && <FnoExplore />}
        {tab === 1 && <FnoPositions />}
        {tab === 2 && <FnoOrders />}
        {tab === 3 && <FnoWatchlists />}
      </div>
    </Screen>
  )
}

function FnoExplore() {
  const [kind, setKind] = useState(0)
  const rows = fnoTopTraded.filter((r) =>
    kind === 0 ? r.kind === "equity" : r.kind === "commodity"
  )
  const movers = [...allStocks].sort((a, b) => b.change - a.change).slice(0, 4)

  return (
    <>
      {/* Scalper */}
      <Link
        href="/fno/chain/nifty50"
        className="press rise mt-4 flex items-center gap-3 rounded-2xl bg-paper/5 px-4 py-3.5"
        style={{ "--i": 0 } as React.CSSProperties}
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-lime/15 text-lime">
          <Icon name="chart" size={20} />
        </span>
        <span className="flex-1 font-heading text-sm font-bold text-paper">
          Scalper
        </span>
        <span className="rounded-full bg-cobalt/25 px-2.5 py-1 text-[10px] font-bold text-[#9db4ff]">
          1-tap trading
        </span>
        <Icon name="next" size={16} className="text-paper/45" />
      </Link>

      {/* Top traded */}
      <SectionTitle title="Top traded" i={1} />
      <div className="rise mt-3 flex gap-2" style={{ "--i": 2 } as React.CSSProperties}>
        {kinds.map((k, i) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(i)}
            aria-pressed={kind === i}
            className={cn(
              "press rounded-full border px-3.5 py-1.5 text-xs font-bold",
              kind === i ? "border-paper bg-paper text-ink" : "border-paper/20 text-paper/60"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="rise mt-3 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 3 } as React.CSSProperties}>
        {rows.map((r) => (
          <StockRow
            key={r.id}
            ticker={r.ticker}
            name={r.name}
            price={r.price}
            change={r.change}
            changeAbs={r.changeAbs}
            right={
              r.chain ? (
                <Link
                  href={`/fno/chain/${r.id}`}
                  aria-label={`${r.name} option chain`}
                  className="press flex size-10 items-center justify-center rounded-full border border-paper/15 text-paper/60"
                >
                  <Icon name="exchange" size={16} />
                </Link>
              ) : undefined
            }
          />
        ))}
        <Link href="/screener" className="press flex items-center justify-between py-3.5 text-sm font-bold text-paper">
          See more <Icon name="next" size={14} className="text-paper/45" />
        </Link>
      </div>

      {/* Top movers */}
      <SectionTitle title="Top movers" i={4} />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {movers.map((s, i) => (
          <StockTile key={s.id} i={5 + i} ticker={s.ticker} name={s.name} price={s.price} change={s.change} changeAbs={s.changeAbs} href={`/stocks/${s.id}`} />
        ))}
      </div>

      {/* Commodities */}
      <SectionTitle title="Commodities" i={6} />
      <div className="rise mt-3 flex justify-between rounded-2xl bg-paper/5 px-4 py-4" style={{ "--i": 7 } as React.CSSProperties}>
        {commodityChips.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-1.5">
            <span className="flex size-11 items-center justify-center rounded-full bg-paper/8 text-paper/70">
              <Icon name={c.id === "gold" || c.id === "silver" ? "coins" : "energy"} size={20} />
            </span>
            <p className="text-[11px] font-semibold text-paper/70">{c.name}</p>
            <p className={cn("tabular text-[11px] font-bold", c.change >= 0 ? "text-growwise" : "text-[#ff8a8a]")}>
              {pct(c.change)}
            </p>
          </div>
        ))}
      </div>

      {/* Futures */}
      <SectionTitle title="Top traded stock futures" i={8} />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {stockFutures.map((f, i) => (
          <StockTile key={f.id} i={9 + i} ticker={f.ticker} name={f.name} price={f.price} change={f.change} href={`/fno/chain/nifty50`} />
        ))}
      </div>
      <SectionTitle title="Top traded index futures" i={10} />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {indexFutures.map((f, i) => (
          <StockTile key={f.id} i={11 + i} ticker={f.ticker} name={f.name} price={f.price} change={f.change} href={`/fno/chain/nifty50`} />
        ))}
      </div>

      <div className="rise mt-5 rounded-2xl bg-sand/10 border border-sand/20 p-4" style={{ "--i": 13 } as React.CSSProperties}>
        <div className="flex items-center gap-2">
          <Icon name="warn" size={16} className="text-mango" />
          <p className="font-heading text-sm font-bold text-paper">F&O is risky</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-paper/60">
          9 in 10 individual F&O traders lose money (SEBI study). Wise suggests
          learning with small SIPs first.
        </p>
      </div>
    </>
  )
}

function FnoPositions() {
  return (
    <>
      <section className="rise mt-4 rounded-3xl bg-paper/5 p-5" style={{ "--i": 0 } as React.CSSProperties}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-paper/50">
          Positions (0)
        </p>
        <p className="tabular mt-1 font-heading text-[30px] font-extrabold leading-none text-paper">
          ₹0.00
        </p>
        <p className="mt-1.5 text-xs text-paper/45">Today&rsquo;s P&L</p>
      </section>
      <div className="rise mt-6 flex flex-col items-center py-8 text-center" style={{ "--i": 1 } as React.CSSProperties}>
        <span className="flex size-16 items-center justify-center rounded-full bg-paper/8 text-paper/50">
          <Icon name="chart" size={28} />
        </span>
        <p className="mt-4 font-heading text-base font-bold text-paper">No open F&O positions</p>
        <p className="mt-1 max-w-60 text-xs leading-relaxed text-paper/45">
          Honestly? Good. Derivatives are where most beginners burn money.
        </p>
      </div>
    </>
  )
}

function FnoOrders() {
  const { orders } = useStore()
  return orders.length === 0 ? (
    <div className="rise mt-6 flex flex-col items-center py-10 text-center" style={{ "--i": 0 } as React.CSSProperties}>
      <span className="flex size-16 items-center justify-center rounded-full bg-paper/8 text-paper/50">
        <Icon name="receipt" size={28} />
      </span>
      <p className="mt-4 font-heading text-base font-bold text-paper">No orders yet</p>
    </div>
  ) : (
    <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 0 } as React.CSSProperties}>
      {orders.map((o) => (
        <div key={o.id} className="flex items-center gap-3 py-3.5">
          <span className={cn("flex size-9 items-center justify-center rounded-full text-[10px] font-bold", o.kind === "BUY" ? "bg-growwise/15 text-growwise" : "bg-loss/15 text-[#ff8a8a]")}>
            {o.kind === "BUY" ? "B" : "S"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-paper">{o.name}</p>
            <p className="text-xs text-paper/45">
              {o.product} · {o.qty} @ {inr(o.price, { decimals: 2 })} · {o.time}
            </p>
          </div>
          <span className="rounded-full bg-paper/8 px-2.5 py-1 text-[10px] font-bold text-paper/60">
            {o.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function FnoWatchlists() {
  const { watchIds, watchlists } = useStore()
  const watched = allStocks.filter((s) => watchIds.includes(s.id))
  return (
    <>
      <div className="rise mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" style={{ "--i": 0 } as React.CSSProperties}>
        {watchlists.map((w, i) => (
          <span key={w} className={cn("shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold", i === 0 ? "bg-paper text-ink" : "bg-paper/8 text-paper/60")}>
            {w}
          </span>
        ))}
        <Link href="/watchlist" className="press flex shrink-0 items-center gap-1 rounded-full bg-paper/8 px-3.5 py-1.5 text-xs font-bold text-paper/60">
          <Icon name="plus" size={12} /> New
        </Link>
      </div>
      <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 1 } as React.CSSProperties}>
        {watched.map((s) => (
          <StockRow key={s.id} ticker={s.ticker} name={s.name} price={s.price} change={s.change} changeAbs={s.changeAbs} href={`/stocks/${s.id}`} />
        ))}
        {watched.length === 0 && (
          <p className="py-6 text-center text-sm text-paper/45">Nothing watched yet</p>
        )}
      </div>
    </>
  )
}
