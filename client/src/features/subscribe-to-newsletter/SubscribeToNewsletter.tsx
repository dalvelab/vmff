import { useState } from 'react';
import { Button, Flex, Input, InputGroup, InputRightAddon, Text, chakra, useToast } from "@chakra-ui/react"

import { subscribeToNewsletter } from '@/entities';
import { isNotVoid } from '@/shared';

const emailValidation = /^\S+@\S+\.\S+$/; 

export const SubscribeToNewsletter = () => {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFormSubmition = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailValidation.test(email)) {
      setValidationError('Некорректный формат E-mail');

      return;
    } else {
      setValidationError(null);
    }

    try {
      const res = await subscribeToNewsletter(email);

      if (!res.data) {
        toast({
          title: 'Произошла ошибка.',
          description: "Попробуйте позже",
          status: 'error',
          duration: 2500,
          position: 'top-right',
          isClosable: true,
        });

        setEmail('');
        return;
      }

      toast({
        title: 'Сообщение отправлено.',
        description: "Мы свяжемся с вами в ближайшее время",
        status: 'success',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      });
      setEmail('');
    } catch (error) {
      setEmail('');

      toast({
        title: 'Произошла ошибка.',
        description: "Попробуйте позже",
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Flex w="full">
        <Text fontSize={["xl", "xl", "2xl", "3xl", "3xl"]}>
          Подпишитесь на рассылку и получайте новости первыми
        </Text>
      </Flex>
      <InputGroup>
        <Flex flexDir="column" w={["100%", "50%", "50%", "100%", "100%"]}>
          <Input
            border="none" 
            borderBottom="1px solid" 
            borderRadius="none"
            borderColor={isNotVoid(validationError) ? 'brand.200' : 'white'}
            outline="none" 
            color="white"
            pl={0}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setValidationError(null)}
            _focus={{outline: "none", boxShadow: "none", borderColor: 'white'}}
            placeholder="E-mail"
            _placeholder={{color: "#A6A6A6"}}
          />
          {isNotVoid(validationError) && <chakra.small mt={1} color="brand.200">{validationError}</chakra.small>}
        </Flex>
        <InputRightAddon>
          <Button _hover={{bgColor: "transparent"}} onClick={handleFormSubmition}>Подписаться</Button>
        </InputRightAddon>
      </InputGroup>
    </>
  )
}