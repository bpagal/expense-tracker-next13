import { Heading, Text, Flex } from '@chakra-ui/react';

export interface ExpenseHeaderProps {
  date: string;
  totalAmount: number;
}

const ExpenseHeader = ({ date, totalAmount }: ExpenseHeaderProps) => {
  return (
    <Flex
      mt="50px"
      justify="space-between"
      borderY="1px solid white"
      borderColor="gray.400"
      p="10px"
    >
      <Heading size="md">{date}</Heading>
      <Text size="md" color="red.500">
        ₱ {totalAmount}
      </Text>
    </Flex>
  );
};

export default ExpenseHeader;
