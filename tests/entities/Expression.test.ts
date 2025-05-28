import { describe, it, expect } from 'vitest';
import { ExpressionImpl } from '../../src/entities/ExpressionImpl';

describe('Expression', () => {
  it('should create an empty expression', () => {
    const expression = new ExpressionImpl();
    expect(expression.isEmpty()).toBe(true);
    expect(expression.toString()).toBe('');
  });

  it('should create an expression from a string', () => {
    const expression = new ExpressionImpl('1 + 2');
    expect(expression.toString()).toBe('1+2');
    expect(expression.getTokens()).toEqual(['1', '+', '2']);
  });

  it('should validate expressions correctly', () => {
    const validExpressions = [
      '1 + 2',
      '(1 + 2) * 3',
      '1.5 + 2.7',
      '2^3',
      '10 % 3',
    ];

    const invalidExpressions = [
      '1 +',
      '+ 2',
      '(1 + 2',
      '1 + )',
      '1 + + 2',
    ];

    validExpressions.forEach(expr => {
      const expression = new ExpressionImpl(expr);
      expect(expression.isValid()).toBe(true);
    });

    invalidExpressions.forEach(expr => {
      const expression = new ExpressionImpl(expr);
      expect(expression.isValid()).toBe(false);
    });
  });

  it('should check if last token is operator', () => {
    const expression = new ExpressionImpl('1 + 2');
    expect(expression.isLastTokenOperator()).toBe(false);

    const expressionWithOperator = new ExpressionImpl('1 +');
    expect(expressionWithOperator.isLastTokenOperator()).toBe(true);
  });

  it('should get last token', () => {
    const expression = new ExpressionImpl('1 + 2');
    expect(expression.getLastToken()).toBe('2');

    const emptyExpression = new ExpressionImpl();
    expect(emptyExpression.getLastToken()).toBe(null);
  });
}); 