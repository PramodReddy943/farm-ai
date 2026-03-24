'use client'

import { useState } from 'react'
import DiseaseScanner from '@/components/DiseaseScanner'
import SymptomQuestionnaire from '@/components/SymptomQuestionnaire'
import ScanResults from '@/components/ScanResults'

type ScanMode = 'mode-select' | 'image' | 'symptoms' | 'results'

export default function ScannerPage() {
  const [mode, setMode] = useState<ScanMode>('mode-select')
  const [results, setResults] = useState(null)

  return (
    <div className="min-h-screen bg-light-bg">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-900">Scan Plant Disease</h1>
          <p className="text-sm text-gray-600 mt-1">Upload image or describe symptoms</p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {mode === 'mode-select' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('image')}
              className="w-full p-6 bg-white rounded-lg border-2 border-primary hover:bg-green-50 transition"
            >
              <div className="text-3xl mb-2">📸</div>
              <h2 className="font-bold text-lg text-gray-900">Upload Image</h2>
              <p className="text-sm text-gray-600 mt-1">Take or upload a photo of affected plant</p>
            </button>

            <button
              onClick={() => setMode('symptoms')}
              className="w-full p-6 bg-white rounded-lg border-2 border-accent hover:bg-blue-50 transition"
            >
              <div className="text-3xl mb-2">❓</div>
              <h2 className="font-bold text-lg text-gray-900">Answer Questions</h2>
              <p className="text-sm text-gray-600 mt-1">Describe symptoms to get diagnosis</p>
            </button>
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
