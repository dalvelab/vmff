import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";

import { Location, isVoid } from "@/shared"

interface LocationTextProps {
  location: Location | null;
  type?: 'dark' | 'light';
}

export const LocationText:React.FC<LocationTextProps> = ({location, type = 'dark'}) => {
  if (isVoid(location)) {
    return null;
  }

  return (
    <Flex gap={2} alignItems="flex-start">
      <Image width={24} height={24} src="/location-icon.svg" alt='location icon'></Image>
      <Text fontSize="sm" color={type === 'dark' ? 'brand.100' : 'white'} fontWeight={400}>{location.name}</Text>
    </Flex>
  )
} 