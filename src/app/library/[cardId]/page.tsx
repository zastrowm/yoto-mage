import { fetchCard, getAuthStatus } from "@/lib/yoto/actions";
import { PageTitle } from "@/components/page-title";
import { PlaylistDetail } from "../playlist-detail";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

export default async function CardDetailPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { authenticated } = await getAuthStatus();
  if (!authenticated) {
    redirect("/api/auth/login");
  }

  const { cardId } = await params;
  const card = await fetchCard(cardId);

  if (!card) {
    notFound();
  }

  const content = card.content as any;
  const metadata = card.metadata as any;
  const title = (card as any).title ?? "Untitled";
  const chapters = content?.chapters ?? [];
  const coverUrl: string | undefined = metadata?.cover?.imageL;
  const totalDuration: number | undefined = metadata?.media?.duration;

  return (
    <>
      <PageTitle title={title} />
      <PlaylistDetail
        title={title}
        coverUrl={coverUrl}
        totalDuration={totalDuration}
        chapters={chapters}
      />
    </>
  );
}
