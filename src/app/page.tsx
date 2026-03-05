import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-50/80 to-white">
      <div className="max-w-lg w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-[var(--accent)] tracking-tight">
          READS
        </h1>
        <p className="text-sm text-gray-500">
          Reading for Evidence And Disciplinary Science
        </p>
        <p className="text-gray-700 leading-relaxed">
          바다가 가까운 마을을 배경으로 한 네 편의 단편 소설을 읽고,
          관찰과 패턴, 원인 탐색, 먹이사슬과 독소를 생각해 보며 과학적 소양을 키워 보세요.
        </p>
        <div className="pt-4 flex flex-col gap-3">
          <Link href="/session/1" className="btn-primary inline-block">
            에피소드 1 — 바다 냄새 (시작하기)
          </Link>
          <div className="flex gap-2 justify-center flex-wrap text-sm">
            <Link href="/session/2" className="btn-secondary inline-block text-gray-600">
              에피소드 2 — 식당의 메뉴판
            </Link>
            <Link href="/session/3" className="btn-secondary inline-block text-gray-600">
              에피소드 3 — 장부 속의 목록
            </Link>
            <Link href="/session/4" className="btn-secondary inline-block text-gray-600">
              에피소드 4 — 바다의 순서
            </Link>
          </div>
        </div>
        <p className="text-xs text-gray-400 pt-4">
          회기당 약 25–35분 · 총 4회기
        </p>
        <Link
          href="/survey"
          className="text-sm text-gray-500 hover:underline mt-2 inline-block"
        >
          사전/사후 측정 (설문)
        </Link>
      </div>
    </main>
  );
}
