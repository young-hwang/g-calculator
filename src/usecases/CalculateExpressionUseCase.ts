import type { Expression } from '../entities/Expression';
import type { CalculationResult } from '../entities/CalculationResult';
import { CalculationResultImpl } from '../entities/CalculationResultImpl';

export class CalculateExpressionUseCase {
  execute(expression: Expression): CalculationResult {
    try {
      const result = expression.evaluate();
      return CalculationResultImpl.success(result, expression.toString());
    } catch (error) {
      return CalculationResultImpl.error(
        expression.toString(),
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  }
} 