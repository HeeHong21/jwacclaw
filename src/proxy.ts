import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "kr"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.toLowerCase().includes("kr")) return "kr";
  return defaultLocale;
}

// While true, every page shows the "Coming soon" page.
// Set to false to make the full website visible again.
const COMING_SOON = true;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes are locale-independent — never prefix them with a locale.
  if (pathname.startsWith("/api")) return;

  if (COMING_SOON) {
    if (pathname === "/coming-soon") return;
    request.nextUrl.pathname = "/coming-soon";
    return NextResponse.rewrite(request.nextUrl);
  }
  // The coming-soon page is only reachable while COMING_SOON is on.
  if (pathname === "/coming-soon") {
    request.nextUrl.pathname = "/";
    return NextResponse.redirect(request.nextUrl);
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!hasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|public).*)"],
};
