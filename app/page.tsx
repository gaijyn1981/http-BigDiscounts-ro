import Link from 'next/link'
import AnimatedHome from './components/AnimatedHome'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace din România pentru Vânzători & Cumpărători | BigDiscounts — Marketplace Corect, cu Taxe Mici',
  description: 'BigDiscounts este un marketplace din România creat pentru a sprijini vânzătorii și cumpărătorii. Listează produse la doar 5 RON/lună cu 0% comision, sau răsfoiește ofertele și cumpără direct de la vânzătorii din România.',
}

export default async function Home() {
  const session = await getServerSession()

  const recentProducts = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    take: 8,
    include: { seller: { select: { companyName: true } } }
  })

  const totalProducts = await prisma.product.count({ where: { active: true } })
  const totalSellers = await prisma.seller.count()

  const showCounters = totalSellers >= 50

  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cat costa sa listezi pe BigDiscounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Costa doar 5 RON/luna sa iti listezi produsele pe BigDiscounts. Nu exista comision, costuri ascunse sau contracte. Poti anula oricand."
              }
            },
            {
              "@type": "Question",
              "name": "BigDiscounts percepe comision pe vanzari?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nu. BigDiscounts percepe 0% comision pe toate vanzarile. Pastrezi 100% din veniturile tale. Singurul cost este taxa de 5 RON/luna."
              }
            },
            {
              "@type": "Question",
              "name": "Cum contacteaza cumparatorii vanzatorii pe BigDiscounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cumparatorii contacteaza vanzatorii direct prin platforma. Nu exista intermediar — comunicati si tranzactionati direct cu cumparatorul."
              }
            },
            {
              "@type": "Question",
              "name": "Cine poate vinde pe BigDiscounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Orice afacere sau vanzator independent din Romania poate lista produse pe BigDiscounts. Platforma este conceputa pentru a sprijini micile afaceri si vanzatorii independenti."
              }
            },
            {
              "@type": "Question",
              "name": "Cum incep sa vand pe BigDiscounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Inregistreaza-ti un cont, creeaza-ti listele de produse si activeaza abonamentul de 5 RON/luna. Anunturile tale vor fi live imediat."
              }
            }
          ]
        }) }}
      />
      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>BigDiscounts</span>
        <div className="flex gap-4 items-center">
          <Link href="/browse" aria-label="Răsfoiește produse" className="text-gray-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></Link>
          <Link href="/sell" className="text-gray-400 hover:text-white transition-colors">Vinde</Link>
          {session?.user ? (
            <>
              <Link href="/seller/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                Salut, {session.user.name?.split(' ')[0]}
              </Link>
              <Link href="/seller/dashboard"
                className="px-5 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity text-sm"
                style={{background: '#fcd968', color: 'black'}}>
                Panou de control
              </Link>
            </>
          ) : (
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors">Conectare</Link>
          )}
        </div>
      </nav>

      <AnimatedHome
        session={!!session?.user}
        recentProducts={recentProducts}
        totalProducts={totalProducts}
        totalSellers={totalSellers}
        showCounters={showCounters}
      />


      <section className="px-6 py-16" style={{background: '#111111'}}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12">Cum funcționează vânzarea și cumpărarea</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="p-8 rounded-2xl" style={{background: '#1a1a1a', border: '1px solid #fcd968'}}>
              <p className="text-sm font-bold mb-6 inline-block px-3 py-1 rounded-full" style={{background: '#1a1400', color: '#fcd968', border: '1px solid #fcd968'}}>Pentru vânzători</p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="font-black text-white mb-1">1. Listează-ți produsele</p>
                    <p className="text-gray-400 text-sm">Creează anunțul în câteva minute cu fotografii, descriere și preț.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">💳</span>
                  <div>
                    <p className="font-black text-white mb-1">2. Plătești doar 5 RON/lună</p>
                    <p className="text-gray-400 text-sm">Activează anunțul cu abonamentul nostru simplu de 5 RON/lună.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-black text-white mb-1">3. Păstrezi 100% din fiecare vânzare</p>
                    <p className="text-gray-400 text-sm">Cumpărătorii te contactează direct. Fără comision, fără intermediari.</p>
                  </div>
                </div>
              </div>
              <Link href="/sell" className="inline-block mt-8 px-6 py-3 rounded-xl font-black text-black hover:opacity-90 transition-opacity" style={{background: '#fcd968'}}>
                Începe să vinzi — 5 RON/lună →
              </Link>
            </div>

            <div className="p-8 rounded-2xl" style={{background: '#1a1a1a', border: '1px solid #fcd968'}}>
              <p className="text-sm font-bold mb-6 inline-block px-3 py-1 rounded-full" style={{background: '#1a1400', color: '#fcd968', border: '1px solid #fcd968'}}>Pentru cumpărători</p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <p className="font-black text-white mb-1">1. Răsfoiește ofertele din România</p>
                    <p className="text-gray-400 text-sm">Descoperă produse de la vânzători și afaceri din România, din toate categoriile.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-black text-white mb-1">2. Contactează vânzătorii direct</p>
                    <p className="text-gray-400 text-sm">Fără intermediari. Contactează vânzătorul direct și plătește securizat prin PayPal.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="font-black text-white mb-1">3. Fără taxe pentru cumpărători, niciodată</p>
                    <p className="text-gray-400 text-sm">Gratuit pentru a răsfoi și cumpăra. Fără costuri ascunse, fără taxe de platformă.</p>
                  </div>
                </div>
              </div>
              <Link href="/browse" className="inline-block mt-8 px-6 py-3 rounded-xl font-black text-black hover:opacity-90 transition-opacity" style={{background: '#fcd968'}}>
                Răsfoiește ofertele →
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={{background: '#0a0a0a'}}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Răsfoiește pe categorii</h2>
          <p className="text-gray-500 mb-10">Descoperă produse de la vânzătorii din România, din toate categoriile.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { icon: '📱', label: 'Electronică & Tehnologie', href: '/browse/Electronics%20%26%20Tech' },
              { icon: '📲', label: 'Telefoane & Accesorii', href: '/browse/Phone%20%26%20Accessories' },
              { icon: '👗', label: 'Îmbrăcăminte & Modă', href: '/browse/Clothing%20%26%20Fashion' },
              { icon: '🏠', label: 'Casă & Locuință', href: '/browse/Home%20%26%20Living' },
              { icon: '🌿', label: 'Grădină & Exterior', href: '/browse/Garden%20%26%20Outdoor' },
              { icon: '🐾', label: 'Animale de companie', href: '/browse/Pets' },
              { icon: '👶', label: 'Bebeluși & Copii', href: '/browse/Baby%20%26%20Kids' },
              { icon: '💊', label: 'Sănătate & Frumusețe', href: '/browse/Health%20%26%20Beauty' },
              { icon: '🧸', label: 'Jucării & Jocuri', href: '/browse/Toys%20%26%20Games' },
              { icon: '⚽', label: 'Sport & Fitness', href: '/browse/Sports%20%26%20Fitness' },
              { icon: '🍫', label: 'Alimente & Băuturi', href: '/browse/Food%20%26%20Drink' },
              { icon: '📚', label: 'Cărți & Papetărie', href: '/browse/Books%20%26%20Stationery' },
              { icon: '🔧', label: 'Unelte & Bricolaj', href: '/browse/Tools%20%26%20DIY' },
              { icon: '🚗', label: 'Auto', href: '/browse/Automotive' },
              { icon: '🎨', label: 'Arte & Meșteșuguri', href: '/browse/Arts%20%26%20Crafts' },
              { icon: '💼', label: 'Birou & Afaceri', href: '/browse/Office%20%26%20Business' },
              { icon: '🎁', label: 'Cadouri & Sezoniere', href: '/browse/Gifts%20%26%20Seasonal' },
              { icon: '🧹', label: 'Curățenie & Menaj', href: '/browse/Cleaning%20%26%20Household' },
              { icon: '🏠', label: 'Imobiliare', href: '/browse/Imobiliare' },
              { icon: '📦', label: 'Vezi tot', href: '/browse' },
            ].map(item => (
              <Link key={item.label} href={item.href} className="p-4 rounded-xl text-center hover:opacity-80 transition-opacity" style={{background: '#111111', border: '1px solid #fcd968'}}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-gray-300 text-sm font-medium">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center" style={{background: '#111111'}}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
            Un mod mai inteligent de a cumpăra și vinde în România.
          </h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            BigDiscounts este un marketplace transparent unde cumpărătorii și afacerile se conectează direct — fără adaosuri inutile sau bariere ascunse.
          </p>
          <div className="space-y-3 mb-12">
            <p className="text-white font-bold text-lg">Conceput pentru corectitudine.</p>
            <p className="text-white font-bold text-lg">Construit pentru vizibilitate.</p>
            <p className="text-white font-bold text-lg">Bazat pe încredere.</p>
          </div>
          <p className="text-gray-500 text-base italic">
            Un marketplace care pune oamenii înaintea platformelor — mereu.
          </p>
        </div>
      </section>

      <footer style={{background: '#111111', borderTop: '1px solid #1a1a1a'}} className="px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-between gap-8 mb-8">
            <div>
              <p className="text-2xl font-black mb-2" style={{color: '#fcd968'}}>BigDiscounts</p>
              <p className="text-gray-500 text-sm max-w-xs">Cumpără direct sau vinde la doar 5 RON/lună. Fără comisioane. Fără taxe ascunse.</p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-white font-bold mb-3">Site</p>
                <div className="space-y-2">
                  <Link href="/browse" className="block text-gray-500 hover:text-white text-sm">Răsfoiește</Link>
                  <Link href="/sell" className="block text-gray-500 hover:text-white text-sm">Începe să vinzi</Link>
                  <Link href="/about" className="block text-gray-500 hover:text-white text-sm">Despre noi</Link>
                  <Link href="/contact" className="block text-gray-500 hover:text-white text-sm">Contactează-ne</Link>
                </div>
              </div>
              <div>
                <p className="text-white font-bold mb-3">Categorii</p>
                <div className="space-y-2">
                  <Link href="/browse/Electronics%20%26%20Tech" className="block text-gray-500 hover:text-white text-sm">Electronică & Tehnologie</Link>
                  <Link href="/browse/Clothing%20%26%20Fashion" className="block text-gray-500 hover:text-white text-sm">Îmbrăcăminte & Modă</Link>
                  <Link href="/browse/Home%20%26%20Living" className="block text-gray-500 hover:text-white text-sm">Casă & Locuință</Link>
                  <Link href="/browse/Health%20%26%20Beauty" className="block text-gray-500 hover:text-white text-sm">Sănătate & Frumusețe</Link>
                  <Link href="/browse/Garden%20%26%20Outdoor" className="block text-gray-500 hover:text-white text-sm">Grădină & Exterior</Link>
                  <Link href="/browse/Sports%20%26%20Fitness" className="block text-gray-500 hover:text-white text-sm">Sport & Fitness</Link>
                  <Link href="/browse/Toys%20%26%20Games" className="block text-gray-500 hover:text-white text-sm">Jucării & Jocuri</Link>
                  <Link href="/browse/Pets" className="block text-gray-500 hover:text-white text-sm">Animale de companie</Link>
                </div>
              </div>
              <div>
                <p className="text-white font-bold mb-3">Legal</p>
                <div className="space-y-2">
                  <Link href="/privacy" className="block text-gray-500 hover:text-white text-sm">Politica de confidențialitate</Link>
                  <Link href="/terms" className="block text-gray-500 hover:text-white text-sm">Termeni și condiții</Link>
                  <Link href="/cookies" className="block text-gray-500 hover:text-white text-sm">Politica de cookie-uri</Link>
                  <Link href="/data-request" className="block text-gray-500 hover:text-white text-sm">Cerere de date</Link>
                </div>
              </div>
            </div>
          </div>
          <div style={{borderTop: '1px solid #1a1a1a'}} className="pt-6 text-center">
            <p className="text-gray-600 text-sm">hello@bigdiscounts.ro</p>
            <p className="text-gray-600 text-xs mt-1">BigDiscounts este operat de Petrica Marin, Persoană Fizică Autorizată, România.</p>
            <p className="text-gray-700 text-xs mt-1">© 2026 BigDiscounts. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
