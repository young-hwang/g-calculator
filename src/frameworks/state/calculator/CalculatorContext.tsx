import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CalculatorState, CalculatorAction } from './types';
import { calculatorReducer } from './reducer';
import { LocalStorageAdapter } from '../../../adapters/storage/LocalStorageAdapter';

interface CalculatorContextType {
  state: CalculatorState;
  appendDigit: (digit: string) => void;
  appendOperator: (operator: string) => void;
  appendFunction: (func: string) => void;
  clear: () => void;
  deleteLast: () => void;
  calculate: () => void;
  clearHistory: () => void;
  toggleEngineeringMode: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | null>(null);

const storageAdapter = new LocalStorageAdapter();

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, {
    currentExpression: '',
    result: null,
    history: storageAdapter.loadHistory(),
    isEngineeringMode: false
  });

  const appendDigit = (digit: string) => {
    dispatch({ type: 'APPEND_DIGIT', payload: digit });
  };

  const appendOperator = (operator: string) => {
    dispatch({ type: 'APPEND_OPERATOR', payload: operator });
  };

  const appendFunction = (func: string) => {
    dispatch({ type: 'APPEND_FUNCTION', payload: func });
  };

  const clear = () => {
    dispatch({ type: 'CLEAR' });
  };

  const deleteLast = () => {
    dispatch({ type: 'DELETE_LAST' });
  };

  const calculate = () => {
    dispatch({ type: 'CALCULATE' });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
    storageAdapter.clearHistory();
  };

  const toggleEngineeringMode = () => {
    dispatch({ type: 'TOGGLE_ENGINEERING_MODE' });
  };

  // 결과가 변경될 때마다 히스토리에 추가하고 저장
  if (state.result) {
    storageAdapter.saveHistory([...state.history, state.result]);
  }

  return (
    <CalculatorContext.Provider
      value={{
        state,
        appendDigit,
        appendOperator,
        appendFunction,
        clear,
        deleteLast,
        calculate,
        clearHistory,
        toggleEngineeringMode
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
} 