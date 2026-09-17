import { cn } from "@/lib/utils"
import { BottomNav } from "@/components/bottom-nav"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Screen({
  children,
  nav = false,
  scroll = true,
  className,
}: {
  children: React.ReactNode
  nav?: boolean
  scroll?: boolean
  className?: string
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
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
