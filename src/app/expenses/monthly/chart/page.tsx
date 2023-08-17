import { cookies } from 'next/headers';
import MonthlyChart from '../../../../components/MonthlyChart/MonthlyChart';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database, ExpensesRow } from '../../../../utils/database.types';

interface PageProps {
  searchParams: {
    page: string;
    year: string;
    month: string;
  };
}
interface ChartData {
  id: string;
  label: string;
  value: number;
}

export default async function MonthlyChartPage({ searchParams }: PageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const selectedDate = getStartEndDate(searchParams.year, searchParams.month);

  const { data: expensesData } = await supabase
    .from('expenses')
    .select('id, date, amount, category, details')
    .gte('date', selectedDate.startDate)
    .lte('date', selectedDate.endDate)
    .order('date', {
      ascending: false,
    });

  if (expensesData === null) {
    return (
      <div className="mx-auto px-3 sm:container">
        <h2 className="text-white text-center">No expenses data</h2>
      </div>
    );
  }

  return <MonthlyChart chartData={getTransformedData(expensesData)} />;
}
const getStartEndDate = (year: string, month: string) => {
  const lastDayOfDate = new Date(Number(year), Number(month), 0);

  const endDate = `${year}-${
    lastDayOfDate.getMonth() + 1
  }-${lastDayOfDate.getDate()}`;

  return {
    startDate: `${year}-${month}-01`,
    endDate,
  };
};

const getTransformedData = (expenseData: ExpensesRow[]): ChartData[] => {
  const tempArr: ChartData[] = [];

  expenseData.forEach((expense) => {
    if (!tempArr.some((elem) => elem.id === expense.category)) {
      tempArr.push({
        id: expense.category,
        label: expense.category,
        value: expense.amount,
      });
    } else {
      const dateIdx = tempArr.findIndex((elem) => elem.id === expense.category);
      tempArr[dateIdx].value += expense.amount;
    }
  });

  return tempArr;
};
