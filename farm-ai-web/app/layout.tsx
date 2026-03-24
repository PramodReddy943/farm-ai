import type { Metadata } from 'next'
import '../styles/globals.css'
import Navigation from '@/components/Navigation'
import { Providers } from '@/app/providers'

export const metadata: Metadata = {
  title: 'FarmAI - Your Personal Farm Assistant',
  description: 'AI-powered disease detection, medicine recommendations, and crop advisory for farmers',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className="bg-light-bg">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 pb-24 md:pb-8">
              {children}
            </main>
            <Navigation />
          </div>
        </Providers>
      </body>
    </html>
  )
}
