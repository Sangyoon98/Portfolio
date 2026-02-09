# Portfolio Simplification - Notion-like Design

## TL;DR

> **Quick Summary**: 현재 포트폴리오의 화려한 이펙트(framer-motion, 오로라 배경, 호버 효과)를 제거하고, 레퍼런스(resume.yowu.dev)처럼 단일 컬럼 타임라인 스타일의 가독성 높은 디자인으로 리뉴얼
> 
> **Deliverables**:
> - 모든 섹션 컴포넌트 단순화
> - 타임라인 스타일 프로젝트/경력 레이아웃
> - 레퍼런스 스타일 Hero 섹션
> - framer-motion 의존성 제거
> 
> **Estimated Effort**: Medium (13 TODO items across 5 waves)
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: globals.css 정리 -> HeroSection -> ProjectsSection -> 최종 검증

---

## Context

### Original Request
포트폴리오를 단조롭게 가져가서 가독성을 끌어올리고, 노션 포트폴리오처럼 보이게 하고 싶음. 레퍼런스: https://resume.yowu.dev/

### Interview Summary
**Key Discussions**:
- 다크 모드: 유지
- 프로젝트 상세 페이지: 유지 (메인에서는 이미지 없이 글로 요약, 상세 페이지에서 이미지와 상세 정보)
- 방명록/CrewTalk: 유지
- 레이아웃 스타일: 단일 컬럼, 타임라인 스타일, 깨끗한 타이포그래피
- Hero 섹션: 레퍼런스처럼 (프로필 이미지 + 이름 + 연락처)

**Research Findings**:
- 현재 스택: Next.js 16 + React 19 + Tailwind CSS 4 + framer-motion
- 제거할 이펙트: 오로라 배경, motion 애니메이션, 호버 scale/y 효과, staggerChildren, 그라데이션 카드, 블러 효과
- 레퍼런스 특징: 단일 컬럼, 수평 구분선, 타임라인 경력/프로젝트, 깔끔한 타이포그래피

### Gap Analysis (Self-Review)
**Identified Gaps** (addressed in guardrails):
- framer-motion 완전 제거 여부 -> 완전 제거 (package.json에서도 제거)
- 스킬 섹션 외부 이미지 아이콘 -> 유지 (현재 syvixor.com 아이콘 사용)
- 프로젝트 상세 페이지 스타일 -> 현재 유지 (메인만 변경)

---

## Work Objectives

### Core Objective
포트폴리오 웹사이트를 콘텐츠 중심의 단순하고 가독성 높은 디자인으로 리뉴얼

### Concrete Deliverables
- `src/app/globals.css`: 오로라 애니메이션 제거
- `src/components/HeroSection.tsx`: 레퍼런스 스타일로 변경
- `src/components/AboutSection.tsx`: 강점 카드 단순화
- `src/components/SkillsSection.tsx`: 심플한 태그 스타일
- `src/components/SkillCard.tsx`: framer-motion 제거 또는 파일 제거
- `src/components/ProjectsSection.tsx`: 타임라인 스타일
- `src/components/ProjectCard.tsx`: 타임라인 항목으로 변경 또는 제거
- `src/components/EducationSection.tsx`: 타임라인 스타일
- `src/components/CrewTalkSection.tsx`: 단순화
- `src/components/ContactSection.tsx`: 단순화
- `src/components/GuestbookSection.tsx`: framer-motion 제거
- `src/components/Header.tsx`: 단순화
- `src/components/Footer.tsx`: 단순화
- `src/app/projects/[slug]/page.tsx`: framer-motion 제거 (레이아웃 유지)
- `package.json`: framer-motion 의존성 제거

### Definition of Done
- [ ] `npm run build` 에러 없이 완료
- [ ] `npm run dev`로 실행 시 모든 섹션 정상 표시
- [ ] 다크 모드 전환 정상 작동
- [ ] 프로젝트 상세 페이지 링크 정상 작동
- [ ] 방명록 페이지 정상 작동

### Must Have
- 모든 섹션 콘텐츠 유지 (데이터 손실 없음)
- 다크/라이트 모드 전환 기능
- 프로젝트 상세 페이지 연결
- 반응형 레이아웃 (모바일 지원)

