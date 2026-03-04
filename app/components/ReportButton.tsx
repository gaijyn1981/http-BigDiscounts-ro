'use client'
import { useState } from 'react'

export default function ReportButton({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, reason })
    })
    setLoading(false)
    setSubmitted(true)
  }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      className="w-full text-center text-gray-400 text-sm hover:text-red-500 mt-2 py-1">
      🚩 Raportează acest anunț
    </button>
  )

  if (submitted) return (
    <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-3 text-center text-green-700 text-sm">
      ✅ Raport trimis. Mulțumim!
    </div>
  )

  return (
    <div className="mt-2 bg-red-50 border border-red-200 rounded-xl p-4">
      <p className="font-semibold text-red-800 text-sm mb-2">Raportează acest anunț</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select value={reason} onChange={e => setReason(e.target.value)} required
          className="w-full border border-red-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">Selectează un motiv</option>
          <option value="Fraudulent listing">Anunț fraudulos</option>
          <option value="Counterfeit goods">Produse contrafăcute</option>
          <option value="Prohibited item">Articol interzis</option>
          <option value="Wrong category">Categorie greșită</option>
          <option value="Offensive content">Conținut ofensator</option>
          <option value="Other">Altele</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" disabled={loading}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600 disabled:opacity-50">
            {loading ? 'Se trimite...' : 'Trimite Raportul'}
          </button>
          <button type="button" onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100">
            Anulează
          </button>
        </div>
      </form>
    </div>
  )
}
