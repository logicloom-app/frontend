"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  trackScrollDepth,
  trackEngagementTime,
  trackButtonClick,
  trackFormSubmit,
  trackOutboundLink,
  trackFileDownload,
} from "@/lib/utils/gtag";

/**
 * Custom hook for Google Analytics tracking
 * Provides easy-to-use functions for tracking user interactions
 */
export function useAnalytics() {
  const engagementStartTime = useRef(null);
  const scrollDepthTracked = useRef(new Set());
  const currentPage = useRef("");

  // Initialize engagement tracking
  useEffect(() => {
    engagementStartTime.current = Date.now();
    currentPage.current = window.location.pathname;

    return () => {
      // Track engagement time when component unmounts
      if (engagementStartTime.current) {
        const timeSpent = Math.floor(
          (Date.now() - engagementStartTime.current) / 1000
        );
        if (timeSpent > 5) {
          // Only track if user spent more than 5 seconds
          trackEngagementTime(timeSpent, currentPage.current);
        }
      }
    };
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      // Track at 25%, 50%, 75%, and 100% milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !scrollDepthTracked.current.has(milestone)
        ) {
          scrollDepthTracked.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track button clicks
  const trackClick = useCallback((buttonName, location) => {
    trackButtonClick(buttonName, location || window.location.pathname);
  }, []);

  // Track form submission
  const trackSubmit = useCallback((formName, success = true) => {
    trackFormSubmit(formName, success);
  }, []);

  // Track outbound link clicks
  const trackExternal = useCallback((url, label) => {
    trackOutboundLink(url, label);
  }, []);

  // Track file downloads
  const trackDownload = useCallback((fileName, fileType) => {
    trackFileDownload(fileName, fileType);
  }, []);

  return {
    trackClick,
    trackSubmit,
    trackExternal,
    trackDownload,
  };
}

/**
 * Hook for tracking page-specific engagement metrics
 */
export function usePageTracking(pageName) {
  const startTime = useRef(Date.now());

  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (timeSpent > 5) {
        trackEngagementTime(timeSpent, pageName);
      }
    };
  }, [pageName]);
}
