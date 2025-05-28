export interface CalculationResult {
  /**
   * 계산 결과값
   */
  readonly value: number;

  /**
   * 계산에 사용된 수식
   */
  readonly expression: string;

  /**
   * 계산 시간 (ISO 문자열)
   */
  readonly timestamp: string;

  /**
   * 계산이 성공했는지 여부
   */
  readonly success: boolean;

  /**
   * 계산 실패 시 에러 메시지
   */
  readonly error?: string;
} 