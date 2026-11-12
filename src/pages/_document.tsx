import { Html, Head, Main, NextScript } from 'next/document'
import { defaultCss, preloadScript } from '@/lib/palettes'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style dangerouslySetInnerHTML={{ __html: defaultCss() }} />
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