### Must NOT Have (Guardrails)
- framer-motion 애니메이션 효과 (완전 제거)
- 오로라/그라데이션 배경 효과
- 호버 시 scale/y 이동 효과
- staggerChildren 순차 등장 효과
- 카드 그라데이션 배경
- 블러 효과
- portfolio.ts 데이터 구조 변경 금지
- 프로젝트 상세 페이지 레이아웃 변경 금지

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (테스트 프레임워크 없음)
- **User wants tests**: Manual verification (시각적 검증)
- **Framework**: None

### Manual Verification Procedure

각 TODO 완료 후 다음을 확인:
1. `npm run dev` 실행
2. 브라우저에서 `http://localhost:3000` 접속
3. 해당 섹션 시각적 확인
4. 다크 모드 토글 테스트
5. 모바일 뷰 (개발자 도구 반응형 모드) 확인

### Final Build Verification
```bash
npm run build && npm run start
```
- 빌드 에러 없음 확인
- 프로덕션 모드에서 전체 페이지 동작 확인

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - Start Immediately):
├── Task 1: globals.css 정리 (오로라 애니메이션 제거)
└── Task 2: framer-motion 의존성 제거 준비

Wave 2 (Profile Section - After Wave 1):
├── Task 3: HeroSection 리뉴얼
├── Task 4: AboutSection 리뉴얼
└── Task 5: Header 리뉴얼

Wave 3 (Content Sections - After Wave 2):
├── Task 6: SkillsSection 리뉴얼
├── Task 7: ProjectsSection 리뉴얼 (타임라인)
└── Task 8: EducationSection 리뉴얼

Wave 4 (Remaining Sections - After Wave 3):
├── Task 9: CrewTalkSection 리뉴얼
├── Task 10: ContactSection 리뉴얼
└── Task 11: Footer 리뉴얼

Wave 5 (Cleanup - Final):
└── Task 12: framer-motion 완전 제거 및 빌드 검증

Critical Path: Task 1 -> Task 3 -> Task 7 -> Task 12
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3-11 | 2 |
| 2 | None | 12 | 1 |
| 3 | 1 | 12 | 4, 5 |
| 4 | 1 | 12 | 3, 5 |
| 5 | 1 | 12 | 3, 4 |
| 6 | 3,4,5 | 12 | 7, 8 |
| 7 | 3,4,5 | 12 | 6, 8 |
| 8 | 3,4,5 | 12 | 6, 7 |
| 9 | 6,7,8 | 12 | 10, 11 |
| 10 | 6,7,8 | 12 | 9, 11 |
| 11 | 6,7,8 | 12 | 9, 10 |
| 12 | 9,10,11 | None | None (final) |

---

## TODOs

- [ ] 1. globals.css 정리 - 오로라 애니메이션 제거

  **What to do**:
  - `@keyframes auroraMove` 애니메이션 제거
  - `@keyframes float` 애니메이션 제거
  - `.aurora-blob` 클래스 제거
  - 기본 배경색/전경색 유지

  **Must NOT do**:
  - :root 색상 변수 제거 금지
  - 다크 모드 CSS 변수 제거 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일 CSS 수정, 간단한 삭제 작업
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: CSS 스타일링 관련 작업

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 3-11
  - **Blocked By**: None

  **References**:
  - `src/app/globals.css:36-51` - 제거할 keyframes와 aurora-blob 클래스

  **Acceptance Criteria**:
  - [ ] `@keyframes float`, `@keyframes auroraMove`, `.aurora-blob` 클래스가 globals.css에서 제거됨
  - [ ] `:root` 색상 변수와 `.dark` 클래스는 그대로 유지됨
  - [ ] `npm run dev` 실행 시 에러 없음

  **Commit**: YES
  - Message: `style: remove aurora and float animations from globals.css`
  - Files: `src/app/globals.css`

---

