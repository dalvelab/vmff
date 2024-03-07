import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { chakra, Container, Flex } from "@chakra-ui/react"

import { NavbarLink } from './components';
import { Sidebar } from './components/Sidebar';
import { MenuButton } from './components/MenuButton';

export const Navbar = () => {
  const router = useRouter();

  const [opened, setOpened] = useState(false);

  const isWelcomePage = router.pathname === '/';

  return (
    <chakra.nav 
      transition="0.1s ease-in"
      w="full" 
      h={16}
      pos="fixed" 
      borderBottom="1px solid"
      borderColor={opened ? "transparent" : "#CFCBBF"}
      bgColor="white" 
      top={0} 
      left={0} 
      zIndex={opened ? "toast" :"docked"}
      >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <chakra.div
              opacity={opened ? "0" : "1"} 
              transition="0.1s ease-in" 
              width="150px" 
              height="44px"
              position="relative"
              >
                <Image
                  fill
                  src="/logo-header.svg" 
                  alt='Логотип в меню'
                  priority={true}
                />
            </chakra.div>
          </Link>
          <Flex gap={8} display={['none', 'none', 'none', 'flex', 'flex']}>
            <NavbarLink href={isWelcomePage ? '#afisha' : '/afisha'} text='Афиша и билеты' />
            <NavbarLink href={isWelcomePage ? '#about' : '/#about'} text='О проекте' />
            <NavbarLink href={isWelcomePage ? '#contacts' : '/#contacts'} text='Контакты' />
            <NavbarLink href='/viennese-festival' text='История Венского' />
          </Flex>
          <chakra.div
            display={['block', 'block', 'block', 'none', 'none']}
            >
            <MenuButton onClick={() => setOpened(!opened)} opened={opened} />
          </chakra.div>
        </Flex>
      </Container>
      <Sidebar onClose={() => setOpened(false)} isOpen={opened} />
    </chakra.nav>
  )
}