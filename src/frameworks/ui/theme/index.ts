import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#E6F6FF',
    100: '#BAE3FF',
    200: '#7CC4FA',
    300: '#47A3F3',
    400: '#2186EB',
    500: '#0967D2',
    600: '#0552B5',
    700: '#03449E',
    800: '#01337D',
    900: '#002159',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
      _hover: {
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
    variants: {
      solid: (props: { colorScheme: string }) => ({
        bg: `${props.colorScheme}.500`,
        color: 'white',
        _hover: {
          bg: `${props.colorScheme}.600`,
        },
        _active: {
          bg: `${props.colorScheme}.700`,
        },
      }),
      outline: (props: { colorScheme: string }) => ({
        border: '2px solid',
        borderColor: `${props.colorScheme}.500`,
        color: `${props.colorScheme}.500`,
        _hover: {
          bg: `${props.colorScheme}.50`,
        },
        _active: {
          bg: `${props.colorScheme}.100`,
        },
      }),
    },
    defaultProps: {
      colorScheme: 'brand',
    },
  },
  Input: {
    baseStyle: {
      field: {
        _focus: {
          borderColor: 'brand.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
        },
      },
    },
  },
};

export const theme = extendTheme({
  config,
  colors,
  components,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
}); 