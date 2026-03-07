import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })

    const seller = await prisma.seller.findUnique({ where: { email: session.user.email } })
    if (!seller) return NextResponse.json({ error: 'Vânzătorul nu a fost găsit' }, { status: 404 })

    const { productId, type } = await req.json()
    console.log('[CANCEL] productId:', productId, 'type:', type)

    const product = await prisma.product.findFirst({
      where: { id: productId, sellerId: seller.id }
    })

    if (!product) {
      console.log('[CANCEL] Product not found')
      return NextResponse.json({ error: 'Produsul nu a fost găsit' }, { status: 404 })
    }

    console.log('[CANCEL] stripeSubId:', product.stripeSubId)

    if (type === 'featured') {
      if (!product.featuredSubId) return NextResponse.json({ error: 'Niciun abonament de promovare' }, { status: 400 })
      await stripe.subscriptions.update(product.featuredSubId, { cancel_at_period_end: true })
      await prisma.product.update({
        where: { id: productId },
        data: { featured: false }
      })
    } else {
      if (!product.stripeSubId) {
        console.log('[CANCEL] No stripeSubId')
        return NextResponse.json({ error: 'Niciun abonament activ' }, { status: 400 })
      }

      const updatedSub = await stripe.subscriptions.update(product.stripeSubId, { cancel_at_period_end: true })
      console.log('[CANCEL] updatedSub keys:', Object.keys(updatedSub))
      console.log('[CANCEL] full sub:', JSON.stringify(updatedSub))

      const periodEnd = (updatedSub as any).current_period_end
      console.log('[CANCEL] periodEnd:', periodEnd)

      const newEndsAt = periodEnd ? new Date(periodEnd * 1000) : null
      console.log('[CANCEL] newEndsAt:', newEndsAt)

      const updated = await prisma.product.update({
        where: { id: productId },
        data: { subscriptionEndsAt: newEndsAt }
      })
      console.log('[CANCEL] saved subscriptionEndsAt:', updated.subscriptionEndsAt)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[CANCEL] ERROR:', error.message)
    console.error(error)
    return NextResponse.json({ error: error.message || 'Ceva nu a mers bine' }, { status: 500 })
  }
}
