import nodemailer from 'nodemailer'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Too short' }).max(50, { message: 'Too long' }),
  subject: z.string().min(2, { message: 'Too short' }).max(50, { message: 'Too long' }),
  email: z.string().email({ message: 'Invalid email' }),
  message: z.string().min(2, { message: 'Too short' }).max(500, { message: 'Too long' }),
})
type ContactProps = z.infer<typeof contactSchema>

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

  return new Response('Success', { status: 200 })
}
