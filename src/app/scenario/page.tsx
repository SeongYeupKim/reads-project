"use client";

import { useState } from "react";
import Link from "next/link";

const SCENARIO = `한 지역의 호수에서 최근 몇 년 사이 물고기 개체 수가 급격히 감소했다. 지역 주민들은 그 원인에 대해 서로 다른 의견을 제시하고 있다. 어떤 사람들은 근처 농장에서 사용되는 비료가 물로 흘러 들어갔을 가능성을 이야기하고 있고, 다른 사람들은 수온 변화나 외래종의 유입이 영향을 미쳤을 수 있다고 생각한다.

당신은 지역 환경 연구팀장으로서, 이 현상의 원인을 조사하기 위한 연구를 시작하려고 한다.`;

const QUESTION_A =
  "이 문제의 원인을 조사하기 위한 계획을 이유와 함께 제시하시오 (예: 구체적으로 어떤 자료를 어떻게 수집할지)";
const QUESTION_B =
  "또한 서로 다른 자료들이 어떻게 문제의 가능한 원인을 이해하는 데 도움이 되는지 논리적으로 설명하시오.";

export default function ScenarioPage() {
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      try {
        const payload = {
          when: new Date().toISOString(),
          scenario_a: answerA,
          scenario_b: answerB,
        };
        const stored = JSON.parse(
          localStorage.getItem("reads_scenario") ?? "[]"
        );
        stored.push(payload);
        localStorage.setItem("reads_scenario", JSON.stringify(stored));
      } catch {
        // ignore
      }
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl border border-[var(--border)] shadow-sm p-8 text-center">
          <h1 className="text-xl font-bold text-[var(--accent)]">
            시나리오 문항 제출 완료
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            응답이 저장되었습니다. (localStorage: reads_scenario)
          </p>
          <Link href="/" className="btn-primary mt-6 inline-block">
            홈으로
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-xl font-bold text-[var(--accent)]">
            READS — 시나리오 문항
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            아래 시나리오를 읽고 질문에 답하세요.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-10 gap-5 lg:h-[75vh] lg:overflow-hidden">
          <div className="lg:col-span-7 bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden flex flex-col min-h-0">
            <div className="relative w-full h-36 sm:h-44 shrink-0 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
              <img
                src="/img/scenario-lake.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="px-5 pt-4 pb-2 shrink-0">
              <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded">
                [시나리오]
              </span>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5 min-h-0 whitespace-pre-line text-gray-800 leading-relaxed">
              {SCENARIO}
            </div>
          </div>
          <div className="lg:col-span-3 bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden flex flex-col min-h-0 p-5">
            <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded mb-4 shrink-0 w-fit">
              [질문]
            </span>
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto min-h-0 space-y-5 flex flex-col"
            >
              <div>
                <p className="font-medium text-gray-800 text-sm mb-2 leading-snug">
                  (a) {QUESTION_A}
                </p>
                <textarea
                  className="w-full min-h-[140px] p-3 border border-[var(--border)] rounded-lg resize-y text-sm focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition"
                  placeholder="답을 입력하세요..."
                  value={answerA}
                  onChange={(e) => setAnswerA(e.target.value)}
                />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm mb-2 leading-snug">
                  (b) {QUESTION_B}
                </p>
                <textarea
                  className="w-full min-h-[140px] p-3 border border-[var(--border)] rounded-lg resize-y text-sm focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition"
                  placeholder="답을 입력하세요..."
                  value={answerB}
                  onChange={(e) => setAnswerB(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary shrink-0 mt-2">
                제출
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
