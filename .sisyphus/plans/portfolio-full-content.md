# Portfolio Full Content Display - Notion to Web

## TL;DR

> **Quick Summary**: 노션 포트폴리오 데이터(data/portfolio/)를 기반으로 웹사이트의 모든 섹션을 전체 내용으로 업데이트하고, 신규 섹션(Career/Awards/Certifications)을 추가합니다.
> 
> **Deliverables**:
> - portfolio.ts 데이터 구조 변경 및 신규 데이터 추가
> - Skills 섹션에 숙련도 레벨 표시
> - Career, Awards, Certifications 신규 섹션 추가
> - Education/Activities 상세 내용 표시
> - Projects 메인에 개요+성과 표시
> - 프로젝트 상세 페이지 이미지 캐러셀로 변경
> - Guestbook 페이지 디자인 통일
> 
> **Estimated Effort**: Medium-Large (10-12 tasks)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 (데이터 구조) → Task 2-6 (컴포넌트) → Task 7-9 (페이지)

---

## Context

### Original Request
노션 포트폴리오를 웹페이지로 그대로 복제. 모든 내용을 요약 없이 전체 표시. 프로젝트 상세 페이지 이미지를 캐러셀로, 크루톡 디자인 통일.

### Interview Summary
**Key Discussions**:
- Projects 메인 페이지: 개요+성과만 표시, 상세페이지에서 전체 표시
- Skills: 노션 CSV 데이터로 변경 (5개 카테고리, 숙련도 레벨 포함)
- 이미지 갤러리: 캐러셀/슬라이더로 변경

**Research Findings**:
- data/portfolio/ 폴더에 노션 내보내기 데이터 있음
- 현재 Career, Awards, Certifications 타입/데이터 없음
- Skills에 숙련도 레벨 개념 없음

### Self-Review Gap Analysis

**Identified Gaps** (addressed):
1. Header 네비게이션에 신규 섹션 링크 추가 필요 → 포함
2. page.tsx 메인 페이지에 신규 섹션 컴포넌트 추가 필요 → 포함
3. 삭제된 컴포넌트(ProjectCard.tsx) 정리 필요 → 포함
4. 섹션 순서 결정 필요 → 기본값: Hero > Career > Skills > Projects > Education > Activities > Awards > Certifications > CrewTalk > Contact

---

## Work Objectives

### Core Objective
노션 포트폴리오의 모든 데이터를 웹사이트에 전체 표시하고, 신규 섹션을 추가하여 Notion 페이지와 동일한 정보량을 제공합니다.

### Concrete Deliverables
- `src/data/portfolio.ts`: 타입 추가 (SkillLevel, Career, Award, Certification) 및 데이터 업데이트
- `src/components/CareerSection.tsx`: 신규 컴포넌트
- `src/components/AwardsSection.tsx`: 신규 컴포넌트
- `src/components/CertificationsSection.tsx`: 신규 컴포넌트
- `src/components/SkillsSection.tsx`: 숙련도 레벨 표시
- `src/components/EducationSection.tsx`: 상세 내용 표시
- `src/components/ProjectsSection.tsx`: 개요+성과 표시
- `src/components/ImageGallery.tsx`: 캐러셀로 변경
- `src/app/guestbook/page.tsx`: 디자인 통일
- `src/app/page.tsx`: 신규 섹션 추가
- `src/components/Header.tsx`: 네비게이션 업데이트

### Definition of Done
- [ ] `npm run build` 성공
- [ ] `npm run dev`로 모든 섹션 렌더링 확인
- [ ] 모든 신규 섹션이 메인 페이지에 표시됨
- [ ] 프로젝트 상세 페이지 이미지 캐러셀 동작 확인

### Must Have
- Skills에 숙련도 레벨(🔥/🛠️/🌱) 표시
- Career 섹션 (경력 사항)
- Awards 섹션 (수상 내역 3개)
- Certifications 섹션 (자격증 3개)
- Education 상세 정보 (학점, 전공)
- Activities 상세 내용
- Projects 메인에 개요+성과
- 이미지 캐러셀

