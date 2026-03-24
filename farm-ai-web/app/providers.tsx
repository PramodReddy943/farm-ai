'use client'

import { ReactNode } from 'react'
import { FarmProvider } from '@/lib/context/FarmContext'
import { ScanProvider } from '@/lib/context/ScanContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FarmProvider>
      <ScanProvider>
        {children}
      </ScanProvider>
    </FarmProvider>
  )
}
