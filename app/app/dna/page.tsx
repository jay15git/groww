"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { dna } from "@/lib/data"
import type React from "react"

export default function PortfolioDNA() {
  return (
    <Screen>
      <ScreenHeader title="Portfolio DNA" />
      <div className="px-5 pb-8">
        <section className="rise mt-2 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs uppercase tracking-wider text-paper/50">
            Your investor type
          </p>
          <h1 className="mt-1.5 font-heading text-[28px] font-extrabold leading-tight tracking-tight">
            {dna.title}
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-paper/60">
            {dna.tagline}
          </p>
        </section>

        <h2 className="rise mt-6 font-heading text-base font-bold uppercase tracking-wide text-muted-foreground" style={{ "--i": 1 } as React.CSSProperties}>
          Behaviour, not returns
        </h2>
        <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 2 } as React.CSSProperties}>
          {dna.dims.map((d) => (
            <div key={d.label} className="py-3.5">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-bold">{d.label}</p>
                <span className="tabular text-sm font-extrabold">{d.value}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-groww"
                  style={{ width: `${d.value}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{d.note}</p>
            </div>
          ))}
        </div>

        <h2 className="rise mt-6 font-heading text-base font-bold uppercase tracking-wide text-muted-foreground" style={{ "--i": 3 } as React.CSSProperties}>
          Closest archetypes
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {dna.archetypes.map((a, i) => (
            <div
              key={a.name}
              className="rise rounded-2xl bg-paper p-4"
              style={{ "--i": 4 + i } as React.CSSProperties}
            >
              <p className="tabular font-heading text-xl font-extrabold">
                {a.match}%
              </p>
              <p className="mt-0.5 text-xs font-semibold text-muted-foreground">
                {a.name}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/gr1"
          className="press rise mt-5 flex items-center gap-3 rounded-2xl bg-ink p-4 text-paper"
          style={{ "--i": 8 } as React.CSSProperties}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-lime text-ink">
            <Icon name="sparkles" size={18} />
          </span>
          <div className="flex-1">
            <p className="font-heading text-sm font-bold">Ask GR-1 about this</p>
            <p className="text-xs text-paper/60">
              Why am I a Curious Builder? What would change it?
            </p>
          </div>
          <Icon name="next" size={16} className="text-paper/60" />
        </Link>
      </div>
    </Screen>
  )
}
