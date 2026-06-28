import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { STAGING_DIR } from "@/lib/constants";

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url)) {
    return Response.json({ error: "A valid HTTP(S) URL is required" }, { status: 400 });
  }

  await mkdir(STAGING_DIR, { recursive: true });

  let proc: ChildProcessWithoutNullStreams;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      proc = spawn("yt-dlp", [
        "-x",
        "--audio-format", "mp3",
        "--newline",
        "-o", `${STAGING_DIR}/%(title)s.%(ext)s`,
        "--",
        url,
      ]);

      function send(event: string, data: unknown) {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      }

      proc.stdout.on("data", (chunk: Buffer) => {
        const lines = chunk.toString().split("\n").filter(Boolean);
        for (const line of lines) {
          send("progress", { line });
        }
      });

      proc.stderr.on("data", (chunk: Buffer) => {
        const lines = chunk.toString().split("\n").filter(Boolean);
        for (const line of lines) {
          send("progress", { line });
        }
      });

      proc.on("close", (code) => {
        if (code === 0) {
          send("done", { success: true });
        } else {
          send("done", { success: false, code });
        }
        controller.close();
      });

      proc.on("error", (err) => {
        send("error", { message: err.message });
        controller.close();
      });
    },
    cancel() {
      proc?.kill();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
