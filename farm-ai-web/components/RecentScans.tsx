'use client'

import { useState } from 'react'
import { useScan } from '@/lib/context/ScanContext'
import { formatDate } from '@/lib/utils'

export default function RecentScans() {
  const { scanHistory } = useScan()
  const recentScans = scanHistory.slice(0, 3)

  if (recentScans.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
        <p className="text-gray-600">No scans yet. Start by scanning a plant disease!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Disease Scans</h2>
      <div className="space-y-3">
        {recentScans.map((scan: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{scan.disease}</h3>
                <p className="text-sm text-gray-600 mt-1">{scan.cropType}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(scan.date)}</p>
              </div>
              <div className="text-right">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  scan.confidence > 80
                    ? 'bg-red-100 text-red-700'
                    : scan.confidence > 60
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                }`}>
                  {scan.confidence}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
