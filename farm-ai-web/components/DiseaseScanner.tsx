'use client'

import { useState, useRef } from 'react'
import { Upload, Camera, X } from 'lucide-react'
import { convertFileToBase64 } from '@/lib/utils'
import { analyzeDiseaseImage } from '@/lib/gemini'

interface DiseaseScannerProps {
  onResults: (data: any) => void
  onBack: () => void
}

export default function DiseaseScanner({ onResults, onBack }: DiseaseScannerProps) {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    try {
      const base64 = await convertFileToBase64(file)
      setImage(base64)
      setError('')
      
      // Analyze the image with Gemini
      setLoading(true)
      const results = await analyzeDiseaseImage(base64)
      onResults({
        ...results,
        image: base64,
        date: new Date().toISOString(),
      })
    } catch (err) {
      setError('Failed to analyze image. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
      />

      {!image ? (
        <div className="space-y-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="w-full p-6 bg-white border-2 border-dashed border-primary rounded-lg hover:bg-green-50 transition disabled:opacity-50"
          >
            <Upload size={32} className="mx-auto text-primary mb-2" />
            <h3 className="font-bold text-gray-900">Upload Image</h3>
            <p className="text-sm text-gray-600 mt-1">Tap to select from gallery</p>
          </button>

          <button
            onClick={() => setImage('camera-placeholder')}
            className="w-full p-6 bg-white border-2 border-accent rounded-lg hover:bg-blue-50 transition"
          >
            <Camera size={32} className="mx-auto text-accent mb-2" />
            <h3 className="font-bold text-gray-900">Take Photo</h3>
            <p className="text-sm text-gray-600 mt-1">Use camera for live capture</p>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            {image !== 'camera-placeholder' && (
              <img
                src={image}
                alt="Disease scan"
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            {image === 'camera-placeholder' && (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Camera view would appear here</p>
              </div>
            )}
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {loading && (
            <div className="text-center py-6">
              <div className="spinner mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Analyzing image...</p>
              <p className="text-sm text-gray-500 mt-1">Using Gemini AI to detect disease</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Back
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
