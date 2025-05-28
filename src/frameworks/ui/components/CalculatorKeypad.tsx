import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { CalculatorButton } from './CalculatorButton';

interface CalculatorKeypadProps {
  onDigitClick: (digit: string) => void;
  onOperatorClick: (operator: string) => void;
  onFunctionClick: (func: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCalculate: () => void;
  onToggleEngineeringMode: () => void;
  isEngineeringMode: boolean;
}

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onDigitClick,
  onOperatorClick,
  onFunctionClick,
  onClear,
  onDelete,
  onCalculate,
  onToggleEngineeringMode,
  isEngineeringMode,
}) => {
  const renderDigitButton = (digit: string) => (
    <CalculatorButton
      key={digit}
      label={digit}
      onClick={() => onDigitClick(digit)}
      colorScheme="blue"
    />
  );

  const renderOperatorButton = (operator: string) => (
    <CalculatorButton
      key={operator}
      label={operator}
      onClick={() => onOperatorClick(operator)}
      colorScheme="orange"
    />
  );

  const renderFunctionButton = (func: string) => (
    <CalculatorButton
      key={func}
      label={func}
      onClick={() => onFunctionClick(func)}
      colorScheme="teal"
    />
  );

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap={2}
      width="100%"
      p={2}
    >
      {/* Mode Toggle */}
      <GridItem colSpan={4}>
        <CalculatorButton
          label={isEngineeringMode ? 'Basic Mode' : 'Engineering Mode'}
          onClick={onToggleEngineeringMode}
          colorScheme="purple"
        />
      </GridItem>

      {/* Clear and Delete */}
      <GridItem colSpan={2}>
        <CalculatorButton
          label="Clear"
          onClick={onClear}
          colorScheme="red"
        />
      </GridItem>
      <GridItem colSpan={2}>
        <CalculatorButton
          label="Delete"
          onClick={onDelete}
          colorScheme="red"
        />
      </GridItem>

      {/* Basic Functions */}
      <GridItem colSpan={1}>
        <CalculatorButton
          label="("
          onClick={() => onOperatorClick('(')}
          colorScheme="teal"
        />
      </GridItem>
      <GridItem colSpan={1}>
        <CalculatorButton
          label=")"
          onClick={() => onOperatorClick(')')}
          colorScheme="teal"
        />
      </GridItem>
      <GridItem colSpan={1}>
        <CalculatorButton
          label="%"
          onClick={() => onOperatorClick('%')}
          colorScheme="teal"
        />
      </GridItem>
      <GridItem colSpan={1}>
        <CalculatorButton
          label="÷"
          onClick={() => onOperatorClick('/')}
          colorScheme="orange"
        />
      </GridItem>

      {/* Engineering Functions (visible only in engineering mode) */}
      {isEngineeringMode && (
        <>
          <GridItem colSpan={1}>
            <CalculatorButton
              label="sin"
              onClick={() => onFunctionClick('sin')}
              colorScheme="teal"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CalculatorButton
              label="cos"
              onClick={() => onFunctionClick('cos')}
              colorScheme="teal"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CalculatorButton
              label="tan"
              onClick={() => onFunctionClick('tan')}
              colorScheme="teal"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CalculatorButton
              label="×"
              onClick={() => onOperatorClick('*')}
              colorScheme="orange"
            />
          </GridItem>
        </>
      )}

      {/* Digits and Basic Operators */}
      {['7', '8', '9'].map(renderDigitButton)}
      <GridItem colSpan={1}>
        <CalculatorButton
          label="-"
          onClick={() => onOperatorClick('-')}
          colorScheme="orange"
        />
      </GridItem>

      {['4', '5', '6'].map(renderDigitButton)}
      <GridItem colSpan={1}>
        <CalculatorButton
          label="+"
          onClick={() => onOperatorClick('+')}
          colorScheme="orange"
        />
      </GridItem>

      {['1', '2', '3'].map(renderDigitButton)}
      <GridItem colSpan={1}>
        <CalculatorButton
          label="="
          onClick={onCalculate}
          colorScheme="green"
        />
      </GridItem>

      {['0', '.'].map(renderDigitButton)}
      <GridItem colSpan={2}>
        <CalculatorButton
          label="="
          onClick={onCalculate}
          colorScheme="green"
        />
      </GridItem>
    </Grid>
  );
}; 