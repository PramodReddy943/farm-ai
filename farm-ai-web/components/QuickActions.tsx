'use client'

import Link from 'next/link'
import { Camera, Cloud, MessageCircle } from 'lucide-react'

const actions = [
  {
    href: '/disease/scanner',
    icon: Camera,
    label: 'Scan Disease',
    color: 'bg-red-50 text-red-600 border-red-200',
    description: 'Identify crop diseases with image',
  },
  {
    href: '/weather',
    icon: Cloud,
    label: 'Check Weather',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    description: 'Get weather & alerts',
  },
  {
    href: '/chatbot',
    icon: MessageCircle,
    label: 'Ask AI',
    color: 'bg-green-50 text-green-600 border-green-200',
    description: 'Chat with farm assistant',
  },
]

export default function QuickActions() {
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map(({ href, icon: Icon, label, color, description }) => (
            <Link
              key={href}
              href={href}
              className={`p-4 rounded-lg border-2 transition hover:shadow-md ${color}`}
            >
              <Icon size={28} className="mb-2" />
              <h3 className="font-bold text-sm">{label}</h3>
              <p className="text-xs opacity-75 mt-1">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
