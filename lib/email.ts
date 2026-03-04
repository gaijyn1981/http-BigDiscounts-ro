import { Resend } from 'resend'

const getResend = () => new Resend(process.env.RESEND_API_KEY!)

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`

  await getResend().emails.send({
    from: 'BigDiscounts <hello@bigdiscounts.uk>',
    to: email,
    subject: 'Verifică-ți contul BigDiscounts',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 40px; border-radius: 16px;">
        <h1 style="color: #f59e0b; font-size: 28px; margin-bottom: 8px;">🇬🇧 BigDiscounts</h1>
        <h2 style="color: white; margin-bottom: 16px;">Bine ai venit, ${name}!</h2>
        <p style="color: #9ca3af; margin-bottom: 24px;">Te rugăm să-ți verifici adresa de email pentru a-ți activa contul.</p>
        <a href="${verifyUrl}" style="background: #f59e0b; color: black; padding: 14px 32px; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 16px;">
          Verifică Adresa de Email
        </a>
        <p style="color: #6b7280; margin-top: 24px; font-size: 14px;">Acest link expiră în 24 de ore. Dacă nu ai creat un cont, ignoră acest email.</p>
      </div>
    `
  })
}
