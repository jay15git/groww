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
  gr1: string
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
    gr1: "Good for goals 5+ yrs away. High equity — expect swings.",
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
    gr1: "Steady large-cap core. Lower drama than mid/small caps.",
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
    gr1: "Highest swings here. Only for money you won't need soon.",
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
  from: "user" | "gr1"
  text: string
  card?: "receipt" | "split" | "voice"
}

export const chatScript: Record<string, ChatMsg[]> = {
  default: [
    { id: "u1", from: "user", text: "Got ₹5k freelance payout. Invest all?" },
    { id: "g1", from: "gr1", text: "Nice one. Keep ₹1,500 for your buffer — it's below 1 month of expenses. The rest can work.", card: "split" },
    { id: "g2", from: "gr1", card: "receipt", text: "₹3,500 invested · goal-linked · exit rules inside. Review before you confirm." },
  ],
}

export const gr1Replies: [RegExp, string][] = [
  [/penny|10x|reel|guarantee/i, "That reel is a pump script. 'Guaranteed 10x' has no basis — the creator holds the stock and sells when followers buy. Want me to Reality-Check it properly?"],
  [/sip|invest|500|5000|₹/i, "For your income rhythm, I'd keep SIPs below 15% of a bad month — not a good one. Simulate it in Money Multiverse before locking."],
  [/goa|trip|vietnam|travel/i, "Goa in December is possible without killing your SIP — ₹1,900/mo for 4 months covers it. Your buffer stays intact either way."],
  [/crash|fall|red|loss|down/i, "Red days are normal — NIFTY has a down day ~46% of the time. Panic-selling is what turns a dip into a loss. Your plan is built for this."],
  [/elss|tax|80c/i, "ELSS funds save up to ₹46,800 tax under 80C, but lock money for 3 years. Good for salary income you won't need soon."],
  [/hi|hey|hello|yo/i, "Hey. Ask me about a reel, a stock, or whether you can afford something — I'll check against your actual numbers."],
]

export const gr1Fallback =
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
