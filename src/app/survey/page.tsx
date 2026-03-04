"use client";

import { useState } from "react";
import Link from "next/link";

/** 사전/사후 측정 설계 — 지식검사·설문 placeholder */
const SURVEY_ITEMS = [
  { id: "k1", type: "knowledge", text: "생태계를 구성하는 요소에는 어떤 것들이 있다고 생각하나요?" },
  { id: "k2", type: "knowledge", text: "관측한 데이터만으로 ‘왜 그런지’를 말할 수 없는 이유를 한 문장으로 써 보세요." },
  { id: "s1", type: "likert", text: "과학 글을 읽을 때 ‘사실’과 ‘주장’을 구분하는 것이 중요하다.", scale: 5 },
  { id: "s2", type: "likert", text: "데이터가 하나만 있으면 원인을 특정할 수 있다.", scale: 5 },
];

export default function SurveyPage() {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold text-[var(--accent)]">
        READS — 사전/사후 측정
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        지식검사·설문 (연구자용 구조화 형식)
      </p>

      {!submitted ? (
        <form
          className="card mt-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (typeof window !== "undefined") {
              try {
                const stored = JSON.parse(localStorage.getItem("reads_survey") ?? "[]");
                stored.push({ when: new Date().toISOString(), responses });
                localStorage.setItem("reads_survey", JSON.stringify(stored));
              } catch {
                // ignore
              }
            }
            setSubmitted(true);
          }}
        >
          {SURVEY_ITEMS.map((item) => (
            <div key={item.id}>
              <label className="block font-medium text-gray-800 mb-2">
                {item.text}
              </label>
              {item.type === "knowledge" ? (
                <textarea
                  className="w-full min-h-[80px] p-3 border border-[var(--border)] rounded-lg"
                  value={responses[item.id] ?? ""}
                  onChange={(e) =>
                    setResponses((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                />
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: (item as { scale: number }).scale }, (_, i) => i + 1).map(
                    (n) => (
                      <label key={n} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={item.id}
                          value={String(n)}
                          checked={responses[item.id] === String(n)}
                          onChange={() =>
                            setResponses((prev) => ({ ...prev, [item.id]: String(n) }))
                          }
                        />
                        <span className="text-sm">{n}</span>
                      </label>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          <button type="submit" className="btn-primary">
            제출
          </button>
        </form>
      ) : (
        <div className="card mt-6">
          <p className="text-[var(--accent)] font-medium">제출되었습니다.</p>
          <p className="text-sm text-gray-500 mt-1">
            응답은 브라우저(localStorage reads_survey)에 저장됩니다.
          </p>
          <Link href="/" className="btn-secondary mt-4 inline-block">
            홈으로
          </Link>
        </div>
      )}

      <Link href="/" className="block mt-4 text-sm text-gray-500 hover:underline">
        ← 홈
      </Link>
    </main>
  );
}
