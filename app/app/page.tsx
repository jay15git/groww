import Link from "next/link"
import { StatusBar } from "@/components/status-bar"
import { Icon } from "@/components/icon"

export default function Onboarding() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-lime">
      <StatusBar />
      <div className="flex flex-1 flex-col px-6 pb-8">
        <div className="flex items-center gap-1.5 pt-1">
          <Icon name="sparkles" size={18} />
          <span className="font-heading text-sm font-bold tracking-tight">
            Groww IRL
          </span>
        </div>

        <div className="rise mt-10 flex justify-center" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="relative flex size-40 items-center justify-center rounded-full bg-ink">
            <div className="flex size-24 items-center justify-center rounded-full bg-lime">
              <div className="size-10 rounded-full bg-ink" />
            </div>
            <span className="absolute -right-1 top-2 size-3 rounded-full bg-ink" />
            <span className="absolute -left-4 bottom-6 size-2.5 rounded-full bg-ink" />
            <span className="absolute -top-3 right-8 text-ink">
              <Icon name="up2" size={26} />
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <h1
            className="rise font-heading text-[42px] font-extrabold leading-[1.05] tracking-tight text-ink"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Your money.
            <br />
            Your next move.
          </h1>
          <p
            className="rise mt-3 text-[15px] leading-relaxed text-ink/70"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Investing that fits real life — students, first jobs, freelance
            chaos.
          </p>

          <div className="rise mt-8 flex flex-col gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <Link
              href="/onboarding"
              className="press flex h-14 items-center justify-center rounded-full bg-ink font-heading text-base font-bold text-paper"
            >
              Create account
            </Link>
            <Link
              href="/today"
              className="press flex h-14 items-center justify-center rounded-full bg-paper font-heading text-base font-bold text-ink"
            >
              Sign in
            </Link>
          </div>

          <p className="rise mt-5 text-center text-xs text-ink/50" style={{ "--i": 4 } as React.CSSProperties}>
            By continuing, you agree to T&C · Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
