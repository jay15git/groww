import type { IconName } from "@/components/icon"

export type Persona = "student" | "salaried" | "freelancer"

export const personas: Record<
  Persona,
  {
    id: Persona
    label: string
    tag: string
    name: string
    city: string
    income: string
    safeToInvest: number
    incomeNote: string
    autopilotLine: string
    autopilotSub: string
    goalDelta: string
  }
> = {
  student: {
    id: "student",
    label: "Student",
    tag: "Pocket-money friendly",
    name: "Anaya",
    city: "Mumbai",
    income: "₹6,000/mo allowance",
    safeToInvest: 1200,
    incomeNote: "Start with ₹100. Pause anytime.",
    autopilotLine: "₹500 when you can",
    autopilotSub: "Manual nudges, never auto-debit. You're in charge.",
    goalDelta: "Laptop in 14 months",
  },
  salaried: {
    id: "salaried",
    label: "First job",
    tag: "Auto-invest before Swiggy does",
    name: "Arjun",
    city: "Bengaluru",
    income: "₹52,000/mo salary",
    safeToInvest: 8400,
    incomeNote: "Salary hits on the 1st. Invest on the 2nd.",
    autopilotLine: "₹5,000 every month",
    autopilotSub: "Fixed SIP on the 2nd. Pause with one tap.",
    goalDelta: "Laptop in 8 months",
  },
  freelancer: {
    id: "freelancer",
    label: "Freelancer",
    tag: "Percent of every client pay",
    name: "Meera",
    city: "Pune",
    income: "₹18–62k/mo, varies",
    safeToInvest: 4200,
    incomeNote: "Income zigzags. Your plan shouldn't.",
    autopilotLine: "12% of every invoice",
    autopilotSub: "₹0 when you earn ₹0. Capped at ₹6,000/mo.",
    goalDelta: "Laptop in 8 months",
  },
}

export type Goal = {
  id: string
  name: string
  icon: "laptop" | "plane" | "shield"
  saved: number
  target: number
  tint: "mint" | "butter" | "lilac"
}

export const goals: Goal[] = [
  { id: "laptop", name: "New laptop", icon: "laptop", saved: 39600, target: 60000, tint: "mint" },
  { id: "vietnam", name: "Vietnam with the gang", icon: "plane", saved: 9600, target: 24000, tint: "lilac" },
  { id: "buffer", name: "Emergency buffer", icon: "shield", saved: 1500, target: 15000, tint: "butter" },
]

export type Holding = {
  id: string
  ticker: string
  name: string
  meta: string
  value: number
  change: number
  spark: number[]
  kind: "stock" | "etf" | "mf"
}

export const holdings: Holding[] = [
  { id: "nifty50", ticker: "N", name: "NIFTY 50 ETF", meta: "Index · 12 units", value: 26412, change: 1.4, spark: [4, 5, 4.4, 6, 5.6, 7, 7.4, 8], kind: "etf" },
  { id: "hdfc", ticker: "H", name: "HDFC Bank", meta: "Equity · 8 sh", value: 14208, change: -0.8, spark: [8, 7.6, 7.9, 7, 7.4, 6.8, 7.1, 6.6], kind: "stock" },
  { id: "zomato", ticker: "Z", name: "Zomato", meta: "Equity · 40 sh", value: 10184, change: 2.1, spark: [4, 4.6, 5, 4.8, 5.4, 6, 6.2, 7], kind: "stock" },
  { id: "sbi-blue", ticker: "S", name: "SBI Bluechip", meta: "SIP ₹2k/mo", value: 48300, change: 0.9, spark: [5, 5.2, 5.8, 5.5, 6.2, 6, 6.6, 7], kind: "mf" },
]

export type Fund = {
  id: string
  ticker: string
  name: string
  category: string
  nav: number
  day: number
  threeY: number
  minSip: number
  expense: number
  aum: string
  value?: number
  wise: string
}

