import http from "./httpService";

export function login(data) {
  return http.post("/login", data).then(({ data }) => data);
}

export function logout() {
  return http.post("/logout").then(({ data }) => data);
}

export function register(data) {
  return http.post("/register", data).then(({ data }) => data);
}

export function generateOtp(data) {
  return http.post("/generate-otp", data).then(({ data }) => data);
}

export function googleCallback(data) {
  return http.get(`/auth/google/callback?${data}`).then(({ data }) => data);
}

export function resetPasswordSendOtp(data) {
  return http.post("/forgot-password", data).then(({ data }) => data);
}

export function resetPassword(data) {
  return http.post("/reset-password", data).then(({ data }) => data);
}
