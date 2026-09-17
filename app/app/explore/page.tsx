"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { Sparkline } from "@/components/chart"
import { indices, movers } from "@/lib/data"
import type React from "react"

const mood = [
  { label: "Bears", value: 38 },
  { label: "Bulls", value: 62 },
]

export default function Explore() {
  return (
    <Screen nav>
      <div className="px-5 pb-6">
        <h1 className="pt-1 font-heading text-2xl font-extrabold tracking-tight">
          Explore
        </h1>

        <section className="rise mt-4 flex overflow-hidden rounded-3xl" style={{ "--i": 0 } as React.CSSProperties}>
          {mood.map((m, i) => (
            <div
              key={m.label}
              className={i === 0 ? "bg-ink p-4 text-paper" : "bg-lime p-4 text-ink"}
              style={{ flex: m.value }}
            >
              <p className="tabular font-heading text-xl font-extrabold">
                {m.value}%
              </p>
              <p className="text-xs font-medium opacity-70">{m.label}</p>
            </div>
          ))}
        </section>
        <p className="rise mt-1.5 text-xs text-muted-foreground" style={{ "--i": 1 } as React.CSSProperties}>
          Market mood today · {movers.length} things worth a look
        </p>

        <div className="rise mt-5 grid grid-cols-2 gap-2.5" style={{ "--i": 2 } as React.CSSProperties}>
          {indices.map((ix) => (
            <Link
              href="/markets"
              key={ix.name}
              className="press rounded-2xl bg-paper p-3.5"
            >
              <p className="text-[11px] font-semibold text-muted-foreground">
                {ix.name}
              </p>
              <p className="tabular mt-0.5 font-heading text-[15px] font-bold">
                {ix.value}
              </p>
              <div className="mt-1.5 flex items-end justify-between">
                <span
                  className={
                    ix.change >= 0
                      ? "tabular text-xs font-bold text-groww"
                      : "tabular text-xs font-bold text-loss"
                  }
                >
                  {ix.change >= 0 ? "+" : "−"}
                  {Math.abs(ix.change)}%
                </span>
                <Sparkline
                  data={ix.spark}
                  width={56}
                  height={20}
                  color={ix.change >= 0 ? "#00b386" : "#d94a4a"}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="rise mt-7 flex items-center justify-between" style={{ "--i": 3 } as React.CSSProperties}>
          <h2 className="font-heading text-base font-bold uppercase tracking-wide text-muted-foreground">
            What moved today
          </h2>
          <Link href="/markets" className="text-xs font-semibold text-groww">
            Markets
          </Link>
        </div>

        <div className="mt-3 flex flex-col gap-2.5">
          {movers.map((m, i) => (
            <article
              key={m.id}
              className="rise rounded-2xl bg-paper p-4"
              style={{ "--i": 4 + i } as React.CSSProperties}
            >
              <span className="rounded-md bg-sand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/70">
                {m.tag}
              </span>
              <h3 className="mt-2 font-heading text-[15px] font-bold leading-snug">
                {m.headline}
              </h3>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{m.meta}</span>
                <Link
                  href="/reality-check"
                  className="press flex items-center gap-1 rounded-full bg-mint2 px-2.5 py-1 text-[11px] font-bold text-ink"
                >
                  <Icon name="shield" size={12} /> Reality Check
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/mutual-funds"
          className="press rise mt-6 flex items-center justify-between rounded-2xl bg-ink p-4 text-paper"
          style={{ "--i": 8 } as React.CSSProperties}
        >
          <div>
            <p className="font-heading text-sm font-bold">Mutual funds</p>
            <p className="text-xs text-paper/60">
              SIPs, ELSS tax savers, index funds
            </p>
          </div>
          <span className="flex size-9 items-center justify-center rounded-full bg-lime text-ink">
            <Icon name="next" size={16} />
          </span>
        </Link>
      </div>
    </Screen>
  )
}
