"use server";

import { readdir, mkdir, stat, unlink, rename } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join, extname } from "node:path";
import { STAGING_DIR } from "@/lib/constants";

const execFileAsync = promisify(execFile);

let ytDlpCache: { available: boolean; version?: string } | null = null;
let ytDlpCacheTime = 0;
const CACHE_TTL = 60_000;

export async function checkYtDlp(forceRefresh = false): Promise<{ available: boolean; version?: string }> {
  if (!forceRefresh && ytDlpCache && Date.now() - ytDlpCacheTime < CACHE_TTL) {
    return ytDlpCache;
  }
  try {
    const { stdout } = await execFileAsync("yt-dlp", ["--version"]);
    ytDlpCache = { available: true, version: stdout.trim() };
  } catch {
    ytDlpCache = { available: false };
  }
  ytDlpCacheTime = Date.now();
  return ytDlpCache;
}

export async function listStagedFiles(): Promise<
  { name: string; size: number; modified: number }[]
> {
  await mkdir(STAGING_DIR, { recursive: true });
  const entries = await readdir(STAGING_DIR);
  const mp3s = entries.filter((f) => f.endsWith(".mp3"));

  const results = await Promise.all(
    mp3s.map(async (name) => {
      const s = await stat(join(STAGING_DIR, name));
      return { name, size: s.size, modified: s.mtimeMs };
    })
  );

  return results.sort((a, b) => b.modified - a.modified);
}

export async function deleteStagedFile(name: string): Promise<{ success: boolean; error?: string }> {
  if (!name || name.includes("/") || name.includes("\\")) {
    return { success: false, error: "Invalid filename" };
  }
  try {
    await unlink(join(STAGING_DIR, name));
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function renameStagedFile(
  oldName: string,
  newName: string
): Promise<{ success: boolean; error?: string }> {
  if (!oldName || !newName || oldName.includes("/") || newName.includes("/") || oldName.includes("\\") || newName.includes("\\")) {
    return { success: false, error: "Invalid filename" };
  }
  const ext = extname(oldName);
  const finalName = newName.endsWith(ext) ? newName : newName + ext;
  try {
    await rename(join(STAGING_DIR, oldName), join(STAGING_DIR, finalName));
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
