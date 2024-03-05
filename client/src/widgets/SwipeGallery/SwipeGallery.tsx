import Image from "next/image";
import { Flex, Text, chakra } from "@chakra-ui/react";

import type { VienneseFestivalResponse } from '@/entities';
import { Gallery } from "@/shared/components"
import { GalleryModal } from "./GalleryModal";
import { useState } from "react";

interface SwipeGalleryProps {
  data: VienneseFestivalResponse["galleries"];
}

export const SwipeGallery: React.FC<SwipeGalleryProps> = ({ data }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [active, setActive] = useState(0);

  const handleGalleryModalOpen = (id: number) => {
    setActive(id);
    setIsOpened(true);
  }

  const activeGallery = data[active].images;

  return (
    <>
      <GalleryModal 
        isOpened={isOpened} 
        onClose={() => setIsOpened(false)} 
        data={activeGallery} 
      />
      <Gallery length={activeGallery.length}>
        {data.map((gallery, index) => (
          <Flex 
            key={gallery.id} 
            minW={["360px", "460px", "512px", "512px", "512px"]}
            h={["300px", "320px", "360px", "360px", "360px"]}
            pos="relative"
            cursor="pointer"
            justifyContent="center"
            alignItems="center"
            onClick={() => handleGalleryModalOpen(index)}
            >
            <chakra.div zIndex={2}>
              <Text fontSize="4xl" fontWeight="bold" color="white">{gallery.title}</Text>
            </chakra.div>
            <chakra.div w="100%" h="100%" pos="absolute" left={0} top={0} bg="rgba(0, 0, 0, 0.4)" zIndex={1} borderRadius={12} />
          <Image 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${gallery.images[0].url}`}
            alt='Изображение галереи'
            fill
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
        </Flex>
        ))}
      </Gallery>
    </>
  )
}