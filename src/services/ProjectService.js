import useGetToken from "@/lib/hooks/useGetToken";
import http from "./httpService";

export async function getRequests() {
  const token = await useGetToken();

  return http
    .get("/projects/requests", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function getRequestById(id) {
  const token = await useGetToken();

  return http
    .get(`/projects/requests/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}
