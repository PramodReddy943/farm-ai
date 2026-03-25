'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Phone, MapPin, Eye, EyeOff, Leaf, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function SignupPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer' as 'farmer' | 'buyer' | 'supplier',
    state: '',
    location: '',
  })

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (step === 1) {
      setStep(2)
      return
    }

    try {
      await signup(formData)
      router.push('/home')
    } catch (err) {
      setError('Failed to create account. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <Leaf className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">FarmAI</h1>
            <p className="text-green-100 text-sm">Smart Farming Platform</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join FarmAI and start farming smarter</p>
              <div className="mt-4 flex justify-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  step >= 1 ? 'bg-green-600' : 'bg-gray-300'
                }`}>1</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  step >= 2 ? 'bg-green-600' : 'bg-gray-300'
                }`}>2</div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                    <div className="space-y-2">
                      {['farmer', 'buyer', 'supplier'].map((role) => (
                        <label key={role} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-green-50 transition" style={{
                          borderColor: formData.role === role ? '#10b981' : '#e5e7eb',
                          backgroundColor: formData.role === role ? '#f0fdf4' : 'white',
                        }}>
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={formData.role === role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                            className="mr-3"
                          />
                          <span className="font-medium text-gray-700 capitalize">{role}</span>
                          <span className="text-sm text-gray-500 ml-auto">
                            {role === 'farmer' && '🚜'}
                            {role === 'buyer' && '🛒'}
                            {role === 'supplier' && '📦'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit number"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 z-10" />
                      <select
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition appearance-none"
                      >
                        <option value="">Select your state</option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City/Village</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Your city or village"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Minimum 8 characters"
                        className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Next/Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:from-gray-400 disabled:to-gray-400"
              >
                {isLoading ? 'Creating account...' : step === 1 ? 'Next' : 'Create Account'}
              </button>

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Back
                </button>
              )}
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-green-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
