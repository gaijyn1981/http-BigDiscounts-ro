import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })

    const seller = await prisma.seller.findUnique({ where: { email: session.user.email } })
    if (!seller) return NextResponse.json({ error: 'Vânzătorul nu a fost găsit' }, { status: 404 })

    await prisma.product.deleteMany({ where: { sellerId: seller.id } })
    await prisma.seller.delete({ where: { id: seller.id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Ceva nu a mers bine' }, { status: 500 })
  }
}
