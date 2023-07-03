import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database, ExpensesRow } from '../../utils/database.types';

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: expensesData } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false })
    .limit(20);

  if (expensesData === null) {
    return (
      <div className="mx-auto px-3 sm:container">
        <h2 className="text-white text-center">No expenses data</h2>
      </div>
    );
  }

  const transformedExpensesData = getTransformedData(expensesData);

  return (
    <div className="mx-auto px-3 sm:container">
      <h2 className="text-lg text-white text-center">Expense Page</h2>
      {transformedExpensesData.map((elem) => {
        const formattedDate = new Date(elem.date).toDateString();

        return (
          <div
            key={elem.date}
            className="text-white border border-gray-600 rounded-md p-2 my-2"
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
                <h2 className="text-white">{expense.details}</h2>
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
