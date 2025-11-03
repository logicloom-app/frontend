"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import BlurFade from "@/components/ui/blur-fade";
import { BlogListSkeleton } from "./BlogSkeleton";
import {
  getBlogPosts,
  getBlogCategories,
  getBlogImageUrl,
} from "@/services/blogService";
import {
  TbArticle,
  TbClock,
  TbCalendar,
  TbChevronRight,
  TbSearch,
  TbBookmark,
} from "react-icons/tb";

export default function BlogListClient({ lang, dict }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 9;

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["blog-posts", currentPage],
    queryFn: () =>
      getBlogPosts({ limit: postsPerPage, offset: currentPage * postsPerPage }),
  });

  const { data: categories, error: categoriesError } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: getBlogCategories,
  });

  const posts = postsData?.posts || [];
  const totalPosts = postsData?.total || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Filter posts by search query
  const filteredPosts = posts.filter(
    (post) =>
      post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post?.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 dark:opacity-5 pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Hero Section */}
        <BlurFade delay={0.1} inView>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 rounded-3xl relative group">
                <TbArticle className="w-8 h-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-green-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl pb-4 font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 dark:from-emerald-400 dark:via-teal-400 dark:to-green-400 bg-clip-text text-transparent leading-tight">
              {dict?.title || "Blog"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {dict?.subtitle ||
                "Web Development Insights, Tutorials & Best Practices"}
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={dict?.searchPlaceholder || "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/50 bg-white dark:bg-gray-800 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Categories Filter */}
        {categories && categories.length > 0 && (
          <BlurFade delay={0.2} inView>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="px-6 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </BlurFade>
        )}

        {/* Loading State */}
        {postsLoading && <BlogListSkeleton />}

        {/* Blog Posts Grid */}
        {!postsLoading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map((post, idx) => (
              <BlurFade key={post?.id} delay={0.1 * (idx + 1)} inView>
                <Link href={`/${lang}/blog/${post?.slug}`}>
                  <article className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 border-2 border-emerald-200 dark:border-emerald-900/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    {/* Cover Image */}
                    {post?.cover_image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getBlogImageUrl(post?.cover_image_url)}
                          alt={post?.title}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Categories */}
                      {post?.categories && post?.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post?.categories?.map((cat) => (
                            <span
                              key={cat.id}
                              className="px-3 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                        <div className="flex items-center gap-1">
                          <TbCalendar className="w-4 h-4" />
                          <span>
                            {formatDate(post.published_at || post.created_at)}
                          </span>
                        </div>
                        {post.reading_time && (
                          <div className="flex items-center gap-1">
                            <TbClock className="w-4 h-4" />
                            <span>{post.reading_time} min</span>
                          </div>
                        )}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mt-4 group-hover:gap-4 transition-all">
                        <span>{dict?.readMore || "Read More"}</span>
                        <TbChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </article>
                </Link>
              </BlurFade>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!postsLoading && filteredPosts.length === 0 && (
          <BlurFade delay={0.3} inView>
            <div className="text-center py-20">
              <TbBookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                {dict?.noPostsFound || "No posts found"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {dict?.noPostsDescription ||
                  "Try adjusting your search or check back later"}
              </p>
            </div>
          </BlurFade>
        )}

        {/* Pagination */}
        {!postsLoading && totalPages > 1 && (
          <BlurFade delay={0.4} inView>
            <div className="flex justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
              >
                {dict?.previous || "Previous"}
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                      currentPage === i
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        : "bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 dark:hover:border-emerald-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
                }
                disabled={currentPage === totalPages - 1}
                className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
              >
                {dict?.next || "Next"}
              </button>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
