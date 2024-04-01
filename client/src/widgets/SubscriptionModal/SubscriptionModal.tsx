import { useEffect, useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Button, chakra, Flex, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react"

import { isNotVoid, emailValidation } from "@/shared";
import { subscribeToNewsletter } from "@/entities";

export const SubscriptionModal = () => {
  const toast = useToast();

  const [isOpened, setIsOpened] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const initialRef = useRef(null);

  useEffect(() => {
    if (document.cookie.includes('is_checked_subscription_modal')) {
      setIsOpened(false);

      return;
    }

    setIsOpened(true);
  }, [setIsOpened]);

  function onClose() {
    setIsOpened(false);

    let date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie = `is_checked_subscription_modal=true; expires=${date}`;
  }
  
  const mutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      toast({
        title: 'Успешно!',
        description: "Вы подписались на рассылку",
        status: 'success',
        duration: 2500,
        position: 'top',
        isClosable: true,
      });
      onClose();
      setEmail('');
    },
    onError: () => {
      setEmail('');

      toast({
        title: 'Произошла ошибка.',
        description: "Попробуйте позже",
        status: 'error',
        duration: 2500,
        position: 'top',
        isClosable: true,
      })
    },
  });

  function subscribe() {
    if (!emailValidation.test(email)) {
      setValidationError('Некорректный формат E-mail');

      return;
    } else {
      setValidationError(null);
    }

    mutation.mutate(email);
  }

  return (
    <Modal
      isCentered
      initialFocusRef={initialRef}
      size={["sm", "lg", "lg", "lg", "lg"]}
      isOpen={isOpened} 
      onClose={onClose}
      >
      <ModalOverlay />
      <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody flexDir="column">
            <Text fontSize="xl">
              В наших письмах нет спама. Только анонсы, закулисье концертов, эксклюзив от музыкантов и промокоды.{" "}
              <b>Подпишитесь</b>
            </Text>
            <Flex pt={5} pb={4} flexDir="column" gap={4}>
              <chakra.div>
                <Input
                  ref={initialRef}
                  size="lg"
                  borderColor={isNotVoid(validationError) ? 'brand.200' : 'gray.200'}
                  outline="none" 
                  color="black"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setValidationError(null)}
                  _focus={{outline: "none", boxShadow: "none", borderColor: 'gray.200'}}
                  placeholder="E-mail"
                  _placeholder={{color: "black"}}
                />
                {isNotVoid(validationError) && <chakra.small mt={1} color="brand.200">{validationError}</chakra.small>}
              </chakra.div>
              <Button
                size="lg"
                bgColor="brand.200" 
                color="white"
                _hover={{ bgColor: "brand.200" }}
                onClick={subscribe}
              >
                Подписаться
              </Button>
            </Flex>
          </ModalBody>
      </ModalContent>
    </Modal>
  )
}