import Image from "next/image"
import Link from "next/link"
import { Button, Container, Flex, chakra } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import { isVoid, isEmptyArray } from "@/shared";

// import { SlideContent } from './SlideContent';

import 'swiper/css';
import "swiper/css/pagination";

interface AfishaWidgetProps {
  slider: any;
}

export const AfishaWidget: React.FC<AfishaWidgetProps> = ({ slider }) => {
  const { data } = slider.attributes.slides;

  if (isVoid(data) || isEmptyArray(data)) {
    return <h1>NO DATA</h1>
  }

  const pagination = {
    clickable: true,
  };

  return (
    <Swiper
      slidesPerView={1} 
      loop={true}
      modules={[Autoplay, Pagination]}
      pagination={pagination}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
    {/* {data.map((slide) => {
      const { id } = slide;
      const { title, banner, pushkin_card, slug } = slide.attributes.event.data.attributes;

      const dates = slide.attributes.tickets.map((ticket) => ticket.date);
      const formattedDate = formatAfishaDays(dates);
      
      return (
        <SwiperSlide key={slide.id}>
          <chakra.div 
            w="full"
            h="100vh"
            >
            <Container 
              maxWidth="container.xl" 
              h="100vh" 
              display="flex" 
              alignItems="center" 
              zIndex={1} 
              pos="relative"
              >
              <SlideContent 
                event={slide.attributes.event.data.attributes} 
                formattedDate={formattedDate}>
                <Flex 
                  flexDir={["column", "row", "row", "row", "row"]} 
                  gap={5} 
                  alignItems={["flex-start", "center", "center", "center", "center"]}>
                  <Link href={`/afisha/${id}-${slug}`}>
                    <Button 
                      size="lg" 
                      bgColor="brand.200" 
                      color="white"
                      _hover={{ bgColor: "#4d8a8c" }} 
                      alignSelf="flex-start"
                      >
                        Подробнее
                      </Button>
                  </Link>
                  {pushkin_card && (
                    <Image
                    src='/pushkin-card.png'
                    alt='Пушкинская карта'
                    width={150}
                    height={50}
                  />
                  )}
                </Flex>
              </SlideContent>
            </Container>
            <chakra.div 
              w="full" 
              h="100vh" 
              pos="absolute" 
              left={0} 
              top={0} 
              bg="black"
              opacity={0.6} 
            />
            <chakra.div 
              w="full" 
              h="100vh" 
              pos="absolute" 
              left={0} 
              top={0} 
              zIndex='-1'
              >
                <Image 
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`}
                  alt={title}
                  fill
                  style={{ objectFit: "cover", border: "none" }}
                  priority={true}
                />
            </chakra.div>
          </chakra.div>
        </SwiperSlide>
      )
    })} */}
  </Swiper>
  )
}