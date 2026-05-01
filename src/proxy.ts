import { NextResponse, type NextRequest } from "next/server";

const TOKEN_COOKIE = "auth_token";
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/projects",
  "/calendar",
  "/team",
  "/settings",
];
const AUTH_PAGES = ["/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (AUTH_PAGES.includes(pathname) && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/calendar/:path*",
    "/team/:path*",
    "/settings/:path*",
    "/login",
  ],
};
