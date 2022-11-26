import { Container } from '@chakra-ui/react';
import ExpenseHeader from './ExpenseHeader';
import ExpenseBody from './ExpenseBody';

interface Props {
  date: string;
  expenses: {
    id: string;
    amount: number;
    category: string;
    details: string;
  }[];
}

const ExpenseGroup = ({ date, expenses }: Props) => {
  const formattedDate = new Date(date).toDateString();

  return (
    <Container maxWidth="3xl">
      <ExpenseHeader date={formattedDate} totalAmount={13000} />
      {expenses.map((expense) => (
        <ExpenseBody
          key={expense.id}
          amount={expense.amount}
          category={expense.category}
          details={expense.details}
        />
      ))}
    </Container>
  );
};

export default ExpenseGroup;