export const funds: Fund[] = [
  {
    id: "ppf",
    ticker: "P",
    name: "Parag Parikh Flexi Cap",
    category: "Flexi cap",
    nav: 78.42,
    day: 0.8,
    threeY: 34.2,
    minSip: 100,
    expense: 0.63,
    aum: "₹56k Cr",
    value: 6512.4,
    wise: "Good for goals 5+ yrs away. High equity — expect swings.",
  },
  {
    id: "sbi-blue",
    ticker: "S",
    name: "SBI Bluechip",
    category: "Large cap",
    nav: 92.15,
    day: 0.4,
    threeY: 21.6,
    minSip: 500,
    expense: 0.66,
    aum: "₹48k Cr",
    value: 4108.3,
    wise: "Steady large-cap core. Lower drama than mid/small caps.",
  },
  {
    id: "quant-sc",
    ticker: "Q",
    name: "Quant Small Cap",
    category: "Small cap",
    nav: 188.6,
    day: 1.6,
    threeY: 52.4,
    minSip: 1000,
    expense: 0.64,
    aum: "₹11k Cr",
    value: 1811.25,
    wise: "Highest swings here. Only for money you won't need soon.",
  },
  {
    id: "bandhan-sc",
    ticker: "B",
    name: "Bandhan Small Cap",
    category: "Small cap",
    nav: 42.18,
    day: 1.1,
    threeY: 23.9,
    minSip: 100,
    expense: 0.41,
    aum: "₹9.8k Cr",
    wise: "Top 3Y performer — also the widest swings. Small, steady SIPs only.",
  },
  {
    id: "nippon-multi",
    ticker: "N",
    name: "Nippon Multi Asset",
    category: "Multi asset",
    nav: 186.4,
    day: 0.6,
    threeY: 18.24,
    minSip: 100,
    expense: 0.59,
    aum: "₹4.2k Cr",
    wise: "Spreads across equity, gold and debt — smoother ride than pure equity.",
  },
  {
    id: "motilal-mid",
    ticker: "MO",
    name: "Motilal Oswal Midcap",
    category: "Mid cap",
    nav: 112.7,
    day: 0.9,
    threeY: 17.52,
    minSip: 500,
    expense: 0.57,
    aum: "₹26k Cr",
    wise: "Mid-cap growth tilt. Needs a 5+ year horizon to ride out drawdowns.",
  },
  {
    id: "hdfc-mid",
    ticker: "H",
    name: "HDFC Mid Cap",
    category: "Mid cap",
    nav: 198.3,
    day: 0.7,
    threeY: 16.56,
    minSip: 100,
    expense: 0.78,
    aum: "₹76k Cr",
    wise: "Big, seasoned mid-cap fund. Steadier than most in its category.",
  },
  {
    id: "sbi-nifty50",
    ticker: "S",
    name: "SBI Nifty Next 50 Index",
    category: "Index",
    nav: 64.9,
    day: 0.5,
    threeY: 15.7,
    minSip: 500,
    expense: 0.3,
    aum: "₹18k Cr",
    wise: "Cheap index exposure to tomorrow's large caps. Low fee, high beta.",
  },
  {
    id: "sbi-gold",
    ticker: "SG",
    name: "SBI Gold Direct-Growth",
    category: "Gold",
    nav: 28.4,
    day: 0.3,
    threeY: 35.16,
    minSip: 500,
    expense: 0.18,
    aum: "₹6.4k Cr",
    wise: "Gold hedge — zigzags opposite equity. 5–10% of portfolio max.",
  },
  {
    id: "axis-silver",
    ticker: "AS",
    name: "Axis Silver FoF",
    category: "Silver",
    nav: 19.8,
    day: 1.8,
    threeY: 45.18,
    minSip: 100,
    expense: 0.22,
    aum: "₹1.1k Cr",
    wise: "Silver is trending hard — and dropping hard. Satellite position only.",
  },
  {
    id: "hdfc-defence",
    ticker: "HD",
    name: "HDFC Defence",
    category: "Sectoral",
    nav: 34.6,
    day: 1.4,
    threeY: 35.96,
    minSip: 100,
    expense: 0.45,
    aum: "₹5.6k Cr",
    wise: "Single-sector bet on defence. Hot now — treat as a side bet, not core.",
  },
]

export type Stock = {
  id: string
  ticker: string
  name: string
  exchange: string
  price: number
  change: number
  changeAbs: number
  open: number
  prevClose: number
  high: number
  low: number
  mcap: string
  pe: number
  spark: number[]
}

