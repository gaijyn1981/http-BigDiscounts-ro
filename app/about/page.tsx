import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">Despre <span style={{color: '#fcd968'}}>BigDiscounts</span></h1>
          <p className="text-gray-400 text-xl">Piața premium de reduceri din România</p>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
            <h2 className="text-2xl font-black text-white mb-4">Povestea Noastră</h2>
            <p className="text-gray-400 leading-relaxed">BigDiscounts a fost creat cu o idee simplă — vânzătorii din România merită un loc corect și accesibil pentru a-și lista produsele fără a plăti comisioane uriașe sau taxe lunare. Pentru doar 5 RON pe anunț pe lună, vânzătorii pot ajunge la mii de cumpărători din întreaga România.</p>
          </div>

          <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #fcd968'}}>
            <h2 className="text-2xl font-black text-white mb-4">Misiunea Noastră</h2>
            <p className="text-gray-400 leading-relaxed">Să conectăm cumpărătorii și vânzătorii din România direct, fără intermediari. Fără taxe ascunse, fără comisioane, fără complicații. Doar oferte excelente la prețuri corecte.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 text-center" style={{background: '#111111', border: '1px solid #222'}}>
              <div className="text-4xl mb-3">🇷🇴</div>
              <h3 className="text-lg font-black text-white mb-2">Doar România</h3>
              <p className="text-gray-500 text-sm">Toți vânzătorii și cumpărătorii sunt din România.</p>
            </div>
            <div className="rounded-2xl p-6 text-center" style={{background: '#111111', border: '1px solid #fcd968'}}>
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-black text-white mb-2">Doar 5 RON/lună</h3>
              <p className="text-gray-500 text-sm">Cea mai accesibilă piață din România. Fără comisioane.</p>
            </div>
            <div className="rounded-2xl p-6 text-center" style={{background: '#111111', border: '1px solid #222'}}>
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-lg font-black text-white mb-2">Tranzacții Directe</h3>
              <p className="text-gray-500 text-sm">Cumpărătorii contactează vânzătorii direct. Simplu, rapid și onest.</p>
            </div>
          </div>

          <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
            <h2 className="text-2xl font-black text-white mb-4">Cine Suntem</h2>
            <p className="text-gray-400 leading-relaxed mb-6">BigDiscounts este administrat de Petrica Marin, un comerciant individual din România. Suntem pasionați de sprijinirea micilor afaceri din România și de a ajuta cumpărătorii să găsească oferte excelente.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="mailto:hello@bigdiscounts.ro"
                className="px-6 py-3 rounded-xl font-bold text-black transition-opacity hover:opacity-90"
                style={{background: '#fcd968'}}>
                ✉️ Contactează-ne
              </a>
              <Link href="/browse"
                className="px-6 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-80"
                style={{background: '#1a1a1a', border: '1px solid #333'}}>
                Vezi Ofertele
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer style={{background: '#111111', borderTop: '1px solid #1a1a1a'}} className="px-6 py-8 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/privacy" className="text-gray-500 hover:text-white">Politica de Confidențialitate</Link>
          <Link href="/terms" className="text-gray-500 hover:text-white">Termeni și Condiții</Link>
          <Link href="/cookies" className="text-gray-500 hover:text-white">Politica de Cookie-uri</Link>
          <Link href="/data-request" className="text-gray-500 hover:text-white">Solicitare Date</Link>
        </div>
      </footer>
    </main>
  )
}
