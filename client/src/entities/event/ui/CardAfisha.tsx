import Image from 'next/image';
import Link from 'next/link';
import { chakra, Button, Flex, Text, Heading, Tag } from '@chakra-ui/react';

import type { Event, Ticket } from '../model';

import { Location, LocationText, getformatDateLocale, getGenetiveRusMonth, getformatDateLocaleTime, shortRusDayNames } from '@/shared';

interface CardAfishaProps {
  event: Event
  location: Location | null;
  tickets: Ticket;
}

export const CardAfisha: React.FC<CardAfishaProps> = ({event, location, tickets}) => {
  const { date, link } = tickets;

  const formattedDate = getformatDateLocale(date);
  const day = Number(formattedDate.split('.')[0]);
  const monthIndex = Number(formattedDate.split('.')[1]);
  const month = getGenetiveRusMonth(monthIndex);
  const time = getformatDateLocaleTime(date);
  const dayOfWeek = shortRusDayNames[new Date(date).getDay()];

  function handleYandexWidget(id: string) {
    // @ts-ignore
    window['YandexTicketsDealer'].push(['getDealer', function(dealer) { dealer.open({ id, type: 'session' }) }])
  }

  return (
    <Flex 
      key={event.id}
      alignItems="center" 
      border="1px solid" 
      borderColor="brand.300" 
      borderRadius={4} 
      padding={["12px 12px", "16px 16px", "30px 16px", "40px 24px", "40px 24px"]}
      gap={[4, 4, 8, 10, 12]}
      flexDir={["column-reverse", "column-reverse", "row", "row", "row"]}
      >
      <Flex
        w="full"
        flexDir={["column", "column", "column", "column", "row"]}
        justifyContent="space-between"
        gap={2}
      >
        <Flex 
          flexDir={["row", "row", "column", "column", "column"]}
          color="brand.100" 
          fontSize={["lg", "lg", "xl", "2xl", "3xl"]} 
          fontWeight={["regular", "regular", "medium", "medium", "medium"]} 
          gap={[1, 1, 0, 0, 2]} 
          alignItems={["flex-end", "flex-end", "flex-start", "flex-start", "flex-start"]}
        >
          <Text 
            pos="relative" 
            _after={{
              content: `'${dayOfWeek}'`, 
              fontSize: "md", 
              position: "absolute", 
              top: "0", 
              left: "calc(100% + 8px)",
              display: ["none", "none", "block", "block", "block",],
            }}
            >
              {day} {month}
          </Text>
          <chakra.span display={["block", "block", "none"]}> - </chakra.span>
          <Text>{time}</Text>
          <chakra.div display={["none", "none", "none", "none", "block"]}>
            <LocationText location={location} />
          </chakra.div>
        </Flex>
        <Flex flexDir="column" gap={3}>
          <Heading 
            as="h3" 
            fontSize={["xl", "2xl", "3xl", "4xl", "4xl"]}
          >
            {event.title}
          </Heading>
            <Flex alignItems="center" gap={3}>
              <Text>{event.small_description}</Text>
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
            </Flex>
          <chakra.div display={["block", "block", "block", "block", "none"]}>
            <LocationText location={location} />
          </chakra.div>
          <Flex 
            mt={2}
            gap={[3, 3, 5, 5, 5]} 
            alignItems="flex-start"
            >
              <Button 
                size={["md", "md", "lg", "lg", "lg"]}
                bgColor="brand.200" 
                color="white"
                _hover={{ bgColor: "brand.200" }} 
                onClick={() => handleYandexWidget(link)}
                >
                  Купить билет
              </Button>
              <Link href={`/afisha/${event.id}-${event.slug}`}>
                <Button 
                  size={["md", "md", "lg", "lg", "lg"]}
                  bgColor="transparent"
                  border="1px solid"
                  borderColor="brand.200"
                  color="brand.200"
                  _hover={{ bgColor: "brand.200", color: "white" }} 
                  >
                    Подробнее
                  </Button>
              </Link>
          </Flex>
        </Flex>
      </Flex>
      <chakra.div 
        maxW={["full", "full", "336px", "420px", "336px"]}
        h={["240px", "320px", "236px", "280px", "236px"]} 
        w="full" 
        pos="relative"
      >
        <Image fill src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${event.image.url}`} alt={event.title} />
      </chakra.div>
    </Flex>
  )
}