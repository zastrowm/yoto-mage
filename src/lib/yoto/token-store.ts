import { join } from "node:path";
import { readFile, writeFile, mkdir } from "node:fs/promises";

export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

const TOKEN_PATH = join(process.cwd(), ".yoto-mage", "auth.json");

export async function getStoredTokens(): Promise<TokenData | null> {
  try {
    const raw = await readFile(TOKEN_PATH, "utf-8");
    return JSON.parse(raw) as TokenData;
  } catch {
    return null;
  }
}

export async function storeTokens(tokens: TokenData): Promise<void> {
  await mkdir(join(process.cwd(), ".yoto-mage"), { recursive: true });
  await writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
}

export async function clearTokens(): Promise<void> {
  try {
    const { unlink } = await import("node:fs/promises");
    await unlink(TOKEN_PATH);
  } catch {
    // already gone
  }
}
