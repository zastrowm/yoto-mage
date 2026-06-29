import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DownloadLoading() {
  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <div className="h-5 w-36 bg-muted animate-pulse" />
          <div className="h-4 w-64 bg-muted animate-pulse mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-10 w-full bg-muted animate-pulse" />
            <div className="h-10 w-24 bg-muted animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-5 w-28 bg-muted animate-pulse" />
          <div className="h-4 w-72 bg-muted animate-pulse mt-1" />
        </CardHeader>
        <CardContent>
          <div className="h-4 w-48 bg-muted animate-pulse" />
        </CardContent>
      </Card>
    </div>
  );
}
