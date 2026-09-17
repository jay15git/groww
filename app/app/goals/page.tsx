"use client"

import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { GoalIcon } from "@/components/goal-icon"
import { goals } from "@/lib/data"
import { inr } from "@/lib/utils"
import type React from "react"

export default function Goals() {
  const total = goals.reduce((s, g) => s + g.saved, 0)
  return (
    <Screen nav>
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between pt-1">
          <h1 className="font-heading text-2xl font-extrabold tracking-tight">
            Next Moves
          </h1>
          <button type="button" aria-label="Add goal" className="press flex size-10 items-center justify-center rounded-full bg-paper shadow-sm">
            <Icon name="plus" size={18} />
          </button>
        </div>

        <section className="rise mt-4 rounded-3xl bg-cobalt p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs uppercase tracking-wider text-paper/60">
            Saved across goals
          </p>
          <p className="tabular mt-1 font-heading text-[36px] font-extrabold leading-none tracking-tight">
            {inr(total, { decimals: 2 })}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-paper/80">
            <Icon name="up2" size={14} /> On track for 2 of 3 goals
          </p>
        </section>

        <div className="mt-4 flex flex-col gap-3">
          {goals.map((g, i) => {
            const pc = Math.round((g.saved / g.target) * 100)
            return (
              <div
                key={g.id}
                className="rise rounded-2xl bg-paper p-4"
                style={{ "--i": 1 + i } as React.CSSProperties}
              >
                <div className="flex items-center gap-3.5">
                  <GoalIcon goal={g} />
                  <div className="flex-1">
                    <p className="font-heading text-[15px] font-bold">{g.name}</p>
                    <p className="tabular text-xs text-muted-foreground">
                      {inr(g.saved)} of {inr(g.target)}
                    </p>
                  </div>
                  <span className="tabular font-heading text-lg font-extrabold">
                    {pc}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-lime"
                    style={{ width: `${pc}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <button type="button" className="press rise mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-line font-heading text-sm font-bold text-muted-foreground" style={{ "--i": 4 } as React.CSSProperties}>
          <Icon name="plus" size={16} /> New goal
        </button>
      </div>
    </Screen>
  )
}
