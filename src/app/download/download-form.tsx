"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DownloadForm() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "downloading" | "done" | "error">("idle");
  const [lines, setLines] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lines]);

  function handleCancel(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
    setLines((prev) => [...prev, "Download cancelled."]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("downloading");
    setLines([]);

    let response: Response;
    try {
      response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
        signal: controller.signal,
      });
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setStatus("error");
      setLines(["Failed to start download"]);
      return;
    }

    if (!response.ok || !response.body) {
      setStatus("error");
      setLines(["Failed to start download"]);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          const eventMatch = event.match(/^event: (.+)$/m);
          const dataMatch = event.match(/^data: (.+)$/m);
          if (!eventMatch || !dataMatch) continue;

          const eventType = eventMatch[1];
          let data;
          try {
            data = JSON.parse(dataMatch[1]);
          } catch {
            continue;
          }

          if (eventType === "progress") {
            setLines((prev) => [...prev, data.line]);
          } else if (eventType === "done") {
            setStatus(data.success ? "done" : "error");
            if (data.success) {
              setUrl("");
              router.refresh();
            }
          } else if (eventType === "error") {
            setStatus("error");
            setLines((prev) => [...prev, `Error: ${data.message}`]);
          }
        }
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      throw e;
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-1 h-10 px-3 border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={status === "downloading"}
        />
        <Button
          type="submit"
          disabled={!url.trim()}
          className={status === "downloading" ? "hidden" : ""}
        >
          Download MP3
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleCancel}
          className={status !== "downloading" ? "hidden" : ""}
        >
          Cancel
        </Button>
      </form>

      {lines.length > 0 && (
        <div
          ref={logRef}
          className="bg-muted p-3 text-xs font-mono max-h-60 overflow-y-auto space-y-0.5"
        >
          {lines.map((line, i) => (
            <div key={i} className="text-muted-foreground">
              {line}
            </div>
          ))}
        </div>
      )}

      {status === "done" && (
        <p className="text-sm font-medium text-primary">
          Download complete!
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-destructive">
          Download failed. Check the log above for details.
        </p>
      )}
    </div>
  );
}
