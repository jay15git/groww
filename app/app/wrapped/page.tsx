"use client"

import Link from "next/link"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { wrapped } from "@/lib/data"
import { usePersona } from "@/lib/store"
import type React from "react"

const tints = ["bg-lime", "bg-mint2", "bg-butter", "bg-lilac", "bg-sand", "bg-mint"]

export default function Wrapped() {
  const p = usePersona()
  return (
    <Screen>
      <ScreenHeader title="Groww Wrapped" />
      <div className="px-5 pb-8">
        <section className="rise mt-2 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-paper/50">
              {wrapped.period}
            </p>
            <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              {p.name}
            </span>
          </div>
          <h1 className="mt-2 font-heading text-[28px] font-extrabold leading-tight tracking-tight">
            Milestones, not money.
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-paper/60">
            {wrapped.note}
          </p>
        </section>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {wrapped.stats.map((s, i) => (
            <div
              key={s.label}
              className={`rise rounded-2xl p-4 ${tints[i % tints.length]}`}
              style={{ "--i": 1 + i } as React.CSSProperties}
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-ink/10 text-ink">
                <Icon name={s.icon as IconName} size={16} />
              </span>
              <p className="tabular mt-3 font-heading text-2xl font-extrabold text-ink">
                {s.value}
              </p>
              <p className="mt-0.5 text-xs font-semibold leading-snug text-ink/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rise mt-5 flex items-start gap-2.5 rounded-2xl bg-mint2 p-4" style={{ "--i": 7 } as React.CSSProperties}>
          <Icon name="lock" size={16} className="mt-0.5 shrink-0 text-ink" />
          <p className="text-xs leading-relaxed text-ink/80">
            Shareable card hides amounts, holdings, salary and returns. What
            you share is the habit — never the balance.
          </p>
        </div>

        <Link
          href="/squad"
          className="press rise mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ink font-heading text-sm font-bold text-paper"
          style={{ "--i": 8 } as React.CSSProperties}
        >
          <Icon name="share" size={16} /> Share to your squad
        </Link>
      </div>
    </Screen>
  )
}
