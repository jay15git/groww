"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  experiences,
  firstGoals,
  rhythms,
  situations,
} from "@/lib/data"
import { useStore, type Profile } from "@/lib/store"
import { cn } from "@/lib/utils"
import type React from "react"

const steps = ["You", "Money life", "Rhythm", "First move"]

export default function Onboarding() {
  const router = useRouter()
  const { completeOnboarding } = useStore()
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [situationId, setSituationId] = useState("")
  const [rhythm, setRhythm] = useState("")
  const [firstGoal, setFirstGoal] = useState("")
  const [experience, setExperience] = useState("")

  const situation = situations.find((s) => s.id === situationId)
  const canNext =
    step === 0
      ? name.trim().length >= 2
      : step === 1
        ? !!situation
        : step === 2
          ? !!rhythm
          : !!firstGoal && !!experience

  const finish = () => {
    if (!situation) return
    const profile: Profile = {
      name: name.trim(),
      situationId: situation.id,
      situationLabel: situation.label,
      rhythm: rhythms.find((r) => r.id === rhythm)?.label ?? "",
      firstGoal: firstGoals.find((g) => g.id === firstGoal)?.label ?? "",
      experience: experiences.find((e) => e.id === experience)?.label ?? "",
    }
    completeOnboarding(profile, situation.persona)
    router.push("/today")
  }

  const pickSituation = (id: string) => {
    setSituationId(id)
    const s = situations.find((x) => x.id === id)
    if (s) setRhythm(s.rhythmHint)
  }

  return (
    <Screen scroll={false}>
      <div className="flex min-h-0 flex-1 flex-col px-6 pb-6">
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            aria-label="Back"
            onClick={() => (step === 0 ? router.push("/") : setStep(step - 1))}
            className="press flex size-10 items-center justify-center rounded-full bg-paper text-ink shadow-sm"
          >
            <Icon name="back" size={18} />
          </button>
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <span
                key={s}
                aria-hidden
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === step ? "w-6 bg-ink" : i < step ? "w-1.5 bg-ink" : "w-1.5 bg-ink/15"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              completeOnboarding(
                { ...profile0, name: "Anaya" },
                "student"
              )
              router.push("/today")
            }}
            className="press text-xs font-semibold text-muted-foreground"
          >
            Skip
          </button>
        </div>

        <ScrollArea className="mt-6 min-h-0 flex-1">
        <div key={step} className="page-enter flex flex-col">
          {step === 0 && (
            <>
              <h1 className="font-heading text-[30px] font-extrabold leading-tight tracking-tight">
                First — what should we call you?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Shows up on your Today screen and receipts.
              </p>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                autoFocus
                className="mt-6 h-14 rounded-2xl border-line bg-paper px-4 font-heading text-lg font-bold shadow-sm"
              />
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="font-heading text-[30px] font-extrabold leading-tight tracking-tight">
                What does money look like for you, {name.trim() || "friend"}?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                This tunes your plan. Pick the closest — you can change it later.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                {situations.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => pickSituation(s.id)}
                    aria-pressed={situationId === s.id}
                    className={cn(
                      "press rise flex items-center gap-3.5 rounded-2xl border bg-paper p-3.5 text-left transition-colors",
                      situationId === s.id
                        ? "border-ink bg-mint2"
                        : "border-line/60"
                    )}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper text-ink shadow-sm">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-heading text-sm font-bold">
                        {s.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {s.sub}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full border transition-colors",
                        situationId === s.id
                          ? "border-ink bg-ink text-lime"
                          : "border-line"
                      )}
                    >
                      {situationId === s.id && <Icon name="tick" size={11} />}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-heading text-[30px] font-extrabold leading-tight tracking-tight">
                How does money actually show up?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Fixed SIPs break when income zigzags. We adapt either way.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {rhythms.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRhythm(r.id)}
                    aria-pressed={rhythm === r.id}
                    className={cn(
                      "press rise rounded-2xl border bg-paper p-4 text-left transition-colors",
                      rhythm === r.id
                        ? "border-ink bg-mint2"
                        : "border-line/60"
                    )}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <p className="font-heading text-sm font-bold">{r.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.sub}</p>
                  </button>
                ))}
              </div>
              {situation && (
                <p className="rise mt-4 flex items-center gap-2 text-xs text-muted-foreground" style={{ "--i": 5 } as React.CSSProperties}>
                  <Icon name="sparkles" size={14} className="text-growwise" />
                  Guessed from {situation.label.toLowerCase()} — change if wrong.
                </p>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="font-heading text-[30px] font-extrabold leading-tight tracking-tight">
                What&apos;s the first move?
              </h1>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {firstGoals.map((g, i) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setFirstGoal(g.id)}
                    aria-pressed={firstGoal === g.id}
                    className={cn(
                      "press rise rounded-2xl border bg-paper p-4 text-left transition-colors",
                      firstGoal === g.id
                        ? "border-ink bg-mint2"
                        : "border-line/60"
                    )}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="flex size-9 items-center justify-center rounded-xl bg-mint2 text-ink">
                      <Icon name={g.icon} size={16} />
                    </span>
                    <p className="mt-2 font-heading text-sm font-bold">{g.label}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{g.sub}</p>
                  </button>
                ))}
              </div>
              <p className="rise mt-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground" style={{ "--i": 6 } as React.CSSProperties}>
                How much have you invested before?
              </p>
              <div className="rise mt-2 flex flex-col gap-2" style={{ "--i": 7 } as React.CSSProperties}>
                {experiences.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setExperience(e.id)}
                    aria-pressed={experience === e.id}
                    className={cn(
                      "press flex items-center gap-3 rounded-2xl border bg-paper px-4 py-3 text-left transition-colors",
                      experience === e.id
                        ? "border-ink bg-mint2"
                        : "border-line/60"
                    )}
                  >
                    <span className="flex-1">
                      <span className="block text-sm font-bold">{e.label}</span>
                      <span className="block text-xs text-muted-foreground">{e.sub}</span>
                    </span>
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full border",
                        experience === e.id
                          ? "border-ink bg-ink text-lime"
                          : "border-line"
                      )}
                    >
                      {experience === e.id && <Icon name="tick" size={11} />}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        </ScrollArea>

        <button
          type="button"
          disabled={!canNext}
          onClick={() => (step === steps.length - 1 ? finish() : setStep(step + 1))}
          className={cn(
            "press mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full font-heading text-base font-bold transition-colors",
            canNext ? "bg-ink text-lime" : "bg-ink/10 text-muted-foreground"
          )}
        >
          {step === steps.length - 1 ? "Enter GrowWise" : "Continue"}
          <Icon name="next" size={18} />
        </button>
      </div>
    </Screen>
  )
}

const profile0: Profile = {
  name: "Anaya",
  situationId: "student",
  situationLabel: "Student",
  rhythm: "Whenever it comes",
  firstGoal: "A gadget",
  experience: "Brand new",
}
