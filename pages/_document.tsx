import { FunctionComponent, } from 'react'
import { Head, Html, Main, NextScript, } from 'next/document'

const Document: FunctionComponent = () => {
  return (
    <Html>
      <Head>
        <meta charSet={'UTF-8'} />
        {/*<meta name={'description'} content={'Silly game in which you have to use colors to win.'} />
        <meta name={'keywords'} content={'typescript'} />*/}
        <meta name={'author'} content={'Diego Rodríguez'} />
        <meta name={'copyright'} content={'Diego Rodríguez'} />

        <link rel={'shortcut icon'} href={'/favicon.ico'} type={'image/x-icon'} />

        <link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
        <link rel={'preconnect'} href={'https://fonts.gstatic.com'} />
        <link href={'https://fonts.googleapis.com/css2?family=Open+Sanswght@400;500&display=swap'} rel={'stylesheet'} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document