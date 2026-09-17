"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { MarketHeader, SubTabs } from "@/components/market"
import { TickerLogo } from "@/components/goal-icon"
import { funds, mfCollections, popularFunds } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const tabs = ["Explore", "Dashboard", "SIPs", "Watchlist"]
const cats = ["All", "Flexi cap", "Large cap", "Mid cap", "Small cap", "Index", "Gold", "Silver", "Sectoral", "Multi asset"]

export default function MutualFunds() {
  const [tab, setTab] = useState(0)
  return (
    <Screen nav>
      <MarketHeader title="Mutual Funds" light />
      <SubTabs tabs={tabs} active={tab} onChange={setTab} light />
      <div className="px-5 pb-8">
        {tab === 0 && <MfExplore goSips={() => setTab(2)} />}
        {tab === 1 && <MfDashboard />}
        {tab === 2 && <MfSips />}
        {tab === 3 && <MfWatchlist />}
      </div>
    </Screen>
  )
}

function fundById(id: string) {
  return funds.find((f) => f.id === id)
}

/* ── Explore ─────────────────────────────────────────────── */

function MfExplore({ goSips }: { goSips: () => void }) {
  const [cat, setCat] = useState("All")
  const shown = cat === "All" ? funds : funds.filter((f) => f.category === cat)
  const popular = popularFunds.map(fundById).filter(Boolean)

  return (
    <>
      {/* KYC banner */}
      <section className="rise mt-4 rounded-2xl bg-butter p-4" style={{ "--i": 0 } as React.CSSProperties}>
        <p className="font-heading text-sm font-bold">KYC verification: done</p>
        <p className="mt-1 text-xs leading-relaxed text-ink/70">
          Demo account — all funds unlocked. Real investing needs PAN + bank KYC.
        </p>
      </section>

      {/* SIP promo */}
      <section className="rise mt-3 flex items-center justify-between rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 1 } as React.CSSProperties}>
        <div>
          <p className="font-heading text-[15px] font-extrabold leading-snug">
            Invest every month,
            <br />
            grow wealth with SIP
          </p>
          <button
            type="button"
            onClick={goSips}
            className="press mt-3 rounded-full bg-growwise px-4 py-2 font-heading text-xs font-bold text-paper"
          >
            Start a SIP
          </button>
        </div>
        <span className="flex size-14 items-center justify-center rounded-2xl bg-lime/15 text-lime">
          <Icon name="calendar" size={28} />
        </span>
      </section>

      {/* Popular funds */}
      <div className="rise mt-6 flex items-center justify-between" style={{ "--i": 2 } as React.CSSProperties}>
        <h2 className="font-heading text-base font-bold">Popular Funds</h2>
        <span className="text-xs font-semibold text-muted-foreground">3Y returns</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {popular.map((f, i) => (
          <Link
            key={f!.id}
            href={`/funds/${f!.id}`}
            className="press rise rounded-2xl bg-paper p-3.5"
            style={{ "--i": 3 + i } as React.CSSProperties}
          >
            <TickerLogo ticker={f!.ticker} className="size-9 text-xs" />
            <p className="mt-2.5 line-clamp-2 min-h-10 text-sm font-bold leading-snug">{f!.name}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="tabular text-sm font-bold text-growwise">{pct(f!.threeY)}</p>
              <span className="text-[10px] text-muted-foreground">3Y</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Collections */}
      <div className="rise mt-6" style={{ "--i": 7 } as React.CSSProperties}>
        <h2 className="font-heading text-base font-bold">Collections</h2>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {mfCollections.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id === "large" ? "Large cap" : c.id === "index" ? "Index" : c.id === "gold" ? "Gold" : "All")}
              className="press flex shrink-0 items-center gap-1.5 rounded-full bg-paper px-3.5 py-2 text-xs font-bold"
            >
              <Icon name={c.icon} size={14} className="text-growwise" />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* All funds */}
      <div className="rise mt-6" style={{ "--i": 8 } as React.CSSProperties}>
        <h2 className="font-heading text-base font-bold">All mutual funds</h2>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "press shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold",
                cat === c ? "bg-ink text-lime" : "bg-paper text-muted-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 9 } as React.CSSProperties}>
        {shown.map((f) => (
          <FundRow key={f.id} id={f.id} />
        ))}
        {shown.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">No funds in this category</p>
        )}
      </div>

      {/* Wise / prime */}
      <Link href="/wise" className="press rise mt-4 flex items-center gap-3 rounded-2xl bg-ink p-4 text-paper" style={{ "--i": 10 } as React.CSSProperties}>
        <span className="flex size-10 items-center justify-center rounded-full bg-lime text-ink">
          <Icon name="sparkles" size={18} />
        </span>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-lime">Better than Prime</p>
          <p className="font-heading text-sm font-bold">Ask Wise for fund picks matched to your goals</p>
        </div>
        <Icon name="next" size={16} className="text-paper/50" />
      </Link>
    </>
  )
}

