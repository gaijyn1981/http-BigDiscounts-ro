'use client'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Toast, useToast } from '@/app/components/Toast'

interface Product {
  id: string
  title: string
  price: number
  category: string
  active: boolean
  featured: boolean
  stripeSubId: string | null
  featuredSubId: string | null
  subscriptionEndsAt: string | null
  views: number
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const { toast, showToast, hideToast } = useToast()

  const success = searchParams.get('success')
  const cancelled = searchParams.get('cancelled')
  const featured = searchParams.get('featured')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'seller') router.push('/buyer/dashboard')
    if (status === 'authenticated') fetchProducts()
  }, [status])

  async function fetchProducts() {
    const res = await fetch('/api/seller/products')
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  async function deleteProduct(id: string) {
    if (!confirm('Ștergi acest produs?')) return
    await fetch(`/api/seller/products/${id}`, { method: 'DELETE' })
    fetchProducts()
    showToast('Produsul a fost șters cu succes', 'success')
  }

  async function activateProduct(id: string) {
    const res = await fetch('/api/stripe/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  async function featureProduct(id: string) {
    const res = await fetch('/api/stripe/feature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  async function cancelSubscription(id: string, type: 'regular' | 'featured') {
    const product = products.find(p => p.id === id)
    const endsAt = product?.subscriptionEndsAt
      ? new Date(product.subscriptionEndsAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'sfârșitul perioadei de facturare'

    if (!confirm(
      type === 'featured'
        ? 'Anulezi abonamentul de promovare? Anunțul tău va pierde statutul de promovat la sfârșitul perioadei de facturare.'
        : 'Anulezi abonamentul? Anunțul tău va rămâne activ până la ' + endsAt + ', apoi va fi dezactivat.'
    )) return

    setCancelling(id + type)
    const res = await fetch('/api/stripe/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, type })
    })
    if (res.ok) {
      fetchProducts()
      showToast(
        type === 'featured'
          ? 'Abonamentul de promovare a fost anulat - promovarea se va încheia la sfârșitul perioadei de facturare.'
          : 'Abonamentul a fost anulat - anunțul rămâne activ până la ' + endsAt + '.',
        'info'
      )
    } else {
      showToast('Anularea a eșuat. Te rugăm să încerci din nou.', 'error')
    }
    setCancelling(null)
  }

  if (status === 'loading' || loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{background: '#0a0a0a'}}>
      <p style={{color: '#fcd968'}} className="text-lg font-bold">Se încarcă...</p>
    </div>
  )

  return (
    <main className="min-h-screen" style={{background: '#0a0a0a'}}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <nav style={{background: '#111111', borderBottom: '1px solid #2a2a2a'}} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-2xl font-black" style={{color: '#fcd968'}}>BigDiscounts</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Bun venit, {session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="text-gray-500 hover:text-red-400 text-sm">Deconectare</button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {success && (
          <div className="rounded-xl px-6 py-4 mb-6 flex items-center gap-3"
            style={{background: '#0a1a0a', border: '1px solid #4ade80'}}>
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-bold text-green-400">Plata a fost efectuată cu succes!</p>
              <p className="text-green-600 text-sm">Produsul tău este acum activ și vizibil pentru cumpărători.</p>
            </div>
          </div>
        )}

        {featured && (
          <div className="rounded-xl px-6 py-4 mb-6 flex items-center gap-3"
            style={{background: '#1a1400', border: '1px solid #fcd968'}}>
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-bold" style={{color: '#fcd968'}}>Anunțul a fost promovat cu succes!</p>
              <p className="text-yellow-600 text-sm">Produsul tău va apărea în partea de sus a paginii de explorare.</p>
            </div>
          </div>
        )}

        {cancelled && (
          <div className="rounded-xl px-6 py-4 mb-6 flex items-center gap-3"
            style={{background: '#1a1000', border: '1px solid #f97316'}}>
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-bold text-orange-400">Plata a fost anulată</p>
              <p className="text-orange-600 text-sm">Nu s-au făcut modificări la anunțul tău.</p>
            </div>
          </div>
        )}

        <div className="rounded-xl p-4 mb-6" style={{background: '#1a1400', border: '1px solid #fcd968'}}>
          <p className="font-bold mb-1" style={{color: '#fcd968'}}>📦 Responsabilitățile Vânzătorului</p>
          <p className="text-gray-400 text-sm">Ca vânzător, ești responsabil pentru: expedierea produselor către cumpărători și emiterea rambursărilor în termen de 14 zile de la primirea returului. Cumpărătorii sunt responsabili pentru returnarea articolelor în termen de 14 zile conform legislației privind protecția consumatorilor. BigDiscounts nu este responsabil pentru niciun litigiu între cumpărători și vânzători.</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-white">Produsele Mele</h1>
          <div className="flex gap-3">
            <Link href="/seller/profile"
              className="px-5 py-2 rounded-lg font-bold text-sm transition-opacity hover:opacity-80"
              style={{background: '#1a1a1a', color: '#fcd968', border: '1px solid #fcd968'}}>
              Profil
            </Link>
            <Link href="/seller/products/new"
              className="px-5 py-2 rounded-lg font-bold text-sm text-black transition-opacity hover:opacity-90"
              style={{background: '#fcd968'}}>
              + Adaugă Produs
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl p-12 text-center" style={{background: '#111111', border: '1px solid #222'}}>
            <p className="text-gray-500 text-lg mb-4">Nu ai listat niciun produs încă.</p>
            <Link href="/seller/products/new"
              className="px-6 py-3 rounded-lg font-bold text-black"
              style={{background: '#fcd968'}}>
              Listează Primul Tău Produs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="rounded-xl p-6 flex justify-between items-center"
                style={{background: '#111111', border: product.featured ? '2px solid #fcd968' : '1px solid #222'}}>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-lg">{product.title}</h3>
                    {product.featured && (
                      <span className="text-xs font-black px-2 py-1 rounded-full text-black"
                        style={{background: '#fcd968'}}>⭐ Promovat</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{product.price.toFixed(2)} RON · {product.category || 'Fără categorie'}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded-full font-bold"
                      style={product.active
                        ? {background: '#0a1a0a', color: '#4ade80', border: '1px solid #4ade80'}
                        : {background: '#1a1000', color: '#f97316', border: '1px solid #f97316'}}>
                      {product.active ? 'Activ' : 'În așteptarea plății'}
                    </span>
                    {product.active && product.subscriptionEndsAt && (
                      <span className="text-xs px-2 py-1 rounded-full font-bold"
                        style={{background: '#1a0a0a', color: '#f87171', border: '1px solid #f87171'}}>
                        Activ până la {new Date(product.subscriptionEndsAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    <span className="text-xs text-gray-600">👁️ {product.views} vizualizări</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center flex-wrap justify-end">
                  {!product.active && (
                    <button onClick={() => activateProduct(product.id)}
                      className="px-4 py-2 rounded-lg text-sm font-bold text-black hover:opacity-90"
                      style={{background: '#4ade80'}}>
                      Activează 5 RON/lună
                    </button>
                  )}
                  {product.active && !product.featured && (
                    <button onClick={() => featureProduct(product.id)}
                      className="px-4 py-2 rounded-lg text-sm font-black text-black hover:opacity-90"
                      style={{background: '#fcd968'}}>
                      ⭐ Promovează 15 RON/lună
                    </button>
                  )}
                  {product.active && product.stripeSubId && !product.subscriptionEndsAt && (
                    <button onClick={() => cancelSubscription(product.id, 'regular')}
                      disabled={cancelling === product.id + 'regular'}
                      className="px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80 disabled:opacity-30"
                      style={{background: '#1a0a0a', color: '#f87171', border: '1px solid #f87171'}}>
                      {cancelling === product.id + 'regular' ? 'Se anulează...' : 'Anulează Abonamentul'}
                    </button>
                  )}
                  {product.featured && product.featuredSubId && (
                    <button onClick={() => cancelSubscription(product.id, 'featured')}
                      disabled={cancelling === product.id + 'featured'}
                      className="px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80 disabled:opacity-30"
                      style={{background: '#1a1400', color: '#fcd968', border: '1px solid #fcd968'}}>
                      {cancelling === product.id + 'featured' ? 'Se anulează...' : 'Anulează Promovarea'}
                    </button>
                  )}
                  <Link href={`/seller/products/${product.id}/edit`}
                    className="px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80"
                    style={{color: '#fcd968'}}>
                    Editează
                  </Link>
                  <button onClick={() => deleteProduct(product.id)}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-red-400 hover:opacity-80">
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
