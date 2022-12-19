import { useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Select,
} from '@chakra-ui/react';

import ExpenseGroup from '../../components/ExpenseGroup/ExpenseGroup';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/HomeToolbar/Pagination';
import { ExpensesRow, Database } from '../../utils/database.types';
import { transformData, getStartEndDate } from '../../utils/expenseHelpers';

export default function MonthlyExpenses({
  expensesData,
  maxPageNum,
  totalMonthlyAmount,
  yearsMonthsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const expenseData = transformData(expensesData);
  const [yearMonth, setYearMonth] = useState(yearsMonthsData[0].years_months);

  return (
    <>
      <Navbar />
      <Container maxWidth="3xl" mt="10px">
        <HStack alignItems="end">
          <FormControl isRequired isInvalid={false} width="150px">
            <FormLabel>Dates</FormLabel>
            <Select
              size="sm"
              value={yearMonth}
              placeholder="Select Dates"
              onChange={(event) => {
                setYearMonth(event.target.value);
              }}
            >
              {yearsMonthsData.map((elem) => (
                <option key={elem.years_months} value={elem.years_months}>
                  {elem.years_months}
                </option>
              ))}
            </Select>
            <FormErrorMessage>Category is required.</FormErrorMessage>
          </FormControl>
          {yearMonth && (
            <Button
              as={NextLink}
              href={`/expenses/monthly?page=1&selectedDate=${yearMonth}`}
              colorScheme="blue"
            >
              Filter
            </Button>
          )}
        </HStack>
        <Heading size={['sm', 'md']} color="red.500" my="10px">
          Total: {totalMonthlyAmount.toFixed(2)}
        </Heading>
        <Pagination
          maxPageNum={maxPageNum}
          addQueryParams={`&selectedDate=${yearMonth}`}
        />
        {expenseData.map((elem) => (
          <ExpenseGroup
            key={elem.date}
            date={elem.date}
            expenses={elem.expenses}
          />
        ))}
        <Pagination
          maxPageNum={maxPageNum}
          addQueryParams={`&selectedDate=${yearMonth}`}
        />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  expensesData: ExpensesRow[];
  yearsMonthsData: {
    years_months: string;
  }[];
  maxPageNum: number;
  totalMonthlyAmount: number;
}> = async (sspContext) => {
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
  const { data: yearsMonthsData } = await supabaseClient.rpc(
    'select_distinct_years_months'
  );

  const selectedDate = getStartEndDate(sspContext.query.selectedDate as string);
  let expensesQuery = supabaseClient
    .from('expenses')
    .select('*', { count: 'exact' })
    .gte('date', selectedDate.startDate)
    .lte('date', selectedDate.endDate)
    .order('date', {
      ascending: false,
    });

  // get total amount for the month
  const { data: allExpensesData } = await expensesQuery;
  const totalMonthlyAmount =
    allExpensesData?.reduce((prevValue, expense) => {
      return prevValue + expense.amount;
    }, 0) ?? 0;

  expensesQuery = expensesQuery.range(rangeFrom, rangeTo);
  const { data: expensesData, count: expensesDataCount } = await expensesQuery;
  const maxPageNum = Math.ceil((expensesDataCount ?? 0) / PAGE_LIMIT);

  return {
    props: {
      expensesData: expensesData ?? [],
      yearsMonthsData: yearsMonthsData ?? [],
      maxPageNum,
      totalMonthlyAmount,
    },
  };
};
