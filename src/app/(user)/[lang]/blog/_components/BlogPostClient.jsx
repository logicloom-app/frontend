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
import { BlogPostDetailSkeleton } from "./BlogSkeleton";
import { sanitizeBlogContent } from "@/lib/utils/sanitize";
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

        <div className="max-w-4xl mx-auto">
          <article>
            {/* Header */}
            <BlurFade delay={0.2} inView>
              <header className="mb-8">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="px-4 py-2 text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <TbCalendar className="w-5 h-5" />
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                  </div>
                  {post.reading_time && (
                    <div className="flex items-center gap-2">
                      <TbClock className="w-5 h-5" />
                      <span>{post.reading_time} min read</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <TbTag className="w-5 h-5 text-gray-500" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                  <img
                    src={getBlogImageUrl(post.cover_image_url)}
                    alt={post.title}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  />
                </div>
              </BlurFade>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <BlurFade delay={0.4} inView>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-r-2xl p-6 mb-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                    {post.excerpt}
                  </p>
                </div>
              </BlurFade>
            )}

            {/* Content */}
            <BlurFade delay={0.5} inView>
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-code:bg-emerald-50 dark:prose-code:bg-emerald-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:shadow-xl
                  prose-img:rounded-2xl prose-img:shadow-lg
                  prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-emerald-900/20 prose-blockquote:rounded-r-xl
                  prose-ul:list-disc prose-ol:list-decimal
                  mb-12"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </BlurFade>

            {/* Share Section */}
            <BlurFade delay={0.6} inView>
              <div className="border-t-2 border-gray-200 dark:border-gray-800 pt-8 mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <TbShare className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {dict?.shareArticle || "Share this article"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all hover:scale-110"
                      aria-label="Share on Twitter"
                    >
                      <TbBrandTwitter className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:scale-110"
                      aria-label="Share on Facebook"
                    >
                      <TbBrandFacebook className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-all hover:scale-110"
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
              <div className="mt-12 text-center">
                <Link
                  href={`/${lang}/blog`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:via-teal-700 hover:to-green-700 text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl shadow-emerald-500/30 hover:scale-105"
                >
                  <TbFolder className="w-5 h-5" />
                  <span>{dict?.viewAllPosts || "View All Posts"}</span>
                </Link>
              </div>
            </BlurFade>
          </article>
        </div>
      </div>
    </div>
  );
}
