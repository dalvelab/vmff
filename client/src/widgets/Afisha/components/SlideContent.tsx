import { Flex, Text, Heading, Tag } from "@chakra-ui/react";

import type { Event, Ticket } from "@/entities"
import { getformatDateLocale, getformatDateLocaleTime, getGenetiveRusMonth, Location, LocationText } from "@/shared";

interface SlideContentProps {
  event: Event;
  children: React.ReactNode;
  location: Location | null;
  tickets: Ticket;
}

export const SlideContent: React.FC<SlideContentProps> = ({ event, children, location, tickets }) => {
  const { title, small_description, age_limit } = event;
  const { date } = tickets;

  const formattedDate = getformatDateLocale(date);
  const day = Number(formattedDate.split('.')[0]);
  const monthIndex = Number(formattedDate.split('.')[1]);
  const month = getGenetiveRusMonth(monthIndex);
  const time = getformatDateLocaleTime(date);

  return (
    <Flex maxW="container.md" flexDir="column" gap={[3, 4, 5, 5, 5]} mt="100px">
      <Flex 
        flexDir="column"
        color="white" 
        fontSize={["2xl", "2xl", "2xl", "2xl", "4xl"]}>
        <Text>
          {day} {month}
        </Text>
        <Text>{time}</Text>
      </Flex>
      <Heading 
        textTransform="uppercase" 
        as="h1" 
        fontSize={["3xl", "3xl", "3xl", "3xl", "5xl"]} 
        lineHeight="shorter" 
        color="white" 
        fontWeight="bold"
      >
        {title}       
      </Heading>
      <LocationText location={location} type="light" />
      <Flex alignItems="center" gap={3}>
        <Text color="white" fontSize={["md", "xl"]}>{small_description}</Text>
        <Tag 
          p={1.5} 
          alignSelf="flex-start" 
          size="lg"
          variant='solid' 
          bg="transparent" 
          border="1px solid" 
          borderColor="brand.300"
          fontSize="x-small"
          justifyContent="center"
          fontWeight={400}
        >
          {age_limit}+
        </Tag>
      </Flex>
      {children}
    </Flex>
  )
}