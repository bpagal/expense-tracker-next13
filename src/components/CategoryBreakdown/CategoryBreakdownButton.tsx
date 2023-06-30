import { Button, useDisclosure } from '@chakra-ui/react';
import { ExpensesRow } from '../../utils/database.types';
import BreakdownModal from './BreakdownModal';

interface CategoryBreakdownButtonProps {
  expensesData: ExpensesRow[];
  totalMonthlyAmount: string;
}

const CategoryBreakdownButton = ({
  expensesData,
  totalMonthlyAmount,
}: CategoryBreakdownButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Detailed
      </Button>

      <BreakdownModal
        isOpen={isOpen}
        onClose={onClose}
        expensesData={expensesData}
        totalMonthlyAmount={totalMonthlyAmount}
      />
    </>
  );
};

export default CategoryBreakdownButton;
