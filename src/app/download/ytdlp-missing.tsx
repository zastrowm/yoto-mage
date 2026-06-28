"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { checkYtDlp } from "@/app/actions";
import { useRouter } from "next/navigation";

export function YtDlpMissing() {
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  async function handleRecheck() {
    setChecking(true);
    const result = await checkYtDlp(true);
    if (result.available) {
      router.refresh();
    }
    setChecking(false);
  }

  return (
    <div className="space-y-3">
      <p className="text-destructive font-medium">
        yt-dlp is not installed or not found in PATH.
      </p>
      <p className="text-sm text-muted-foreground">
        yt-dlp is required to download audio from YouTube. Please install it and
        ensure it&apos;s available in your system PATH.
      </p>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/yt-dlp/yt-dlp#installation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
        >
          View installation instructions
        </a>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRecheck}
          disabled={checking}
        >
          {checking ? "Checking..." : "Re-check"}
        </Button>
      </div>
    </div>
  );
}
