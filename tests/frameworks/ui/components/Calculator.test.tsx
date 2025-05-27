import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Calculator } from '../../../../src/frameworks/ui/components/Calculator';
import { CalculatorProvider } from '../../../../src/frameworks/state/calculator/CalculatorContext';

// Mock LocalStorageAdapter
vi.mock('../../../../src/adapters/storage/LocalStorageAdapter', () => ({
  LocalStorageAdapter: class {
    loadHistory() { return []; }
    saveHistory() {}
    clearHistory() {}
  }
}));

describe('Calculator', () => {
  const renderCalculator = () => {
    return render(
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    );
  };

  it('renders calculator components', async () => {
    renderCalculator();
    
    // Wait for components to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Check for display
    expect(screen.getByText('0')).toBeInTheDocument();
    
    // Check for keypad
    expect(screen.getByText('Engineering Mode')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    
    // Check for history
    expect(screen.getByText('No calculation history')).toBeInTheDocument();
  });

  it('handles basic calculations', async () => {
    renderCalculator();
    
    // Wait for components to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Enter expression
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    
    // Calculate
    fireEvent.click(screen.getAllByText('=')[0]);
    
    // Check result
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('toggles engineering mode', async () => {
    renderCalculator();
    
    // Wait for components to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Initially in basic mode
    expect(screen.queryByText('sin')).not.toBeInTheDocument();
    
    // Switch to engineering mode
    fireEvent.click(screen.getByText('Engineering Mode'));
    
    // Check for engineering functions
    expect(screen.getByText('sin')).toBeInTheDocument();
    expect(screen.getByText('cos')).toBeInTheDocument();
    expect(screen.getByText('tan')).toBeInTheDocument();
  });

  it('handles history operations', async () => {
    renderCalculator();
    
    // Wait for components to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Perform a calculation
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getAllByText('=')[0]);
    
    // Check if result is in history
    expect(screen.getByText('40 + 2')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    
    // Clear history
    fireEvent.click(screen.getByText('Clear'));
    expect(screen.getByText('No calculation history')).toBeInTheDocument();
  });

  it('handles error states', async () => {
    renderCalculator();
    
    // Wait for components to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Enter invalid expression
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    
    // Calculate
    fireEvent.click(screen.getAllByText('=')[0]);
    
    // Check for error message
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
}); 