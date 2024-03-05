import type { AppProps } from "next/app";
import Head from 'next/head'
import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react'

import { Navbar } from "@/widgets";
import { Footer } from "@/entities";
import { chakraVMFFConfig, YAScript } from '@/shared';

import '../shared/styles.css';

const theme = extendTheme({ ...chakraVMFFConfig })

export default function App({ Component, pageProps }: AppProps ) {
  return (
    <>
    <Head>
      <title>Музыкальные сезоны и фестивали</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Музыкальные сезоны и фестивали" />
      <link rel="icon" href="/favicon.png" />
      <meta name="color-scheme" content="light only" />
    </Head>
    <YAScript />
    <ChakraProvider theme={theme}>
      <Navbar />
      <chakra.main mt={16}>
        <Component {...pageProps} />
      </chakra.main>
      <Footer />
    </ChakraProvider>
  </>
  )
}