import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForTokens } from "@/lib/yoto/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error)}`, request.url),
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?error=missing_params", request.url));
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get("yoto_state")?.value;
  const codeVerifier = cookieStore.get("yoto_code_verifier")?.value;

  if (!storedState || storedState !== state) {
    return NextResponse.redirect(new URL("/?error=state_mismatch", request.url));
  }

  if (!codeVerifier) {
    return NextResponse.redirect(new URL("/?error=missing_verifier", request.url));
  }

  try {
    await exchangeCodeForTokens(code, codeVerifier);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(msg)}`, request.url),
    );
  }

  // Clean up PKCE cookies
  cookieStore.delete("yoto_state");
  cookieStore.delete("yoto_code_verifier");

  return NextResponse.redirect(new URL("/library", request.url));
}
