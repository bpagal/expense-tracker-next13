import { ExpenseGroupProps } from '../components/ExpenseGroup/ExpenseGroup';
import { PAGE_LIMIT } from './constants';
import { ExpensesRow } from './database.types';

export const transformData = (
  rawExpenseData: ExpensesRow[]
): ExpenseGroupProps[] => {
  const transformedData: ExpenseGroupProps[] = [];

  if (rawExpenseData === null || rawExpenseData === undefined) {
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

export const splitArrIntoChunks = (
  arrayData: ExpensesRow[],
  pageLimit = PAGE_LIMIT
) => {
  const paginatedData: ExpensesRow[][] = [];
  const maxPageNum = Math.ceil(arrayData.length / pageLimit);

  for (let index = 0; index < maxPageNum; index++) {
    /**
     * index: 0, slice: 0, 20
     * index: 1, slice: 20, 40
     */
    const sliceStart = index * pageLimit;
    const sliceEnd = (index + 1) * pageLimit;

    paginatedData.push(arrayData.slice(sliceStart, sliceEnd));
  }

  return {
    maxPageNum,
    paginatedData,
  };
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
