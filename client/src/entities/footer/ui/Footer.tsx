import { useEffect, useState } from "react";
import { Link } from '@chakra-ui/next-js';
import Image from "next/image";
import { Box, chakra, Container, Flex, Text } from "@chakra-ui/react";

import { getFooter } from "../api";
import { FooterResponse } from "../model";
import { SubscribeToNewsletter } from "@/features";
import { ApiResponse, isEmptyArray, isNotVoid, isVoid } from "@/shared";

export const Footer: React.FC = () => {
  const [footer, setFooterData] = useState<ApiResponse<FooterResponse, null> | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFooter().then((data) => {
      setFooterData(data);
      setLoading(false);
    })
  }, [])

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
          {isLoading || isVoid(footer?.data) ? (
            <Text>Loading footer...</Text>
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
                <Flex flexDir="column">
                  <Flex flexDir="column" gap={2}>
                    <chakra.span fontSize="sm" color="#A6A6A6">По всем вопросам</chakra.span>
                    <Flex color="white" fontSize="md" gap={4}>
                      <Link href={`tel:${footer?.data.phone}`} _hover={{ color: "brand.200" }}>
                        <Text>{footer?.data.phone}</Text>
                      </Link>
                      <Link href={`mailto:${footer?.data.email}`} _hover={{ color: "brand.200" }}>
                        <Text>{footer?.data.email}</Text>
                      </Link>
                    </Flex>
                  </Flex>
                  {isNotVoid(footer?.data.locations) && !isEmptyArray(footer.data.locations) && (
                    footer?.data.locations?.map((location) => (
                      <Flex key={location.id} flexDir="column" gap={1} mt={2}>
                        <chakra.span fontSize="sm" color="#A6A6A6">{location.name}</chakra.span>
                        <Link href={location.link} referrerPolicy="no-referrer" target="_blank">
                          <Text color="white" _hover={{ color: "brand.200" }}>{location.address}</Text>
                        </Link>
                      </Flex>
                    ))
                  )}
                </Flex>
              </Flex>
              <Flex flexDir="column" gap={2} justifyContent={["flex-start", "flex-start", "flex-end", "flex-end", "flex-end"]}>
                <chakra.span fontSize="sm" color="#A6A6A6" textAlign={["left", "left", "right", "right", "right"]}>Социальные сети</chakra.span>
                <Flex gap={4} justifyContent={["flex-start", "flex-start", "flex-end", "flex-end", "flex-end"]}>
                {isNotVoid(footer?.data.socials) && !isEmptyArray(footer.data.socials) && (
                    footer?.data.socials.map((social) => (
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
            <Link href="" referrerPolicy="no-referrer" target="_blank">
              <Text fontSize="sm" textDecoration="underline">Политика конфиденциальности</Text>
            </Link>
          </Flex>
        </Container>
    </chakra.footer>
  )
}