// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Log page views
export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  event({
    action: "click",
    category: "Button",
    label: `${buttonName} - ${location}`,
  });
};

// Track form submissions
export const trackFormSubmit = (formName, success = true) => {
  event({
    action: "submit",
    category: "Form",
    label: formName,
    value: success ? 1 : 0,
  });
};

// Track conversions
export const trackConversion = (conversionType, value) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: GA_MEASUREMENT_ID,
      event_category: "Conversion",
      event_label: conversionType,
      value: value,
    });
  }
};

// Track outbound links
export const trackOutboundLink = (url, label) => {
  event({
    action: "click",
    category: "Outbound Link",
    label: label || url,
  });
};

// Track file downloads
export const trackFileDownload = (fileName, fileType) => {
  event({
    action: "download",
    category: "File",
    label: `${fileName} (${fileType})`,
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  event({
    action: "scroll",
    category: "Engagement",
    label: `${percentage}% scroll`,
    value: percentage,
  });
};

// Track user engagement time
export const trackEngagementTime = (timeInSeconds, page) => {
  event({
    action: "engagement_time",
    category: "Engagement",
    label: page,
    value: timeInSeconds,
  });
};

// Track search queries
export const trackSearch = (searchTerm) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: searchTerm,
    });
  }
};

// Track video interactions
export const trackVideo = (action, videoTitle) => {
  event({
    action: action, // 'play', 'pause', 'complete'
    category: "Video",
    label: videoTitle,
  });
};

// Track errors
export const trackError = (errorMessage, location) => {
  event({
    action: "error",
    category: "Error",
    label: `${location}: ${errorMessage}`,
  });
};

// Track payment events
export const trackPayment = (paymentMethod, amount, currency = "EUR") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: Date.now().toString(),
      value: amount,
      currency: currency,
      payment_type: paymentMethod,
    });
  }
};

// Track user login
export const trackLogin = (method) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "login", {
      method: method,
    });
  }
};

// Track user registration
export const trackSignUp = (method) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "sign_up", {
      method: method,
    });
  }
};

// Track content views
export const trackContentView = (contentType, contentId, contentName) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      item_id: contentId,
      item_name: contentName,
      item_category: contentType,
    });
  }
};

// Track custom user timing
export const trackTiming = (category, variable, time, label) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "timing_complete", {
      name: variable,
      value: time,
      event_category: category,
      event_label: label,
    });
  }
};
