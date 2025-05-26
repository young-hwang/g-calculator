export interface Expression {
  /**
   * 수식의 문자열 표현을 반환합니다.
   */
  toString(): string;

  /**
   * 수식이 유효한지 검사합니다.
   */
  isValid(): boolean;

  /**
   * 수식의 토큰 배열을 반환합니다.
   */
  getTokens(): string[];

  /**
   * 수식의 길이를 반환합니다.
   */
  length(): number;

  /**
   * 수식이 비어있는지 확인합니다.
   */
  isEmpty(): boolean;

  /**
   * 수식의 마지막 토큰을 반환합니다.
   */
  getLastToken(): string | null;

  /**
   * 수식의 마지막 토큰이 연산자인지 확인합니다.
   */
  isLastTokenOperator(): boolean;

  /**
   * 수식을 계산하여 결과값을 반환합니다.
   * @throws {Error} 수식이 유효하지 않거나 계산 중 오류가 발생한 경우
   */
  evaluate(): number;
} 