import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database, ExpensesRow } from '../../utils/database.types';
import Link from 'next/link';
import { DialogContainer } from '../../components/ExpenseForm/DialogContainer';

const PAGE_SIZE = 20;

interface PageProps {
  searchParams: {
    page: string;
  };
}

export default async function ExpensesPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page);
  const supabase = createServerComponentClient<Database>({ cookies });
  const rangeFrom = page === 1 ? 0 : (page - 1) * PAGE_SIZE;
  const rangeTo = rangeFrom + (PAGE_SIZE - 1);

  const { data: expensesData } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false })
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

  const transformedExpensesData = getTransformedData(expensesData);

  return (
    <div className="mx-auto px-3 sm:container text-white">
      <div className="flex flex-row mt-2 gap-2 justify-between">
        <DialogContainer />
        <div>
          {page === 1 ? (
            <span className="px-2 py-1 text-gray-600 cursor-not-allowed">
              &lt; Prev
            </span>
          ) : (
            <Link
              className="px-2 py-1 no-underline hover:underline"
              href={`/expenses?page=${page - 1}`}
            >
              &lt; Prev
            </Link>
          )}
          <span className="mx-3">Page {page}</span>
          <Link
            className="no-underline hover:underline"
            href={`/expenses?page=${page + 1}`}
          >
            Next &gt;
          </Link>
        </div>
      </div>
      {transformedExpensesData.map((elem) => {
        const formattedDate = new Date(elem.date).toDateString();

        return (
          <div
            key={elem.date}
            className="border border-gray-600 rounded-md p-2 my-2"
          >
            <div className="grid grid-cols-[1fr,_auto]">
              <h2 className="font-semibold text-blue-600">{formattedDate}</h2>
              <h2 className="font-semibold text-red-700 mb-2">₱ 5600</h2>
            </div>
            {elem.expenses?.map((expense) => (
              <div
                className="grid grid-cols-[1fr,_auto] [&:not(:last-child)]:border-b border-gray-600 [&:not(:last-child)]:mb-2"
                key={expense.id}
              >
                <h2>{expense.details}</h2>
                <h2 className="text-red-700">₱ {expense.amount}</h2>
                <h2 className="text-gray-500">{expense.category}</h2>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

interface TransformedData {
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