- [ ] 2. framer-motion 제거 준비 - 각 컴포넌트에서 import 제거

  **What to do**:
  - 모든 컴포넌트에서 `import { motion } from "framer-motion"` 제거
  - `import { AnimatePresence } from "framer-motion"` 제거 (GuestbookSection)
  - `<motion.div>`, `<motion.section>` 등을 일반 `<div>`, `<section>`으로 변경
  - `initial`, `whileInView`, `whileHover`, `viewport`, `transition`, `variants` props 제거
  - 각 컴포넌트 파일별로 순차적으로 수정
  - **프로젝트 상세 페이지**(`/projects/[slug]/page.tsx`)에서도 framer-motion 제거

  **Must NOT do**:
  - 컴포넌트 구조 변경 금지 (이 단계에서는 framer-motion만 제거)
  - 스타일 변경 금지 (다른 Task에서 처리)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: 반복적인 코드 수정 작업, 패턴 기반
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: React 컴포넌트 수정

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 12
  - **Blocked By**: None

  **References**:
  - `src/components/HeroSection.tsx:3,42-51` - motion import 및 사용처
  - `src/components/AboutSection.tsx:3,41-51,174-227` - motion 사용처
  - `src/components/SkillsSection.tsx:3,73-84,99-115` - motion 사용처
  - `src/components/ProjectsSection.tsx:3,30-41,56-67` - motion 사용처
  - `src/components/ProjectCard.tsx:5,42-51,183` - motion 사용처
  - `src/components/GuestbookSection.tsx:4,97-107,118-123,166-181,206-228` - motion, AnimatePresence 사용처 **(추가)**
  - `src/components/SkillCard.tsx:3,16-24,36` - motion.div 사용처 **(추가)**
  - `src/app/projects/[slug]/page.tsx:4,63-75,144-161,165-200,290-314,354-426,431-435` - motion 전역 사용 **(추가)**

  **Acceptance Criteria**:
  - [ ] 모든 컴포넌트에서 `framer-motion` import 문 제거됨
  - [ ] `<motion.*>` 태그가 일반 HTML 태그로 변경됨
  - [ ] `AnimatePresence` 제거됨 (GuestbookSection)
  - [ ] motion 관련 props (initial, whileInView 등) 모두 제거됨
  - [ ] 프로젝트 상세 페이지에서도 motion 제거됨
  - [ ] TypeScript 에러 없음

  **Commit**: YES (groups with Task 3-11)
  - Message: `refactor: remove framer-motion from all components`
  - Files: All component files, `/projects/[slug]/page.tsx`

---

- [ ] 3. HeroSection 리뉴얼 - 레퍼런스 스타일

  **What to do**:
  - 오로라 배경 div 제거
  - 레퍼런스 스타일로 변경: 프로필 이미지 + 이름 + 연락처 나열
  - 프로필 이미지는 AboutSection에서 가져옴 (profile.avatar)
  - 연락처: email, github, blog 등을 텍스트 링크로 표시
  - 간단한 자기소개 텍스트 (profile.summary)

  **Must NOT do**:
  - profile 데이터 구조 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI/UX 중심의 컴포넌트 리뉴얼
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 레이아웃 및 스타일링 전문

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Tasks 6-11, 12
  - **Blocked By**: Task 1

  **References**:
  - `src/components/HeroSection.tsx` - 현재 Hero 섹션 전체
  - `src/data/portfolio.ts:50-69` - profile 데이터 (name, summary, contact)
  - 레퍼런스: https://resume.yowu.dev/ 상단 프로필 영역 참고

  **Acceptance Criteria**:
  - [ ] 오로라 배경 완전 제거됨
  - [ ] 프로필 이미지가 좌측에 표시됨
  - [ ] 이름, 태그라인이 명확하게 표시됨
  - [ ] 연락처 링크 (email, github, blog)가 텍스트로 나열됨
  - [ ] 깔끔한 타이포그래피, 충분한 여백
  - [ ] 다크 모드에서도 가독성 유지

  **Commit**: YES (groups with 4, 5)
  - Message: `feat: redesign HeroSection with reference-style layout`
  - Files: `src/components/HeroSection.tsx`

---

- [ ] 4. AboutSection 리뉴얼 - 강점 카드 단순화

  **What to do**:
  - 현재 그라데이션 카드를 단순한 리스트 형태로 변경
  - 호버 효과 제거
  - 아이콘 + 제목 + 설명 형태로 간단하게
  - 프로필 이미지와 소셜 링크는 HeroSection으로 이동했으므로 제거
  - "About Me" 섹션은 자기소개 텍스트 + 강점 리스트로 구성

  **Must NOT do**:
  - strengths 데이터 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI 컴포넌트 단순화
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 카드 디자인 단순화

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 5)
  - **Blocks**: Tasks 6-11, 12
  - **Blocked By**: Task 1

  **References**:
  - `src/components/AboutSection.tsx` - 현재 About 섹션 전체
  - `src/components/AboutSection.tsx:9-38` - strengths 데이터
  - `src/data/portfolio.ts:57` - detailedSummary 사용 가능

  **Acceptance Criteria**:
  - [ ] 그라데이션 배경 카드 제거됨
  - [ ] 호버 scale/y 효과 제거됨
  - [ ] 강점이 심플한 리스트 형태로 표시됨
  - [ ] 프로필 이미지/소셜 링크가 이 섹션에서 제거됨 (HeroSection으로 이동)
  - [ ] 깔끔한 타이포그래피 유지

  **Commit**: YES (groups with 3, 5)
  - Message: `feat: simplify AboutSection with clean list layout`
  - Files: `src/components/AboutSection.tsx`

