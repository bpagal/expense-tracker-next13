import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Container } from '@chakra-ui/react';

import ExpenseGroup from '../components/ExpenseGroup/ExpenseGroup';
import Navbar from '../components/Navbar';
import Pagination from '../components/HomeToolbar/Pagination';
import DateFilter from '../components/HomeToolbar/DateFilter';
import { Database, ExpensesRow } from '../utils/database.types';
import { transformData } from '../utils/expenseHelpers';

export default function Home({
  expensesData,
  maxPageNum,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const expenseData = transformData(expensesData);

  return (
    <>
      <Navbar />
      <Container maxWidth="3xl" mt="10px">
        <DateFilter />
        <Pagination maxPageNum={maxPageNum} />
        {expenseData.map((elem) => (
          <ExpenseGroup
            key={elem.date}
            date={elem.date}
            expenses={elem.expenses}
          />
        ))}
        <Pagination maxPageNum={maxPageNum} />
      </Container>
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
  const supabaseClient = createServerSupabaseClient<Database>(sspContext);
  let expensesQuery = supabaseClient
    .from('expenses')
    .select('*', { count: 'exact' });
  if (fromDate !== null && toDate !== null) {
    expensesQuery = expensesQuery.gte('date', fromDate).lte('date', toDate);
  }
  expensesQuery = expensesQuery
    .order('date', {
      ascending: false,
    })
    .range(rangeFrom, rangeTo);

  const { data: expensesData, count: expensesDataCount } = await expensesQuery;
  const maxPageNum = Math.ceil((expensesDataCount ?? 0) / PAGE_LIMIT);

  return {
    props: {
      expensesData: expensesData ?? [],
      maxPageNum,
    },
  };
};
