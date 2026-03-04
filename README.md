# READS

**Reading for Evidence And Disciplinary Science**

중등(9학년) 학생용 과학 읽기 ITS(Intelligent Tutoring System). 4편의 옴니버스 단편 소설을 통해 prior knowledge(양·정확성·특이성·응집성)와 과학 교과 소양(evidence–claim, 변인 통제, 불확실성, 그래프·표·출처)을 키우는 프로그램입니다.

## Tech

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Vercel** 배포 권장

## 로컬 실행

```bash
cd reads
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.

## 배포 (Vercel)

1. 이 프로젝트를 **GitHub** 저장소에 푸시합니다.
2. [Vercel](https://vercel.com)에 로그인 후 **New Project** → 해당 GitHub 저장소 선택.
3. Root Directory를 `reads`로 설정(또는 저장소 루트가 `reads`라면 그대로).
4. **Deploy** 후 제공되는 URL에서 서비스 확인.

## 프로젝트 구조

- `src/app/` — 페이지: 홈(`/`), 세션(`/session/[episode]`), 설문(`/survey`)
- `src/data/` — 에피소드 콘텐츠(에피소드 1 완비, 2·3·4 플레이스홀더)
- `src/lib/types.ts` — 로그 스키마·에피소드 타입

## 데이터·로그

- 세션별 응답은 **localStorage** `reads_logs`에 누적됩니다 (연구용 수집 시 백엔드 연동 가능).
- 사전/사후 설문 응답은 `reads_survey`에 저장됩니다.

## 상위 문서

McCarthy project 루트의 `0_개발에이전트_시스템프롬프트.md`, `1_설계_블루프린트.md` 등과 함께 사용합니다.
