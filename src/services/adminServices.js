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

export async function getPayments() {
  const token = await useGetToken();

  return http
    .get("/admin/payments", { headers: { Authorization: `Bearer ${token?.value}` } })
    .then(({ data }) => data);
}

export async function getUserPayments(userId) {
  const token = await useGetToken();

  return http
    .get(`/admin/users/${userId}/payments`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function getRequests() {
  const token = await useGetToken();

  return http
    .get("/admin/projects/requests", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminDownloadRequest(userId, fileName) {
  const token = await useGetToken();

  return http.get(`/admin/projects/download/${userId}?file=${fileName}`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
}

export async function adminDeleteRequest(requestId) {
  const token = await useGetToken();

  return http
    .delete(`/admin/projects/requests/${requestId}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminUpdateRequest(data) {
  const token = await useGetToken();

  return http
    .put(`/admin/projects/requests/status`, data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminCreateProject(data) {
  const token = await useGetToken();

  return http
    .post("/admin/projects/create", data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminGetProjects() {
  const token = await useGetToken();

  return http
    .get("/admin/projects/all", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminGetProjectById(projectId) {
  const token = await useGetToken();

  return http
    .get(`/admin/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminDeleteProject(projectId) {
  const token = await useGetToken();

  return http
    .delete(`/admin/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminUpdateProjectStatus(data) {
  const token = await useGetToken();

  return http
    .put("/admin/projects/status", data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminUpdateProject({ data, projectId }) {
  const token = await useGetToken();

  return http
    .put(`/admin/projects/${projectId}`, data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminAdditionalRequest(projectId) {
  const token = await useGetToken();

  return http
    .get(`/admin/projects/${projectId}/additional-requests`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminUpdateAdditionalRequestStatus(data) {
  const token = await useGetToken();

  return http
    .put("/admin/projects/additional-requests/status", data, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function adminDeleteAdditionalRequest(requestId) {
  const token = await useGetToken();

  return http.delete(`/admin/projects/additional-requests/${requestId}`, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}

export async function adminSendFileToUser(formData) {
  const token = await useGetToken();

  return http
    .post("/admin/send-document", formData, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
}
