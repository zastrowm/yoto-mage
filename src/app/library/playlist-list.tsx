import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export interface PlaylistSummary {
  cardId: string;
  title: string;
  coverUrl?: string;
  duration?: number;
}

export function PlaylistList({ playlists }: { playlists: PlaylistSummary[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <ol className="divide-y divide-border">
          {playlists.map((playlist) => {
            return (
              <li key={playlist.cardId}>
                <Link
                  href={`/library/${playlist.cardId}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors"
                >
                  {playlist.coverUrl ? (
                    <img
                      src={playlist.coverUrl}
                      alt=""
                      className="w-12 h-12 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{playlist.title}</p>
                    {playlist.duration && (
                      <p className="text-xs text-muted-foreground">{formatDuration(playlist.duration)}</p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
