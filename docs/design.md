# 공학용 계산기 웹앱 설계 문서

## 1. 개요

이 문서는 공학용 계산기 웹앱의 설계를 정의합니다. 이 웹앱은 기본 수학 연산과 공학용 함수를 지원하는 계산기로, 사용자 친화적인 인터페이스와 다크/라이트 모드, 반응형 디자인을 제공합니다.

### 1.1 목적

이 웹앱의 주요 목적은 다음과 같습니다:
- 기본 수학 연산 및 공학용 함수 계산 제공
- 복잡한 수식 계산 지원
- 계산 기록 저장 및 조회 기능 제공
- 다크/라이트 모드와 반응형 디자인으로 다양한 환경에서 사용 가능

### 1.2 범위

이 웹앱은 다음 기능을 포함합니다:
- 기본 연산: 덧셈, 뺄셈, 곱셈, 나눗셈, 제곱, 제곱근
- 공학용 함수: 삼각함수, 로그함수, 지수함수
- 괄호를 사용한 복잡한 수식 계산
- 계산 기록 저장 및 조회
- 일반 계산기와 공학용 계산기 모드 전환
- 다크/라이트 모드 지원
- 반응형 디자인

## 2. 아키텍처 설계

공학용 계산기 웹앱은 Clean Architecture와 SOLID 원칙을 기반으로 설계됩니다. 이를 통해 코드의 유지보수성, 테스트 용이성, 확장성을 향상시킵니다.

### 2.1 아키텍처 개요

```mermaid
graph TD
    A[UI Layer] --> B[Application Layer]
    B --> C[Domain Layer]
    B --> D[Infrastructure Layer]
    D --> C
```

- **UI Layer**: 사용자 인터페이스 컴포넌트 (React 컴포넌트)
- **Application Layer**: 사용자 케이스 구현 (계산 수행, 히스토리 관리 등)
- **Domain Layer**: 핵심 비즈니스 로직과 엔티티 (계산 모델, 수식 표현 등)
- **Infrastructure Layer**: 외부 라이브러리와의 인터페이스 (Math.js 어댑터 등)

### 2.2 Clean Architecture 적용

Clean Architecture에 따라 프로젝트 구조를 다음과 같이 구성합니다:

```
src/
├── entities/           # 핵심 비즈니스 로직과 데이터 모델
├── usecases/           # 애플리케이션 특화 비즈니스 규칙
├── adapters/           # 외부 라이브러리와의 인터페이스
├── frameworks/         # UI 컴포넌트, 상태 관리 등
└── main.tsx            # 앱 진입점
```

### 2.3 SOLID 원칙 적용

- **단일 책임 원칙(SRP)**: 각 컴포넌트와 함수는 하나의 책임만 가집니다.
- **개방-폐쇄 원칙(OCP)**: 새로운 기능을 추가할 때 기존 코드를 수정하지 않고 확장할 수 있도록 설계합니다.
- **리스코프 치환 원칙(LSP)**: 상위 타입의 객체를 하위 타입의 객체로 대체해도 프로그램의 정확성이 유지되도록 합니다.
- **인터페이스 분리 원칙(ISP)**: 클라이언트가 사용하지 않는 인터페이스에 의존하지 않도록 합니다.
- **의존성 역전 원칙(DIP)**: 고수준 모듈이 저수준 모듈에 의존하지 않도록 추상화에 의존합니다.

## 3. 컴포넌트 설계

### 3.1 엔티티 (Entities)

#### 3.1.1 Expression

수학 표현식을 나타내는 엔티티입니다.

```typescript
// src/entities/Expression.ts
export interface Expression {
  value: string;
  evaluate(): number;
  toString(): string;
}
```

#### 3.1.2 CalculationResult

계산 결과를 나타내는 엔티티입니다.

```typescript
// src/entities/CalculationResult.ts
export interface CalculationResult {
  expression: string;
  result: number;
  timestamp: Date;
}
```

