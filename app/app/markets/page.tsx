"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { TickerLogo } from "@/components/goal-icon"
import {
  IndexStrip,
  MarketHeader,
  PatternGlyph,
  SectionTitle,
  StockRow,
  StockTile,
  SubTabs,
} from "@/components/market"
import {
  allStocks,
  etfs,
  holdings,
  inNews,
  mostBought,
  mostTradedMtf,
  productTools,
  sectors,
  stocks,
  topIntraday,
  tradingScreens,
  volumeShockers,
} from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const tabs = ["Explore", "Holdings", "Positions", "Orders", "Watchlist"]
const moverFilters = ["Gainers", "Losers"]
const capFilters = ["Large cap", "Mid cap", "Small cap"]
const posWindows = ["5 mins", "15 mins", "1 hour"]

function byIds(ids: string[]) {
  return ids
    .map((id) => allStocks.find((s) => s.id === id))
    .filter((s): s is (typeof allStocks)[number] => Boolean(s))
}

export default function Markets() {
  const [tab, setTab] = useState(0)
  return (
    <Screen dark nav className="bg-ink">
      <MarketHeader title="Stocks" />
      <IndexStrip />
      <SubTabs tabs={tabs} active={tab} onChange={setTab} />
      <div className="px-5 pb-8">
        {tab === 0 && <ExploreTab />}
        {tab === 1 && <HoldingsTab />}
        {tab === 2 && <PositionsTab />}
        {tab === 3 && <OrdersTab />}
        {tab === 4 && <WatchTab />}
      </div>
    </Screen>
  )
}

/* ── Explore ─────────────────────────────────────────────── */

