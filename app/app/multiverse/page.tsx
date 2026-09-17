"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { futures } from "@/lib/data"
import { cn } from "@/lib/utils"
import type React from "react"

const tint = { lime: "bg-lime", sand: "bg-sand", lilac: "bg-lilac" }

export default function Multiverse() {
  const [picked, setPicked] = useState("A")
  return (
    <Screen>
      <ScreenHeader title="Money Multiverse" action="sparkles" actionLabel="Ask Wise" actionHref="/wise" />
      <div className="flex min-h-full flex-col px-5 pb-8">
        <p className="rise mt-2 text-sm text-muted-foreground" style={{ "--i": 0 } as React.CSSProperties}>
          Same you. Different futures. Pick one to live in.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {futures.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setPicked(f.id)}
              aria-pressed={picked === f.id}
              className={cn(
                "press rise rounded-3xl border-2 p-5 text-left transition-all",
                tint[f.tone],
                f.featured && "min-h-44",
                picked === f.id ? "border-ink" : "border-transparent"
              )}
              style={{ "--i": 1 + i } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-paper">
                  Future {f.id}
                </span>
                <Icon name={f.featured ? "rocket" : "chart"} size={20} className="text-ink" />
              </div>
              <h2
                className={cn(
                  "mt-3 font-heading font-extrabold leading-tight tracking-tight text-ink",
                  f.featured ? "text-2xl" : "text-lg"
                )}
              >
                {f.title}
              </h2>
              <p className="tabular mt-1.5 text-sm font-bold text-ink/80">
                {f.amount}
              </p>
              <p className="mt-1 text-xs text-ink/60">{f.detail}</p>
            </button>
          ))}
        </div>

        <p className="rise mt-4 text-[11px] leading-relaxed text-muted-foreground" style={{ "--i": 4 } as React.CSSProperties}>
          All numbers are ranges, not promises. Assumptions inside each future.
        </p>

        <div className="mt-auto pt-6">
          <Link
            href="/autopilot"
            className="press flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink font-heading text-base font-bold text-paper"
          >
            Build my plan on Future {picked}
            <Icon name="next" size={18} />
          </Link>
        </div>
      </div>
    </Screen>
  )
}
