import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Container, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import ExpenseGroup, {
  ExpenseGroupProps,
} from '../components/ExpenseGroup/ExpenseGroup';
import { Database } from '../utils/database.types';
import Navbar from '../components/Navbar';

interface RawExpenseData {
  date: string;
  id: string;
  amount: number;
  category: string;
  details: string;
}

const transformData = (rawExpenseData: RawExpenseData[]) => {
  const transformedData: ExpenseGroupProps[] = [];

  for (const element of rawExpenseData) {
    const { date: rawExpenseDate, ...rawExpenseRest } = element;

    if (
      !transformedData.find((expense) => expense.date === rawExpenseDate)?.date
    ) {
      transformedData.push({
        date: rawExpenseDate,
        expenses: [rawExpenseRest],
      });
    } else {
      const dateIndex = transformedData.findIndex(
        (elem) => elem.date === rawExpenseDate
      );
      transformedData[dateIndex].expenses.push(rawExpenseRest);
    }
  }

  return transformedData;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const currentPage = Number(ctx.query.page) || 1;
  /**
   * 1st page: range(0,19)
   *
   * 2nd page: range(20,39)
   *
   * 3rd page: range(40,59)
   *
   * 4th page: range(60,79)
   *
   * 5th page: range(80,99)
   */
  const PAGE_LIMIT = 20;
  const rangeFrom = currentPage === 1 ? 0 : (currentPage - 1) * PAGE_LIMIT;
  const rangeTo = rangeFrom + (PAGE_LIMIT - 1);
  const supabase = createServerSupabaseClient<Database>(ctx);
  const { data: expensesData, count: expensesDataCount } = await supabase
    .from('expenses')
    .select('*', { count: 'exact' })
    .order('date', {
      ascending: false,
    })
    .range(rangeFrom, rangeTo);
  const maxPageNum = Math.round((expensesDataCount ?? 0) / PAGE_LIMIT);

  return {
    props: {
      expensesData,
      maxPageNum,
      currentPage,
    },
  };
};

interface HomeProps {
  expensesData: RawExpenseData[];
  maxPageNum: number;
  currentPage: number;
}

export default function Home({
  expensesData,
  maxPageNum,
  currentPage,
}: HomeProps) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const expenseData = transformData(expensesData);

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
      <Container maxWidth="3xl">
        <NextLink href="/expenses/add">
          <Button size="xs" colorScheme="blue" mb="10px">
            Add Expense
          </Button>
        </NextLink>
        {maxPageNum > currentPage && (
          <NextLink href={`?page=${currentPage + 1}`}>
            <Button size="xs" colorScheme="blue" mb="10px" ml="10px">
              Next Page
            </Button>
          </NextLink>
        )}
        {currentPage > 1 && (
          <NextLink href={`?page=${currentPage - 1}`}>
            <Button size="xs" colorScheme="blue" mb="10px" ml="10px">
              Previous Page
            </Button>
          </NextLink>
        )}
      </Container>

      {expenseData.map((elem) => (
        <ExpenseGroup
          key={elem.date}
          date={elem.date}
          expenses={elem.expenses}
        />
      ))}
    </>
  );
}
