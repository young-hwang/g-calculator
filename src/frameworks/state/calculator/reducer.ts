import type { CalculatorState, CalculatorAction } from './types';
import { MathJsExpression } from '../../../adapters/math/MathJsExpression';
import { CalculateExpressionUseCase } from '../../../usecases/CalculateExpressionUseCase';

const initialState: CalculatorState = {
  currentExpression: '',
  result: null,
  history: [],
  isEngineeringMode: false
};

const calculateExpressionUseCase = new CalculateExpressionUseCase();

export function calculatorReducer(
  state: CalculatorState = initialState,
  action: CalculatorAction
): CalculatorState {
  switch (action.type) {
    case 'APPEND_DIGIT':
      return {
        ...state,
        currentExpression: state.currentExpression + action.payload,
        result: null
      };

    case 'APPEND_OPERATOR':
      return {
        ...state,
        currentExpression: state.currentExpression + action.payload,
        result: null
      };

    case 'APPEND_FUNCTION':
      return {
        ...state,
        currentExpression: state.currentExpression + action.payload + '(',
        result: null
      };

    case 'CLEAR':
      return {
        ...state,
        currentExpression: '',
        result: null
      };

    case 'DELETE_LAST':
      return {
        ...state,
        currentExpression: state.currentExpression.slice(0, -1),
        result: null
      };

    case 'CALCULATE': {
      if (!state.currentExpression) return state;

      const expression = new MathJsExpression(state.currentExpression);
      const result = calculateExpressionUseCase.execute(expression);

      return {
        ...state,
        result,
        currentExpression: result.success ? result.value.toString() : state.currentExpression
      };
    }

    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload
      };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload]
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: []
      };

    case 'TOGGLE_ENGINEERING_MODE':
      return {
        ...state,
        isEngineeringMode: !state.isEngineeringMode
      };

    default:
      return state;
  }
} 