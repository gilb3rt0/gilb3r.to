import './global.scss'

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
        <link rel='icon' href='/img/favicon.ico' />
      </head>
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        {children}
      </body>
    </html>
  )
}
