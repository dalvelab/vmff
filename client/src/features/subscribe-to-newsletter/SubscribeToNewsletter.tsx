import { useState } from 'react';
import { Button, Flex, Input, InputGroup, InputRightAddon, Text, chakra, useToast } from "@chakra-ui/react";
import { useMutation } from '@tanstack/react-query';

import { subscribeToNewsletter } from '@/entities';
import { emailValidation, isNotVoid } from '@/shared';

export const SubscribeToNewsletter = () => {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      toast({
        title: 'Успешно!',
        description: "Вы подписались на рассылку",
        status: 'success',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      });
      setEmail('');
    },
    onError: () => {
      setEmail('');

      toast({
        title: 'Произошла ошибка.',
        description: "Попробуйте позже",
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      })
    },
  });

  const handleFormSubmition = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailValidation.test(email)) {
      setValidationError('Некорректный формат E-mail');

      return;
    } else {
      setValidationError(null);
    }

    mutation.mutate(email);
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