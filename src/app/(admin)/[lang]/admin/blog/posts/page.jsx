"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import EditPostModal from "../_components/EditPostModal";
import CreatePostModal from "../_components/CreatePostModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminBlogPosts,
  deleteBlogPost,
  getAdminBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAdminBlogTags,
  createBlogTag,
  updateBlogTag,
  deleteBlogTag,
} from "@/services/adminBlogService";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  Save,
  Tag,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminBlogPostsPage() {
  const { lang } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 10;

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTag, setEditingTag] = useState(null);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [deleteTagModalOpen, setDeleteTagModalOpen] = useState(false);
  const [deletingTag, setDeletingTag] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [tagFormData, setTagFormData] = useState({
    name: "",
    slug: "",
  });

  // Fetch posts
  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-blog-posts", currentPage, statusFilter],
    queryFn: () =>
      getAdminBlogPosts({
        limit: postsPerPage,
        offset: currentPage * postsPerPage,
        status: statusFilter || undefined,
      }),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-posts"]);
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
      setDeleteModalOpen(false);
      setDeletingPost(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to delete post",
        variant: "destructive",
      });
    },
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["admin-blog-categories"],
    queryFn: getAdminBlogCategories,
  });

  // Fetch tags
  const { data: tagsData } = useQuery({
    queryKey: ["admin-blog-tags"],
    queryFn: getAdminBlogTags,
  });

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: createBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-categories"]);
      toast({ title: "Success", description: "Category created successfully!" });
      handleCloseCategoryModal();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to create category",
        variant: "destructive",
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }) => updateBlogCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-categories"]);
      toast({ title: "Success", description: "Category updated successfully!" });
      handleCloseCategoryModal();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to update category",
        variant: "destructive",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-categories"]);
      toast({ title: "Success", description: "Category deleted successfully!" });
      setDeleteCategoryModalOpen(false);
      setDeletingCategory(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to delete category",
        variant: "destructive",
      });
    },
  });

  // Tag mutations
  const createTagMutation = useMutation({
    mutationFn: createBlogTag,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-tags"]);
      toast({ title: "Success", description: "Tag created successfully!" });
      handleCloseTagModal();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to create tag",
        variant: "destructive",
      });
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: ({ id, data }) => updateBlogTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-tags"]);
      toast({ title: "Success", description: "Tag updated successfully!" });
      handleCloseTagModal();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to update tag",
        variant: "destructive",
      });
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: deleteBlogTag,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-tags"]);
      toast({ title: "Success", description: "Tag deleted successfully!" });
      setDeleteTagModalOpen(false);
      setDeletingTag(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to delete tag",
        variant: "destructive",
      });
    },
  });

  const posts = postsData?.posts || [];
  const totalPosts = postsData?.total || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];

  // Search filter
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (post) => {
    setDeletingPost(post);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingPost) {
      deleteMutation.mutate(deletingPost.id);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setDeletingPost(null);
  };

  // Category modal handlers
  const handleOpenCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData({ name: "", slug: "", description: "" });
    }
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
    setEditingCategory(null);
    setCategoryFormData({ name: "", slug: "", description: "" });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryFormData.name) {
      toast({
        title: "Error",
        description: "Category name is required!",
        variant: "destructive",
      });
      return;
    }
    if (editingCategory) {
      updateCategoryMutation.mutate({
        id: editingCategory.id,
        data: categoryFormData,
      });
    } else {
      createCategoryMutation.mutate(categoryFormData);
    }
  };

  const handleDeleteCategory = (category) => {
    setDeletingCategory(category);
    setDeleteCategoryModalOpen(true);
  };

  const handleConfirmDeleteCategory = () => {
    if (deletingCategory) {
      deleteCategoryMutation.mutate(deletingCategory.id);
    }
  };

  const handleCancelDeleteCategory = () => {
    setDeleteCategoryModalOpen(false);
    setDeletingCategory(null);
  };

  // Tag modal handlers
  const handleOpenTagModal = (tag = null) => {
    if (tag) {
      setEditingTag(tag);
      setTagFormData({ name: tag.name, slug: tag.slug });
    } else {
      setEditingTag(null);
      setTagFormData({ name: "", slug: "" });
    }
    setTagModalOpen(true);
  };

  const handleCloseTagModal = () => {
    setTagModalOpen(false);
    setEditingTag(null);
    setTagFormData({ name: "", slug: "" });
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (!tagFormData.name) {
      toast({
        title: "Error",
        description: "Tag name is required!",
        variant: "destructive",
      });
      return;
    }
    if (editingTag) {
      updateTagMutation.mutate({ id: editingTag.id, data: tagFormData });
    } else {
      createTagMutation.mutate(tagFormData);
    }
  };

  const handleDeleteTag = (tag) => {
    setDeletingTag(tag);
    setDeleteTagModalOpen(true);
  };

  const handleConfirmDeleteTag = () => {
    if (deletingTag) {
      deleteTagMutation.mutate(deletingTag.id);
    }
  };

  const handleCancelDeleteTag = () => {
    setDeleteTagModalOpen(false);
    setDeletingTag(null);
  };

  // Post modal handlers
  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleOpenEditModal = (postId) => {
    setEditingPostId(postId);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingPostId(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      published:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      archived:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status] || styles.draft
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Gradient */}
        <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Blog Posts
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Manage your blog posts, create engaging content
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setCategoryModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">Categories</span>
              </Button>
              <Button
                onClick={() => setTagModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">Tags</span>
              </Button>
              <Button
                onClick={handleOpenCreateModal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
            <p className="text-red-700 dark:text-red-400">
              Error loading posts: {error.message}
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No posts found. Create your first post!
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Categories
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {post.title}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              /{post.slug}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(post.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {post.categories?.slice(0, 2).map((cat) => (
                              <span
                                key={cat.id}
                                className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded text-xs"
                              >
                                {cat.name}
                              </span>
                            ))}
                            {post.categories?.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                                +{post.categories.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.published_at || post.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/${lang}/blog/${post.slug}`}
                              target="_blank"
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleOpenEditModal(post.id)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(post)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 mt-4 mx-4 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {currentPage * postsPerPage + 1} to{" "}
                      {Math.min((currentPage + 1) * postsPerPage, totalPosts)} of{" "}
                      {totalPosts} posts
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Previous
                      </button>
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                              currentPage === i
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                                : "bg-gray-50 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                        }
                        disabled={currentPage === totalPages - 1}
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Category Modal */}
        <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl border-2 border-gray-200 dark:border-gray-700">
            <DialogHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCategorySubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={categoryFormData.name}
                    onChange={(e) =>
                      setCategoryFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Category name"
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500/20 dark:focus:ring-sky-400/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Slug</label>
                  <Input
                    type="text"
                    value={categoryFormData.slug}
                    onChange={(e) =>
                      setCategoryFormData((prev) => ({
                        ...prev,
                        slug: e.target.value,
                      }))
                    }
                    placeholder="auto-generated-from-name"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500/20 dark:focus:ring-sky-400/20 transition-all"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty to auto-generate from name
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Description
                  </label>
                  <Textarea
                    value={categoryFormData.description}
                    onChange={(e) =>
                      setCategoryFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Category description (optional)"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500/20 dark:focus:ring-sky-400/20 transition-all"
                  />
                </div>

                {/* List existing categories */}
                {categories.length > 0 && (
                  <div className="border-t pt-4">
                    <label className="block text-sm font-semibold mb-2">
                      Existing Categories
                    </label>
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-800/70 border border-sky-100 dark:border-gray-700 rounded-lg hover:shadow-md transition-all"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {cat.name}
                            </p>
                            <p className="text-xs text-sky-600 dark:text-sky-400 font-mono">
                              /{cat.slug}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              type="button"
                              onClick={() => handleOpenCategoryModal(cat)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-sky-100 dark:hover:bg-gray-700 text-sky-600 dark:text-sky-400"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleDeleteCategory(cat)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseCategoryModal}
                  className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createCategoryMutation.isPending ||
                    updateCategoryMutation.isPending
                  }
                  className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {createCategoryMutation.isPending ||
                  updateCategoryMutation.isPending
                    ? "Saving..."
                    : editingCategory
                    ? "Update"
                    : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Tag Modal */}
        <Dialog open={tagModalOpen} onOpenChange={setTagModalOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl border-2 border-gray-200 dark:border-gray-700">
            <DialogHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {editingTag ? "Edit Tag" : "Create New Tag"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleTagSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={tagFormData.name}
                    onChange={(e) =>
                      setTagFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Tag name"
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Slug</label>
                  <Input
                    type="text"
                    value={tagFormData.slug}
                    onChange={(e) =>
                      setTagFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="auto-generated-from-name"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty to auto-generate from name
                  </p>
                </div>

                {/* List existing tags */}
                {tags.length > 0 && (
                  <div className="border-t pt-4">
                    <label className="block text-sm font-semibold mb-2">
                      Existing Tags
                    </label>
                    <div className="max-h-40 overflow-y-auto flex flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-lg">
                      {tags.map((tag) => (
                        <div
                          key={tag.id}
                          className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:shadow-md transition-all"
                        >
                          <Tag className="w-3.5 h-3.5" />
                          <span>{tag.name}</span>
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              type="button"
                              onClick={() => handleOpenTagModal(tag)}
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 hover:bg-purple-200 dark:hover:bg-purple-800/50"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleDeleteTag(tag)}
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseTagModal}
                  className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createTagMutation.isPending || updateTagMutation.isPending
                  }
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {createTagMutation.isPending || updateTagMutation.isPending
                    ? "Saving..."
                    : editingTag
                    ? "Update"
                    : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Post Modal */}
        <CreatePostModal open={createModalOpen} onClose={handleCloseCreateModal} />

        {/* Edit Post Modal */}
        <EditPostModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          postId={editingPostId}
        />

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl border-2 border-red-200 dark:border-red-800">
            <DialogHeader className="pb-4 border-b border-red-200 dark:border-red-800">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
                Delete Post
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <p className="text-gray-700 dark:text-gray-300">
                Are you absolutely sure you want to delete this post?
              </p>
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm font-semibold text-red-800 dark:text-red-400">
                  {deletingPost?.title}
                </p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-6 border-t-2 border-red-200 dark:border-red-800">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancelDelete}
                className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleteMutation.isPending ? "Deleting..." : "Delete Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Category Confirmation Modal */}
        <Dialog
          open={deleteCategoryModalOpen}
          onOpenChange={setDeleteCategoryModalOpen}
        >
          <DialogContent className="sm:max-w-[500px] rounded-2xl border-2 border-red-200 dark:border-red-800">
            <DialogHeader className="pb-4 border-b border-red-200 dark:border-red-800">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
                Delete Category
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you absolutely sure you want to delete this category?
              </p>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm font-semibold text-red-800 dark:text-red-400">
                  {deletingCategory?.name}
                </p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                  Step 1 of 2: Confirm deletion
                </p>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  ⚠️ This will remove the category from all posts
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-6 border-t-2 border-red-200 dark:border-red-800">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelDeleteCategory}
                className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmDeleteCategory}
                disabled={deleteCategoryMutation.isPending}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleteCategoryMutation.isPending
                  ? "Deleting..."
                  : "Delete Category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Tag Confirmation Modal */}
        <Dialog open={deleteTagModalOpen} onOpenChange={setDeleteTagModalOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl border-2 border-red-200 dark:border-red-800">
            <DialogHeader className="pb-4 border-b border-red-200 dark:border-red-800">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
                Delete Tag
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you absolutely sure you want to delete this tag?
              </p>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm font-semibold text-red-800 dark:text-red-400">
                  {deletingTag?.name}
                </p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                  Step 1 of 2: Confirm deletion
                </p>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  ⚠️ This will remove the tag from all posts
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-6 border-t-2 border-red-200 dark:border-red-800">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelDeleteTag}
                className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmDeleteTag}
                disabled={deleteTagMutation.isPending}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleteTagMutation.isPending ? "Deleting..." : "Delete Tag"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
