import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { chakra, Container, Flex } from "@chakra-ui/react"

import { NavbarLink } from './components';
// import { Sidebar } from './components/Sidebar';
// import { MenuButton } from './components/MenuButton';

export const Navbar = () => {
  const router = useRouter();
  const isWelcomePage = router.pathname === '/';

  return (
    <chakra.nav 
      transition="0.1s ease-in"
      w="full" 
      h={20}
      pos="fixed" 
      borderBottom="1px solid"
      borderColor="#CFCBBF"
      bgColor="white" 
      top={0} 
      left={0} 
      zIndex="docked"
      >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <chakra.div
              transition="0.1s ease-in" 
              width="80px" 
              height="64px" 
              position="relative"
              >
                <Image
                  fill
                  src="/logo-header.png" 
                  alt='Логотип в меню' 
                  style={{ fill: "red" }}
                  priority={true}
                />
            </chakra.div>
          </Link>
          <Flex gap={8} display={['none', 'none', 'none', 'flex', 'flex']}>
            <NavbarLink href={isWelcomePage ? '#afisha' : '/afisha'} text='Афиша и билеты' />
            <NavbarLink href='/season' text='О проекте' />
            <NavbarLink href='/perfomances' text='Контакты' />
            <NavbarLink href='/about' text='#историяВенского' />
          </Flex>
          {/* <chakra.div
            display={['block', 'block', 'block', 'none', 'none']}
            >
            <MenuButton onClick={() => setOpened(!opened)} opened={opened} />
          </chakra.div> */}
        </Flex>
      </Container>
      {/* <Sidebar onClose={() => setOpened(false)} isOpen={opened} /> */}
    </chakra.nav>
  )
}