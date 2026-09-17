"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"

export function ScreenHeader({
  title,
  action,
  actionLabel,
  dark = false,
  onBack,
  right,
}: {
  title?: string
  action?: IconName
  actionLabel?: string
  dark?: boolean
  onBack?: () => void
  right?: React.ReactNode
}) {
  const router = useRouter()
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-3 px-5 pb-2 pt-1",
        dark ? "text-paper" : "text-ink"
      )}
    >
      <button
        type="button"
        aria-label="Back"
        onClick={onBack ?? (() => router.back())}
        className={cn(
          "press flex size-10 items-center justify-center rounded-full",
          dark ? "bg-paper/10 text-paper" : "bg-paper text-ink shadow-sm"
        )}
      >
        <Icon name="back" size={20} />
      </button>
      {title ? (
        <h1 className="font-heading text-base font-bold tracking-tight">
          {title}
        </h1>
      ) : (
        <span />
      )}
      {right ??
        (action ? (
          <button
            type="button"
            aria-label={actionLabel ?? "Action"}
            className={cn(
              "press flex size-10 items-center justify-center rounded-full",
              dark ? "bg-paper/10 text-paper" : "bg-paper text-ink shadow-sm"
            )}
          >
            <Icon name={action} size={18} />
          </button>
        ) : (
          <span className="size-10" />
        ))}
    </header>
  )
}
