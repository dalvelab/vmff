import { Button, chakra,  Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { isEmptyArray, rusMonths } from '@/shared';

import styles from './styles.module.css';
import type { Afisha, Filter } from '@/entities';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface AfishaFiltersProps {
  data: Afisha[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  months: string[];
  locations: string[];
}

export const AfishaFilters: React.FC<AfishaFiltersProps> = ({ data, filter, setFilter, months, locations }) => {
  function handleMenuClick(location: string) {
    setFilter({...filter, location});
  }

  return (
    <Flex flexDir="column" alignItems="flex-start" gap={6}>
      <Flex className={styles.filters} mt={6} gap={6} position="relative" overflowX="scroll">
        {!isEmptyArray(data) && (
          <chakra.button 
            fontSize="2xl" 
            fontWeight="medium" 
            color={filter.month === 'all' ? "brand.200" : "gray.900"} 
            pos="relative"
            onClick={() => setFilter({...filter, month: 'all'})}
            _after={{ content: filter.month === 'all' ? '""' : 'none', width: '100%', height: '2px', position: 'absolute', left: 0, bottom: 0, bgColor: "brand.200" }}
            >
              Ближайшие
          </chakra.button>
        )}
        {months.map((month) => (
          <chakra.button 
            key={month}
            fontSize="2xl" 
            fontWeight="medium" 
            color={filter.month === month ? "brand.200" : "gray.900"} 
            pos="relative"
            _after={{ content: filter.month === month ? '""' : 'none', width: '100%', height: '2px', position: 'absolute', left: 0, bottom: 0, bgColor: "brand.200" }}
            onClick={() => setFilter({...filter, month})}
            textTransform="capitalize"
            >
            {rusMonths[Number(month) - 1]}
        </chakra.button>
        ))}
      </Flex>
      <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton 
            isActive={isOpen} 
            as={Button}
            border="1px solid"
            borderColor="brand.300"
            rightIcon={<ChevronDownIcon fontSize="2xl" />}
            bg="transparent"
            _active={{bgColor: "transparent"}}
            _hover={{bgColor: "transparent"}}
          >
            <chakra.div maxW="180px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{filter.location === 'all' ? 'Все площадки' : filter.location}</chakra.div>
          </MenuButton>
          <MenuList borderColor="brand.300" p={2}>
            <MenuItem 
              borderRadius={4}
              _focus={{bgColor: "transparent"}} 
              _hover={{bgColor: "rgba(0, 0, 0, 0.04)"}}
              onClick={() => handleMenuClick('all')}
            >
              Все площадки
            </MenuItem>
            {locations.map((location) => (
              <MenuItem 
                key={location}
                borderRadius={4}
                onClick={() => handleMenuClick(location)}
                 _focus={{bgColor: "transparent"}} 
                 _hover={{bgColor: "rgba(0, 0, 0, 0.04)"}}
                >
                  {location}
                </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
    </Flex>
  )
}