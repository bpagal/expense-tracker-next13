import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
} from '@chakra-ui/react';
import expenses from '../mocks/expenses.json';

interface Expense {
  date: string;
  amount: number;
  account: string;
  category: string;
  remarks: string;
}

export default function Home() {
  const allExpenses: Expense[] = expenses;
  return (
    <Center w={'100%'}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>date</Th>
              <Th isNumeric>amount</Th>
              <Th>account</Th>
              <Th>category</Th>
              <Th>remarks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allExpenses.map((expense) => (
              <Tr key={expense.remarks}>
                <Td>{expense.date}</Td>
                <Td isNumeric>{expense.amount}</Td>
                <Td>{expense.account}</Td>
                <Td>{expense.category}</Td>
                <Td>{expense.remarks}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}