### Must NOT Have (Guardrails)
- API 변경 없음
- 새로운 페이지 라우트 추가 없음 (기존 페이지만 수정)
- 외부 캐러셀 라이브러리 추가하지 않음 (직접 구현 또는 간단한 CSS)
- portfolio.ts 외의 데이터 소스 추가하지 않음
- 프로젝트 상세 페이지 구조 대폭 변경하지 않음 (이미지 갤러리만 변경)
- Dark mode 기능 손상하지 않음

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO
- **User wants tests**: Manual-only
- **Framework**: none

### Automated Verification (Manual Browser Check)

각 TODO는 `npm run dev` 실행 후 브라우저에서 확인합니다.

**Evidence Requirements:**
- `npm run build` 성공 로그
- 브라우저에서 각 섹션 스크린샷 (선택적)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: portfolio.ts 데이터 구조 변경 (모든 컴포넌트의 의존성)

Wave 2 (After Wave 1):
├── Task 2: SkillsSection 업데이트 (숙련도 레벨)
├── Task 3: CareerSection 신규 생성
├── Task 4: EducationSection 및 ActivitiesSection 분리/업데이트
├── Task 5: AwardsSection 신규 생성
├── Task 6: CertificationsSection 신규 생성
└── Task 7: ProjectsSection 업데이트 (개요+성과)

Wave 3 (After Wave 2):
├── Task 8: ImageGallery 캐러셀 변경
├── Task 9: Guestbook 디자인 통일
├── Task 10: page.tsx 및 Header 업데이트
└── Task 11: 정리 및 빌드 검증

Critical Path: Task 1 → Task 10 → Task 11
Parallel Speedup: ~50% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2-10 | None (foundation) |
| 2 | 1 | 10 | 3, 4, 5, 6, 7 |
| 3 | 1 | 10 | 2, 4, 5, 6, 7 |
| 4 | 1 | 10 | 2, 3, 5, 6, 7 |
| 5 | 1 | 10 | 2, 3, 4, 6, 7 |
| 6 | 1 | 10 | 2, 3, 4, 5, 7 |
| 7 | 1 | 10 | 2, 3, 4, 5, 6 |
| 8 | 1 | 11 | 9, 10 |
| 9 | 1 | 11 | 8, 10 |
| 10 | 2-7 | 11 | 8, 9 |
| 11 | 8-10 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | delegate_task(category="unspecified-high", load_skills=[], run_in_background=false) |
| 2 | 2-7 | dispatch parallel: delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"], run_in_background=true) |
| 3 | 8-11 | dispatch parallel: delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"], run_in_background=true) |

---

## TODOs

