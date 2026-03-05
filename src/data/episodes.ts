import type { EpisodeContent } from "@/lib/types";
import { episode1 } from "./episode1";
import { episode2 } from "./episode2";
import { episode3 } from "./episode3";
import { episode4 } from "./episode4";

export const episodes: Record<string, EpisodeContent> = {
  "1": episode1,
  "2": episode2,
  "3": episode3,
  "4": episode4,
};

export const episodeOrder = ["1", "2", "3", "4"];
