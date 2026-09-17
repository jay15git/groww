"use client"

import { useState } from "react"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { GoalIcon } from "@/components/goal-icon"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { goals as seedGoals, type Goal } from "@/lib/data"
import { cn, inr } from "@/lib/utils"
import { useStore } from "@/lib/store"
import type React from "react"

const iconChoices: { icon: Goal["icon"]; name: IconName; label: string }[] = [
  { icon: "laptop", name: "laptop", label: "Gadget" },
  { icon: "plane", name: "plane", label: "Trip" },
  { icon: "shield", name: "shieldPlain", label: "Buffer" },
]
const tints: Goal["tint"][] = ["mint", "lilac", "butter"]

export default function Goals() {
  const { extraGoals, addGoal } = useStore()
  const goals = [...seedGoals, ...extraGoals]
  const total = goals.reduce((s, g) => s + g.saved, 0)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [target, setTarget] = useState("")
  const [icon, setIcon] = useState<Goal["icon"]>("laptop")

  const valid = name.trim().length >= 2 && Number(target) >= 500

  const create = () => {
    if (!valid) return
    addGoal({
      id: `g-${Date.now()}`,
      name: name.trim(),
      icon,
      saved: 0,
      target: Number(target),
      tint: tints[extraGoals.length % tints.length],
    })
    setName("")
    setTarget("")
    setOpen(false)
  }

  return (
    <Screen nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
        >
          <SheetHeader className="px-0">
            <SheetTitle className="font-heading text-lg font-extrabold">
              New goal
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Goal name — e.g. New bike"
              aria-label="Goal name"
              className="h-12 rounded-xl border-line bg-paper px-4 text-sm font-semibold"
            />
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="Target amount — e.g. 45000"
              aria-label="Target amount in rupees"
              inputMode="numeric"
              className="h-12 rounded-xl border-line bg-paper px-4 text-sm font-semibold"
            />
            <div className="flex gap-2">
              {iconChoices.map((c) => (
                <button
                  key={c.icon}
                  type="button"
                  onClick={() => setIcon(c.icon)}
                  aria-pressed={icon === c.icon}
                  className={cn(
                    "press flex flex-1 flex-col items-center gap-1.5 rounded-xl border bg-paper py-3",
                    icon === c.icon ? "border-ink bg-mint2" : "border-line/60"
                  )}
                >
                  <Icon name={c.name} size={18} />
                  <span className="text-[11px] font-bold">{c.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!valid}
              onClick={create}
              className={cn(
                "press flex h-12 w-full items-center justify-center rounded-full font-heading text-sm font-bold",
                valid ? "bg-ink text-lime" : "bg-ink/10 text-muted-foreground"
              )}
            >
              Create goal
            </button>
            {target && Number(target) < 500 && Number(target) > 0 && (
              <p className="text-center text-xs text-muted-foreground">
                Minimum target is ₹500
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between pt-1">
          <h1 className="font-heading text-2xl font-extrabold tracking-tight">
            Next Moves
          </h1>
          <button
            type="button"
            aria-label="Add goal"
            onClick={() => setOpen(true)}
            className="press flex size-10 items-center justify-center rounded-full bg-paper shadow-sm"
          >
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
            <Icon name="up2" size={14} /> {goals.length} goals · your money stays yours
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

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="press rise mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-line font-heading text-sm font-bold text-muted-foreground"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <Icon name="plus" size={16} /> New goal
        </button>
      </div>
    </Screen>
  )
}