function FundRow({ id }: { id: string }) {
  const f = fundById(id)!
  const { fundWatchIds, toggleFundWatch } = useStore()
  const saved = fundWatchIds.includes(f.id)
  return (
    <div className="flex items-center gap-3 py-3">
      <Link href={`/funds/${f.id}`} className="press flex min-w-0 flex-1 items-center gap-3">
        <TickerLogo ticker={f.ticker} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{f.name}</span>
          <span className="block text-xs text-muted-foreground">
            {f.category} · Min SIP {inr(f.minSip)}
          </span>
        </span>
        <span className="text-right">
          <span className={cn("tabular block text-sm font-bold", f.threeY >= 0 ? "text-growwise" : "text-loss")}>
            {pct(f.threeY)}
          </span>
          <span className="block text-[10px] text-muted-foreground">3Y</span>
        </span>
      </Link>
      <button
        type="button"
        aria-label={saved ? "Remove from fund watchlist" : "Watch fund"}
        aria-pressed={saved}
        onClick={() => toggleFundWatch(f.id)}
        className={cn("press flex size-8 items-center justify-center rounded-full", saved ? "text-growwise" : "text-muted-foreground")}
      >
        <Icon name="bookmark" size={16} />
      </button>
    </div>
  )
}

/* ── Dashboard ───────────────────────────────────────────── */

