<img width="300" height="300" alt="logo" src="https://github.com/user-attachments/assets/4ca6be3b-249e-4ac7-aae5-2330abbbced8" />

# PromoKit

**이벤트 랜딩 페이지, 5분이면 충분합니다.** HTML/CSS 작성하고 버튼 좌표 조정하는 반복 작업을 끝내세요.

[English Docs](./README_EN.md)

## 문제

프론트엔드 개발자는 기획자로부터 반복적인 이벤트 랜딩 페이지 요청을 받습니다. 매번:
- HTML/CSS를 처음부터 작성
- 버튼 위치를 수동으로 계산
- 픽셀 단위로 좌표 조정
- 새로운 캠페인마다 반복

## 해결책

PromoKit은 기획자가 보내준 이미지 위에 버튼을 시각적으로 배치하고, 프로젝트 스택에 맞는 프로덕션 코드를 즉시 생성합니다.

```
1. 기획자에게 받은 이미지 업로드
2. 버튼 드래그 앤 드롭으로 배치
3. 생성된 코드를 프로젝트에 복사
```

---

## 주요 기능

### 버튼 에디터
27종의 버튼 프리셋을 제공합니다.

| 카테고리 | 종류 | 설명 |
|:-------:|:----:|:-----|
| 기본 버튼 | 11종 | SimpleBtn, PrimaryBtn, SecondaryBtn, SuccessBtn, DangerBtn, WarningBtn, DarkBtn, OutlineBtn, PillBtn, GhostBtn, NeonBtn |
| 그라데이션 | 10종 | GradationBtn, SunsetBtn, OceanBtn, ForestBtn, PurpleHazeBtn, FireBtn, AuroraBtn, MidnightBtn, RoseGoldBtn, CyberBtn |
| 애니메이션 | 6종 | BounceBtn, GlowBtn, PulseBtn, ShakeBtn, SlideBtn, RippleBtn |

**애니메이션 버튼 파라미터 조정**: 바운스 높이, 글로우 크기/강도, 펄스 스케일, 흔들림 거리 등 세부 조정 가능

### 텍스트 에디터
5종의 텍스트 프리셋 (H1~H3, P, Strong)
- 폰트, 크기, 굵기, 줄높이, 자간
- 색상, 정렬, 장식, 변형
- 그림자 효과

### 이미지 오버레이 에디터
12종의 이미지 스타일 프리셋

| 카테고리 | 종류 |
|:-------:|:-----|
| 기본 | SimpleImage, RoundedImage, CircleImage, PillImage |
| 액자 | BorderedImage, ShadowImage, NeonBorderImage, DoubleFrameImage |
| 장식 | PolaroidImage, GradientBorderImage, GlowImage, VintageImage |

### 버전 히스토리
- **Undo/Redo** 지원 (Ctrl+Z / Ctrl+Y)
- 히스토리 타임라인 시각화
- 특정 스냅샷으로 점프
- 동작 타입별 아이콘 표시

### 프로젝트 관리
- **자동 저장**: localStorage에 10초마다 자동 저장
- **JSON 내보내기/가져오기**: 프로젝트 파일 저장 및 복원
- **새 프로젝트**: SweetAlert2 확인 다이얼로그

---

## 코드 생성

프로젝트 환경에 맞는 코드를 생성합니다. 프레임워크와 스타일링 방식을 선택하세요.

### 지원 프레임워크 (10개)

| 프레임워크 | 설명 |
|:---------:|:-----|
| HTML/CSS/JS | 바닐라 구현, 의존성 없음 |
| React | TypeScript 함수형 컴포넌트 |
| Vue 3 | Composition API SFC |
| Svelte | 스벨트 컴포넌트 |
| Angular | 앵귤러 컴포넌트 |
| Solid | SolidJS 컴포넌트 |
| Preact | Preact 컴포넌트 |
| Astro | Astro 컴포넌트 |
| Qwik | Qwik 컴포넌트 |
| Lit | Lit 웹 컴포넌트 |

### 지원 스타일링 (16개)

| 스타일 | Vanilla | React | Vue |
|:------:|:-------:|:-----:|:---:|
| CSS | ✓ | ✓ | ✓ |
| SCSS | ✓ | ✓ | ✓ |
| Styled Components | - | ✓ | - |
| Emotion | - | ✓ | - |
| Tailwind CSS | ✓ | ✓ | ✓ |
| CSS Modules | ✓ | ✓ | ✓ |
| UnoCSS | ✓ | ✓ | ✓ |
| Panda CSS | - | ✓ | - |
| Vanilla Extract | - | ✓ | - |
| Stitches | - | ✓ | - |
| Less | ✓ | ✓ | ✓ |
| Stylus | ✓ | ✓ | ✓ |
| Bootstrap | ✓ | ✓ | ✓ |
| Bulma | ✓ | ✓ | ✓ |
| Chakra UI | - | ✓ | - |
| MUI (sx) | - | ✓ | - |

### 코드 품질 옵션

- **반응형**: 모바일/태블릿/데스크톱 미디어 쿼리 생성
- **접근성 (a11y)**: aria-label, 포커스 스타일, role 속성, aria-describedby
- **SEO**: Open Graph, Twitter Card 메타 태그

---

## 빠른 시작

```bash
git clone https://github.com/seadonggyun4/promo-kit.git
cd promo-kit
npm install
npm run dev
```

---

## 기술 스택

| 분류 | 기술 |
|:----:|:-----|
| 프레임워크 | React 18 + TypeScript + Vite |
| 상태관리 | Zustand |
| 스타일링 | Styled Components |
| 드래그앤드롭 | @dnd-kit/core |
| 다국어 | react-i18next (한국어, 영어, 일본어) |
| 알림 | SweetAlert2, seo-toast |

---

## 프로젝트 구조

```
src/
├── app/                    # 앱 설정, 라우팅
├── pages/                  # 페이지
│   ├── home/              # 랜딩 페이지
│   └── editor/            # 에디터 페이지
├── widgets/                # 레이아웃 위젯
│   ├── editor-panel/      # 편집 패널 (메뉴 + 콘텐츠)
│   └── preview-panel/     # 미리보기 패널
├── features/               # 기능 모듈
│   ├── button-editor/     # 버튼 편집
│   ├── text-editor/       # 텍스트 편집
│   ├── image-overlay-editor/  # 이미지 오버레이 편집
│   ├── image-upload/      # 이미지 업로드
│   ├── download/          # 코드 생성 및 다운로드
│   └── version-history/   # 히스토리 패널
├── entities/               # 도메인 엔티티
│   ├── button/            # 버튼 스타일 컴포넌트
│   ├── text/              # 텍스트 스타일 컴포넌트
│   └── image-overlay/     # 이미지 오버레이 스타일
└── shared/                 # 공유 리소스
    ├── store/             # Zustand 스토어
    ├── types/             # TypeScript 타입
    ├── constants/         # 상수
    ├── config/            # i18n 설정
    └── ui/                # 공유 UI 컴포넌트
```

---

## 라이선스

MIT
