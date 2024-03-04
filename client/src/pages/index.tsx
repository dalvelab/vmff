import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from "next/head";
import { chakra } from '@chakra-ui/react';

import { getAfisha, getFooter, getSlider } from '@/entities';
import type { Afisha, Slider, Footer } from '@/entities';
import type { ApiResponse, Meta } from '@/shared';
import { AfishaWidget } from '@/widgets';

export default function Home({ afisha, slider }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Музыкальные сезоны и фестивали</title>
        <meta name="description" content="Музыкальные сезоны и фестивали" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.main>
        <AfishaWidget slider={slider.data} />
      </chakra.main>
    </>
  );
}

interface HomeProps {
  afisha: ApiResponse<Afisha[], Meta>
  slider: ApiResponse<Slider, null>
  footer: ApiResponse<Footer, null>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const afisha = await getAfisha({ limit: 100 });
  const slider = await getSlider();
  const footer = await getFooter();

  return {
    props: { afisha, slider, footer }
  }
};