"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { personas, type Persona } from "@/lib/data"
import { useStore } from "@/lib/store"

const personaIcons: Record<Persona, IconName> = {
  student: "grad",
  salaried: "briefcase",
  freelancer: "invoice",
}

export default function PersonaPage() {
  const router = useRouter()
  const { setPersona } = useStore()
  const [selected, setSelected] = useState<Persona | null>(null)

  return (
    <Screen>
      <div className="flex min-h-full flex-col px-6 pb-8">
        <div className="flex items-center gap-1.5 pt-1">
          <span className="font-heading text-base font-bold tracking-tight">
            groww
          </span>
          <span className="rounded-md bg-lime px-1.5 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wide">
            IRL
          </span>
        </div>

        <div className="rise mt-6 overflow-hidden rounded-3xl bg-acid" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex h-36 items-center justify-center">
            <div className="relative flex size-24 items-center justify-center">
              <Icon name="piggy" size={88} strokeWidth={1.4} className="text-ink" />
              <span className="absolute -right-3 top-1 rotate-12 text-ink"><Icon name="coins" size={22} /></span>
              <span className="absolute -left-4 bottom-2 -rotate-12 text-ink"><Icon name="banknote" size={20} /></span>
              <span className="absolute -top-2 left-0 text-ink"><Icon name="sparkles" size={18} /></span>
            </div>
          </div>
        </div>

        <h1 className="rise mt-7 font-heading text-[34px] font-extrabold leading-[1.08] tracking-tight" style={{ "--i": 1 } as React.CSSProperties}>
          Investing that gets your life.
        </h1>
        <p className="rise mt-2 text-sm leading-relaxed text-muted-foreground" style={{ "--i": 2 } as React.CSSProperties}>
          Plans built around hostel budgets, first salaries and freelance chaos —
          not boring fund lists.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {(Object.values(personas)).map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              aria-pressed={selected === p.id}
              className={cn(
                "press rise flex items-center gap-3.5 rounded-2xl border bg-paper p-4 text-left transition-colors",
                selected === p.id
                  ? "border-ink shadow-[3px_3px_0_0_#101915]"
                  : "border-transparent"
              )}
              style={{ "--i": 3 + i } as React.CSSProperties}
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-mint2 text-ink">
                <Icon name={personaIcons[p.id]} size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-heading text-[15px] font-bold">
                  {p.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {p.tag}
                </span>
              </span>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border transition-colors",
                  selected === p.id
                    ? "border-ink bg-ink text-lime"
                    : "border-line"
                )}
              >
                {selected === p.id && <Icon name="tick" size={12} />}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <button
            type="button"
            disabled={!selected}
            onClick={() => {
              if (!selected) return
              setPersona(selected)
              router.push("/today")
            }}
            className={cn(
              "press flex h-14 w-full items-center justify-center gap-2 rounded-full font-heading text-base font-bold transition-colors",
              selected
                ? "bg-ink text-lime"
                : "bg-ink/10 text-muted-foreground"
            )}
          >
            Pick your vibe
            <Icon name="next" size={18} />
          </button>
        </div>
      </div>
    </Screen>
  )
}
