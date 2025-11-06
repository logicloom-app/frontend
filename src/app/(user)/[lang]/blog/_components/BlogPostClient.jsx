"use client";

import {
  TbCalendar,
  TbClock,
  TbArrowLeft,
  TbTag,
  TbFolder,
  TbShare,
  TbBrandTwitter,
  TbBrandFacebook,
  TbBrandLinkedin,
} from "react-icons/tb";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { formatDate } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import BlurFade from "@/components/ui/blur-fade";
import { trackContentView } from "@/lib/utils/gtag";
import BlogContent from "@/components/ui/blog-content";
import { BlogPostDetailSkeleton } from "./BlogSkeleton";
import { sanitizeBlogContent } from "@/lib/utils/sanitize";
import { usePageTracking } from "@/lib/hooks/useAnalytics";
import { getBlogPostBySlug, getBlogImageUrl } from "@/services/blogService";

export default function BlogPostClient({ lang, slug, dict }) {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug(slug),
  });

  // Track page views with engagement time
  usePageTracking(`Blog: ${post?.title || slug}`);

  // Debug logs
  console.log("🔍 Blog Post Debug:", {
    slug,
    post,
    postKeys: post ? Object.keys(post) : [],
    isLoading,
    error: error?.message,
    errorDetails: error,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  });

  // Sanitize content on client-side only
  const sanitizedContent = useMemo(() => {
    if (!post?.content) return "";
    return sanitizeBlogContent(post.content);
  }, [post?.content]);

  // Track blog post view and scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      trackContentView("Blog Post", post.id, post.title);
    }
  }, [slug, post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 dark:opacity-5 pointer-events-none"></div>
        <div className="relative container mx-auto px-4 py-12">
          <BlogPostDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          {dict?.postNotFound || "Post Not Found"}
        </h1>
        <Link
          href={`/${lang}/blog`}
          className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-4 transition-all"
        >
          <TbArrowLeft className="w-5 h-5" />
          <span>{dict?.backToBlog || "Back to Blog"}</span>
        </Link>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = post.title;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 dark:opacity-5 pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Back Button */}
        <BlurFade delay={0.1} inView>
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:gap-4 transition-all mb-8 group"
          >
            <TbArrowLeft className="w-5 h-5" />
            <span className="font-semibold">
              {dict?.backToBlog || "Back to Blog"}
            </span>
          </Link>
        </BlurFade>

        <div className="max-w-5xl mx-auto">
          <article className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <BlurFade delay={0.2} inView>
              <header className="px-6 md:px-12 pt-12 pb-8">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {post.categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <TbFolder className="inline w-4 h-4 mr-2" />
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700/50 px-4 py-2 rounded-full">
                    <TbCalendar className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    <span className="font-medium">
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                  </div>
                  {post.reading_time && (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700/50 px-4 py-2 rounded-full">
                      <TbClock className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                      <span className="font-medium">
                        {post.reading_time} {dict?.readingTime || "min read"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <TbTag className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-sm px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium hover:shadow-md transition-shadow cursor-pointer"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </header>
            </BlurFade>

            {/* Cover Image */}
            {post.cover_image_url && (
              <BlurFade delay={0.3} inView>
                <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                  <img
                    src={getBlogImageUrl(post.cover_image_url)}
                    alt={post.title}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </BlurFade>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <BlurFade delay={0.4} inView>
                <div className="px-6 md:px-12 py-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-500 dark:border-emerald-400">
                  <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 italic leading-relaxed">
                    "{post.excerpt}"
                  </p>
                </div>
              </BlurFade>
            )}

            {/* Content - Using new BlogContent component */}
            <BlurFade delay={0.5} inView>
              <div className="px-6 md:px-12 py-12">
                <BlogContent content={sanitizedContent} />
              </div>
            </BlurFade>

            {/* Share Section */}
            <BlurFade delay={0.6} inView>
              <div className="px-6 md:px-12 py-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                      <TbShare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {dict?.shareArticle || "Share this article"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                      aria-label="Share on Twitter"
                    >
                      <TbBrandTwitter className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                      aria-label="Share on Facebook"
                    >
                      <TbBrandFacebook className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white rounded-xl transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                      aria-label="Share on LinkedIn"
                    >
                      <TbBrandLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Navigation to Blog */}
            <BlurFade delay={0.7} inView>
              <div className="px-6 md:px-12 pb-12 text-center mt-12">
                <Link
                  href={`/${lang}/blog`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl shadow-emerald-500/30 hover:-translate-y-1 transform"
                >
                  <TbFolder className="w-5 h-5" />
                  <span>{dict?.viewAllPosts || "View All Posts"}</span>
                  <TbArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </div>
            </BlurFade>
          </article>
        </div>
      </div>
    </div>
  );
}
