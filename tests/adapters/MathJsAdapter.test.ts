import { describe, it, expect } from 'vitest';
import { MathJsAdapter } from '../../src/adapters/math/MathJsAdapter';
import { MathJsExpression } from '../../src/adapters/math/MathJsExpression';

describe('MathJsAdapter', () => {
  const adapter = MathJsAdapter.getInstance();

  it('should evaluate basic arithmetic expressions', () => {
    const expression = new MathJsExpression('2 + 3 * 4');
    expect(adapter.evaluate(expression)).toBe(14);
  });

  it('should evaluate trigonometric functions', () => {
    const expression = new MathJsExpression('sin(0)');
    expect(adapter.evaluate(expression)).toBe(0);
  });

  it('should evaluate logarithmic functions', () => {
    const expression = new MathJsExpression('log(10)');
    expect(adapter.evaluate(expression)).toBe(1);
  });

  it('should validate expressions', () => {
    const validExpression = new MathJsExpression('2 + 3');
    const invalidExpression = new MathJsExpression('2 + * 3');

    expect(adapter.isValid(validExpression)).toBe(true);
    expect(adapter.isValid(invalidExpression)).toBe(false);
  });

  it('should format numbers with precision', () => {
    expect(adapter.formatNumber(3.141592653589793)).toBe('3.1415926535898');
  });

  it('should throw error for invalid expressions', () => {
    const expression = new MathJsExpression('2 + * 3');
    expect(() => adapter.evaluate(expression)).toThrow();
  });
}); 