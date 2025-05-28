import React from 'react';
import { VStack, Text } from '@chakra-ui/react';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error?: string;
}

export const CalculatorDisplay = React.memo<CalculatorDisplayProps>(({
  expression,
  result,
  error,
}) => {
  return (
    <VStack
      spacing={2}
      p={4}
      bg="gray.50"
      borderRadius="lg"
      width="100%"
      mb={4}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="gray.600"
        width="100%"
        textAlign="right"
        wordBreak="break-all"
      >
        {expression || '0'}
      </Text>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color={error ? 'red.500' : 'gray.800'}
        width="100%"
        textAlign="right"
        wordBreak="break-all"
      >
        {error || result || '0'}
      </Text>
    </VStack>
  );
});

CalculatorDisplay.displayName = 'CalculatorDisplay'; 