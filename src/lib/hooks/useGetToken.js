"use server";

import { cookies } from "next/headers";

export default async function useGetToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  return token;
}
