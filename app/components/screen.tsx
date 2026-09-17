import { cn } from "@/lib/utils"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"

export function Screen({
  children,
  dark = false,
  nav = false,
  className,
  statusDark,
}: {
  children: React.ReactNode
  dark?: boolean
  nav?: boolean
  className?: string
  statusDark?: boolean
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <StatusBar dark={statusDark ?? dark} />
      <div className={cn("screen flex-1", className)}>{children}</div>
      {nav && <BottomNav />}
    </div>
  )
}
