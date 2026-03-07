import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })
  }

  const { id } = await context.params
  await prisma.product.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })
  }

  const { id } = await context.params
  const { activate } = await req.json()

  const data: any = {}
  if (activate) {
    data.active = true
    data.subscriptionEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }

  const product = await prisma.product.update({ where: { id }, data })
  return NextResponse.json(product)
}
