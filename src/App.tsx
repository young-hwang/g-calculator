import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Calculator } from './frameworks/ui/components/Calculator';
import { CalculatorProvider } from './frameworks/state/calculator/CalculatorContext';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </ChakraProvider>
  );
}

export default App;
