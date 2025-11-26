import http from "./httpService";

// Public endpoint - get active announcements
export async function getAnnouncements() {
  return http.get("/announcements").then(({ data }) => data);
}
