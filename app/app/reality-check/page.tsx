"use client"

import Link from "next/link"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { realityClaim } from "@/lib/data"
import { cn } from "@/lib/utils"
import type React from "react"

const toneStyles: Record<string, { chip: string; icon: IconName }> = {
  good: { chip: "bg-mint2 text-ink", icon: "check" },
  info: { chip: "bg-lilac text-ink", icon: "search" },
  warn: { chip: "bg-butter text-ink", icon: "fire" },
  bad: { chip: "bg-loss/10 text-loss", icon: "alert" },
}

export default function RealityCheck() {
  return (
    <Screen>
      <ScreenHeader
        title="Reality Check"
        right={
          <span className="flex h-10 items-center gap-1.5 rounded-full bg-lime px-3.5 font-heading text-xs font-bold text-ink">
            <Icon name="sparkles" size={14} /> GR-1
          </span>
        }
      />
      <div className="px-5 pb-8">
        <section className="rise mt-3 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-2 text-xs text-paper/60">
            <Icon name="play" size={14} className="text-lime" />
            <span>
              {realityClaim.handle} · {realityClaim.kind} · {realityClaim.views}
            </span>
          </div>
          <p className="mt-3 font-heading text-lg font-bold leading-snug">
            {realityClaim.claim}
          </p>
        </section>

        <div className="mt-4 flex flex-col gap-2.5">
          {realityClaim.checks.map((c, i) => {
            const t = toneStyles[c.tone]
            return (
              <div
                key={c.id}
                className="rise flex items-start gap-3.5 rounded-2xl bg-paper p-4"
                style={{ "--i": 1 + i } as React.CSSProperties}
              >
                <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", t.chip)}>
                  <Icon name={t.icon} size={18} />
                </span>
                <div>
                  <p className="font-heading text-[15px] font-bold">{c.label}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <Link
          href="/multiverse"
          className="press rise mt-5 flex h-14 items-center justify-center gap-2 rounded-full bg-lime font-heading text-base font-bold text-ink"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          What if I had invested?
          <Icon name="next" size={18} />
        </Link>

        <p className="rise mt-4 text-center text-[11px] text-muted-foreground" style={{ "--i": 6 } as React.CSSProperties}>
          {realityClaim.sources}
        </p>
      </div>
    </Screen>
  )
}
