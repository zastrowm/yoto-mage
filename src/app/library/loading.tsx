import { Card, CardContent } from "@/components/ui/card";

export default function LibraryLoading() {
  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-lg font-semibold">Playlists</h2>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <div className="w-12 h-12 bg-muted animate-pulse shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-muted animate-pulse" />
                  <div className="h-3 w-16 bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
