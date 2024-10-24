import { NextResponse } from "next/server";
import { getUserDataMiddleware } from "./lib/utils/utils";

export async function middleware(request) {
  const url = request.url;
  const pathname = request.nextUrl.pathname;
}

export const config = {
  matcher: [],
};