export const stocks: Stock[] = [
  { id: "hdfc", ticker: "H", name: "HDFC Bank", exchange: "NSE", price: 1776.2, change: 0.7, changeAbs: 12.4, open: 1760, prevClose: 1763.8, high: 1782, low: 1748, mcap: "₹13.5L Cr", pe: 19.2, spark: [3, 4, 3.6, 5, 5.4, 6, 5.6, 6.4, 7.2, 6.8, 7.6, 8] },
  { id: "reliance", ticker: "R", name: "Reliance", exchange: "NSE", price: 2912.4, change: 1.4, changeAbs: 40.2, open: 2870, prevClose: 2872.2, high: 2925, low: 2861, mcap: "₹19.7L Cr", pe: 27.4, spark: [4, 4.4, 5, 4.7, 5.5, 6, 6.4, 6, 6.8, 7.4, 7.1, 7.8] },
  { id: "tcs", ticker: "T", name: "TCS", exchange: "NSE", price: 4102.15, change: -0.8, changeAbs: -33, open: 4140, prevClose: 4135.15, high: 4152, low: 4088, mcap: "₹14.8L Cr", pe: 31.2, spark: [7, 6.6, 7, 6.2, 6.6, 6, 6.4, 5.8, 6.1, 5.6, 5.9, 5.4] },
  { id: "infy", ticker: "I", name: "Infosys", exchange: "NSE", price: 1890.55, change: 2.1, changeAbs: 38.9, open: 1852, prevClose: 1851.65, high: 1898, low: 1846, mcap: "₹7.8L Cr", pe: 24.6, spark: [4, 4.5, 4.2, 5, 5.6, 5.2, 6, 6.6, 6.2, 7, 7.5, 7.2] },
  { id: "itc", ticker: "I", name: "ITC", exchange: "NSE", price: 512.3, change: -0.3, changeAbs: -1.6, open: 514, prevClose: 513.9, high: 517, low: 508, mcap: "₹6.4L Cr", pe: 26.8, spark: [6, 5.6, 5.9, 5.4, 5.8, 5.3, 5.6, 5.2, 5.5, 5.1, 5.4, 5] },
  { id: "zomato", ticker: "Z", name: "Zomato", exchange: "NSE", price: 254.6, change: 3.2, changeAbs: 7.9, open: 246, prevClose: 246.7, high: 257, low: 244, mcap: "₹2.2L Cr", pe: 118, spark: [3, 3.6, 4, 3.8, 4.6, 5, 5.4, 5, 5.8, 6.4, 6, 6.8] },
  { id: "patanjali", ticker: "P", name: "Patanjali Foods", exchange: "NSE", price: 365, change: 7.81, changeAbs: 26.45, open: 340, prevClose: 338.55, high: 371, low: 336, mcap: "₹13.2k Cr", pe: 31.4, spark: [3, 3.4, 4.2, 4.8, 5.4, 6.2, 6.8, 7.6] },
  { id: "pbfintech", ticker: "PB", name: "PB Fintech", exchange: "NSE", price: 1827.1, change: 5.25, changeAbs: 91.1, open: 1740, prevClose: 1736, high: 1840, low: 1728, mcap: "₹83k Cr", pe: 212, spark: [4, 4.2, 4.8, 5, 5.8, 6.4, 6.2, 7.2] },
  { id: "maxfin", ticker: "M", name: "Max Financial", exchange: "NSE", price: 1487.6, change: 4.33, changeAbs: 61.7, open: 1426, prevClose: 1425.9, high: 1496, low: 1418, mcap: "₹51k Cr", pe: 68.3, spark: [4, 4.4, 4.2, 5, 5.4, 5.9, 6.4, 6.8] },
  { id: "paytm", ticker: "PT", name: "Paytm", exchange: "NSE", price: 1790, change: 3.47, changeAbs: 60, open: 1732, prevClose: 1730, high: 1804, low: 1720, mcap: "₹1.14L Cr", pe: -42, spark: [4.4, 4.8, 4.6, 5.2, 5, 5.6, 6.1, 6.4] },
  { id: "hdfclife", ticker: "HL", name: "HDFC Life", exchange: "NSE", price: 530.2, change: 2.73, changeAbs: 14.1, open: 516, prevClose: 516.1, high: 534, low: 512, mcap: "₹1.14L Cr", pe: 74.8, spark: [4.6, 4.4, 5, 5.2, 5.6, 5.4, 6, 6.2] },
  { id: "emudhra", ticker: "eM", name: "eMudhra", exchange: "NSE", price: 642.3, change: 8.34, changeAbs: 49.45, open: 592, prevClose: 592.85, high: 652, low: 588, mcap: "₹5.2k Cr", pe: 56.1, spark: [3, 3.8, 4.4, 5, 5.8, 6.6, 7.2, 8] },
  { id: "tatamotors", ticker: "TM", name: "Tata Motors", exchange: "NSE", price: 993.9, change: -0.21, changeAbs: -2.05, open: 998, prevClose: 995.95, high: 1004, low: 988, mcap: "₹3.3L Cr", pe: 10.9, spark: [6.4, 6.2, 6, 6.3, 5.9, 5.7, 5.8, 5.6] },
  { id: "irctc", ticker: "IR", name: "IRCTC", exchange: "NSE", price: 731.8, change: -0.42, changeAbs: -3.1, open: 736, prevClose: 734.9, high: 740, low: 726, mcap: "₹58.5k Cr", pe: 55.2, spark: [6, 5.8, 5.9, 5.5, 5.4, 5.6, 5.3, 5.2] },
  { id: "pcj", ticker: "PC", name: "PC Jeweller", exchange: "NSE", price: 12.64, change: -1.94, changeAbs: -0.25, open: 12.9, prevClose: 12.89, high: 13.1, low: 12.5, mcap: "₹7.1k Cr", pe: 24.6, spark: [5.6, 5.4, 5.5, 5.2, 5, 5.1, 4.8, 4.7] },
  { id: "molbio", ticker: "MD", name: "Molbio Diagnostics", exchange: "NSE", price: 1307, change: -3.67, changeAbs: -49.8, open: 1358, prevClose: 1356.8, high: 1364, low: 1298, mcap: "₹8.4k Cr", pe: 44.2, spark: [7, 6.6, 6.8, 6.2, 5.8, 5.6, 5.2, 5] },
  { id: "raymond", ticker: "RY", name: "Raymond", exchange: "NSE", price: 328.75, change: 10.93, changeAbs: 32.4, open: 298, prevClose: 296.35, high: 334, low: 295, mcap: "₹21.9k Cr", pe: 18.7, spark: [3, 3.6, 4.6, 5.4, 6.2, 7, 7.6, 8.2] },
]

export const indices = [
  { name: "NIFTY 50", meta: "Broad · NSE", value: "25,114.30", change: 0.4, spark: [4, 5, 4.6, 5.4, 6, 5.6, 6.4] },
  { name: "SENSEX", meta: "BSE · 30", value: "82,380.71", change: 0.3, spark: [5, 4.6, 5.2, 5.8, 5.4, 6, 6.3] },
  { name: "NIFTY BANK", meta: "Banks", value: "53,802.05", change: -0.2, spark: [6, 5.6, 5.9, 5.2, 5.6, 5.1, 5] },
  { name: "INDIA VIX", meta: "Fear gauge", value: "13.42", change: -4.1, spark: [7, 6.2, 6.6, 5.8, 6, 5.2, 4.6] },
]

export const movers = [
  { id: "m1", tag: "Earnings", headline: "TCS profit beats estimates, margin up 30bps", meta: "Earnings desk · 4h", rc: true },
  { id: "m2", tag: "IPO", headline: "Three IPOs open this week — what to know", meta: "Market wrap · 6h", rc: true },
  { id: "m3", tag: "Macro", headline: "RBI holds repo rate at 6.5%, cites inflation", meta: "RBI · 1d", rc: true },
]

export const watchlist = [
  { ticker: "R", name: "RELIANCE", meta: "NSE · Equity", price: "₹2,912.40", change: 1.4 },
  { ticker: "T", name: "TCS", meta: "NSE · Equity", price: "₹4,102.15", change: -0.8 },
  { ticker: "H", name: "HDFC Bank", meta: "NSE · Equity", price: "₹1,776.20", change: 0.7 },
  { ticker: "I", name: "INFY", meta: "NSE · Equity", price: "₹1,890.55", change: 2.1 },
  { ticker: "I", name: "ITC", meta: "NSE · Equity", price: "₹512.30", change: -0.3 },
  { ticker: "Z", name: "Zomato", meta: "NSE · Equity", price: "₹254.60", change: 3.2 },
]

