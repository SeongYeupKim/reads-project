"use client";

import { useState } from "react";
import Link from "next/link";
import { comprehensionTexts } from "@/data/readingComprehension";

const LABELS = ["A", "B", "C", "D"];

export default function ReadingComprehensionPage() {
  const [step, setStep] = useState(0); // 0, 1, 2 (텍스트 1, 2, 3)
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const current = comprehensionTexts[step];
  const isLast = step === comprehensionTexts.length - 1;

  const handleNext = () => {
    if (isLast) {
      if (typeof window !== "undefined") {
        try {
          const payload = {
            when: new Date().toISOString(),
            answers: { ...answers },
            itemIds: comprehensionTexts.flatMap((t) => t.items.map((i) => i.id)),
          };
          const stored = JSON.parse(
            localStorage.getItem("reads_reading_comprehension") ?? "[]"
          );
          stored.push(payload);
          localStorage.setItem(
            "reads_reading_comprehension",
            JSON.stringify(stored)
          );
        } catch {
          // ignore
        }
      }
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen max-w-2xl mx-auto p-6">
        <div className="card text-center">
          <h1 className="text-xl font-semibold text-[var(--accent)]">
            본 독해 검사 제출 완료
          </h1>
          <p className="text-gray-600 mt-2">
            응답이 저장되었습니다. (localStorage: reads_reading_comprehension)
          </p>
          <Link href="/" className="btn-primary mt-6 inline-block">
            홈으로
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      <header className="mb-4">
        <h1 className="text-lg font-semibold text-[var(--accent)]">
          READS — 본 독해 검사
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          텍스트 {step + 1} / {comprehensionTexts.length}
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:h-[75vh] lg:overflow-hidden">
        <div className="lg:col-span-7 card overflow-hidden flex flex-col min-h-0">
          <h2 className="text-sm font-medium text-gray-500 mb-2 shrink-0">
            {current.title}
          </h2>
          <div className="prose-narrative flex-1 overflow-y-auto pr-2 min-h-0 whitespace-pre-line">
            {current.body}
          </div>
        </div>
        <div className="lg:col-span-3 card overflow-hidden flex flex-col min-h-0">
          <h2 className="text-sm font-medium text-gray-500 mb-2 shrink-0">
            독해 문항
          </h2>
          <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1">
            {current.items.map((item, idx) => (
              <div key={item.id}>
                <p className="font-medium text-gray-800 text-sm mb-2">
                  {item.question}
                </p>
                <ul className="space-y-1.5">
                  {item.options.map((opt, i) => (
                    <li key={i}>
                      <label className="flex items-start gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name={item.id}
                          checked={answers[item.id] === i}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [item.id]: i }))
                          }
                          className="mt-0.5 shrink-0"
                        />
                        <span>
                          {LABELS[i]}. {opt}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="btn-primary mt-4 shrink-0"
          >
            {isLast ? "제출" : "다음 텍스트"}
          </button>
        </div>
      </section>

      <Link
        href="/"
        className="block mt-4 text-sm text-gray-500 hover:underline"
      >
        ← 홈
      </Link>
    </main>
  );
}
