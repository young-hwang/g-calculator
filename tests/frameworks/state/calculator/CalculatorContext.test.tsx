import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalculatorProvider, useCalculator } from '../../../../src/frameworks/state/calculator/CalculatorContext';

// Mock LocalStorageAdapter
vi.mock('../../../../src/adapters/storage/LocalStorageAdapter', () => ({
  LocalStorageAdapter: class {
    loadHistory() { return []; }
    saveHistory() {}
    clearHistory() {}
  }
}));

// Test component that uses the calculator context
function TestComponent() {
  const { state, appendDigit, calculate, clear } = useCalculator();
  
  return (
    <div>
      <div data-testid="expression">{state.currentExpression}</div>
      <div data-testid="result">{state.result?.value}</div>
      <button onClick={() => appendDigit('5')}>5</button>
      <button onClick={() => calculate()}>Calculate</button>
      <button onClick={() => clear()}>Clear</button>
    </div>
  );
}

describe('CalculatorContext', () => {
  it('should provide calculator state and actions', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    // Initial state
    expect(screen.getByTestId('expression')).toHaveTextContent('');
    expect(screen.getByTestId('result')).toHaveTextContent('');

    // Append digit
    fireEvent.click(screen.getByText('5'));
    expect(screen.getByTestId('expression')).toHaveTextContent('5');

    // Calculate
    fireEvent.click(screen.getByText('Calculate'));
    expect(screen.getByTestId('result')).toHaveTextContent('5');

    // Clear
    fireEvent.click(screen.getByText('Clear'));
    expect(screen.getByTestId('expression')).toHaveTextContent('');
    expect(screen.getByTestId('result')).toHaveTextContent('');
  });

  it('should throw error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCalculator must be used within a CalculatorProvider');
    
    consoleError.mockRestore();
  });
}); 