export const realityClaim = {
  handle: "@financebro.ig",
  kind: "Reel",
  views: "2.1M views",
  claim: '"This penny stock will 10x in 6 months. Guaranteed. Buy NOW."',
  checks: [
    {
      id: "verified",
      label: "Verified",
      icon: "check",
      text: "Company exists. Listed on BSE.",
      tone: "good" as const,
    },
    {
      id: "missing",
      label: "Missing context",
      icon: "search",
      text: '"10x" has no date, no basis, no risk disclosure.',
      tone: "info" as const,
    },
    {
      id: "hype",
      label: "Hype alert",
      icon: "fire",
      text: '"Guaranteed" + "NOW" = classic pump script.',
      tone: "warn" as const,
    },
    {
      id: "conflict",
      label: "Creator conflict",
      icon: "alert",
      text: "They hold the stock. They sell when you buy.",
      tone: "bad" as const,
    },
  ],
  sources: "Sources: BSE filings · SEBI registry · creator disclosures",
}

export const futures = [
  {
    id: "A",
    title: "Invest ₹3,000/mo, skip nothing.",
    amount: "₹2.1L by 2029",
    detail: "Laptop in 8 months · Vietnam fully funded · buffer intact",
    tone: "lime" as const,
    featured: true,
  },
  {
    id: "B",
    title: "Career break, 4 months",
    amount: "₹1.4L · laptop delayed",
    detail: "Buffer covers the gap. Goal moves 5 months right.",
    tone: "sand" as const,
    featured: false,
  },
  {
    id: "C",
    title: "Freelance dip, −30% income",
    amount: "Buffer holds 6 months",
    detail: "Autopilot pauses at ₹0 income. SIP resumes on recovery.",
    tone: "lilac" as const,
    featured: false,
  },
]

export const trailSteps = [
  { id: "initiated", title: "Payment initiated", sub: "UPI · 2:14 PM", state: "done" as const },
  { id: "debited", title: "Money left your bank", sub: "ICICI ····4521 · 2:14 PM", state: "done" as const },
  { id: "ordered", title: "Order placed with AMC", sub: "NAV cutoff 3 PM — you made it", state: "active" as const },
  { id: "allotted", title: "Units allotted", sub: "Tonight at declared NAV", state: "pending" as const },
  { id: "settled", title: "Money settles", sub: "Shows in portfolio tomorrow", state: "pending" as const },
]

export const squad = {
  name: "Batch '27",
  members: [
    { initials: "AN", name: "Anaya", streak: 12, delta: "+₹1.2k" },
    { initials: "RJ", name: "Rahul", streak: 9, delta: "+₹800" },
    { initials: "SR", name: "Sara", streak: 7, delta: "+₹640" },
    { initials: "KT", name: "Kabir", streak: 5, delta: "+₹400" },
  ],
  challenge: { name: "No-FOMO week", progress: 5, total: 7, reward: "All 4 members skipped hype buys" },
}

export type ChatMsg = {
  id: string
  from: "user" | "wise"
  text: string
  card?: "receipt" | "split" | "voice"
}

export const chatScript: Record<string, ChatMsg[]> = {
  default: [
    { id: "u1", from: "user", text: "Got ₹5k freelance payout. Invest all?" },
    { id: "g1", from: "wise", text: "Nice one. Keep ₹1,500 for your buffer — it's below 1 month of expenses. The rest can work.", card: "split" },
    { id: "g2", from: "wise", card: "receipt", text: "₹3,500 invested · goal-linked · exit rules inside. Review before you confirm." },
  ],
}

export const wiseReplies: [RegExp, string][] = [
  [/penny|10x|reel|guarantee/i, "That reel is a pump script. 'Guaranteed 10x' has no basis — the creator holds the stock and sells when followers buy. Want me to Reality-Check it properly?"],
  [/sip|invest|500|5000|₹/i, "For your income rhythm, I'd keep SIPs below 15% of a bad month — not a good one. Simulate it in Money Multiverse before locking."],
  [/goa|trip|vietnam|travel/i, "Goa in December is possible without killing your SIP — ₹1,900/mo for 4 months covers it. Your buffer stays intact either way."],
  [/crash|fall|red|loss|down/i, "Red days are normal — NIFTY has a down day ~46% of the time. Panic-selling is what turns a dip into a loss. Your plan is built for this."],
  [/elss|tax|80c/i, "ELSS funds save up to ₹46,800 tax under 80C, but lock money for 3 years. Good for salary income you won't need soon."],
  [/hi|hey|hello|yo/i, "Hey. Ask me about a reel, a stock, or whether you can afford something — I'll check against your actual numbers."],
]

export const wiseFallback =
  "I can explain products, Reality-Check claims, or simulate decisions against your goals. Try: 'Can I afford Goa in December?'"

export const navTabs = [
  { href: "/today", label: "Home", icon: "home" },
  { href: "/explore", label: "Explore", icon: "compass" },
  { href: "/portfolio", label: "Portfolio", icon: "pie" },
  { href: "/squad", label: "Squad", icon: "users" },
] as const

/* ── Onboarding ─────────────────────────────────────────────── */

export type Situation = {
  id: string
  label: string
  sub: string
  icon: IconName
  persona: Persona
  rhythmHint: string
}

export const situations: Situation[] = [
  { id: "student", label: "Student", sub: "Pocket money, hostel budget, stipend", icon: "grad", persona: "student", rhythmHint: "whenever" },
  { id: "intern", label: "Intern / trainee", sub: "Small stipend, first paydays", icon: "notebook", persona: "student", rhythmHint: "variable" },
  { id: "first-job", label: "First job", sub: "Fixed salary hits monthly", icon: "briefcase", persona: "salaried", rhythmHint: "fixed" },
  { id: "freelancer", label: "Freelancer / creator", sub: "Client invoices, brand deals", icon: "invoice", persona: "freelancer", rhythmHint: "variable" },
  { id: "gig", label: "Gig work", sub: "Deliveries, rides, task apps", icon: "energy", persona: "freelancer", rhythmHint: "variable" },
  { id: "mixed", label: "Mixed income", sub: "Salary plus side gigs", icon: "exchange", persona: "salaried", rhythmHint: "mixed" },
  { id: "family", label: "Supporting family", sub: "Shared expenses come first", icon: "users", persona: "salaried", rhythmHint: "fixed" },
]

