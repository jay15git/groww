"use client"

import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { TickerLogo } from "@/components/goal-icon"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ipos, type Ipo } from "@/lib/data"
import { cn, inr } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const filters = ["Open", "Upcoming", "Closed"]

export default function Ipos() {
  const [f, setF] = useState(0)
  const shown = ipos.filter(
    (i) =>
      (f === 0 && i.status === "open") ||
      (f === 1 && i.status === "upcoming") ||
      (f === 2 && i.status === "closed")
  )

  return (
    <Screen>
      <ScreenHeader title="IPOs" />
      <div className="px-5 pb-8">
        <div className="rise mt-2 flex gap-2" style={{ "--i": 0 } as React.CSSProperties}>
          {filters.map((x, i) => (
            <button
              key={x}
              type="button"
              onClick={() => setF(i)}
              aria-pressed={f === i}
              className={cn(
                "press rounded-full px-4 py-1.5 text-xs font-bold",
                f === i ? "bg-ink text-lime" : "bg-paper text-muted-foreground"
              )}
            >
              {x}
              {i === 0 && (
                <span className="ml-1.5 rounded-full bg-coral px-1.5 py-0.5 text-[9px] text-paper">
                  {ipos.filter((p) => p.status === "open").length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {shown.map((ipo, i) => (
            <IpoCard key={ipo.id} ipo={ipo} i={i} />
          ))}
        </div>

        <p className="rise mt-5 text-center text-xs text-muted-foreground" style={{ "--i": 6 } as React.CSSProperties}>
          IPO ≠ guaranteed listing gains. Wise checks the fundamentals first.
        </p>
      </div>
    </Screen>
  )
}

function IpoCard({ ipo, i }: { ipo: Ipo; i: number }) {
  const { ipoApplied, ipoNotified, notifyIpo } = useStore()
  const applied = ipoApplied.includes(ipo.id)
  const notified = ipoNotified.includes(ipo.id)
  return (
    <div
      className="rise rounded-2xl bg-paper p-4"
      style={{ "--i": 1 + i } as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        <TickerLogo ticker={ipo.ticker} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{ipo.name}</p>
          <p className="text-xs text-muted-foreground">{ipo.dates}</p>
        </div>
        {ipo.gmp && (
          <span className="rounded-full bg-mint2 px-2.5 py-1 text-[10px] font-bold text-growwise">
            GMP {ipo.gmp}
          </span>
        )}
        {ipo.status === "closed" && (
          <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground">
            Listed
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-muted px-3.5 py-2.5 text-xs">
        <span className="text-muted-foreground">Price band</span>
        <span className="tabular font-bold">{ipo.band}</span>
        <span className="text-muted-foreground">Lot</span>
        <span className="font-bold">{ipo.lot}</span>
      </div>
      {ipo.status === "open" &&
        (applied ? (
          <p className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-mint2 py-2.5 text-xs font-bold text-growwise">
            <Icon name="check" size={14} /> Applied · allotment pending
          </p>
        ) : (
          <ApplySheet ipo={ipo} />
        ))}
      {ipo.status === "upcoming" &&
        (notified ? (
          <p className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-mint2 py-2.5 text-xs font-bold text-growwise">
            <Icon name="bell" size={13} /> Notified when it opens
          </p>
        ) : (
          <button
            type="button"
            onClick={() => notifyIpo(ipo.id)}
            className="press mt-3 w-full rounded-full bg-muted py-2.5 text-xs font-bold text-muted-foreground"
          >
            Notify me
          </button>
        ))}
    </div>
  )
}

function ApplySheet({ ipo }: { ipo: Ipo }) {
  const { applyIpo } = useStore()
  const [lots, setLots] = useState(1)
  const [done, setDone] = useState(false)
  const [open, setOpen] = useState(false)
  const top = parseInt(ipo.band.split("–")[1]?.replace(/[₹,]/g, "") || "0", 10)
  const lotQty = parseInt(ipo.lot, 10) || 0
  const est = top * lotQty * lots

  return (
    <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) setDone(false) }}>
      <SheetTrigger className="press mt-3 w-full rounded-full bg-ink py-2.5 font-heading text-xs font-bold text-paper">
        Apply
      </SheetTrigger>
      <SheetContent side="bottom" className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8">
        <SheetHeader className="px-0">
          <SheetTitle className="font-heading text-lg font-extrabold">
            {done ? "Application placed" : `Apply · ${ipo.name}`}
          </SheetTitle>
        </SheetHeader>
        {done ? (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-mint2 text-growwise">
              <Icon name="check" size={26} />
            </span>
            <p className="mt-3 text-sm font-bold">{lots} lot{lots > 1 ? "s" : ""} · {inr(est)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Amount blocked via UPI until allotment
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <span className="text-xs font-bold text-muted-foreground">Lots ({ipo.lot})</span>
              <div className="flex items-center gap-3">
                <button type="button" aria-label="Fewer lots" onClick={() => setLots((l) => Math.max(1, l - 1))} className="press flex size-8 items-center justify-center rounded-full bg-paper shadow-sm">
                  <Icon name="minus" size={14} />
                </button>
                <span className="tabular w-6 text-center font-heading text-lg font-extrabold">{lots}</span>
                <button type="button" aria-label="More lots" onClick={() => setLots((l) => Math.min(3, l + 1))} className="press flex size-8 items-center justify-center rounded-full bg-paper shadow-sm">
                  <Icon name="plus" size={14} />
                </button>
              </div>
            </div>
            <div className="mt-3 flex justify-between rounded-2xl bg-muted px-4 py-3 text-sm">
              <span className="text-muted-foreground">At cutoff {ipo.band.split("–")[1]}</span>
              <span className="tabular font-bold">{inr(est)}</span>
            </div>
            <button
              type="button"
              onClick={() => { applyIpo(ipo.id); setDone(true) }}
              className="press mt-4 h-12 w-full rounded-full bg-growwise font-heading text-sm font-bold text-paper"
            >
              Apply via UPI
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
