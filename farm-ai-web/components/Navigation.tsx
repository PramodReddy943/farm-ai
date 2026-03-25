'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  Menu, X, Leaf, LogOut, Home, ShoppingCart, Cloud, TrendingUp, Users,
  BookOpen, PiggyBank, Zap, MapPin, Stethoscope, Tractor, DollarSign,
  Truck, AlertCircle, Settings, Languages, Lightbulb, Sprout, BarChart3,
  Store, Crop, Wind, Trophy, Warehouse, Microscope, Apple, Calendar,
  CreditCard, Image, Handshake, Sun, Users2, Shield, Globe, Radio, Brain
} from 'lucide-react'
import { useAuth } from '@/lib/auth'

const features = [
  { id: 'selling', icon: ShoppingCart, label: 'Crop Selling', color: 'from-green-500 to-emerald-500' },
  { id: 'dairy', icon: Sprout, label: 'Dairy Animals', color: 'from-orange-500 to-amber-500' },
  { id: 'irrigation', icon: Zap, label: 'Drip Irrigation', color: 'from-blue-500 to-cyan-500' },
  { id: 'weather', icon: Cloud, label: 'Weather Alerts', color: 'from-sky-500 to-blue-500' },
  { id: 'advisory', icon: Stethoscope, label: 'Crop Advisory', color: 'from-green-600 to-teal-500' },
  { id: 'schemes', icon: BookOpen, label: 'Gov. Schemes', color: 'from-purple-500 to-pink-500' },
  { id: 'financial', icon: DollarSign, label: 'Financial Tools', color: 'from-amber-500 to-orange-500' },
  { id: 'labour', icon: Users, label: 'Labour Hiring', color: 'from-indigo-500 to-purple-500' },
  { id: 'community', icon: Users2, label: 'Community', color: 'from-rose-500 to-red-500' },
  { id: 'language', icon: Languages, label: 'Languages', color: 'from-cyan-500 to-blue-500' },
  { id: 'supplies', icon: Store, label: 'Input Supplies', color: 'from-emerald-500 to-green-500' },
  { id: 'planning', icon: Sprout, label: 'Crop Planning', color: 'from-lime-500 to-green-500' },
  { id: 'prices', icon: TrendingUp, label: 'Market Prices', color: 'from-orange-500 to-red-500' },
  { id: 'transport', icon: Truck, label: 'Transport', color: 'from-gray-500 to-slate-500' },
  { id: 'testing', icon: Microscope, label: 'Soil Testing', color: 'from-amber-500 to-yellow-500' },
  { id: 'pest', icon: Apple, label: 'Pest Scanner', color: 'from-red-500 to-orange-500' },
  { id: 'water', icon: Zap, label: 'Water Mgmt', color: 'from-blue-600 to-cyan-500' },
  { id: 'calendar', icon: Calendar, label: 'Farm Calendar', color: 'from-green-500 to-emerald-500' },
  { id: 'credit', icon: CreditCard, label: 'Credit & Loans', color: 'from-green-600 to-teal-500' },
  { id: 'journal', icon: Image, label: 'Farm Journal', color: 'from-purple-500 to-pink-500' },
  { id: 'contract', icon: Handshake, label: 'Contract Farming', color: 'from-blue-500 to-indigo-500' },
  { id: 'energy', icon: Sun, label: 'Renewable Energy', color: 'from-yellow-500 to-orange-500' },
  { id: 'workers', icon: Users2, label: 'Worker Mgmt', color: 'from-indigo-500 to-purple-500' },
  { id: 'insurance', icon: Shield, label: 'Insurance', color: 'from-red-500 to-pink-500' },
  { id: 'export', icon: Globe, label: 'Export Opps', color: 'from-green-600 to-blue-500' },
  { id: 'offline', icon: Radio, label: 'Offline Mode', color: 'from-slate-500 to-gray-500' },
  { id: 'training', icon: Lightbulb, label: 'Training', color: 'from-purple-500 to-pink-500' },
  { id: 'coop', icon: Warehouse, label: 'Cooperative Hub', color: 'from-amber-500 to-orange-500' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>FarmAI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/home" className="hover:text-green-100 transition flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>

            {/* Features Dropdown */}
            <div className="relative group">
              <button className="hover:text-green-100 transition flex items-center gap-2">
                <Crop className="w-4 h-4" />
                Features
              </button>
              <div className="absolute left-0 mt-0 w-screen max-w-6xl bg-white text-gray-900 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6">
                <div className="grid grid-cols-4 gap-3">
                  {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <Link
                        key={feature.id}
                        href={`/features/${feature.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition group/item"
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{feature.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-green-100">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 bg-green-600 hover:bg-green-800 rounded-lg transition">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 bg-white text-green-700 font-semibold hover:bg-gray-100 rounded-lg transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-green-600 rounded-lg transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-green-600 border-t border-green-500 max-h-96 overflow-y-auto">
            <div className="px-4 py-4 space-y-3">
              <Link href="/home" className="block py-2 hover:bg-green-700 rounded px-3 transition">
                Home
              </Link>

              {/* Mobile Features */}
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full flex items-center justify-between py-2 px-3 hover:bg-green-700 rounded transition"
              >
                <span>Features</span>
                <span>{featuresOpen ? '▲' : '▼'}</span>
              </button>

              {featuresOpen && (
                <div className="bg-green-700 rounded px-3 py-2 space-y-2">
                  {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <Link
                        key={feature.id}
                        href={`/features/${feature.id}`}
                        className="flex items-center gap-2 py-2 hover:text-green-200 transition"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{feature.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}

              {user ? (
                <>
                  <div className="py-2 px-3 text-green-100">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 justify-center py-2 bg-red-500 hover:bg-red-600 rounded transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block text-center py-2 bg-green-800 hover:bg-green-900 rounded transition">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="block text-center py-2 bg-white text-green-700 font-semibold rounded transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
