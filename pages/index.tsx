import { useEffect } from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
  Button,
  Box,
  useDisclosure,
  Container,
  Center,
} from '@chakra-ui/react';
import AddTransactionModal from '../components/AddTransactionModal';
import Navbar from '../components/Navbar';
import expenses from '../mocks/expenses.json';
import ExpenseGroup from '../components/ExpenseGroup/ExpenseGroup';

interface Expense {
  date: string;
  amount: number;
  account: string;
  category: string;
  remarks: string;
}
export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const allExpenses: Expense[] = expenses;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return !session ? (
    <Container>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    </Container>
  ) : (
    <>
      <Navbar />

      {/* <Box maxW={'800px'} margin="auto"> */}
      <ExpenseGroup />

      {/* </Box> */}

      <AddTransactionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
