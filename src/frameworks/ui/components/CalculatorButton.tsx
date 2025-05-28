import React, { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';

interface CalculatorButtonProps extends ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'solid' | 'outline';
  colorScheme?: string;
}

export const CalculatorButton = React.memo<CalculatorButtonProps>(({
  label,
  onClick,
  variant = 'solid',
  colorScheme = 'brand',
  ...props
}) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <Button
      variant={variant}
      colorScheme={colorScheme}
      onClick={handleClick}
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
});

CalculatorButton.displayName = 'CalculatorButton'; 