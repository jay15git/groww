"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"
import { navTabs } from "@/lib/data"

export function BottomNav() {
  const pathname = usePathname()
  return (
    <div className="pointer-events-none sticky bottom-0 z-40 mt-auto w-full px-4 pb-4 pt-6">
      <nav
        aria-label="Primary"
        className="nav-capsule pointer-events-auto flex items-center justify-between rounded-full bg-ink px-3 py-2"
      >
        <div className="flex flex-1 items-center justify-between pr-2">
          {navTabs.map((t) => {
            const active = pathname === t.href
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-item flex min-w-14 flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[10px] font-medium",
                  active ? "text-lime" : "text-[#7d877f] hover:text-paper"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full",
                    active && "bg-lime/15"
                  )}
                >
                  <Icon name={t.icon} size={20} />
                </span>
                {t.label}
              </Link>
            )
          })}
        </div>
        <Link
          href="/wise"
          aria-label="Ask Wise"
          className="nav-item flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-ink shadow-[0_4px_14px_rgba(200,240,77,0.4)]"
        >
          <Icon name="sparkles" size={22} />
        </Link>
      </nav>
    </div>
  )
}
