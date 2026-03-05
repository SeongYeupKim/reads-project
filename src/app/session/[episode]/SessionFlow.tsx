"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { EpisodeContent, ResponseLog } from "@/lib/types";

type Step = "narrative" | { se: number } | "miniLesson" | "done";

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
      setStep({ se: 0 });
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
      setStep("done");
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[var(--accent)]">
          READS · 에피소드 {episodeId} — {episodeTitle}
        </h1>
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          홈
        </Link>
      </header>

      {/* Narrative only */}
      {step === "narrative" && (
        <section className="card max-w-2xl">
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
            다음: 자기설명
          </button>
        </section>
      )}

      {/* Self-explanation: left = narrative, right = question + answer */}
      {typeof step === "object" && step !== null && "se" in step && content.selfExplanation[step.se] && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[60vh]">
          <div className="card overflow-hidden flex flex-col">
            <h2 className="text-sm font-medium text-gray-500 mb-2 shrink-0">본문</h2>
            <div
              className="prose-narrative flex-1 overflow-y-auto pr-2"
              dangerouslySetInnerHTML={{
                __html: content.narrative.replace(
                  /\*\*(.*?)\*\*/g,
                  "<strong>$1</strong>"
                ),
              }}
            />
          </div>
          <div className="card flex flex-col">
            <h2 className="text-sm font-medium text-gray-500 mb-2 shrink-0">
              자기설명 {step.se + 1}/{content.selfExplanation.length}
            </h2>
            <p
              className="font-medium text-gray-800 mb-4 shrink-0"
              dangerouslySetInnerHTML={{
                __html: content.selfExplanation[step.se].text.replace(
                  /\*\*(.*?)\*\*/g,
                  "<strong>$1</strong>"
                ),
              }}
            />
            <textarea
              className="w-full min-h-[180px] flex-1 p-3 border border-[var(--border)] rounded-lg resize-y"
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
              className="btn-primary mt-4 shrink-0"
            >
              {step.se < content.selfExplanation.length - 1
                ? "다음 질문"
                : "다음: 미니 레슨"}
            </button>
          </div>
        </section>
      )}

      {/* Mini-lesson */}
      {step === "miniLesson" && (
        <section className="card max-w-2xl">
          <h2 className="text-sm font-medium text-gray-500 mb-3">미니 레슨</h2>
          <div className="prose-narrative">{content.miniLesson}</div>
          <button onClick={goNext} className="btn-primary mt-6">
            에피소드 완료
          </button>
        </section>
      )}

      {/* Done */}
      {step === "done" && (
        <section className="card text-center max-w-2xl">
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
