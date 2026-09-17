import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-12 shrink-0 items-end justify-between px-6 pb-1.5 pt-3",
        dark ? "text-paper" : "text-ink"
      )}
    >
      <span className="tabular text-[13px] font-semibold leading-none">
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        <Icon name="signal" size={14} />
        <Icon name="wifi" size={14} />
        <Icon name="battery" size={18} />
      </div>
    </div>
  )
}
