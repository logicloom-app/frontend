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

export async function getProjects() {
  const token = await useGetToken();

  return http
    .get("/projects/all", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function getProjectById(id) {
  const token = await useGetToken();

  return http
    .get(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function acceptProject(id) {
  const token = await useGetToken();

  return http.put(`/projects/${id}/accept`, null, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}

export async function payForProject(id) {
  const token = await useGetToken();

  return http.post(`/projects/payment/${id}`, null, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}

export async function premiumDesign(id) {
  const token = await useGetToken();

  return http.post(`/projects/${id}/premium-design/pay`, null, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}

export async function priorityTicket(id) {
  const token = await useGetToken();

  return http.post(`/projects/${id}/priority-ticket/pay`, null, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}

export async function supportSub({ id, months }) {
  const token = await useGetToken();

  return http.post(
    `/projects/${id}/support-subscription/pay`,
    { months },
    {
      headers: { Authorization: `Bearer ${token?.value}` },
    }
  );
}

export async function additionalRequest(data) {
  const token = await useGetToken();

  return http.post(`/projects/additional-request`, data, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}

export async function deleteAdditionalRequest(requestId) {
  const token = await useGetToken();

  return http.delete(`/projects/additional-request/${requestId}`, {
    headers: { Authorization: `Bearer ${token?.value}` },
  });
}

export async function getAdditionalRequests(projectId, userId) {
  const token = await useGetToken();

  return http
    .get(`/projects/additional-requests/${projectId}/${userId}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function payForAdditionalRequest(data) {
  const token = await useGetToken();

  return http.post(
    `/projects/${data?.project_id}/additional-requests/${data?.request_id}/pay`,
    null,
    {
      headers: { Authorization: `Bearer ${token?.value}` },
    }
  );
}