export const rhythms = [
  { id: "fixed", label: "Fixed, monthly", sub: "Same date, same amount" },
  { id: "variable", label: "It varies", sub: "Good months and dry months" },
  { id: "whenever", label: "Whenever it comes", sub: "Allowance, tasks, odd jobs" },
  { id: "mixed", label: "A mix", sub: "Base pay plus extras" },
]

export const firstGoals: { id: string; label: string; sub: string; icon: IconName }[] = [
  { id: "gadget", label: "A gadget", sub: "Laptop, phone, camera", icon: "laptop" },
  { id: "trip", label: "A trip", sub: "Vietnam, Goa, somewhere", icon: "plane" },
  { id: "buffer", label: "Emergency buffer", sub: "3 months of safety", icon: "shieldPlain" },
  { id: "wealth", label: "Just grow money", sub: "No deadline, build the habit", icon: "up2" },
  { id: "learn", label: "Learn first", sub: "Simulate before I invest", icon: "book" },
]

export const experiences = [
  { id: "new", label: "Brand new", sub: "Never invested" },
  { id: "some", label: "Dabbled", sub: "A SIP or a stock or two" },
  { id: "confident", label: "Comfortable", sub: "I know the basics" },
]

/* ── Notifications ──────────────────────────────────────────── */

export const notifications: { id: string; icon: IconName; title: string; sub: string; href: string; time: string }[] = [
  { id: "n1", icon: "fire", title: "Reel going viral in your circle", sub: "\"Guaranteed 10x\" — Reality Check it before anyone acts", href: "/reality-check", time: "2h" },
  { id: "n2", icon: "target", title: "New laptop is 66% funded", sub: "₹4,200 more and the goal moves to \"book it\"", href: "/goals", time: "1d" },
  { id: "n3", icon: "package", title: "Units allotted", sub: "Your Nifty 50 order settled at declared NAV", href: "/trail", time: "2d" },
  { id: "n4", icon: "users", title: "No-FOMO week: day 5 of 7", sub: "Squad streak intact — 0 hype buys this week", href: "/squad", time: "3d" },
]

/* ── Market tabs ────────────────────────────────────────────── */

export const fnoRows = [
  { id: "nifty-fut", name: "NIFTY Nov FUT", meta: "Futures · 25 Nov", price: 25148.5, change: 0.5, note: "OI +4.2%" },
  { id: "banknifty-fut", name: "BANKNIFTY Nov FUT", meta: "Futures · 25 Nov", price: 53895.2, change: -0.3, note: "OI −1.8%" },
  { id: "nifty-ce", name: "NIFTY 25200 CE", meta: "Call · weekly", price: 86.4, change: 12.6, note: "High IV" },
  { id: "nifty-pe", name: "NIFTY 25000 PE", meta: "Put · weekly", price: 54.1, change: -8.2, note: "High IV" },
]

export const commodityRows = [
  { id: "gold", name: "Gold", meta: "MCX · 10g", price: 78420, change: 0.6, spark: [4, 4.3, 4.1, 4.6, 5, 5.2, 5.5] },
  { id: "silver", name: "Silver", meta: "MCX · 1kg", price: 92150, change: 1.1, spark: [3, 3.4, 4, 4.2, 4.6, 5.1, 5.6] },
  { id: "crude", name: "Crude oil", meta: "MCX · barrel", price: 5840, change: -1.4, spark: [7, 6.6, 6.9, 6.2, 5.8, 5.4, 5] },
  { id: "natgas", name: "Natural gas", meta: "MCX · mmBtu", price: 246.8, change: 2.3, spark: [3, 3.2, 3.8, 4.4, 4.1, 4.8, 5.4] },
]

/* ── Promptfolio ────────────────────────────────────────────── */

export const promptfolio = {
  prompt: "Indian consumer growth, no tobacco or gambling, medium risk, ₹1,000/mo",
  interpretation: "Broad domestic consumption theme · excludes sin stocks · mid volatility band · SIP-sized contributions",
  holdings: [
    { ticker: "N", name: "Nifty 50 Index", weight: 40, why: "Broad base — consumer majors inside" },
    { ticker: "C", name: "Consumption ETF", weight: 30, why: "Direct theme exposure, screened" },
    { ticker: "F", name: "Flexi-cap fund", weight: 20, why: "Manager can rotate across sectors" },
    { ticker: "L", name: "Liquid fund", weight: 10, why: "Drag reducer for re-entry" },
  ],
  risk: "Medium — equity-heavy, single-theme tilt adds concentration",
  stress: "In the March 2020 fall this basket drew down ~31%. It recovered to pre-fall levels in ~9 months.",
  exclusions: "No tobacco, gambling, alcohol or weapons manufacturers — screened at index level",
  fees: "Blended expense ~0.4% — about ₹4/yr per ₹1,000 invested",
  invalidators: "Rural demand slump · inflation squeezing discretionary spend · screening rules change",
}

/* ── Portfolio DNA ──────────────────────────────────────────── */

export const dna = {
  title: "Curious Builder",
  tagline: "You research before you buy — rare at this stage.",
  dims: [
    { label: "Patience", value: 72, note: "Held through 3 red days" },
    { label: "Diversification", value: 58, note: "4 instruments, equity-tilted" },
    { label: "Research depth", value: 81, note: "9 Reality Checks this month" },
    { label: "Automation", value: 44, note: "Autopilot off — manual for now" },
    { label: "Goal alignment", value: 66, note: "2 of 3 goals on track" },
  ],
  archetypes: [
    { name: "Calm Investor", match: 34 },
    { name: "Theme Hunter", match: 61 },
    { name: "Research Nerd", match: 77 },
    { name: "FOMO Fighter", match: 52 },
  ],
}

