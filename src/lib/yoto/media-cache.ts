import { join } from "node:path";
import { readFile, writeFile, mkdir } from "node:fs/promises";

interface CacheEntry {
  url: string;
  expiresAt: number;
}

const CACHE_DIR = join(process.cwd(), ".yoto-mage", "cache");
const CACHE_FILE = join(CACHE_DIR, "media-urls.json");

let cache: Record<string, CacheEntry> | null = null;

async function loadCache(): Promise<Record<string, CacheEntry>> {
  if (cache) return cache;
  try {
    const raw = await readFile(CACHE_FILE, "utf-8");
    cache = JSON.parse(raw);
    return cache!;
  } catch {
    cache = {};
    return cache;
  }
}

async function persistCache(): Promise<void> {
  if (!cache) return;
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(CACHE_FILE, JSON.stringify(cache));
}

function parseExpiresFromUrl(url: string): number {
  try {
    const u = new URL(url);
    const expires = u.searchParams.get("Expires");
    if (expires) return parseInt(expires, 10) * 1000;
  } catch {}
  // Fallback: 25 minutes (conservative under SDK's 30-min default)
  return Date.now() + 25 * 60 * 1000;
}

export async function getCachedMediaUrl(key: string): Promise<string | null> {
  const entries = await loadCache();
  const entry = entries[key];
  if (!entry) return null;

  if (Date.now() >= entry.expiresAt) {
    delete entries[key];
    return null;
  }

  return entry.url;
}

export async function setCachedMediaUrl(key: string, url: string): Promise<void> {
  const entries = await loadCache();
  entries[key] = {
    url,
    expiresAt: parseExpiresFromUrl(url),
  };
  await persistCache();
}
