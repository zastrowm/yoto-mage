import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildAuthorizationUrl } from "@/lib/yoto/auth";

export async function GET() {
  const { url, state, codeVerifier } = buildAuthorizationUrl();

  const cookieStore = await cookies();
  cookieStore.set("yoto_state", state, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  cookieStore.set("yoto_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  return NextResponse.redirect(url);
}
