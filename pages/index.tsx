import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Container } from '@chakra-ui/react';

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

interface HomeProps {
  data: RawExpenseData[];
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
  const supabase = createServerSupabaseClient<Database>(ctx);
  const { data: expensesData } = await supabase
    .from('expenses')
    .select('*')
    .order('date', {
      ascending: false,
    });

  return {
    props: {
      data: expensesData,
    },
  };
};

export default function Home({ data }: HomeProps) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const expenseData = transformData(data);

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
