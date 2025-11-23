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
  // NOTE: Excluding auth, dashboard, and admin pages - these should not be indexed
  const staticPages = [
    "", // Home
    "about",
    "services",
    "pricing",
    "loom",
    "request",
    "contact",
    "blog",
    "privacy",
    "terms",
    "imprint",
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
        alternates: {
          languages: {
            en: `${baseUrl}/en${page ? `/${page}` : ""}`,
            de: `${baseUrl}/de${page ? `/${page}` : ""}`,
          },
        },
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
