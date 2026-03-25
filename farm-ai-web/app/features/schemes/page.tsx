'use client'

import { useState } from 'react'
import { FileText, CheckCircle, AlertCircle, ArrowRight, BookOpen } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { callAI } from '@/lib/ai-providers'

interface Scheme {
  id: string
  name: string
  ministry: string
  description: string
  benefits: string[]
  eligibility: string[]
  applyUrl: string
  deadline: string
}

const schemes: Scheme[] = [
  {
    id: 'pmksy',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    ministry: 'Ministry of Water Resources',
    description: 'Irrigation infrastructure development and watershed projects',
    benefits: [
      'Subsidy up to 85% for irrigation equipment',
      'Drip/sprinkler system at 50-60% subsidy',
      'Rejuvenation of water resources',
      'Groundwater harvesting support',
    ],
    eligibility: [
      'Indian farmer with own land',
      'Land holding between 0.5-4 hectares',
      'Not availing similar benefit elsewhere',
      'Farm must be within water scarce region',
    ],
    applyUrl: 'https://pmksy.gov.in',
    deadline: 'Rolling basis (Year-round)',
  },
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    ministry: 'Ministry of Agriculture',
    description: 'Direct income support scheme for farmers',
    benefits: [
      '₹6,000 per year (₹2,000 in 3 installments)',
      'Direct transfer to bank account',
      'No paperwork required after registration',
      'Covers all landholding farmers',
    ],
    eligibility: [
      'Indian citizen farmer',
      'Own or lease agricultural land',
      'All states and union territories',
      'Family with cultivable land',
    ],
    applyUrl: 'https://pmkisan.gov.in',
    deadline: 'Year-round registration',
  },
  {
    id: 'pkvy',
    name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    ministry: 'Ministry of Agriculture',
    description: 'Organic farming promotion scheme',
    benefits: [
      'Organic certification support',
      '₹50,000 per hectare for 3 years',
      'Chemical-free farming incentive',
      'Premium market access',
    ],
    eligibility: [
      'Interested in organic farming',
      'Land in organic group',
      'No chemical use for past 3 years',
      'Minimum 0.5 hectare land',
    ],
    applyUrl: 'https://eams.nic.in',
    deadline: 'Applications open throughout year',
  },
  {
    id: 'pmmy',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    ministry: 'Ministry of Finance',
    description: 'Micro-finance for small farmers and agribusiness',
    benefits: [
      'Loans up to ₹10 lakhs',
      'No collateral required',
      'Collateral-free loans at low interest',
      'Quick processing',
    ],
    eligibility: [
      'Individual or business owner',
      'Age 18 years and above',
      'No existing loan with bank',
      'For business/farming activities',
    ],
    applyUrl: 'https://www.pib.gov.in',
    deadline: 'Year-round',
  },
  {
    id: 'dbt-scheme',
    name: 'Direct Benefit Transfer (DBT) Schemes',
    ministry: 'Multiple Ministries',
    description: 'Direct cash transfer to farmers for various purposes',
    benefits: [
      'Fertilizer subsidy direct transfer',
      'Insurance premium subsidy',
      'Seed subsidy programs',
      '₹40,000-50,000 annual support',
    ],
    eligibility: [
      'Valid Aadhar card',
      'Bank account linked to Aadhar',
      'Land ownership or lease documents',
      'No income above ₹1.5 lakh/month',
    ],
    applyUrl: 'https://dbt.gov.in',
    deadline: 'Throughout the fiscal year',
  },
]

interface ChecklistItem {
  label: string
  checked: boolean
}

