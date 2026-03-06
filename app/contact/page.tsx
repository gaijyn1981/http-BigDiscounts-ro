'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    window.location.href = `mailto:hello@bigdiscounts.uk?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>🇷🇴 BigDiscounts</span>
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Înapoi Acasă</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Contactează<span style={{color: '#fcd968'}}>-ne</span></h1>
          <p className="text-gray-500">Ne propunem să răspundem în 24 de ore.</p>
        </div>

        <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-black text-white mb-2">Mesaj Trimis!</h2>
              <p className="text-gray-500 mb-6">Vă vom răspunde în 24 de ore.</p>
              <Link href="/"
                className="px-6 py-3 rounded-xl font-bold text-black inline-block"
                style={{background: '#fcd968'}}>
                Înapoi Acasă
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Numele Tău</label>
                <input name="name" type="text" value={form.name} onChange={update} required
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Adresa de Email</label>
                <input name="email" type="email" value={form.email} onChange={update} required
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Subiect</label>
                <select name="subject" value={form.subject} onChange={update} required
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}}>
                  <option value="">Selectează un subiect</option>
                  <option value="General enquiry">Întrebare generală</option>
                  <option value="Seller support">Suport vânzători</option>
                  <option value="Buyer support">Suport cumpărători</option>
                  <option value="Report a problem">Raportează o problemă</option>
                  <option value="Billing question">Întrebare despre facturare</option>
                  <option value="Other">Altele</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Mesaj</label>
                <textarea name="message" value={form.message} onChange={update} rows={5} required
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}} />
              </div>
              <button type="submit"
                className="w-full py-3 rounded-xl font-black text-lg text-black transition-opacity hover:opacity-90"
                style={{background: '#fcd968'}}>
                Trimite Mesajul
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 grid grid-cols-2 gap-4 text-center" style={{borderTop: '1px solid #222'}}>
            <div className="rounded-xl p-4" style={{background: '#1a1a1a'}}>
              <p className="text-2xl mb-1">✉️</p>
              <p className="text-sm font-semibold text-white">Email</p>
              <a href="mailto:hello@bigdiscounts.uk" style={{color: '#fcd968'}} className="text-sm hover:opacity-80">hello@bigdiscounts.uk</a>
            </div>
            <div className="rounded-xl p-4" style={{background: '#1a1a1a'}}>
              <p className="text-2xl mb-1">⏰</p>
              <p className="text-sm font-semibold text-white">Timp de Răspuns</p>
              <p className="text-gray-500 text-sm">În 24 de ore</p>
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
