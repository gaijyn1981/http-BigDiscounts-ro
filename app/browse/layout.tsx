import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Răsfoiește ofertele de la vânzătorii din UK | BigDiscounts Marketplace',
  description: 'Descoperă produse de la vânzătorii independenți din UK. Răsfoiește categorii incluzând modă, casă, animale de companie și frumusețe pe un marketplace corect și transparent din UK.',
}

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