function MfDashboard() {
  const owned = funds.filter((f) => f.value)
  const current = owned.reduce((s, f) => s + (f.value ?? 0), 0)
  const invested = Math.round(current * 0.91)

  return (
    <>
      <section className="rise mt-4 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-paper/50">
          MF investments ({owned.length})
        </p>
        <p className="tabular mt-1 font-heading text-[30px] font-extrabold leading-none">
          {inr(current, { decimals: 2 })}
        </p>
        <div className="mt-4 flex flex-col gap-2 border-t border-dashed border-paper/15 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-paper/50">1D returns</span>
            <span className="tabular font-bold text-growwise">{inr(current * 0.008, { decimals: 2 })} (+0.80%)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-paper/50">Total returns</span>
            <span className="tabular font-bold text-growwise">
              {inr(current - invested, { decimals: 2 })} ({pct(((current - invested) / invested) * 100)})
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-paper/50">Invested</span>
            <span className="tabular font-bold">{inr(invested, { decimals: 2 })}</span>
          </div>
        </div>
      </section>

      <h2 className="rise mt-5 font-heading text-base font-bold" style={{ "--i": 1 } as React.CSSProperties}>
        Your funds
      </h2>
      <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 2 } as React.CSSProperties}>
        {owned.map((f) => (
          <Link key={f.id} href={`/funds/${f.id}`} className="press flex items-center gap-3 py-3.5">
            <TickerLogo ticker={f.ticker} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{f.name}</span>
              <span className="block text-xs text-muted-foreground">{f.category} · NAV {inr(f.nav, { decimals: 2 })}</span>
            </span>
            <span className="text-right">
              <span className="tabular block text-sm font-bold">{inr(f.value ?? 0)}</span>
              <span className={cn("tabular block text-xs font-bold", f.day >= 0 ? "text-growwise" : "text-loss")}>
                {f.day >= 0 ? "+" : "−"}{Math.abs(f.day)}%
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="rise mt-4 rounded-2xl bg-sand p-4" style={{ "--i": 3 } as React.CSSProperties}>
        <div className="flex items-center gap-2">
          <Icon name="sparkles" size={16} />
          <p className="font-heading text-sm font-bold">Wise says</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
          Your small-cap sleeve swings the most — only park money there that
          you won&rsquo;t need for 5+ years.
        </p>
      </div>
    </>
  )
}

/* ── SIPs ────────────────────────────────────────────────── */

function MfSips() {
  const { sips, removeSip } = useStore()
  const monthly = sips.reduce((s, x) => s + x.amount, 0)
  const under500 = funds.filter((f) => f.minSip <= 500).sort((a, b) => b.threeY - a.threeY)

  return (
    <>
      <section className="rise mt-4 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-paper/50">
          Monthly SIP amount
        </p>
        <p className="tabular mt-1 font-heading text-[30px] font-extrabold leading-none">
          {inr(monthly)}
        </p>
        <p className="mt-1.5 text-xs text-paper/45">
          {sips.length} active {sips.length === 1 ? "SIP" : "SIPs"}
        </p>
      </section>

      {sips.length > 0 && (
        <>
          <h2 className="rise mt-5 font-heading text-base font-bold" style={{ "--i": 1 } as React.CSSProperties}>
            Active SIPs
          </h2>
          <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 2 } as React.CSSProperties}>
            {sips.map((s) => {
              const f = fundById(s.fundId)
              return (
                <div key={s.id} className="flex items-center gap-3 py-3.5">
                  <TickerLogo ticker={f?.ticker ?? "S"} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{f?.name ?? s.fundId}</p>
                    <p className="text-xs text-muted-foreground">
                      {inr(s.amount)}/mo · every {s.date}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSip(s.id)}
                    className="press rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground"
                  >
                    Pause
                  </button>
                </div>
              )
            })}
          </div>
        </>
      )}

      <div className="rise mt-6 flex items-center justify-between" style={{ "--i": 3 } as React.CSSProperties}>
        <h2 className="font-heading text-base font-bold">SIPs under ₹500</h2>
        <span className="text-xs font-semibold text-muted-foreground">3Y returns</span>
      </div>
      <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 4 } as React.CSSProperties}>
        {under500.map((f) => (
          <Link key={f.id} href={`/funds/${f.id}`} className="press flex items-center gap-3 py-3.5">
            <TickerLogo ticker={f.ticker} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{f.name}</span>
              <span className="block text-xs text-muted-foreground">Min {inr(f.minSip)}</span>
            </span>
            <span className="tabular text-sm font-bold text-growwise">{pct(f.threeY)}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

/* ── Watchlist ───────────────────────────────────────────── */

function MfWatchlist() {
  const { fundWatchIds, toggleFundWatch } = useStore()
  const watched = funds.filter((f) => fundWatchIds.includes(f.id))
  const trending = [...funds].sort((a, b) => b.threeY - a.threeY).slice(0, 5)

  return (
    <>
      {watched.length === 0 ? (
        <div className="rise mt-8 flex flex-col items-center py-8 text-center" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="flex size-16 items-center justify-center rounded-full bg-lilac text-ink">
            <Icon name="search" size={28} />
          </span>
          <p className="mt-4 font-heading text-base font-bold">Start adding funds to Watchlist</p>
          <p className="mt-1 text-xs text-muted-foreground">Tap the bookmark on any fund</p>
        </div>
      ) : (
        <div className="rise mt-4 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 0 } as React.CSSProperties}>
          {watched.map((f) => (
            <div key={f.id} className="flex items-center gap-3 py-3.5">
              <Link href={`/funds/${f.id}`} className="press flex min-w-0 flex-1 items-center gap-3">
                <TickerLogo ticker={f.ticker} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{f.name}</span>
                  <span className="block text-xs text-muted-foreground">{f.category}</span>
                </span>
                <span className="tabular text-sm font-bold text-growwise">{pct(f.threeY)}</span>
              </Link>
              <button
                type="button"
                aria-label="Remove from watchlist"
                onClick={() => toggleFundWatch(f.id)}
                className="press flex size-8 items-center justify-center rounded-full text-growwise"
              >
                <Icon name="bookmark" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="rise mt-6 flex items-center justify-between" style={{ "--i": 1 } as React.CSSProperties}>
        <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Trending
        </h2>
        <span className="text-xs font-semibold text-muted-foreground">3Y returns</span>
      </div>
      <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 2 } as React.CSSProperties}>
        {trending.map((f) => (
          <FundRow key={f.id} id={f.id} />
        ))}
      </div>
    </>
  )
}
