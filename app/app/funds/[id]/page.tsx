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
import { funds } from "@/lib/data"
import { cn, inr } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const navLine = [4, 4.6, 4.3, 5, 5.4, 5.1, 5.8, 6.2, 6, 6.5, 6.9, 7.3]

export default function FundDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const f = funds.find((x) => x.id === id) ?? funds[0]

  const stats = [
    { label: "3Y return", value: `${f.threeY}%` },
    { label: "Min SIP", value: inr(f.minSip) },
    { label: "Expense", value: `${f.expense}%` },
    { label: "Fund size", value: f.aum },
  ]

  return (
    <Screen>
      <ScreenHeader
        title={f.category}
        right={
          <button
            type="button"
            aria-label={saved ? "Remove saved fund" : "Save fund"}
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
            className={cn(
              "press flex size-10 items-center justify-center rounded-full",
              saved ? "bg-ink text-lime" : "bg-paper text-ink shadow-sm"
            )}
          >
            <Icon name="bookmark" size={16} />
          </button>
        }
      />
      <div className="flex min-h-full flex-col px-5 pb-6">
        <section className="rise mt-2 flex items-center gap-3.5" style={{ "--i": 0 } as React.CSSProperties}>
          <TickerLogo ticker={f.ticker} />
          <div>
            <h1 className="font-heading text-lg font-extrabold leading-tight tracking-tight">
              {f.name}
            </h1>
            <p className="text-xs text-muted-foreground">
              NAV {inr(f.nav, { decimals: 2 })} ·{" "}
              <span className={f.day >= 0 ? "text-growwise" : "text-loss"}>
                {f.day >= 0 ? "+" : "−"}{Math.abs(f.day)}%
              </span>
            </p>
          </div>
        </section>

        <section className="rise mt-4 rounded-3xl bg-paper p-4" style={{ "--i": 1 } as React.CSSProperties}>
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            NAV · 3Y
          </p>
          <div className="mt-2">
            <AreaChart data={navLine} height={150} />
          </div>
        </section>

        <section className="rise mt-3 grid grid-cols-4 gap-2 rounded-2xl bg-paper p-4" style={{ "--i": 2 } as React.CSSProperties}>
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
              <p className="tabular mt-0.5 font-heading text-[13px] font-bold">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="rise mt-3 rounded-2xl bg-mint2 p-4" style={{ "--i": 3 } as React.CSSProperties}>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-ink text-lime">
              <Icon name="sparkles" size={14} />
            </span>
            <p className="font-heading text-sm font-bold">Fits your goals?</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink/80">{f.wise}</p>
        </section>

        <div className="mt-auto flex gap-2.5 pt-5">
          <button
            type="button"
            onClick={() => router.push("/receipt")}
            className="press h-13 flex-1 rounded-full bg-ink font-heading text-sm font-bold text-paper"
          >
            One-time
          </button>
          <SipSheet fund={f} />
        </div>
      </div>
    </Screen>
  )
}

const sipAmounts = [100, 250, 500, 1000]
const sipDates = ["1st", "5th", "10th"]

function SipSheet({ fund }: { fund: (typeof funds)[number] }) {
  const { addSip } = useStore()
  const [amount, setAmount] = useState(Math.max(500, fund.minSip))
  const [date, setDate] = useState("5th")
  const [done, setDone] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) setDone(false) }}>
      <SheetTrigger className="press h-13 flex-1 rounded-full bg-lime font-heading text-sm font-bold text-ink">
        Start SIP
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
      >
        <SheetHeader className="px-0">
          <SheetTitle className="font-heading text-lg font-extrabold">
            {done ? "SIP started" : `SIP · ${fund.name}`}
          </SheetTitle>
        </SheetHeader>

        {done ? (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-mint2 text-growwise">
              <Icon name="check" size={26} />
            </span>
            <p className="mt-3 text-sm font-bold">
              {inr(amount)}/mo · every {date}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Pause or stop anytime — no lock-in on open funds
            </p>
            <Link
              href="/mutual-funds"
              className="press mt-5 w-full rounded-full bg-ink py-3 text-center font-heading text-sm font-bold text-paper"
            >
              View my SIPs
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Monthly amount · min {inr(fund.minSip)}
            </p>
            <div className="mt-2 flex gap-2">
              {sipAmounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(Math.max(a, fund.minSip))}
                  aria-pressed={amount === Math.max(a, fund.minSip)}
                  className={cn(
                    "press flex-1 rounded-full border py-2 text-xs font-bold",
                    amount === Math.max(a, fund.minSip)
                      ? "border-ink bg-ink text-lime"
                      : "border-line text-muted-foreground"
                  )}
                >
                  {inr(a)}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <span className="text-xs font-bold text-muted-foreground">Custom</span>
              <div className="flex items-center gap-3">
                <button type="button" aria-label="Less" onClick={() => setAmount((a) => Math.max(fund.minSip, a - 100))} className="press flex size-8 items-center justify-center rounded-full bg-paper shadow-sm">
                  <Icon name="minus" size={14} />
                </button>
                <span className="tabular w-16 text-center font-heading text-lg font-extrabold">{inr(amount)}</span>
                <button type="button" aria-label="More" onClick={() => setAmount((a) => a + 100)} className="press flex size-8 items-center justify-center rounded-full bg-paper shadow-sm">
                  <Icon name="plus" size={14} />
                </button>
              </div>
            </div>

            <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              SIP date
            </p>
            <div className="mt-2 flex gap-2">
              {sipDates.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDate(d)}
                  aria-pressed={date === d}
                  className={cn(
                    "press flex-1 rounded-full border py-2 text-xs font-bold",
                    date === d ? "border-ink bg-ink text-lime" : "border-line text-muted-foreground"
                  )}
                >
                  {d} of month
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => { addSip({ fundId: fund.id, amount, date }); setDone(true) }}
              className="press mt-5 h-12 w-full rounded-full bg-growwise font-heading text-sm font-bold text-paper"
            >
              Start SIP · {inr(amount)}/mo
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
