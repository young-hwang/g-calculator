import type { CalculationHistory } from '../entities/CalculationHistory';
import type { CalculationResult } from '../entities/CalculationResult';

export class ManageHistoryUseCase {
  constructor(private readonly history: CalculationHistory) {}

  addResult(result: CalculationResult): void {
    this.history.add(result);
  }

  clearHistory(): void {
    this.history.clear();
  }

  getAllResults(): CalculationResult[] {
    return this.history.getAll();
  }
} 