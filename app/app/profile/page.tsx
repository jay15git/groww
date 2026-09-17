"use client"

import Link from "next/link"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePersona, useStore } from "@/lib/store"
import { useState, type CSSProperties } from "react"

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
      { label: "Bank & UPI", sub: "Linked accounts", icon: "bank", href: "/add-money" },
      { label: "Help & support", sub: "FAQs, tickets", icon: "help", href: "/wise" },
    ],
  },
]

const reports = ["Contract notes", "P&L statement", "Capital gains (tax)", "Holdings report"]
const consents = [
  { label: "Personalised tips", on: true },
  { label: "Share anonymised stats with squad", on: true },
  { label: "Marketing notifications", on: false },
]

export default function Profile() {
  const p = usePersona()
  const { profile, reset, orders, sips, ipoApplied } = useStore()
  const [consent, setConsent] = useState(consents)

  return (
    <Screen>
      <ScreenHeader title="Account" />
      <div className="px-5 pb-8">
        <section className="rise mt-2 flex items-center gap-3.5 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as CSSProperties}>
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

        <section className="rise mt-3 flex items-center gap-3 rounded-2xl bg-mint2 p-4" style={{ "--i": 1 } as CSSProperties}>
          <Icon name="badgeCheck" size={20} className="text-growwise" />
          <div className="flex-1">
            <p className="text-sm font-bold">KYC verified</p>
            <p className="text-xs text-muted-foreground">Demo account · full access enabled</p>
          </div>
        </section>

        <section className="rise mt-3 grid grid-cols-3 gap-2.5" style={{ "--i": 2 } as CSSProperties}>
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
          <div key={sec.group} className="rise mt-5" style={{ "--i": 3 + si } as CSSProperties}>
            <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {sec.group}
            </h2>
            <div className="mt-2 flex flex-col divide-y divide-line/60 rounded-2xl bg-paper px-4">
              {sec.group === "Account" && (
                <Sheet>
                  <SheetTrigger className="press flex items-center gap-3 py-3.5 text-left">
                    <span className="flex size-9 items-center justify-center rounded-full bg-muted text-ink/70">
                      <Icon name="fileVerified" size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold">Reports & statements</span>
                      <span className="block text-xs text-muted-foreground">P&L, tax, contract notes</span>
                    </span>
                    <Icon name="next" size={14} className="text-muted-foreground" />
                  </SheetTrigger>
                  <SheetContent side="bottom" className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8">
                    <SheetHeader className="px-0">
                      <SheetTitle className="font-heading text-lg font-extrabold">Reports</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2">
                      {reports.map((r) => (
                        <div key={r} className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5">
                          <Icon name="receipt" size={16} className="text-muted-foreground" />
                          <span className="flex-1 text-sm font-bold">{r}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Demo</span>
                        </div>
                      ))}
                      <p className="px-1 text-xs leading-relaxed text-muted-foreground">
                        Downloads are stubbed in the prototype — production would generate real PDFs.
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
              {sec.group === "Account" && (
                <Sheet>
                  <SheetTrigger className="press flex items-center gap-3 py-3.5 text-left">
                    <span className="flex size-9 items-center justify-center rounded-full bg-muted text-ink/70">
                      <Icon name="shield" size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold">Privacy & data</span>
                      <span className="block text-xs text-muted-foreground">Consent controls</span>
                    </span>
                    <Icon name="next" size={14} className="text-muted-foreground" />
                  </SheetTrigger>
                  <SheetContent side="bottom" className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8">
                    <SheetHeader className="px-0">
                      <SheetTitle className="font-heading text-lg font-extrabold">Privacy & data</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2">
                      {consent.map((c, i) => (
                        <button
                          key={c.label}
                          type="button"
                          onClick={() => setConsent((cs) => cs.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
                          aria-pressed={c.on}
                          className="press flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-left"
                        >
                          <span className="flex-1 text-sm font-bold">{c.label}</span>
                          <span className={`flex size-8 items-center justify-center rounded-full text-[10px] font-bold ${c.on ? "bg-ink text-lime" : "bg-paper text-muted-foreground"}`}>
                            {c.on ? "ON" : "OFF"}
                          </span>
                        </button>
                      ))}
                      <p className="px-1 text-xs leading-relaxed text-muted-foreground">
                        GrowWise collects the minimum needed. Wrapped and squads share only what you approve.
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
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

        <Sheet>
          <SheetTrigger
            className="press rise mt-5 flex w-full items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 text-left text-loss"
            style={{ "--i": 7 } as CSSProperties}
          >
            <Icon name="trash" size={16} />
            <span className="flex-1 text-sm font-bold">Reset demo data</span>
          </SheetTrigger>
          <SheetContent side="bottom" className="mx-auto max-w-[430px] rounded-t-3xl border-t-0 px-5 pb-8">
            <SheetHeader className="px-0">
              <SheetTitle className="font-heading text-lg font-extrabold">Reset everything?</SheetTitle>
            </SheetHeader>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This clears your profile, orders, watchlists, SIPs and goals — back to a fresh demo.
            </p>
            <SheetTrigger
              onClick={reset}
              className="press mt-4 flex h-13 w-full items-center justify-center rounded-full bg-loss font-heading text-sm font-bold text-paper"
            >
              Yes, reset demo
            </SheetTrigger>
          </SheetContent>
        </Sheet>

        <p className="rise mt-5 text-center text-[11px] text-muted-foreground" style={{ "--i": 8 } as CSSProperties}>
          GrowWise · concept demo
        </p>
      </div>
    </Screen>
  )
}
