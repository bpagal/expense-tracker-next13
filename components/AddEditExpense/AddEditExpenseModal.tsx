import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { ExpenseAddForm } from '../../utils/database.types';
import Form from './Form';

interface AddEditExpenseModalProps {
  action: 'Add' | 'Edit';
  initialExpense?: ExpenseAddForm;
}

export default function AddEditExpenseModal({
  action,
  initialExpense,
}: AddEditExpenseModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="yellow">
        {action}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{action}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form
              onClose={onClose}
              action={action}
              initialExpense={initialExpense}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
