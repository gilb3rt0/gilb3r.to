import nodemailer from 'nodemailer'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
})

export async function POST(req: Request, res: Response) {
  const { name, email, subject, message } = await req.json()

  const validInput = schema.safeParse({ name, email, message, subject })

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

//   return new Response('OK', { status: 200 })

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
      console.error(err)
      return new Response('Error sending email', { status: 500 })
    })
    .then(() => {
      console.log('Email sent')
      return new Response('OK', { status: 200 })
    })
}