---

- [ ] 5. Header 리뉴얼 - 단순화

  **What to do**:
  - 네비게이션을 깔끔한 텍스트 링크 형태로
  - 다크 모드 토글 버튼 유지
  - 불필요한 스타일 제거
  - 깔끔한 수평 레이아웃

  **Must NOT do**:
  - 다크 모드 토글 기능 제거 금지
  - 네비게이션 항목 제거 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 컴포넌트 스타일 수정
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 네비게이션 스타일링

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4)
  - **Blocks**: Tasks 6-11, 12
  - **Blocked By**: Task 1

  **References**:
  - `src/components/Header.tsx` - 현재 Header 컴포넌트

  **Acceptance Criteria**:
  - [ ] 네비게이션이 깔끔한 텍스트 링크로 표시됨
  - [ ] 다크 모드 토글 정상 작동
  - [ ] 스크롤 시 불필요한 효과 없음
  - [ ] 모바일에서 햄버거 메뉴 정상 작동 (있다면)

  **Commit**: YES (groups with 3, 4)
  - Message: `feat: simplify Header navigation style`
  - Files: `src/components/Header.tsx`

---

- [ ] 6. SkillsSection 리뉴얼 - 심플한 태그 스타일

  **What to do**:
  - 현재 카드 그리드를 심플한 태그/뱃지 형태로 변경
  - 카테고리별로 그룹화 (레퍼런스 참고)
  - 외부 이미지 아이콘 (syvixor.com) 제거하고 텍스트 태그로
  - staggerChildren 애니메이션 제거

  **Must NOT do**:
  - skills 데이터 구조 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI 레이아웃 변경
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 태그 스타일 디자인

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 8)
  - **Blocks**: Tasks 9-11, 12
  - **Blocked By**: Tasks 3, 4, 5

  **References**:
  - `src/components/SkillsSection.tsx` - 현재 Skills 섹션
  - `src/components/SkillCard.tsx` - 현재 스킬 카드 컴포넌트 (제거 또는 수정)
  - `src/data/portfolio.ts:71-141` - skills 데이터 구조
  - 레퍼런스: https://resume.yowu.dev/ SKILL 섹션 참고

  **Acceptance Criteria**:
  - [ ] 외부 이미지 아이콘 대신 텍스트 태그로 표시됨
  - [ ] 카테고리별로 그룹화되어 표시됨 (Language, Backend, Frontend 등)
  - [ ] staggerChildren 애니메이션 제거됨
  - [ ] 깔끔한 뱃지/태그 스타일
  - [ ] 다크 모드에서 가독성 유지

  **Commit**: YES (groups with 7, 8)
  - Message: `feat: redesign SkillsSection with simple tag style`
  - Files: `src/components/SkillsSection.tsx`, `src/components/SkillCard.tsx` (제거 가능)

---

- [ ] 7. ProjectsSection 리뉴얼 - 타임라인 스타일 (핵심)

  **What to do**:
  - 현재 카드 그리드를 타임라인 스타일로 변경
  - 좌측: 기간 (period)
  - 우측: 프로젝트명, 역할, 설명, 기술 스택
  - 이미지 제거 (메인 페이지에서는 텍스트만)
  - 상세 보기 링크 유지 (/projects/[slug])
  - GitHub, Play Store 링크 텍스트로 표시

  **Must NOT do**:
  - projects 데이터 구조 변경 금지
  - 프로젝트 상세 페이지 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 핵심 레이아웃 변경, 타임라인 스타일 구현
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 타임라인 레이아웃 디자인

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 8)
  - **Blocks**: Tasks 9-11, 12
  - **Blocked By**: Tasks 3, 4, 5

  **References**:
  - `src/components/ProjectsSection.tsx` - 현재 Projects 섹션
  - `src/components/ProjectCard.tsx` - 현재 프로젝트 카드 (타임라인 항목으로 변경)
  - `src/data/portfolio.ts:143-930` - projects 데이터 구조
  - 레퍼런스: https://resume.yowu.dev/ PROJECT 섹션 참고

  **Acceptance Criteria**:
  - [ ] 카드 그리드 대신 세로 타임라인 레이아웃으로 변경됨
  - [ ] 각 프로젝트: 기간, 제목, 역할, 설명, 기술 스택 표시
  - [ ] 프로젝트 이미지 제거됨 (메인 페이지에서)
  - [ ] 상세 보기 링크 정상 작동 (/projects/[slug])
  - [ ] GitHub, Play Store 링크가 텍스트로 표시됨
  - [ ] 수평 구분선으로 프로젝트 간 구분
  - [ ] 다크 모드에서 가독성 유지

  **Commit**: YES (groups with 6, 8)
  - Message: `feat: redesign ProjectsSection with timeline layout`
  - Files: `src/components/ProjectsSection.tsx`, `src/components/ProjectCard.tsx` (수정 또는 제거)

