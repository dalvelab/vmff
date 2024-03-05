import { useState } from 'react';
import { Badge, Button, chakra, Checkbox, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { isEmptyArray, isNotVoid, rusMonths } from '@/shared';

import styles from './styles.module.css';
import type { Afisha, Filter } from '@/entities';

interface AfishaFiltersProps {
  data: Afisha[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  months: Set<string>;
  locations: string[];
}

export const AfishaFilters: React.FC<AfishaFiltersProps> = ({ data, filter, setFilter, months }) => {
  const uniqueLocations = new Set<string>();

  data.forEach((event) => {
    if (isNotVoid(event.location)) {
      uniqueLocations.add(event.location?.name)
    }
  });

  function handleMenuClick(location: string) {
    setFilter({...filter, location});
  }

  return (
    <Flex justifyContent="space-between">
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
        {Array.from(months).map((month) => (
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
            bg="transparent"
            _active={{bgColor: "transparent"}}
            _hover={{bgColor: "transparent"}}
          >
            {filter.location === 'all' ? 'Все площадки' : filter.location}
          </MenuButton>
          <MenuList borderColor="brand.300" p={2}>
            {Array.from(uniqueLocations).map((location) => (
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