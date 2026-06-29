# Yoto API Authentication

## Decision: Public Client with Authorization Code + PKCE

Yoto's OAuth is backed by Auth0. We use the public client flow (no client_secret) because this app is distributed as a desktop binary via GitHub — embedding a secret would be pointless.

## Flow

1. User clicks "Login" → `GET /api/auth/login` redirects to `login.yotoplay.com/authorize` with PKCE challenge
2. Yoto authenticates the user and redirects back to `/api/auth/callback` with an authorization code
3. Callback exchanges the code + PKCE verifier for access + refresh tokens at `/oauth/token`
4. Tokens are stored locally in `.yoto-mage/auth.json` (gitignored)
5. On subsequent requests, `getValidAccessToken()` checks expiry and refreshes automatically

## Why file-based token storage

This is a single-user desktop app. There's no database, no sessions to manage. The `.yoto-mage/` directory already exists for staging audio files, so we colocate auth state there. The file is never committed (gitignored).

## SDK integration

The official `@yotoplay/yoto-sdk` accepts a `jwt` (access token) in its config. We call `getValidAccessToken()` before each SDK interaction to ensure the token is fresh, then instantiate the SDK. The SDK itself has no token lifecycle management.

## Scopes

We request: `openid`, `profile`, `user:content:view`, `user:content:manage`, `user:icons:manage`, `family:library:view`, `offline_access`. This covers reading/writing MYO content and viewing the library. Device control scopes are omitted — not needed for playlist management.
