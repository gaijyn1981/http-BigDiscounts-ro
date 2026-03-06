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
  description: 'Descoperă oferte incredibile de la vânzători verificați din România. Listează-ți produsele pentru doar £1/lună. Fără comision, fără intermediari.',
  keywords: 'piață România, produse cu reduceri, cumpără și vinde România, produse ieftine România, piață online',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {

    title: 'BigDiscounts - Piața de Reduceri din România',
    description: 'Descoperă oferte incredibile de la vânzători verificați din România. Listează-ți produsele pentru doar £1/lună.',
    url: 'https://www.bigdiscounts.uk',
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