#### 3.1.3 CalculationHistory

계산 기록을 나타내는 엔티티입니다.

```typescript
// src/entities/CalculationHistory.ts
import { CalculationResult } from './CalculationResult';

export interface CalculationHistory {
  items: CalculationResult[];
  add(item: CalculationResult): void;
  clear(): void;
  getItems(): CalculationResult[];
}
```

### 3.2 유스케이스 (Usecases)

#### 3.2.1 CalculateExpression

수학 표현식을 계산하는 유스케이스입니다.

```typescript
// src/usecases/CalculateExpression.ts
import { Expression } from '../entities/Expression';
import { CalculationResult } from '../entities/CalculationResult';

export interface CalculateExpressionUseCase {
  execute(expression: Expression): CalculationResult;
}
```

#### 3.2.2 ManageHistory

계산 기록을 관리하는 유스케이스입니다.

```typescript
// src/usecases/ManageHistory.ts
import { CalculationResult } from '../entities/CalculationResult';
import { CalculationHistory } from '../entities/CalculationHistory';

export interface ManageHistoryUseCase {
  addToHistory(result: CalculationResult): void;
  clearHistory(): void;
  getHistory(): CalculationHistory;
}
```

### 3.3 어댑터 (Adapters)

#### 3.3.1 MathJsAdapter

Math.js 라이브러리와의 인터페이스를 제공하는 어댑터입니다.

```typescript
// src/adapters/MathJsAdapter.ts
import { Expression } from '../entities/Expression';
import * as mathjs from 'mathjs';

export class MathJsExpression implements Expression {
  constructor(public value: string) {}

  evaluate(): number {
    return mathjs.evaluate(this.value);
  }

  toString(): string {
    return this.value;
  }
}
```

### 3.4 프레임워크 (Frameworks)

#### 3.4.1 UI 컴포넌트

```typescript
// src/frameworks/ui/components/Calculator.tsx
import React from 'react';
import { useCalculator } from '../hooks/useCalculator';

export const Calculator: React.FC = () => {
  const { 
    expression, 
    result, 
    history, 
    handleButtonClick, 
    handleClear, 
    handleCalculate,
    handleModeToggle,
    isEngineeringMode
  } = useCalculator();

  return (
    // 계산기 UI 구현
  );
};
```

#### 3.4.2 상태 관리

```typescript
// src/frameworks/state/calculatorContext.tsx
import React, { createContext, useReducer } from 'react';
import { CalculationResult } from '../../entities/CalculationResult';

// 상태 타입 정의
interface CalculatorState {
  expression: string;
  result: string;
  history: CalculationResult[];
  isEngineeringMode: boolean;
  isDarkMode: boolean;
}

// 액션 타입 정의
type CalculatorAction =
  | { type: 'SET_EXPRESSION'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: CalculationResult }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'TOGGLE_MODE' }
  | { type: 'TOGGLE_THEME' };

// 리듀서 함수
const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  // 액션 처리 로직
};

// 컨텍스트 생성
export const CalculatorContext = createContext<{
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}>({
  state: {
    expression: '',
    result: '',
    history: [],
    isEngineeringMode: false,
    isDarkMode: false,
  },
  dispatch: () => null,
});

// 컨텍스트 프로바이더
export const CalculatorProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    expression: '',
    result: '',
    history: [],
    isEngineeringMode: false,
    isDarkMode: false,
  });

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
};
```

## 4. 사용자 인터페이스 설계

### 4.1 레이아웃

계산기는 다음과 같은 레이아웃으로 구성됩니다:

#### 와이어프레임

![계산기 와이어프레임](./assets/calculator-wireframe.svg)

이 와이어프레임은 다음 구성 요소를 보여줍니다:
- 상단 모드 전환 버튼 (일반/공학용)
- 다크/라이트 모드 토글 버튼
- 표현식 입력 및 결과 출력 영역
- 기본 키패드 영역 (숫자, 연산자, 괄호 등)
- 공학용 키패드 영역 (삼각함수, 로그 등)
- 계산 기록 영역


