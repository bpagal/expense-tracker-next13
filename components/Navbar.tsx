import { Text, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ListItem = styled.li`
  display: inline;
  margin-right: 1rem;
  padding: 10px;
`;

const Navbar = () => {
  const pages = [
    'Home',
    'Transactions',
    'Configurations',
    'Settings',
    'Page 5',
  ];
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
              <Link
                onClick={() => {
                  alert('ateaetea');
                }}
              >
                {page}
              </Link>
            }
          </ListItem>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
