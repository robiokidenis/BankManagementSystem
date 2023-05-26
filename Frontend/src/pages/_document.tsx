import { initDrawers } from 'flowbite'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  initDrawers
  return (
    <Html lang="en">
      <Head />
      <body className='bg-gray-50 dark:bg-gray-800 '>
      
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