function TileGrid({ ids, seeMore, start = 0 }: { ids: string[]; seeMore?: boolean; start?: number }) {
  const list = byIds(ids)
  return (
    <div className="mt-3 grid grid-cols-2 gap-2.5">
      {list.slice(0, seeMore ? 3 : 4).map((s, i) => (
        <StockTile
          key={s.id}
          i={start + i}
          ticker={s.ticker}
          name={s.name}
          price={s.price}
          change={s.change}
          changeAbs={s.changeAbs}
          href={`/stocks/${s.id}`}
        />
      ))}
      {seeMore && (
        <Link
          href="/screener"
          className="press rise flex flex-col justify-between rounded-2xl bg-paper/5 p-3.5"
          style={{ "--i": start + 3 } as React.CSSProperties}
        >
          <div className="grid grid-cols-2 gap-1.5">
            {list.slice(0, 4).map((s) => (
              <TickerLogo key={s.id} ticker={s.ticker} dark className="size-7 text-[10px]" />
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1 text-sm font-bold text-paper">
            See more <Icon name="next" size={14} />
          </p>
        </Link>
      )}
    </div>
  )
}

function ExploreTab() {
  const [mover, setMover] = useState(0)
  const [cap, setCap] = useState(1)
  const moversShown = stocks
    .filter((s) => (mover === 0 ? s.change > 0 : s.change < 0))
    .sort((a, b) => (mover === 0 ? b.change - a.change : a.change - b.change))
    .slice(0, 3)
  const news = byIds(inNews)
  const gainers = stocks.filter((s) => s.change > 0)

  return (
    <>
      {/* Products and tools */}
      <div className="rise mt-5 flex items-center justify-between" style={{ "--i": 0 } as React.CSSProperties}>
        <h2 className="font-heading text-base font-bold text-paper">
          Products and tools
        </h2>
      </div>
      <div className="rise mt-3 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none]" style={{ "--i": 1 } as React.CSSProperties}>
        {productTools.map((t) => (
          <Link key={t.id} href={t.href} className="press flex w-14 shrink-0 flex-col items-center gap-1.5">
            <span className="relative flex size-12 items-center justify-center rounded-2xl bg-paper/8 text-paper">
              <Icon name={t.icon} size={22} />
              {t.badge && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-bold text-paper">
                  {t.badge}
                </span>
              )}
            </span>
            <span className="text-[10px] font-semibold text-paper/70">{t.label}</span>
          </Link>
        ))}
      </div>

      <SectionTitle title="Most bought on Groww" i={2} />
      <TileGrid ids={mostBought} seeMore start={3} />

      {/* Top movers */}
      <SectionTitle title="Top movers today" i={4} />
      <div className="rise mt-3 flex items-center gap-2" style={{ "--i": 5 } as React.CSSProperties}>
        {moverFilters.map((m, i) => (
          <button
            key={m}
            type="button"
            onClick={() => setMover(i)}
            aria-pressed={mover === i}
            className={cn(
              "press rounded-full border px-3.5 py-1.5 text-xs font-bold",
              mover === i
                ? "border-paper bg-paper text-ink"
                : "border-paper/20 text-paper/60"
            )}
          >
            {m}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setCap((c) => (c + 1) % capFilters.length)}
          className="press ml-auto flex items-center gap-1 rounded-full border border-paper/20 px-3.5 py-1.5 text-xs font-bold text-paper/60"
        >
          {capFilters[cap]}
          <Icon name="down" size={12} />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {moversShown.map((s, i) => (
          <StockTile key={s.id} i={6 + i} ticker={s.ticker} name={s.name} price={s.price} change={s.change} changeAbs={s.changeAbs} href={`/stocks/${s.id}`} />
        ))}
        <Link href="/screener" className="press rise flex flex-col justify-between rounded-2xl bg-paper/5 p-3.5" style={{ "--i": 9 } as React.CSSProperties}>
          <div className="grid grid-cols-2 gap-1.5">
            {gainers.slice(0, 4).map((s) => (
              <TickerLogo key={s.id} ticker={s.ticker} dark className="size-7 text-[10px]" />
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1 text-sm font-bold text-paper">
            Market trends <Icon name="next" size={14} />
          </p>
        </Link>
      </div>

      <SectionTitle title="Most traded in MTF" i={7} />
      <TileGrid ids={mostTradedMtf} seeMore start={8} />

      <SectionTitle title="Top intraday" action="Intraday screener" href="/screener" i={9} />
      <TileGrid ids={topIntraday} start={10} />

      {/* Volume shockers */}
      <SectionTitle title="Volume shockers" sub="Trading above their weekly avg volume" i={11} />
      <div className="rise mt-3 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 12 } as React.CSSProperties}>
        {volumeShockers.map((v) => (
          <div key={v.id} className="flex items-center gap-3 py-3">
            <TickerLogo ticker={v.ticker} dark className="size-9 text-xs" />
            <p className="min-w-0 flex-1 truncate text-sm font-bold text-paper">{v.name}</p>
            <div className="text-right">
              <p className="tabular text-sm font-bold text-groww">+{v.spike.toLocaleString("en-IN")}%</p>
              <p className="tabular text-[11px] text-paper/45">{v.volume}</p>
            </div>
          </div>
        ))}
        <Link href="/screener" className="press flex items-center justify-center gap-1 py-3 text-xs font-semibold text-paper/60">
          See More <Icon name="next" size={12} />
        </Link>
      </div>

      {/* Trading screens */}
      <SectionTitle title="Trading screens" i={13} />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {tradingScreens.map((t, i) => (
          <Link
            key={t.id}
            href="/screener"
            className="press rise rounded-2xl bg-paper/5 p-3.5"
            style={{ "--i": 14 + i } as React.CSSProperties}
          >
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[10px] font-bold",
                t.signal === "Bullish" ? "bg-groww/15 text-groww" : "bg-loss/15 text-[#ff8a8a]"
              )}
            >
              {t.signal}
            </span>
            <div className="mt-2">
              <PatternGlyph pattern={t.pattern} />
            </div>
            <p className="mt-2 text-sm font-bold text-paper">{t.name}</p>
            <p className="text-[11px] text-paper/45">{t.count} stocks</p>
          </Link>
        ))}
      </div>
      <Link href="/screener" className="press rise mt-3 flex items-center gap-3 rounded-2xl border border-paper/15 px-4 py-3.5" style={{ "--i": 18 } as React.CSSProperties}>
        <Icon name="filter" size={18} className="text-groww" />
        <span className="flex-1 text-sm font-bold text-paper">Intraday screener</span>
        <Icon name="next" size={16} className="text-paper/45" />
      </Link>

      {/* Sectors */}
      <SectionTitle title="Sectors trending today" sub="Highest price change" i={19} />
      <div className="rise mt-3 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 20 } as React.CSSProperties}>
        {sectors.slice(0, 4).map((s) => (
          <div key={s.id} className="flex items-center gap-3 py-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-paper/8 text-paper/70">
              <Icon name={s.icon} size={16} />
            </span>
            <p className="flex-1 text-sm font-bold text-paper">{s.name}</p>
            <span
              className={cn(
                "h-1.5 rounded-full",
                s.change >= 0 ? "bg-groww" : "bg-coral"
              )}
              style={{ width: Math.min(48, Math.abs(s.change) * 14) + 8 }}
            />
            <span className={cn("tabular w-16 text-right text-sm font-bold", s.change >= 0 ? "text-groww" : "text-[#ff8a8a]")}>
              {pct(s.change)}
            </span>
          </div>
        ))}
        <Link href="/sectors" className="press flex items-center justify-center gap-1 py-3 text-xs font-semibold text-paper/60">
          See all sectors <Icon name="next" size={12} />
        </Link>
      </div>

      {/* ETFs */}
      <SectionTitle title="Popular ETFs for SIP" action="See more" href="/products/etf" i={21} />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {etfs.filter((e) => !e.byGroww).map((e, i) => (
          <StockTile key={e.id} i={22 + i} ticker={e.ticker} name={e.name} price={e.price} change={e.change} href="/products/etf" />
        ))}
      </div>
      <SectionTitle title="ETFs by Groww" action="See more" href="/products/etf" i={23} />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {etfs.filter((e) => e.byGroww).map((e, i) => (
          <StockTile key={e.id} i={24 + i} ticker={e.ticker} name={e.name} price={e.price} change={e.change} href="/products/etf" />
        ))}
      </div>

      {/* News */}
      <SectionTitle title="Stocks in news" action="Market news" href="/screener" i={25} />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {news.map((s, i) => (
          <StockTile key={s.id} i={26 + i} ticker={s.ticker} name={s.name} price={s.price} change={s.change} changeAbs={s.changeAbs} href={`/stocks/${s.id}`} />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-paper/35">
        Groww IRL · demo data
      </p>
    </>
  )
}

/* ── Holdings ─────────────────────────────────────────────── */

function HoldingsTab() {
  const [kind, setKind] = useState(0)
  const rows = holdings.filter((h) => h.kind !== "mf")
  const current = rows.reduce((s, h) => s + h.value, 0)
  const invested = Math.round(current * 0.93)
  const dayRet = rows.reduce((s, h) => s + (h.value * h.change) / 100, 0)

  return (
    <>
      <div className="rise mt-4 flex gap-2" style={{ "--i": 0 } as React.CSSProperties}>
        {["Stocks", "Bonds"].map((k, i) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(i)}
            aria-pressed={kind === i}
            className={cn(
              "press rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide",
              kind === i ? "bg-paper/15 text-paper" : "text-paper/45"
            )}
          >
            {k}
          </button>
        ))}
      </div>

      <section className="rise mt-4 rounded-3xl bg-paper/5 p-5" style={{ "--i": 1 } as React.CSSProperties}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-paper/50">
          {kind === 0 ? `Holdings (${rows.length})` : "Holdings (0)"}
        </p>
        <p className="tabular mt-1 font-heading text-[30px] font-extrabold leading-none text-paper">
          {kind === 0 ? inr(current, { decimals: 2 }) : "₹0.00"}
        </p>
        <div className="mt-4 flex flex-col gap-2 border-t border-dashed border-paper/15 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-paper/50">1D returns</span>
            <span className={cn("tabular font-bold", dayRet >= 0 ? "text-groww" : "text-[#ff8a8a]")}>
              {kind === 0 ? `${inr(dayRet, { decimals: 2 })} (${pct((dayRet / current) * 100)})` : "₹0.00 (0.00%)"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-paper/50">Total returns</span>
            <span className={cn("tabular font-bold", "text-groww")}>
              {kind === 0 ? `${inr(current - invested, { decimals: 2 })} (${pct(((current - invested) / invested) * 100)})` : "₹0.00 (0.00%)"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-paper/50">Invested</span>
            <span className="tabular font-bold text-paper">
              {kind === 0 ? inr(invested, { decimals: 2 }) : "--"}
            </span>
          </div>
        </div>
      </section>

      {kind === 0 ? (
        <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 2 } as React.CSSProperties}>
          {rows.map((h) => (
            <StockRow
              key={h.id}
              ticker={h.ticker}
              name={h.name}
              meta={h.meta}
              href={`/stocks/${h.id}`}
              right={
                <div className="text-right">
                  <p className="tabular text-sm font-bold text-paper">{inr(h.value)}</p>
                  <p className={cn("tabular text-xs font-bold", h.change >= 0 ? "text-groww" : "text-[#ff8a8a]")}>{pct(h.change)}</p>
                </div>
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState icon="banknote" title="You have no bonds" sub="Explore AAA-rated bonds and FDs" href="/products/bonds" cta="Explore bonds" />
      )}
    </>
  )
}

/* ── Positions ─────────────────────────────────────────────── */

function PositionsTab() {
  const { orders } = useStore()
  const [win, setWin] = useState(0)
  const positions = orders.filter((o) => o.product === "Intraday" && o.status === "Executed")
  const dayPnl = positions.reduce((sum, o) => {
    const s = allStocks.find((x) => x.name === o.name)
    const ltp = s?.price ?? o.price
    return sum + (o.kind === "BUY" ? ltp - o.price : o.price - ltp) * o.qty
  }, 0)
  const threshold = [2, 1, 0.5][win]
  const movers = allStocks.filter((s) => Math.abs(s.change) > threshold).slice(0, 4)

  return (
    <>
      <section className="rise mt-4 rounded-3xl bg-paper/5 p-5" style={{ "--i": 0 } as React.CSSProperties}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-paper/50">
          Positions ({positions.length})
        </p>
        <p className={cn("tabular mt-1 font-heading text-[30px] font-extrabold leading-none", dayPnl >= 0 ? "text-groww" : "text-[#ff8a8a]")}>
          {inr(dayPnl, { decimals: 2 })}
        </p>
        <p className="mt-1.5 text-xs text-paper/45">Today&rsquo;s P&L · intraday only</p>
      </section>

      {positions.length > 0 ? (
        <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 1 } as React.CSSProperties}>
          {positions.map((o) => {
            const s = allStocks.find((x) => x.name === o.name)
            const ltp = s?.price ?? o.price
            const pnl = (o.kind === "BUY" ? ltp - o.price : o.price - ltp) * o.qty
            return (
              <div key={o.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-paper">{o.name}</p>
                  <p className="text-xs text-paper/45">
                    {o.kind} {o.qty} @ {inr(o.price, { decimals: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="tabular text-sm font-bold text-paper">{inr(ltp, { decimals: 2 })}</p>
                  <p className={cn("tabular text-xs font-bold", pnl >= 0 ? "text-groww" : "text-[#ff8a8a]")}>
                    {inr(pnl, { decimals: 2 })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rise mt-6 flex flex-col items-center py-8 text-center" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="flex size-16 items-center justify-center rounded-full bg-paper/8 text-paper/50">
            <Icon name="chart" size={28} />
          </span>
          <p className="mt-4 text-sm font-bold text-paper">No open positions</p>
          <p className="mt-1 text-xs text-paper/45">Intraday orders you place will show up here</p>
        </div>
      )}

      <SectionTitle title="Price change > 1%" i={2} />
      <div className="rise mt-3 flex gap-2" style={{ "--i": 3 } as React.CSSProperties}>
        {posWindows.map((w, i) => (
          <button
            key={w}
            type="button"
            onClick={() => setWin(i)}
            aria-pressed={win === i}
            className={cn(
              "press rounded-full border px-3.5 py-1.5 text-xs font-bold",
              win === i ? "border-paper bg-paper text-ink" : "border-paper/20 text-paper/60"
            )}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {movers.map((s, i) => (
          <StockTile key={s.id} i={4 + i} ticker={s.ticker} name={s.name} price={s.price} change={s.change} changeAbs={s.changeAbs} href={`/stocks/${s.id}`} />
        ))}
      </div>
    </>
  )
}

/* ── Orders ────────────────────────────────────────────────── */

function OrdersTab() {
  const { orders, cancelOrder } = useStore()
  return (
    <>
      {orders.length === 0 ? (
        <EmptyState icon="receipt" title="No orders yet" sub="Your buy and sell orders will appear here" href="/markets" cta="Explore stocks" />
      ) : (
        <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 0 } as React.CSSProperties}>
          {orders.map((o) => (
            <div key={o.id} className="flex items-center gap-3 py-3.5">
              <span className={cn("flex size-9 items-center justify-center rounded-full text-[10px] font-bold", o.kind === "BUY" ? "bg-groww/15 text-groww" : "bg-loss/15 text-[#ff8a8a]")}>
                {o.kind === "BUY" ? "B" : "S"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-paper">{o.name}</p>
                <p className="text-xs text-paper/45">
                  {o.product} · {o.qty} @ {inr(o.price, { decimals: 2 })} · {o.time}
                </p>
              </div>
              {o.status === "Pending" ? (
                <button type="button" onClick={() => cancelOrder(o.id)} className="press rounded-full bg-paper/10 px-3 py-1.5 text-xs font-bold text-paper">
                  Cancel
                </button>
              ) : (
                <span className="rounded-full bg-paper/8 px-2.5 py-1 text-[10px] font-bold text-paper/60">
                  {o.status}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="rise mt-4 text-center text-xs text-paper/35" style={{ "--i": 1 } as React.CSSProperties}>
        Orders placed from any stock page land here instantly
      </p>
    </>
  )
}

/* ── Watchlist ─────────────────────────────────────────────── */

function WatchTab() {
  const { watchIds, watchlists } = useStore()
  const watched = allStocks.filter((s) => watchIds.includes(s.id))
  return (
    <>
      <div className="rise mt-4 flex items-center justify-between" style={{ "--i": 0 } as React.CSSProperties}>
        <h2 className="font-heading text-base font-bold text-paper">All watchlists</h2>
        <Link href="/watchlist" className="text-xs font-semibold text-groww">Manage</Link>
      </div>
      <div className="rise mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" style={{ "--i": 1 } as React.CSSProperties}>
        {watchlists.map((w, i) => (
          <span key={w} className={cn("shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold", i === 0 ? "bg-paper text-ink" : "bg-paper/8 text-paper/60")}>
            {w}
          </span>
        ))}
      </div>
      <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 2 } as React.CSSProperties}>
        {watched.map((s) => (
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
        {watched.length === 0 && (
          <p className="py-6 text-center text-sm text-paper/45">Nothing watched yet</p>
        )}
      </div>
    </>
  )
}

function EmptyState({ icon, title, sub, href, cta }: { icon: string; title: string; sub: string; href: string; cta: string }) {
  return (
    <div className="rise mt-6 flex flex-col items-center py-10 text-center" style={{ "--i": 3 } as React.CSSProperties}>
      <span className="flex size-16 items-center justify-center rounded-full bg-paper/8 text-paper/50">
        <Icon name={icon as never} size={28} />
      </span>
      <p className="mt-4 font-heading text-base font-bold text-paper">{title}</p>
      <p className="mt-1 text-xs text-paper/45">{sub}</p>
      <Link href={href} className="press mt-4 rounded-full bg-lime px-5 py-2.5 font-heading text-xs font-bold text-ink">
        {cta}
      </Link>
    </div>
  )
}
