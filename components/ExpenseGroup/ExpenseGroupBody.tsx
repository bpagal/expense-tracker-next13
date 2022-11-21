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
  Icon,
  HStack,
} from '@chakra-ui/react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../../utils/database.types';
import { useRouter } from 'next/router';
import { FcHome } from 'react-icons/fc';
// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

const ExpenseGroupBody = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  return (
    <>
      <Flex justify="space-between" borderBottom={'0.1px solid white'} p="1rem">
        <HStack spacing={'1rem'}>
          <Icon as={FcHome} boxSize="2rem" />
          <Box>
            <Text>Insurances</Text>
            <Text>Sunlife</Text>
          </Box>
        </HStack>
        <Text color="red.500">₱ 58000</Text>
      </Flex>
    </>
  );
};

export default ExpenseGroupBody;
