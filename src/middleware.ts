import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCanonicalRedirectUrl } from "@/lib/canonicalUrl";

export function middleware(request: NextRequest) {
  const redirectUrl = getCanonicalRedirectUrl(request.nextUrl);

  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