- [ ] 1. portfolio.ts 데이터 구조 및 데이터 업데이트

  **What to do**:
  - 새로운 타입 추가: `SkillLevel`, `Skill`, `Career`, `Award`, `Certification`
  - `SkillCategory` 타입을 숙련도 레벨 포함하도록 변경
  - Career 데이터 추가 ((주)헬로비즈 경력)
  - Education 데이터 상세화 (학점, 전공 추가)
  - Awards 데이터 추가 (3개 수상 내역)
  - Certifications 데이터 추가 (3개 자격증)
  - Skills 데이터를 노션 CSV 기준으로 완전히 교체 (5개 카테고리, 숙련도 레벨 포함)
  - Activities 데이터를 노션 마크다운의 상세 내용으로 업데이트

  **Must NOT do**:
  - Projects 데이터 구조 변경 (기존 구조 유지, 데이터만 보강)
  - 기존 export 이름 변경 (하위 호환성)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 데이터 구조 설계가 필요하고, 다른 모든 컴포넌트에 영향을 미침
  - **Skills**: `[]`
    - 특별한 스킬 필요 없음, TypeScript 타입 정의 작업

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (단독)
  - **Blocks**: Tasks 2-10
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/data/portfolio.ts:10-48` - 기존 타입 정의 패턴 (SkillCategory, Project, Activity 등)

  **Data References** (노션 내보내기 파일):
  - `data/portfolio/Sangyoon Software Engineer 1b84bde0e3dd80cba62bebaff37a10ff.md` - Career, Education, Activities 상세 내용
  - `data/portfolio/Sangyoon Software Engineer/Android 2eb4bde0e3dd80a8a10deca6a3072e51_all.csv` - Android 스킬 + 숙련도
  - `data/portfolio/Sangyoon Software Engineer/iOS 2eb4bde0e3dd806884fff1030ca61cdd_all.csv` - iOS 스킬 + 숙련도
  - `data/portfolio/Sangyoon Software Engineer/Web 2eb4bde0e3dd807e9844eaf90801a9b4_all.csv` - Web 스킬 + 숙련도
  - `data/portfolio/Sangyoon Software Engineer/Database & Infra 2eb4bde0e3dd80398487e53f2ef3c785_all.csv` - DB/Infra 스킬 + 숙련도
  - `data/portfolio/Sangyoon Software Engineer/Collaboration & Tools 2eb4bde0e3dd806f8e08f79b55c48a9b_all.csv` - 협업 도구 스킬 + 숙련도
  - `data/portfolio/Sangyoon Software Engineer/🏆 Awards 1b84bde0e3dd816e8e07fb80924b8b8e_all.csv` - 수상 내역
  - `data/portfolio/Sangyoon Software Engineer/🏅 Certifications 2eb4bde0e3dd8024b487ded6484b8e11_all.csv` - 자격증

  **WHY Each Reference Matters**:
  - portfolio.ts 기존 타입 → 새 타입 추가 시 일관된 패턴 유지
  - 노션 CSV 파일들 → 정확한 데이터와 숙련도 레벨 참조

  **Acceptance Criteria**:

  ```bash
  # Agent runs:
  npx tsc --noEmit
  # Assert: Exit code 0 (no type errors)
  ```

  - [ ] `SkillLevel` 타입: `"expert" | "proficient" | "familiar"` 정의됨
  - [ ] `Skill` 타입: `{ name: string; level: SkillLevel }` 정의됨
  - [ ] `SkillCategory.items` 타입: `Skill[]`로 변경됨
  - [ ] `Career` 타입 및 `career` 데이터 export 존재
  - [ ] `Award` 타입 및 `awards` 데이터 export 존재
  - [ ] `Certification` 타입 및 `certifications` 데이터 export 존재
  - [ ] `education` 데이터 export 존재 (별도 배열 또는 profile 내)
  - [ ] Skills 데이터가 5개 카테고리(Android, iOS, Web, Database & Infra, Collaboration & Tools)로 구성됨

  **Commit**: YES
  - Message: `feat(data): add Career, Awards, Certifications types and update Skills with proficiency levels`
  - Files: `src/data/portfolio.ts`
  - Pre-commit: `npx tsc --noEmit`

---

- [ ] 2. SkillsSection 숙련도 레벨 표시

  **What to do**:
  - 숙련도 레벨에 따라 아이콘/색상 다르게 표시
  - 🔥 많이 써본 스택 (expert) → 강조 색상
  - 🛠️ 꽤 써본 스택 (proficient) → 기본 색상
  - 🌱 써본 스택 (familiar) → 연한 색상
  - 각 카테고리 내에서 숙련도 순으로 정렬 (expert → proficient → familiar)

  **Must NOT do**:
  - 카테고리 구조 변경
  - 반응형 레이아웃 변경

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI 컴포넌트 스타일링 작업
  - **Skills**: `["frontend-ui-ux"]`
    - frontend-ui-ux: 시각적 계층 구조와 색상 설계 필요

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 5, 6, 7)
  - **Blocks**: Task 10
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/SkillsSection.tsx:1-42` - 현재 Skills 섹션 구조

  **Style References**:
  - `src/app/globals.css` - 전역 스타일 변수

  **WHY Each Reference Matters**:
  - SkillsSection.tsx → 현재 구조 유지하면서 레벨 표시 추가

  **Acceptance Criteria**:

  ```bash
  # Agent runs:
  npm run build
  # Assert: Exit code 0
  ```

  **For Frontend/UI changes** (using playwright skill):
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:3000/#skills
  2. Assert: 5개 카테고리(Android, iOS, Web, Database & Infra, Collaboration & Tools) 표시됨
  3. Assert: 각 스킬 태그에 숙련도 아이콘(🔥/🛠️/🌱) 또는 색상 차이 있음
  4. Screenshot: .sisyphus/evidence/task-2-skills-levels.png
  ```

  **Commit**: NO (groups with Task 10)

---

- [ ] 3. CareerSection 신규 생성

  **What to do**:
  - 새로운 `CareerSection.tsx` 컴포넌트 생성
  - 타임라인 레이아웃 (왼쪽: 기간, 오른쪽: 회사/역할/업무)
  - 현재 Education/Projects 섹션과 동일한 스타일 적용
  - career 데이터에서 회사명, 직급, 기간, 담당 프로젝트 목록 표시

  **Must NOT do**:
  - 새로운 스타일 시스템 도입
  - 다른 섹션과 다른 레이아웃

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 새 UI 컴포넌트 생성
  - **Skills**: `["frontend-ui-ux"]`
    - frontend-ui-ux: 기존 디자인 시스템과 일관성 유지

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4, 5, 6, 7)
  - **Blocks**: Task 10
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/EducationSection.tsx:1-47` - 타임라인 레이아웃 패턴
  - `src/components/ProjectsSection.tsx:24-104` - 섹션 구조 패턴

  **Data References**:
  - `data/portfolio/Sangyoon Software Engineer 1b84bde0e3dd80cba62bebaff37a10ff.md:41-55` - Career 섹션 내용

  **WHY Each Reference Matters**:
  - EducationSection → 동일한 타임라인 레이아웃 재사용
  - 노션 마크다운 → 표시할 정확한 내용 참조

  **Acceptance Criteria**:

  ```bash
  # Agent runs:
  npm run build
  # Assert: Exit code 0
  ```

  **For Frontend/UI changes**:
  ```
  1. Navigate to: http://localhost:3000/#career
  2. Assert: "Career" 섹션 제목 표시됨
  3. Assert: "(주)헬로비즈" 회사명 표시됨
  4. Assert: "2023.06. ~ 2024.05." 기간 표시됨
  5. Assert: 담당 프로젝트 목록 4개 표시됨
  ```

  **Commit**: NO (groups with Task 10)

