import { create } from 'zustand'

interface Farm {
  id?: string
  name: string
  size: number
  location: string
  crops: string[]
  soilType?: string
}

interface Scan {
  id: string
  date: string
  cropType: string
  disease: string
  confidence: number
  image?: string
  treatments: string[]
}

interface User {
  id?: string
  username: string
  email?: string
  farm?: Farm
}

interface StoreState {
  user: User | null
  farm: Farm | null
  scans: Scan[]
  setUser: (user: User) => void
  setFarm: (farm: Farm) => void
  addScan: (scan: Scan) => void
  clearAuth: () => void
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  farm: null,
  scans: [],
  
  setUser: (user) => set({ user }),
  setFarm: (farm) => set({ farm }),
  
  addScan: (scan) => set((state) => ({
    scans: [scan, ...state.scans],
  })),
  
  clearAuth: () => set({ user: null, farm: null }),
}))
