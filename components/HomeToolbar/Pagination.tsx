import { Button, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface PaginationProps {
  maxPageNum: number;
}

const Pagination = ({ maxPageNum }: PaginationProps) => {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  return (
    <HStack justifyContent="space-between" marginY="10px">
      <Button as={NextLink} href="/expenses/add" colorScheme="blue">
        Add
      </Button>
      <HStack>
        {maxPageNum > currentPage && (
          <Button
            as={NextLink}
            href={`/?page=${currentPage + 1}`}
            colorScheme="blue"
          >
            Next
          </Button>
        )}
        {currentPage > 1 && (
          <Button
            as={NextLink}
            href={`/?page=${currentPage - 1}`}
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