---

- [ ] 4. EducationSection 및 ActivitiesSection 분리/업데이트

  **What to do**:
  - 기존 `EducationSection.tsx`가 activities를 표시 → 분리 필요
  - `EducationSection.tsx`: education 전용 데이터로 변경
    - 강남대학교: 주전공, 복수전공, 학점(3.93/4.5) 표시
    - 용인고등학교: 기간 표시
  - `ActivitiesSection.tsx`: 신규 생성 또는 기존 파일 재활용
    - activities 데이터의 상세 내용 표시 (노션 마크다운 기준)
    - 각 활동별 상세 설명 bullet points 포함
  - 두 섹션 모두 타임라인 레이아웃 유지

  **Must NOT do**:
  - Education과 Activities 합치지 않음 (별도 섹션)
  - 레이아웃 구조 변경

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 기존 컴포넌트 업데이트
  - **Skills**: `["frontend-ui-ux"]`
    - frontend-ui-ux: 정보 계층 구조 설계

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 5, 6, 7)
  - **Blocks**: Task 10
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/EducationSection.tsx:1-47` - 현재 구조

  **Data References**:
  - `data/portfolio/Sangyoon Software Engineer 1b84bde0e3dd80cba62bebaff37a10ff.md:56-68` - Education 상세 내용

  **Acceptance Criteria**:

  ```bash
  npm run build
  # Assert: Exit code 0
  ```

  **Education 섹션**:
  - [ ] "Education" 섹션 제목 표시됨
  - [ ] "강남대학교 소프트웨어응용학부" 표시됨
  - [ ] "주전공: 소프트웨어전공" 표시됨
  - [ ] "복수전공: 가상현실전공" 표시됨
  - [ ] "학점 3.93 / 4.5" 표시됨
  - [ ] "용인고등학교" 표시됨

  **Activities 섹션**:
  - [ ] "Activities" 섹션 제목 표시됨
  - [ ] "현대오토에버 모빌리티 SW스쿨 웹/앱 2기" 표시됨 (상세 내용 포함)
  - [ ] "강남대학교 모바일프로그래밍 멘토링 프로그램" 표시됨 (상세 내용 포함)
  - [ ] "강남대학교 K-Project" 표시됨 (상세 내용 포함)
  - [ ] "코드잇 대학생 코딩 캠프 5기" 표시됨 (상세 내용 포함)

  **Commit**: NO (groups with Task 10)

---

- [ ] 5. AwardsSection 신규 생성

  **What to do**:
  - 새로운 `AwardsSection.tsx` 컴포넌트 생성
  - 3개 수상 내역 표시: 대회명, 수상, 수상일, 주최기관
  - 간단한 카드 또는 리스트 레이아웃
  - 다른 섹션과 동일한 스타일

  **Must NOT do**:
  - 복잡한 애니메이션
  - 아이콘 라이브러리 추가

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 6, 7)
  - **Blocks**: Task 10
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/EducationSection.tsx:1-47` - 섹션 레이아웃 패턴

  **Data References**:
  - `data/portfolio/Sangyoon Software Engineer/🏆 Awards 1b84bde0e3dd816e8e07fb80924b8b8e_all.csv` - 수상 데이터

  **Acceptance Criteria**:

  ```bash
  npm run build
  # Assert: Exit code 0
  ```

  - [ ] "Awards" 또는 "수상 내역" 섹션 제목 표시됨
  - [ ] 3개 수상 내역 모두 표시됨
  - [ ] 졸업작품전시회 최우수상 표시됨
  - [ ] 서울 공공데이터 경진대회 장려상 표시됨
  - [ ] 학술제 장려상 표시됨

  **Commit**: NO (groups with Task 10)

