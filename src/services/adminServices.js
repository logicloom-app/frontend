import useGetToken from "@/lib/hooks/useGetToken";
import http from "./httpService";

export async function getUsers() {
  const token = await useGetToken();

  return http
    .get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
    .then(({ data }) => data);
}

export async function editUser(data) {
  const token = await useGetToken();

  return http
    .put(`/admin/user/data`, data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function addLoomBalance(data) {
  const token = await useGetToken();

  return http
    .put("/admin/user/add-loom-balance", data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function removeLoomBalance(data) {
  const token = await useGetToken();

  return http
    .put("/admin/user/remove-loom-balance", data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function getLoomPricing() {
  const token = await useGetToken();

  return http
    .get("/admin/loom-pricing", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function editLoomPrice(data) {
  const token = await useGetToken();

  return http
    .put("/admin/loom-pricing", data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}
