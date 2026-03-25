'use client'

import { useState, useRef } from 'react'
import { Upload, Camera, Loader, AlertTriangle, Leaf, Bug } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { callAI } from '@/lib/ai-providers'

interface DetectionResult {
  pest: string
  severity: 'low' | 'medium' | 'high'
  description: string
  treatment: string
  preventive: string
  affected_crops: string[]
}

export default function PestScannerPage() {
  const { user } = useAuth()
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [upcomingPests, setUpcomingPests] = useState([
    {
      name: 'Armyworm',
      season: 'June-September',
      crops: 'Maize, Rice',
      risk: 'High',
      color: 'text-red-600',
    },
    {
      name: 'Brown Plant Hopper',
      season: 'July-October',
      crops: 'Rice, Wheat',
      risk: 'Medium',
      color: 'text-orange-600',
    },
    {
      name: 'Thrips',
      season: 'Year Round',
      crops: 'Cotton, Vegetables',
      risk: 'Medium',
      color: 'text-yellow-600',
    },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        setImage(reader.result as string)
        setLoading(true)
        setResult(null)

        try {
          const context = `You are an expert agricultural pest identifier. Analyze the uploaded image and:
1. Identify if there are any pests visible
2. Name the pest(s)
3. Assess severity (low/medium/high)
4. Provide description
5. Suggest treatment methods
6. Suggest preventive measures
7. List affected crops

Respond ONLY with valid JSON in this exact format:
{
  "pest": "Pest Name",
  "severity": "low|medium|high",
  "description": "Description of the pest",
  "treatment": "Treatment recommendations",
  "preventive": "Preventive measures",
  "affected_crops": ["crop1", "crop2"]
}`

          const response = await callAI('gemini', `Analyze this farm pest image: ${image}`, context)

          try {
            const parsed = JSON.parse(response)
            setResult(parsed)
          } catch {
            // Fallback if response isn't valid JSON
            setResult({
              pest: 'Unknown Pest',
              severity: 'medium',
              description:
                response ||
                'Unable to identify pest. Please try another image or contact an expert.',
              treatment: 'Consult with local agricultural officer',
              preventive: 'Maintain proper crop hygiene',
              affected_crops: [],
            })
          }
        } catch (error) {
          setResult({
            pest: 'Analysis Failed',
            severity: 'low',
            description: 'Could not analyze the image. Please try again.',
            treatment: 'Contact agricultural expert',
            preventive: 'Keep monitoring your crops',
            affected_crops: [],
          })
        } finally {
          setLoading(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCamera = () => {
    // Note: In production, integrate with device camera
    alert('Camera feature coming soon! For now, please upload an image.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Bug className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Pest Scanner</h1>
          </div>
          <p className="text-red-100">
            Identify pests instantly using AI and get treatment recommendations
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Scanner */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-dashed border-gray-300 hover:border-red-400 transition">
              <div className="text-center">
                <div className="mb-6 flex justify-center gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </button>
                  <button
                    onClick={handleCamera}
                    className="flex items-center gap-3 px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    <Camera className="w-5 h-5" />
                    Take Photo
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-gray-600 text-sm">
                  Upload a photo of a pest or affected crop leaf for instant analysis
                </p>
              </div>
            </div>

            {/* Preview */}
            {image && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={image} alt="Preview" className="w-full h-96 object-cover" />
              </div>
            )}

            {/* Results */}
            {loading && (
              <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
                  <p className="text-gray-600">Analyzing image...</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-600">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`p-3 rounded-lg ${
                      result.severity === 'high'
                        ? 'bg-red-100'
                        : result.severity === 'medium'
                          ? 'bg-yellow-100'
                          : 'bg-green-100'
                    }`}
                  >
                    <AlertTriangle
                      className={`w-6 h-6 ${
                        result.severity === 'high'
                          ? 'text-red-600'
                          : result.severity === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                      }`}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{result.pest}</h2>
                    <p
                      className={`text-sm font-semibold ${
                        result.severity === 'high'
                          ? 'text-red-600'
                          : result.severity === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                      }`}
                    >
                      Severity: {result.severity.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{result.description}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Treatment</h3>
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                      <p className="text-gray-700">{result.treatment}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Prevention</h3>
                    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                      <p className="text-gray-700">{result.preventive}</p>
                    </div>
                  </div>

                  {result.affected_crops.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Affected Crops</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.affected_crops.map((crop) => (
                          <span
                            key={crop}
                            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setImage(null)
                      setResult(null)
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Analyze Another Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Upcoming Pests */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-orange-500" />
                Alert: Upcoming Pests
              </h2>
              <div className="space-y-3">
                {upcomingPests.map((pest, idx) => (
                  <div key={idx} className="border-l-4 border-yellow-400 pl-4 py-2">
                    <p className="font-bold text-gray-900">{pest.name}</p>
                    <p className="text-sm text-gray-600">Season: {pest.season}</p>
                    <p className="text-sm text-gray-600">Affects: {pest.crops}</p>
                    <p className={`text-sm font-semibold ${pest.color}`}>Risk: {pest.risk}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Prevention Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Crop rotation reduces pest build-up</li>
                <li>• Remove affected plants early</li>
                <li>• Use organic pesticides when possible</li>
                <li>• Monitor crops weekly</li>
                <li>• Maintain proper field hygiene</li>
              </ul>
            </div>

            {/* Expert Help */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Need Expert Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Connect with agricultural experts for personalized guidance
              </p>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
