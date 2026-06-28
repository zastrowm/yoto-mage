"use server";

import { readdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function listFiles(path: string): Promise<string[]> {
  const entries = await readdir(path);
  return entries;
}

export async function downloadTrack(url: string): Promise<{ success: boolean; message: string }> {
  try {
    const { stdout } = await execFileAsync("yt-dlp", [
      "--extract-audio",
      "--audio-format", "mp3",
      "-o", "%(title)s.%(ext)s",
      url,
    ]);
    return { success: true, message: stdout };
  } catch (e) {
    return { success: false, message: String(e) };
  }
}
