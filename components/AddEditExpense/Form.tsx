import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Input,
  Select,
  VStack,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Database, ExpenseAddForm } from '../../utils/database.types';
import categories from '../Categories';
import { useRouter } from 'next/router';

interface FormProps {
  action: 'Add' | 'Edit' | 'Copy';
  onClose: () => void;
  initialExpense?: ExpenseAddForm;
}

export default function Form({
  onClose,
  action,
  initialExpense = {
    id: '',
    details: '',
    amount: '',
    category: '',
    date: '',
  },
}: FormProps) {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  const [details, setDetails] = useState(initialExpense.details);
  const [isDetailsInvalid, setIsDetailsInvalid] = useState(false);

  const [amount, setAmount] = useState(initialExpense.amount);
  const [isAmountInvalid, setIsAmountInvalid] = useState(false);

  const [category, setCategory] = useState(initialExpense.category);
  const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);

  const [date, setDate] = useState(initialExpense.date);
  const [isLoading, setLoading] = useState(false);

  const handleSubmitAdd = async () => {
    setLoading(true);
    const insertPayload: Database['public']['Tables']['expenses']['Insert'] = {
      amount: Number(amount),
      category,
      details,
    };
    if (date) {
      insertPayload.date = date;
    }
    const { error, statusText } = await supabaseClient
      .from('expenses')
      .insert(insertPayload);

    setLoading(false);
    if (error === null && statusText) {
      onClose();
      router.replace(router.asPath);
    }
  };
  const handleSubmitEdit = async () => {
    setLoading(true);

    const updatePayload: Database['public']['Tables']['expenses']['Update'] = {
      amount: Number(amount),
      category,
      details,
      date,
    };

    const { error, statusText } = await supabaseClient
      .from('expenses')
      .update(updatePayload)
      .eq('id', initialExpense.id);

    setLoading(false);
    if (error === null && statusText) {
      onClose();
      router.replace(router.asPath);
    }
  };

  return (
    <>
      <VStack spacing="20px">
        <FormControl isRequired isInvalid={isDetailsInvalid}>
          <FormLabel>Details</FormLabel>
          <Textarea
            fontSize="16px"
            value={details}
            onChange={(event) => {
              setDetails(event.target.value);
            }}
            onBlur={() => {
              setIsDetailsInvalid(details.trim() === '');
            }}
          />
        </FormControl>
        <FormControl isRequired isInvalid={isAmountInvalid}>
          <FormLabel>Amount</FormLabel>
          <Input
            size="sm"
            inputMode="numeric"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
            onBlur={() => {
              setIsAmountInvalid(amount.trim() === '');
            }}
          />
        </FormControl>
        <FormControl isRequired isInvalid={isCategoryInvalid}>
          <FormLabel>Category</FormLabel>
          <Select
            size="sm"
            value={category}
            placeholder="Select Category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            onBlur={() => {
              setIsCategoryInvalid(category.trim() === '');
            }}
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>Category is required.</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input
            size="sm"
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </FormControl>
      </VStack>
      <HStack mt="20px">
        <Button
          colorScheme="red"
          onClick={onClose}
          isLoading={isLoading}
          width="100%"
        >
          Close
        </Button>
        <Button
          colorScheme="yellow"
          onClick={action === 'Edit' ? handleSubmitEdit : handleSubmitAdd}
          isLoading={isLoading}
          disabled={
            details.trim() === '' ||
            amount.trim() === '' ||
            category.trim() === ''
          }
          width="100%"
        >
          Submit
        </Button>
        {/* </Cener> */}
      </HStack>
    </>
  );
}
