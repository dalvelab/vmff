import Image from "next/image"
import Link from "next/link"
import { Button, Container, Flex, chakra } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import type { Slider } from "@/entities";
import { isVoid, isEmptyArray } from "@/shared";

import { SlideContent } from './components';

import 'swiper/css';
import "swiper/css/pagination";

interface AfishaSliderWidgetProps {
  slider: Slider;
}

export const AfishaSliderWidget: React.FC<AfishaSliderWidgetProps> = ({ slider }) => {
  const slides = slider.slides;
  
  function handleYandexWidget(id: string) {
    // @ts-ignore
    window['YandexTicketsDealer'].push(['getDealer', function(dealer) { dealer.open({ id, type: 'session' }) }])
  }

  if (isVoid(slides) || isEmptyArray(slides)) {
    return <h1>NO DATA</h1>
  }

  const pagination = {
    clickable: true,
  };

  const height = '100vh';

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
    {slides.map((slide) => {
      const { event, title, location, tickets } = slide;
      const { id, slug, image } = event;
      
      return (
        <SwiperSlide key={slide.id}>
          <chakra.div 
            w="full"
            h={height}
            >
            <Container 
              maxWidth="container.xl" 
              h="100%" 
              display="flex" 
              alignItems="center" 
              zIndex={1} 
              pos="relative"
              >
              <SlideContent event={event} location={location} tickets={tickets}>
                <Flex gap={5}>
                    <Button 
                      size={["md", "md", "lg", "lg", "lg"]}
                      bgColor="brand.200" 
                      color="white"
                      _hover={{ bgColor: "brand.200" }}
                      onClick={() => handleYandexWidget(tickets.link)}
                      >
                        Купить билет
                    </Button>
                    <Link href={`/afisha/${id}-${slug}`}>
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
              </SlideContent>
            </Container>
            <chakra.div 
              w="full" 
              h={height} 
              pos="absolute" 
              left={0} 
              top={0} 
              bg="black"
              opacity={0.6} 
            />
            <chakra.div 
              w="full" 
              h={height} 
              pos="absolute" 
              left={0} 
              top={0} 
              zIndex='-1'
              >
                <Image 
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`}
                  alt={title}
                  fill
                  style={{ objectFit: "cover", border: "none" }}
                  priority={true}
                />
            </chakra.div>
          </chakra.div>
        </SwiperSlide>
      )
    })}
  </Swiper>
  )
}