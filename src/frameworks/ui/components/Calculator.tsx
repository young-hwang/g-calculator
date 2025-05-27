import React from 'react';
import { Box, Container, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { useCalculator } from '../../state/calculator/CalculatorContext';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKeypad } from './CalculatorKeypad';
import { CalculatorHistory } from './CalculatorHistory';

export const Calculator: React.FC = () => {
  const {
    state,
    appendDigit,
    appendOperator,
    appendFunction,
    clear,
    deleteLast,
    calculate,
    toggleEngineeringMode,
    clearHistory,
    selectHistoryItem,
  } = useCalculator();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleCalculate = () => {
    calculate();
    // Force a re-render to update history immediately
    setTimeout(() => {
      window.dispatchEvent(new Event('storage'));
    }, 0);
  };

  return (
    <Container maxW="container.sm" py={8}>
      <Grid
        templateColumns={{ base: '1fr', md: '3fr 1fr' }}
        gap={6}
        bg={bgColor}
        borderRadius="xl"
        boxShadow="xl"
        overflow="hidden"
        border="1px solid"
        borderColor={borderColor}
      >
        <GridItem>
          <Box p={4}>
            <CalculatorDisplay
              expression={state.currentExpression}
              result={state.result?.value.toString() ?? ''}
              error={state.result?.error}
            />
            <CalculatorKeypad
              onDigitClick={appendDigit}
              onOperatorClick={appendOperator}
              onFunctionClick={appendFunction}
              onClear={clear}
              onDelete={deleteLast}
              onCalculate={handleCalculate}
              onToggleEngineeringMode={toggleEngineeringMode}
              isEngineeringMode={state.isEngineeringMode}
            />
          </Box>
        </GridItem>
        <GridItem
          borderLeft={{ base: 'none', md: '1px solid' }}
          borderTop={{ base: '1px solid', md: 'none' }}
          borderColor={borderColor}
        >
          <CalculatorHistory
            history={state.history}
            onClearHistory={clearHistory}
            onSelectHistoryItem={selectHistoryItem}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}; 