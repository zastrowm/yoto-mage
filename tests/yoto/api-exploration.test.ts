/// <reference lib="deno.ns" />

/**
 * Exploration tests for the Yoto API. These hit the real API using stored tokens
 * and dump responses to understand data shapes. Run with:
 *
 *   deno test tests/yoto/ --allow-read --allow-net --allow-env
 *
 * Requires a valid .yoto-mage/auth.json (login via the app first).
 */

import { assertEquals, assertExists } from "jsr:@std/assert";
import { createYotoSdk } from "npm:@yotoplay/yoto-sdk";
import { join } from "node:path";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const SNAPSHOT_DIR = join(Deno.cwd(), "tests", "yoto", "snapshots");

async function getAccessToken(): Promise<string> {
  const tokenPath = join(Deno.cwd(), ".yoto-mage", "auth.json");
  const raw = await readFile(tokenPath, "utf-8");
  const data = JSON.parse(raw);
  return data.access_token;
}

async function saveSnapshot(name: string, data: unknown) {
  await mkdir(SNAPSHOT_DIR, { recursive: true });
  const path = join(SNAPSHOT_DIR, `${name}.json`);
  await writeFile(path, JSON.stringify(data, null, 2));
  console.log(`  Snapshot saved: ${path}`);
}

function getSdk() {
  return getAccessToken().then((jwt) => createYotoSdk({ jwt }));
}

Deno.test("getMyCards - list all playlists", async () => {
  const sdk = await getSdk();
  const cards = await sdk.content.getMyCards();

  assertExists(cards);
  console.log(`  Found ${cards.length} cards`);
  await saveSnapshot("getMyCards", cards);

  if (cards.length > 0) {
    const first = cards[0];
    assertExists(first.cardId);
    assertExists(first.title);
    console.log(`  First card: "${first.title}" (${first.cardId})`);
  }
});

Deno.test("getCard - fetch single card details", async () => {
  const sdk = await getSdk();
  const cards = await sdk.content.getMyCards();

  if (cards.length === 0) {
    console.log("  Skipping: no cards available");
    return;
  }

  const cardId = cards[0].cardId;
  const detail = await sdk.content.getCard(cardId);

  assertExists(detail);
  assertExists(detail.content);
  assertExists(detail.metadata);
  await saveSnapshot("getCard", detail);

  const content = detail.content as any;
  console.log(`  Card "${(detail as any).title}": ${content.chapters?.length ?? 0} chapters`);
  console.log(`  Playback type: ${content.playbackType}`);
  console.log(`  Top-level keys: ${Object.keys(detail).join(", ")}`);
  console.log(`  Content keys: ${Object.keys(content).join(", ")}`);
  console.log(`  Metadata keys: ${Object.keys(detail.metadata).join(", ")}`);
});

Deno.test("getMyDevices - list players", async () => {
  const sdk = await getSdk();
  try {
    const devices = await sdk.devices.getMyDevices();
    assertExists(devices);
    console.log(`  Found ${devices.length} devices`);
    await saveSnapshot("getMyDevices", devices);

    for (const device of devices) {
      const d = device as any;
      console.log(`  Device: ${d.name ?? d.deviceId} (${d.deviceId})`);
    }
  } catch (e: any) {
    if (e.message?.includes("403")) {
      console.log("  Skipped: no device scope (family:devices:view) granted");
      return;
    }
    throw e;
  }
});

Deno.test("getDisplayIcons - list available icons", async () => {
  const sdk = await getSdk();
  const icons = await sdk.icons.getDisplayIcons();

  assertExists(icons);
  console.log(`  Found ${(icons as any[]).length ?? "unknown"} icons`);
  await saveSnapshot("getDisplayIcons", icons);
});