export default function GovernmentSchemesPage() {
  const { user } = useAuth()
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [eligibilityMessages, setEligibilityMessages] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSchemeSelect = (scheme: Scheme) => {
    setSelectedScheme(scheme)
    setChecklist(
      scheme.eligibility.map((item) => ({
        label: item,
        checked: false,
      }))
    )
    setEligibilityMessages('')
  }

  const handleCheckEligibility = async () => {
    const checkedItems = checklist.filter((item) => item.checked).length
    const totalItems = checklist.length
    const eligibilityPercentage = (checkedItems / totalItems) * 100

    let message = ''
    if (eligibilityPercentage === 100) {
      message = `✅ You fully meet the eligibility criteria for ${selectedScheme?.name}! You should apply immediately.`
    } else if (eligibilityPercentage >= 80) {
      message = `🟡 You mostly meet the criteria (${eligibilityPercentage.toFixed(0)}%). Contact the department for clarification on missing requirements.`
    } else if (eligibilityPercentage >= 50) {
      message = `⚠️ You meet ${eligibilityPercentage.toFixed(0)}% criteria. Work on meeting the remaining requirements before applying.`
    } else {
      message = `❌ You currently don't meet enough criteria. Consider other applicable schemes or work on meeting these requirements.`
    }

    setEligibilityMessages(message)

    // Ask AI for advice
    await handleAIAdvice(
      `I'm checking eligibility for ${selectedScheme?.name}. I meet ${eligibilityPercentage.toFixed(0)}% of the criteria. What should I do?`
    )
  }

  const handleAIAdvice = async (query: string) => {
    if (!query.trim()) return

    setMessages([...messages, { role: 'user', content: query }])
    setInput('')
    setLoading(true)

    try {
      const context = `You are a government scheme expert for farmers. Provide advice on:
- Government schemes eligibility
- Application process
- Documentation needed
- Benefits and how to maximize them
- Alternative schemes if current one is not applicable`

      const response = await callAI('gemini', query, context)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, could not get advice. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Government Schemes</h1>
          </div>
          <p className="text-indigo-100">
            Find and apply for government farming schemes you're eligible for
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Schemes List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search / Introduction */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
              <h2 className="text-xl font-bold text-indigo-900 mb-2">
                🏛️ Major Schemes Available
              </h2>
              <p className="text-indigo-800 text-sm">
                {schemes.length}+ government schemes to support your farming. Check eligibility for each
                scheme and apply for the ones you qualify for.
              </p>
            </div>

            {/* Schemes Cards */}
            <div className="space-y-4">
              {schemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition ${
                    selectedScheme?.id === scheme.id
                      ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-indigo-400'
                  }`}
                  onClick={() => handleSchemeSelect(scheme)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{scheme.name}</h3>
                      <p className="text-sm text-gray-600">{scheme.ministry}</p>
                    </div>
                    <CheckCircle
                      className={`w-5 h-5 ${
                        selectedScheme?.id === scheme.id
                          ? 'text-indigo-600'
                          : 'text-gray-300'
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-700">{scheme.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scheme Details & Eligibility Check */}
          {selectedScheme && (
            <div className="space-y-6">
              {/* Scheme Details */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {selectedScheme.name}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      Key Benefits:
                    </p>
                    <ul className="space-y-2">
                      {selectedScheme.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">
                      <strong>Deadline:</strong> {selectedScheme.deadline}
                    </p>
                    <a
                      href={selectedScheme.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                    >
                      Official Website
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Eligibility Checker */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Check Your Eligibility
                </h3>

                <div className="space-y-3 mb-4">
                  {checklist.map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => {
                          const newChecklist = [...checklist]
                          newChecklist[idx].checked = e.target.checked
                          setChecklist(newChecklist)
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleCheckEligibility}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Check Eligibility
                </button>

                {eligibilityMessages && (
                  <div
                    className={`mt-4 p-4 rounded-lg text-sm ${
                      eligibilityMessages.includes('✅')
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : eligibilityMessages.includes('❌')
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    }`}
                  >
                    {eligibilityMessages}
                  </div>
                )}
              </div>

              {/* AI Advisor */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-200">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                  <h3 className="font-bold">Scheme Expert</h3>
                </div>
                <div className="flex flex-col h-80">
                  <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                    {messages.length === 0 ? (
                      <p className="text-xs text-gray-600 text-center py-4">
                        Ask about scheme details or eligibility
                      </p>
                    ) : (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`text-xs flex ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs px-3 py-2 rounded-lg ${
                              msg.role === 'user'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="border-t border-gray-200 p-3 bg-white flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !loading && input) {
                          handleAIAdvice(input)
                        }
                      }}
                      placeholder="Ask..."
                      className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs outline-none focus:border-purple-500"
                      disabled={loading}
                    />
                    <button
                      onClick={() => handleAIAdvice(input)}
                      disabled={loading || !input}
                      className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:bg-gray-400"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
