"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { personas, type Goal, type Persona } from "@/lib/data"

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
  extraGoals: Goal[]
  addGoal: (g: Goal) => void
  hydrated: boolean
  reset: () => void
}

const Ctx = createContext<Store | null>(null)

const KEY = "groww-irl-v2"

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
        })
      )
    } catch {}
  }, [persona, profile, onboarded, autopilot, invested, watchIds, extraGoals, hydrated])

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
        try {
          localStorage.removeItem(KEY)
        } catch {}
      },
    }),
    [persona, profile, onboarded, autopilot, invested, trailStep, watchIds, extraGoals, hydrated]
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
