import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function getUserDataMiddleware(request) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = request.cookies.get("access_token");

  try {
    const userData = await fetch(`${baseURL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    }).then((res) => res.json());

    return userData;
  } catch (error) {
    console.log(error);
  }
}
