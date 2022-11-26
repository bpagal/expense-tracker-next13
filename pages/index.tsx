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

  const sample = {
    date: '10-23-2022',
    expenses: [
      {
        id: '7f9bd7c6-c1d2-4df1-8644-4144e835899d',
        amount: 8000,
        category: 'Dining out',
        details: 'Burger King',
      },
      {
        id: '5d2bf607-072c-4f2d-bb05-516664d322d3',
        amount: 2000,
        category: 'Dining out',
        details: 'Angels Pizza',
      },
      {
        id: 'd8fbdbf4-5f02-4396-bcf6-f571e4e36978',
        amount: 4000,
        category: 'Dining out',
        details: 'KFC Gravy Burger',
      },
    ],
  };

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
      <ExpenseGroup date="2022-11-20" expenses={sample.expenses} />
      <ExpenseGroup date="2022-11-21" expenses={sample.expenses} />
      <ExpenseGroup date="2022-11-22" expenses={sample.expenses} />
      <ExpenseGroup date="2022-11-23" expenses={sample.expenses} />
      <ExpenseGroup date="2022-11-24" expenses={sample.expenses} />
      <ExpenseGroup date="2022-11-25" expenses={sample.expenses} />
      <ExpenseGroup date="2022-11-26" expenses={sample.expenses} />
    </>
  );
}
