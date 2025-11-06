/**
 * Dynamic Sitemap Generator for LogicLoom
 * Automatically generates sitemap for Google Search Console
 * Updates: 2025-11-06
 */

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://logicloom.de";

  // Supported languages
  const languages = ["en", "de"];

  // Static pages that exist for both languages
  const staticPages = [
    "", // Home
    "about",
    "services",
    "pricing",
    "loom",
    "request",
    "contact",
    "blog",
    "auth",
    "auth/password-reset",
    "privacy",
    "terms",
    "imprint",
  ];

  // Dashboard pages (require authentication)
  const dashboardPages = [
    "dashboard",
    "dashboard/info",
    "dashboard/password",
    "dashboard/projects",
    "dashboard/requests",
    "dashboard/payments",
  ];

  // Admin pages (require admin role)
  const adminPages = [
    "admin",
    "admin/users",
    "admin/projects",
    "admin/requests",
    "admin/payments",
    "admin/loom",
    "admin/blog/posts",
  ];

  const currentDate = new Date();

  // Generate sitemap entries
  const sitemapEntries = [];

  // Add root redirects (/ redirects to /en or /de based on locale)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Add static pages for each language
  languages.forEach((lang) => {
    staticPages.forEach((page) => {
      const url = page ? `${baseUrl}/${lang}/${page}` : `${baseUrl}/${lang}`;

      // Determine priority and change frequency
      let priority = 0.8;
      let changeFrequency = "weekly";

      if (page === "") {
        priority = 1.0;
        changeFrequency = "daily";
      } else if (["services", "pricing", "loom"].includes(page)) {
        priority = 0.9;
        changeFrequency = "weekly";
      } else if (page === "blog") {
        priority = 0.9;
        changeFrequency = "daily";
      } else if (["privacy", "terms", "imprint"].includes(page)) {
        priority = 0.3;
        changeFrequency = "monthly";
      }

      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency,
        priority,
      });
    });
  });

  // Add dashboard pages (lower priority as they're behind auth)
  languages.forEach((lang) => {
    dashboardPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    });
  });

  // Add admin pages (lowest priority)
  languages.forEach((lang) => {
    adminPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.3,
      });
    });
  });

  // TODO: Fetch dynamic blog posts from API and add them
  // Example:
  // const posts = await fetchBlogPosts();
  // posts.forEach(post => {
  //   languages.forEach(lang => {
  //     sitemapEntries.push({
  //       url: `${baseUrl}/${lang}/blog/${post.slug}`,
  //       lastModified: post.updatedAt || currentDate,
  //       changeFrequency: 'weekly',
  //       priority: 0.7,
  //     });
  //   });
  // });

  return sitemapEntries;
}
