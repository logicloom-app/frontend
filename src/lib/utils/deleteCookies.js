"use server";

import { cookies } from "next/headers";

export async function deleteCookies(...names) {
  const cookieStore = await cookies();
  names.forEach((name) => {
    cookieStore.delete(name);
  });
}
