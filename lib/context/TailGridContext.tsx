"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { TailGridContextType } from "../types/tail-grid-types"

const TailGridContext = createContext<TailGridContextType<Record<string, unknown>> | undefined>(undefined)

export function TailGridProvider<T extends Record<string, unknown>>({
  children,
  value,
}: {
  children: ReactNode
  value: TailGridContextType<T>
}) {
  return (
    <TailGridContext.Provider value={value as TailGridContextType<Record<string, unknown>>}>
      {children}
    </TailGridContext.Provider>
  )
}

export function useTailGridContext<T extends Record<string, unknown>>() {
  const context = useContext(TailGridContext)
  if (context === undefined) {
    throw new Error("useTailGridContext must be used within a TailGridProvider")
  }
  return context as TailGridContextType<T>
}

