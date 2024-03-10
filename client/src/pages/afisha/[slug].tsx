import Image from 'next/image';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Button, chakra, Container, Flex, Heading, Tag, Text } from '@chakra-ui/react';

import { Afisha, getSingleAfisha } from '@/entities';
import { SEO, LocationText, isVoid, getGenetiveRusMonth, Markdown, getformatDateLocaleTime, getformatDateLocale } from '@/shared';
import type { ApiResponse } from '@/shared';

export default function AfishaDetails({ afisha } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { event, tickets, location } = afisha.data;

  function handleYandexWidget(id: string) {
    // @ts-ignore
    window['YandexTicketsDealer'].push(['getDealer', function(dealer) { dealer.open({ id, type: 'session' }) }])
  }

  if (isVoid(event) || isVoid(tickets)) {
    return;
  }

  const { title, small_description, description, image } = event;
  const { date, link } = tickets;

  const formattedDate = getformatDateLocale(date);
  const day = Number(formattedDate.split('.')[0]);
  const monthIndex = Number(formattedDate.split('.')[1]);
  const month = getGenetiveRusMonth(monthIndex);
  const time = getformatDateLocaleTime(date);

  return (
    <>
      <SEO>
        <title>{`${title} - | Музыкальные сезоны и фестивали`}</title>
        <meta name="description" content={small_description} />
        <meta property="og:title" content={`${title} - | Музыкальные сезоны и фестивали`} />
        <meta property="og:description" content={small_description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`} />
      </SEO>
      <chakra.section pt={10}>
        <Container 
          maxWidth="container.xl" 
          h="100%" 
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Flex 
            gap={[5, 5, 10, 10, 10]} 
            alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]}
            flexDir={["column", "column", "column", "row", "row"]}
          >
            <chakra.div 
              pos="relative" 
              maxW={["100%", "100%", "520px", "500px", "600px"]} 
              minW={["100%", "100%", "520px", "500px", "600px"]} 
              w="100%" 
              h={["300px", "400px", "380px", "360px", "400px"]}
            >
              <Image style={{objectFit: 'cover'}} fill src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`} alt={title} />
            </chakra.div>
            <Flex flexDirection="column" alignItems="flex-start">
              <Flex
                flexDir="column"
                color="brand.100" 
                fontSize="2xl"
                gap={3}
              >
                <Tag
                    p={1} 
                    alignSelf="flex-start" 
                    size="lg" 
                    variant='solid' 
                    color="brand.300" 
                    bg="transparent" 
                    border="1px solid" 
                    borderColor="brand.300"
                    fontSize="x-small"
                    justifyContent="center"
                    fontWeight={400}
                  >
                    {event.age_limit}+
                </Tag>
                <Text>{day} {month} в {time}</Text>
              </Flex>
              <Heading as="h1">{title}</Heading>
              <chakra.div mt={4}>
                <LocationText location={location} />
              </chakra.div>
              <Button 
                mt={5}
                size={["md", "md", "lg", "lg", "lg"]}
                bgColor="brand.200" 
                color="white"
                _hover={{ bgColor: "brand.200" }} 
                onClick={() => handleYandexWidget(link)}
                >
                  Купить билет
              </Button>
            </Flex>
          </Flex>
          <chakra.div pt={5} pb={10} fontSize="xl">
            <Markdown description={description} />
          </chakra.div>
        </Container>
      </chakra.section>
    </>
  )
}

interface IProps {
  afisha: ApiResponse<Afisha, null>
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ params }) => {
  const afisha = await getSingleAfisha({ id: params?.slug?.toString().split('-')[0] })

  return {
    props: { afisha }
  }
};