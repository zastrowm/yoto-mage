import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resolveIconUrl } from "@/lib/yoto/icons";
import Link from "next/link";

function formatTrackDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatTotalDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export interface PlaylistChapter {
  key?: string;
  title?: string;
  duration?: number;
  display?: { icon16x16?: string };
}

export interface PlaylistDetailProps {
  title: string;
  coverUrl?: string;
  totalDuration?: number;
  chapters: PlaylistChapter[];
}

export function PlaylistDetail({ title, coverUrl, totalDuration, chapters }: PlaylistDetailProps) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/library">&larr; Back</Link>
        </Button>
      </div>

      <div className="flex items-start gap-4">
        {coverUrl && (
          <img
            src={coverUrl}
            alt={title}
            className="w-24 h-24 object-cover shrink-0"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {chapters.length} item{chapters.length === 1 ? "" : "s"}
            {totalDuration ? ` · ${formatTotalDuration(totalDuration)} total` : ""}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tracks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ol className="divide-y divide-border">
            {chapters.map((chapter, i) => {
              const iconUrl = resolveIconUrl(chapter.display?.icon16x16 ?? "");

              return (
                <li key={chapter.key ?? i} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-xs text-muted-foreground/60 w-5 text-right shrink-0">
                    {i + 1}
                  </span>
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt=""
                      className="w-8 h-8 object-cover shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-muted shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{chapter.title ?? "Untitled"}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {chapter.duration ? formatTrackDuration(chapter.duration) : ""}
                  </span>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
