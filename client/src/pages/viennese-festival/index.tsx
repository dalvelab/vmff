import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Container, Flex, Grid, Heading } from '@chakra-ui/react';

import { getVienneseFestival } from '@/entities';
import type { VienneseFestivalResponse } from '@/entities';
import { SEO, isNotVoid, isEmptyArray } from '@/shared';
import type { ApiResponse } from '@/shared';

import styles from './styles.module.css';
import { SwipeGallery } from '@/widgets';

export default function VienneseFestival({ vienneseFestival } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { title, banner, description, galleries, subtitle, image_about } = vienneseFestival.data;

  return (
    <>
      <SEO>
        <title>История Венского фестиваля</title>
        <meta name="description" content="История венского фестиваля. Как это было." />
        <meta property="og:title" content="История Венского фестиваля" />
        <meta property="og:description" content="История венского фестиваля. Как это было." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.url}`} />
      </SEO>
      <chakra.section pt={[5, 10, 10, 10, 10]}>
        <Container 
          maxWidth="container.xl" 
          h="100%" 
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" w={["100%", "100%", "70%", "70%", "70%"]} fontSize={["3xl", "4xl", "5xl", "5xl", "6xl"]}>{title}</Heading>
          <Flex mt={[5, 10, 10, 10, 10]} flexDir="column" alignItems="center">
            <chakra.div width="full" pt={["65%", "65%", "50%", "50%", "50%"]} pos="relative">
              <Image style={{objectFit: "cover"}} fill src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.url}`} alt="Открытие венского фестиваля" />
            </chakra.div>
            <chakra.small mt={1} textAlign="center" fontSize="sm">{banner.caption}</chakra.small>
          </Flex>
          <chakra.section pt={[5, 10, 10, 10, 10]} pb={[5, 10, 10, 10, 10]}>
            <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 1fr", "1fr 1fr"]} gap={[2, 5, 5, 10, 10]}>
              <Flex flexDir="column" gap={5}>
                <Heading as="h2" color="brand.200" fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]}>
                  {subtitle}
                </Heading>
                <chakra.div w="full" pt="65%" pos="relative">
                  {isNotVoid(image_about) && (
                    <Image style={{objectFit: "cover"}} fill src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image_about.url}`} alt="Открытие венского фестиваля" />
                  )}
                </chakra.div>
              </Flex>
              <chakra.div mt={[2, 2, 0, 0, 0]} fontSize={["md", "lg", "lg", "lg", "lg"]}>
                <ReactMarkdown className={styles.description}>
                  {description}
                </ReactMarkdown>
              </chakra.div>
            </Grid>
          </chakra.section>
          <chakra.section pb={10}>
            <Heading fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]} color="brand.200">Смотри музыку</Heading>
            {isNotVoid(galleries) && !isEmptyArray(galleries) && (
              <SwipeGallery data={galleries} />
            )}
          </chakra.section>
        </Container>
      </chakra.section>
    </>
  )
}

interface IProps {
  vienneseFestival: ApiResponse<VienneseFestivalResponse, null>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const vienneseFestival = await getVienneseFestival()

  return {
    props: { vienneseFestival }
  }
};