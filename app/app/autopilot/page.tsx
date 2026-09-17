"use client"

import { useRouter } from "next/navigation"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { Switch } from "@/components/ui/switch"
import { usePersona, useStore } from "@/lib/store"
import type React from "react"

type Row = { key: "pctMode" | "bufferFirst" | "hardCap" | "pause"; label: string; sub: string; icon: IconName; toggle: boolean }

export default function Autopilot() {
  const p = usePersona()
  const { autopilot, setAutopilot } = useStore()
  const router = useRouter()

  const rows: Row[] = [
    { key: "pctMode", label: "Percentage mode", sub: "Invests % of each payment, never a fixed SIP", icon: "percent", toggle: true },
    { key: "bufferFirst", label: "Buffer first", sub: "Emergency fund stays topped up before investing", icon: "shield", toggle: true },
    { key: "hardCap", label: `Hard cap · ₹${autopilot.cap.toLocaleString("en-IN")}`, sub: "Never more than this in a month", icon: "circle", toggle: true },
    { key: "pause", label: "Pause anytime", sub: "One tap. No lock-in, no guilt trip", icon: "pause", toggle: false },
  ]

  return (
    <Screen>
      <ScreenHeader
        title="Autopilot"
        right={
          <span className="flex h-10 items-center rounded-full bg-paper px-3.5 font-heading text-xs font-bold shadow-sm">
            {p.label}
          </span>
        }
      />
      <div className="flex min-h-full flex-col px-5 pb-8">
        <section className="rise mt-3 rounded-3xl bg-ink p-5 text-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-wider text-lime">
            When money arrives
          </p>
          <h2 className="mt-2 font-heading text-[28px] font-extrabold leading-tight tracking-tight">
            {p.autopilotLine}
          </h2>
          <p className="mt-1.5 text-xs text-paper/60">{p.autopilotSub}</p>
        </section>

        <div className="mt-4 flex flex-col gap-2.5">
          {rows.map((r, i) => (
            <div
              key={r.key}
              className="rise flex items-center gap-3.5 rounded-2xl bg-paper p-4"
              style={{ "--i": 1 + i } as React.CSSProperties}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-ink">
                <Icon name={r.icon} size={18} />
              </span>
              <div className="flex-1">
                <p className="font-heading text-[15px] font-bold">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.sub}</p>
              </div>
              {r.toggle ? (
                <Switch
                  checked={autopilot[r.key as "pctMode" | "bufferFirst" | "hardCap"]}
                  onCheckedChange={(v) => setAutopilot({ [r.key]: v })}
                  aria-label={r.label}
                  className="data-[checked]:bg-lime [&_[data-slot=switch-thumb]]:bg-ink"
                />
              ) : (
                <span className="text-muted-foreground">
                  <Icon name="pause" size={18} />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => {
              setAutopilot({ on: true })
              router.push("/receipt")
            }}
            className="press flex h-14 w-full items-center justify-center rounded-full bg-lime font-heading text-base font-bold text-ink"
          >
            Turn on autopilot
          </button>
        </div>
      </div>
    </Screen>
  )
}
