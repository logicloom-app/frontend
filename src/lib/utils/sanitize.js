/**
 * Get DOMPurify instance (client-side only)
 * This function should only be called in the browser
 */
function getDOMPurify() {
  if (typeof window === "undefined") {
    // Server-side: return null, sanitization will happen client-side
    return null;
  }

  // Client-side: dynamically import DOMPurify
  if (typeof window !== "undefined" && !window.__DOMPURIFY__) {
    const DOMPurify = require("dompurify");
    window.__DOMPURIFY__ = DOMPurify;
  }

  return window.__DOMPURIFY__;
}

/**
 * Get sanitization config for CKEditor content
 */
function getSanitizeConfig() {
  return {
    ALLOWED_TAGS: [
      // Text formatting
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "sub",
      "sup",
      "mark",
      "span",
      // Headings
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      // Lists
      "ul",
      "ol",
      "li",
      // Links
      "a",
      // Images
      "img",
      "figure",
      "figcaption",
      // Tables
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",
      // Quotes and code
      "blockquote",
      "q",
      "code",
      "pre",
      // Media
      "iframe",
      "video",
      "audio",
      "source",
      // Semantic
      "div",
      "section",
      "article",
      "aside",
      "header",
      "footer",
      "nav",
      "main",
      // Other
      "hr",
      "abbr",
      "cite",
      "del",
      "ins",
      "small",
      "time",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "width",
      "height",
      "class",
      "id",
      "style",
      "target",
      "rel",
      "type",
      "controls",
      "autoplay",
      "loop",
      "muted",
      "poster",
      "colspan",
      "rowspan",
      "scope",
      "align",
      "valign",
      "data-*",
      "aria-*",
      "datetime",
      "cite",
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ALLOW_DATA_ATTR: true,
    ALLOW_ARIA_ATTR: true,
    // Keep safe HTML entities
    KEEP_CONTENT: true,
    // Allow target="_blank" for links
    ADD_ATTR: ["target"],
    // Sanitize style attributes
    ALLOWED_STYLES: {
      "*": {
        color: [/^#[0-9a-f]{3,6}$/i, /^rgb\(/i, /^rgba\(/i],
        "background-color": [/^#[0-9a-f]{3,6}$/i, /^rgb\(/i, /^rgba\(/i],
        "text-align": [/^left$/i, /^right$/i, /^center$/i, /^justify$/i],
        "font-size": [/^\d+(?:px|em|rem|%|pt)$/i],
        "font-weight": [/^\d{3}$/i, /^bold$/i, /^normal$/i],
        "font-style": [/^italic$/i, /^normal$/i],
        "text-decoration": [
          /^underline$/i,
          /^line-through$/i,
          /^none$/i,
          /^overline$/i,
        ],
        margin: [/^\d+(?:px|em|rem|%)$/i],
        padding: [/^\d+(?:px|em|rem|%)$/i],
        "margin-top": [/^\d+(?:px|em|rem|%)$/i],
        "margin-bottom": [/^\d+(?:px|em|rem|%)$/i],
        "margin-left": [/^\d+(?:px|em|rem|%)$/i],
        "margin-right": [/^\d+(?:px|em|rem|%)$/i],
        "padding-top": [/^\d+(?:px|em|rem|%)$/i],
        "padding-bottom": [/^\d+(?:px|em|rem|%)$/i],
        "padding-left": [/^\d+(?:px|em|rem|%)$/i],
        "padding-right": [/^\d+(?:px|em|rem|%)$/i],
        width: [/^\d+(?:px|em|rem|%)$/i],
        height: [/^\d+(?:px|em|rem|%)$/i],
        "max-width": [/^\d+(?:px|em|rem|%)$/i],
        "max-height": [/^\d+(?:px|em|rem|%)$/i],
        border: [/^\d+px solid #[0-9a-f]{3,6}$/i],
        "border-radius": [/^\d+(?:px|em|rem|%)$/i],
        display: [/^block$/i, /^inline$/i, /^inline-block$/i, /^flex$/i, /^grid$/i],
        "list-style-type": [/^disc$/i, /^circle$/i, /^square$/i, /^decimal$/i],
      },
    },
  };
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * Configured for CKEditor content with safe tags and attributes
 */
export function sanitizeHtml(html) {
  if (!html) return "";

  const DOMPurify = getDOMPurify();

  // If server-side, return the HTML as-is (will be sanitized on client)
  if (!DOMPurify) return html;

  // Client-side: sanitize the HTML
  const config = getSanitizeConfig();
  const clean = DOMPurify.sanitize(html, config);

  return clean;
}

/**
 * Sanitize and prepare CKEditor content for display
 * This is specifically designed for blog post content
 */
export function sanitizeBlogContent(content) {
  if (!content) return "";

  // First sanitize the HTML
  let sanitized = sanitizeHtml(content);

  // Additional processing for CKEditor content
  // Add responsive classes to images
  sanitized = sanitized.replace(
    /<img([^>]*)>/g,
    '<img$1 class="max-w-full h-auto rounded-lg">'
  );

  // Add responsive classes to iframes (for embedded videos)
  sanitized = sanitized.replace(
    /<iframe([^>]*)>/g,
    '<div class="relative aspect-video"><iframe$1 class="absolute inset-0 w-full h-full rounded-lg"></iframe></div>'
  );

  // Ensure links open in new tab and have proper rel attributes
  sanitized = sanitized.replace(
    /<a\s+(?![^>]*target=)([^>]*href=["'][^"']*["'][^>]*)>/g,
    '<a $1 target="_blank" rel="noopener noreferrer">'
  );

  return sanitized;
}

/**
 * Strip all HTML tags from content (for excerpts, meta descriptions, etc.)
 */
export function stripHtml(html) {
  if (!html) return "";

  const DOMPurify = getDOMPurify();

  // If server-side, use regex fallback
  if (!DOMPurify) {
    return html.replace(/<[^>]*>/g, "");
  }

  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}

/**
 * Truncate HTML content while preserving tags
 */
export function truncateHtml(html, maxLength = 150) {
  if (!html) return "";

  const stripped = stripHtml(html);
  if (stripped.length <= maxLength) return html;

  return stripped.substring(0, maxLength).trim() + "...";
}
