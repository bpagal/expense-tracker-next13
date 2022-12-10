import { IconButton, VStack, Button, useDisclosure } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import DeleteExpenseDialog from '../DeleteExpenseDialog';

export interface OptionMenuProps {
  category: string;
  details: string;
  amount: number;
  date: string;
  id: string;
}

const OptionMenu = ({
  category,
  details,
  amount,
  date,
  id,
}: OptionMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="Settings"
          variant="outline"
          size="xs"
          icon={<FaBars />}
        />
      </PopoverTrigger>
      <PopoverContent w="100px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <VStack spacing="1rem" align="start">
            <NextLink
              href={{
                pathname: `/expenses/edit/${id}`,
                query: {
                  amount,
                  category,
                  details,
                  date,
                },
              }}
            >
              <Button colorScheme="blue">Edit</Button>
            </NextLink>
            <Button colorScheme="red" onClick={onOpen}>
              Delete
            </Button>
            <DeleteExpenseDialog
              isOpen={isOpen}
              onClose={onClose}
              expenseId={id}
              expenseDetails={details}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default OptionMenu;
