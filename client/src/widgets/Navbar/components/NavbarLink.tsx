import { Link } from '@chakra-ui/next-js';

interface NavbarLinkProps {
  href: string;
  text: string;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ href, text }) => {
  return (
    <Link href={href} fontSize="xl" _hover={{ textDecor: "none", color: "brand.200" }}>{text}</Link>
  )
}