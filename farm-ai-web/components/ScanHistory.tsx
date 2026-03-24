'use client'

export default function ScanHistory() {
  const history = [
    {
      id: 1,
      crop: 'Tomato',
      disease: 'Early Blight',
      date: '2024-03-20',
      confidence: 92,
      image: '🍅',
    },
    {
      id: 2,
      crop: 'Wheat',
      disease: 'Rust',
      date: '2024-03-15',
      confidence: 78,
      image: '🌾',
    },
    {
      id: 3,
      crop: 'Cotton',
      disease: 'Healthy',
      date: '2024-03-10',
      confidence: 95,
      image: '🟤',
    },
  ]

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
        <p className="text-gray-600">No scan history yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 flex-1">
              <div className="text-4xl">{item.image}</div>
              <div>
                <h3 className="font-bold text-gray-900">{item.crop}</h3>
                <p className="text-sm text-gray-600">{item.disease}</p>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              item.confidence > 85
                ? 'bg-red-100 text-red-700'
                : item.confidence > 70
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
            }`}>
              {item.confidence}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
