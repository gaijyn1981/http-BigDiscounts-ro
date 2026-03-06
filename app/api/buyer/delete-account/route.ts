import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })

    const buyer = await prisma.buyer.findUnique({ where: { email: session.user.email } })
    if (!buyer) return NextResponse.json({ error: 'Cumpărătorul nu a fost găsit' }, { status: 404 })

    await prisma.favourite.deleteMany({ where: { buyerEmail: session.user.email } })
    await prisma.buyer.delete({ where: { id: buyer.id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Ceva nu a mers bine' }, { status: 500 })
  }
}
