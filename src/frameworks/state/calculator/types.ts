import type { CalculationResult } from '../../../entities/CalculationResult';

export interface CalculatorState {
  currentExpression: string;
  result: CalculationResult | null;
  history: CalculationResult[];
  isEngineeringMode: boolean;
}

export type CalculatorAction =
  | { type: 'APPEND_DIGIT'; payload: string }
  | { type: 'APPEND_OPERATOR'; payload: string }
  | { type: 'APPEND_FUNCTION'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'DELETE_LAST' }
  | { type: 'CALCULATE' }
  | { type: 'SET_RESULT'; payload: CalculationResult }
  | { type: 'ADD_TO_HISTORY'; payload: CalculationResult }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'TOGGLE_ENGINEERING_MODE' }; 