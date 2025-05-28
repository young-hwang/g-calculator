# 공학용 계산기 웹앱

React와 TypeScript를 사용한 공학용 계산기 웹앱입니다.

## 기능

- 기본 수학 연산 (덧셈, 뺄셈, 곱셈, 나눗셈, 제곱, 제곱근)
- 공학용 함수 (삼각함수, 로그함수, 지수함수)
- 괄호를 사용한 복잡한 수식 계산
- 계산 기록 저장 및 조회
- 일반/공학용 계산기 모드 전환
- 다크/라이트 모드 지원
- 반응형 디자인

## 기술 스택

- React 18.2.0
- TypeScript
- Chakra UI
- Math.js
- Vite
- Vitest

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- pnpm 8.0.0 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/g-calculator.git
cd g-calculator

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 테스트 실행

```bash
# 단위 테스트 실행
pnpm test

# 커버리지 리포트 생성
pnpm test:coverage
```

### 빌드

```bash
pnpm build
```

## 프로젝트 구조

```
src/
├── entities/           # 핵심 비즈니스 로직과 데이터 모델
├── usecases/           # 애플리케이션 특화 비즈니스 규칙
├── adapters/           # 외부 라이브러리와의 인터페이스
├── frameworks/         # UI 컴포넌트, 상태 관리 등
└── main.tsx           # 앱 진입점
```

## 라이선스

MIT
