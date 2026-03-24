'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'

export default function FarmProfile() {
  const { farm, setFarm } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(farm || {
    name: '',
    size: '',
    location: '',
    crops: [],
    soilType: '',
  })

  const handleSave = () => {
    if (formData.name && formData.size && formData.location) {
      setFarm(formData as any)
      setIsEditing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Farm Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-primary hover:underline font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Farm name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <input
              type="number"
              placeholder="Farm size (hectares)"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Crops (comma-separated)"
              value={formData.crops?.join(', ') || ''}
              onChange={(e) => setFormData({ ...formData, crops: e.target.value.split(',').map(c => c.trim()) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />

            <button
              onClick={handleSave}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-green-700"
            >
              Save Farm Details
            </button>
          </div>
        ) : (
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Farm Name</p>
              <p className="text-lg font-semibold">{farm?.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Farm Size</p>
              <p className="text-lg font-semibold">{farm?.size ? `${farm.size} hectares` : 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
              <p className="text-lg font-semibold">{farm?.location || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Crops</p>
              <p className="text-lg font-semibold">{farm?.crops?.join(', ') || 'Not set'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
