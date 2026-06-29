export const YOTO_AUTH_DOMAIN = "https://login.yotoplay.com";
export const YOTO_API_AUDIENCE = "https://api.yotoplay.com";
export const YOTO_CLIENT_ID = process.env.YOTO_CLIENT_ID ?? "";
export const YOTO_REDIRECT_URI =
  process.env.YOTO_REDIRECT_URI ?? "http://localhost:3000/api/auth/callback";
export const YOTO_SCOPES = [
  "openid",
  "profile",
  "user:content:view",
  "user:content:manage",
  "user:icons:manage",
  "family:library:view",
  "offline_access",
].join(" ");
