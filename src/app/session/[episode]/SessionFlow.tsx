"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { EpisodeContent, ResponseLog } from "@/lib/types";

type Step =
  | "narrative"
  | { anchoring: number }
  | { se: number }
  | "miniLesson"
  | { quiz: number }
  | "done";

function stepKey(s: Step): string {
  if (s === "narrative") return "narrative";
  if (s === "miniLesson") return "miniLesson";
  if (s === "done") return "done";
  if ("anchoring" in s) return `anchoring-${s.anchoring}`;
  if ("se" in s) return `se-${s.se}`;
  return `quiz-${(s as { quiz: number }).quiz}`;
}

export default function SessionFlow({
  episodeId,
  episodeTitle,
  content,
  hasFullContent,
  nextEpisode,
}: {
  episodeId: string;
  episodeTitle: string;
  content: EpisodeContent;
  hasFullContent: boolean;
  nextEpisode: string | null;
}) {
  const [step, setStep] = useState<Step>("narrative");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizSelected, setQuizSelected] = useState<Record<number, number>>({});
  const [logs, setLogs] = useState<ResponseLog[]>([]);

  const logResponse = useCallback(
    (itemId: string, itemType: ResponseLog["item_type"], raw: string) => {
      const entry: ResponseLog = {
        response_id: `resp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        session_id: `sess_${episodeId}_${typeof window !== "undefined" ? Date.now() : ""}`,
        user_id: "anonymous",
        episode_id: episodeId,
        item_id: itemId,
        item_type: itemType,
        displayed_at: new Date().toISOString(),
        response_raw: raw,
        response_submitted_at: new Date().toISOString(),
      };
      setLogs((prev) => [...prev, entry]);
      if (typeof window !== "undefined") {
        try {
          const stored = JSON.parse(localStorage.getItem("reads_logs") ?? "[]");
          stored.push(entry);
          localStorage.setItem("reads_logs", JSON.stringify(stored));
        } catch {
          // ignore
        }
      }
    },
    [episodeId]
  );

  const goNext = useCallback(() => {
    if (step === "narrative") {
      setStep({ anchoring: 0 });
      return;
    }
    if (typeof step === "object" && step !== null && "anchoring" in step) {
      if (step.anchoring < content.anchoring.length - 1) {
        setStep({ anchoring: step.anchoring + 1 });
      } else {
        setStep({ se: 0 });
      }
      return;
    }
    if (typeof step === "object" && step !== null && "se" in step) {
      if (step.se < content.selfExplanation.length - 1) {
        setStep({ se: step.se + 1 });
      } else {
        setStep("miniLesson");
      }
      return;
    }
    if (step === "miniLesson") {
      setStep(content.quiz.length ? { quiz: 0 } : "done");
      return;
    }
    if (typeof step === "object" && step !== null && "quiz" in step) {
      if (step.quiz < content.quiz.length - 1) {
        setStep({ quiz: step.quiz + 1 });
      } else {
        setStep("done");
      }
    }
  }, [step, content]);

  if (!hasFullContent) {
    return (
      <div className="max-w-2xl mx-auto p-6 card mt-8">
        <h1 className="text-xl font-bold text-[var(--accent)]">
          에피소드 {episodeId} — {episodeTitle}
        </h1>
        <p className="text-gray-600 mt-2">
          이 에피소드 콘텐츠는 준비 중입니다. 에피소드 1을 먼저 진행해 주세요.
        </p>
        <Link href="/" className="btn-primary mt-4 inline-block">
          홈으로
        </Link>
      </div>
    );
  }

  const stepName = stepKey(step);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[var(--accent)]">
          READS · 에피소드 {episodeId} — {episodeTitle}
        </h1>
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          홈
        </Link>
      </header>

      {/* Narrative */}
      {step === "narrative" && (
        <section className="card">
          <h2 className="text-sm font-medium text-gray-500 mb-3">본문</h2>
          <div
            className="prose-narrative"
            dangerouslySetInnerHTML={{
              __html: content.narrative.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
              ),
            }}
          />
          <button onClick={goNext} className="btn-primary mt-6">
            다음: 앵커링 질문
          </button>
        </section>
      )}

      {/* Anchoring */}
      {typeof step === "object" && step !== null && "anchoring" in step && content.anchoring[step.anchoring] && (
        <section className="card">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            앵커링 질문 {step.anchoring + 1}/{content.anchoring.length}
          </h2>
          <p className="font-medium text-gray-800 mb-4">
            {content.anchoring[step.anchoring].text}
          </p>
          <textarea
            className="w-full min-h-[120px] p-3 border border-[var(--border)] rounded-lg resize-y"
            placeholder="답을 입력하세요..."
            value={answers[content.anchoring[step.anchoring].id] ?? ""}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                [content.anchoring[step.anchoring].id]: e.target.value,
              }))
            }
          />
          <button
            onClick={() => {
              const q = content.anchoring[step.anchoring];
              logResponse(q.id, "anchoring", answers[q.id] ?? "");
              goNext();
            }}
            className="btn-primary mt-4"
          >
            {step.anchoring < content.anchoring.length - 1 ? "다음 질문" : "다음: 자기설명"}
          </button>
        </section>
      )}

      {/* Self-explanation */}
      {typeof step === "object" && step !== null && "se" in step && content.selfExplanation[step.se] && (
        <section className="card">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            자기설명 {step.se + 1}/{content.selfExplanation.length}
          </h2>
          <p
            className="font-medium text-gray-800 mb-4"
            dangerouslySetInnerHTML={{
              __html: content.selfExplanation[step.se].text.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
              ),
            }}
          />
          <textarea
            className="w-full min-h-[140px] p-3 border border-[var(--border)] rounded-lg resize-y"
            placeholder="자신의 말로 설명해 보세요..."
            value={answers[content.selfExplanation[step.se].id] ?? ""}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                [content.selfExplanation[step.se].id]: e.target.value,
              }))
            }
          />
          <button
            onClick={() => {
              const se = content.selfExplanation[step.se];
              logResponse(se.id, "self_explanation", answers[se.id] ?? "");
              goNext();
            }}
            className="btn-primary mt-4"
          >
            {step.se < content.selfExplanation.length - 1
              ? "다음"
              : "다음: 미니 레슨"}
          </button>
        </section>
      )}

      {/* Mini-lesson */}
      {step === "miniLesson" && (
        <section className="card">
          <h2 className="text-sm font-medium text-gray-500 mb-3">미니 레슨</h2>
          <div className="prose-narrative">{content.miniLesson}</div>
          <button onClick={goNext} className="btn-primary mt-6">
            다음: 확인 퀴즈
          </button>
        </section>
      )}

      {/* Quiz */}
      {typeof step === "object" && step !== null && "quiz" in step && content.quiz[step.quiz] && (
        <section className="card">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            확인 퀴즈 {step.quiz + 1}/{content.quiz.length}
          </h2>
          <p className="font-medium text-gray-800 mb-4">
            {content.quiz[step.quiz].question}
          </p>
          <ul className="space-y-2">
            {content.quiz[step.quiz].options.map((opt, i) => (
              <li key={i}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`quiz-${step.quiz}`}
                    checked={quizSelected[step.quiz] === i}
                    onChange={() =>
                      setQuizSelected((prev) => ({ ...prev, [step.quiz]: i }))
                    }
                  />
                  <span>{opt}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              logResponse(
                content.quiz[step.quiz].id,
                "mini_lesson_quiz",
                String(quizSelected[step.quiz] ?? "")
              );
              goNext();
            }}
            className="btn-primary mt-4"
          >
            {step.quiz < content.quiz.length - 1 ? "다음 문제" : "에피소드 완료"}
          </button>
        </section>
      )}

      {/* Done */}
      {step === "done" && (
        <section className="card text-center">
          <h2 className="text-xl font-semibold text-[var(--accent)]">
            에피소드 {episodeId} 완료
          </h2>
          <p className="text-gray-600 mt-2">
            응답은 브라우저에 저장되었습니다. (연구용 로그: localStorage reads_logs)
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <Link href="/" className="btn-secondary">
              홈으로
            </Link>
            {nextEpisode && (
              <Link href={`/session/${nextEpisode}`} className="btn-primary">
                에피소드 {nextEpisode} 진행
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
