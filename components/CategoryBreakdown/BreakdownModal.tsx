import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Text,
} from '@chakra-ui/react';
import { ExpensesRow } from '../../utils/database.types';

interface CategoriesBreakdown {
  name: string;
  totalAmount: number;
}

export interface BreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  expensesData: ExpensesRow[];
  totalMonthlyAmount: string;
}

const BreakdownModal = ({
  isOpen,
  onClose,
  expensesData,
  totalMonthlyAmount,
}: BreakdownModalProps) => {
  const categoriesBreakdown = transformData(expensesData);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Category Breakdown</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="red.500">Total: ₱ {totalMonthlyAmount}</Text>
          <OrderedList>
            {categoriesBreakdown.map((elem) => (
              <ListItem key={elem.name}>
                {elem.name}: ₱ {elem.totalAmount}
              </ListItem>
            ))}
          </OrderedList>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BreakdownModal;

const transformData = (expensesData: ExpensesRow[]) => {
  const transformedData: CategoriesBreakdown[] = [];

  for (const expense of expensesData) {
    const categoryIndex = transformedData.findIndex(
      (category) => category.name === expense.category
    );
    if (categoryIndex === -1) {
      transformedData.push({
        name: expense.category,
        totalAmount: expense.amount,
      });
    } else {
      transformedData[categoryIndex].totalAmount += expense.amount;
    }
  }

  return [...transformedData].sort(
    (elemA, elemB) => elemB.totalAmount - elemA.totalAmount
  );
};