---

- [ ] 8. EducationSection 리뉴얼 - 타임라인 스타일

  **What to do**:
  - 타임라인 스타일로 변경 (프로젝트 섹션과 일관성)
  - 좌측: 기간, 우측: 교육/활동 내용
  - motion 애니메이션 제거

  **Must NOT do**:
  - activities 데이터 구조 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: ProjectsSection과 유사한 패턴 적용
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 타임라인 스타일 적용

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7)
  - **Blocks**: Tasks 9-11, 12
  - **Blocked By**: Tasks 3, 4, 5

  **References**:
  - `src/components/EducationSection.tsx` - 현재 Education 섹션
  - `src/data/portfolio.ts:932-961` - activities 데이터 구조

  **Acceptance Criteria**:
  - [ ] 타임라인 스타일로 변경됨 (ProjectsSection과 일관성)
  - [ ] 기간, 기관, 설명이 명확하게 표시됨
  - [ ] motion 애니메이션 제거됨
  - [ ] 다크 모드에서 가독성 유지

  **Commit**: YES (groups with 6, 7)
  - Message: `feat: redesign EducationSection with timeline layout`
  - Files: `src/components/EducationSection.tsx`

---

- [ ] 9. CrewTalkSection 리뉴얼 - 단순화

  **What to do**:
  - 현재 스타일 단순화
  - motion 애니메이션 제거
  - 깔끔한 인용문/텍스트 스타일

  **Must NOT do**:
  - 섹션 내용 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 컴포넌트 스타일 수정
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 스타일 단순화

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 10, 11)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 6, 7, 8

  **References**:
  - `src/components/CrewTalkSection.tsx` - 현재 CrewTalk 섹션

  **Acceptance Criteria**:
  - [ ] motion 애니메이션 제거됨
  - [ ] 깔끔한 스타일 유지
  - [ ] 다크 모드에서 가독성 유지

  **Commit**: YES (groups with 10, 11)
  - Message: `feat: simplify CrewTalkSection style`
  - Files: `src/components/CrewTalkSection.tsx`

---

- [ ] 10. ContactSection 리뉴얼 - 단순화

  **What to do**:
  - 연락처 정보를 심플한 텍스트 링크로
  - motion 애니메이션 제거
  - 깔끔한 레이아웃

  **Must NOT do**:
  - contact 데이터 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 컴포넌트 스타일 수정
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 스타일 단순화

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 9, 11)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 6, 7, 8

  **References**:
  - `src/components/ContactSection.tsx` - 현재 Contact 섹션
  - `src/components/ContactCard.tsx` - Contact 카드 컴포넌트 (수정 또는 제거)
  - `src/data/portfolio.ts:61-68` - contact 데이터

  **Acceptance Criteria**:
  - [ ] motion 애니메이션 제거됨
  - [ ] 연락처가 심플한 텍스트 링크로 표시됨
  - [ ] 다크 모드에서 가독성 유지

  **Commit**: YES (groups with 9, 11)
  - Message: `feat: simplify ContactSection style`
  - Files: `src/components/ContactSection.tsx`, `src/components/ContactCard.tsx`

---

- [ ] 11. Footer 리뉴얼 - 단순화

  **What to do**:
  - 깔끔한 하단 텍스트
  - 불필요한 장식 제거
  - motion 애니메이션 제거

  **Must NOT do**:
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 컴포넌트 스타일 수정
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 스타일 단순화

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 9, 10, 11.5)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 6, 7, 8

  **References**:
  - `src/components/Footer.tsx` - 현재 Footer 컴포넌트

  **Acceptance Criteria**:
  - [ ] motion 애니메이션 제거됨 (있다면)
  - [ ] 깔끔한 하단 텍스트
  - [ ] 다크 모드에서 가독성 유지

  **Commit**: YES (groups with 9, 10, 11.5)
  - Message: `feat: simplify Footer style`
  - Files: `src/components/Footer.tsx`

