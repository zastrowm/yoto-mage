import { createYotoSdk } from "@yotoplay/yoto-sdk";
import { getValidAccessToken } from "./auth";

export async function getYotoClient() {
  const jwt = await getValidAccessToken();
  if (!jwt) {
    return null;
  }
  return createYotoSdk({ jwt });
}
