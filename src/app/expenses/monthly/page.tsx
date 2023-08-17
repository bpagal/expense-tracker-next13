import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database, ExpensesRow } from '../../../utils/database.types';
import Link from 'next/link';
import { DialogContainer } from '../../../components/ExpenseForm/DialogContainer';
import ExpensesGrid from '../../../components/ExpensesGrid/ExpensesGrid';
import Filters from '../../../components/Filters/Filters';

const PAGE_SIZE = 20;

interface PageProps {
  searchParams: {
    page: string;
    year: string;
    month: string;
  };
}

export default async function MonthlyExpensesPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page);
  const supabase = createServerComponentClient<Database>({ cookies });
  const rangeFrom = page === 1 ? 0 : (page - 1) * PAGE_SIZE;
  const rangeTo = rangeFrom + (PAGE_SIZE - 1);
  const currentDateFormatted = `year=${searchParams.year}&month=${searchParams.month}`;
  const selectedDate = getStartEndDate(searchParams.year, searchParams.month);
  const monthNum = searchParams.month;
  const monthNumString =
    monthNum.toString().length === 1
      ? `0${monthNum.toString()}`
      : monthNum.toString();

  const { data: sumYearMonth } = await supabase.rpc('select_sum_year_month', {
    year: searchParams.year,
    month: monthNumString,
  });
  const { data: years } = await supabase.rpc('select_all_years');

  const { data: expensesData } = await supabase
    .from('expenses')
    .select('id, date, amount, category, details')
    .gte('date', selectedDate.startDate)
    .lte('date', selectedDate.endDate)
    .order('date', {
      ascending: false,
    })
    .range(rangeFrom, rangeTo);

  /**
   * page 1: 0, 19,
   * page 2: 20, 39
   * page 3: 40, 59
   */

  if (expensesData === null) {
    return (
      <div className="mx-auto px-3 sm:container">
        <h2 className="text-white text-center">No expenses data</h2>
      </div>
    );
  }
  if (years === null) {
    return (
      <div className="mx-auto px-3 sm:container">
        <h2 className="text-white text-center">No years data</h2>
      </div>
    );
  }

  const transformedExpensesData = getTransformedData(expensesData);

  return (
    <div className="mx-auto px-3 sm:container text-white">
      <div className="flex justify-between items-end">
        <Filters years={years} />
        <h2 className="text-red-700 font-semibold">Total: ₱ {sumYearMonth}</h2>
      </div>
      <div className="flex flex-row mt-2 gap-2 justify-between">
        <section>
          <DialogContainer />
          <Link
            className="px-2 hover:underline"
            href={`/expenses/monthly/chart?${currentDateFormatted}`}
          >
            Chart
          </Link>
        </section>
        <div>
          {page === 1 ? (
            <span className="px-2 py-1 text-gray-600 cursor-not-allowed">
              &lt; Prev
            </span>
          ) : (
            <Link
              className="px-2 py-1 no-underline hover:underline"
              href={`/expenses/monthly?page=${
                page - 1
              }&${currentDateFormatted}`}
            >
              &lt; Prev
            </Link>
          )}
          <span className="mx-3">Page {page}</span>
          <Link
            className="no-underline hover:underline"
            href={`/expenses/monthly?page=${page + 1}&${currentDateFormatted}`}
          >
            Next &gt;
          </Link>
        </div>
      </div>
      <ExpensesGrid transformedExpensesData={transformedExpensesData} />
    </div>
  );
}

export interface TransformedData {
  date: string;
  expenses: ExpensesRow[];
}

const getTransformedData = (mData: ExpensesRow[]) => {
  const tempArr: TransformedData[] = [];

  mData.forEach((expense) => {
    if (!tempArr.some((elem) => elem.date === expense.date)) {
      tempArr.push({
        date: expense.date,
        expenses: [expense],
      });
    } else {
      const dateIdx = tempArr.findIndex((elem) => elem.date === expense.date);
      tempArr[dateIdx].expenses.push(expense);
    }
  });

  return tempArr;
};

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
