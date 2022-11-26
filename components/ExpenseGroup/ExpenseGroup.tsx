import React from 'react';
import { Container } from '@chakra-ui/react';
import ExpenseHeader from './ExpenseHeader';
import ExpenseBody from './ExpenseBody';

const ExpenseGroup = () => {
  return (
    <Container maxWidth="3xl">
      <ExpenseHeader />
      <ExpenseBody />
      <ExpenseBody />
      <ExpenseBody />
    </Container>
  );
};

export default ExpenseGroup;
