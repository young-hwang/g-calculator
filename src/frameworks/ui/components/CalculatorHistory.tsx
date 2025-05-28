import React, { useCallback } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import type { CalculationResult } from '../../../../src/entities/CalculationResult';

interface CalculatorHistoryProps {
  history: CalculationResult[];
  onClearHistory: () => void;
  onSelectHistoryItem: (result: CalculationResult) => void;
}

export const CalculatorHistory = React.memo<CalculatorHistoryProps>(({
  history,
  onClearHistory,
  onSelectHistoryItem,
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSelectItem = useCallback((result: CalculationResult) => {
    onSelectHistoryItem(result);
  }, [onSelectHistoryItem]);

  const handleClearHistory = useCallback(() => {
    onClearHistory();
  }, [onClearHistory]);

  if (history.length === 0) {
    return (
      <Box
        p={4}
        bg={bgColor}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
      >
        <Text textAlign="center" color="gray.500">
          No calculation history
        </Text>
      </Box>
    );
  }

  return (
    <VStack
      spacing={4}
      align="stretch"
      p={4}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      maxHeight="400px"
      overflowY="auto"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          History
        </Text>
        <Button
          size="sm"
          colorScheme="red"
          variant="ghost"
          onClick={handleClearHistory}
        >
          Clear
        </Button>
      </Box>
      <Divider />
      <VStack spacing={2} width="100%">
        {history.map((result, index) => (
          <Box
            key={index}
            p={2}
            width="100%"
            borderRadius="md"
            bg="gray.50"
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
            onClick={() => handleSelectItem(result)}
          >
            <Text fontSize="sm" color="gray.600" noOfLines={1}>
              {result.expression}
            </Text>
            <Text fontSize="md" fontWeight="bold" color="gray.800">
              {result.value}
            </Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
});

CalculatorHistory.displayName = 'CalculatorHistory'; 