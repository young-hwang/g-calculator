import type { CalculationResult } from './CalculationResult';

export class CalculationResultImpl implements CalculationResult {
  readonly value: number;
  readonly expression: string;
  readonly timestamp: string;
  readonly success: boolean;
  readonly error?: string;

  constructor(params: {
    value: number;
    expression: string;
    success: boolean;
    error?: string;
  }) {
    this.value = params.value;
    this.expression = params.expression;
    this.timestamp = new Date().toISOString();
    this.success = params.success;
    this.error = params.error;
  }

  static success(value: number, expression: string): CalculationResultImpl {
    return new CalculationResultImpl({
      value,
      expression,
      success: true,
    });
  }

  static error(expression: string, error: string): CalculationResultImpl {
    return new CalculationResultImpl({
      value: 0,
      expression,
      success: false,
      error,
    });
  }
} 