/* ── Wrapped ────────────────────────────────────────────────── */

export const wrapped = {
  period: "Your first 90 days",
  stats: [
    { label: "Questions asked before investing", value: "23", icon: "help" },
    { label: "Hype claims Reality-Checked", value: "9", icon: "shield" },
    { label: "Hype buys skipped", value: "6", icon: "fire" },
    { label: "Red days without panic-selling", value: "4", icon: "down2" },
    { label: "Weeks of consistent contributions", value: "11", icon: "calendar" },
    { label: "Goals funded past 50%", value: "1", icon: "target" },
  ],
  note: "Amounts and holdings stay private by default. Milestones, not money.",
}

/* ── Stocks hub (GrowWise parity) ──────────────────────────────── */

export type ProductTool = {
  id: string
  label: string
  icon: IconName
  badge?: string
  href: string
}

export const productTools: ProductTool[] = [
  { id: "mtf", label: "MTF", icon: "percent", href: "/products/mtf" },
  { id: "stock-sip", label: "Stock SIP", icon: "calendar", href: "/products/stock-sip" },
  { id: "etf", label: "ETF", icon: "exchange", href: "/products/etf" },
  { id: "ipo", label: "IPO", icon: "rocket", badge: "3", href: "/ipo" },
  { id: "bonds", label: "Bonds", icon: "banknote", badge: "12", href: "/products/bonds" },
  { id: "screener", label: "Screener", icon: "chartHist", href: "/screener" },
  { id: "fno", label: "F&O", icon: "chart", href: "/fno" },
  { id: "events", label: "Events", icon: "gift", href: "/products/events" },
]

export const mostBought = ["emudhra", "pcj", "raymond", "tatamotors"]
export const mostTradedMtf = ["emudhra", "pinelabs", "csb", "raymond"]
export const topIntraday = ["emudhra", "molbio", "raymond", "tatachem"]
export const inNews = ["patanjali", "pbfintech", "raymond", "hdfclife"]

/* Extra tickers shown only inside market sections (not searchable detail) */
export const extraTickers: Stock[] = [
  { id: "pinelabs", ticker: "PL", name: "Pine Labs", exchange: "NSE", price: 185.71, change: -4.17, changeAbs: -8.09, open: 194, prevClose: 193.8, high: 196, low: 184, mcap: "₹21k Cr", pe: -18, spark: [6, 5.6, 5.8, 5.2, 5, 4.8, 4.6, 4.4] },
  { id: "csb", ticker: "CS", name: "CSB Bank", exchange: "NSE", price: 328.75, change: 10.93, changeAbs: 32.4, open: 298, prevClose: 296.35, high: 334, low: 295, mcap: "₹5.7k Cr", pe: 12.4, spark: [3, 3.6, 4.4, 5.2, 6, 6.8, 7.4, 8] },
  { id: "tatachem", ticker: "TC", name: "Tata Chemicals", exchange: "NSE", price: 865.4, change: 1.62, changeAbs: 13.8, open: 852, prevClose: 851.6, high: 872, low: 848, mcap: "₹22k Cr", pe: 62.8, spark: [4.8, 5, 5.4, 5.2, 5.8, 6, 6.2, 6.4] },
]

export const allStocks = [...stocks, ...extraTickers]

export const volumeShockers = [
  { id: "v1", ticker: "IP", name: "India Pesticides", spike: 34029, volume: "2,84,19,570" },
  { id: "v2", ticker: "GB", name: "Godavari Biorefineries", spike: 12835, volume: "94,06,369" },
  { id: "v3", ticker: "KM", name: "KMC Speciality Hospitals", spike: 8401, volume: "90,88,727" },
  { id: "v4", ticker: "NP", name: "Network People Services", spike: 8275, volume: "30,28,115" },
]

export type TradingScreen = {
  id: string
  name: string
  signal: "Bullish" | "Bearish"
  count: number
  pattern: "breakout" | "rsi-high" | "macd" | "rsi-low"
}

export const tradingScreens: TradingScreen[] = [
  { id: "ts1", name: "Resistance breakouts", signal: "Bullish", count: 14, pattern: "breakout" },
  { id: "ts2", name: "RSI overbought", signal: "Bearish", count: 9, pattern: "rsi-high" },
  { id: "ts3", name: "MACD above signal line", signal: "Bullish", count: 21, pattern: "macd" },
  { id: "ts4", name: "RSI oversold", signal: "Bullish", count: 7, pattern: "rsi-low" },
]

export const sectors: { id: string; name: string; icon: IconName; change: number }[] = [
  { id: "bearings", name: "Bearings", icon: "settings", change: 2.36 },
  { id: "insurance", name: "Insurance", icon: "shieldPlain", change: 1.47 },
  { id: "it", name: "IT Services", icon: "laptop", change: 0.84 },
  { id: "pharma", name: "Pharma", icon: "help", change: 0.62 },
  { id: "banks", name: "Private Banks", icon: "bank", change: 0.31 },
  { id: "water", name: "Water Distribution", icon: "globe", change: -1.85 },
  { id: "leather", name: "Leather", icon: "briefcase", change: -4.48 },
]

