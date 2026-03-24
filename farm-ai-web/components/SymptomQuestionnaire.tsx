'use client'

import { useState } from 'react'
import { analyzeSymptomsWithAI } from '@/lib/gemini'
import { AlertCircle } from 'lucide-react'

const cropOptions = ['Tomato', 'Wheat', 'Rice', 'Cotton', 'Potato', 'Corn', 'Sugarcane', 'Chili']
const symptomOptions = [
  'Yellow leaves',
  'Brown spots',
  'White powder',
  'Wilting',
  'Leaf curling',
  'Stem rot',
  'Fruit rot',
  'Insect damage',
]
const weatherOptions = ['Hot & Dry', 'Hot & Humid', 'Cool & Dry', 'Cool & Rainy']

interface SymptomQuestionnaireProps {
  onResults: (data: any) => void
  onBack: () => void
}

export default function SymptomQuestionnaire({ onResults, onBack }: SymptomQuestionnaireProps) {
  const [step, setStep] = useState(0)
  const [crop, setCrop] = useState('')
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [weather, setWeather] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleAnalyze = async () => {
    if (!crop || symptoms.length === 0 || !weather) return

    setLoading(true)
    try {
      const results = await analyzeSymptomsWithAI(crop, symptoms, weather)
      onResults({
        ...results,
        crop,
        symptoms,
        weather,
        date: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      title: 'What crop is affected?',
      options: cropOptions,
      value: crop,
      setValue: setCrop,
    },
    {
      title: 'What symptoms do you see? (Select multiple)',
      options: symptomOptions,
      isMultiple: true,
      value: symptoms,
      setValue: setSymptoms,
      toggleOption: handleSymptomToggle,
    },
    {
      title: 'What is the current weather?',
      options: weatherOptions,
      value: weather,
      setValue: setWeather,
    },
  ]

  const currentStep = steps[step]
  const isLastStep = step === steps.length - 1
  const isComplete = crop && symptoms.length > 0 && weather

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
        <p className="text-sm text-gray-600">Step {step + 1} of {steps.length}</p>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {currentStep.isMultiple ? (
          symptomOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleSymptomToggle(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition ${
                symptoms.includes(option)
                  ? 'border-primary bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={symptoms.includes(option)}
                  onChange={() => {}}
                  className="w-5 h-5 rounded border-gray-300 text-primary"
                />
                <span className="ml-3 font-medium text-gray-900">{option}</span>
              </div>
            </button>
          ))
        ) : (
          currentStep.options?.map((option) => (
            <button
              key={option}
              onClick={() => currentStep.setValue(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition font-medium ${
                currentStep.value === option
                  ? 'border-primary bg-green-50 text-primary'
                  : 'border-gray-200 text-gray-900 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <button
          onClick={() => (step === 0 ? onBack() : setStep(step - 1))}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          disabled={loading}
        >
          {step === 0 ? 'Back' : 'Previous'}
        </button>

        {!isLastStep ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            disabled={
              loading ||
              (currentStep.isMultiple ? symptoms.length === 0 : !currentStep.value)
            }
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleAnalyze}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            disabled={loading || !isComplete}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        )}
      </div>

      {!isComplete && isLastStep && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
          <AlertCircle size={16} />
          Please fill all fields to analyze
        </div>
      )}
    </div>
  )
}
