import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })

    const { productId, reason } = await req.json()
    if (!productId || !reason) return NextResponse.json({ error: 'Câmpuri lipsă' }, { status: 400 })

    await prisma.report.create({
      data: { productId, reason }
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Ceva nu a mers bine' }, { status: 500 })
  }
}
