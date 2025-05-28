import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalStorageAdapter } from '../../src/adapters/storage/LocalStorageAdapter';
import { CalculationResultImpl } from '../../src/entities/CalculationResultImpl';

describe('LocalStorageAdapter', () => {
  let adapter: LocalStorageAdapter;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    adapter = new LocalStorageAdapter();
    mockLocalStorage = {};
    
    // Mock localStorage
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      mockLocalStorage[key] = value;
    });
    
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      return mockLocalStorage[key] || null;
    });
    
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation((key) => {
      delete mockLocalStorage[key];
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should save and load history', () => {
    const results = [
      CalculationResultImpl.success(42, '40 + 2'),
      CalculationResultImpl.success(43, '41 + 2')
    ];

    adapter.saveHistory(results);
    const loadedResults = adapter.loadHistory();

    expect(loadedResults).toHaveLength(2);
    expect(loadedResults[0].value).toBe(42);
    expect(loadedResults[1].value).toBe(43);
  });

  it('should return empty array when no history exists', () => {
    const results = adapter.loadHistory();
    expect(results).toEqual([]);
  });

  it('should clear history', () => {
    const results = [CalculationResultImpl.success(42, '40 + 2')];
    adapter.saveHistory(results);
    adapter.clearHistory();
    
    const loadedResults = adapter.loadHistory();
    expect(loadedResults).toEqual([]);
  });

  it('should limit history to maximum items', () => {
    const results = Array.from({ length: 150 }, (_, i) => 
      CalculationResultImpl.success(i, `${i} + 0`)
    );

    adapter.saveHistory(results);
    const loadedResults = adapter.loadHistory();

    expect(loadedResults).toHaveLength(100);
    expect(loadedResults[0].value).toBe(50);
    expect(loadedResults[99].value).toBe(149);
  });

  it('should handle invalid JSON data', () => {
    mockLocalStorage['calculator_history'] = 'invalid json';
    const results = adapter.loadHistory();
    expect(results).toEqual([]);
  });
}); 