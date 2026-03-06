import Link from 'next/link'

export default function Cookies() {
  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>🇷🇴 BigDiscounts</span>
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Înapoi Acasă</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
          <h1 className="text-3xl font-black text-white mb-2">Politica de Cookie-uri</h1>
          <p className="text-gray-600 text-sm mb-8">Ultima actualizare: Februarie 2026</p>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-black text-white mb-2">Ce Sunt Cookie-urile?</h2>
              <p>Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău atunci când vizitezi un site web. Folosim doar cookie-uri esențiale necesare pentru funcționarea site-ului.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-3">Cookie-urile pe Care le Folosim</h2>
              <div className="rounded-xl overflow-hidden" style={{border: '1px solid #2a2a2a'}}>
                <table className="w-full text-sm">
                  <thead style={{background: '#1a1a1a'}}>
                    <tr>
                      <th className="text-left px-4 py-3 text-white font-bold">Cookie</th>
                      <th className="text-left px-4 py-3 text-white font-bold">Scop</th>
                      <th className="text-left px-4 py-3 text-white font-bold">Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{borderTop: '1px solid #1a1a1a'}}>
                      <td className="px-4 py-3 text-gray-400">next-auth.session-token</td>
                      <td className="px-4 py-3 text-gray-400">Te menține conectat</td>
                      <td className="px-4 py-3" style={{color: '#fcd968'}}>Esențial</td>
                    </tr>
                    <tr style={{borderTop: '1px solid #1a1a1a', background: '#111111'}}>
                      <td className="px-4 py-3 text-gray-400">next-auth.csrf-token</td>
                      <td className="px-4 py-3 text-gray-400">Protecție de securitate</td>
                      <td className="px-4 py-3" style={{color: '#fcd968'}}>Esențial</td>
                    </tr>
                    <tr style={{borderTop: '1px solid #1a1a1a'}}>
                      <td className="px-4 py-3 text-gray-400">cookiesAccepted</td>
                      <td className="px-4 py-3 text-gray-400">Reține consimțământul pentru cookie-uri</td>
                      <td className="px-4 py-3" style={{color: '#fcd968'}}>Esențial</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">Fără Cookie-uri de Urmărire</h2>
              <p>Nu folosim cookie-uri de publicitate, analiză sau urmărire. Nu partajăm datele cookie-urilor cu terți în scopuri de marketing.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">Gestionarea Cookie-urilor</h2>
              <p>Poți dezactiva cookie-urile din setările browserului, dar acest lucru poate afecta capacitatea ta de a te conecta și de a folosi site-ul.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">Contact</h2>
              <p>Email: <a href="mailto:privacy@bigdiscounts.uk" style={{color: '#fcd968'}} className="hover:opacity-80">privacy@bigdiscounts.uk</a></p>
            </section>
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
