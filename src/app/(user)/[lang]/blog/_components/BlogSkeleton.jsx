export function BlogPostCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border-2 border-emerald-200 dark:border-emerald-900/50 h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20"></div>

      {/* Content Skeleton */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"></div>
          <div className="h-6 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"></div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Excerpt */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3"></div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Read More */}
        <div className="h-5 w-28 bg-emerald-200 dark:bg-emerald-900/30 rounded mt-4"></div>
      </div>
    </div>
  );
}

export function BlogPostDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-6 w-32 bg-emerald-200 dark:bg-emerald-900/30 rounded mb-8"></div>

      {/* Header Skeleton */}
      <div className="mb-8">
        {/* Categories */}
        <div className="flex gap-2 mb-4">
          <div className="h-8 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"></div>
          <div className="h-8 w-32 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"></div>
        </div>

        {/* Title */}
        <div className="space-y-3 mb-6">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
        </div>

        {/* Meta Info */}
        <div className="flex gap-6">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20"></div>

      {/* Excerpt Skeleton */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-r-2xl p-6 mb-8">
        <div className="space-y-2">
          <div className="h-5 bg-emerald-200 dark:bg-emerald-800/30 rounded w-full"></div>
          <div className="h-5 bg-emerald-200 dark:bg-emerald-800/30 rounded w-5/6"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4 mb-12">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>

        <div className="h-8"></div>

        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>

        <div className="h-8"></div>

        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>

      {/* Share Section Skeleton */}
      <div className="border-t-2 border-gray-200 dark:border-gray-800 pt-8 mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full"></div>
            <div className="w-10 h-10 bg-blue-600/20 rounded-full"></div>
            <div className="w-10 h-10 bg-blue-700/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <BlogPostCardSkeleton key={i} />
      ))}
    </div>
  );
}
