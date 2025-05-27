import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalculatorButton } from '../../../../src/frameworks/ui/components/CalculatorButton';

describe('CalculatorButton', () => {
  it('renders with default props', () => {
    render(<CalculatorButton label="1" onClick={() => {}} />);
    const button = screen.getByText('1');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('chakra-button');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<CalculatorButton label="1" onClick={handleClick} />);
    fireEvent.click(screen.getByText('1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with custom variant and color scheme', () => {
    render(
      <CalculatorButton
        label="1"
        onClick={() => {}}
        variant="outline"
        colorScheme="red"
      />
    );
    const button = screen.getByText('1');
    expect(button).toHaveClass('chakra-button');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  it('passes additional props to the button', () => {
    render(
      <CalculatorButton
        label="1"
        onClick={() => {}}
        data-testid="test-button"
        disabled
      />
    );
    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
  });
}); 