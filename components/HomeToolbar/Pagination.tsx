import { Button, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import AddExpenseModal from '../AddEditExpense/AddEditExpenseModal';

interface PaginationProps {
  maxPageNum: number;
  addQueryParams?: string;
}

const Pagination = ({ maxPageNum, addQueryParams = '' }: PaginationProps) => {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const pathBeforePage = router.pathname === '/' ? '' : router.pathname;

  return (
    <HStack justifyContent="space-between" marginY="10px">
      <AddExpenseModal action="Add" />
      <HStack>
        {maxPageNum > currentPage && (
          <Button
            as={NextLink}
            href={`${pathBeforePage}?page=${currentPage + 1}${addQueryParams}`}
            colorScheme="blue"
          >
            Next
          </Button>
        )}
        {currentPage > 1 && (
          <Button
            as={NextLink}
            href={`${pathBeforePage}?page=${currentPage - 1}${addQueryParams}`}
            colorScheme="blue"
          >
            Prev
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default Pagination;