export const etfs = [
  { id: "growwise-pse", ticker: "G", name: "GrowWise Nifty PSE ETF", price: 95.52, change: -0.61, byGrowWise: true },
  { id: "growwise-psu", ticker: "G", name: "GrowWise Nifty PSU Bank ETF", price: 83.33, change: 1.52, byGrowWise: true },
  { id: "nippon-nifty", ticker: "N", name: "Nippon India ETF Nifty 50 BeES", price: 265.02, change: 0.17, byGrowWise: false },
  { id: "nippon-gold", ticker: "N", name: "Nippon India ETF Gold BeES", price: 124.91, change: 1.04, byGrowWise: false },
]

/* ── F&O ────────────────────────────────────────────────────── */

export const fnoTopTraded: { id: string; ticker: string; name: string; kind: "equity" | "commodity"; price: number; change: number; changeAbs: number; chain: boolean }[] = [
  { id: "sensex", ticker: "SX", name: "SENSEX", kind: "equity", price: 74336.45, change: 0.45, changeAbs: 332.63, chain: true },
  { id: "nifty50", ticker: "N", name: "NIFTY 50", kind: "equity", price: 23217.6, change: 0.43, changeAbs: 99, chain: true },
  { id: "banknifty", ticker: "BN", name: "BANK NIFTY", kind: "equity", price: 56292.45, change: 0.89, changeAbs: 497.7, chain: true },
  { id: "tcs", ticker: "T", name: "TCS", kind: "equity", price: 2188.8, change: -2.76, changeAbs: -62.2, chain: true },
  { id: "reliance", ticker: "R", name: "Reliance Industries", kind: "equity", price: 1240, change: 0.38, changeAbs: 4.7, chain: true },
  { id: "hdfc", ticker: "H", name: "HDFC Bank", kind: "equity", price: 721.5, change: 0.69, changeAbs: 4.95, chain: true },
  { id: "crude", ticker: "CO", name: "Crude Oil", kind: "commodity", price: 5840, change: -1.4, changeAbs: -83, chain: false },
  { id: "gold", ticker: "AU", name: "Gold", kind: "commodity", price: 78420, change: 0.6, changeAbs: 470, chain: false },
]

export const commodityChips = [
  { id: "crude", name: "Crude Oil", change: -3.85 },
  { id: "natgas", name: "Natural Gas", change: -1.0 },
  { id: "gold", name: "Gold", change: 1.34 },
  { id: "silver", name: "Silver", change: 1.36 },
]

export const stockFutures = [
  { id: "hdfcbank-fut", ticker: "H", name: "HDFCBANK 29 Sep Fut", price: 721.7, change: 0 },
  { id: "patanjali-fut", ticker: "P", name: "PATANJALI 29 Sep Fut", price: 365.8, change: 0 },
  { id: "paytm-fut", ticker: "PT", name: "PAYTM 29 Sep Fut", price: 1791, change: 0 },
  { id: "infy-fut", ticker: "I", name: "INFY 29 Sep Fut", price: 1061.8, change: 0 },
]

export const indexFutures = [
  { id: "nifty-fut", ticker: "N", name: "NIFTY 29 Sep Fut", price: 23272.3, change: 0 },
  { id: "banknifty-fut", ticker: "BN", name: "BANKNIFTY 29 Sep Fut", price: 56407.8, change: 0 },
  { id: "nifty-oct", ticker: "N", name: "NIFTY 27 Oct Fut", price: 23370.6, change: 0 },
  { id: "midcap-fut", ticker: "MC", name: "MIDCPNIFTY 29 Sep Fut", price: 14320, change: 0 },
]

export type OptionStrike = {
  strike: number
  ceLtp: number
  ceOi: number
  ceChg: number
  peLtp: number
  peOi: number
  peChg: number
}

export const optionChains: Record<string, { underlying: string; spot: number; expiry: string; lotSize: number; strikes: OptionStrike[] }> = {
  nifty50: {
    underlying: "NIFTY 50",
    spot: 23217.6,
    expiry: "30 Sep",
    lotSize: 75,
    strikes: [
      { strike: 22900, ceLtp: 412.5, ceOi: 18.4, ceChg: -4.2, peLtp: 68.2, peOi: 9.1, peChg: 12.8 },
      { strike: 23000, ceLtp: 338.9, ceOi: 24.6, ceChg: -5.8, peLtp: 96.4, peOi: 12.4, peChg: 9.6 },
      { strike: 23100, ceLtp: 268.2, ceOi: 31.2, ceChg: -8.1, peLtp: 132.8, peOi: 15.7, peChg: 6.4 },
      { strike: 23200, ceLtp: 198.6, ceOi: 42.8, ceChg: -11.4, peLtp: 181.2, peOi: 21.3, peChg: 4.2 },
      { strike: 23300, ceLtp: 142.4, ceOi: 38.5, ceChg: -14.9, peLtp: 242.6, peOi: 17.8, peChg: 3.1 },
      { strike: 23400, ceLtp: 96.8, ceOi: 29.4, ceChg: -18.2, peLtp: 318.4, peOi: 11.2, peChg: 2.4 },
      { strike: 23500, ceLtp: 61.2, ceOi: 22.1, ceChg: -22.6, peLtp: 402.9, peOi: 8.4, peChg: 1.8 },
    ],
  },
  banknifty: {
    underlying: "BANK NIFTY",
    spot: 56292.45,
    expiry: "30 Sep",
    lotSize: 35,
    strikes: [
      { strike: 55800, ceLtp: 682.4, ceOi: 12.1, ceChg: 6.4, peLtp: 148.2, peOi: 6.8, peChg: -9.2 },
      { strike: 56000, ceLtp: 536.8, ceOi: 18.6, ceChg: 8.1, peLtp: 204.6, peOi: 9.4, peChg: -7.8 },
      { strike: 56200, ceLtp: 402.2, ceOi: 26.4, ceChg: 10.6, peLtp: 288.4, peOi: 13.2, peChg: -5.4 },
      { strike: 56400, ceLtp: 286.5, ceOi: 34.2, ceChg: 14.2, peLtp: 396.8, peOi: 17.6, peChg: -3.8 },
      { strike: 56600, ceLtp: 192.4, ceOi: 28.8, ceChg: 18.6, peLtp: 528.2, peOi: 12.1, peChg: -2.6 },
      { strike: 56800, ceLtp: 118.6, ceOi: 19.4, ceChg: 24.1, peLtp: 682.4, peOi: 8.2, peChg: -1.9 },
    ],
  },
  sensex: {
    underlying: "SENSEX",
    spot: 74336.45,
    expiry: "2 Oct",
    lotSize: 20,
    strikes: [
      { strike: 73800, ceLtp: 812.4, ceOi: 8.2, ceChg: 5.2, peLtp: 226.8, peOi: 4.1, peChg: -8.4 },
      { strike: 74000, ceLtp: 668.2, ceOi: 11.4, ceChg: 7.6, peLtp: 298.4, peOi: 5.8, peChg: -6.2 },
      { strike: 74200, ceLtp: 524.6, ceOi: 15.8, ceChg: 10.2, peLtp: 402.2, peOi: 7.6, peChg: -4.8 },
      { strike: 74400, ceLtp: 398.8, ceOi: 21.2, ceChg: 13.4, peLtp: 536.6, peOi: 10.4, peChg: -3.2 },
      { strike: 74600, ceLtp: 282.4, ceOi: 17.6, ceChg: 17.8, peLtp: 688.8, peOi: 8.1, peChg: -2.4 },
      { strike: 74800, ceLtp: 186.2, ceOi: 12.8, ceChg: 22.4, peLtp: 862.4, peOi: 5.6, peChg: -1.6 },
    ],
  },
}

