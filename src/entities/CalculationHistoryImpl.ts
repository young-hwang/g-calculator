import type { CalculationHistory } from './CalculationHistory';
import type { CalculationResult } from './CalculationResult';

export class CalculationHistoryImpl implements CalculationHistory {
  private results: CalculationResult[] = [];

  add(result: CalculationResult): void {
    this.results.push(result);
  }

  getAll(): CalculationResult[] {
    return [...this.results];
  }

  getRecent(n: number): CalculationResult[] {
    return this.results.slice(-n);
  }

  clear(): void {
    this.results = [];
  }

  length(): number {
    return this.results.length;
  }

  isEmpty(): boolean {
    return this.results.length === 0;
  }
} 