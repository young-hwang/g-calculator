import React, { useCallback, lazy, Suspense } from 'react';
import { Box, Container, Grid, GridItem, useColorModeValue, Spinner } from '@chakra-ui/react';
import { useCalculator } from '../../state/calculator/CalculatorContext';

// Lazy load components
const CalculatorDisplay = lazy(() => import('./CalculatorDisplay').then(mod => ({ default: mod.CalculatorDisplay })));
const CalculatorKeypad = lazy(() => import('./CalculatorKeypad').then(mod => ({ default: mod.CalculatorKeypad })));
const CalculatorHistory = lazy(() => import('./CalculatorHistory').then(mod => ({ default: mod.CalculatorHistory })));

export const Calculator = React.memo(() => {
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

  const handleCalculate = useCallback(() => {
    calculate();
    // Force a re-render to update history immediately
    setTimeout(() => {
      window.dispatchEvent(new Event('storage'));
    }, 0);
  }, [calculate]);

  const handleDigitClick = useCallback((digit: string) => {
    appendDigit(digit);
  }, [appendDigit]);

  const handleOperatorClick = useCallback((operator: string) => {
    appendOperator(operator);
  }, [appendOperator]);

  const handleFunctionClick = useCallback((func: string) => {
    appendFunction(func);
  }, [appendFunction]);

  const handleClear = useCallback(() => {
    clear();
  }, [clear]);

  const handleDelete = useCallback(() => {
    deleteLast();
  }, [deleteLast]);

  const handleToggleEngineeringMode = useCallback(() => {
    toggleEngineeringMode();
  }, [toggleEngineeringMode]);

  const handleClearHistory = useCallback(() => {
    clearHistory();
  }, [clearHistory]);

  const handleSelectHistoryItem = useCallback((result: any) => {
    selectHistoryItem(result);
  }, [selectHistoryItem]);

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
            <Suspense fallback={<Spinner />}>
              <CalculatorDisplay
                expression={state.currentExpression}
                result={state.result?.value.toString() ?? ''}
                error={state.result?.error}
              />
            </Suspense>
            <Suspense fallback={<Spinner />}>
              <CalculatorKeypad
                onDigitClick={handleDigitClick}
                onOperatorClick={handleOperatorClick}
                onFunctionClick={handleFunctionClick}
                onClear={handleClear}
                onDelete={handleDelete}
                onCalculate={handleCalculate}
                onToggleEngineeringMode={handleToggleEngineeringMode}
                isEngineeringMode={state.isEngineeringMode}
              />
            </Suspense>
          </Box>
        </GridItem>
        <GridItem
          borderLeft={{ base: 'none', md: '1px solid' }}
          borderTop={{ base: '1px solid', md: 'none' }}
          borderColor={borderColor}
        >
          <Suspense fallback={<Spinner />}>
            <CalculatorHistory
              history={state.history}
              onClearHistory={handleClearHistory}
              onSelectHistoryItem={handleSelectHistoryItem}
            />
          </Suspense>
        </GridItem>
      </Grid>
    </Container>
  );
});

Calculator.displayName = 'Calculator'; 