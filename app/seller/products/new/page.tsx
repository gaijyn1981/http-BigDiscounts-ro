'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewProduct() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', deliveryTime: '' })
  const [photos, setPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')
  const [customDelivery, setCustomDelivery] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session.user as any).role !== 'seller') router.push('/buyer/dashboard')
  }, [status, session])

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || photos.length >= 4) return
    setUploading(true)
    for (const file of Array.from(files)) {
      if (photos.length >= 4) break
      const data = new FormData()
      data.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: data })
      const json = await res.json()
      if (json.url) setPhotos(prev => [...prev, json.url])
    }
    setUploading(false)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowTerms(true)
  }

  async function handleSubmit() {
    setShowTerms(false)
    setLoading(true)
    setError('')
    const res = await fetch('/api/seller/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, deliveryTime: form.deliveryTime === 'Custom' ? customDelivery : form.deliveryTime, photos })
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Error'); setLoading(false) }
    else router.push('/seller/dashboard')
  }

  if (status === 'loading') return (
    <div className="min-h-screen flex items-center justify-center" style={{background: '#0a0a0a'}}>
      <p style={{color: '#fcd968'}} className="text-lg font-bold">Se încarcă...</p>
    </div>
  )

  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>BigDiscounts</span>
        <Link href="/seller/dashboard" className="text-gray-400 hover:text-white transition-colors">← Înapoi la Panou</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black text-white mb-8">Adaugă Produs Nou</h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="rounded-2xl p-6" style={{background: '#111111', border: '1px solid #222'}}>
            <h2 className="text-lg font-black text-white mb-4">Detalii Produs</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Titlu</label>
                <input name="title" value={form.title} onChange={update} required
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Descriere</label>
                <textarea name="description" value={form.description} onChange={update} required rows={4}
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none resize-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1">Preț (£)</label>
                  <input name="price" type="number" step="0.01" value={form.price} onChange={update} required
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                    style={{background: '#1a1a1a', border: '1px solid #333'}} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1">Categorie</label>
                  <select name="category" value={form.category} onChange={update}
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                    style={{background: '#1a1a1a', border: '1px solid #333'}}>
                    <option value="">Selectează categoria</option>
                    <option value="Electronics & Tech">Electronică și Tehnologie</option>
                    <option value="Phone & Accessories">Telefoane și Accesorii</option>
                    <option value="Clothing & Fashion">Îmbrăcăminte și Modă</option>
                    <option value="Home & Living">Casă și Locuință</option>
                    <option value="Garden & Outdoor">Grădină și Exterior</option>
                    <option value="Pets">Animale de Companie</option>
                    <option value="Baby & Kids">Bebeluși și Copii</option>
                    <option value="Health & Beauty">Sănătate și Frumusețe</option>
                    <option value="Toys & Games">Jucării și Jocuri</option>
                    <option value="Sports & Fitness">Sport și Fitness</option>
                    <option value="Food & Drink">Alimente și Băuturi</option>
                    <option value="Books & Stationery">Cărți și Papetărie</option>
                    <option value="Tools & DIY">Unelte și Bricolaj</option>
                    <option value="Automotive">Auto</option>
                    <option value="Arts & Crafts">Artă și Meșteșuguri</option>
                    <option value="Office & Business">Birou și Afaceri</option>
                    <option value="Gifts & Seasonal">Cadouri și Sezoniere</option>
                    <option value="Cleaning & Household">Curățenie și Menaj</option>
                    <option value="Other">Altele</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-400 mb-1">Timp de Livrare <span className="text-gray-600 font-normal">(opțional)</span></label>
                <select name="deliveryTime" value={form.deliveryTime} onChange={update}
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none"
                  style={{background: '#1a1a1a', border: '1px solid #333'}}>
                  <option value="">Nespecificat</option>
                  <option value="Next day">A doua zi</option>
                  <option value="2-3 days">2-3 zile</option>
                  <option value="1 week">1 săptămână</option>
                  <option value="2 weeks+">2 săptămâni+</option>
                  <option value="Custom">Personalizat</option>
                </select>
                {form.deliveryTime === 'Custom' && (
                  <input value={customDelivery} onChange={e => setCustomDelivery(e.target.value)}
                    placeholder="de ex. 3-5 zile lucrătoare"
                    className="w-full mt-2 px-4 py-3 rounded-xl text-white focus:outline-none"
                    style={{background: '#1a1a1a', border: '1px solid #333'}} />
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{background: '#111111', border: '1px solid #222'}}>
            <h2 className="text-lg font-black text-white mb-2">Fotografii</h2>
            <p className="text-gray-500 text-sm mb-4">Încarcă până la 4 fotografii ale produsului tău.</p>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {photos.map((photo, i) => (
                <div key={i} className="relative">
                  <img src={photo} alt="" className="w-full h-20 object-cover rounded-lg" />
                  <button type="button" onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold text-white"
                    style={{background: '#f87171'}}>×</button>
                </div>
              ))}
              {photos.length < 4 && (
                <label className="w-full h-20 rounded-lg flex items-center justify-center cursor-pointer text-gray-500 hover:text-white transition-colors"
                  style={{background: '#1a1a1a', border: '2px dashed #333'}}>
                  {uploading ? '...' : '+'}
                  <input type="file" accept="image/*" multiple onChange={uploadPhoto} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-black text-xl text-black transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{background: '#fcd968'}}>
            {loading ? 'Se creează...' : 'Creează Anunț'}
          </button>
        </form>
      </div>
      {/* Modal Termeni Vânzător */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{background: 'rgba(0,0,0,0.85)'}}>
          <div className="w-full max-w-md rounded-2xl p-8" style={{background: '#111111', border: '1px solid #fcd968'}}>
            <h2 className="text-xl font-black text-white mb-2">Înainte de a Publica</h2>
            <p className="text-gray-500 text-sm mb-6">Prin listarea pe BigDiscounts ești de acord cu următoarele:</p>
            <ul className="space-y-3 mb-6">
              {[
                'Expediază produsele prompt după primirea plății de la cumpărător',
                'Asigură-te că descrierile și fotografiile produselor sunt corecte și nu induc în eroare',
                'Acceptă retururile în termen de 14 zile conform Regulamentelor UK privind Contractele cu Consumatorii din 2013',
                'Emite rambursări în termen de 14 zile de la primirea returului de la cumpărător',
                'BigDiscounts nu este responsabil pentru litigiile dintre cumpărători și vânzători',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1 text-sm" style={{color: '#fcd968'}}>•</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 rounded" />
              <span className="text-gray-400 text-sm">Înțeleg și sunt de acord cu acești termeni</span>
            </label>
            <div className="flex gap-3">
              <button onClick={handleSubmit} disabled={!termsAccepted}
                className="flex-1 py-3 rounded-xl font-black text-black transition-opacity hover:opacity-90 disabled:opacity-30"
                style={{background: '#fcd968'}}>
                Publică Anunțul
              </button>
              <button onClick={() => setShowTerms(false)}
                className="flex-1 py-3 rounded-xl font-bold text-gray-400 hover:opacity-80"
                style={{background: '#1a1a1a', border: '1px solid #333'}}>
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
