import { useMemo, useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Select,
} from '@chakra-ui/react';

import ExpenseGroup from '../../components/ExpenseGroup/ExpenseGroup';
import Navbar from '../../components/Navbar';
import PaginationClient from '../../components/HomeToolbar/PaginationClient';
import { ExpensesRow, Database } from '../../utils/database.types';
import {
  transformData,
  getStartEndDate,
  splitArrIntoChunks,
} from '../../utils/expenseHelpers';

export default function MonthlyExpenses({
  expensesData,
  yearsMonthsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { maxPageNum, paginatedData } = splitArrIntoChunks(expensesData);
  const totalMonthlyAmount = useMemo(() => {
    return expensesData
      .reduce((prevValue, expense) => {
        return prevValue + expense.amount;
      }, 0)
      .toFixed(2);
  }, [expensesData]);

  const [currentPage, setCurrentPage] = useState(1);
  const transformedExpenseData = transformData(paginatedData[currentPage - 1]);
  const [yearMonth, setYearMonth] = useState(yearsMonthsData[0].years_months);

  return (
    <>
      <Navbar />
      <Container maxWidth="3xl" mt="10px">
        <HStack alignItems="end">
          <FormControl isRequired width="150px">
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
          </FormControl>
          {yearMonth && (
            <Button
              as={NextLink}
              href={`/expenses/monthly?selectedDate=${yearMonth}`}
              onClick={() => {
                setCurrentPage(1);
              }}
              colorScheme="blue"
            >
              Filter
            </Button>
          )}
        </HStack>
        <Heading size={['sm', 'md']} color="red.500" my="10px">
          Total: {totalMonthlyAmount}
        </Heading>
        <PaginationClient
          maxPageNum={maxPageNum}
          currentPage={currentPage}
          prevBtnOnclick={() => {
            setCurrentPage((currentPage) => currentPage - 1);
          }}
          nextBtnOnclick={() => {
            setCurrentPage((currentPage) => currentPage + 1);
          }}
        />
        {transformedExpenseData.map((elem) => (
          <ExpenseGroup
            key={elem.date}
            date={elem.date}
            expenses={elem.expenses}
          />
        ))}
        <PaginationClient
          maxPageNum={maxPageNum}
          currentPage={currentPage}
          prevBtnOnclick={() => {
            setCurrentPage((currentPage) => currentPage - 1);
          }}
          nextBtnOnclick={() => {
            setCurrentPage((currentPage) => currentPage + 1);
          }}
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
}> = async (sspContext) => {
  const supabaseClient = createServerSupabaseClient<Database>(sspContext);
  const { data: yearsMonthsData } = await supabaseClient.rpc(
    'select_distinct_years_months'
  );

  const selectedDate = getStartEndDate(sspContext.query.selectedDate as string);
  const expensesQuery = supabaseClient
    .from('expenses')
    .select('id, date, amount, category, details')
    .gte('date', selectedDate.startDate)
    .lte('date', selectedDate.endDate)
    .order('date', {
      ascending: false,
    });

  const { data: expensesData } = await expensesQuery;

  return {
    props: {
      expensesData: expensesData ?? [],
      yearsMonthsData: yearsMonthsData ?? [],
    },
  };
};
