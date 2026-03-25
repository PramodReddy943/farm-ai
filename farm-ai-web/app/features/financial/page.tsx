'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Calculator, Shield, FileText, Phone } from 'lucide-react'
import { useAuth } from '@/lib/auth'

interface LoanProduct {
  name: string
  provider: string
  rate: string
  amount: string
  term: string
  requirements: string[]
  contact: string
}

interface InsuranceScheme {
  name: string
  coverage: string
  premium: string
  crops: string
  contact: string
  benefits: string[]
}

const loanProducts: LoanProduct[] = [
  {
    name: 'Kisan Credit Card Loan',
    provider: 'NABARD',
    rate: '4% - 7%',
    amount: '₹5,00,000',
    term: '5 Years',
    requirements: [
      'Land documents',
      'Identity proof',
      'Income certificate',
      'No default in bank',
    ],
    contact: '+91-1166-555-333',
  },
  {
    name: 'Agricultural Gold Loan',
    provider: 'State Bank of India',
    rate: '7% - 9%',
    amount: '₹10,00,000',
    term: '3 Years',
    requirements: [
      'Gold ornaments',
      'Land certificate',
      'Identity proof',
      'Address proof',
    ],
    contact: '+91-1800-KISSAN',
  },
  {
    name: 'Term Loan for Machinery',
    provider: 'Punjab National Bank',
    rate: '5% - 8%',
    amount: '₹20,00,000',
    term: '7 Years',
    requirements: [
      'Land ownership',
      'Machinery quotation',
      'Business plan',
      'Insurance policy',
    ],
    contact: '+91-11-4444-5555',
  },
]

const insuranceSchemes: InsuranceScheme[] = [
  {
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    coverage: '72% of claim',
    premium: '1.5% - 5%',
    crops: 'All Major Crops',
    contact: '+91-1800-180-1551',
    benefits: [
      'Crop loss coverage',
      'Premium subsidy (Up to 90%)',
      'Quick claim settlement',
      'Free coverage for landless workers',
    ],
  },
  {
    name: 'Soil Health Card Scheme',
    coverage: 'Preventive',
    premium: 'Free',
    crops: 'All Crops',
    contact: '+91-11-2397-2408',
    benefits: [
      'Soil testing',
      'Nutrient recommendations',
      'Organic matter analysis',
      'pH level assessment',
    ],
  },
  {
    name: 'Livestock Insurance',
    coverage: '80% of market value',
    premium: '1% - 2%',
    crops: 'Dairy & Livestock',
    contact: '+91-1800-200-5555',
    benefits: [
      'Animal loss coverage',
      'Disease treatment coverage',
      'Mortality coverage',
      'Discounts for vaccinated animals',
    ],
  },
]

