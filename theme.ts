// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig, defineStyleConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const Button = defineStyleConfig({
  defaultProps: {
    size: 'sm',
  },
});

// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Button,
  },
});

export default theme;
