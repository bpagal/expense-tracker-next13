import {
  IconButton,
  VStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

import DeleteExpenseDialog from '../DeleteExpenseDialog';
import AddExpenseModal from '../AddEditExpense/AddEditExpenseModal';
import { ExpenseAddForm } from '../../utils/database.types';

const OptionMenu = (expenseData: ExpenseAddForm) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
            <AddExpenseModal action="Edit" initialExpense={expenseData} />
            <Button colorScheme="red" onClick={onOpen}>
              Delete
            </Button>
            <DeleteExpenseDialog
              isOpen={isOpen}
              onClose={onClose}
              expenseId={expenseData.id}
              expenseDetails={expenseData.details}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default OptionMenu;
