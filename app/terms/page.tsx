import Link from 'next/link'

export default function Terms() {
  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>🇬🇧 BigDiscounts</span>
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Înapoi Acasă</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
          <h1 className="text-3xl font-black text-white mb-2">Termeni și Condiții</h1>
          <p className="text-gray-600 text-sm mb-8">Ultima actualizare: Februarie 2026</p>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-black text-white mb-2">1. Despre BigDiscounts</h2>
              <p>BigDiscounts este o piață online din UK care permite vânzătorilor să listeze produse pentru £1 per produs pe lună. Cumpărătorii navighează și contactează vânzătorii direct. BigDiscounts nu gestionează tranzacțiile dintre cumpărători și vânzători.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">2. Conturi de Vânzător</h2>
              <p>Vânzătorii trebuie să fie din UK, să furnizeze informații corecte și să plătească £1/lună per anunț prin Stripe. Anunțurile se activează doar după plata cu succes. BigDiscounts poate elimina anunțurile care încalcă acești termeni.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">3. Conturi de Cumpărător</h2>
              <p>Cumpărătorii pot naviga gratuit fără cont. Cumpărătorii contactează vânzătorii direct și aranjează plata independent. BigDiscounts nu este responsabil pentru tranzacțiile dintre cumpărători și vânzători.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">4. Plăți prin PayPal</h2>
              <p>Unii vânzători oferă plată prin PayPal. Plățile PayPal se fac direct între cumpărător și vânzător. BigDiscounts nu este parte a niciunei tranzacții PayPal și nu este responsabil pentru dispute, rambursări sau returnări de plăți.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">5. Returnări și Rambursări</h2>
              <p>Conform UK Consumer Contracts Regulations 2013, cumpărătorii au dreptul de a anula în termen de 14 zile de la primirea bunurilor. Vânzătorii sunt responsabili pentru livrare și emiterea rambursărilor în termen de 14 zile de la primirea returnării. Cumpărătorii sunt responsabili pentru returnarea articolelor în termen de 14 zile de la primire. BigDiscounts nu este responsabil pentru aplicarea returnărilor între cumpărători și vânzători.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">6. Conținut Interzis</h2>
              <p>Produsele ilegale, bunurile contrafăcute sau furate, conținutul pentru adulți, armele și anunțurile înșelătoare sunt strict interzise.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">7. Plăți de Abonament</h2>
              <p>Taxele de abonament de £1/lună sunt nerambursabile. Anularea dezactivează anunțul imediat. Plățile sunt gestionate de Stripe.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">8. Limitarea Răspunderii</h2>
              <p>BigDiscounts este doar o platformă. Nu suntem responsabili pentru calitatea, siguranța sau legalitatea produselor listate, tranzacțiile PayPal sau disputele dintre cumpărători și vânzători.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">9. Legea Aplicabilă</h2>
              <p>Acești termeni sunt guvernați de legile Angliei și Țării Galilor.</p>
            </section>
            <section>
              <h2 className="text-xl font-black text-white mb-2">10. Contact</h2>
              <p>Email: <a href="mailto:legal@bigdiscounts.uk" style={{color: '#fcd968'}} className="hover:opacity-80">legal@bigdiscounts.uk</a></p>
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
