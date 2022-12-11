import {
  Container,
  Button,
  HStack,
  FormLabel,
  FormControl,
  Input,
  Box,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface HomeToolbarProps {
  maxPageNum: number;
}

const HomeToolbar = ({ maxPageNum }: HomeToolbarProps) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  return (
    <Container maxWidth="3xl" mb="10px">
      <HStack alignItems="end" flexWrap="wrap">
        <NextLink href="/expenses/add">
          <Button colorScheme="blue">Add Expense</Button>
        </NextLink>
        {maxPageNum > currentPage && (
          <NextLink href={`?page=${currentPage + 1}`}>
            <Button size="xs" colorScheme="blue" mb="10px" ml="10px">
              Next Page
            </Button>
          </NextLink>
        )}
        {currentPage > 1 && (
          <NextLink href={`?page=${currentPage - 1}`}>
            <Button size="xs" colorScheme="blue" mb="10px" ml="10px">
              Previous Page
            </Button>
          </NextLink>
        )}
        <Box>
          <FormControl w="140px">
            <FormLabel>From</FormLabel>
            <Input
              size="sm"
              type="date"
              value={fromDate}
              onChange={(event) => {
                setFromDate(event.target.value);
              }}
            />
          </FormControl>
          <FormControl w="140px">
            <FormLabel>To</FormLabel>
            <Input
              size="sm"
              type="date"
              value={toDate}
              onChange={(event) => {
                setToDate(event.target.value);
              }}
            />
          </FormControl>
        </Box>
        <NextLink
          href={{
            href: '/',
            query: {
              page: '1',
              fromDate,
              toDate,
            },
          }}
          as="/"
        >
          <Button colorScheme="blue">Filter</Button>
        </NextLink>
      </HStack>
    </Container>
  );
};

export default HomeToolbar;
