import { Heading, Text, Flex } from '@chakra-ui/react';

const ExpenseHeader = () => {
  return (
    <Flex
      mt="50px"
      justify="space-between"
      borderY="1px solid white"
      borderColor="gray.400"
      p="10px"
    >
      <Heading size="md">November 15 2022</Heading>
      <Text size="md" color="red.500">
        ₱ 9000
      </Text>
    </Flex>
  );
};

export default ExpenseHeader;
