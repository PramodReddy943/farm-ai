'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ScanContextType {
  scanHistory: any[]
  addScanToHistory: (scan: any) => void
  clearHistory: () => void
}

const ScanContext = createContext<ScanContextType | null>(null)

export function ScanProvider({ children }: { children: ReactNode }) {
  const [scanHistory, setScanHistory] = useState<any[]>([])

  const addScanToHistory = (scan: any) => {
    setScanHistory([scan, ...scanHistory])
  }

  const clearHistory = () => {
    setScanHistory([])
  }

  return (
    <ScanContext.Provider value={{ scanHistory, addScanToHistory, clearHistory }}>
      {children}
    </ScanContext.Provider>
  )
}

export function useScan() {
  const context = useContext(ScanContext)
  if (!context) {
    throw new Error('useScan must be used within ScanProvider')
  }
  return context
}