export default function FinancialToolsPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState<'loans' | 'insurance' | 'calculator'>('loans')
  const [farmData, setFarmData] = useState({
    area: '',
    crops: '',
    yield: '',
    expenses: '',
  })
  const [profits, setProfits] = useState<any>(null)

  const calculateProfits = () => {
    const area = parseFloat(farmData.area) || 0
    const expenses = parseFloat(farmData.expenses) || 0

    // Sample yield rates per crop
    const yieldRates: any = {
      wheat: { price: 2400, yield: 50 },
      rice: { price: 3200, yield: 60 },
      cotton: { price: 5800, yield: 20 },
      maize: { price: 1900, yield: 80 },
    }

    const selectedCrop = farmData.crops.toLowerCase()
    const data = yieldRates[selectedCrop] || { price: 2000, yield: 40 }

    const totalYield = area * data.yield
    const revenue = totalYield * data.price
    const profit = revenue - expenses
    const profitMargin = ((profit / revenue) * 100).toFixed(2)

    setProfits({
      crop: farmData.crops,
      area,
      totalYield,
      revenue,
      expenses,
      profit,
      profitMargin,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Financial Tools</h1>
          </div>
          <p className="text-yellow-100">
            Access loans, insurance, and calculate farm profits
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setTab('loans')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'loans'
                ? 'border-yellow-600 text-yellow-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            💰 Loans
          </button>
          <button
            onClick={() => setTab('insurance')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'insurance'
                ? 'border-yellow-600 text-yellow-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Insurance
          </button>
          <button
            onClick={() => setTab('calculator')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'calculator'
                ? 'border-yellow-600 text-yellow-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <Calculator className="w-4 h-4 inline mr-2" />
            Profit Calculator
          </button>
        </div>

        {/* Loans Tab */}
        {tab === 'loans' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-l-4 border-yellow-600">
              <h2 className="text-xl font-bold text-yellow-900 mb-2">
                Government & Bank Loans for Farmers
              </h2>
              <p className="text-yellow-800">
                Access affordable credit for farming operations, equipment, and expansion
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              {loanProducts.map((loan, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{loan.name}</h3>
                    <p className="text-sm text-gray-600">{loan.provider}</p>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-bold text-yellow-600">{loan.rate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Max Loan Amount</span>
                      <span className="font-bold text-yellow-600">{loan.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Term</span>
                      <span className="font-bold text-yellow-600">{loan.term}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Requirements:</p>
                    <ul className="space-y-1">
                      {loan.requirements.map((req, jdx) => (
                        <li key={jdx} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="text-yellow-600">✓</span> {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                    <Phone className="w-4 h-4" />
                    {loan.contact}
                  </button>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">💡 Loan Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Start early:</strong> Apply 2-3 months before you need the funds
                </li>
                <li>
                  • <strong>Keep documents ready:</strong> Land deeds, ID proofs, bank statements
                </li>
                <li>
                  • <strong>Check eligibility:</strong> Different loans have different criteria
                </li>
                <li>
                  • <strong>Compare rates:</strong> Interest rates vary; shop around
                </li>
                <li>
                  • <strong>Repay on time:</strong> Good payment history helps for future loans
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Insurance Tab */}
        {tab === 'insurance' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 border-l-4 border-green-600">
              <h2 className="text-xl font-bold text-green-900 mb-2">
                Government Insurance Schemes
              </h2>
              <p className="text-green-800">
                Protect your crops and livestock with affordable government insurance schemes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {insuranceSchemes.map((scheme, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-green-100"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{scheme.name}</h3>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Coverage</span>
                      <span className="font-bold text-green-600">{scheme.coverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Premium</span>
                      <span className="font-bold text-green-600">{scheme.premium}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">For Crops</span>
                      <span className="font-bold text-green-600">{scheme.crops}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</p>
                    <ul className="space-y-1">
                      {scheme.benefits.map((benefit, jdx) => (
                        <li key={jdx} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="text-green-600">✓</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    <Phone className="w-4 h-4" />
                    {scheme.contact}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {tab === 'calculator' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-l-4 border-purple-600">
              <h2 className="text-xl font-bold text-purple-900 mb-2">
                Farm Profit Calculator
              </h2>
              <p className="text-purple-800">
                Calculate expected profits based on your farm size, crop, and expenses
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Enter Your Details</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Farm Size (acres)
                    </label>
                    <input
                      type="number"
                      value={farmData.area}
                      onChange={(e) => setFarmData({ ...farmData, area: e.target.value })}
                      placeholder="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Main Crop
                    </label>
                    <select
                      value={farmData.crops}
                      onChange={(e) => setFarmData({ ...farmData, crops: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                    >
                      <option>Select Crop</option>
                      <option>Wheat</option>
                      <option>Rice</option>
                      <option>Cotton</option>
                      <option>Maize</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Total Expenses (₹)
                    </label>
                    <input
                      type="number"
                      value={farmData.expenses}
                      onChange={(e) => setFarmData({ ...farmData, expenses: e.target.value })}
                      placeholder="50000"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      Include seeds, fertilizers, labor, irrigation, pesticides
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={calculateProfits}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate Profit
                  </button>
                </form>
              </div>

              {/* Results */}
              {profits && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-600">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Profit Analysis</h3>
                    <div className="space-y-4">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Total Revenue</p>
                        <p className="text-3xl font-bold text-purple-600">₹{profits.revenue.toFixed(0)}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Total Expenses</p>
                        <p className="text-3xl font-bold text-orange-600">₹{profits.expenses}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Net Profit</p>
                        <p className="text-3xl font-bold text-green-600">₹{profits.profit.toFixed(0)}</p>
                        <p className="text-sm text-green-700 mt-1">
                          Profit Margin: {profits.profitMargin}%
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Total Yield</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {profits.totalYield.toFixed(0)} Quintals
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-lg p-6">
                    <p className="text-sm font-semibold text-gray-900 mb-3">💡 Recommendations</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        • Your profit margin is{' '}
                        <strong>
                          {parseFloat(profits.profitMargin) > 50
                            ? 'excellent'
                            : parseFloat(profits.profitMargin) > 30
                              ? 'good'
                              : 'needs improvement'}
                        </strong>
                      </li>
                      <li>• Focus on reducing input costs without compromising yield</li>
                      <li>• Consider diversifying crops to spread risk</li>
                      <li>• Use market insights to time your sales for better prices</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
