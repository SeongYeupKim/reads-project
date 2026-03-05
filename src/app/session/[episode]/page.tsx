import { notFound } from "next/navigation";
import { episodes, episodeOrder } from "@/data/episodes";
import SessionFlow from "./SessionFlow";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ episode: string }>;
}) {
  const { episode } = await params;
  if (!episodes[episode]) notFound();
  const content = episodes[episode];
  const hasContent = Boolean(
    content.selfExplanation.length >= 3 && content.miniLesson
  );

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <SessionFlow
        episodeId={episode}
        episodeTitle={content.meta.title}
        content={content}
        hasFullContent={hasContent}
        nextEpisode={
          episodeOrder[episodeOrder.indexOf(episode) + 1] ?? null
        }
      />
    </main>
  );
}
