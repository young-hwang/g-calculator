import type { Expression } from '../../entities/Expression';
import { MathJsAdapter } from './MathJsAdapter';

export class MathJsExpression implements Expression {
  private tokens: string[] = [];
  private adapter: MathJsAdapter;

  constructor(initialExpression: string = '') {
    this.adapter = MathJsAdapter.getInstance();
    if (initialExpression) {
      this.tokens = this.tokenize(initialExpression);
    }
  }

  private tokenize(expression: string): string[] {
    const trimmed = expression.replace(/\s+/g, '');
    const regex = /(\d+\.?\d*|[+\-*/()^%]|sin|cos|tan|log|ln|sqrt|pi|e)/g;
    return trimmed.match(regex) || [];
  }

  toString(): string {
    return this.tokens.join('');
  }

  isValid(): boolean {
    return this.adapter.isValid(this);
  }

  getTokens(): string[] {
    return [...this.tokens];
  }

  length(): number {
    return this.tokens.length;
  }

  isEmpty(): boolean {
    return this.tokens.length === 0;
  }

  getLastToken(): string | null {
    return this.tokens[this.tokens.length - 1] || null;
  }

  isLastTokenOperator(): boolean {
    const lastToken = this.getLastToken();
    return lastToken ? ['+', '-', '*', '/', '^', '%'].includes(lastToken) : false;
  }

  evaluate(): number {
    return this.adapter.evaluate(this);
  }
} 