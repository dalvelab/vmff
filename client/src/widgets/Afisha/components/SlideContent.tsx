import { Flex, Text, Heading, Tag } from "@chakra-ui/react";

import type { Event } from "@/entities"
import { Location, LocationText } from "@/shared";

interface SlideContentProps {
  event: Event;
  children: React.ReactNode;
  location: Location | null;
}

export const SlideContent: React.FC<SlideContentProps> = ({event, children, location}) => {
  const { title, small_description, age_limit } = event;

  return (
    <Flex maxW="container.md" flexDir="column" gap={[3, 4, 5, 5, 5]} mt="100px">
      <Flex 
        flexDir="column"
        color="white" 
        fontSize={["2xl", "2xl", "2xl", "2xl", "4xl"]}>
        <Text>
          21 марта
        </Text>
        <Text>19:00</Text>
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