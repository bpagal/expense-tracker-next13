import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Database } from '../utils/database.types';

interface DeleteExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseId: string;
  expenseDetails: string;
}

const DeleteExpenseDialog = ({
  isOpen,
  onClose,
  expenseId,
  expenseDetails,
}: DeleteExpenseModalProps) => {
  const supabaseClient = useSupabaseClient<Database>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const cancelRef = useRef(null);

  const handleDelete = async () => {
    setIsLoading(true);

    const { data, error } = await supabaseClient
      .from('expenses')
      .delete()
      .eq('id', expenseId);

    if (error === null) {
      await router.push('/');
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      size="xs"
      closeOnOverlayClick={!isLoading}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Expense
          </AlertDialogHeader>
          <AlertDialogBody>{expenseDetails}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml="1rem"
              isLoading={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteExpenseDialog;
