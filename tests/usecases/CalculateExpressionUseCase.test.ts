import { describe, it, expect } from 'vitest';
import { CalculateExpressionUseCase } from '../../src/usecases/CalculateExpressionUseCase';
import { ExpressionImpl } from '../../src/entities/ExpressionImpl';

describe('CalculateExpressionUseCase', () => {
  const useCase = new CalculateExpressionUseCase();

  it('should calculate valid expressions correctly', () => {
    const expression = new ExpressionImpl('2 + 3 * 4');
    const result = useCase.execute(expression);

    expect(result.success).toBe(true);
    expect(result.value).toBe(14);
    expect(result.expression).toBe('2 + 3 * 4');
  });

  it('should handle invalid expressions', () => {
    const expression = new ExpressionImpl('2 + * 3');
    const result = useCase.execute(expression);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.expression).toBe('2 + * 3');
  });

  it('should handle division by zero', () => {
    const expression = new ExpressionImpl('10 / 0');
    const result = useCase.execute(expression);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.expression).toBe('10 / 0');
  });
}); 