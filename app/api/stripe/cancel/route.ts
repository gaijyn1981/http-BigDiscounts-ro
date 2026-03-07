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
    console.log('[CANCEL] productId:', productId, 'type:', type, 'sellerId:', seller.id)

    const product = await prisma.product.findFirst({
      where: { id: productId, sellerId: seller.id }
    })

    if (!product) {
      console.log('[CANCEL] Product not found')
      return NextResponse.json({ error: 'Produsul nu a fost găsit' }, { status: 404 })
    }

    console.log('[CANCEL] Product found - stripeSubId:', product.stripeSubId, 'active:', product.active, 'subscriptionEndsAt:', product.subscriptionEndsAt)

    if (type === 'featured') {
      if (!product.featuredSubId) return NextResponse.json({ error: 'Niciun abonament de promovare' }, { status: 400 })
      await stripe.subscriptions.update(product.featuredSubId, { cancel_at_period_end: true })
      await prisma.product.update({
        where: { id: productId },
        data: { featured: false }
      })
    } else {
      if (!product.stripeSubId) {
        console.log('[CANCEL] No stripeSubId on product')
        return NextResponse.json({ error: 'Niciun abonament activ' }, { status: 400 })
      }

      console.log('[CANCEL] Calling Stripe update for sub:', product.stripeSubId)
      const updatedSub = await stripe.subscriptions.update(product.stripeSubId, { cancel_at_period_end: true })
      console.log('[CANCEL] Stripe update done - cancel_at_period_end:', updatedSub.cancel_at_period_end)

      const stripeSubscription = await stripe.subscriptions.retrieve(product.stripeSubId)
      const periodEnd = (stripeSubscription as any).current_period_end
      console.log("[CANCEL] periodEnd from retrieve:", periodEnd)
      console.log("[CANCEL] sub current_period_end raw:", stripeSubscription.current_period_end)
      console.log("[CANCEL] sub status:", stripeSubscription.status)
      console.log("[CANCEL] sub cancel_at_period_end:", stripeSubscription.cancel_at_period_end)

      const newEndsAt = periodEnd ? new Date(periodEnd * 1000) : null
      console.log('[CANCEL] Setting subscriptionEndsAt to:', newEndsAt)

      const updated = await prisma.product.update({
        where: { id: productId },
        data: { subscriptionEndsAt: newEndsAt }
      })
      console.log('[CANCEL] Prisma update result - subscriptionEndsAt:', updated.subscriptionEndsAt)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[CANCEL] ERROR:', error.message)
    console.error(error)
    return NextResponse.json({ error: error.message || 'Ceva nu a mers bine' }, { status: 500 })
  }
}
