import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BigDiscounts - Piata de Reduceri din Romania'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 72, marginRight: 24 }}>🇷🇴</span>
          <span style={{ fontSize: 80, fontWeight: 900, color: '#fcd968' }}>BigDiscounts</span>
        </div>
        <div style={{ fontSize: 36, color: '#9ca3af', marginBottom: 48, textAlign: 'center', maxWidth: 800 }}>
          Marketplace-ul corect din Romania
        </div>
        <div style={{ display: 'flex', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', border: '2px solid #fcd968', borderRadius: 16, padding: '20px 40px' }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#fcd968' }}>5 RON</span>
            <span style={{ fontSize: 18, color: '#9ca3af', marginTop: 8 }}>pe luna</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', border: '2px solid #fcd968', borderRadius: 16, padding: '20px 40px' }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#fcd968' }}>0%</span>
            <span style={{ fontSize: 18, color: '#9ca3af', marginTop: 8 }}>comision</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', border: '2px solid #fcd968', borderRadius: 16, padding: '20px 40px' }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#fcd968' }}>Direct</span>
            <span style={{ fontSize: 18, color: '#9ca3af', marginTop: 8 }}>vanzator-cumparator</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, fontSize: 24, color: '#4b5563' }}>
          www.bigdiscounts.ro
        </div>
      </div>
    ),
    { ...size }
  )
}
