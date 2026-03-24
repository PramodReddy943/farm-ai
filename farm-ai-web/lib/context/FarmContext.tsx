'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FarmContextType {
  farmData: any
  setFarmData: (data: any) => void
}

const FarmContext = createContext<FarmContextType | null>(null)

export function FarmProvider({ children }: { children: ReactNode }) {
  const [farmData, setFarmData] = useState(null)

  return (
    <FarmContext.Provider value={{ farmData, setFarmData }}>
      {children}
    </FarmContext.Provider>
  )
}

export function useFarm() {
  const context = useContext(FarmContext)
  if (!context) {
    throw new Error('useFarm must be used within FarmProvider')
  }
  return context
}
