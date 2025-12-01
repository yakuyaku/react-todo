# React Todo App

실전 수준의 기능을 갖춘 Todo 애플리케이션입니다. React, TypeScript, Zustand, Tailwind CSS를 사용하여 구현되었습니다.

## 주요 기능

### Todo 관리
- ✅ Todo 추가, 수정, 삭제
- ✅ 완료/미완료 토글
- ✅ 우선순위 설정 (낮음, 보통, 높음)
- ✅ 마감일 설정
- ✅ 태그 기능
- ✅ 상세 설명 추가

### 필터링 & 정렬
- 🔍 실시간 검색 (제목, 설명, 태그)
- 📊 필터: 전체, 진행중, 완료
- 🔢 정렬: 날짜순, 우선순위순, 가나다순

### 통계 및 시각화
- 📈 실시간 통계 (전체, 진행중, 완료, 높은 우선순위, 기한 초과)
- 🎨 우선순위별 색상 구분
- ⏰ 기한 초과 항목 강조 표시

### 사용자 경험
- 💾 LocalStorage 자동 저장
- 🔔 Toast 알림 시스템
- 🎭 로딩 및 에러 처리
- 📱 반응형 디자인
- ⚡ 성능 모니터링 (개발 모드)

## 기술 스택

### 핵심 라이브러리
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성
- **Vite 7.2.4** - 빌드 도구
- **Zustand 5.0.9** - 상태 관리
- **React Router 7.9.6** - 라우팅

### 스타일링
- **Tailwind CSS 3.4.18** - 유틸리티 CSS 프레임워크
- **PostCSS 8.5.6** - CSS 후처리
- **Styled Components 6.1.19** - CSS-in-JS (선택적)

### 개발 도구
- **ESLint** - 코드 품질 관리
- **TypeScript ESLint** - TypeScript 린팅
- **Rollup Plugin Visualizer** - 번들 분석

## 프로젝트 구조

```
src/
├── components/
│   ├── common/              # 재사용 가능한 공통 컴포넌트
│   │   ├── Button/          # 버튼 컴포넌트
│   │   ├── Card/            # 카드 컴포넌트
│   │   ├── Input/           # 입력 컴포넌트
│   │   ├── Modal/           # 모달 컴포넌트
│   │   ├── Tabs/            # 탭 컴포넌트
│   │   ├── ErrorBoundary/   # 에러 경계 컴포넌트
│   │   ├── Toast/           # Toast 알림
│   │   ├── LoadingSpinner/  # 로딩 스피너
│   │   └── PerformanceMonitor.tsx  # 성능 모니터
│   └── todo/                # Todo 관련 컴포넌트
│       ├── TodoForm.tsx     # Todo 추가 폼
│       ├── TodoList.tsx     # Todo 목록
│       ├── TodoItem.tsx     # Todo 항목
│       ├── TodoFilters.tsx  # 필터/검색/정렬
│       ├── TodoStats.tsx    # 통계 대시보드
│       └── TodoExport.tsx   # 내보내기 기능
├── hooks/
│   ├── useTodoFilters.ts    # 필터링/정렬 로직
│   ├── useTodoStats.ts      # 통계 계산
│   └── useToast.ts          # Toast 알림 훅
├── stores/
│   ├── useTodoStore.ts      # Todo 상태 관리
│   └── useToastStore.ts     # Toast 상태 관리
├── types/
│   └── todo.ts              # TypeScript 타입 정의
├── pages/
│   └── TodoPage.tsx         # 메인 Todo 페이지
├── App.tsx                  # 루트 컴포넌트
├── main.tsx                 # 앱 진입점
└── index.css                # 글로벌 스타일 (Tailwind)
```

## 설치 및 실행

### 요구사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (http://localhost:5173)
npm run dev
```

### 프로덕션 빌드

```bash
# TypeScript 타입 체크 + 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 기타 명령어

```bash
# ESLint 검사
npm run lint

# TypeScript 타입 체크만 실행
npm run type-check

# 번들 분석
npm run analyze
```

## 주요 컴포넌트 설명

### 공통 컴포넌트

#### Button
다양한 스타일과 크기를 지원하는 재사용 가능한 버튼 컴포넌트
- 변형: primary, secondary, danger, success, outline
- 크기: sm, md, lg
- 로딩 상태 지원

#### Card
컨텐츠를 감싸는 카드 컴포넌트
- 변형: default, bordered, elevated
- 패딩: none, sm, md, lg

#### Input
폼 입력 필드 컴포넌트
- 라벨, 에러 메시지, 헬퍼 텍스트 지원
- forwardRef 지원

#### Modal
전체 화면 모달 컴포넌트
- Portal을 사용한 body 렌더링
- ESC 키로 닫기
- 배경 클릭으로 닫기
- 크기: sm, md, lg, xl

#### Toast
알림 메시지 표시
- 타입: success, error, warning, info
- 자동 삭제 (3초)
- 우상단 고정 위치

### Todo 컴포넌트

#### TodoForm
새로운 Todo를 추가하는 폼
- 제목, 설명, 우선순위, 마감일, 태그 입력

#### TodoList
필터링된 Todo 목록 표시
- 빈 상태 처리

#### TodoItem
개별 Todo 항목
- 인라인 수정 기능
- 완료/미완료 토글
- 우선순위 색상 표시
- 기한 초과 강조

#### TodoFilters
검색, 필터, 정렬 컨트롤
- 실시간 검색
- 완료된 항목 일괄 삭제

#### TodoStats
Todo 통계 대시보드
- 5가지 주요 지표 표시

## 상태 관리

### Zustand 사용
- **useTodoStore**: Todo 목록, 필터, 정렬, 검색 상태
- **useToastStore**: Toast 알림 상태

### LocalStorage 영속화
- Todo 데이터는 자동으로 LocalStorage에 저장
- 페이지 새로고침 후에도 데이터 유지

## 스타일링

### Tailwind CSS
유틸리티 우선 CSS 프레임워크 사용
- 빠른 개발 속도
- 일관된 디자인 시스템
- 커스텀 애니메이션 (fade-in)

### 반응형 디자인
- 모바일: 단일 컬럼
- 태블릿: 2컬럼
- 데스크톱: 3컬럼 (폼/필터 | Todo 리스트)

## 성능 최적화

### 빌드 최적화
- **Code Splitting**: React, Zustand 등 벤더 코드 분리
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Minification**: esbuild를 사용한 코드 압축
- **번들 분석**: visualizer 플러그인으로 번들 크기 모니터링

### 런타임 최적화
- **useMemo**: 필터링/정렬 로직 메모이제이션
- **React.memo**: TodoItem 컴포넌트 메모이제이션
- **성능 모니터**: 개발 모드에서 FPS 및 메모리 사용량 모니터링

## 타입 안정성

모든 컴포넌트와 함수에 TypeScript 타입 정의
- 인터페이스 기반 설계
- 엄격한 타입 체크
- Type-safe 상태 관리

## 에러 처리

- ErrorBoundary를 통한 런타임 에러 캐치
- Toast를 통한 사용자 친화적 피드백
- 타입 시스템을 통한 컴파일 타임 에러 방지

## 향후 개선 계획

- [ ] 백엔드 연동 (REST API / GraphQL)
- [ ] 사용자 인증 및 권한 관리
- [ ] Todo 공유 기능
- [ ] 드래그 앤 드롭 정렬
- [ ] 다크 모드
- [ ] 다국어 지원 (i18n)
- [ ] PWA 지원
- [ ] 단위 테스트 및 E2E 테스트

## 라이선스

MIT

## 작성자

React Todo App - 실전 프로젝트
