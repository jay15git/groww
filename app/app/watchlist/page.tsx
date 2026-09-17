"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { TickerLogo } from "@/components/goal-icon"
import { watchlist } from "@/lib/data"
import { cn } from "@/lib/utils"
import type React from "react"

export default function Watchlist() {
  return (
    <Screen dark className="bg-ink">
      <ScreenHeader title="Watchlist" dark action="plus" actionLabel="Add to watchlist" />
      <div className="px-5 pb-8 text-paper">
        <div className="rise mt-2 flex items-center gap-2 rounded-full bg-paper/5 px-4 py-3" style={{ "--i": 0 } as React.CSSProperties}>
          <Icon name="search" size={16} className="text-paper/40" />
          <span className="text-sm text-paper/40">Search NSE / BSE…</span>
        </div>

        <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 1 } as React.CSSProperties}>
          {watchlist.map((w, i) => (
            <Link key={i} href={`/stocks/${w.name === "HDFC Bank" ? "hdfc" : w.name.toLowerCase()}`} className="press flex items-center gap-3 py-3.5">
              <TickerLogo ticker={w.ticker} dark />
              <div className="flex-1">
                <p className="text-sm font-bold">{w.name}</p>
                <p className="text-xs text-paper/45">{w.meta}</p>
              </div>
              <div className="text-right">
                <p className="tabular text-sm font-bold">{w.price}</p>
                <p className={cn("tabular text-xs font-bold", w.change >= 0 ? "text-groww" : "text-[#ff8a8a]")}>
                  {w.change >= 0 ? "▲" : "▼"} {Math.abs(w.change)}%
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="rise mt-4 text-center text-xs text-paper/35" style={{ "--i": 2 } as React.CSSProperties}>
          Watching doesn&rsquo;t mean buying. GR-1 can check any of these.
        </p>
      </div>
    </Screen>
  )
}
