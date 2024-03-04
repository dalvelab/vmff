import { chakra } from "@chakra-ui/react"

import styles from './styles.module.css';

interface MenuButtonProps {
  opened: boolean;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ opened, onClick }) => {
  return (
    <chakra.button
    className={`${styles.sidebarButton} ${
      opened ? styles.sidebarOpened : null
    }`}
    bgColor="brand.200"
    display="flex"
    flexDir="column"
    alignItems="flex-start"
    justifyContent="center"
    onClick={onClick}
    pos="relative"
    zIndex="toast"
    _focus={{boxShadow: 'none', outline: 'none'}}
  >
    <chakra.div bgColor="white" className={styles.bar}></chakra.div>
    <chakra.div bgColor="white" className={styles.bar}></chakra.div>
    <chakra.div bgColor="white" className={styles.bar}></chakra.div>
  </chakra.button>
  )
}