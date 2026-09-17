"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { optionChains } from "@/lib/data"
import { cn, inr } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

export default function OptionChain() {
  const { id } = useParams<{ id: string }>()
  const { placeOrder } = useStore()
  const chain = optionChains[id] ?? optionChains.nifty50
  const [placed, setPlaced] = useState<string | null>(null)

  const atm = chain.strikes.reduce((best, s) =>
    Math.abs(s.strike - chain.spot) < Math.abs(best - chain.spot) ? s.strike : best
  , chain.strikes[0].strike)

  const trade = (side: "CE" | "PE", strike: number, ltp: number, kind: "BUY" | "SELL") => {
    const key = `${side}-${strike}-${kind}`
    placeOrder({
      name: `${chain.underlying} ${strike} ${side}`,
      kind,
      product: "Intraday",
      qty: chain.lotSize,
      price: ltp,
    })
    setPlaced(key)
    setTimeout(() => setPlaced(null), 1600)
  }

  return (
    <Screen className="bg-ink">
      <ScreenHeader title={chain.underlying} dark />
      <div className="px-5 pb-8">
        <div className="rise mt-1 flex items-end justify-between" style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <p className="tabular font-heading text-2xl font-extrabold text-paper">
              {inr(chain.spot, { decimals: 2 })}
            </p>
            <p className="mt-0.5 text-xs text-paper/45">
              Expiry {chain.expiry} · Lot {chain.lotSize}
            </p>
          </div>
          <span className="rounded-full bg-paper/8 px-3 py-1.5 text-[11px] font-bold text-paper/70">
            Weekly
          </span>
        </div>

        {/* Column headers */}
        <div className="rise mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center" style={{ "--i": 1 } as React.CSSProperties}>
          <p className="text-[11px] font-bold uppercase tracking-wide text-growwise">Calls</p>
          <p className="w-16 text-[11px] font-bold uppercase tracking-wide text-paper/45">Strike</p>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#ff8a8a]">Puts</p>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 text-center text-[10px] text-paper/40">
          <p>LTP · OI (L)</p>
          <p />
          <p>LTP · OI (L)</p>
        </div>

        <div className="mt-2 flex flex-col gap-1.5">
          {chain.strikes.map((s, i) => {
            const isAtm = s.strike === atm
            return (
              <div
                key={s.strike}
                className={cn(
                  "rise grid grid-cols-[1fr_auto_1fr] items-stretch gap-2",
                )}
                style={{ "--i": 2 + i } as React.CSSProperties}
              >
                {/* CE */}
                <div className={cn("rounded-xl bg-paper/5 px-3 py-2.5", isAtm && "ring-1 ring-lime/40")}>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => trade("CE", s.strike, s.ceLtp, "BUY")}
                      className="press flex size-6 items-center justify-center rounded-full bg-growwise/15 text-[10px] font-bold text-growwise"
                      aria-label={`Buy ${s.strike} CE`}
                    >
                      B
                    </button>
                    <p className="tabular text-sm font-bold text-paper">{s.ceLtp}</p>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className={cn("tabular font-bold", s.ceChg >= 0 ? "text-growwise" : "text-[#ff8a8a]")}>
                      {s.ceChg >= 0 ? "+" : ""}{s.ceChg}%
                    </span>
                    <span className="tabular text-paper/40">{s.ceOi}L</span>
                  </div>
                </div>

                {/* Strike */}
                <div className={cn("flex w-16 items-center justify-center rounded-xl text-[11px] font-bold", isAtm ? "bg-lime text-ink" : "bg-paper/8 text-paper/70")}>
                  {s.strike.toLocaleString("en-IN")}
                </div>

                {/* PE */}
                <div className={cn("rounded-xl bg-paper/5 px-3 py-2.5", isAtm && "ring-1 ring-lime/40")}>
                  <div className="flex items-center justify-between">
                    <p className="tabular text-sm font-bold text-paper">{s.peLtp}</p>
                    <button
                      type="button"
                      onClick={() => trade("PE", s.strike, s.peLtp, "BUY")}
                      className="press flex size-6 items-center justify-center rounded-full bg-growwise/15 text-[10px] font-bold text-growwise"
                      aria-label={`Buy ${s.strike} PE`}
                    >
                      B
                    </button>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className="tabular text-paper/40">{s.peOi}L</span>
                    <span className={cn("tabular font-bold", s.peChg >= 0 ? "text-growwise" : "text-[#ff8a8a]")}>
                      {s.peChg >= 0 ? "+" : ""}{s.peChg}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {placed && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-lime px-4 py-2 text-xs font-bold text-ink shadow-lg">
            <span className="flex items-center gap-1.5">
              <Icon name="check" size={14} /> Order placed — see Orders
            </span>
          </div>
        )}

        <p className="mt-5 text-center text-[11px] leading-relaxed text-paper/35">
          ATM strike highlighted. B = buy 1 lot ({chain.lotSize} qty) at LTP.
        </p>
      </div>
    </Screen>
  )
}
