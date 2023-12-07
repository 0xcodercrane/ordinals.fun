import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='description' content='Ordinal audio inscriptions.' />
        <meta
          name='keywords'
          content='bitBitmap, audio, inscription, bitcoin, brc20, nft, bitmap, Bitmap'
        />
        <meta property='og:title' content={`BitBitmap`} />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content={`BitBitmap inscription platform. Audio inscription per block.`}
        />
        <meta property='og:url' content={`https://bitBitmap.netlify.app/`} />
        <meta property='og:site_name' content='BitBitmap'></meta>
        <meta
          property='og:image'
          content='https://bitBitmap.netlify.app/metaImage.jpg'
        ></meta>
        <meta property='og:image:type' content='image/jpg'></meta>
        <meta property='og:image:width' content='2000'></meta>
        <meta property='og:image:height' content='2000'></meta>
        <meta property='og:image:alt' content='dashboard'></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
