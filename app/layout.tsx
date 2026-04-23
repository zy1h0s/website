import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Zytheq | We run your job search while you mentor the next generation',
    template: '%s | Zytheq',
  },
  description:
    'Zytheq handles your entire job search, from resume optimization to recruiter outreach, while you give back by mentoring Indian students. No fees. Just a value exchange that works.',
  metadataBase: new URL('https://zytheq.com'),
  openGraph: {
    title: 'Zytheq | We run your job search while you mentor the next generation',
    description:
      'Zytheq handles your entire job search, from resume optimization to recruiter outreach, while you give back by mentoring Indian students. No fees. Just a value exchange that works.',
    url: 'https://zytheq.com',
    siteName: 'Zytheq',
    images: ['/opengraph-image'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zytheq | We run your job search while you mentor the next generation',
    description:
      'Zytheq handles your entire job search while you mentor the next generation. No fees, just value exchange.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zytheq',
  url: 'https://zytheq.com',
  logo: 'https://zytheq.com/z.png',
  description:
    'Zytheq connects US job seekers with Indian students in a mutual value exchange. We handle your job search while you mentor the next generation.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@zytheq.com',
    contactType: 'customer service',
  },
}

import MobileGate from '@/components/layout/MobileGate'
import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <AuthProvider>
          <MobileGate />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
