// src/theme/index.ts
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: {
      500: '#7C5DFA',
      600: '#9277FF'
    },
    gray: {
      50: '#F8F8FB',
      100: '#DFE3FA',
      200: '#888EB0',
      300: '#7E88C3',
      800: '#1E2139'
    }
  },
  fonts: {
    body: 'system-ui, -apple-system, sans-serif',
    heading: 'system-ui, -apple-system, sans-serif'
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '24px',
        fontWeight: '500'
      }
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: '4px',
          borderColor: '#DFE3FA'
        }
      }
    }
  }
});