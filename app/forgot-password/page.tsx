'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
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
          <p className="text-gray-400 mb-6">Am trimis un link de resetare a parolei la <span style={{color: '#fcd968'}}>{email}</span>.</p>
          <Link href="/login"
            className="block w-full py-3 rounded-xl font-black text-lg text-black transition-opacity hover:opacity-90"
            style={{background: '#fcd968'}}>
            Înapoi la Autentificare
          </Link>
        </div>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{background: '#0a0a0a'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-3xl font-black" style={{color: '#fcd968'}}>🇷🇴 BigDiscounts</span>
          <p className="text-gray-500 mt-2">Resetează-ți parola</p>
        </div>
        <div className="rounded-2xl p-8" style={{background: '#111111', border: '1px solid #222'}}>
          <h1 className="text-2xl font-black text-white mb-2">Ai Uitat Parola?</h1>
          <p className="text-gray-500 text-sm mb-6">Introdu email-ul și îți vom trimite un link de resetare.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">Adresa de Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                style={{background: '#1a1a1a', border: '1px solid #333'}} />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-black text-lg text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{background: '#fcd968'}}>
              {loading ? 'Se trimite...' : 'Trimite Link de Resetare'}
            </button>
          </form>
          <p className="text-center text-gray-500 mt-6 text-sm">
            Îți amintești parola?{' '}
            <Link href="/login" style={{color: '#fcd968'}} className="font-bold hover:opacity-80">Conectează-te</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
