"use server";

import { getStoredTokens } from "./token-store";
import { getYotoClient } from "./client";
import { getCachedMediaUrl, setCachedMediaUrl } from "./media-cache";

export async function getAuthStatus() {
  const tokens = await getStoredTokens();
  return { authenticated: tokens !== null };
}

export async function fetchMyCards() {
  const client = await getYotoClient();
  if (!client) return null;
  return await client.content.getMyCards();
}

export async function fetchCard(cardId: string) {
  const client = await getYotoClient();
  if (!client) return null;
  return await client.content.getCard(cardId);
}

export async function resolveMediaUrl(cardId: string, yotoRef: string): Promise<string | null> {
  const cacheKey = `${cardId}:${yotoRef}`;
  const cached = await getCachedMediaUrl(cacheKey);
  if (cached) return cached;

  const client = await getYotoClient();
  if (!client) return null;

  const mediaId = client.extractMediaId(yotoRef);
  if (!mediaId) return null;

  try {
    const url = await client.media.getMediaUrl(cardId, mediaId);
    await setCachedMediaUrl(cacheKey, url);
    return url;
  } catch {
    return null;
  }
}
