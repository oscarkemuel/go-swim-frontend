import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  {
    path: "/sign-in",
    whenAuthenticated: "redirect",
  },
  {
    path: "/sign-up",
    whenAuthenticated: "redirect",
  },
  {
    path: "/forgot-password",
    whenAuthenticated: "redirect",
  },
  {
    path: "/reset-password",
    whenAuthenticated: "redirect",
  },
  {
    path: "/home",
    whenAuthenticated: "next",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/home";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const sessionCookie = request.cookies.get("better-auth.session_token");

  if (sessionCookie && !publicRoute) {
    return NextResponse.next();
  }

  if (!sessionCookie && publicRoute) {
    return NextResponse.next();
  }

  if (!sessionCookie && !publicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(url);
  }

  if (
    sessionCookie &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
