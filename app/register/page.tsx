'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [type, setType] = useState<'seller' | 'buyer'>('seller')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    email: '', password: '', name: '', companyName: '', contactName: '', phone: ''
  })

  function update(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const endpoint = type === 'seller' ? '/api/register/seller' : '/api/register/buyer'
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Error'); setLoading(false) }
    else setSent(true)
  }

  if (sent) return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{background: '#0a0a0a'}}>
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-black text-white mb-2">Verifică-ți Email-ul!</h1>
          <p className="text-gray-400 mb-6">Am trimis un link de verificare la <span style={{color: '#fcd968'}}>{form.email}</span>. Apasă pe el pentru a-ți activa contul.</p>
          <Link href="/login"
            className="block w-full py-3 rounded-xl font-black text-lg text-black transition-opacity hover:opacity-90"
            style={{background: '#fcd968'}}>
            Mergi la Autentificare
          </Link>
        </div>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10" style={{background: '#0a0a0a'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-3xl font-black" style={{color: '#fcd968'}}>🇷🇴 BigDiscounts</span>
          <p className="text-gray-500 mt-2">Creează-ți contul</p>
        </div>
        <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
          <div className="flex rounded-xl overflow-hidden mb-6" style={{background: '#1a1a1a'}}>
            <button onClick={() => setType('seller')}
              className="flex-1 py-3 font-bold text-sm transition-all"
              style={type === 'seller' ? {background: '#fcd968', color: 'black'} : {color: '#888'}}>
              Sunt Vânzător
            </button>
            <button onClick={() => setType('buyer')}
              className="flex-1 py-3 font-bold text-sm transition-all"
              style={type === 'buyer' ? {background: '#fcd968', color: 'black'} : {color: '#888'}}>
              Sunt Cumpărător
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={update} required
                className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                style={{background: '#1a1a1a', border: '1px solid #333'}} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">Parolă</label>
              <input name="password" type="password" value={form.password} onChange={update} required
                className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                style={{background: '#1a1a1a', border: '1px solid #333'}} />
            </div>
            {type === 'seller' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1">Numele Companiei</label>
                  <input name="companyName" type="text" value={form.companyName} onChange={update} required
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                    style={{background: '#1a1a1a', border: '1px solid #333'}} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1">Persoana de Contact</label>
                  <input name="contactName" type="text" value={form.contactName} onChange={update} required
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                    style={{background: '#1a1a1a', border: '1px solid #333'}} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1">Telefon</label>
                  <input name="phone" type="tel" value={form.phone} onChange={update} required
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                    style={{background: '#1a1a1a', border: '1px solid #333'}} />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Nume Complet</label>
                <input name="name" type="text" value={form.name} onChange={update} required
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}} />
              </div>
            )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-black text-lg text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{background: '#fcd968'}}>
              {loading ? 'Se creează contul...' : 'Creează Cont'}
            </button>
          </form>
          <p className="text-center text-gray-500 mt-6 text-sm">
            Ai deja cont?{' '}
            <Link href="/login" style={{color: '#fcd968'}} className="font-bold hover:opacity-80">Conectează-te</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
