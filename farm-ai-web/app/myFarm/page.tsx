'use client'

import { useState } from 'react'
import { MapPin, History, Settings } from 'lucide-react'
import FarmProfile from '@/components/FarmProfile'
import ScanHistory from '@/components/ScanHistory'
import { useStore } from '@/lib/store'

export default function MyFarmPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile')
  const { farm } = useStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-8">
      {/* Beautiful Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 text-white shadow-lg">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8" />
            <h1 className="text-4xl font-bold">My Farm</h1>
          </div>
          {farm?.name && (
            <p className="text-green-100 text-lg ml-11">🚜 {farm.name}</p>
          )}
          <p className="text-green-100 mt-2">Manage your farm profile and view scan history</p>
        </div>
      </header>

      {/* Tab Navigation - Enhanced */}
      <div className="sticky top-[80px] z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 flex gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-6 border-b-2 font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            Farm Profile
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-6 border-b-2 font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <History className="w-5 h-5" />
            Scan History
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full" />
                Farm Information
              </h2>
              <p className="text-gray-600 mt-1">Update and manage your farm details</p>
            </div>
            <FarmProfile />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                Your Scan History
              </h2>
              <p className="text-gray-600 mt-1">View all your previous plant health scans</p>
            </div>
            <ScanHistory />
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mx-auto max-w-4xl px-4 mt-8">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-blue-900">💡 Quick Tip:</span> Keep your farm profile updated to get more personalized recommendations. Regular scans help track your plants' health over time.
          </p>
        </div>
      </div>
    </div>
  )
}
