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

export async function sendRequest(data) {
  const token = await useGetToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return http.post("/projects/request", formData, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteRequest(id) {
  const token = await useGetToken();

  return http.delete(`/projects/requests/${id}`, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}
