'use client'

import { Pill, AlertCircle, Leaf } from 'lucide-react'

interface ScanResultsProps {
  data: any
  onNewScan: () => void
}

export default function ScanResults({ data, onNewScan }: ScanResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'severe':
        return 'bg-red-100 text-red-700'
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-green-100 text-green-700'
    }
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Disease Card */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className={`p-6 ${getSeverityColor(data.severity || '')}`}>
          <h2 className="text-2xl font-bold mb-2">
            {data.disease_name || data.disease || 'Unknown Disease'}
          </h2>
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              Confidence: {data.confidence || 0}%
            </span>
            <span className="text-sm font-medium capitalize">
              {data.severity || 'Unknown'} Severity
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle size={20} />
              Description
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.description || 'No description available'}
            </p>
          </div>

          {data.symptoms && (
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Visible Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(data.symptoms) && data.symptoms.map((symptom: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Treatments */}
      {data.treatments && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Pill size={20} />
            Recommended Medicines
          </h3>
          <div className="space-y-3">
            {Array.isArray(data.treatments) && data.treatments.map((medicine: any, i: number) => (
              <div
                key={i}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <h4 className="font-bold text-gray-900">
                  {typeof medicine === 'string' ? medicine : medicine.name}
                </h4>
                {typeof medicine === 'object' && (
                  <>
                    <p className="text-sm text-gray-600 mt-1">
                      {medicine.dosage && `Dosage: ${medicine.dosage}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {medicine.safetyPeriod && `Safety period: ${medicine.safetyPeriod}`}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prevention */}
      {data.prevention && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Leaf size={20} />
            Prevention Methods
          </h3>
          <ul className="space-y-2">
            {Array.isArray(data.prevention) && data.prevention.map((method: string, i: number) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                {method}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={onNewScan}
          className="flex-1 px-4 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-green-50"
        >
          Scan Another
        </button>
        <button className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-green-700">
          Save Result
        </button>
      </div>
    </div>
  )
}
