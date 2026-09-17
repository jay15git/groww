"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Icon, type IconName } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { useStore } from "@/lib/store"
import type React from "react"

const rows: { label: string; icon: IconName; text: string }[] = [
  { label: "Why this", icon: "target", text: "Matches 3-mo goal · low cost · diversified" },
  { label: "Risk", icon: "chart", text: "Medium. Value can fall short-term." },
  { label: "Cost", icon: "percent", text: "0.1% expense ratio · ₹3/yr per ₹1k" },
  { label: "Exit", icon: "exchange", text: "Anytime. Money back in 2–3 days" },
  { label: "Source", icon: "fileVerified", text: "Goal plan · Future A · your ₹4,200 surplus" },
]

export default function Receipt() {
  const { invest } = useStore()
  const router = useRouter()
  const [done, setDone] = useState(false)

  const confirm = () => {
    setDone(true)
    invest()
    setTimeout(() => router.push("/trail"), 1400)
  }

  if (done) {
    return (
      <Screen>
        <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
          <div className="check-anim">
            <svg width={88} height={88} viewBox="0 0 88 88">
              <circle className="check-circle" cx={44} cy={44} r={40} fill="#c8f04d" />
              <path
                className="check-path"
                d="M 30 45 L 40 55 L 60 33"
                fill="none"
                stroke="#101915"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={44}
                strokeDashoffset={44}
                style={{ ["--check-len" as string]: 44 }}
              />
            </svg>
          </div>
          <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight">
            Order placed
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            ₹3,000 · Nifty 50 index fund
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Following your money →
          </p>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <ScreenHeader
        title="Decision Receipt"
        right={
          <button type="button" aria-label="Close" onClick={() => router.back()} className="press flex size-10 items-center justify-center rounded-full bg-paper shadow-sm">
            <Icon name="close" size={16} />
          </button>
        }
      />
      <div className="flex min-h-full flex-col px-5 pb-8">
        <section className="rise mt-3 overflow-hidden rounded-3xl bg-paper" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="p-5 pb-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              You&rsquo;re about to
            </p>
            <h1 className="mt-1.5 font-heading text-[26px] font-extrabold leading-tight tracking-tight">
              Invest ₹3,000
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              toward New laptop · via Nifty 50 index fund
            </p>
          </div>

          <div className="receipt-edge h-4 w-full" />

          <div className="flex flex-col gap-4 px-5 py-4">
            {rows.map((r, i) => (
              <div key={r.label} className="rise flex items-start gap-3" style={{ "--i": 1 + i } as React.CSSProperties}>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-ink">
                  <Icon name={r.icon} size={15} />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold">{r.label}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {r.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="rise mt-3 flex items-start gap-2.5 rounded-2xl bg-mint2 p-3.5" style={{ "--i": 7 } as React.CSSProperties}>
          <Icon name="info" size={16} className="mt-0.5 shrink-0 text-ink" />
          <p className="text-xs leading-relaxed text-ink/80">
            Nothing is guaranteed. This fits your plan, not a promise.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-6">
          <button
            type="button"
            onClick={confirm}
            className="press flex h-14 w-full items-center justify-center rounded-full bg-ink font-heading text-base font-bold text-lime"
          >
            I get it — invest ₹3,000
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="press mx-auto px-4 py-2 text-sm font-semibold text-muted-foreground"
          >
            Not now
          </button>
        </div>
      </div>
    </Screen>
  )
}
