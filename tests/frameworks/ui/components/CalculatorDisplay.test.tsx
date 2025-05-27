import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalculatorDisplay } from '../../../../src/frameworks/ui/components/CalculatorDisplay';

describe('CalculatorDisplay', () => {
  it('renders with default values', () => {
    render(<CalculatorDisplay expression="" result="" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders expression and result', () => {
    render(
      <CalculatorDisplay
        expression="2 + 2"
        result="4"
      />
    );
    expect(screen.getByText('2 + 2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(
      <CalculatorDisplay
        expression="2 + "
        result=""
        error="Invalid expression"
      />
    );
    expect(screen.getByText('2 + ')).toBeInTheDocument();
    expect(screen.getByText('Invalid expression')).toBeInTheDocument();
    expect(screen.getByText('Invalid expression')).toHaveStyle({ color: 'var(--chakra-colors-red-400)' });
  });

  it('handles long expressions with word break', () => {
    const longExpression = '123456789012345678901234567890';
    render(
      <CalculatorDisplay
        expression={longExpression}
        result=""
      />
    );
    const expressionElement = screen.getByText(longExpression);
    expect(expressionElement).toHaveStyle({ wordBreak: 'break-all' });
  });
}); 