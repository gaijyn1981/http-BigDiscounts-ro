import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendContactNotification } from '@/lib/email'
import { sendPushToUser } from '@/lib/push'

export async function POST(req: Request) {
  try {
    const { productId, buyerName, buyerEmail, message } = await req.json()

    if (!productId || !buyerName || !buyerEmail || !message) {
      return NextResponse.json({ error: 'Toate câmpurile sunt obligatorii' }, { status: 400 })
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: 'Mesaj prea lung' }, { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { seller: true }
    })

    if (!product) return NextResponse.json({ error: 'Produs negăsit' }, { status: 404 })

    await sendContactNotification(
      product.seller.email,
      product.seller.companyName,
      product.title,
      buyerEmail.trim(),
      buyerName.trim(),
      message.trim()
    )

    await sendPushToUser(
      product.seller.id,
      'seller',
      '💬 Cerere nouă',
      `${buyerName} a întrebat despre "${product.title}"`,
      `/seller/dashboard`
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Trimiterea a eșuat' }, { status: 500 })
  }
}
