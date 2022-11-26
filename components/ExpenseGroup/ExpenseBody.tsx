import React from 'react';
import { Text, Flex, Box, Icon, HStack } from '@chakra-ui/react';
import { FcHome } from 'react-icons/fc';

interface Props {
  category: string;
  details: string;
  amount: string;
}

// TODO edit icon FcHome
const ExpenseBody = ({ amount, category, details }: Props) => {
  return (
    <Flex
      justify="space-between"
      borderBottom="1px solid white"
      borderColor="gray.400"
      padding="10px"
    >
      <HStack spacing="1rem">
        <Icon as={FcHome} boxSize="2rem" />
        <Box>
          <Text>{category}</Text>
          <Text>{details}</Text>
        </Box>
      </HStack>
      <Text color="red.500">₱ {amount}</Text>
    </Flex>
  );
};

export default ExpenseBody;
