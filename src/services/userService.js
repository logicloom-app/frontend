import http from "./httpService";
import useGetToken from "@/lib/hooks/useGetToken";

export async function getUser() {
  const token = await useGetToken();

  return http
    .get("/user", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
    .then(({ data }) => data);
}

export async function updateProfile(data) {
  const token = await useGetToken();

  return http
    .put("/profile", data, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
    .then(({ data }) => data);
}

export async function updatePassword(data) {
  const token = await useGetToken();

  return http
    .put("/password", data, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
    .then(({ data }) => data);
}
