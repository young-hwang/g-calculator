import { describe, it, expect } from 'vitest';
import { calculatorReducer } from '../../../../src/frameworks/state/calculator/reducer';
import { CalculationResultImpl } from '../../../../src/entities/CalculationResultImpl';

describe('calculatorReducer', () => {
  it('should handle APPEND_DIGIT action', () => {
    const state = calculatorReducer(undefined, { type: 'APPEND_DIGIT', payload: '5' });
    expect(state.currentExpression).toBe('5');
  });

  it('should handle APPEND_OPERATOR action', () => {
    const initialState = { currentExpression: '5', result: null, history: [], isEngineeringMode: false };
    const state = calculatorReducer(initialState, { type: 'APPEND_OPERATOR', payload: '+' });
    expect(state.currentExpression).toBe('5+');
  });

  it('should handle APPEND_FUNCTION action', () => {
    const initialState = { currentExpression: '', result: null, history: [], isEngineeringMode: false };
    const state = calculatorReducer(initialState, { type: 'APPEND_FUNCTION', payload: 'sin' });
    expect(state.currentExpression).toBe('sin(');
  });

  it('should handle CLEAR action', () => {
    const initialState = { currentExpression: '5+3', result: null, history: [], isEngineeringMode: false };
    const state = calculatorReducer(initialState, { type: 'CLEAR' });
    expect(state.currentExpression).toBe('');
  });

  it('should handle DELETE_LAST action', () => {
    const initialState = { currentExpression: '5+3', result: null, history: [], isEngineeringMode: false };
    const state = calculatorReducer(initialState, { type: 'DELETE_LAST' });
    expect(state.currentExpression).toBe('5+');
  });

  it('should handle CALCULATE action with valid expression', () => {
    const initialState = { currentExpression: '2+3', result: null, history: [], isEngineeringMode: false };
    const state = calculatorReducer(initialState, { type: 'CALCULATE' });
    expect(state.result?.success).toBe(true);
    expect(state.result?.value).toBe(5);
  });

  it('should handle CALCULATE action with invalid expression', () => {
    const initialState = { currentExpression: '2++3', result: null, history: [], isEngineeringMode: false };
    const state = calculatorReducer(initialState, { type: 'CALCULATE' });
    expect(state.result?.success).toBe(false);
  });

  it('should handle SET_RESULT action', () => {
    const result = CalculationResultImpl.success(42, '40+2');
    const state = calculatorReducer(undefined, { type: 'SET_RESULT', payload: result });
    expect(state.result).toBe(result);
  });

  it('should handle ADD_TO_HISTORY action', () => {
    const result = CalculationResultImpl.success(42, '40+2');
    const state = calculatorReducer(undefined, { type: 'ADD_TO_HISTORY', payload: result });
    expect(state.history).toHaveLength(1);
    expect(state.history[0]).toBe(result);
  });

  it('should handle CLEAR_HISTORY action', () => {
    const initialState = {
      currentExpression: '',
      result: null,
      history: [CalculationResultImpl.success(42, '40+2')],
      isEngineeringMode: false
    };
    const state = calculatorReducer(initialState, { type: 'CLEAR_HISTORY' });
    expect(state.history).toHaveLength(0);
  });

  it('should handle TOGGLE_ENGINEERING_MODE action', () => {
    const state = calculatorReducer(undefined, { type: 'TOGGLE_ENGINEERING_MODE' });
    expect(state.isEngineeringMode).toBe(true);
    
    const newState = calculatorReducer(state, { type: 'TOGGLE_ENGINEERING_MODE' });
    expect(newState.isEngineeringMode).toBe(false);
  });
}); 