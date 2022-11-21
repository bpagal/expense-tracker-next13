import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../../utils/database.types';
import { useRouter } from 'next/router';
import ExpenseGroupBody from './ExpenseGroupBody';

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

const ExpenseGroupHeader = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  return (
    <>
      <Flex
        mt={'50px'}
        justify="space-between"
        border={'4px solid white'}
        p="1rem"
      >
        <Heading>20</Heading>
        <Text>Today, November 2022</Text>
        <Text>9000</Text>
      </Flex>
      <ExpenseGroupBody />
      <ExpenseGroupBody />
      <ExpenseGroupBody />
      <ExpenseGroupBody />
      <ExpenseGroupBody />
    </>
  );
};

export default ExpenseGroupHeader;
