'use client'

import { useState } from 'react'
import { Camera, MessageSquare } from 'lucide-react'
import DiseaseScanner from '@/components/DiseaseScanner'
import SymptomQuestionnaire from '@/components/SymptomQuestionnaire'
import ScanResults from '@/components/ScanResults'

type ScanMode = 'mode-select' | 'image' | 'symptoms' | 'results'

export default function ScannerPage() {
  const [mode, setMode] = useState<ScanMode>('mode-select')
  const [results, setResults] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Beautiful Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 text-white shadow-lg">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">🌿 Plant Health Scan</h1>
          <p className="text-green-100 text-lg">Detect diseases early and save your crops</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {mode === 'mode-select' && (
          <div className="space-y-6">
            {/* Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload Card */}
              <button
                onClick={() => setMode('image')}
                className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <div className="mb-4 p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-bold text-xl text-gray-900 mb-2">Upload Image</h2>
                  <p className="text-sm text-gray-600">Take or upload a photo of affected plant</p>
                  <div className="mt-4 text-xs text-green-600 font-medium">Fast & Accurate AI Analysis</div>
                </div>
              </button>

              {/* Questions Card */}
              <button
                onClick={() => setMode('symptoms')}
                className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <div className="mb-4 p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-bold text-xl text-gray-900 mb-2">Describe Symptoms</h2>
                  <p className="text-sm text-gray-600">Answer simple questions about plant condition</p>
                  <div className="mt-4 text-xs text-blue-600 font-medium">Guided AI Questions</div>
                </div>
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-amber-900">💡 Tip:</span> Both methods work great! Choose whichever is more convenient for you right now.
              </p>
            </div>
          </div>
        )}

        {mode === 'image' && (
          <DiseaseScanner 
            onResults={(data) => {
              setResults(data)
              setMode('results')
            }}
            onBack={() => setMode('mode-select')}
          />
        )}

        {mode === 'symptoms' && (
          <SymptomQuestionnaire
            onResults={(data) => {
              setResults(data)
              setMode('results')
            }}
            onBack={() => setMode('mode-select')}
          />
        )}

        {mode === 'results' && results && (
          <ScanResults 
            data={results}
            onNewScan={() => {
              setMode('mode-select')
              setResults(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
