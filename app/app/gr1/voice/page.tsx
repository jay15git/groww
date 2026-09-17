"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { cn } from "@/lib/utils"
import type React from "react"

const stages = ["Listening…", "Thinking…", "Answering…"]
const bars = [10, 22, 34, 18, 42, 26, 14, 36, 20, 30, 12, 24]

export default function GR1Voice() {
  const [stage, setStage] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % stages.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <Screen dark className="bg-ink">
      <ScreenHeader
        title="GR-1 Voice"
        dark
        onBack={() => router.push("/gr1")}
        right={
          <Link
            href="/gr1"
            aria-label="Switch to chat"
            className="press flex size-10 items-center justify-center rounded-full bg-paper/10 text-paper"
          >
            <Icon name="chat" size={16} />
          </Link>
        }
      />
      <div className="flex min-h-full flex-col items-center justify-center px-8 pb-10 text-center text-paper">
        <div className="rise relative flex items-center justify-center" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="voice-ring absolute size-44 rounded-full bg-lime/10" />
          <span className="voice-ring absolute size-44 rounded-full bg-lime/10" style={{ animationDelay: "1s" }} />
          <span className="flex size-32 items-center justify-center rounded-full bg-lime text-ink">
            <Icon name="aiMic" size={52} />
          </span>
        </div>

        <p className="rise mt-8 font-heading text-xl font-bold" style={{ "--i": 1 } as React.CSSProperties}>
          {stages[stage]}
        </p>
        <p className="rise mt-1.5 text-xs text-paper/50" style={{ "--i": 2 } as React.CSSProperties}>
          Speak in Hindi, English, Hinglish — whatever&rsquo;s natural
        </p>

        <div className="rise mt-8 flex h-10 items-center gap-1" style={{ "--i": 3 } as React.CSSProperties}>
          {bars.map((h, i) => (
            <span
              key={i}
              className={cn("wave-bar w-1 rounded-full bg-lime", stage === 1 && "opacity-30")}
              style={{ height: h, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        <p className="rise mt-6 max-w-60 text-xs leading-relaxed text-paper/40" style={{ "--i": 4 } as React.CSSProperties}>
          &ldquo;Bhaiya, us reel wale stock mein paise daaloon?&rdquo;
        </p>

        <button
          type="button"
          onClick={() => router.push("/gr1")}
          className="press rise mt-10 flex size-14 items-center justify-center rounded-full bg-paper/10 text-paper"
          aria-label="End voice"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          <Icon name="close" size={20} />
        </button>
      </div>
    </Screen>
  )
}
