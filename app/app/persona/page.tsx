"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { personas, type Persona } from "@/lib/data"
import { useStore } from "@/lib/store"
import type React from "react"

const personaIcons: Record<Persona, IconName> = {
  student: "grad",
  salaried: "briefcase",
  freelancer: "invoice",
}

const personaDetail: Record<Persona, string> = {
  student: "₹6,000/mo allowance · ₹1,200 safe to invest",
  salaried: "₹52,000/mo salary · ₹8,400 safe to invest",
  freelancer: "₹18–62k/mo, varies · ₹4,200 safe to invest",
}

export default function PersonaPage() {
  const router = useRouter()
  const { persona, setPersona, setProfile } = useStore()
  const current = persona ?? "student"

  const pick = (id: Persona) => {
    setPersona(id)
    setProfile({ name: personas[id].name, situationLabel: personas[id].label })
    router.push("/today")
  }

  return (
    <Screen>
      <ScreenHeader title="Demo context" />
      <div className="flex min-h-full flex-col px-6 pb-8">
        <p className="rise mt-2 text-sm leading-relaxed text-muted-foreground" style={{ "--i": 0 } as React.CSSProperties}>
          Prototype switcher — the same app, re-tuned for three income lives.
          Plans, numbers and copy change; your goals and orders stay.
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          {(Object.values(personas)).map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => pick(p.id)}
              aria-pressed={current === p.id}
              className={cn(
                "press rise flex items-center gap-3.5 rounded-2xl border bg-paper p-4 text-left transition-colors",
                current === p.id
                  ? "border-ink bg-mint2"
                  : "border-line/60"
              )}
              style={{ "--i": 1 + i } as React.CSSProperties}
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-paper text-ink shadow-sm">
                <Icon name={personaIcons[p.id]} size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-heading text-[15px] font-bold">
                  {p.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {personaDetail[p.id]}
                </span>
              </span>
              {current === p.id && (
                <span className="flex size-5 items-center justify-center rounded-full bg-ink text-lime">
                  <Icon name="tick" size={11} />
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="rise mt-5 flex items-start gap-2.5 rounded-2xl bg-sand p-4" style={{ "--i": 5 } as React.CSSProperties}>
          <Icon name="info" size={16} className="mt-0.5 shrink-0 text-ink" />
          <p className="text-xs leading-relaxed text-ink/80">
            In production this is one profile, not a switcher — onboarding reads
            your income rhythm and adapts. This page exists so reviewers can see
            all three contexts.
          </p>
        </div>

        <div className="mt-auto pt-6">
          <Link
            href="/onboarding"
            className="press flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ink font-heading text-sm font-bold text-paper"
          >
            <Icon name="refresh" size={16} /> Run full onboarding again
          </Link>
        </div>
      </div>
    </Screen>
  )
}
