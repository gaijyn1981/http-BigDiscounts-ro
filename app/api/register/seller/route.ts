import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email, password, companyName, contactName, phone } = await req.json()

    if (!email || !password || !companyName || !contactName || !phone) {
      return NextResponse.json({ error: 'Toate câmpurile sunt obligatorii' }, { status: 400 })
    }

    if (typeof email !== 'string' || email.length > 200) return NextResponse.json({ error: 'Email invalid' }, { status: 400 })
    if (typeof password !== 'string' || password.length < 8) return NextResponse.json({ error: 'Parola trebuie să aibă cel puțin 8 caractere' }, { status: 400 })
    if (password.length > 200) return NextResponse.json({ error: 'Parola este prea lungă' }, { status: 400 })
    if (typeof companyName !== 'string' || companyName.length > 100) return NextResponse.json({ error: 'Numele companiei este prea lung' }, { status: 400 })
    if (typeof contactName !== 'string' || contactName.length > 100) return NextResponse.json({ error: 'Numele persoanei de contact este prea lung' }, { status: 400 })
    if (typeof phone !== 'string' || phone.length > 20) return NextResponse.json({ error: 'Număr de telefon invalid' }, { status: 400 })

    const existing = await prisma.seller.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'Emailul este deja înregistrat' }, { status: 400 })

    const hashed = await bcrypt.hash(password, 10)
    const verifyToken = randomBytes(32).toString('hex')

    await prisma.seller.create({
      data: { email, password: hashed, companyName, contactName, phone, verifyToken }
    })

    await sendVerificationEmail(email, verifyToken, companyName)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Ceva nu a mers bine' }, { status: 500 })
  }
}
