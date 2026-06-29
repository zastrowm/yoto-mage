import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CardDetailLoading() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="h-9 w-16 bg-muted animate-pulse" />

      <div className="flex items-start gap-4">
        <div className="w-24 h-24 bg-muted animate-pulse shrink-0" />
        <div className="space-y-2">
          <div className="h-6 w-48 bg-muted animate-pulse" />
          <div className="h-4 w-32 bg-muted animate-pulse" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="h-4 w-16 bg-muted animate-pulse" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="w-5 h-4 bg-muted animate-pulse" />
                <div className="w-8 h-8 bg-muted animate-pulse" />
                <div className="h-4 flex-1 bg-muted animate-pulse max-w-48" />
                <div className="h-3 w-10 bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
