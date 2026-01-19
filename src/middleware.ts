import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter
interface RateLimit {
  count: number;
  timestamp: number;
}
const rateLimit = new Map<string, RateLimit>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 100;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (record.count >= MAX_REQUESTS) return false;
  record.count++;
  return true;
}

export default withAuth(
  function middleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    
    // Rate limit check for API routes
    if (req.nextUrl.pathname.startsWith('/api') && !checkRateLimit(ip)) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/protected/:path*",
  ],
};
