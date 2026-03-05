/**
 * READS — Log schema & episode types
 * 블루프린트 4) 데이터 로그 설계 기준
 */

export type ItemType = "anchoring" | "self_explanation" | "mini_lesson_quiz";

export interface SessionLog {
  session_id: string;
  user_id: string;
  episode_id: string;
  started_at: string; // ISO datetime
  ended_at?: string;
}

export interface ResponseLog {
  response_id: string;
  session_id: string;
  user_id: string;
  episode_id: string;
  item_id: string;
  item_type: ItemType;
  displayed_at: string;
  response_raw: string;
  response_submitted_at: string;
  score?: number;
  rubric_codes?: string[];
  feedback_shown?: string;
  time_on_item_sec?: number;
  attempt_order?: number;
}

export interface EpisodeMeta {
  id: string;
  title: string;
  scienceConcepts: string;
  disciplinaryFocus: string;
  knowledgeFocus: string;
}

export interface AnchoringQuestion {
  id: string;
  type: "situation" | "claim_evidence" | "alternative_uncertainty" | "next_data_method" | "concept";
  text: string;
  keywords: string[];
  misconceptionPatterns: string[];
  rubric: { "0": string; "1": string; "2": string };
}

export interface SelfExplanationPrompt {
  id: string;
  goal: "situation" | "cause_effect" | "evidence_reason";
  text: string;
  keywords: string[];
  misconceptionPatterns: string[];
  rubric: { "0": string; "1": string; "2": string };
}

export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback?: string;
}

export interface EpisodeContent {
  meta: EpisodeMeta;
  narrative: string;
  anchoring: AnchoringQuestion[];
  selfExplanation: SelfExplanationPrompt[];
  miniLesson: string;
  quiz: QuizItem[];
}
