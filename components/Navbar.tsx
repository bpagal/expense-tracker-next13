import { Link, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const ListItem = styled.li`
  display: inline;
  margin-right: 1rem;
  padding: 10px;
`;

const Navbar = () => {
  const { asPath: currentPath } = useRouter();

  const pages = [
    { name: 'Home', link: '/?page=1' },
    {
      name: 'Monthly Expenses',
      link: `/expenses/monthly/${(() => {
        const currentDate = new Date();
        return `?selectedDate=${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }`;
      })()}&page=1`,
    },
  ];
  return (
    <>
      <ul
        style={{
          marginTop: '10px',
        }}
      >
        {pages.map((page) => (
          <ListItem key={page.name}>
            {page.link === currentPath ? (
              <Text display="inline">{page.name}</Text>
            ) : (
              <NextLink passHref href={page.link}>
                <Link as="span">{page.name}</Link>
              </NextLink>
            )}
          </ListItem>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
