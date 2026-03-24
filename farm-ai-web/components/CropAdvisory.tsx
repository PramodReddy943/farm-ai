'use client'

import { useState, useEffect } from 'react'
import { getCropAdvice } from '@/lib/gemini'
import { useStore } from '@/lib/store'

export default function CropAdvisory() {
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(true)
  const { farm } = useStore()

  useEffect(() => {
    const fetchAdvice = async () => {
      if (farm?.location && farm?.crops?.length > 0) {
        try {
          const text = await getCropAdvice(
            farm.crops[0],
            farm.location,
            'Current'
          )
          setAdvice(text)
        } catch (error) {
          console.error('Failed to fetch advice:', error)
          setAdvice('Unable to fetch crop advice at this moment.')
        }
      }
      setLoading(false)
    }

    fetchAdvice()
  }, [farm])

  if (loading) {
    return <div className="animate-pulse h-24 bg-gray-200 rounded-lg" />
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200">
      <h2 className="text-lg font-bold text-gray-900 mb-3">💡 Crop Advisory</h2>
      <div className="text-sm text-gray-700 leading-relaxed line-clamp-4">
        {advice || 'No advisory available yet.'}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Updated based on your farm and current conditions
      </p>
    </div>
  )
}
