import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import CookieBanner from './components/CookieBanner'
import GoogleAnalytics from './components/GoogleAnalytics'
import SchemaMarkup from './components/SchemaMarkup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BigDiscounts - Piața de Reduceri din România',
  description: 'Descoperă oferte incredibile de la vânzători verificați din România. Listează-ți produsele pentru doar 5 RON/lună. Fără comision, fără intermediari.',
  keywords: 'piață România, produse cu reduceri, cumpără și vinde România, produse ieftine România, piață online',
  robots: 'index, follow',
  verification: {
    google: 'm2rAHzLBQg_D4c2L_SyZ0hKPIPzXsQFSHR7h0oewvt0',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {

    title: 'BigDiscounts - Piața de Reduceri din România',
    description: 'Descoperă oferte incredibile de la vânzători verificați din România. Listează-ți produsele pentru doar 5 RON/lună.',
    url: 'https://www.bigdiscounts.ro',
    siteName: 'BigDiscounts',
    locale: 'ro_RO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Providers>
          {children}
          <CookieBanner />
          <GoogleAnalytics />
          <SchemaMarkup />
        </Providers>
      </body>
    </html>
  )
}
