import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import { sendVerificationEmail } from '@/lib/email'
import { registerRateLimit } from '@/lib/ratelimit'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
    const { success } = await registerRateLimit.limit(ip)
    if (!success) {
      return NextResponse.json({ error: 'Prea multe cereri. Încearcă din nou mai târziu.' }, { status: 429 })
    }

    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Toate câmpurile sunt obligatorii' }, { status: 400 })
    }

    if (typeof email !== 'string' || email.length > 200) return NextResponse.json({ error: 'Email invalid' }, { status: 400 })
    if (typeof password !== 'string' || password.length < 8) return NextResponse.json({ error: 'Parola trebuie să aibă cel puțin 8 caractere' }, { status: 400 })
    if (password.length > 200) return NextResponse.json({ error: 'Parola este prea lungă' }, { status: 400 })
    if (typeof name !== 'string' || name.length > 100) return NextResponse.json({ error: 'Numele este prea lung' }, { status: 400 })

    const existing = await prisma.buyer.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'Emailul este deja înregistrat' }, { status: 400 })

    const hashed = await bcrypt.hash(password, 10)
    const verifyToken = randomBytes(32).toString('hex')

    await prisma.buyer.create({
      data: { email, password: hashed, name, verifyToken }
    })

    await sendVerificationEmail(email, verifyToken, name)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Ceva nu a mers bine' }, { status: 500 })
  }
}
