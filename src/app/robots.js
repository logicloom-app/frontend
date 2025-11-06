/**
 * Robots.txt Generator for LogicLoom
 * Controls search engine crawlers
 */

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://logicloom.de";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/*", // Private user dashboard
          "/admin/*", // Admin panel
          "/api/*", // API routes
          "/*?*", // Query parameters (avoid duplicate content)
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/*", "/admin/*", "/api/*"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/dashboard/*", "/admin/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
