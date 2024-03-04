import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from "next/head";
import { Heading, Container, chakra, Flex, Grid, Text } from '@chakra-ui/react';

import { CardAfisha, getAfisha, getSlider } from '@/entities';
import type { Afisha, Slider } from '@/entities';
import { isVoid, type ApiResponse, type Meta, isNotVoid } from '@/shared';
import { AfishaWidget } from '@/widgets';
import { AboutSectionResponse, getAbout } from '@/entities/about';
import Image from 'next/image';

export default function Home({ afisha, slider, about }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Музыкальные сезоны и фестивали</title>
        <meta name="description" content="Музыкальные сезоны и фестивали" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AfishaWidget slider={slider.data} />
      <chakra.section pt={10} pb={10} id="afisha">
        <Container 
          maxWidth="container.xl" 
          h="100%" 
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Heading as="h2" fontSize={["4xl", "4xl", "5xl", "6xl", "7xl"]}>Афиша</Heading>
          <Flex mt={[5, 10, 10, 10, 10]} flexDir="column" gap={5}>
            {afisha.data.map(({event, tickets, location}) => {

            if (isVoid(event) || isVoid(tickets)) {
              return;
            }

            return (
              <CardAfisha key={event.id} event={event} location={location} />
            )
              })}
            </Flex>
        </Container>
      </chakra.section>
      <chakra.section pt={[5, 10, 10, 10, 10]} pb={10} id="about">
        <Container 
          maxWidth="container.xl" 
          h="100%" 
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Heading 
            as="h2" 
            textAlign={["left", "left", "left", "right", "right"]} 
            fontSize={["4xl", "4xl", "5xl", "6xl", "7xl"]}
          >
            Что такое pop-up <br /> концерты
          </Heading>
          <Flex 
            justifyContent="space-between"
            flexDir={["column-reverse", "column-reverse", "column-reverse", "row", "row"]}
            gap={6}
          >
          <Flex flexDir="column" alignItems="flex-start" gap={[2, 2, 3, 3, 3]}>
            <Grid 
              templateColumns={["1fr 1.5fr", "1fr 1.5fr", "1fr 1.5fr", "1fr 1.5fr", "330px 430px"]} 
              gap={[2, 2, 3, 3, 3]}
            >
              <Flex flexDir="column" pos="relative" gap={[2, 2, 3, 3, 3]}>  
                {about.data.images.slice(0, 2).map((image) => (
                    <Image key={image.id} width={330} height={315} src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`} alt="Изображение галереи" />
                ))}
              </Flex>
              <chakra.div maxW={["full", "full", "full", "full", "430px"]} pos="relative">
                {isNotVoid(about.data.images[2]) && (
                  <Image fill src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${about.data.images[2].url}`} alt="Изображение галереи" />
                )}
              </chakra.div>
            </Grid>
            <chakra.div w="full" h={["240px", "400px", "520px", "430px", "430px"]} pos="relative">
              {isNotVoid(about.data.images[3]) && (
                <Image fill src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${about.data.images[3].url}`} alt="Изображение галереи" />
              )}
            </chakra.div>
            </Flex>
            <Flex pt={[6, 6, 6, 10, 10]} maxW={["full", "full", "full", "400px", "460px"]}>
              <Text fontSize="xl" textAlign="justify">{about.data.description}</Text>
            </Flex>
          </Flex>
        </Container>
      </chakra.section>
    </>
  );
}

interface HomeProps {
  afisha: ApiResponse<Afisha[], Meta>
  slider: ApiResponse<Slider, null>
  about: ApiResponse<AboutSectionResponse, null>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const afisha = await getAfisha({ limit: 100 });
  const slider = await getSlider();
  const about = await getAbout();

  return {
    props: { afisha, slider, about }
  }
};