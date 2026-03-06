import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()
    if (!token || !password) return NextResponse.json({ error: 'Cerere invalidă' }, { status: 400 })

    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Parola trebuie să aibă cel puțin 8 caractere' }, { status: 400 })
    }

    if (password.length > 200) {
      return NextResponse.json({ error: 'Parola este prea lungă' }, { status: 400 })
    }

    const now = new Date()
    const hashed = await bcrypt.hash(password, 10)

    const seller = await prisma.seller.findFirst({ where: { verifyToken: token } })
    if (seller) {
      if (!seller.resetTokenExpiry || seller.resetTokenExpiry < now) {
        return NextResponse.json({ error: 'Linkul de resetare a expirat. Te rugăm să soliciți unul nou.' }, { status: 400 })
      }
      await prisma.seller.update({
        where: { id: seller.id },
        data: { password: hashed, verifyToken: null, resetTokenExpiry: null }
      })
      return NextResponse.json({ success: true })
    }

    const buyer = await prisma.buyer.findFirst({ where: { verifyToken: token } })
    if (buyer) {
      if (!buyer.resetTokenExpiry || buyer.resetTokenExpiry < now) {
        return NextResponse.json({ error: 'Linkul de resetare a expirat. Te rugăm să soliciți unul nou.' }, { status: 400 })
      }
      await prisma.buyer.update({
        where: { id: buyer.id },
        data: { password: hashed, verifyToken: null, resetTokenExpiry: null }
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Link de resetare invalid sau expirat' }, { status: 400 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Ceva nu a mers bine' }, { status: 500 })
  }
}
