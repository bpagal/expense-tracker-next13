import React from 'react';
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
  Button,
  useDisclosure,
  Container,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import {
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { Database } from '../../utils/database.types';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const { data: categories } = await supabase.from('categories').select('*');

  return {
    props: {
      data: categories ?? [],
    },
  };
};

interface Props {
  data: Database['public']['Tables']['categories']['Row'][];
}

const Categories = ({ data }: Props) => {
  return (
    <>
      <Navbar />
      <Flex mt={'50px'} direction="column" alignItems={'center'}>
        <Heading mb={'10px'}>November</Heading>
        <TableContainer border="1px solid white" maxWidth={'90%'}>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>name</Th>
                <Th>created at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((category) => (
                <Tr key={category.id}>
                  <Td>{category.name}</Td>
                  <Td>{category.created_at}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default Categories;
