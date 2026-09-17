"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"

export function ScreenHeader({
  title,
  action,
  actionLabel,
  actionHref,
  onAction,
  dark = false,
  onBack,
  right,
}: {
  title?: string
  action?: IconName
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  dark?: boolean
  onBack?: () => void
  right?: React.ReactNode
}) {
  const router = useRouter()
  const btnCls = cn(
    "press flex size-10 items-center justify-center rounded-full",
    dark ? "bg-paper/10 text-paper" : "bg-paper text-ink shadow-sm"
  )
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
        className={btnCls}
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
        (action && actionHref ? (
          <Link href={actionHref} aria-label={actionLabel ?? "Action"} className={btnCls}>
            <Icon name={action} size={18} />
          </Link>
        ) : action && onAction ? (
          <button
            type="button"
            aria-label={actionLabel ?? "Action"}
            onClick={onAction}
            className={btnCls}
          >
            <Icon name={action} size={18} />
          </button>
        ) : (
          <span className="size-10" />
        ))}
    </header>
  )
}
