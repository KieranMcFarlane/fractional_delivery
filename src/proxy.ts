import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { stripEnglishPrefix } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const redirected = stripEnglishPrefix(request.nextUrl.pathname);
  if (redirected) {
    const url = request.nextUrl.clone();
    url.pathname = redirected;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
