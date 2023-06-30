import {
  Button,
  FormLabel,
  FormControl,
  Input,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';

const DateFilter = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <>
      <HStack justifyContent="space-between" alignItems="end">
        <FormControl width="135px">
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
        <FormControl width="135px">
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
        <Button
          ml="auto"
          as={NextLink}
          href={{
            href: '/',
            query: {
              page: '1',
              fromDate,
              toDate,
            },
          }}
          colorScheme="blue"
        >
          Filter
        </Button>
      </HStack>
    </>
  );
};

export default DateFilter;