/* ── Mutual funds hub ───────────────────────────────────────── */

export const mfCollections: { id: string; label: string; icon: IconName }[] = [
  { id: "high", label: "High return", icon: "up2" },
  { id: "5star", label: "5★ rated", icon: "star" },
  { id: "elss", label: "Tax saver ELSS", icon: "banknote" },
  { id: "index", label: "Index funds", icon: "chart" },
  { id: "gold", label: "Gold & silver", icon: "coins" },
  { id: "large", label: "Large cap", icon: "briefcase" },
]

export const popularFunds = ["sbi-gold", "bandhan-sc", "hdfc-mid", "ppf"]

export type Sip = {
  id: string
  fundId: string
  amount: number
  date: string
}

export const seedSips: Sip[] = [
  { id: "sip1", fundId: "sbi-blue", amount: 2000, date: "5th" },
]

/* ── Orders / positions ─────────────────────────────────────── */

export type Order = {
  id: string
  name: string
  kind: "BUY" | "SELL"
  product: "Delivery" | "Intraday"
  qty: number
  price: number
  status: "Executed" | "Pending"
  time: string
}

export const seedOrders: Order[] = [
  { id: "o1", name: "NIFTY 50 ETF", kind: "BUY", product: "Delivery", qty: 12, price: 265.02, status: "Executed", time: "Mon 2:14 PM" },
  { id: "o2", name: "Zomato", kind: "BUY", product: "Intraday", qty: 40, price: 246.7, status: "Executed", time: "Today 10:02 AM" },
]

/* ── IPOs ───────────────────────────────────────────────────── */

export type Ipo = {
  id: string
  ticker: string
  name: string
  status: "open" | "upcoming" | "closed"
  band: string
  lot: string
  dates: string
  gmp?: string
}

export const ipos: Ipo[] = [
  { id: "arkade", ticker: "AR", name: "Arkade Developers", status: "open", band: "₹121–128", lot: "110 shares", dates: "16–18 Sep", gmp: "+₹38" },
  { id: "saatvik", ticker: "SV", name: "Saatvik Green Energy", status: "open", band: "₹442–465", lot: "32 shares", dates: "17–19 Sep", gmp: "+₹52" },
  { id: "atlanta", ticker: "AE", name: "Atlanta Electricals", status: "open", band: "₹718–754", lot: "19 shares", dates: "15–17 Sep" },
  { id: "vijay", ticker: "VJ", name: "Vijay Manpower", status: "upcoming", band: "₹—", lot: "TBA", dates: "Opens 22 Sep" },
  { id: "pace", ticker: "PD", name: "Pace Digitek", status: "upcoming", band: "₹—", lot: "TBA", dates: "Opens 26 Sep" },
  { id: "ganesh", ticker: "GC", name: "Ganesh Consumer", status: "closed", band: "₹306–322", lot: "46 shares", dates: "Listed +12.4%" },
]

/* ── Products & tools pages ─────────────────────────────────── */

export const bonds = [
  { id: "b1", name: "Muthoot Fincorp NCD", yieldPct: 9.4, rating: "AA", min: 10000, tenure: "24 mo" },
  { id: "b2", name: "Shriram Finance NCD", yieldPct: 9.1, rating: "AA+", min: 10000, tenure: "36 mo" },
  { id: "b3", name: "Bajaj Finserv FD", yieldPct: 8.6, rating: "AAA", min: 15000, tenure: "42 mo" },
  { id: "b4", name: "GOI Savings Bond", yieldPct: 8.05, rating: "Sovereign", min: 1000, tenure: "7 yr" },
]

export const mtfInfo = {
  tagline: "Buy stocks with 4× your money",
  rate: "0.04%/day interest",
  examples: ["emudhra", "csb", "tatamotors", "irctc"],
}

export const stockSipIdeas = ["hdfc", "reliance", "infy", "itc"]

/* ── Screener ───────────────────────────────────────────────── */

export const screenerFilters = ["Gainers", "Losers", "High volume", "52W high", "52W low", "RSI > 70", "RSI < 30"]
