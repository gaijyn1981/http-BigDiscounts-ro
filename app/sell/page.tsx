import Link from 'next/link'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vinde online în România | Marketplace la £1/lună — BigDiscounts',
  description: 'Vrei să vinzi online în România fără să plătești comisioane mari? BigDiscounts oferă o taxă corectă de £1/lună cu 0% comision și control total pentru vânzători.',
}

export default async function SellPage() {
  const session = await getServerSession()

  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>BigDiscounts</span>
        <div className="flex gap-4 items-center">
          <Link href="/" aria-label="Acasă" className="text-gray-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></Link>
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

      <section className="px-6 py-24 text-center" style={{background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)'}}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-bold" style={{background: '#1a1400', border: '1px solid #fcd968', color: '#fcd968'}}>
            Marketplace din România
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Vinde online în România cu <span style={{color: '#fcd968'}}>taxe corecte și transparente</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Listează produse la £1/lună și păstrezi 100% din ce vinzi — fără comisioane, fără taxe ascunse, fără contracte.
          </p>
          <Link href="/register?type=seller" style={{background: '#fcd968'}}
            className="text-black px-10 py-4 rounded-xl font-black text-xl hover:opacity-90 transition-opacity inline-block">
            Începe să vinzi acum — £1/lună
          </Link>
          <p className="text-gray-600 text-sm mt-4">Fără contract. Anulezi oricând.</p>
        </div>
      </section>

      <section className="px-6 py-14" style={{background: '#111111'}}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-4">Scopul nostru</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Multe marketplace-uri percep comision la fiecare vânzare, rețin fondurile și controlează vizibilitatea ta. BigDiscounts a fost creat pentru a oferi o alternativă corectă și transparentă vânzătorilor din România — o taxă simplă de £1/lună, contact direct cu cumpărătorii și control total asupra prețurilor, brandingului și livrării.
          </p>
          <p className="text-gray-500 leading-relaxed mt-4">
            Dacă ești în căutarea unei alternative la Amazon, eBay sau alte marketplace-uri cu taxe mari din România, BigDiscounts oferă o soluție simplă. Vânzătorii păstrează controlul total, ajungând la cumpărători din întreaga România.
          </p>
        </div>
      </section>

      <section className="px-6 py-16" style={{background: '#0a0a0a'}}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-2">De ce să alegi BigDiscounts față de alte marketplace-uri</h2>
          <p className="text-gray-500 text-center mb-10">Nu mai renunța la profiturile tale. Compară costul real al vânzării online.</p>
          <div className="rounded-2xl overflow-hidden w-full" style={{border: '1px solid #2a2a2a'}}>
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{background: '#1a1a1a', borderBottom: '1px solid #2a2a2a'}}>
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">Platformă</th>
                  <th className="text-center px-6 py-4 text-gray-400 font-bold">Taxă lunară</th>
                  <th className="text-center px-6 py-4 text-gray-400 font-bold">Comision</th>
                  <th className="text-center px-6 py-4 text-gray-400 font-bold">Tu păstrezi</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: '1px solid #1a1a1a'}}>
                  <td className="px-6 py-4 text-gray-300 font-medium">Amazon</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-gray-400">£25–39/lună</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-red-400 font-bold">15–20%</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-gray-400">~80%</td>
                </tr>
                <tr style={{borderBottom: '1px solid #1a1a1a'}}>
                  <td className="px-6 py-4 text-gray-300 font-medium">eBay</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-gray-400">£0</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-red-400 font-bold">10–15%</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-gray-400">~85%</td>
                </tr>
                <tr style={{borderBottom: '1px solid #1a1a1a'}}>
                  <td className="px-6 py-4 text-gray-300 font-medium">Etsy</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-gray-400">£0</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-red-400 font-bold">6,5% + taxe</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 text-center text-gray-400">~90%</td>
                </tr>
                <tr style={{background: '#1a1400'}}>
                  <td className="px-3 py-4 md:px-6 md:py-5 font-black text-base md:text-lg" style={{color: '#fcd968'}}>BigDiscounts</td>
                  <td className="px-3 py-4 md:px-6 md:py-5 text-center font-black text-lg" style={{color: '#fcd968'}}>£1/lună</td>
                  <td className="px-3 py-4 md:px-6 md:py-5 text-center font-black text-lg text-green-400">0%</td>
                  <td className="px-3 py-4 md:px-6 md:py-5 text-center font-black text-lg text-green-400">100%</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          <p className="text-gray-600 text-xs text-center mt-3">Bazat pe taxele tipice ale marketplace-urilor. BigDiscounts nu percepe comision la vânzare.</p>
        </div>
      </section>

      <section className="px-6 py-16" style={{background: '#111111'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Păstrezi 100% din fiecare vânzare</h2>
          <p className="text-gray-500 mb-10">Fie că vinzi un produs sau o mie, BigDiscounts funcționează pentru tine.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '🛍️', label: 'Comercianți independenți' },
              { icon: '🏭', label: 'Afaceri mici' },
              { icon: '🚚', label: 'Dropshipperi' },
              { icon: '🎨', label: 'Creatori & meșteșugari' },
              { icon: '📦', label: 'Furnizori en-gros' },
              { icon: '🔄', label: 'Migrați de pe eBay & Amazon' },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-xl text-center" style={{background: '#1a1a1a', border: '1px solid #fcd968'}}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-gray-300 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={{background: '#0a0a0a'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-12">Cum să începi să vinzi în câteva minute</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {[
              { icon: '👤', step: '1', title: 'Înregistrează contul de vânzător', desc: 'Creează-ți profilul în mai puțin de 2 minute. Nu este nevoie de aprobare.' },
              { icon: '📸', step: '2', title: 'Încarcă produsele', desc: 'Adaugă fotografii, descrieri și prețuri. Până la 4 fotografii per anunț.' },
              { icon: '✅', step: '3', title: 'Anunțurile tale devin active', desc: 'Plătește £1/lună per anunț și produsul tău este imediat vizibil cumpărătorilor.' },
              { icon: '💬', step: '4', title: 'Cumpărătorii te contactează direct', desc: 'Cumpărătorii interesați îți trimit mesaje direct — fără checkout forțat sau interferență de platformă.' },
              { icon: '💰', step: '5', title: 'Tu gestionezi plata și livrarea', desc: 'Gestionezi plata și livrarea în felul tău. Păstrezi 100% din fiecare vânzare.' },
            ].map(item => (
              <div key={item.step} className="p-6 rounded-2xl" style={{background: '#111111', border: '1px solid #fcd968'}}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-xs font-black mb-2" style={{color: '#fcd968'}}>PASUL {item.step}</div>
                <h3 className="text-sm font-black text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14" style={{background: '#111111'}}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-8">Cine poate vinde pe BigDiscounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🇷🇴', text: 'Marketplace din România' },
              { icon: '✅', text: 'Fără taxe ascunse — niciodată' },
              { icon: '💬', text: 'Cumpărătorii te contactează direct' },
              { icon: '🔒', text: 'Plăți securizate prin Stripe' },
              { icon: '📣', text: 'Promovat activ pe Google & social media' },
              { icon: '❌', text: 'Anulezi oricând, fără contract' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 p-4 rounded-xl" style={{background: '#1a1a1a', border: '1px solid #fcd968'}}>
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-300 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={{background: '#0a0a0a'}}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">Întrebări frecvente</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Percepeti vreun comision la vânzări?',
                a: 'Nu. BigDiscounts percepe o taxă fixă de £1/lună per anunț. Nu percepem niciun comision la nicio vânzare pe care o faci.'
              },
              {
                q: 'Trebuie să semnez un contract?',
                a: 'Nu este necesar niciun contract. Anunțul tău funcționează de la lună la lună și poți anula oricând. Anunțul rămâne activ până la sfârșitul perioadei de facturare curente.'
              },
              {
                q: 'Cum primesc plata?',
                a: 'Tu și cumpărătorul stabiliți plata direct. Poți folosi PayPal, transfer bancar sau orice metodă preferi. BigDiscounts nu gestionează și nu reține plățile între cumpărători și vânzători.'
              },
              {
                q: 'BigDiscounts este doar pentru vânzătorii din România?',
                a: 'Da — BigDiscounts este un marketplace din România deschis oricărui vânzător din România, fie că ești comerciant independent, afacere mică, dropshipper sau retailer consacrat.'
              },
              {
                q: 'Ce se întâmplă după ce listez un produs?',
                a: 'Produsul tău devine activ pe marketplace imediat după plată. Cumpărătorii pot răsfoi, vizualiza anunțul tău și te pot contacta direct prin platformă.'
              },
              {
                q: 'Pot lista mai multe produse?',
                a: 'Da. Fiecare produs este listat separat la £1/lună. Nu există limită pentru câte produse poți lista.'
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl" style={{background: '#111111', border: '1px solid #fcd968'}}>
                <h3 className="font-black text-white mb-2">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-500 text-sm">
            Ai încă întrebări? Contactează-ne la{' '}
            <a href="mailto:hello@bigdiscounts.uk" style={{color: '#fcd968'}} className="hover:opacity-80">hello@bigdiscounts.uk</a>
          </p>
        </div>
      </section>

      <section className="px-6 py-24 text-center" style={{background: '#111111'}}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-4">Ești gata să începi?</h2>
          <p className="text-gray-400 mb-8 text-lg">Alătură-te vânzătorilor din România care păstrează 100% din fiecare vânzare pe BigDiscounts.</p>
          <Link href="/register?type=seller" style={{background: '#fcd968'}}
            className="text-black px-10 py-4 rounded-xl font-black text-xl hover:opacity-90 transition-opacity inline-block">
            Creează contul de vânzător — £1/lună
          </Link>
          <p className="text-gray-600 text-sm mt-4">Ai deja un cont? <Link href="/login" style={{color: '#fcd968'}} className="hover:opacity-80">Conectează-te aici</Link></p>
        </div>
      </section>

      <footer style={{background: '#111111', borderTop: '1px solid #1a1a1a'}} className="px-6 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-2xl font-black" style={{color: '#fcd968'}}>BigDiscounts</span>
          <p className="text-gray-600 text-sm mt-3">hello@bigdiscounts.uk</p>
          <p className="text-gray-600 text-xs mt-1">BigDiscounts este operat de Petrica Marin, Persoană Fizică Autorizată, România.</p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="/terms" className="text-gray-700 text-xs hover:text-gray-500">Termeni și condiții</Link>
            <Link href="/sell" className="text-gray-700 text-xs hover:text-gray-500">Politica vânzătorilor</Link>
            <Link href="/browse" className="text-gray-700 text-xs hover:text-gray-500">Răsfoiește ofertele</Link>
          </div>
          <p className="text-gray-700 text-xs mt-3">© 2026 BigDiscounts. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </main>
  )
}
