/* eslint-disable @next/next/no-img-element */
import type { AppProps } from "next/app";
import Head from 'next/head';
import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar, SubscriptionModal } from "@/widgets";
import { Footer } from "@/entities";
import { chakraVMFFConfig, YAScript, YandexMetrika} from '@/shared';

import '../shared/styles.css';

const theme = extendTheme({ ...chakraVMFFConfig })
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps ) {
  return (
    <>
    <Head>
      <title>Музыкальные сезоны и фестивали</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Музыкальные сезоны и фестивали" />
      <link rel="icon" href="/favicon.png" />
      <meta name="color-scheme" content="light only" />
      {process.env.NEXT_PUBLIC_METRIKA === 'production' && (
          <noscript>
            <div>
              <img src="https://mc.yandex.ru/watch/96717190" style={{ position: "absolute", left: "-9999px" }} alt="" />
            </div>
          </noscript>
        )}
    </Head>
    <YAScript />
    <YandexMetrika />
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SubscriptionModal />
        <Navbar />
        <chakra.main mt={16}>
          <Component {...pageProps} />
        </chakra.main>
        <Footer />
      </ChakraProvider>
    </QueryClientProvider>
  </>
  )
}