---

- [ ] 11.5. GuestbookSection 리뉴얼 - framer-motion 제거

  **What to do**:
  - `import { motion, AnimatePresence } from "framer-motion"` 제거
  - `<motion.section>`, `<motion.div>` 를 일반 태그로 변경
  - `AnimatePresence` 래퍼 제거 (목록 렌더링에서)
  - 폼 기능과 API 연동은 그대로 유지
  - 스타일은 현재 유지 (단순화 필요시 추가 가능)

  **Must NOT do**:
  - 폼 기능 변경 금지
  - API 연동 로직 변경 금지
  - motion 애니메이션 사용 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: framer-motion 제거만 수행
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: React 컴포넌트 수정

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 9, 10, 11)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 6, 7, 8

  **References**:
  - `src/components/GuestbookSection.tsx:4` - import 문
  - `src/components/GuestbookSection.tsx:97-108` - motion.section
  - `src/components/GuestbookSection.tsx:118-124` - motion.div (폼 컨테이너)
  - `src/components/GuestbookSection.tsx:166-172` - motion.div (에러 메시지)
  - `src/components/GuestbookSection.tsx:174-181` - motion.div (성공 메시지)
  - `src/components/GuestbookSection.tsx:206-229` - AnimatePresence + motion.div (목록)

  **Acceptance Criteria**:
  - [ ] framer-motion import 제거됨
  - [ ] AnimatePresence 제거됨
  - [ ] motion.* 태그가 일반 HTML 태그로 변경됨
  - [ ] 폼 작성 기능 정상 작동
  - [ ] 방명록 목록 표시 정상 작동
  - [ ] 다크 모드에서 가독성 유지

  **Commit**: YES (groups with 9, 10, 11)
  - Message: `refactor: remove framer-motion from GuestbookSection`
  - Files: `src/components/GuestbookSection.tsx`

---

- [ ] 12. framer-motion 완전 제거 및 빌드 검증 (최종)

  **What to do**:
  - `package.json`에서 `framer-motion` 의존성 제거
  - `npm install`로 lock 파일 업데이트
  - `npm run build`로 전체 빌드 검증
  - `npm run dev`로 전체 동작 검증

  **Must NOT do**:
  - 다른 의존성 제거 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 의존성 제거 및 빌드 검증
  - **Skills**: []
    - 기본 빌드 작업

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5 (final)
  - **Blocks**: None
  - **Blocked By**: Tasks 9, 10, 11

  **References**:
  - `package.json:14` - framer-motion 의존성 위치

  **Acceptance Criteria**:
  - [ ] `package.json`에서 framer-motion 라인 제거됨
  - [ ] `npm install` 성공
  - [ ] `npm run build` 에러 없음
  - [ ] `npm run dev` 실행 후 모든 페이지 정상 작동:
    - 메인 페이지 모든 섹션 표시
    - 다크/라이트 모드 전환
    - 프로젝트 상세 페이지 이동
    - 방명록 페이지 이동

  **Commit**: YES
  - Message: `chore: remove framer-motion dependency`
  - Files: `package.json`, `package-lock.json`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `style: remove aurora animations` | globals.css | npm run dev |
| 3,4,5 | `feat: redesign profile sections` | HeroSection, AboutSection, Header | npm run dev |
| 6,7,8 | `feat: redesign content sections` | SkillsSection, ProjectsSection, EducationSection | npm run dev |
| 9,10,11 | `feat: simplify remaining sections` | CrewTalk, Contact, Footer | npm run dev |
| 12 | `chore: remove framer-motion` | package.json | npm run build |

---

## Success Criteria

### Verification Commands
```bash
npm run build  # Expected: 빌드 성공, 에러 없음
npm run dev    # Expected: localhost:3000에서 정상 실행
```

### Final Checklist
- [ ] 모든 섹션이 단순하고 깔끔한 스타일로 표시됨
- [ ] framer-motion 의존성 완전 제거됨
- [ ] 다크/라이트 모드 전환 정상 작동
- [ ] 프로젝트 상세 페이지 정상 작동 (이미지 갤러리 포함)
- [ ] 방명록 페이지 정상 작동
- [ ] 모바일 반응형 정상 작동
- [ ] 콘텐츠 손실 없음 (모든 데이터 표시)
