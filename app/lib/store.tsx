"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  personas,
  seedOrders,
  seedSips,
  type Goal,
  type Order,
  type Persona,
  type Sip,
} from "@/lib/data"

type Autopilot = {
  on: boolean
  pctMode: boolean
  bufferFirst: boolean
  hardCap: boolean
  cap: number
}

export type Profile = {
  name: string
  situationId: string
  situationLabel: string
  rhythm: string
  firstGoal: string
  experience: string
}

const defaultProfile: Profile = {
  name: "",
  situationId: "",
  situationLabel: "",
  rhythm: "",
  firstGoal: "",
  experience: "",
}

const defaultAutopilot: Autopilot = {
  on: false,
  pctMode: true,
  bufferFirst: true,
  hardCap: true,
  cap: 6000,
}

type Store = {
  persona: Persona | null
  setPersona: (p: Persona) => void
  profile: Profile
  setProfile: (p: Partial<Profile>) => void
  onboarded: boolean
  completeOnboarding: (p: Profile, persona: Persona) => void
  autopilot: Autopilot
  setAutopilot: (a: Partial<Autopilot>) => void
  invested: boolean
  invest: () => void
  trailStep: number
  setTrailStep: (n: number) => void
  watchIds: string[]
  toggleWatch: (id: string) => void
  fundWatchIds: string[]
  toggleFundWatch: (id: string) => void
  watchlists: string[]
  addWatchlist: (name: string) => void
  orders: Order[]
  placeOrder: (o: Omit<Order, "id" | "time" | "status">) => void
  cancelOrder: (id: string) => void
  sips: Sip[]
  addSip: (s: Omit<Sip, "id">) => void
  removeSip: (id: string) => void
  ipoApplied: string[]
  applyIpo: (id: string) => void
  extraGoals: Goal[]
  addGoal: (g: Goal) => void
  hydrated: boolean
  reset: () => void
}

const Ctx = createContext<Store | null>(null)

const KEY = "growwise-v2"

export function StoreProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona | null>(null)
  const [profile, setProfileState] = useState<Profile>(defaultProfile)
  const [onboarded, setOnboarded] = useState(false)
  const [autopilot, setAutopilotState] = useState<Autopilot>(defaultAutopilot)
  const [invested, setInvested] = useState(false)
  const [trailStep, setTrailStep] = useState(0)
  const [watchIds, setWatchIds] = useState<string[]>([
    "reliance",
    "tcs",
    "hdfc",
    "infy",
    "itc",
    "zomato",
  ])
  const [extraGoals, setExtraGoals] = useState<Goal[]>([])
  const [fundWatchIds, setFundWatchIds] = useState<string[]>(["ppf"])
  const [watchlists, setWatchlists] = useState<string[]>(["Watchlist 1"])
  const [orders, setOrders] = useState<Order[]>(seedOrders)
  const [sips, setSips] = useState<Sip[]>(seedSips)
  const [ipoApplied, setIpoApplied] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
          const s = JSON.parse(raw)
          if (s.persona && s.persona in personas) setPersonaState(s.persona)
          if (s.profile) setProfileState((p) => ({ ...p, ...s.profile }))
          if (s.onboarded) setOnboarded(true)
          if (s.autopilot) setAutopilotState((a) => ({ ...a, ...s.autopilot }))
          if (s.invested) setInvested(true)
          if (Array.isArray(s.watchIds)) setWatchIds(s.watchIds)
          if (Array.isArray(s.extraGoals)) setExtraGoals(s.extraGoals)
          if (Array.isArray(s.fundWatchIds)) setFundWatchIds(s.fundWatchIds)
          if (Array.isArray(s.watchlists)) setWatchlists(s.watchlists)
          if (Array.isArray(s.orders)) setOrders(s.orders)
          if (Array.isArray(s.sips)) setSips(s.sips)
          if (Array.isArray(s.ipoApplied)) setIpoApplied(s.ipoApplied)
        }
      } catch {}
      setHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          persona,
          profile,
          onboarded,
          autopilot,
          invested,
          watchIds,
          extraGoals,
          fundWatchIds,
          watchlists,
          orders,
          sips,
          ipoApplied,
        })
      )
    } catch {}
  }, [persona, profile, onboarded, autopilot, invested, watchIds, extraGoals, fundWatchIds, watchlists, orders, sips, ipoApplied, hydrated])

  const value = useMemo<Store>(
    () => ({
      persona,
      setPersona: setPersonaState,
      profile,
      setProfile: (p) => setProfileState((s) => ({ ...s, ...p })),
      onboarded,
      completeOnboarding: (p, personaId) => {
        setProfileState(p)
        setPersonaState(personaId)
        setOnboarded(true)
      },
      autopilot,
      setAutopilot: (a) => setAutopilotState((s) => ({ ...s, ...a })),
      invested,
      invest: () => {
        setInvested(true)
        setTrailStep(2)
      },
      trailStep,
      setTrailStep,
      watchIds,
      toggleWatch: (id) =>
        setWatchIds((w) =>
          w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
        ),
      extraGoals,
      addGoal: (g) => setExtraGoals((gs) => [...gs, g]),
      fundWatchIds,
      toggleFundWatch: (id) =>
        setFundWatchIds((w) =>
          w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
        ),
      watchlists,
      addWatchlist: (name) => setWatchlists((w) => [...w, name]),
      orders,
      placeOrder: (o) =>
        setOrders((os) => [
          {
            ...o,
            id: `o${Date.now()}`,
            status: "Executed",
            time: "Just now",
          },
          ...os,
        ]),
      cancelOrder: (id) => setOrders((os) => os.filter((o) => o.id !== id)),
      sips,
      addSip: (s) => setSips((ss) => [...ss, { ...s, id: `sip${Date.now()}` }]),
      removeSip: (id) => setSips((ss) => ss.filter((s) => s.id !== id)),
      ipoApplied,
      applyIpo: (id) =>
        setIpoApplied((a) => (a.includes(id) ? a : [...a, id])),
      hydrated,
      reset: () => {
        setPersonaState(null)
        setProfileState(defaultProfile)
        setOnboarded(false)
        setInvested(false)
        setTrailStep(0)
        setAutopilotState(defaultAutopilot)
        setWatchIds(["reliance", "tcs", "hdfc", "infy", "itc", "zomato"])
        setExtraGoals([])
        setFundWatchIds(["ppf"])
        setWatchlists(["Watchlist 1"])
        setOrders(seedOrders)
        setSips(seedSips)
        setIpoApplied([])
        try {
          localStorage.removeItem(KEY)
        } catch {}
      },
    }),
    [persona, profile, onboarded, autopilot, invested, trailStep, watchIds, extraGoals, fundWatchIds, watchlists, orders, sips, ipoApplied, hydrated]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error("useStore outside provider")
  return s
}

export function usePersona() {
  const { persona, profile } = useStore()
  const p = personas[persona ?? "student"]
  return profile.name ? { ...p, name: profile.name } : p
}
