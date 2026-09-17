"use client"

import Link from "next/link"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { usePersona, useStore } from "@/lib/store"
import type React from "react"

const sections: { group: string; items: { label: string; sub?: string; icon: IconName; href: string }[] }[] = [
  {
    group: "Activity",
    items: [
      { label: "Orders", sub: "Buy/sell history", icon: "receipt", href: "/markets" },
      { label: "IPO bids", sub: "Applications & allotments", icon: "rocket", href: "/ipo" },
      { label: "Watchlist", sub: "Stocks you're tracking", icon: "bookmark", href: "/watchlist" },
      { label: "SIPs", sub: "Active monthly plans", icon: "calendar", href: "/mutual-funds" },
    ],
  },
  {
    group: "GrowWise",
    items: [
      { label: "Autopilot", sub: "Income-rhythm investing rules", icon: "refresh", href: "/autopilot" },
      { label: "Goals", sub: "What your money is for", icon: "target", href: "/goals" },
      { label: "Portfolio DNA", sub: "Your investor archetype", icon: "brain", href: "/dna" },
      { label: "Wrapped", sub: "90-day milestones", icon: "award", href: "/wrapped" },
      { label: "Money Trail", sub: "Where every rupee goes", icon: "package", href: "/trail" },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Reports & statements", sub: "P&L, tax, contract notes", icon: "fileVerified", href: "/profile" },
      { label: "Bank & UPI", sub: "Linked accounts", icon: "bank", href: "/add-money" },
      { label: "Help & support", sub: "FAQs, tickets", icon: "help", href: "/wise" },
    ],
  },
]

export default function Profile() {
  const p = usePersona()
  const { profile, reset, orders, sips, ipoApplied } = useStore()

  return (
    <Screen>
      <ScreenHeader title="Account" />
      <div className="px-5 pb-8">
        <section className="rise mt-2 flex items-center gap-3.5 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="flex size-14 items-center justify-center rounded-full bg-lilac font-heading text-lg font-extrabold text-ink">
            {p.name.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-lg font-extrabold leading-tight">{p.name}</p>
            <p className="text-xs text-paper/55">
              {profile.situationLabel || p.label} · {p.city}
            </p>
          </div>
          <Link href="/persona" className="press rounded-full bg-paper/10 px-3 py-1.5 text-xs font-bold text-paper">
            Edit
          </Link>
        </section>

        <section className="rise mt-3 flex items-center gap-3 rounded-2xl bg-mint2 p-4" style={{ "--i": 1 } as React.CSSProperties}>
          <Icon name="badgeCheck" size={20} className="text-growwise" />
          <div className="flex-1">
            <p className="text-sm font-bold">KYC verified</p>
            <p className="text-xs text-muted-foreground">Demo account · full access enabled</p>
          </div>
        </section>

        <section className="rise mt-3 grid grid-cols-3 gap-2.5" style={{ "--i": 2 } as React.CSSProperties}>
          {[
            { label: "Orders", value: orders.length },
            { label: "SIPs", value: sips.length },
            { label: "IPO bids", value: ipoApplied.length },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-paper p-3.5 text-center">
              <p className="tabular font-heading text-xl font-extrabold">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        {sections.map((sec, si) => (
          <div key={sec.group} className="rise mt-5" style={{ "--i": 3 + si } as React.CSSProperties}>
            <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {sec.group}
            </h2>
            <div className="mt-2 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4">
              {sec.items.map((it) => (
                <Link key={it.label} href={it.href} className="press flex items-center gap-3 py-3.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-muted text-ink/70">
                    <Icon name={it.icon} size={16} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold">{it.label}</span>
                    {it.sub && <span className="block text-xs text-muted-foreground">{it.sub}</span>}
                  </span>
                  <Icon name="next" size={14} className="text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={reset}
          className="press rise mt-5 flex w-full items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 text-left text-loss"
          style={{ "--i": 7 } as React.CSSProperties}
        >
          <Icon name="trash" size={16} />
          <span className="flex-1 text-sm font-bold">Reset demo data</span>
        </button>

        <p className="rise mt-5 text-center text-[11px] text-muted-foreground" style={{ "--i": 8 } as React.CSSProperties}>
          GrowWise · concept demo
        </p>
      </div>
    </Screen>
  )
}
