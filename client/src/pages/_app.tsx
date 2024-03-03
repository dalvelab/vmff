import type { AppProps } from "next/app";
import Head from 'next/head'
import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react'

import { chakraVMFFConfig } from '@/shared';

const theme = extendTheme({ ...chakraVMFFConfig })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Музыкальные сезоны и фестивали</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Музыкальные сезоны и фестивали" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="color-scheme" content="light only" />
    </Head>
    <ChakraProvider theme={theme}>
      {/* <Navbar /> */}
      <chakra.main>
        <Component {...pageProps} />
      </chakra.main>
      {/* <Footer /> */}
    </ChakraProvider>
  </>
  )
}
