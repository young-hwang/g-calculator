import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error?: string;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  result,
  error,
}) => {
  return (
    <VStack
      width="100%"
      spacing={2}
      p={4}
      bg="gray.800"
      borderRadius="lg"
      minHeight="120px"
    >
      <Box width="100%" textAlign="right">
        <Text
          fontSize="2xl"
          color="gray.400"
          noOfLines={2}
          wordBreak="break-all"
        >
          {expression || '0'}
        </Text>
      </Box>
      <Box width="100%" textAlign="right">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color={error ? 'red.400' : 'white'}
          noOfLines={1}
          wordBreak="break-all"
        >
          {error || result || '0'}
        </Text>
      </Box>
    </VStack>
  );
}; 