---

- [ ] 6. CertificationsSection 신규 생성

  **What to do**:
  - 새로운 `CertificationsSection.tsx` 컴포넌트 생성
  - 3개 자격증 표시: 자격증명, 등록번호, 인증기관, 등급, 취득일
  - 간단한 카드 또는 리스트 레이아웃
  - Awards 섹션과 유사한 스타일

  **Must NOT do**:
  - Awards와 합치지 않음 (별도 섹션)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 5, 7)
  - **Blocks**: Task 10
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/EducationSection.tsx:1-47` - 섹션 레이아웃 패턴

  **Data References**:
  - `data/portfolio/Sangyoon Software Engineer/🏅 Certifications 2eb4bde0e3dd8024b487ded6484b8e11_all.csv` - 자격증 데이터

  **Acceptance Criteria**:

  ```bash
  npm run build
  # Assert: Exit code 0
  ```

  - [ ] "Certifications" 또는 "자격증" 섹션 제목 표시됨
  - [ ] 정보처리기사 표시됨
  - [ ] ITQ OA Master 표시됨
  - [ ] ICDL Start Certification 표시됨

  **Commit**: NO (groups with Task 10)

---

- [ ] 7. ProjectsSection 개요+성과 표시

  **What to do**:
  - 기존 description 대신 overview 표시
  - achievements 배열 bullet point로 표시
  - tech 태그 5개 제한 유지
  - 상세 보기 링크 유지

  **Must NOT do**:
  - responsibilities, techStack 표시하지 않음 (상세 페이지에서만)
  - 레이아웃 구조 대폭 변경

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 5, 6)
  - **Blocks**: Task 10
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/ProjectsSection.tsx:1-105` - 현재 구조

  **Data References**:
  - `src/data/portfolio.ts:143-930` - projects 배열 (overview, achievements 필드)

  **Acceptance Criteria**:

  ```bash
  npm run build
  # Assert: Exit code 0
  ```

  - [ ] 각 프로젝트에 overview 텍스트 표시됨 (description 대신)
  - [ ] 각 프로젝트에 achievements bullet points 표시됨
  - [ ] 기존 period, role, company, tech 태그 유지됨
  - [ ] 상세 보기 링크 동작함

  **Commit**: NO (groups with Task 10)

