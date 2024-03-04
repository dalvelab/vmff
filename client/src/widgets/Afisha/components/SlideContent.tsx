import { Flex, Text, Heading } from "@chakra-ui/react";

import type { Event } from "@/entities"
import { Location, isNotVoid } from "@/shared";
import Image from "next/image";

interface SlideContentProps {
  event: Event;
  children: React.ReactNode;
  location: Location | null;
}

export const SlideContent: React.FC<SlideContentProps> = ({event, children, location}) => {
  const { title, small_description } = event;

  return (
    <Flex maxW="container.md" flexDir="column" gap={5} mt="100px">
      <Text color="white" fontSize={["xl", "2xl", "4xl"]} lineHeight="short">
        21 марта <br />
        19:00
      </Text>
      <Heading textTransform="uppercase" as="h1" fontSize={["xl", "3xl", "5xl"]} lineHeight="shorter" color="white" fontWeight="medium">
        {title}
      </Heading>
      {isNotVoid(location) && (
        <Flex gap={2}>
          <Image width={24} height={24} src="/location-icon.svg" alt="location pin icon" />
          <Text color="white">{location.name}</Text>
        </Flex>
      )}
      <Text color="white" fontSize={["md", "xl"]} lineHeight="short">
        {small_description}
      </Text>
      {children}
    </Flex>
  )
}