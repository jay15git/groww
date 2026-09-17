"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { AreaChart } from "@/components/chart"
import { TickerLogo } from "@/components/goal-icon"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { allStocks, stocks } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const periods = ["1D", "1W", "1M", "6M", "1Y"]

export default function StockDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { watchIds, toggleWatch } = useStore()
  const s = allStocks.find((x) => x.id === id) ?? stocks[0]
  const [range, setRange] = useState(0)
  const watched = watchIds.includes(s.id)
  const neg = s.change < 0

  const facts = [
    { label: "Open", value: inr(s.open, { decimals: 2 }) },
    { label: "Prev. close", value: inr(s.prevClose, { decimals: 2 }) },
    { label: "Day high", value: inr(s.high, { decimals: 2 }) },
    { label: "Day low", value: inr(s.low, { decimals: 2 }) },
    { label: "Market cap", value: s.mcap },
    { label: "P/E", value: String(s.pe) },
  ]

  return (
    <Screen>
      <ScreenHeader
        title={s.name}
        right={
          <button
            type="button"
            aria-label={watched ? "Remove from watchlist" : "Add to watchlist"}
            aria-pressed={watched}
            onClick={() => toggleWatch(s.id)}
            className={cn(
              "press flex size-10 items-center justify-center rounded-full",
              watched ? "bg-ink text-lime" : "bg-paper text-ink shadow-sm"
            )}
          >
            <Icon name="bookmark" size={16} />
          </button>
        }
      />
      <div className="flex min-h-full flex-col px-5 pb-6">
        <section className="rise mt-2 flex items-center gap-3.5" style={{ "--i": 0 } as React.CSSProperties}>
          <TickerLogo ticker={s.ticker} />
          <div>
            <p className="tabular font-heading text-[26px] font-extrabold leading-none tracking-tight">
              {inr(s.price, { decimals: 2 })}
            </p>
            <p className={cn("tabular mt-1 text-xs font-bold", neg ? "text-loss" : "text-growwise")}>
              {neg ? "▼" : "▲"} {inr(Math.abs(s.changeAbs), { decimals: 2 })} ({pct(s.change)}) today
            </p>
          </div>
        </section>

        <section className="rise mt-4 rounded-3xl bg-paper p-4" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="flex gap-1.5">
            {periods.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setRange(i)}
                aria-pressed={range === i}
                className={cn(
                  "press rounded-full px-3 py-1.5 text-[11px] font-bold",
                  range === i ? "bg-ink text-lime" : "text-muted-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <AreaChart data={s.spark} negative={neg} height={160} />
          </div>
        </section>

        <section className="rise mt-3 rounded-2xl bg-mint2 p-4" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-ink text-lime">
              <Icon name="sparkles" size={14} />
            </span>
            <p className="font-heading text-sm font-bold">Wise read</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink/80">
            {neg
              ? `Down ${Math.abs(s.change)}% today — normal daily range for ${s.name}. Nothing about your plan changed.`
              : `${s.name} up ${s.change}% today. One green day isn't a thesis — check it in Reality Check before acting on tips.`}
          </p>
        </section>

        <section className="rise mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-paper p-4" style={{ "--i": 3 } as React.CSSProperties}>
          {facts.map((f) => (
            <div key={f.label}>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{f.label}</p>
              <p className="tabular mt-0.5 font-heading text-[13px] font-bold">{f.value}</p>
            </div>
          ))}
        </section>

        <div className="mt-auto flex gap-2.5 pt-5">
          <OrderSheet stock={s} side="BUY" />
          <OrderSheet stock={s} side="SELL" />
          <button
            type="button"
            onClick={() => router.push("/reality-check")}
            className="press h-13 flex-1 rounded-full bg-lime font-heading text-sm font-bold text-ink"
          >
            Reality Check
          </button>
        </div>
      </div>
    </Screen>
  )
}

function OrderSheet({ stock, side }: { stock: (typeof allStocks)[number]; side: "BUY" | "SELL" }) {
  const { placeOrder } = useStore()
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState<"Delivery" | "Intraday">("Delivery")
  const [done, setDone] = useState(false)
  const [open, setOpen] = useState(false)
  const cost = qty * stock.price

  const confirm = () => {
    placeOrder({ name: stock.name, kind: side, product, qty, price: stock.price })
    setDone(true)
  }

  return (
    <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) setDone(false) }}>
      <SheetTrigger
        className={cn(
          "press h-13 flex-1 rounded-full font-heading text-sm font-bold",
          side === "BUY" ? "bg-ink text-paper" : "bg-paper text-loss shadow-sm"
        )}
      >
        {side === "BUY" ? "Buy" : "Sell"}
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
      >
        <SheetHeader className="px-0">
          <SheetTitle className="font-heading text-lg font-extrabold">
            {done ? "Order placed" : `${side === "BUY" ? "Buy" : "Sell"} ${stock.name}`}
          </SheetTitle>
        </SheetHeader>

        {done ? (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-mint2 text-growwise">
              <Icon name="check" size={26} />
            </span>
            <p className="mt-3 text-sm font-bold">
              {side === "BUY" ? "Bought" : "Sold"} {qty} × {stock.name}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {product} · {inr(cost, { decimals: 2 })} · Executed at market
            </p>
            <Link
              href="/markets"
              className="press mt-5 w-full rounded-full bg-ink py-3 text-center font-heading text-sm font-bold text-paper"
            >
              View orders
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              {(["Delivery", "Intraday"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProduct(p)}
                  aria-pressed={product === p}
                  className={cn(
                    "press flex-1 rounded-full border py-2 text-xs font-bold",
                    product === p ? "border-ink bg-ink text-lime" : "border-line text-muted-foreground"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <span className="text-xs font-bold text-muted-foreground">Quantity</span>
              <div className="flex items-center gap-3">
                <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="press flex size-8 items-center justify-center rounded-full bg-paper shadow-sm">
                  <Icon name="minus" size={14} />
                </button>
                <span className="tabular w-8 text-center font-heading text-lg font-extrabold">{qty}</span>
                <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="press flex size-8 items-center justify-center rounded-full bg-paper shadow-sm">
                  <Icon name="plus" size={14} />
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-between rounded-2xl bg-muted px-4 py-3 text-sm">
              <span className="text-muted-foreground">Market order · NSE</span>
              <span className="tabular font-bold">{inr(stock.price, { decimals: 2 })}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {product === "Intraday" ? "Auto square-off 3:15 PM" : "Settles T+1"}
              </span>
              <span className="tabular font-heading text-lg font-extrabold">
                {inr(cost, { decimals: 2 })}
              </span>
            </div>

            <button
              type="button"
              onClick={confirm}
              className={cn(
                "press mt-4 h-12 w-full rounded-full font-heading text-sm font-bold",
                side === "BUY" ? "bg-growwise text-paper" : "bg-loss text-paper"
              )}
            >
              {side === "BUY" ? "Buy" : "Sell"} · {inr(cost, { decimals: 0 })}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
