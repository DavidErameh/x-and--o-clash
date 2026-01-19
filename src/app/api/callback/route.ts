import { NextRequest, NextResponse } from "next/server";
import { whopsdk } from "@/lib/whop";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    // If we were doing server-side code exchange:
    // const token = await whopsdk.token.exchange({ code });
    // But typically we might redirect to a signin page with the token/code
    
    // For now, redirect to home or dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}
