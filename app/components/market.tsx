"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { TickerLogo } from "@/components/goal-icon"
import { Sparkline } from "@/components/chart"
import { indices } from "@/lib/data"
import { cn, inr, pct } from "@/lib/utils"
import type React from "react"

/* GrowWise-style product-home header: logo dot, title, search, avatar */
export function MarketHeader({
  title,
  light = false,
}: {
  title: string
  light?: boolean
}) {
  return (
    <header
      className={cn(
        "flex items-center justify-between px-5 pb-1 pt-1",
        light ? "text-ink" : "text-paper"
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-lime">
          <Icon name="up2" size={18} className="text-ink" />
        </span>
        <h1 className="font-heading text-lg font-extrabold tracking-tight">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/search"
          aria-label="Search"
          className={cn(
            "press flex size-10 items-center justify-center rounded-full",
            light ? "text-ink" : "text-paper"
          )}
        >
          <Icon name="search" size={20} />
        </Link>
        <Link
          href="/profile"
          aria-label="Profile"
          className="press flex size-9 items-center justify-center rounded-full bg-lilac font-heading text-[13px] font-bold text-ink"
        >
          J
        </Link>
      </div>
    </header>
  )
}

/* Horizontal scrolling index chips (NIFTY, SENSEX…) — dark */
export function IndexStrip() {
  return (
    <div className="mt-2 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
      {indices.map((i) => (
        <div
          key={i.name}
          className="flex shrink-0 items-center gap-2.5 rounded-full bg-paper/5 py-2 pl-4 pr-3"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-paper/50">
              {i.name}
            </p>
            <p className="tabular text-xs font-bold text-paper">{i.value}</p>
          </div>
          <span
            className={cn(
              "tabular rounded-full px-2 py-0.5 text-[10px] font-bold",
              i.change >= 0
                ? "bg-growwise/15 text-growwise"
                : "bg-loss/15 text-[#ff8a8a]"
            )}
          >
            {pct(i.change)}
          </span>
        </div>
      ))}
    </div>
  )
}

/* Underline sub-tab bar */
export function SubTabs({
  tabs,
  active,
  onChange,
  light = false,
}: {
  tabs: string[]
  active: number
  onChange: (i: number) => void
  light?: boolean
}) {
  return (
    <div
      className={cn(
        "mt-2 flex gap-6 overflow-x-auto border-b px-5 [scrollbar-width:none]",
        light ? "border-line/60" : "border-paper/10"
      )}
    >
      {tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={active === i}
          onClick={() => onChange(i)}
          className={cn(
            "shrink-0 pb-2.5 text-sm",
            active === i
              ? light
                ? "border-b-2 border-ink font-heading font-bold text-ink"
                : "border-b-2 border-lime font-heading font-bold text-paper"
              : light
                ? "font-medium text-muted-foreground"
                : "font-medium text-paper/45"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export function SectionTitle({
  title,
  sub,
  action,
  href,
  i = 0,
}: {
  title: string
  sub?: string
  action?: string
  href?: string
  i?: number
}) {
  return (
    <div
      className="rise mt-6 flex items-end justify-between"
      style={{ "--i": i } as React.CSSProperties}
    >
      <div>
        <h2 className="font-heading text-base font-bold text-paper">{title}</h2>
        {sub && <p className="mt-0.5 text-xs text-paper/45">{sub}</p>}
      </div>
      {action &&
        (href ? (
          <Link
            href={href}
            className="press flex items-center gap-1 text-xs font-semibold text-paper/60"
          >
            {action} <Icon name="next" size={12} />
          </Link>
        ) : (
          <span className="text-xs font-semibold text-paper/60">{action}</span>
        ))}
    </div>
  )
}

/* 2×2 grid tile — dark */
export function StockTile({
  ticker,
  name,
  price,
  change,
  changeAbs,
  href,
  i = 0,
}: {
  ticker: string
  name: string
  price: number
  change: number
  changeAbs?: number
  href: string
  i?: number
}) {
  return (
    <Link
      href={href}
      className="press rise rounded-2xl bg-paper/5 p-3.5"
      style={{ "--i": i } as React.CSSProperties}
    >
      <TickerLogo ticker={ticker} dark className="size-9 text-xs" />
      <p className="mt-2.5 truncate text-sm font-bold text-paper">{name}</p>
      <p className="tabular mt-1.5 text-sm font-bold text-paper">
        {inr(price, { decimals: 2 })}
      </p>
      <p
        className={cn(
          "tabular mt-0.5 text-xs font-bold",
          change >= 0 ? "text-growwise" : "text-[#ff8a8a]"
        )}
      >
        {changeAbs !== undefined
          ? `${change >= 0 ? "+" : "−"}${inr(Math.abs(changeAbs), { decimals: 2 }).slice(1)} (${pct(change)})`
          : pct(change)}
      </p>
    </Link>
  )
}

/* List row — dark */
export function StockRow({
  ticker,
  name,
  meta,
  price,
  change,
  changeAbs,
  href,
  right,
  i = 0,
}: {
  ticker: string
  name: string
  meta?: string
  price?: number
  change?: number
  changeAbs?: number
  href?: string
  right?: React.ReactNode
  i?: number
}) {
  const inner = (
    <>
      <TickerLogo ticker={ticker} dark className="size-9 text-xs" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-paper">{name}</p>
        {price !== undefined && (
          <p className="tabular mt-0.5 text-xs text-paper/60">
            {inr(price, { decimals: 2 })}{" "}
            {change !== undefined && (
              <span
                className={cn(
                  "font-bold",
                  change >= 0 ? "text-growwise" : "text-[#ff8a8a]"
                )}
              >
                {change >= 0 ? "+" : "−"}
                {changeAbs !== undefined
                  ? inr(Math.abs(changeAbs), { decimals: 2 }).slice(1)
                  : ""}{" "}
                ({pct(change)})
              </span>
            )}
          </p>
        )}
        {meta && !price && (
          <p className="mt-0.5 text-xs text-paper/45">{meta}</p>
        )}
      </div>
      {right}
    </>
  )
  const cls = "press rise flex items-center gap-3 py-3"
  const style = { "--i": i } as React.CSSProperties
  return href ? (
    <Link href={href} className={cls} style={style}>
      {inner}
    </Link>
  ) : (
    <div className={cls} style={style}>{inner}</div>
  )
}

/* Sparkline card for index grid on F&O */
export function IndexCard({ i, idx }: { i: number; idx: (typeof indices)[number] }) {
  return (
    <div
      className="rise min-w-40 shrink-0 rounded-2xl bg-paper/5 p-3.5"
      style={{ "--i": i } as React.CSSProperties}
    >
      <p className="text-[11px] font-semibold text-paper/50">{idx.name}</p>
      <p className="tabular mt-0.5 font-heading text-sm font-bold text-paper">
        {idx.value}
      </p>
      <div className="mt-1 flex items-end justify-between">
        <span
          className={cn(
            "tabular text-[11px] font-bold",
            idx.change >= 0 ? "text-growwise" : "text-[#ff8a8a]"
          )}
        >
          {pct(idx.change)}
        </span>
        <Sparkline
          data={idx.spark}
          width={48}
          height={18}
          color={idx.change >= 0 ? "#00b386" : "#d94a4a"}
        />
      </div>
    </div>
  )
}

/* Mini chart art for trading-screen cards */
export function PatternGlyph({ pattern }: { pattern: string }) {
  const g = "#00b386"
  const r = "#ff7657"
  return (
    <svg viewBox="0 0 120 56" className="h-14 w-full" aria-hidden>
      {pattern === "breakout" && (
        <>
          <line x1="8" y1="18" x2="112" y2="18" stroke="#f6f1e7" strokeOpacity=".35" strokeDasharray="4 4" />
          <path d="M8 44 C 26 44, 26 16, 44 16 S 62 44, 80 44 S 98 10, 112 10" fill="none" stroke={g} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="112" cy="10" r="4" fill={g} />
        </>
      )}
      {pattern === "rsi-high" && (
        <>
          {[14, 34, 54, 74, 94].map((x, i) => (
            <rect key={x} x={x} y={[38, 30, 14, 26, 34][i]} width="12" height={56 - [38, 30, 14, 26, 34][i]} rx="2" fill={i === 2 ? r : "#8a948c"} opacity={i === 2 ? 1 : 0.5} />
          ))}
          <path d="M14 40 C 44 8, 74 6, 110 22" fill="none" stroke={r} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        </>
      )}
      {pattern === "macd" && (
        <>
          {[10, 24, 38, 52, 66, 80, 94].map((x, i) => (
            <rect key={x} x={x} y={i < 4 ? 30 - i * 4 : 26} width="9" height={i < 4 ? 26 + i * 4 : 30} rx="2" fill={i < 4 ? g : r} opacity={i < 4 ? 0.9 : 0.6} />
          ))}
          <path d="M8 46 C 40 40, 70 34, 112 14" fill="none" stroke="#f6f1e7" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {pattern === "rsi-low" && (
        <>
          {[14, 40, 66, 92].map((x, i) => (
            <rect key={x} x={x} y={[34, 40, 16, 26][i]} width="14" height={56 - [34, 40, 16, 26][i]} rx="2" fill={i === 2 ? g : "#8a948c"} opacity={i === 2 ? 1 : 0.5} />
          ))}
          <path d="M8 42 C 40 50, 70 44, 112 12" fill="none" stroke={g} strokeWidth="2" strokeLinecap="round" />
          <circle cx="66" cy="44" r="4" fill={g} />
        </>
      )}
    </svg>
  )
}
