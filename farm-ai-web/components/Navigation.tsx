'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Camera, Cloud, MessageCircle, Home, User } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/disease/scanner', label: 'Scan', icon: Camera },
  { href: '/weather', label: 'Weather', icon: Cloud },
  { href: '/chatbot', label: 'Chat', icon: MessageCircle },
  { href: '/myFarm', label: 'Farm', icon: User },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:relative">
      <div className="mx-auto max-w-2xl px-2">
        <div className="flex justify-around">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center py-3 px-4 transition ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
