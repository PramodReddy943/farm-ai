'use client'

import { useState } from 'react'
import { Users, MapPin, DollarSign, Calendar, Phone, Plus, Search, Star } from 'lucide-react'
import { useAuth } from '@/lib/auth'

interface Worker {
  id: string
  name: string
  skills: string[]
  experience: string
  location: string
  phone: string
  rate: string
  rating: number
  verified: boolean
  available: boolean
  image?: string
}

interface Equipment {
  id: string
  name: string
  owner: string
  location: string
  rentPerDay: string
  availability: string
  contact: string
}

interface JobPosting {
  id: string
  title: string
  location: string
  workDays: string
  wage: string
  workType: string
  postedDate: string
}

const workers: Worker[] = [
  {
    id: '1',
    name: 'Mohan Kumar',
    skills: ['Harvesting', 'Planting', 'Irrigation'],
    experience: '8 Years',
    location: 'Meerut, UP',
    phone: '+91-9876543210',
    rate: '₹300/day',
    rating: 4.8,
    verified: true,
    available: true,
  },
  {
    id: '2',
    name: 'Priya Singh',
    skills: ['Cotton Picking', 'Weeding', 'Sorting'],
    experience: '5 Years',
    location: 'Jaipur, Rajasthan',
    phone: '+91-9123456789',
    rate: '₹250/day',
    rating: 4.6,
    verified: true,
    available: true,
  },
  {
    id: '3',
    name: 'Harjeet Kaur',
    skills: ['Vegetable Harvesting', 'Packing', 'Cleaning'],
    experience: '6 Years',
    location: 'Ludhiana, Punjab',
    phone: '+91-8765432109',
    rate: '₹280/day',
    rating: 4.7,
    verified: true,
    available: false,
  },
  {
    id: '4',
    name: 'Ram Chandra',
    skills: ['Machinery Operation', 'Threshing', 'Winnowing'],
    experience: '12 Years',
    location: 'Panipat, Haryana',
    phone: '+91-9988776655',
    rate: '₹400/day',
    rating: 4.9,
    verified: true,
    available: true,
  },
]

const equipmentList: Equipment[] = [
  {
    id: '1',
    name: 'Combine Harvester',
    owner: 'Rajesh Equipment Rental',
    location: 'Meerut, UP',
    rentPerDay: '₹3,500',
    availability: 'Available',
    contact: '+91-9876543210',
  },
  {
    id: '2',
    name: 'Tractor (40 HP)',
    owner: 'Farmer Cooperative',
    location: 'Jaipur, Rajasthan',
    rentPerDay: '₹2,500',
    availability: 'Available',
    contact: '+91-9123456789',
  },
  {
    id: '3',
    name: 'Rotavator',
    owner: 'Agricultural Services',
    location: 'Ludhiana, Punjab',
    rentPerDay: '₹1,200',
    availability: 'Booked',
    contact: '+91-8765432109',
  },
  {
    id: '4',
    name: 'Drip Irrigation Kit',
    owner: 'Irrigation Supply',
    location: 'Panipat, Haryana',
    rentPerDay: '₹800',
    availability: 'Available',
    contact: '+91-9988776655',
  },
]

const jobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Wheat Harvesting - 10 Workers',
    location: 'Meerut, UP',
    workDays: '5-7 days',
    wage: '₹300/day',
    workType: 'Seasonal',
    postedDate: 'Today',
  },
  {
    id: '2',
    title: 'Rice Planting - 15 Workers',
    location: 'Punjab',
    workDays: '10-12 days',
    wage: '₹350/day',
    workType: 'Seasonal',
    postedDate: '2 days ago',
  },
]

export default function LabourHiringPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState<'hire' | 'offers' | 'equipment'>('hire')
  const [searchSkill, setSearchSkill] = useState('')
  const [showPostJob, setShowPostJob] = useState(false)
  const [filteredWorkers, setFilteredWorkers] = useState(workers)

  const handleSearch = (skill: string) => {
    const filtered = workers.filter(
      (w) =>
        w.skills.some((s) =>
          s.toLowerCase().includes(skill.toLowerCase())
        ) ||
        w.location.toLowerCase().includes(skill.toLowerCase()) ||
        w.available
    )
    setFilteredWorkers(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Labour & Equipment Hiring</h1>
          </div>
          <p className="text-teal-100">
            Find workers, post jobs, and hire farming equipment
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setTab('hire')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'hire'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Hire Workers
          </button>
          <button
            onClick={() => setTab('offers')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'offers'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Post a Job
          </button>
          <button
            onClick={() => setTab('equipment')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'equipment'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Rent Equipment
          </button>
        </div>

        {/* Hire Workers Tab */}
        {tab === 'hire' && (
          <div className="space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by skill or location..."
                value={searchSkill}
                onChange={(e) => {
                  setSearchSkill(e.target.value)
                  handleSearch(e.target.value)
                }}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none"
              />
            </div>

            {/* Worker Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{worker.name}</h3>
                      <p className="text-sm text-gray-600">{worker.experience}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-bold text-yellow-600">
                        {worker.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {worker.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      {worker.rate}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p
                      className={`text-xs font-semibold ${
                        worker.available
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {worker.available ? '✓ Available' : '✗ Not Available'}
                    </p>
                    {worker.verified && (
                      <p className="text-xs text-green-600 font-semibold">
                        ✓ Verified Worker
                      </p>
                    )}
                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                    <Phone className="w-4 h-4" />
                    {worker.phone}
                  </button>
                </div>
              ))}
            </div>

            {filteredWorkers.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p>No workers found matching your search. Try a different skill or location.</p>
              </div>
            )}
          </div>
        )}

        {/* Post a Job Tab */}
        {tab === 'offers' && (
          <div className="space-y-8">
            {/* Post Job Button */}
            {user?.role === 'farmer' && (
              <button
                onClick={() => setShowPostJob(!showPostJob)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                <Plus className="w-5 h-5" />
                Post a Job
              </button>
            )}

            {/* Post Job Form */}
            {showPostJob && (
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-teal-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Job Title (e.g., Wheat Harvesting)"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Number of workers needed"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Wage per day (₹)"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 5-7 days)"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none"
                    />
                    <select className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none">
                      <option>Type of Work</option>
                      <option>Harvesting</option>
                      <option>Planting</option>
                      <option>Weeding</option>
                      <option>General Labor</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Job description (skills required, work schedule, etc.)"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 outline-none"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                      Post Job
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPostJob(false)}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Job Listings */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Recent Job Postings</h2>
              {jobPostings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.postedDate}</p>
                    </div>
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-semibold">
                      {job.workType}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{job.workDays}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Daily Wage</p>
                      <p className="font-semibold text-teal-600">{job.wage}</p>
                    </div>
                    <button className="col-span-2 md:col-span-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rent Equipment Tab */}
        {tab === 'equipment' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipmentList.map((equip) => (
                <div
                  key={equip.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900">{equip.name}</h3>
                    <p className="text-sm text-gray-600">by {equip.owner}</p>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{equip.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold">{equip.rentPerDay}</span>
                      <span className="text-xs text-gray-600">/day</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-sm font-semibold ${
                          equip.availability === 'Available'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {equip.availability}
                      </span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                    <Phone className="w-4 h-4" />
                    {equip.contact}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
