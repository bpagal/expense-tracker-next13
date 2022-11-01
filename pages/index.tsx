import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
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
    <Flex mt={'50px'} direction="column" alignItems={'center'}>
      <Heading mb={'10px'}>November</Heading>
      <TableContainer border="1px solid white" maxWidth={'90%'}>
        <Table variant="striped" colorScheme="blue">
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
                <Td whiteSpace="initial">{expense.remarks}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
