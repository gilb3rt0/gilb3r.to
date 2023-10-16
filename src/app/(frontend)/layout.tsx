import './globals.css'
import { Gloock } from 'next/font/google'

const gloock = Gloock({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  display: 'swap',
  variable: '--gloock',
})
export const metadata = {
  title: 'Gilberto Mascarenhas | Web Developer',
  description: 'Gilberto Mascarenhas is a web developer based in Berlin Germany.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      {/* <head /> */}
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <link rel='icon' href='/img/favicon.ico' />
      </head>
      <body className={`${gloock.variable}`}>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        {children}
      </body>
    </html>
  )
}
