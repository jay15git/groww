"use client"

import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { sectors } from "@/lib/data"
import { cn, pct } from "@/lib/utils"
import type React from "react"

export default function Sectors() {
  const sorted = [...sectors].sort((a, b) => b.change - a.change)
  const max = Math.max(...sectors.map((s) => Math.abs(s.change)))
  return (
    <Screen className="bg-ink">
      <ScreenHeader title="All sectors" dark />
      <div className="px-5 pb-8">
        <p className="rise mt-2 text-xs text-paper/45" style={{ "--i": 0 } as React.CSSProperties}>
          Sorted by today&rsquo;s price change
        </p>
        <div className="rise mt-4 flex flex-col divide-y divide-paper/8 rounded-2xl bg-paper/5 px-4" style={{ "--i": 1 } as React.CSSProperties}>
          {sorted.map((s) => (
            <div key={s.id} className="flex items-center gap-3 py-3.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-paper/8 text-paper/70">
                <Icon name={s.icon} size={16} />
              </span>
              <p className="flex-1 text-sm font-bold text-paper">{s.name}</p>
              <span
                className={cn("h-1.5 rounded-full", s.change >= 0 ? "bg-growwise" : "bg-coral")}
                style={{ width: (Math.abs(s.change) / max) * 56 + 8 }}
              />
              <span className={cn("tabular w-16 text-right text-sm font-bold", s.change >= 0 ? "text-growwise" : "text-[#ff8a8a]")}>
                {pct(s.change)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
