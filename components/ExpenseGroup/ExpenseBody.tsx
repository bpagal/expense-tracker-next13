import { Text, Flex, Box, HStack } from '@chakra-ui/react';
import categories, { defaultIcon } from '../Categories';
import OptionMenu from './OptionMenu';

export interface ExpenseBodyProps {
  category: string;
  details: string;
  amount: number;
  date: string;
  id: string;
}

const ExpenseBody = ({
  category,
  details,
  amount,
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
        <OptionMenu
          category={category}
          details={details}
          amount={amount}
          date={date}
          id={id}
        />
      </Flex>
    </Flex>
  );
};

export default ExpenseBody;
