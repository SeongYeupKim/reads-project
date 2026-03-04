import type { EpisodeContent } from "@/lib/types";
import { episode1 } from "./episode1";

/** 에피소드 2·3·4는 구조만 두고 콘텐츠는 추후 채움 */
const episodePlaceholder = (id: string, title: string): EpisodeContent => ({
  meta: {
    id,
    title,
    scienceConcepts: "(추가 예정)",
    disciplinaryFocus: "(추가 예정)",
    knowledgeFocus: "(추가 예정)",
  },
  narrative: "이 에피소드 콘텐츠는 준비 중입니다. 에피소드 1을 먼저 진행해 보세요.",
  anchoring: [],
  selfExplanation: [],
  miniLesson: "",
  quiz: [],
});

export const episodes: Record<string, EpisodeContent> = {
  "1": episode1,
  "2": episodePlaceholder("2", "데이터 한 장의 의미"),
  "3": episodePlaceholder("3", "기후가 바꾼 것들"),
  "4": episodePlaceholder("4", "정보의 출처를 묻다"),
};

export const episodeOrder = ["1", "2", "3", "4"];
