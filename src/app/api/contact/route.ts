import { ContactProps, contactSchema } from '@/components/canvas/Folio/Contact/Contact'
import nodemailer from 'nodemailer'

export async function POST(req: Request, res: Response) {
  const { name, email, subject, message }: ContactProps = await req.json()

  const validInput = contactSchema.safeParse({ name, email, message, subject })

  if (!validInput.success) {
    return new Response('Invalid input', { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PW,
    },
  })

  const mailData = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: `Contact from ${name} | ${subject}`,
    replyTo: email,
    text: message,
  }

  await transporter
    .sendMail(mailData)
    .catch((err) => {
      return new Response(err, { status: 500 })
    })
    .then((success) => {
      return new Response(success, { status: 200 })
    })
}
