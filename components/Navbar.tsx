import { Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';

const ListItem = styled.li`
  display: inline;
  margin-right: 1rem;
  padding: 10px;
`;

const Navbar = () => {
  const pages = ['Home'];
  return (
    <>
      <ul
        style={{
          marginTop: '10px',
        }}
      >
        {pages.map((page) => (
          <ListItem key={page}>
            <NextLink
              passHref
              href={`/${[page === 'Home' ? '?page=1' : page.toLowerCase()]}`}
            >
              <Link as="span">{page}</Link>
            </NextLink>
          </ListItem>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
