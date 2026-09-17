import { cn } from "@/lib/utils"

export function Sparkline({
  data,
  className,
  color = "#00b386",
  type = "line",
  width = 64,
  height = 28,
}: {
  data: number[]
  className?: string
  color?: string
  type?: "line" | "bars"
  width?: number
  height?: number
}) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  if (type === "bars") {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={className}
        aria-hidden
      >
        {data.map((v, i) => {
          const bw = width / data.length
          const h = Math.max(3, ((v - min) / range) * (height - 4))
          return (
            <rect
              key={i}
              x={i * bw + bw * 0.22}
              y={height - h}
              width={bw * 0.56}
              height={h}
              rx={2}
              fill={color}
              opacity={0.25 + (0.75 * (i + 1)) / data.length}
            />
          )
        })}
      </svg>
    )
  }

  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - 3 - ((v - min) / range) * (height - 6),
  ])
  const d = pts
    .map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`))
    .join(" ")
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AreaChart({
  data,
  className,
  color = "#00b386",
  negative = false,
  height = 140,
}: {
  data: number[]
  className?: string
  color?: string
  negative?: boolean
  height?: number
}) {
  const w = 340
  const h = height
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 14 - ((v - min) / range) * (h - 28),
  ])
  const line = pts
    .map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`))
    .join(" ")
  const area = `${line} L ${w},${h} L 0,${h} Z`
  const c = negative ? "#d94a4a" : color
  const gid = `g-${negative ? "n" : "p"}-${height}`
  const last = pts[pts.length - 1]
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("w-full", className)}
      style={{ height }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.24" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke={c}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r={4} fill={c} />
      <circle cx={last[0]} cy={last[1]} r={8} fill={c} opacity={0.2} />
    </svg>
  )
}
