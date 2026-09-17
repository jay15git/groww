import { cn } from "@/lib/utils"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Screen({
  children,
  dark = false,
  nav = false,
  scroll = true,
  className,
  statusDark,
}: {
  children: React.ReactNode
  dark?: boolean
  nav?: boolean
  scroll?: boolean
  className?: string
  statusDark?: boolean
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <StatusBar dark={statusDark ?? dark} />
      {scroll ? (
        <ScrollArea className="min-h-0 flex-1">
          <div className={cn("min-h-full", className)}>{children}</div>
        </ScrollArea>
      ) : (
        <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
          {children}
        </div>
      )}
      {nav && <BottomNav />}
    </div>
  )
}
