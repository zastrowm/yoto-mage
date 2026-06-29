import {
  YOTO_AUTH_DOMAIN,
  YOTO_API_AUDIENCE,
  YOTO_CLIENT_ID,
  YOTO_REDIRECT_URI,
  YOTO_SCOPES,
} from "./config";
import { generateCodeVerifier, generateCodeChallenge, generateState } from "./pkce";
import { getStoredTokens, storeTokens, type TokenData } from "./token-store";

export interface AuthorizationRequest {
  url: string;
  state: string;
  codeVerifier: string;
}

export function buildAuthorizationUrl(): AuthorizationRequest {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  const params = new URLSearchParams({
    response_type: "code",
    client_id: YOTO_CLIENT_ID,
    redirect_uri: YOTO_REDIRECT_URI,
    scope: YOTO_SCOPES,
    audience: YOTO_API_AUDIENCE,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return {
    url: `${YOTO_AUTH_DOMAIN}/authorize?${params.toString()}`,
    state,
    codeVerifier,
  };
}

export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string,
): Promise<TokenData> {
  const res = await fetch(`${YOTO_AUTH_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: YOTO_CLIENT_ID,
      code,
      redirect_uri: YOTO_REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  const tokens: TokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };

  await storeTokens(tokens);
  return tokens;
}

export async function refreshAccessToken(): Promise<TokenData> {
  const existing = await getStoredTokens();
  if (!existing?.refresh_token) {
    throw new Error("No refresh token available");
  }

  const res = await fetch(`${YOTO_AUTH_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: YOTO_CLIENT_ID,
      refresh_token: existing.refresh_token,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  const tokens: TokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? existing.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };

  await storeTokens(tokens);
  return tokens;
}

export async function getValidAccessToken(): Promise<string | null> {
  const tokens = await getStoredTokens();
  if (!tokens) return null;

  // Refresh if expiring within 60 seconds
  if (Date.now() > tokens.expires_at - 60_000) {
    try {
      const refreshed = await refreshAccessToken();
      return refreshed.access_token;
    } catch {
      return null;
    }
  }

  return tokens.access_token;
}
