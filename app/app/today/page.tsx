"use client"

import Link from "next/link"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { GoalIcon } from "@/components/goal-icon"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { goals, notifications } from "@/lib/data"
import { inr } from "@/lib/utils"
import { usePersona, useStore } from "@/lib/store"
import type React from "react"

const quickActions: { label: string; icon: IconName; href: string }[] = [
  { label: "Add", icon: "down", href: "/add-money" },
  { label: "Invest", icon: "up2", href: "/mutual-funds" },
  { label: "Ask Wise", icon: "sparkles", href: "/wise" },
  { label: "More", icon: "more", href: "/markets" },
]

const moves = [
  { icon: "laptop" as IconName, label: "New laptop SIP", meta: "Today · 10:24", amount: -3000 },
  { icon: "invoice" as IconName, label: "Invoice payout · 12% auto", meta: "Yesterday", amount: 8600 },
  { icon: "shieldPlain" as IconName, label: "Emergency buffer refill", meta: "Mon", amount: -1500 },
]

export default function Today() {
  const p = usePersona()
  const { profile, reset, notifSeen, markNotifsSeen, autopilot } = useStore()
  return (
    <Screen nav>
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-xs text-muted-foreground">Good morning</p>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight">
              {p.name}
            </h1>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-mango">
              <Icon name="fire" size={11} /> 12-week streak{autopilot.on ? " · autopilot on" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger
                aria-label="Profile and settings"
                className="press flex size-10 items-center justify-center rounded-full bg-paper text-[13px] font-bold shadow-sm"
              >
                {p.name.slice(0, 2).toUpperCase()}
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
              >
                <SheetHeader className="px-0">
                  <SheetTitle className="font-heading text-lg font-extrabold">
                    {p.name}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  <Link href="/profile" className="press flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-left">
                    <Icon name="receipt" size={18} />
                    <span className="flex-1">
                      <span className="block text-sm font-bold">Full profile</span>
                      <span className="block text-xs text-muted-foreground">
                        Orders, IPO bids, reports, settings
                      </span>
                    </span>
                    <Icon name="next" size={16} className="text-muted-foreground" />
                  </Link>
                  <Link href="/persona" className="press flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-left">
                    <Icon name="user" size={18} />
                    <span className="flex-1">
                      <span className="block text-sm font-bold">
                        {profile.situationLabel || p.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {p.income} · {profile.rhythm || p.incomeNote}
                      </span>
                    </span>
                    <Icon name="next" size={16} className="text-muted-foreground" />
                  </Link>
                  <Link href="/autopilot" className="press flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-left">
                    <Icon name="refresh" size={18} />
                    <span className="flex-1 text-sm font-bold">Autopilot settings</span>
                    <Icon name="next" size={16} className="text-muted-foreground" />
                  </Link>
                  <Link href="/wrapped" className="press flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-left">
                    <Icon name="award" size={18} />
                    <span className="flex-1 text-sm font-bold">GrowWise Wrapped</span>
                    <Icon name="next" size={16} className="text-muted-foreground" />
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="press flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-loss"
                  >
                    <Icon name="trash" size={18} />
                    <span className="flex-1 text-sm font-bold">Reset demo data</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <Sheet onOpenChange={(o) => o && markNotifsSeen()}>
              <SheetTrigger
                aria-label="Notifications"
                className="press relative flex size-10 items-center justify-center rounded-full bg-paper shadow-sm"
              >
                <Icon name="bell" size={18} />
                {!notifSeen && (
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-coral" />
                )}
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8"
              >
                <SheetHeader className="px-0">
                  <SheetTitle className="font-heading text-lg font-extrabold">
                    Notifications
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col divide-y divide-line/60">
                  {notifications.map((n) => (
                    <Link key={n.id} href={n.href} className="press flex items-start gap-3 py-3.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint2 text-ink">
                        <Icon name={n.icon} size={16} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-bold">{n.title}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {n.sub}
                        </span>
                      </span>
                      <span className="tabular text-[11px] text-muted-foreground">{n.time}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <section className="rise mt-4 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-paper/60">Safe to invest</p>
              <p className="tabular mt-1 font-heading text-[40px] font-extrabold leading-none tracking-tight">
                {inr(p.safeToInvest)}
              </p>
              <p className="mt-1.5 text-xs text-paper/60">
                after rent · food · emergency buffer
              </p>
            </div>
            <span className="rounded-full bg-lime/15 px-2.5 py-1 text-[10px] font-semibold text-lime">
              ● this month
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href="/mutual-funds"
              className="press flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-lime font-heading text-sm font-bold text-ink"
            >
              <Icon name="up2" size={16} /> Invest
            </Link>
            <Link
              href="/multiverse"
              className="press flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-paper/10 text-sm font-semibold text-paper"
            >
              <Icon name="chart" size={16} /> Simulate
            </Link>
            <Link
              href="/wise"
              className="press flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-paper/10 text-sm font-semibold text-paper"
            >
              <Icon name="sparkles" size={16} /> Ask Wise
            </Link>
          </div>
        </section>

        <div className="rise mt-4 grid grid-cols-4 gap-2" style={{ "--i": 1 } as React.CSSProperties}>
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="press flex flex-col items-center gap-1.5 rounded-2xl bg-paper py-3"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-muted text-ink">
                <Icon name={a.icon} size={16} />
              </span>
              <span className="text-[10px] font-bold">{a.label}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/reality-check"
          className="press rise mt-3 flex items-center gap-3 rounded-2xl bg-lime p-4"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-ink text-lime">
            <Icon name="shield" size={18} />
          </span>
          <div className="flex-1">
            <p className="font-heading text-sm font-bold text-ink">
              Reality Check
            </p>
            <p className="text-xs text-ink/60">
              Drop a finance reel — Wise checks the hype
            </p>
          </div>
          <Icon name="next" size={18} className="text-ink" />
        </Link>

        <div className="rise mt-7 flex items-center justify-between" style={{ "--i": 3 } as React.CSSProperties}>
          <h2 className="font-heading text-base font-bold uppercase tracking-wide text-muted-foreground">
            Your next moves
          </h2>
          <Link href="/goals" className="text-xs font-semibold text-growwise">
            See all
          </Link>
        </div>

        <div className="mt-3 flex flex-col gap-2.5">
          {goals.slice(0, 2).map((g, i) => {
            const pc = Math.round((g.saved / g.target) * 100)
            return (
              <Link
                href="/goals"
                key={g.id}
                className="press rise flex items-center gap-3.5 rounded-2xl bg-paper p-4"
                style={{ "--i": 4 + i } as React.CSSProperties}
              >
                <GoalIcon goal={g} />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="font-heading text-[15px] font-bold">{g.name}</p>
                    <span className="tabular text-xs font-bold text-growwise">{pc}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-growwise"
                      style={{ width: `${pc}%` }}
                    />
                  </div>
                  <p className="tabular mt-1.5 text-xs text-muted-foreground">
                    {inr(g.saved)} of {inr(g.target)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="rise mt-7 flex items-center justify-between" style={{ "--i": 6 } as React.CSSProperties}>
          <h2 className="font-heading text-base font-bold uppercase tracking-wide text-muted-foreground">
            Recent moves
          </h2>
          <Link href="/trail" className="text-xs font-semibold text-growwise">
            See all
          </Link>
        </div>
        <div className="rise mt-3 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4" style={{ "--i": 7 } as React.CSSProperties}>
          {moves.map((m) => (
            <Link href="/trail" key={m.label} className="press flex items-center gap-3 py-3.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-mint2 text-ink">
                <Icon name={m.icon} size={16} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.meta}</p>
              </div>
              <span
                className={
                  m.amount > 0
                    ? "tabular text-sm font-bold text-growwise"
                    : "tabular text-sm font-semibold text-ink"
                }
              >
                {m.amount > 0 ? `+${inr(m.amount)}` : `−${inr(-m.amount)}`}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Screen>
  )
}
