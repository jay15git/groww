"use client"

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { squad } from "@/lib/data"
import { cn } from "@/lib/utils"
import type React from "react"

export default function Squad() {
  const pctChallenge = Math.round((squad.challenge.progress / squad.challenge.total) * 100)
  const [copied, setCopied] = useState(false)
  return (
    <Screen nav>
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between pt-1">
          <h1 className="font-heading text-2xl font-extrabold tracking-tight">
            Squad
          </h1>
          <Sheet>
            <SheetTrigger aria-label="Invite to squad" className="press flex size-10 items-center justify-center rounded-full bg-paper shadow-sm">
              <Icon name="plus" size={18} />
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
            >
              <SheetHeader className="px-0">
                <SheetTitle className="font-heading text-lg font-extrabold">
                  Invite to {squad.name}
                </SheetTitle>
              </SheetHeader>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Members join to learn together — streaks, challenges, Reality
                Checks. Money stays individual. Always.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-muted px-4 py-3.5">
                <span className="flex-1 font-heading text-sm font-bold tracking-wide">
                  growwise.in/squad/B27-XK4
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1500)
                  }}
                  className="press flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-lime"
                >
                  <Icon name={copied ? "tick" : "copy"} size={13} />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <section className="rise mt-4 rounded-3xl bg-cobalt p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs uppercase tracking-wider text-paper/60">
            {squad.name} · 4 members
          </p>
          <p className="mt-2 font-heading text-2xl font-extrabold leading-tight">
            Learning together.
            <br />
            Investing stays solo.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-paper/70">
            Squads share streaks, quizzes and wins — never pooled money. Your
            investments stay 100% yours.
          </p>
        </section>

        <section className="rise mt-3 rounded-2xl bg-paper p-4" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-mango/30">
                <Icon name="fire" size={16} className="text-ink" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold">
                  {squad.challenge.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Day {squad.challenge.progress} of {squad.challenge.total}
                </p>
              </div>
            </div>
            <span className="tabular text-sm font-extrabold text-ink">
              {pctChallenge}%
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-mango" style={{ width: `${pctChallenge}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {squad.challenge.reward}
          </p>
        </section>

        <h2 className="rise mt-6 font-heading text-base font-bold uppercase tracking-wide text-muted-foreground" style={{ "--i": 2 } as React.CSSProperties}>
          Consistency board
        </h2>
        <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 3 } as React.CSSProperties}>
          {squad.members.map((m, i) => (
            <div key={m.name} className="flex items-center gap-3 py-3.5">
              <span className="font-heading text-xs font-bold text-muted-foreground">
                {i + 1}
              </span>
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-xs font-bold",
                  i === 0 ? "bg-lime text-ink" : "bg-muted text-ink"
                )}
              >
                {m.initials}
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold">{m.name}</p>
                <p className="text-xs text-muted-foreground">
                  {m.streak}-week streak
                </p>
              </div>
              <span className="tabular text-sm font-bold text-growwise">
                {m.delta}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/wise"
          className="press rise mt-4 flex items-center gap-3 rounded-2xl bg-ink p-4 text-paper"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-lime text-ink">
            <Icon name="sparkles" size={18} />
          </span>
          <div className="flex-1">
            <p className="font-heading text-sm font-bold">Squad doubt?</p>
            <p className="text-xs text-paper/60">
              Ask Wise — answers you can share, sources included
            </p>
          </div>
          <Icon name="next" size={16} className="text-paper/60" />
        </Link>
      </div>
    </Screen>
  )
}
