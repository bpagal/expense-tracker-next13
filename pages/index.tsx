import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Container } from '@chakra-ui/react';

import ExpenseGroup, {
  ExpenseGroupProps,
} from '../components/ExpenseGroup/ExpenseGroup';
import { Database, ExpensesRow } from '../utils/database.types';
import Navbar from '../components/Navbar';
import HomeToolbar from '../components/HomeToolbar';

export default function Home({
  expensesData,
  maxPageNum,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <HomeToolbar maxPageNum={maxPageNum} />
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

export const getServerSideProps: GetServerSideProps<{
  expensesData: ExpensesRow[];
  maxPageNum: number;
}> = async (sspContext) => {
  const fromDate = sspContext.query.fromDate || null;
  const toDate = sspContext.query.toDate || null;
  const currentPage = Number(sspContext.query.page) || 1;
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
  const supabase = createServerSupabaseClient<Database>(sspContext);
  let expensesQuery = supabase.from('expenses').select('*', { count: 'exact' });
  if (fromDate !== null && toDate !== null) {
    expensesQuery = expensesQuery.gte('date', fromDate).lte('date', toDate);
  }
  expensesQuery = expensesQuery
    .order('date', {
      ascending: false,
    })
    .range(rangeFrom, rangeTo);

  const { data: expensesData, count: expensesDataCount } = await expensesQuery;
  const maxPageNum = Math.round((expensesDataCount ?? 0) / PAGE_LIMIT);

  return {
    props: {
      expensesData: expensesData ?? [],
      maxPageNum,
    },
  };
};

const transformData = (rawExpenseData: ExpensesRow[]): ExpenseGroupProps[] => {
  const transformedData: ExpenseGroupProps[] = [];

  if (rawExpenseData === null) {
    return [];
  }

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
