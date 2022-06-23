import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'
import { Children } from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: Children.toArray(initialProps.styles)
    }
  }
  render() {
    return (
      <Html lang="ko" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#3B82F6" />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <meta name="msapplication-TileColor" content="#3B82F6" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
