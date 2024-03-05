import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from "next/head";
import { Heading, Container, chakra, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { AfishaFilters } from '@/features';
import { CardAfisha, getAfisha, getFilteredAfisha } from '@/entities';
import type { Afisha, Filter } from '@/entities';
import { isVoid, getformatDateLocale, type ApiResponse, type Meta } from '@/shared';

const defaultFilter: Filter = {
  month: 'all',
  location: 'all'
}

export default function Afisha({ afisha }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filter, setFilter] = useState(defaultFilter);

  const ticketMonths = afisha.data
    .map((event) => getformatDateLocale(event.tickets.date).toString().substring(3, 5));
  
  const uniqueTicketMonths = new Set<string>();

  ticketMonths.map((ticket) => uniqueTicketMonths.add(ticket));

  const data = getFilteredAfisha(afisha.data, filter);

  return (
    <>
      <Head>
        <title>Афиша | Музыкальные сезоны и фестивали</title>
        <meta name="description" content="Музыкальные сезоны и фестивали" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.section pt={10} pb={10} id="afisha" scrollMarginTop={20}>
        <Container 
          maxWidth="container.xl" 
          h="100%" 
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Heading as="h2" fontSize={["4xl", "4xl", "5xl", "6xl", "6xl"]}>Все мероприятия</Heading>
          <AfishaFilters data={data} months={uniqueTicketMonths} filter={filter} setFilter={setFilter} />
          <Flex mt={[5, 10, 10, 10, 10]} flexDir="column" gap={5}>
            {data.map(({id, event, tickets, location}) => {
              if (isVoid(event) || isVoid(tickets)) {
                return;
              }

              return (
                <CardAfisha key={id} event={event} location={location} tickets={tickets} />
              )
            })}
          </Flex>
        </Container>
      </chakra.section>
    </>
  );
}

interface HomeProps {
  afisha: ApiResponse<Afisha[], Meta>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const afisha = await getAfisha({ limit: 100 });

  return {
    props: { afisha }
  }
};