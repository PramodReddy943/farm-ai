'use client'

import { useState } from 'react'
import FarmProfile from '@/components/FarmProfile'
import ScanHistory from '@/components/ScanHistory'
import { useStore } from '@/lib/store'

export default function MyFarmPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile')
  const { farm } = useStore()

  return (
    <div className="min-h-screen bg-light-bg">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Farm</h1>
          {farm?.name && (
            <p className="text-sm text-gray-600 mt-1">{farm.name}</p>
          )}
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-14 z-9 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-2xl px-4 flex gap-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-2 border-b-2 font-medium transition ${
              activeTab === 'profile'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-2 border-b-2 font-medium transition ${
              activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Scan History
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {activeTab === 'profile' && <FarmProfile />}
        {activeTab === 'history' && <ScanHistory />}
      </div>
    </div>
  )
}
