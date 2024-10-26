import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import { getUserDataMiddleware } from "./lib/utils/utils";

const locales = ["en", "de"];
const defaultLocale = "en";

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = match(languages, locales, defaultLocale);
  return locale;
}

export async function middleware(request) {
  const url = request.url;
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);
  const userData = await getUserDataMiddleware(request);
  const { user } = userData || {};

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathname.startsWith(`/${locale}/auth`)) {
    if (user?.is_active) {
      return NextResponse.redirect(new URL(`/${locale}`, url));
    }
  }

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)", "/"],
};
