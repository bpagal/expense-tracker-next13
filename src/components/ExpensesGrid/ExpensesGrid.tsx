'use client';

import { TransformedData } from '../../app/expenses/page';
import ActionsPopover from '../ActionsPopover/ActionsPopover';

interface ExpensesGridProps {
  transformedExpensesData: TransformedData[];
}

export default function ExpensesGrid({
  transformedExpensesData,
}: ExpensesGridProps) {
  return transformedExpensesData.map((elem) => {
    const formattedDate = new Date(elem.date).toDateString();
    const totalAmount = elem.expenses.reduce((prevVal, currVal) => {
      return prevVal + currVal.amount;
    }, 0);

    return (
      <div
        key={elem.date}
        className="border border-gray-600 rounded-md p-2 my-2"
      >
        <div className="grid grid-cols-[1fr,_auto]">
          <h2 className="font-semibold text-blue-600">{formattedDate}</h2>
          <h2 className="font-semibold text-red-700 mb-2">₱ {totalAmount}</h2>
        </div>
        {elem.expenses?.map((expense) => (
          <div
            className="grid grid-cols-[1fr,_auto] [&:not(:last-child)]:border-b border-gray-600 [&:not(:last-child)]:mb-2"
            key={expense.id}
          >
            <h2>{expense.details}</h2>
            <h2 className="text-red-700">₱ {expense.amount}</h2>
            <h2 className="text-gray-500">{expense.category}</h2>
            <ActionsPopover expense={expense} key={expense.id} />
          </div>
        ))}
      </div>
    );
  });
}
