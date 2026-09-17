"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { AreaChart, Sparkline } from "@/components/chart"
import { TickerLogo } from "@/components/goal-icon"
import { holdings } from "@/lib/data"
import { inr, pct } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { useState, type CSSProperties } from "react"

const ranges = ["1D", "1W", "1M", "6M", "1Y"]
const portfolioLine = [6, 6.5, 6.2, 6.9, 6.6, 7.2, 7, 6.4, 6.8, 6.2, 5.9, 5.6]

export default function Portfolio() {
  const { invested, investedAmount, pendingInvest } = useStore()
  const [hidden, setHidden] = useState(false)
  const total = 21380 + investedAmount
  const rows = invested
    ? [
        ...holdings,
        {
          id: pendingInvest?.product ?? "invested",
          name: pendingInvest?.product ?? "Nifty 50 index fund",
          ticker: "GW",
          kind: "mf" as const,
          meta: "Added just now",
          value: investedAmount,
          change: -2.4,
          spark: [7, 7.2, 7, 6.8, 6.6, 6.4],
        },
      ]
    : holdings
  return (
    <Screen nav>
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between pt-1">
          <h1 className="font-heading text-2xl font-extrabold tracking-tight">
            Portfolio
          </h1>
          <button
            type="button"
            aria-label={hidden ? "Show balances" : "Hide balances"}
            aria-pressed={hidden}
            onClick={() => setHidden((v) => !v)}
            className="press flex size-10 items-center justify-center rounded-full bg-paper shadow-sm"
          >
            <Icon name="eye" size={18} />
          </button>
        </div>

        <section className="rise mt-4 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as CSSProperties}>
          <p className="text-xs uppercase tracking-wider text-paper/50">
            Total value
          </p>
          <div className="mt-1 flex items-end justify-between">
            <p className="tabular font-heading text-[36px] font-extrabold leading-none tracking-tight">
              {hidden ? "••••••" : inr(total)}
            </p>
            <span className="tabular rounded-full bg-loss/20 px-2.5 py-1 text-xs font-bold text-[#ff8a8a]">
              ▼ 2.4% today
            </span>
          </div>

          <div className="mt-3 flex gap-1.5">
            {ranges.map((r, i) => (
              <span
                key={r}
                className={
                  i === 0
                    ? "rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-ink"
                    : "rounded-full px-2.5 py-1 text-[11px] font-medium text-paper/50"
                }
              >
                {r}
              </span>
            ))}
          </div>

          <div className="mt-2">
            <AreaChart data={portfolioLine} negative height={130} />
          </div>
        </section>

        {invested && (
          <section className="rise mt-3 rounded-2xl border border-loss/30 bg-paper p-4" style={{ "--i": 1 } as CSSProperties}>
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-loss/10 text-loss">
                <Icon name="down2" size={16} />
              </span>
              <p className="font-heading text-sm font-bold">Your first red day</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              NIFTY dips ~1 in 2 days. Your plan already expects this. Panic
              selling now locks the loss.
            </p>
            <div className="mt-3 flex gap-2">
              <Link href="/goals" className="press flex-1 rounded-full bg-ink py-2 text-center font-heading text-xs font-bold text-paper">
                Review my plan
              </Link>
              <Link href="/wise" className="press flex-1 rounded-full bg-muted py-2 text-center font-heading text-xs font-bold text-ink">
                What is volatility?
              </Link>
            </div>
          </section>
        )}

        <div className="rise mt-6 flex items-center justify-between" style={{ "--i": 2 } as CSSProperties}>
          <h2 className="font-heading text-base font-bold uppercase tracking-wide text-muted-foreground">
            Holdings
          </h2>
          <Link href="/watchlist" className="text-xs font-semibold text-growwise">
            Watchlist
          </Link>
        </div>

        <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 3 } as CSSProperties}>
          {rows.map((h) => (
            <Link
              key={h.id}
              href={h.kind === "mf" ? `/funds/${h.id}` : `/stocks/${h.id}`}
              className="press flex items-center gap-3 py-3.5"
            >
              <TickerLogo ticker={h.ticker} />
              <div className="flex-1">
                <p className="text-sm font-bold">{h.name}</p>
                <p className="text-xs text-muted-foreground">{h.meta}</p>
              </div>
              <Sparkline
                data={h.spark}
                width={52}
                height={22}
                color={h.change >= 0 ? "#00b386" : "#d94a4a"}
              />
              <div className="w-20 text-right">
                <p className="tabular text-sm font-bold">{hidden ? "••••" : inr(h.value)}</p>
                <p
                  className={
                    h.change >= 0
                      ? "tabular text-xs font-bold text-growwise"
                      : "tabular text-xs font-bold text-loss"
                  }
                >
                  {pct(h.change)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="rise mt-4 grid grid-cols-2 gap-2.5" style={{ "--i": 4 } as CSSProperties}>
          <Link href="/dna" className="press flex items-center gap-3 rounded-2xl bg-paper p-4">
            <span className="flex size-9 items-center justify-center rounded-xl bg-lilac text-ink">
              <Icon name="brain" size={16} />
            </span>
            <div>
              <p className="font-heading text-sm font-bold">Portfolio DNA</p>
              <p className="text-[11px] text-muted-foreground">Curious Builder</p>
            </div>
          </Link>
          <Link href="/wrapped" className="press flex items-center gap-3 rounded-2xl bg-paper p-4">
            <span className="flex size-9 items-center justify-center rounded-xl bg-butter text-ink">
              <Icon name="award" size={16} />
            </span>
            <div>
              <p className="font-heading text-sm font-bold">Wrapped</p>
              <p className="text-[11px] text-muted-foreground">90-day milestones</p>
            </div>
          </Link>
        </div>

        <Link
          href="/trail"
          className="press rise mt-3 flex items-center gap-3 rounded-2xl bg-mint2 p-4"
          style={{ "--i": 5 } as CSSProperties}
        >
          <span className="pulse-dot flex size-10 items-center justify-center rounded-full bg-growwise text-paper">
            <Icon name="package" size={18} />
          </span>
          <div className="flex-1">
            <p className="font-heading text-sm font-bold">Money Trail</p>
            <p className="text-xs text-muted-foreground">
              {invested ? "Order placed · units tonight" : "Track where money goes"}
            </p>
          </div>
          <Icon name="next" size={16} className="text-muted-foreground" />
        </Link>
      </div>
    </Screen>
  )
}
