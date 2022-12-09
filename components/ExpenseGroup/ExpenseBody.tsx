import {
  Text,
  Flex,
  Box,
  IconButton,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import categories, { defaultIcon } from '../Categories';

export interface ExpenseBodyProps {
  category: string;
  details: string;
  amount: number;
  date: string;
  id: string;
}

const ExpenseBody = ({
  amount,
  category,
  details,
  date,
  id,
}: ExpenseBodyProps) => {
  const mainCategory = categories.find((elem) => elem.name === category);

  return (
    <Flex
      justify="space-between"
      borderBottom="1px solid white"
      borderColor="gray.400"
      padding="5px"
    >
      <HStack spacing="1rem">
        {mainCategory?.icon ?? defaultIcon}
        <Box>
          <Text fontSize={['sm', 'md']}>{category}</Text>
          <Text fontSize={['sm', 'md']}>{details}</Text>
        </Box>
      </HStack>

      <Flex direction="column" alignItems="end" justify="space-around">
        <Text color="red.500" fontSize={['sm', 'md']} whiteSpace="nowrap">
          ₱ {amount}
        </Text>
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="Settings"
              variant="outline"
              size="xs"
              icon={<FaBars />}
            />
          </PopoverTrigger>
          <PopoverContent w="100px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack spacing="1rem" align="start">
                <NextLink
                  href={{
                    pathname: `/expenses/edit/${id}`,
                    query: {
                      amount,
                      category,
                      details,
                      date,
                    },
                  }}
                >
                  <Button size="xs" colorScheme="blue">
                    Edit
                  </Button>
                </NextLink>
                <Button size="xs" colorScheme="red">
                  Delete
                </Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default ExpenseBody;
