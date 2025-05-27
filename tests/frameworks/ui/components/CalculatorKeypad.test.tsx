import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalculatorKeypad } from '../../../../src/frameworks/ui/components/CalculatorKeypad';

describe('CalculatorKeypad', () => {
  const defaultProps = {
    onDigitClick: vi.fn(),
    onOperatorClick: vi.fn(),
    onFunctionClick: vi.fn(),
    onClear: vi.fn(),
    onDelete: vi.fn(),
    onCalculate: vi.fn(),
    onToggleEngineeringMode: vi.fn(),
    isEngineeringMode: false,
  };

  it('renders basic mode buttons', () => {
    render(<CalculatorKeypad {...defaultProps} />);
    
    // Check for basic buttons
    expect(screen.getByText('Basic Mode')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    
    // Check for digits
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(digit => {
      expect(screen.getByText(digit)).toBeInTheDocument();
    });
    
    // Check for basic operators
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('÷')).toBeInTheDocument();
  });

  it('renders engineering mode buttons when enabled', () => {
    render(<CalculatorKeypad {...defaultProps} isEngineeringMode={true} />);
    
    expect(screen.getByText('Engineering Mode')).toBeInTheDocument();
    expect(screen.getByText('sin')).toBeInTheDocument();
    expect(screen.getByText('cos')).toBeInTheDocument();
    expect(screen.getByText('tan')).toBeInTheDocument();
  });

  it('calls appropriate handlers when buttons are clicked', () => {
    render(<CalculatorKeypad {...defaultProps} />);
    
    // Test digit click
    fireEvent.click(screen.getByText('5'));
    expect(defaultProps.onDigitClick).toHaveBeenCalledWith('5');
    
    // Test operator click
    fireEvent.click(screen.getByText('+'));
    expect(defaultProps.onOperatorClick).toHaveBeenCalledWith('+');
    
    // Test clear
    fireEvent.click(screen.getByText('Clear'));
    expect(defaultProps.onClear).toHaveBeenCalled();
    
    // Test delete
    fireEvent.click(screen.getByText('Delete'));
    expect(defaultProps.onDelete).toHaveBeenCalled();
    
    // Test calculate
    fireEvent.click(screen.getByText('='));
    expect(defaultProps.onCalculate).toHaveBeenCalled();
  });

  it('calls function handlers in engineering mode', () => {
    render(<CalculatorKeypad {...defaultProps} isEngineeringMode={true} />);
    
    fireEvent.click(screen.getByText('sin'));
    expect(defaultProps.onFunctionClick).toHaveBeenCalledWith('sin');
  });

  it('toggles engineering mode when mode button is clicked', () => {
    render(<CalculatorKeypad {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Basic Mode'));
    expect(defaultProps.onToggleEngineeringMode).toHaveBeenCalled();
  });
}); 