import { Text, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';

const ListItem = styled.li`
  display: inline;
  margin-right: 1rem;
  padding: 10px;
`;

const Navbar = () => {
  const pages = ['Home', 'Categories'];
  return (
    <>
       <ul
        style={{
          marginTop: '10px',
        }}
      >
        {pages.map((page) => (
          <ListItem key={page}>
            {
              <NextLink
                passHref
                href={`/${[page === 'Home' ? '/' : page.toLowerCase()]}`}
              >
                <Link>{page}</Link>
              </NextLink>
            }
          </ListItem>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
