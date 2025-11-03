"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, X, Image as ImageIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateBlogPost,
  uploadBlogImage,
  getAdminBlogPostById,
  getAdminBlogCategories,
  getAdminBlogTags,
} from "@/services/adminBlogService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dynamically import CKEditor to avoid SSR issues
const CKEditorWrapper = dynamic(() => import("./CKEditorWrapper"), { ssr: false });

export default function EditPostModal({ open, onClose, postId }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    cover_image_url: "",
    status: "draft",
    language: "en",
    seo_title: "",
    seo_description: "",
    seo_keywords: [],
    canonical_url: "",
    category_ids: [],
    tag_ids: [],
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  // Fetch post data
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["admin-blog-post", postId],
    queryFn: () => {
      console.log("🔄 [EDIT] Fetching post with ID:", postId);
      return getAdminBlogPostById(postId);
    },
    enabled: !!postId && open,
    onSuccess: (data) => {
      console.log("✅ [EDIT] Post fetched successfully:", data);
    },
    onError: (error) => {
      console.error("❌ [EDIT] Error fetching post:", error);
    },
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["admin-blog-categories"],
    queryFn: getAdminBlogCategories,
    enabled: open,
  });

  // Fetch tags
  const { data: tagsData } = useQuery({
    queryKey: ["admin-blog-tags"],
    queryFn: getAdminBlogTags,
    enabled: open,
  });

  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];

  // Populate form when post data is loaded
  useEffect(() => {
    if (post && open) {
      console.log("📝 [EDIT] Populating form with post data:", post);
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        cover_image_url: post.cover_image_url || "",
        status: post.status || "draft",
        language: post.language || "en",
        seo_title: post.seo_title || "",
        seo_description: post.seo_description || "",
        seo_keywords: post.seo_keywords || [],
        canonical_url: post.canonical_url || "",
        category_ids: post.categories?.map((c) => c.id) || [],
        tag_ids: post.tags?.map((t) => t.id) || [],
      });
      if (post.cover_image_url) {
        setCoverImagePreview(
          `${process.env.NEXT_PUBLIC_API_URL}${post.cover_image_url}`
        );
      }
      console.log("✅ [EDIT] Form populated successfully");
    }
  }, [post, open]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setFormData({
          title: "",
          slug: "",
          content: "",
          excerpt: "",
          cover_image_url: "",
          status: "draft",
          language: "en",
          seo_title: "",
          seo_description: "",
          seo_keywords: [],
          canonical_url: "",
          category_ids: [],
          tag_ids: [],
        });
        setKeywordInput("");
        setCoverImageFile(null);
        setCoverImagePreview(null);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [open]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return updateBlogPost(postId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-posts"]);
      queryClient.invalidateQueries(["admin-blog-post", postId]);
      toast({
        title: "Success",
        description: "Post updated successfully!",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to update post",
        variant: "destructive",
      });
    },
  });

  // Image upload mutation
  const imageUploadMutation = useMutation({
    mutationFn: uploadBlogImage,
    onSuccess: (data) => {
      setFormData((prev) => ({ ...prev, cover_image_url: data.url }));
      setCoverImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${data.url}`);
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to upload image",
        variant: "destructive",
      });
    },
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (coverImageFile) {
      imageUploadMutation.mutate(coverImageFile);
    }
  };

  const handleRemoveImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview(null);
    setFormData((prev) => ({ ...prev, cover_image_url: "" }));
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        seo_keywords: [...prev.seo_keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index) => {
    setFormData((prev) => ({
      ...prev,
      seo_keywords: prev.seo_keywords.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Title and content are required!",
        variant: "destructive",
      });
      return;
    }

    // Upload image first if there's a new file
    if (coverImageFile && !formData.cover_image_url) {
      imageUploadMutation.mutate(coverImageFile, {
        onSuccess: (data) => {
          updateMutation.mutate({ ...formData, cover_image_url: data.url });
        },
      });
    } else {
      updateMutation.mutate(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Post</DialogTitle>
        </DialogHeader>

        {postLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading post data...</p>
          </div>
        ) : postError ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
              Error loading post
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {postError?.response?.data?.error ||
                postError?.message ||
                "Failed to load post data"}
            </p>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Content */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter post title..."
                  required
                  className="text-lg font-semibold"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Slug (URL)
                </label>
                <Input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="auto-generated-from-title"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to auto-generate from title
                </p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <CKEditorWrapper
                  key={`edit-${postId}`}
                  value={formData.content}
                  onChange={(value) => handleChange("content", value)}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold mb-2">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => handleChange("excerpt", e.target.value)}
                  rows={3}
                  placeholder="Short summary of the post..."
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Cover Image
                </label>

                {coverImagePreview ? (
                  <div className="relative">
                    <img
                      src={coverImagePreview}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="cover-image-edit"
                    />
                    <label
                      htmlFor="cover-image-edit"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Image
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG, GIF or WebP (max 5MB)
                    </p>
                  </div>
                )}

                {coverImageFile && !formData.cover_image_url && (
                  <Button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={imageUploadMutation.isPending}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {imageUploadMutation.isPending ? "Uploading..." : "Upload Image"}
                  </Button>
                )}
              </div>

              {/* Settings Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-3 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full px-3 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="en">English</option>
                    <option value="de">German</option>
                    <option value="fa">Persian</option>
                  </select>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Categories
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.category_ids.includes(cat.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleChange("category_ids", [
                              ...formData.category_ids,
                              cat.id,
                            ]);
                          } else {
                            handleChange(
                              "category_ids",
                              formData.category_ids.filter((id) => id !== cat.id)
                            );
                          }
                        }}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold mb-2">Tags</label>
                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  {tags.map((tag) => (
                    <label
                      key={tag.id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.tag_ids.includes(tag.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleChange("tag_ids", [...formData.tag_ids, tag.id]);
                          } else {
                            handleChange(
                              "tag_ids",
                              formData.tag_ids.filter((id) => id !== tag.id)
                            );
                          }
                        }}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SEO Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-bold mb-4">SEO Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      SEO Title
                    </label>
                    <Input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => handleChange("seo_title", e.target.value)}
                      placeholder="SEO optimized title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      SEO Description
                    </label>
                    <Textarea
                      value={formData.seo_description}
                      onChange={(e) =>
                        handleChange("seo_description", e.target.value)
                      }
                      rows={2}
                      placeholder="SEO meta description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      SEO Keywords
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleAddKeyword())
                        }
                        placeholder="Add keyword and press Enter"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleAddKeyword}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.seo_keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(index)}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Canonical URL
                    </label>
                    <Input
                      type="url"
                      value={formData.canonical_url}
                      onChange={(e) => handleChange("canonical_url", e.target.value)}
                      placeholder="https://example.com/original-post"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateMutation.isPending ? "Updating..." : "Update Post"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
