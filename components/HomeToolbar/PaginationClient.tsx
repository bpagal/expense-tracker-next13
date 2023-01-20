import { Button, HStack } from '@chakra-ui/react';
import AddExpenseModal from '../AddEditExpense/AddEditExpenseModal';

interface PaginationProps {
  maxPageNum: number;
  currentPage: number;
  prevBtnOnclick: () => void;
  nextBtnOnclick: () => void;
}

const PaginationClient = ({
  maxPageNum,
  currentPage,
  prevBtnOnclick,
  nextBtnOnclick,
}: PaginationProps) => {
  return (
    <HStack justifyContent="space-between" marginY="10px">
      <AddExpenseModal action="Add" />
      <HStack>
        {currentPage > 1 && (
          <Button colorScheme="blue" onClick={prevBtnOnclick}>
            Prev
          </Button>
        )}
        {maxPageNum > currentPage && (
          <Button colorScheme="blue" onClick={nextBtnOnclick}>
            Next
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default PaginationClient;