---

- [ ] 8. ImageGallery 캐러셀로 변경

  **What to do**:
  - 그리드 레이아웃 → 캐러셀/슬라이더로 변경
  - 좌우 화살표 버튼으로 이미지 탐색
  - 현재 이미지 인덱스 표시 (예: 1/23)
  - 이미지 클릭 시 모달 뷰어는 유지
  - 키보드 좌우 화살표 지원 (현재 모달에서만 지원 → 캐러셀에도 적용)

  **Must NOT do**:
  - 외부 캐러셀 라이브러리 사용 (swiper, slick 등)
  - 자동 재생 기능

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`
    - frontend-ui-ux: 캐러셀 UX 설계

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 9, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/ImageGallery.tsx:1-191` - 현재 그리드 + 모달 구조

  **WHY Each Reference Matters**:
  - ImageGallery.tsx → 기존 모달 뷰어 로직 재사용, 그리드만 캐러셀로 교체

  **Acceptance Criteria**:

  ```bash
  npm run build
  # Assert: Exit code 0
  ```

  **For Frontend/UI changes**:
  ```
  1. Navigate to: http://localhost:3000/projects/33auto
  2. Scroll to: 프로젝트 이미지 섹션
  3. Assert: 캐러셀 형태로 이미지 1개 표시됨
  4. Assert: 좌우 화살표 버튼 존재함
  5. Click: 오른쪽 화살표
  6. Assert: 다음 이미지로 전환됨
  7. Assert: 인덱스 표시 (예: 2/78)
  8. Click: 이미지
  9. Assert: 모달 뷰어 열림
  ```

  **Commit**: YES
  - Message: `feat(gallery): change image gallery from grid to carousel`
  - Files: `src/components/ImageGallery.tsx`
  - Pre-commit: `npm run build`

---

