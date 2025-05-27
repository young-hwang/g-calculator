import React from 'react';
import { Button } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';

interface CalculatorButtonProps extends ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'solid' | 'outline';
  colorScheme?: string;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
  variant = 'solid',
  colorScheme = 'brand',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      colorScheme={colorScheme}
      onClick={onClick}
      size="lg"
      width="100%"
      height="100%"
      fontSize="xl"
      fontWeight="bold"
      borderRadius="lg"
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
      }}
      _active={{
        transform: 'translateY(0)',
        boxShadow: 'sm',
      }}
      {...props}
    >
      {label}
    </Button>
  );
}; 