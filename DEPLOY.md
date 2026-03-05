# READS 배포 (GitHub + Vercel)

## 1. GitHub 저장소 만들기

1. [GitHub](https://github.com) 로그인 후 **New repository** 생성.
2. 저장소 이름 예: `reads` (또는 원하는 이름).
3. **Public**, README/ .gitignore 추가하지 않음 (이미 프로젝트에 있음).

## 2. 로컬에서 Git 초기화 및 푸시

프로젝트 루트가 **McCarthy project**이고 앱이 **reads** 폴더인 경우, 두 가지 방식이 있습니다.

### 방식 A: reads 폴더만 GitHub에 푸시 (권장)

```bash
cd "McCarthy project/reads"
git init
git add .
git commit -m "Initial: READS ITS (Next.js, Episode 1)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reads.git
git push -u origin main
```

- Vercel에서 저장소 연결 시 **Root Directory**를 비워 두면 됩니다.

### 방식 B: McCarthy project 전체를 GitHub에 푸시

```bash
cd "McCarthy project"
git init
git add .
git commit -m "McCarthy project: design docs + READS app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mccarthy-reads.git
git push -u origin main
```

- Vercel에서 **Root Directory**를 `reads`로 설정한 뒤 Deploy합니다.

## 3. Vercel 배포

1. [vercel.com](https://vercel.com) 로그인 (GitHub 연동).
2. **Add New** → **Project** → 방금 푸시한 GitHub 저장소 선택.
3. **Root Directory**: 방식 A면 비움, 방식 B면 `reads` 입력.
4. **Framework Preset**: Next.js (자동 감지).
5. **Deploy** 클릭.
6. 배포 완료 후 제공되는 URL(예: `https://reads-xxx.vercel.app`)에서 확인.

## 4. 환경 변수

현재 버전은 환경 변수 없이 동작합니다. 추후 백엔드·로그 수집 API를 쓰면 Vercel 프로젝트 **Settings → Environment Variables**에서 설정하면 됩니다.

## 5. 404 NOT_FOUND가 날 때 — Vercel 설정 체크리스트

1. **Settings → General**
   - **Root Directory**: 이 저장소(`reads-project`)는 **앱이 루트**이므로 **비워 두기**.  
     (다른 저장소에서 `reads` 폴더만 앱인 경우에만 `reads` 입력.)

2. **Settings → Build & Development**
   - **Framework Preset**: **Next.js** 로 되어 있는지 확인.
   - **Build Command**: 비워 두거나 `npm run build`. (vercel.json에 있으면 그대로 사용.)
   - **Output Directory**: **반드시 비우기.** Next.js는 Vercel이 자동 처리함. `out` 또는 `.next` 등으로 두면 404 발생할 수 있음.
   - **Install Command**: 비워 두거나 `npm install`.

3. **Deployments**
   - 최근 배포 → **Building** 탭에서 빌드가 **성공(Finished)** 인지 확인. 실패하면 404가 날 수 있음.
   - **Runtime Logs** 에서 에러가 없는지 확인.

4. **접속**
   - 배포 URL은 **루트**로: `https://[프로젝트].vercel.app/` (끝에 `/` 없어도 됨). 존재하지 않는 경로(예: `/foo`)는 404.
