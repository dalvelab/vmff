import Image from "next/image";
import { Container, chakra, Modal, ModalOverlay, ModalContent, IconButton } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Buttons } from "./Buttons";
import { StrapiImage } from "@/shared";
import { CloseIcon } from "@chakra-ui/icons";

interface GalleryModalProps {
  isOpened: boolean;
  onClose: () => void;
  data: StrapiImage[];
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpened, onClose, data }) => {
  return (
    <Modal 
      autoFocus={false} 
      size="full" 
      isOpen={isOpened} 
      onClose={onClose}>
      <ModalContent
        bgColor="rgba(0, 0, 0, 0.9)"
        display="flex"
        boxShadow="none"
        justifyContent="center"
        >
          <Container maxW="container.xl" p={[2, 4, 4, 4, 4]}>
            <chakra.button
              w={["44px", "52px", "52px", "52px", "52px"]}
              h={["44px", "52px", "52px", "52px", "52px"]}
              pos="absolute"
              right={4}
              top={3}
              bgColor="brand.200"
              color="white"
              zIndex={2}
              onClick={onClose}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="12px"
              >
              <CloseIcon />
            </chakra.button>
              <Swiper
                slidesPerView={1} 
                loop={true}
                >
                  <Buttons />
                  {data.map((image) => (
                    <SwiperSlide
                      key={image.id}
                      >
                      <chakra.div
                        minW="100%"
                        h={["284px", "440px", "540px", "70vh", "80vh",]} 
                        pos="relative"
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`}
                            alt="Изображение площадки"
                            fill
                            style={{ objectFit: 'cover', borderRadius: "12px" }}
                          />
                      </chakra.div>
                    </SwiperSlide>
                  ))}
              </Swiper>
          </Container>
      </ModalContent>
    </Modal>
  )
}