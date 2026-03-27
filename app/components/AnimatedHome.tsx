'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// Hook for detecting when element is in viewport
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

// Counter animation hook
function useCounter(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView || target === 0) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

interface Props {
  session: boolean
  recentProducts: {
    id: string
    title: string
    price: number
    photos: string
    category: string | null
    featured: boolean
    seller: { companyName: string }
  }[]
  totalProducts: number
  totalSellers: number
  showCounters: boolean
}

export default function AnimatedHome({ session, recentProducts, totalProducts, totalSellers, showCounters }: Props) {
  // Search state
  const [search, setSearch] = useState('')

  // Hero fade-in
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Stats counter
  const { ref: statsRef, inView: statsInView } = useInView()
  const productCount = useCounter(totalProducts, statsInView)
  const sellerCount = useCounter(totalSellers, statsInView)

  // Products scroll animation
  const { ref: productsRef, inView: productsInView } = useInView(0.05)

  // Categories scroll animation
  const { ref: categoriesRef, inView: categoriesInView } = useInView(0.05)

  const categories = [
    { icon: '📱', label: 'Electronică & Tech', href: '/browse/Electronics%20%26%20Tech' },
    { icon: '📲', label: 'Telefoane & Accesorii', href: '/browse/Phone%20%26%20Accessories' },
    { icon: '👗', label: 'Îmbrăcăminte & Modă', href: '/browse/Clothing%20%26%20Fashion' },
    { icon: '🏠', label: 'Casă & Living', href: '/browse/Home%20%26%20Living' },
    { icon: '🌿', label: 'Grădină & Exterior', href: '/browse/Garden%20%26%20Outdoor' },
    { icon: '🐾', label: 'Animale de companie', href: '/browse/Pets' },
    { icon: '👶', label: 'Bebeluși & Copii', href: '/browse/Baby%20%26%20Kids' },
    { icon: '💊', label: 'Sănătate & Frumusețe', href: '/browse/Health%20%26%20Beauty' },
    { icon: '🧸', label: 'Jucării & Jocuri', href: '/browse/Toys%20%26%20Games' },
    { icon: '⚽', label: 'Sport & Fitness', href: '/browse/Sports%20%26%20Fitness' },
    { icon: '🍫', label: 'Alimente & Băuturi', href: '/browse/Food%20%26%20Drink' },
    { icon: '📚', label: 'Cărți & Papetărie', href: '/browse/Books%20%26%20Stationery' },
    { icon: '🔧', label: 'Unelte & Bricolaj', href: '/browse/Tools%20%26%20DIY' },
    { icon: '🚗', label: 'Auto', href: '/browse/Automotive' },
    { icon: '🎨', label: 'Arte & Artizanat', href: '/browse/Arts%20%26%20Crafts' },
    { icon: '🎁', label: 'Cadouri & Sezonal', href: '/browse/Gifts%20%26%20Seasonal' },
    { icon: '🧹', label: 'Curățenie & Menaj', href: '/browse/Cleaning%20%26%20Household' },
    { icon: '🏠', label: 'Imobiliare', href: '/browse/Imobiliare' },
    { icon: '📦', label: 'Altele', href: '/browse/Other' },
  ]

  return (
    <>
      {/* Hero Section - Fade in */}
      <section className="px-6 py-24 text-center" style={{ background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)' }}>
        <div
          className="max-w-4xl mx-auto"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-bold" style={{ background: '#1a1400', border: '1px solid #fcd968', color: '#fcd968' }}>
            Conectăm Cumpărători și Afaceri din România
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Marketplace-ul din România<br />
            <span style={{ color: '#fcd968' }}>Creat pentru Vânzători și Cumpărători</span>
          </h1>
          <p className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Un loc corect și transparent pentru cumpărare și vânzare — fără comision, taxe mici, control total.
          </p>
          <p className="text-gray-600 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
            BigDiscounts este un marketplace online din România creat pentru a sprijini vânzătorii independenți și micile afaceri. Spre deosebire de platformele tradiționale care percep comision la fiecare vânzare, BigDiscounts oferă o taxă transparentă de 5 RON/lună fără comision, permițând vânzătorilor să păstreze 100% din veniturile lor.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {session ? (
              <Link href="/seller/dashboard" style={{ background: '#fcd968' }}
                className="text-black px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform duration-200 inline-block">
                Panou
              </Link>
            ) : (
              <Link href="/register?type=seller" style={{ background: '#fcd968' }}
                className="text-black px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform duration-200 inline-block">
                Începe să vinzi — 5 RON/lună
              </Link>
            )}
            <Link href="/browse"
              className="text-black px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform duration-200 inline-block"
              style={{ background: '#fcd968' }}>
              Caută produse
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      {showCounters && (
        <div ref={statsRef} className="px-6 py-10" style={{ background: '#111111', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
          <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6 text-center">
            <div>
              <p
                className="text-4xl font-black"
                style={{
                  color: '#fcd968',
                  transition: 'all 0.3s ease',
                }}
              >
                {sellerCount}+
              </p>
              <p className="text-gray-400 text-sm mt-1">Sellers</p>
            </div>
            <div>
              <p
                className="text-4xl font-black"
                style={{ color: '#fcd968' }}
              >
                {productCount}+
              </p>
              <p className="text-gray-400 text-sm mt-1">Products</p>
            </div>
          </div>
        </div>
      )}

      {/* Categories Section - Staggered slide in */}
      <section className="px-6 py-14" style={{ background: '#0a0a0a' }}>
        <h2 className="text-2xl font-black text-white text-center mb-8">Răsfoiește după categorie</h2>
        <div ref={categoriesRef} className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex flex-col items-center p-3 rounded-xl text-center group"
              style={{
                background: '#111111',
                border: '1px solid #222',
                opacity: categoriesInView ? 1 : 0,
                transform: categoriesInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
              }}
            >
              <span
                className="text-2xl mb-1 group-hover:scale-125 inline-block"
                style={{ transition: 'transform 0.2s ease' }}
              >
                {cat.icon}
              </span>
              <span className="text-xs text-gray-400 group-hover:text-white" style={{ transition: 'color 0.2s ease' }}>
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Products - Staggered fade in */}
      {recentProducts.length > 0 && (
        <section className="px-6 py-14" style={{ background: '#111111' }}>
          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Caută produse..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-xl text-white focus:outline-none"
              style={{
                background: '#1a1a1a',
                border: '1px solid #333',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#fcd968'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(252,217,104,0.15)' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>

          <h2 className="text-2xl font-black text-white text-center mb-8">Cele mai recente anunțuri</h2>
          <div ref={productsRef} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentProducts
              .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
              .map((product, i) => {
              const photos = JSON.parse(product.photos || '[]')
              const photo = photos[0] || null
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="rounded-xl overflow-hidden group"
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid #222',
                    opacity: productsInView ? 1 : 0,
                    transform: productsInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                    transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                  }}
                >
                  <div
                    className="h-40 overflow-hidden relative"
                    style={{ background: '#222' }}
                  >
                    {photo ? (
                      <>
                    <img
                      src={photo}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105"
                      style={{ transition: 'transform 0.3s ease' }}
                    />
                    {product.featured && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-black text-black" style={{background: '#fcd968'}}>
                        ⭐ Recomandat
                      </div>
                    )}
                  </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-bold truncate">{product.title}</p>
                    <p className="text-xs text-gray-500 truncate">{product.seller.companyName}</p>
                    <p className="font-black mt-1" style={{ color: '#fcd968' }}>{product.price.toFixed(2)} RON</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/browse" style={{ background: '#fcd968' }}
              className="text-black px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform duration-200 inline-block">
              Vezi toate anunțurile
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
