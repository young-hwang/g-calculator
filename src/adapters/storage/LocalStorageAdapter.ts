import type { CalculationResult } from '../../entities/CalculationResult';

export class LocalStorageAdapter {
  private static readonly HISTORY_KEY = 'calculator_history';
  private static readonly MAX_HISTORY_ITEMS = 100;

  saveHistory(results: CalculationResult[]): void {
    try {
      const serialized = JSON.stringify(results);
      localStorage.setItem(LocalStorageAdapter.HISTORY_KEY, serialized);
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }

  loadHistory(): CalculationResult[] {
    try {
      const serialized = localStorage.getItem(LocalStorageAdapter.HISTORY_KEY);
      if (!serialized) return [];
      
      const results = JSON.parse(serialized);
      if (!Array.isArray(results)) return [];
      
      // 최대 개수 제한
      return results.slice(-LocalStorageAdapter.MAX_HISTORY_ITEMS);
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  clearHistory(): void {
    try {
      localStorage.removeItem(LocalStorageAdapter.HISTORY_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }
} 