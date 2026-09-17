"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"
import { ScreenHeader } from "@/components/screen-header"
import { chatScript, gr1Fallback, gr1Replies, type ChatMsg } from "@/lib/data"
import { cn } from "@/lib/utils"
import type React from "react"

const chips = ["Check this reel", "Can I afford Goa?", "Why is my portfolio red?"]

function replyFor(text: string): string {
  for (const [re, msg] of gr1Replies) if (re.test(text)) return msg
  return gr1Fallback
}

export default function GR1Chat() {
  const [msgs, setMsgs] = useState<ChatMsg[]>(chatScript.default)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msgs, thinking])

  const send = (text: string) => {
    if (!text.trim() || thinking) return
    setMsgs((m) => [...m, { id: `u-${Date.now()}`, from: "user", text }])
    setInput("")
    setThinking(true)
    setTimeout(() => {
      setMsgs((m) => [...m, { id: `g-${Date.now()}`, from: "gr1", text: replyFor(text) }])
      setThinking(false)
    }, 900)
  }

  return (
    <Screen>
      <ScreenHeader
        title="GR-1"
        onBack={() => router.push("/today")}
        right={
          <Link
            href="/gr1/voice"
            aria-label="Switch to voice"
            className="press flex size-10 items-center justify-center rounded-full bg-ink text-lime"
          >
            <Icon name="mic" size={17} />
          </Link>
        }
      />

      <div className="screen flex flex-1 flex-col px-5 pb-4">
        <div className="rise mt-2 flex flex-col gap-3">
          {msgs.map((m) =>
            m.from === "user" ? (
              <div key={m.id} className="rise ml-auto max-w-[80%] rounded-3xl rounded-br-md bg-ink px-4 py-2.5 text-sm text-paper">
                {m.text}
              </div>
            ) : m.card === "receipt" ? (
              <button
                key={m.id}
                type="button"
                onClick={() => router.push("/receipt")}
                className="press rise mr-auto w-full rounded-3xl border border-ink/15 bg-paper p-4 text-left shadow-[3px_3px_0_0_#101915]"
              >
                <div className="flex items-center gap-2">
                  <Icon name="receipt" size={16} />
                  <p className="font-heading text-sm font-bold">Decision Receipt</p>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.text}</p>
                <p className="mt-2 font-heading text-xs font-bold text-groww">Review →</p>
              </button>
            ) : (
              <div key={m.id} className="rise mr-auto flex max-w-[88%] gap-2.5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Icon name="sparkles" size={14} />
                </span>
                <div className={cn(
                  "rounded-3xl rounded-tl-md px-4 py-2.5 text-sm leading-relaxed",
                  m.card === "split" ? "bg-mint2 text-ink" : "bg-paper text-ink"
                )}>
                  {m.text}
                  {m.card === "split" && (
                    <span className="mt-2 flex gap-2">
                      <span className="rounded-lg bg-paper px-2 py-1 text-[10px] font-bold">₹1,500 → buffer</span>
                      <span className="rounded-lg bg-ink px-2 py-1 text-[10px] font-bold text-lime">₹3,500 → invest</span>
                    </span>
                  )}
                </div>
              </div>
            )
          )}
          {thinking && (
            <div className="mr-auto flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-lime text-ink">
                <Icon name="sparkles" size={14} />
              </span>
              <div className="flex gap-1 rounded-3xl rounded-tl-md bg-paper px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="typing-dot size-1.5 rounded-full bg-ink/40" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => send(c)}
                className="press shrink-0 rounded-full border border-ink/10 bg-paper px-3.5 py-1.5 text-xs font-bold text-ink"
              >
                {c}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <div className="flex flex-1 items-center gap-2 rounded-full bg-paper px-4 py-3 shadow-sm">
              <Icon name="attach" size={16} className="text-muted-foreground" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask GR-1 anything…"
                aria-label="Message GR-1"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              aria-label="Send"
              className="press flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-lime"
            >
              <Icon name="sent" size={18} />
            </button>
          </form>
        </div>
      </div>
    </Screen>
  )
}
