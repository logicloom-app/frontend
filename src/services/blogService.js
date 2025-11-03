import http from "./httpService";

export async function getBlogPosts({ limit = 10, offset = 0 } = {}) {
  return http.get(`/blog/posts?limit=${limit}&offset=${offset}`).then(({ data }) => {
    // API returns { posts: [...], total: X } OR single post object
    // Normalize to always return array format
    if (Array.isArray(data)) {
      return { posts: data, total: data.length };
    }
    if (data.posts) {
      return data;
    }
    // If single post returned, wrap it
    return { posts: data ? [data] : [], total: data ? 1 : 0 };
  });
}

export async function getBlogPostBySlug(slug) {
  return http.get(`/blog/posts/slug/${slug}`).then(({ data }) => {
    // API might return { post: {...} } or direct object
    return data?.post || data;
  });
}

export async function getBlogPostById(id) {
  return http.get(`/blog/posts/${id}`).then(({ data }) => data);
}

export async function getBlogCategories() {
  return http.get("/blog/categories").then(({ data }) => data);
}

export async function getBlogCategoryById(id) {
  return http.get(`/blog/categories/${id}`).then(({ data }) => data);
}

export async function getBlogTags() {
  return http.get("/blog/tags").then(({ data }) => data);
}

export async function getBlogTagById(id) {
  return http.get(`/blog/tags/${id}`).then(({ data }) => data);
}

export function getBlogImageUrl(filename) {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;

  // If filename already has /uploads path, prepend API URL
  if (filename.startsWith("/uploads")) {
    return `${process.env.NEXT_PUBLIC_API_URL}${filename}`;
  }

  // Otherwise, assume it's just the filename
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/blog/images/${filename}`;
}
