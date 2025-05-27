import type { Expression } from '../../entities/Expression';
import { create, all } from 'mathjs';

const math = create(all);

export class MathJsAdapter {
  private static instance: MathJsAdapter;

  private constructor() {}

  static getInstance(): MathJsAdapter {
    if (!MathJsAdapter.instance) {
      MathJsAdapter.instance = new MathJsAdapter();
    }
    return MathJsAdapter.instance;
  }

  evaluate(expression: Expression): number {
    try {
      const result = math.evaluate(expression.toString());
      if (typeof result !== 'number') {
        throw new Error('Expression evaluation did not return a number');
      }
      return result;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to evaluate expression');
    }
  }

  isValid(expression: Expression): boolean {
    try {
      math.parse(expression.toString());
      return true;
    } catch {
      return false;
    }
  }

  formatNumber(number: number): string {
    return math.format(number, { precision: 14 });
  }
} 