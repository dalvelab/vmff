import Link from 'next/link';

import { Flex, Modal, ModalBody, ModalContent, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose, isOpen }) => {
  const router = useRouter();

  const isWelcomePage = router.pathname === '/';

  return (
    <Modal autoFocus={false} onClose={onClose} size="full" isOpen={isOpen}>
      <ModalContent>
      <ModalBody>
      <Flex 
        w="full" 
        height="100vh" 
        flexDir="column" 
        bgColor="white" 
        pos="fixed" 
        top={0} 
        left={0}
        justifyContent="center"
        fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}
        color="gray.900"
        pl={6}
        gap={4}
        >
        <Link href="/" onClick={onClose}>
          <Text>Главная</Text>
        </Link>
        <Link href="/afisha" onClick={onClose}>
          <Text>Афиша</Text>
        </Link>
        <Link href={isWelcomePage ? '#about' : '/#about'} onClick={onClose}>
          <Text>О проекте</Text>
        </Link>
        <Link href="#contacts" onClick={onClose}>
          <Text>Контакты</Text>
        </Link>
        <Link href="/viennese-festival" onClick={onClose}>
          <Text>История Венского</Text>
        </Link>
      </Flex>
      </ModalBody>
      </ModalContent>
    </Modal>
  )
}