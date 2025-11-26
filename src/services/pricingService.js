import http from "./httpService";

export async function getWebsitePackages() {
  return http.get("/website-packages").then(({ data }) => data);
}
