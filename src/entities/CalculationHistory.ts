import type { CalculationResult } from './CalculationResult';

export interface CalculationHistory {
  /**
   * 계산 기록에 새로운 결과를 추가합니다.
   */
  add(result: CalculationResult): void;

  /**
   * 모든 계산 기록을 반환합니다.
   */
  getAll(): CalculationResult[];

  /**
   * 최근 n개의 계산 기록을 반환합니다.
   */
  getRecent(n: number): CalculationResult[];

  /**
   * 계산 기록을 모두 삭제합니다.
   */
  clear(): void;

  /**
   * 계산 기록의 길이를 반환합니다.
   */
  length(): number;

  /**
   * 계산 기록이 비어있는지 확인합니다.
   */
  isEmpty(): boolean;
} 