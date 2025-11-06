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
  createBlogPost,
  uploadBlogImage,
  getAdminBlogCategories,
  getAdminBlogTags,
} from "@/services/adminBlogService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dynamically import Novel Editor to avoid SSR issues
const NovelEditor = dynamic(() => import("@/components/ui/novel-editor"), {
  ssr: false,
});

export default function CreatePostModal({ open, onClose }) {
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

  // Reset form when modal opens or closes
  useEffect(() => {
    if (open) {
      // Reset form when opening
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
    }
  }, [open]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data) => {
      return createBlogPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-blog-posts"]);
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to create post",
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
          createMutation.mutate({ ...formData, cover_image_url: data.url });
        },
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700">
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Create New Post
          </DialogTitle>
        </DialogHeader>

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
                className="text-lg font-semibold bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold mb-2">Slug (URL)</label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="auto-generated-from-title"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all"
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
              <NovelEditor
                value={formData.content}
                onChange={(value) => handleChange("content", value)}
                placeholder="Start writing your amazing blog post... Type / for commands"
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
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold mb-2">Cover Image</label>

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
                    id="cover-image-create"
                  />
                  <label
                    htmlFor="cover-image-create"
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
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
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
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
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none transition-all text-gray-900 dark:text-gray-100"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold mb-2">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none transition-all text-gray-900 dark:text-gray-100"
                >
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="fa">Persian</option>
                </select>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-semibold mb-2">Categories</label>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 p-2.5 hover:bg-white dark:hover:bg-gray-700/70 rounded-lg cursor-pointer transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-700"
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
                      className="w-4 h-4 text-emerald-600 dark:text-emerald-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 transition-all"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2">Tags</label>
              <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                {tags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center gap-2 p-2.5 hover:bg-white dark:hover:bg-gray-700/70 rounded-lg cursor-pointer transition-all border border-transparent hover:border-purple-200 dark:hover:border-purple-700"
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
                      className="w-4 h-4 text-purple-600 dark:text-purple-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 transition-all"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {tag.name}
                    </span>
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
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    SEO Description
                  </label>
                  <Textarea
                    value={formData.seo_description}
                    onChange={(e) => handleChange("seo_description", e.target.value)}
                    rows={2}
                    placeholder="SEO meta description"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
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
                        e.key === "Enter" && (e.preventDefault(), handleAddKeyword())
                      }
                      placeholder="Add keyword and press Enter"
                      className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                    />
                    <Button
                      type="button"
                      onClick={handleAddKeyword}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Save className="w-4 h-4 mr-2" />
              {createMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
