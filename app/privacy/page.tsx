import Link from 'next/link'

export default function Privacy() {
  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>🇷🇴 BigDiscounts</span>
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Înapoi Acasă</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
          <h1 className="text-3xl font-black text-white mb-2">Politica de Confidențialitate</h1>
          <p className="text-gray-600 text-sm mb-8">Ultima actualizare: Februarie 2026</p>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-black text-white mb-2">1. Cine Suntem</h2>
              <p>BigDiscounts este operat de Petrica Marin, un comerciant individual din România. Contact: hello@bigdiscounts.ro</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">2. Datele pe Care le Colectăm</h2>
              <p>Colectăm: numele, adresa de email, detaliile companiei (vânzători), numărul de telefon (vânzători) și anunțurile de produse pe care le creezi.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">3. Baza Legală</h2>
              <p>Prelucrăm datele tale în baza: executării contractului (pentru a furniza serviciul nostru), interesului legitim (pentru a îmbunătăți platforma) și obligației legale (conformitate GDPR).</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">4. Partajarea Datelor</h2>
              <p>Partajăm date cu: Stripe (procesare plăți), Vercel (găzduire), Neon (bază de date) și Cloudinary (stocare imagini). Nu vindem niciodată datele tale.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">5. Drepturile Tale</h2>
              <p>Conform GDPR ai dreptul de a accesa, corecta, șterge sau exporta datele tale. Trimite o solicitare pe <Link href="/data-request" style={{color: '#fcd968'}} className="hover:opacity-80">pagina noastră de solicitare date</Link>.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">6. Cookie-uri</h2>
              <p>Folosim doar cookie-uri esențiale pentru autentificare și gestionarea sesiunii. Vezi <Link href="/cookies" style={{color: '#fcd968'}} className="hover:opacity-80">Politica de Cookie-uri</Link>.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">7. Contact</h2>
              <p>Email: <a href="mailto:privacy@bigdiscounts.ro" style={{color: '#fcd968'}} className="hover:opacity-80">privacy@bigdiscounts.ro</a></p>
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
