// Simple authentication store (will integrate with backend later)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'farmer' | 'buyer' | 'supplier' | 'admin'
  profilePicture?: string
  location?: string
  state?: string
  crops?: string[]
  animals?: string[]
  verified?: boolean
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: Partial<User> & { password: string }) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) throw new Error('Login failed')

          const { user } = await response.json()
          set({ user })
        } catch (error) {
          console.error('Login error:', error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (userData) => {
        set({ isLoading: true })
        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          })

          if (!response.ok) throw new Error('Signup failed')

          const { user } = await response.json()
          set({ user })
        } catch (error) {
          console.error('Signup error:', error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null })
      },

      updateProfile: async (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }))
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
