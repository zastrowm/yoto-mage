/// <reference lib="deno.ns" />

import { createYotoSdk } from "npm:@yotoplay/yoto-sdk";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

async function getSdk() {
  const tokenPath = join(Deno.cwd(), ".yoto-mage", "auth.json");
  const raw = await readFile(tokenPath, "utf-8");
  const data = JSON.parse(raw);
  return createYotoSdk({ jwt: data.access_token });
}

Deno.test("resolve icon16x16 reference", async () => {
  const sdk = await getSdk();
  const cards = await sdk.content.getMyCards();
  if (cards.length === 0) return;

  const card = await sdk.content.getCard(cards[0].cardId);
  const content = card.content as any;
  const chapter = content.chapters?.[0];
  const iconRef = chapter?.display?.icon16x16;

  console.log(`  Icon ref: ${iconRef}`);

  if (!iconRef) return;

  const mediaId = sdk.extractMediaId(iconRef);
  console.log(`  Extracted mediaId: ${mediaId}`);

  // Try getMediaUrl with the icon reference
  try {
    const url = await sdk.media.getMediaUrl(cards[0].cardId, mediaId!);
    console.log(`  Resolved URL: ${url}`);
  } catch (e: any) {
    console.log(`  getMediaUrl failed: ${e.message}`);
  }

  // Try resolving a track's trackUrl instead
  const trackRef = chapter?.tracks?.[0]?.trackUrl;
  console.log(`  Track ref: ${trackRef}`);
  if (trackRef) {
    const trackMediaId = sdk.extractMediaId(trackRef);
    console.log(`  Track mediaId: ${trackMediaId}`);
    try {
      const url = await sdk.media.getMediaUrl(cards[0].cardId, trackMediaId!);
      console.log(`  Track URL resolved: ${url.substring(0, 80)}...`);
    } catch (e: any) {
      console.log(`  Track getMediaUrl failed: ${e.message}`);
    }
  }
});

Deno.test("check getDisplayIcons structure", async () => {
  const sdk = await getSdk();
  const icons = await sdk.icons.getDisplayIcons() as any;

  // Check if icons have URLs or references
  const sample = Array.isArray(icons) ? icons.slice(0, 3) : Object.entries(icons).slice(0, 3);
  console.log(`  Sample icons: ${JSON.stringify(sample, null, 2)}`);
});