- [ ] 9. Guestbook 페이지 디자인 통일

  **What to do**:
  - 메인 페이지와 동일한 색상/스타일 적용
  - 보라색 강조 색상 일관성 확인 (purple-600/purple-400)
  - 카드 스타일 통일 (border, bg, hover)
  - 폼 입력 필드 스타일 확인

  **Must NOT do**:
  - 기능 변경 (CRUD, 페이지네이션 등)
  - 레이아웃 구조 변경

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/app/guestbook/page.tsx:1-657` - 현재 Guestbook 페이지
  - `src/components/CrewTalkSection.tsx:47-90` - 메인 페이지 CrewTalk 스타일

  **WHY Each Reference Matters**:
  - guestbook/page.tsx → 현재 스타일 확인 및 수정 대상
  - CrewTalkSection → 메인 페이지 스타일 참조

  **Acceptance Criteria**:

  ```bash
  npm run build
  # Assert: Exit code 0
  ```

  - [ ] Guestbook 페이지 카드 스타일이 메인 CrewTalk과 동일함
  - [ ] 보라색 강조 색상 일관됨 (버튼, 링크)
  - [ ] Dark mode에서도 스타일 일관됨

  **Commit**: YES
  - Message: `style(guestbook): unify design with main page`
  - Files: `src/app/guestbook/page.tsx`
  - Pre-commit: `npm run build`

---

- [ ] 10. page.tsx 및 Header 업데이트

  **What to do**:
  - `src/app/page.tsx`에 신규 섹션 컴포넌트 추가 (CareerSection, ActivitiesSection, AwardsSection, CertificationsSection)
  - 섹션 순서 (노션 원본 기준): Hero > About > Career > Education > Awards > Certifications > Activities > Skills > Projects > CrewTalk > Contact
  - Note: AboutSection 유지 (Introduce 섹션 역할)
  - `src/components/Header.tsx` 네비게이션에 필요시 링크 추가
  - 삭제된 컴포넌트 import 정리 (ProjectCard.tsx 등)

  **Must NOT do**:
  - 섹션 순서 임의 변경 (위 순서 준수)
  - 불필요한 네비게이션 항목 추가 (모든 섹션을 헤더에 넣지 않아도 됨)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: import 추가 및 컴포넌트 배치 작업
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 9)
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 2-7

  **References**:

  **Pattern References**:
  - `src/app/page.tsx` - 현재 페이지 구조
  - `src/components/Header.tsx` - 현재 헤더 네비게이션

  **Acceptance Criteria**:

  ```bash
  npm run build
  # Assert: Exit code 0
  ```

  - [ ] CareerSection이 페이지에 렌더링됨
  - [ ] AwardsSection이 페이지에 렌더링됨
  - [ ] CertificationsSection이 페이지에 렌더링됨
  - [ ] 섹션 순서가 명세와 일치함
  - [ ] 빌드 에러 없음

  **Commit**: YES
  - Message: `feat(page): add Career, Awards, Certifications sections to main page`
  - Files: `src/app/page.tsx`, `src/components/Header.tsx`
  - Pre-commit: `npm run build`

---

- [ ] 11. 정리 및 빌드 검증

  **What to do**:
  - 삭제된/미사용 컴포넌트 파일 정리 (예: `src/components/ProjectCard.tsx` 존재 시 삭제)
  - `npm run build` 최종 검증
  - `npm run lint` 실행 및 경고 수정 (가능한 범위 내)
  - TypeScript 타입 에러 확인

  **Must NOT do**:
  - 기능 변경
  - 새로운 코드 추가

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 정리 및 검증 작업
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (final, sequential)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 8, 9, 10

  **References**:

  **Pattern References**:
  - 전체 프로젝트

  **Acceptance Criteria**:

  ```bash
  # Agent runs:
  npm run build
  # Assert: Exit code 0

  npm run lint
  # Assert: No errors (warnings OK)

  npx tsc --noEmit
  # Assert: Exit code 0
  ```

  - [ ] 미사용 파일 삭제됨
  - [ ] `npm run build` 성공
  - [ ] `npm run lint` 에러 없음
  - [ ] TypeScript 에러 없음

  **Commit**: YES
  - Message: `chore: cleanup unused components and verify build`
  - Files: (삭제된 파일들)
  - Pre-commit: `npm run build && npm run lint`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(data): add Career, Awards, Certifications types and update Skills with proficiency levels` | `src/data/portfolio.ts` | `npx tsc --noEmit` |
| 8 | `feat(gallery): change image gallery from grid to carousel` | `src/components/ImageGallery.tsx` | `npm run build` |
| 9 | `style(guestbook): unify design with main page` | `src/app/guestbook/page.tsx` | `npm run build` |
| 10 | `feat(page): add Career, Awards, Certifications sections to main page` | `src/app/page.tsx`, `src/components/Header.tsx`, 신규 섹션 컴포넌트들 | `npm run build` |
| 11 | `chore: cleanup unused components and verify build` | 삭제된 파일들 | `npm run build && npm run lint` |

---

## Success Criteria

### Verification Commands
```bash
npm run build  # Expected: Build successful
npm run dev    # Expected: Server starts, all sections visible
npx tsc --noEmit  # Expected: No type errors
```

### Final Checklist
- [ ] All "Must Have" present:
  - [ ] Skills에 숙련도 레벨 표시
  - [ ] Career 섹션 존재
  - [ ] Awards 섹션 존재 (3개)
  - [ ] Certifications 섹션 존재 (3개)
  - [ ] Education 상세 정보 표시
  - [ ] Projects 메인에 개요+성과
  - [ ] 이미지 캐러셀 동작
- [ ] All "Must NOT Have" absent:
  - [ ] 외부 캐러셀 라이브러리 없음
  - [ ] API 변경 없음
  - [ ] 새 페이지 라우트 없음
- [ ] `npm run build` 성공
- [ ] Dark mode 정상 동작
