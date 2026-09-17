"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { personas, type Persona } from "@/lib/data"

type Autopilot = {
  on: boolean
  pctMode: boolean
  bufferFirst: boolean
  hardCap: boolean
  cap: number
}

type Store = {
  persona: Persona | null
  setPersona: (p: Persona) => void
  autopilot: Autopilot
  setAutopilot: (a: Partial<Autopilot>) => void
  invested: boolean
  invest: () => void
  trailStep: number
  setTrailStep: (n: number) => void
  hydrated: boolean
  reset: () => void
}

const Ctx = createContext<Store | null>(null)

const KEY = "groww-irl-v1"

export function StoreProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona | null>(null)
  const [autopilot, setAutopilotState] = useState<Autopilot>({
    on: false,
    pctMode: true,
    bufferFirst: true,
    hardCap: true,
    cap: 6000,
  })
  const [invested, setInvested] = useState(false)
  const [trailStep, setTrailStep] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
          const s = JSON.parse(raw)
          if (s.persona && s.persona in personas) setPersonaState(s.persona)
          if (s.autopilot) setAutopilotState((a) => ({ ...a, ...s.autopilot }))
          if (s.invested) setInvested(true)
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
        JSON.stringify({ persona, autopilot, invested })
      )
    } catch {}
  }, [persona, autopilot, invested, hydrated])

  const value = useMemo<Store>(
    () => ({
      persona,
      setPersona: setPersonaState,
      autopilot,
      setAutopilot: (a) => setAutopilotState((s) => ({ ...s, ...a })),
      invested,
      invest: () => {
        setInvested(true)
        setTrailStep(2)
      },
      trailStep,
      setTrailStep,
      hydrated,
      reset: () => {
        setPersonaState(null)
        setInvested(false)
        setTrailStep(0)
        setAutopilotState({
          on: false,
          pctMode: true,
          bufferFirst: true,
          hardCap: true,
          cap: 6000,
        })
        try {
          localStorage.removeItem(KEY)
        } catch {}
      },
    }),
    [persona, autopilot, invested, trailStep, hydrated]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error("useStore outside provider")
  return s
}

export function usePersona() {
  const { persona } = useStore()
  return personas[persona ?? "student"]
}
