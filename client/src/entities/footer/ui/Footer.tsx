import { Link } from '@chakra-ui/next-js';
import Image from "next/image";
import { Box, chakra, Container, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { getFooter } from "../api";
import { SubscribeToNewsletter } from "@/features";
import { isEmptyArray, isNotVoid, isVoid } from "@/shared";

export const Footer: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['footer'],
    queryFn: getFooter,
  })

  return (
    <chakra.footer bgColor="brand.100" id="contacts">
      <Container 
        maxWidth="container.xl" 
        h="100%" 
        display="flex"
        flexDir="column"
        pos="relative"
        >
          <Flex 
            color="white" 
            pt={10} 
            pb={10} 
            justify="space-between" 
            alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]} 
            borderBottom="1px solid #A6A6A6"
            flexDir={["column", "column", "column", "row", "row"]}
            gap={5}
          >
            <SubscribeToNewsletter />
          </Flex>
          {isLoading || isVoid(data?.data) ? (
            <Text color="white">Loading footer...</Text>
          ) : (
            <Flex 
              pt={10} 
              justifyContent="space-between" 
              flexDir={["column", "column", "row", "row", "row"]}
              gap={6}
            >
              <Flex gap={[5, 5, 10, 10, 10]} flexDir={["column", "column", "row", "row", "row"]}>
                <chakra.div w="100px" h="80px" pos="relative">
                  <Image fill src="/logo-footer.png" alt="Логотип подвал" />
                </chakra.div>
                <Flex flexDir={["column", "column", "column", "row", "row"]} gap={[5, 5, 5, 10, 10]}>
                  <Flex flexDir="column" gap={2}>
                    <chakra.span fontSize="sm" color="#A6A6A6">По всем вопросам</chakra.span>
                    <Flex color="white" fontSize="md" gap={4} flexDir="column">
                      <Link href={`tel:${data?.data.phone}`} _hover={{ color: "brand.200" }}>
                        <Text>{data?.data.phone}</Text>
                      </Link>
                      <Link href={`mailto:${data?.data.email}`} _hover={{ color: "brand.200" }}>
                        <Text>{data?.data.email}</Text>
                      </Link>
                    </Flex>
                  </Flex>
                  <Flex flexDir="column" gap={4}>
                    {isNotVoid(data?.data.locations) && !isEmptyArray(data.data.locations) && (
                      data?.data.locations?.map((location) => (
                        <Flex key={location.id} flexDir="column" gap={2}>
                          <chakra.span fontSize="sm" color="#A6A6A6">{location.name}</chakra.span>
                          <Link href={location.link} referrerPolicy="no-referrer" target="_blank">
                            <Text color="white" _hover={{ color: "brand.200" }}>{location.address}</Text>
                          </Link>
                        </Flex>
                      ))
                    )}
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" gap={4} justifyContent="flex-start">
                <chakra.span fontSize="sm" color="#A6A6A6" textAlign={["left", "left", "right", "right", "right"]}>Социальные сети</chakra.span>
                <Flex gap={4} justifyContent={["flex-start", "flex-start", "flex-end", "flex-end", "flex-end"]}>
                {isNotVoid(data?.data.socials) && !isEmptyArray(data.data.socials) && (
                    data?.data.socials.map((social) => (
                      <Link key={social.id} href={social.link} referrerPolicy="no-referrer" target="_blank">
                        <Box 
                          display="flex" 
                          justifyContent="center" 
                          alignItems="center" 
                          w='48px' 
                          h='48px'
                          borderRadius="full" 
                          bgColor="white" 
                          color="white"
                          pos="relative"
                          >
                          <Image width={30} height={30} src={`/${social.type}-icon.svg`} alt={`иконка ${social.type}`} />
                        </Box>
                      </Link>
                    ))
                  )}
                </Flex>
              </Flex>
            </Flex>
          )}
          <Flex 
            pt={10}
            pb={2}
            color="#A6A6A6" 
            justifyContent="space-between" 
            flexDirection={["column-reverse", "column-reverse", "row", "row", "row"]} 
            gap={[4, 4, 4, null, null]}
          >
            <Text fontSize="sm">ООО «Венский фестиваль», 2024</Text>
            <Link href={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}/uploads/Politika_konfidenczialnosti_85f748c0c5.pdf`} referrerPolicy="no-referrer" target="_blank">
              <Text fontSize="sm" textDecoration="underline">Политика конфиденциальности</Text>
            </Link>
          </Flex>
        </Container>
    </chakra.footer>
  )
}