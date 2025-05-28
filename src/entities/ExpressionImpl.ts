import type { Expression } from './Expression';

export class ExpressionImpl implements Expression {
  private tokens: string[] = [];

  constructor(initialExpression: string = '') {
    if (initialExpression) {
      this.tokens = this.tokenize(initialExpression);
    }
  }

  private tokenize(expression: string): string[] {
    // 공백 제거
    const trimmed = expression.replace(/\s+/g, '');
    
    // 숫자, 연산자, 괄호를 토큰으로 분리
    const regex = /(\d+\.?\d*|[+\-*/()^%])/g;
    return trimmed.match(regex) || [];
  }

  toString(): string {
    return this.tokens.join('');
  }

  isValid(): boolean {
    if (this.isEmpty()) return true;

    // 괄호 짝이 맞는지 확인
    let bracketCount = 0;
    for (const token of this.tokens) {
      if (token === '(') bracketCount++;
      if (token === ')') bracketCount--;
      if (bracketCount < 0) return false;
    }
    if (bracketCount !== 0) return false;

    // 연산자 위치가 올바른지 확인
    for (let i = 0; i < this.tokens.length; i++) {
      const token = this.tokens[i];
      if (['+', '-', '*', '/', '^', '%'].includes(token)) {
        // 연산자 앞뒤로 숫자나 괄호가 있어야 함
        const prev = this.tokens[i - 1];
        const next = this.tokens[i + 1];
        if (!prev || !next) return false;
        if (!/[\d)]/.test(prev) || !/[\d(]/.test(next)) return false;
      }
    }

    return true;
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
    if (!this.isValid()) {
      throw new Error('Invalid expression');
    }

    const tokens = this.getTokens();
    const values: number[] = [];
    const operators: string[] = [];

    const precedence: { [key: string]: number } = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3,
      '%': 2
    };

    const applyOperator = (a: number, b: number, op: string): number => {
      switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': 
          if (b === 0) throw new Error('Division by zero');
          return a / b;
        case '^': return Math.pow(a, b);
        case '%': 
          if (b === 0) throw new Error('Modulo by zero');
          return a % b;
        default: throw new Error(`Unknown operator: ${op}`);
      }
    };

    for (const token of tokens) {
      if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          const b = values.pop()!;
          const a = values.pop()!;
          const op = operators.pop()!;
          values.push(applyOperator(a, b, op));
        }
        operators.pop(); // Remove '('
      } else if (['+', '-', '*', '/', '^', '%'].includes(token)) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== '(' &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          const b = values.pop()!;
          const a = values.pop()!;
          const op = operators.pop()!;
          values.push(applyOperator(a, b, op));
        }
        operators.push(token);
      } else {
        values.push(parseFloat(token));
      }
    }

    while (operators.length > 0) {
      const b = values.pop()!;
      const a = values.pop()!;
      const op = operators.pop()!;
      values.push(applyOperator(a, b, op));
    }

    if (values.length !== 1) {
      throw new Error('Invalid expression');
    }

    return values[0];
  }
} 