import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"
import type { Goal } from "@/lib/data"

const goalIcons: Record<Goal["icon"], IconName> = {
  laptop: "laptop",
  plane: "plane",
  shield: "shieldPlain",
}

const tints: Record<Goal["tint"], string> = {
  mint: "bg-mint2",
  butter: "bg-butter",
  lilac: "bg-lilac",
}

export function GoalIcon({
  goal,
  size = "md",
}: {
  goal: Goal
  size?: "sm" | "md"
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-2xl text-ink",
        tints[goal.tint],
        size === "md" ? "size-11" : "size-9"
      )}
    >
      <Icon name={goalIcons[goal.icon]} size={size === "md" ? 20 : 16} />
    </span>
  )
}

export function TickerLogo({
  ticker,
  className,
  dark = false,
}: {
  ticker: string
  className?: string
  dark?: boolean
}) {
  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center rounded-full font-heading text-sm font-bold",
        dark ? "bg-paper/10 text-paper" : "bg-ink/5 text-ink",
        className
      )}
    >
      {ticker}
    </span>
  )
}
