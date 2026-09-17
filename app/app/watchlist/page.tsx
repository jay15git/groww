"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TickerLogo } from "@/components/goal-icon"
import { stocks } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

export default function Watchlist() {
  const { watchIds, toggleWatch, watchlists, addWatchlist } = useStore()
  const [q, setQ] = useState("")
  const [list, setList] = useState(0)
  const [newList, setNewList] = useState("")
  const query = q.trim().toLowerCase()

  const watched = stocks.filter(
    (s) =>
      watchIds.includes(s.id) &&
      (!query || s.name.toLowerCase().includes(query))
  )

  return (
    <Screen className="bg-ink">
      <ScreenHeader
        title="Watchlist"
        dark
        right={
          <Sheet>
            <SheetTrigger
              aria-label="Add to watchlist"
              className="press flex size-10 items-center justify-center rounded-full bg-paper/10 text-paper"
            >
              <Icon name="plus" size={18} />
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
            >
              <SheetHeader className="px-0">
                <SheetTitle className="font-heading text-lg font-extrabold">
                  Add to watchlist
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col divide-y divide-line/60">
                {stocks.map((s) => {
                  const on = watchIds.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleWatch(s.id)}
                      aria-pressed={on}
                      className="press flex items-center gap-3 py-3 text-left"
                    >
                      <TickerLogo ticker={s.ticker} />
                      <span className="flex-1">
                        <span className="block text-sm font-bold">{s.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {s.exchange} · Equity
                        </span>
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-bold",
                          on ? "bg-muted text-muted-foreground" : "bg-ink text-lime"
                        )}
                      >
                        {on ? "Watching" : "Add"}
                      </span>
                    </button>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        }
      />
      <div className="px-5 pb-8 text-paper">
        <div className="rise mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" style={{ "--i": 0 } as React.CSSProperties}>
          {watchlists.map((w, i) => (
            <button
              key={w}
              type="button"
              onClick={() => setList(i)}
              aria-pressed={list === i}
              className={cn(
                "press shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold",
                list === i ? "bg-paper text-ink" : "bg-paper/8 text-paper/60"
              )}
            >
              {w}
            </button>
          ))}
          <Sheet>
            <SheetTrigger className="press flex shrink-0 items-center gap-1 rounded-full bg-paper/8 px-3.5 py-1.5 text-xs font-bold text-paper/60">
              <Icon name="plus" size={12} /> New list
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
            >
              <SheetHeader className="px-0">
                <SheetTitle className="font-heading text-lg font-extrabold">
                  New watchlist
                </SheetTitle>
              </SheetHeader>
              <input
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
                placeholder="e.g. EV bets, Dividend payers"
                aria-label="Watchlist name"
                className="w-full rounded-2xl bg-muted px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                disabled={!newList.trim()}
                onClick={() => {
                  addWatchlist(newList.trim())
                  setNewList("")
                }}
                className="press mt-4 h-12 w-full rounded-full bg-ink font-heading text-sm font-bold text-paper disabled:opacity-40"
              >
                Create list
              </button>
            </SheetContent>
          </Sheet>
        </div>

        <div className="rise mt-3 flex items-center gap-2 rounded-full bg-paper/5 px-4 py-3" style={{ "--i": 1 } as React.CSSProperties}>
          <Icon name="search" size={16} className="text-paper/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your watchlist…"
            aria-label="Search watchlist"
            className="min-w-0 flex-1 bg-transparent text-sm text-paper outline-none placeholder:text-paper/40"
          />
          {q && (
            <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="text-paper/40">
              <Icon name="close" size={14} />
            </button>
          )}
        </div>

        <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 1 } as React.CSSProperties}>
          {watched.map((w) => (
            <Link key={w.id} href={`/stocks/${w.id}`} className="press flex items-center gap-3 py-3.5">
              <TickerLogo ticker={w.ticker} dark />
              <div className="flex-1">
                <p className="text-sm font-bold">{w.name}</p>
                <p className="text-xs text-paper/45">{w.exchange} · Equity</p>
              </div>
              <div className="text-right">
                <p className="tabular text-sm font-bold">{inr(w.price, { decimals: 2 })}</p>
                <p className={cn("tabular text-xs font-bold", w.change >= 0 ? "text-growwise" : "text-[#ff8a8a]")}>
                  {pct(w.change)}
                </p>
              </div>
            </Link>
          ))}
          {watched.length === 0 && (
            <p className="py-6 text-center text-sm text-paper/45">
              {q ? `No matches for “${q}”` : "Nothing watched yet — tap + to add"}
            </p>
          )}
        </div>

        <p className="rise mt-4 text-center text-xs text-paper/35" style={{ "--i": 2 } as React.CSSProperties}>
          Watching doesn&rsquo;t mean buying. Wise can check any of these.
        </p>
      </div>
    </Screen>
  )
}
