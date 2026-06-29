import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthStatus, fetchMyCards } from "@/lib/yoto/actions";
import { PlaylistList, type PlaylistSummary } from "./playlist-list";
import Link from "next/link";

export default async function LibraryPage() {
  const { authenticated } = await getAuthStatus();

  if (!authenticated) {
    return (
      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Connect your Yoto account to view your playlists</p>
            <Button asChild>
              <Link href="/api/auth/login">Login with Yoto</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cards = await fetchMyCards();

  if (!cards || cards.length === 0) {
    return (
      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No playlists found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const playlists: PlaylistSummary[] = cards.map((card: any) => ({
    cardId: card.cardId,
    title: card.title ?? "Untitled",
    coverUrl: card.metadata?.cover?.imageL,
    duration: card.metadata?.media?.duration,
  }));

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-lg font-semibold">Playlists ({playlists.length})</h2>
      <PlaylistList playlists={playlists} />
    </div>
  );
}
