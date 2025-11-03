import http from "./httpService";
import useGetToken from "@/lib/hooks/useGetToken";

export async function getAdminBlogPosts({ limit = 10, offset = 0, status } = {}) {
  const token = await useGetToken();
  let url = `/admin/blog/posts?limit=${limit}&offset=${offset}`;
  if (status) url += `&status=${status}`;

  return http
    .get(url, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function getAdminBlogPostById(id) {
  const token = await useGetToken();
  return http
    .get(`/admin/blog/posts/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function createBlogPost(postData) {
  const token = await useGetToken();
  return http
    .post("/admin/blog/posts", postData, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function createBlogPostWithImage(formData) {
  const token = await useGetToken();
  return http
    .post("/admin/blog/posts/with-image", formData, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
}

export async function updateBlogPost(id, postData) {
  const token = await useGetToken();
  return http
    .put(`/admin/blog/posts/${id}`, postData, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function deleteBlogPost(id) {
  const token = await useGetToken();
  return http
    .delete(`/admin/blog/posts/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

// ==================== IMAGES ====================

export async function uploadBlogImage(file) {
  const token = await useGetToken();
  const formData = new FormData();
  formData.append("image", file);

  return http
    .post("/admin/blog/images/upload", formData, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
}

export async function deleteBlogImage(filename) {
  const token = await useGetToken();
  return http
    .delete(`/admin/blog/images/${filename}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

// ==================== CATEGORIES ====================

export async function getAdminBlogCategories() {
  const token = await useGetToken();
  return http
    .get("/admin/blog/categories", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function getAdminBlogCategoryById(id) {
  const token = await useGetToken();
  return http
    .get(`/admin/blog/categories/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function createBlogCategory(categoryData) {
  const token = await useGetToken();
  return http
    .post("/admin/blog/categories", categoryData, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function updateBlogCategory(id, categoryData) {
  const token = await useGetToken();
  return http
    .put(`/admin/blog/categories/${id}`, categoryData, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function deleteBlogCategory(id) {
  const token = await useGetToken();
  return http
    .delete(`/admin/blog/categories/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

// ==================== TAGS ====================

export async function getAdminBlogTags() {
  const token = await useGetToken();
  return http
    .get("/admin/blog/tags", {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function getAdminBlogTagById(id) {
  const token = await useGetToken();
  return http
    .get(`/admin/blog/tags/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function createBlogTag(tagData) {
  const token = await useGetToken();
  return http
    .post("/admin/blog/tags", tagData, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function updateBlogTag(id, tagData) {
  const token = await useGetToken();
  return http
    .put(`/admin/blog/tags/${id}`, tagData, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}

export async function deleteBlogTag(id) {
  const token = await useGetToken();
  return http
    .delete(`/admin/blog/tags/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    })
    .then(({ data }) => data);
}
