import ExpenseHeader from './ExpenseHeader';
import ExpenseBody from './ExpenseBody';

export interface ExpenseGroupProps {
  date: string;
  expenses: {
    id: string;
    amount: number;
    category: string;
    details: string;
  }[];
}

const ExpenseGroup = ({ date, expenses }: ExpenseGroupProps) => {
  const formattedDate = new Date(date).toDateString();
  const totalAmount = expenses.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.amount;
  }, 0);

  return (
    <>
      <ExpenseHeader date={formattedDate} totalAmount={totalAmount} />
      {expenses.map((expense) => (
        <ExpenseBody
          key={expense.id}
          id={expense.id}
          amount={expense.amount}
          category={expense.category}
          details={expense.details}
          date={date}
        />
      ))}
    </>
  );
};

export default ExpenseGroup;
