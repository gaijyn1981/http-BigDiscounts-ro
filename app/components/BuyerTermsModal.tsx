'use client'
import { useState } from 'react'

interface Props {
  onAccept: () => void
  onDecline: () => void
}

export default function BuyerTermsModal({ onAccept, onDecline }: Props) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{background: 'rgba(0,0,0,0.85)'}}>
      <div className="w-full max-w-md rounded-2xl p-8"
        style={{background: '#111111', border: '1px solid #fcd968'}}>
        <h2 className="text-2xl font-black text-white mb-2">Înainte de a Continua</h2>
        <p className="text-gray-400 text-sm mb-4">Contactând acest vânzător sau cumpărând acest produs, ești de acord cu Termenii și Condițiile noastre, inclusiv:</p>
        <ul className="text-gray-400 text-sm space-y-2 mb-6">
          <li className="flex gap-2"><span style={{color: '#fcd968'}}>•</span> Tranzacțiile sunt direct între tine și vânzător</li>
          <li className="flex gap-2"><span style={{color: '#fcd968'}}>•</span> BigDiscounts nu este responsabil pentru plăți sau dispute</li>
          <li className="flex gap-2"><span style={{color: '#fcd968'}}>•</span> Ai dreptul de returnare în 14 zile conform UK Consumer Contracts Regulations</li>
          <li className="flex gap-2"><span style={{color: '#fcd968'}}>•</span> Vânzătorii sunt responsabili pentru livrare. Cumpărătorii au 14 zile pentru a returna articolele; vânzătorii trebuie să ramburseze în 14 zile de la primirea returnării.</li>
        </ul>
        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}
            className="w-5 h-5 rounded accent-yellow-400" />
          <span className="text-gray-300 text-sm">Am citit și sunt de acord cu <a href="/terms" target="_blank" style={{color: '#fcd968'}} className="hover:opacity-80 underline">Termenii și Condițiile</a></span>
        </label>
        <div className="flex gap-3">
          <button onClick={onDecline}
            className="flex-1 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-80"
            style={{background: '#1a1a1a', border: '1px solid #333'}}>
            Anulează
          </button>
          <button onClick={onAccept} disabled={!checked}
            className="flex-1 py-3 rounded-xl font-black text-black transition-opacity hover:opacity-90 disabled:opacity-30"
            style={{background: '#fcd968'}}>
            Continuă
          </button>
        </div>
      </div>
    </div>
  )
}
