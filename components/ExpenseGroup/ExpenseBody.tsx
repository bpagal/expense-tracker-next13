import {
  Text,
  Flex,
  Box,
  Icon,
  IconButton,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react';
import { FcHome } from 'react-icons/fc';
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

export interface ExpenseBodyProps {
  category: string;
  details: string;
  amount: number;
  date: string;
  id: string;
}

// TODO edit icon FcHome
const ExpenseBody = ({
  amount,
  category,
  details,
  date,
  id,
}: ExpenseBodyProps) => {
  return (
    <Flex
      justify="space-between"
      borderBottom="1px solid white"
      borderColor="gray.400"
      padding="5px"
    >
      <HStack spacing="1rem">
        <Icon as={FcHome} boxSize="2rem" />
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
