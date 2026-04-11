import type { Metadata } from 'next'
import BrowseClient from './BrowseClient'

export const metadata: Metadata = {
  title: 'Caută Produse de la Vânzători din România | BigDiscounts',
  description: 'Descoperă produse de la vânzători independenți și afaceri mici din România. Fără taxe pentru cumpărători, contact direct cu vânzătorii. Caută după categorie, preț și mai mult.',
  alternates: { canonical: 'https://www.bigdiscounts.ro/browse' },
  openGraph: {
    title: 'Caută Produse de la Vânzători din România | BigDiscounts',
    description: 'Descoperă produse de la vânzători independenți din România. Fără taxe, contact direct, prețuri competitive.',
    url: 'https://www.bigdiscounts.ro/browse',
    type: 'website',
  }
}

export default function BrowsePage() {
  return <BrowseClient />
}
