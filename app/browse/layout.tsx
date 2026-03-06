import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Răsfoiește ofertele de la vânzătorii din România | BigDiscounts Marketplace',
  description: 'Descoperă produse de la vânzătorii independenți din România. Răsfoiește categorii incluzând modă, casă, animale de companie și frumusețe pe un marketplace corect și transparent din România.',
}

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
