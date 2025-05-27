import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalculatorHistory } from '../../../../src/frameworks/ui/components/CalculatorHistory';
import { CalculationResultImpl } from '../../../../src/entities/CalculationResultImpl';

describe('CalculatorHistory', () => {
  const mockHistory = [
    CalculationResultImpl.success(42, '40 + 2'),
    CalculationResultImpl.success(100, '50 * 2'),
  ];

  const defaultProps = {
    history: mockHistory,
    onClearHistory: vi.fn(),
    onSelectHistoryItem: vi.fn(),
  };

  it('renders empty state when history is empty', () => {
    render(<CalculatorHistory {...defaultProps} history={[]} />);
    expect(screen.getByText('No calculation history')).toBeInTheDocument();
  });

  it('renders history items', () => {
    render(<CalculatorHistory {...defaultProps} />);
    
    mockHistory.forEach(result => {
      expect(screen.getByText(result.expression)).toBeInTheDocument();
      expect(screen.getByText(result.value.toString())).toBeInTheDocument();
    });
  });

  it('calls onClearHistory when clear button is clicked', () => {
    render(<CalculatorHistory {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Clear'));
    expect(defaultProps.onClearHistory).toHaveBeenCalled();
  });

  it('calls onSelectHistoryItem when a history item is clicked', () => {
    render(<CalculatorHistory {...defaultProps} />);
    
    const firstHistoryItem = screen.getByText(mockHistory[0].expression).closest('div');
    if (firstHistoryItem) {
      fireEvent.click(firstHistoryItem);
      expect(defaultProps.onSelectHistoryItem).toHaveBeenCalledWith(mockHistory[0]);
    }
  });

  it('renders history items with proper styling', () => {
    render(<CalculatorHistory {...defaultProps} />);
    
    const historyItems = screen.getAllByText(/40 \+ 2|50 \* 2/);
    historyItems.forEach(item => {
      expect(item).toHaveClass('chakra-text');
      expect(item).toHaveStyle({ color: 'var(--chakra-colors-gray-600)' });
    });
  });

  it('handles long expressions with text truncation', () => {
    const longExpression = '1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15';
    const historyWithLongExpression = [
      CalculationResultImpl.success(120, longExpression),
    ];

    render(
      <CalculatorHistory
        {...defaultProps}
        history={historyWithLongExpression}
      />
    );

    const expressionElement = screen.getByText(longExpression);
    expect(expressionElement).toHaveClass('chakra-text');
    expect(expressionElement).toHaveStyle({ noOfLines: 1 });
  });
}); 