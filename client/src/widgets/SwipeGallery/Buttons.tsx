import { chakra } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useSwiper } from "swiper/react"

export const Buttons = () => {
  const swiper = useSwiper();
  
  return (
    <>
      <chakra.button
        onClick={() => swiper.slidePrev()}
        w={["36px", "52px", "52px", "52px", "52px"]}
        h={["36px", "52px", "52px", "52px", "52px"]}
        borderRadius="12px"
        bgColor="brand.100"
        color="white"
        pos="absolute"
        top="50%"
        left={[1, 2, 2, 4, 4]}
        transform="auto"
        translateY="-50%"
        zIndex={2}
        display={["none", "flex", "flex", "flex", "flex"]}
        justifyContent="center"
        alignItems="center"
      >
        <ChevronLeftIcon fontSize={["xl", "3xl", "3xl", "3xl", "3xl"]} />
      </chakra.button>
      <chakra.button
        w={["36px", "52px", "52px", "52px", "52px"]}
        h={["36px", "52px", "52px", "52px", "52px"]}
        borderRadius="12px"
        bgColor="brand.100"
        color="white"
        pos="absolute"
        top="50%"
        right={[1, 2, 2, 4, 4]}
        transform="auto"
        translateY="-50%"
        zIndex={2}
        onClick={() => swiper.slideNext()}
        display={["none", "flex", "flex", "flex", "flex"]}
        justifyContent="center"
        alignItems="center"
      >
        <ChevronRightIcon fontSize={["xl", "3xl", "3xl", "3xl", "3xl"]} />
      </chakra.button>
    </>
  )
}