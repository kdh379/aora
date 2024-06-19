# Aora

미디어 업로드 및 공유 플랫폼 Aora 입니다.

## 기술 스택

- **코어**: React-Native Expo, TypeScript
- **스타일**: NativeWind (TailwindCSS)
- **상태 관리**: React Context API
- **폼 관리**: React-Hook-Form, Zod
- **컨벤션**: ESLint

## 디자인 노트

### 프로젝트 개요

Aora는 미디어 업로드 및 공유 플랫폼입니다. 이 프로젝트는 React-Native 학습용으로 구현되었으며, [JavaScript Mastery](https://youtu.be/ZBCUegTZF7M?si=XgesG3NlBQmU307F)의 영상을 참고하여 기존과 차별점을 두고 개발되었습니다. Sora AI를 사용하여 영상을 업로드하는 것 처럼 구현한 프로젝트로, 실제 Sora AI를 사용하지 않습니다.

### 주요 기능

- **사용자 인증**: 사용자 로그인 및 회원가입 기능을 제공합니다.
- **미디어 업로드**: 미디어 콘텐츠를 업로드하고 공유할 수 있습니다.
- **프로필**: 업로드한 미디어 확인 및 로그아웃 기능을 제공합니다.
- **북마크 기능**: 사용자가 관심 있는 콘텐츠를 북마크하여 쉽게 접근할 수 있습니다.

### 영상과 차별점

- 영상의 내용을 그대로 사용하지 않고, 다르게 구현한 부분을 아래 설명하였습니다.
- **ESLint**: 코드 컨벤션을 준수하기 위해 ESLint를 사용하였습니다.
- **TypeScript**: 타입 안정성을 위해 TypeScript를 사용하였습니다.
- **모듈화된 컴포넌트**: 대부분의 컴포넌트를 재사용성이 용이하도록 재구현하였습니다.
- **Form Validation**: React-Hook-Form과 Zod를 사용하여 사용자 입력을 검증하고, 오류를 사용자에게 명확히 전달합니다.
- **UI/UX 개선**: 로딩 Skeleton, 에러 메시지, Layout Shift, 화면 잘림 등의 UI/UX를 개선하였습니다.

## 개발 환경 설정

```bash
npm install -g yarn
npm install -g expo-cli
npx expo login
yarn install
yarn start
```

## 디렉토리 구조

```plaintext
aora/
│
├── app/
│   ├── (auth)/         # 인증 관련 화면
│   ├── (tabs)/         # 탭 내비게이션 화면
│   ├── _layout.tsx     # 레이아웃 컴포넌트
│   ├── index.tsx       # 메인 화면
│   └── search/         # 검색 화면
│
├── assets/             # 이미지, 아이콘 및 폰트 파일
├── components/         # 재사용 가능한 UI 컴포넌트
├── constants/          # 상수 정의 파일
├── context/            # 전역 상태 관리
├── lib/                # 라이브러리 및 유틸리티 함수
├── scripts/            # 프로젝트 설정 및 스크립트
├── styles/             # 전역 스타일 파일
├── types/              # 타입스크립트 타입 정의 파일
│
├── .env                # 환경 변수 파일
├── .eslintignore       # ESLint 무시 파일
├── .eslintrc.json      # ESLint 설정 파일
├── .gitignore          # Git 무시 파일
├── app.json            # Expo 설정 파일
├── babel.config.js     # Babel 설정 파일
├── package.json        # npm 패키지 설정 파일
├── tsconfig.json       # TypeScript 설정 파일
├── yarn.lock           # Yarn 종속성 잠금 파일
└── README.md           # 프로젝트 설명 파일
```