### 4.2 테마

다크 모드와 라이트 모드를 지원하며, Chakra UI의 테마 시스템을 활용합니다.

```typescript
// src/frameworks/ui/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    // 색상 정의
  },
  components: {
    // 컴포넌트 스타일 정의
  },
});

export default theme;
```

### 4.3 반응형 디자인

Chakra UI의 반응형 유틸리티를 활용하여 다양한 화면 크기에 대응합니다.

```typescript
// 예시: 반응형 버튼 크기
<Button
  size={{ base: 'sm', md: 'md', lg: 'lg' }}
  // 기타 속성
>
  7
</Button>
```

## 5. 테스트 전략

### 5.1 단위 테스트

각 엔티티, 유스케이스, 어댑터에 대한 단위 테스트를 작성합니다.

```typescript
// src/entities/__tests__/Expression.test.ts
import { MathJsExpression } from '../../adapters/MathJsAdapter';

describe('Expression', () => {
  it('should evaluate simple expression correctly', () => {
    const expression = new MathJsExpression('2 + 3');
    expect(expression.evaluate()).toBe(5);
  });

  it('should evaluate complex expression correctly', () => {
    const expression = new MathJsExpression('(3 + 5) * 2 - 4 / 2');
    expect(expression.evaluate()).toBe(14);
  });
});
```

### 5.2 통합 테스트

유스케이스와 어댑터 간의 상호작용을 테스트합니다.

```typescript
// src/usecases/__tests__/CalculateExpression.test.ts
import { CalculateExpressionImpl } from '../CalculateExpressionImpl';
import { MathJsExpression } from '../../adapters/MathJsAdapter';

describe('CalculateExpression', () => {
  it('should calculate expression and return result', () => {
    const calculateExpression = new CalculateExpressionImpl();
    const expression = new MathJsExpression('2 + 3');
    const result = calculateExpression.execute(expression);
    
    expect(result.expression).toBe('2 + 3');
    expect(result.result).toBe(5);
    expect(result.timestamp).toBeInstanceOf(Date);
  });
});
```

### 5.3 UI 테스트

React Testing Library를 사용하여 UI 컴포넌트를 테스트합니다.

```typescript
// src/frameworks/ui/components/__tests__/Calculator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '../Calculator';
import { CalculatorProvider } from '../../state/calculatorContext';

describe('Calculator', () => {
  it('should render calculator', () => {
    render(
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    );
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should perform calculation when = is clicked', () => {
    render(
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    );
    
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
```

## 6. 배포 전략

### 6.1 개발 환경

- **로컬 개발**: Vite 개발 서버를 사용하여 로컬에서 개발
- **코드 품질**: ESLint와 Prettier를 사용하여 코드 품질 유지
- **테스트**: Vitest를 사용하여 테스트 자동화

### 6.2 CI/CD 파이프라인

GitHub Actions를 사용하여 CI/CD 파이프라인을 구성합니다.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: yarn install
      - name: Lint
        run: yarn lint
      - name: Test
        run: yarn test
      - name: Build
        run: yarn build
```

### 6.3 배포

Vercel을 사용하여 자동 배포를 구성합니다.

```
# vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

## 7. 결론

이 설계 문서는 공학용 계산기 웹앱의 아키텍처, 컴포넌트, 사용자 인터페이스, 테스트 및 배포 전략을 정의합니다. Clean Architecture와 SOLID 원칙을 적용하여 유지보수가 용이하고 확장 가능한 웹앱을 구현할 수 있습니다.

이 설계를 바탕으로 React 19.1, TypeScript, Chakra UI, Math.js 등의 최신 기술을 활용하여 고품질의 공학용 계산기 웹앱을 개발할 수 있습니다.