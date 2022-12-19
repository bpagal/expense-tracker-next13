import { ExpenseGroupProps } from '../components/ExpenseGroup/ExpenseGroup';
import { ExpensesRow } from './database.types';

export const transformData = (
  rawExpenseData: ExpensesRow[]
): ExpenseGroupProps[] => {
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

export const getStartEndDate = (date: string) => {
  const [year, month] = date.split('-').map((elem) => Number(elem));
  const lastDayOfDate = new Date(year, month, 0);
  const endDate = `${year}-${
    lastDayOfDate.getMonth() + 1
  }-${lastDayOfDate.getDate()}`;

  return {
    startDate: `${date}-01`,
    endDate,
  };
};
