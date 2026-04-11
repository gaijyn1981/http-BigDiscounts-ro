"use client"
import { useState } from "react"
import BuyerTermsModal from "./BuyerTermsModal"

interface Props {
  email: string
  phone: string
  paypalMe: string | null
  price: number
  productId: string
  productTitle: string
}

export default function ContactSellerButtons({ email, phone, paypalMe, price, productId, productTitle }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<"email" | "phone" | "paypal" | "enquiry" | null>(null)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [buyerName, setBuyerName] = useState("")
  const [buyerEmail, setBuyerEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  function handleClick(action: "email" | "phone" | "paypal") {
    setPendingAction(action)
    setShowModal(true)
  }

  function handleAccept() {
    setShowModal(false)
    if (pendingAction === "email") setShowEnquiry(true)
    if (pendingAction === "phone") window.location.href = `tel:${phone}`
    if (pendingAction === "paypal") window.open(`https://paypal.me/${paypalMe}/${price}`, "_blank")
    setPendingAction(null)
  }

  function handleDecline() {
    setShowModal(false)
    setPendingAction(null)
  }

  async function handleSendEnquiry() {
    setError("")
    if (!buyerName.trim()) return setError("Te rugăm să introduci numele tău.")
    if (!buyerEmail.trim()) return setError("Te rugăm să introduci emailul tău.")
    if (!message.trim()) return setError("Te rugăm să introduci un mesaj.")

    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, buyerName, buyerEmail, message }),
      })
      if (!res.ok) throw new Error("Failed to send")
      setSent(true)
    } catch {
      setError("Ceva a mers greșit. Încearcă din nou.")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {showModal && <BuyerTermsModal onAccept={handleAccept} onDecline={handleDecline} />}

      {paypalMe && (
        <button onClick={() => handleClick("paypal")}
          className="block w-full text-center py-3 rounded-xl font-bold text-lg mb-2 transition-opacity hover:opacity-90"
          style={{ background: "#003087", color: "white" }}>
          💳 Cumpără acum via PayPal
        </button>
      )}

      <button onClick={() => handleClick("email")}
        className="block w-full text-center py-3 rounded-xl font-bold text-lg mb-2 transition-opacity hover:opacity-90"
        style={{ background: "#fcd968", color: "black" }}>
        ✉️ Contactează Vânzătorul
      </button>

      <button onClick={() => handleClick("phone")}
        className="block w-full text-center py-3 rounded-xl font-bold text-lg mb-2 transition-opacity hover:opacity-90"
        style={{ background: "#1a1a1a", color: "white", border: "1px solid #333" }}>
        📞 Sună Vânzătorul
      </button>

      {showEnquiry && !sent && (
        <div className="mt-3 rounded-xl p-4 space-y-3" style={{ background: "#111", border: "1px solid #333" }}>
          <p className="text-sm font-bold" style={{ color: "#fcd968" }}>Trimite un mesaj vânzătorului</p>
          <input
            type="text"
            placeholder="Numele tău"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm text-white bg-transparent border border-gray-700 focus:outline-none focus:border-yellow-400"
          />
          <input
            type="email"
            placeholder="Emailul tău"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm text-white bg-transparent border border-gray-700 focus:outline-none focus:border-yellow-400"
          />
          <textarea
            placeholder={`Bună, sunt interesat/ă de ${productTitle}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={2000}
            className="w-full px-3 py-2 rounded-lg text-sm text-white bg-transparent border border-gray-700 focus:outline-none focus:border-yellow-400 resize-none"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <div className="flex gap-2">
            <button onClick={handleSendEnquiry} disabled={sending}
              className="flex-1 py-2 rounded-lg font-bold text-sm text-black disabled:opacity-50"
              style={{ background: "#fcd968" }}>
              {sending ? "Se trimite..." : "Trimite Mesajul"}
            </button>
            <button onClick={() => setShowEnquiry(false)}
              className="px-4 py-2 rounded-lg text-sm text-gray-400 border border-gray-700">
              Anulează
            </button>
          </div>
        </div>
      )}

      {sent && (
        <div className="mt-3 rounded-xl p-4 text-center" style={{ background: "#0a1a0a", border: "1px solid #4ade80" }}>
          <p className="text-green-400 font-bold text-sm">✅ Mesaj trimis! Vânzătorul îți va răspunde pe email.</p>
        </div>
      )}
    </>
  )
}
