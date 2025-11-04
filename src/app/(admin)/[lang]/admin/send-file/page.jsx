"use client";

import * as Yup from "yup";
import { useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useGetUsers } from "@/lib/hooks/useAdmin";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Mail, FileText, X, Sparkles, Package, Languages } from "lucide-react";
import { adminSendFileToUser } from "@/services/adminServices";
import BlurFade from "@/components/ui/blur-fade";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SendFileSchema = Yup.object().shape({
  user_email: Yup.string().email("Invalid email").required("Email is required"),
  user_name: Yup.string().required("User name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  documents: Yup.array()
    .min(1, "At least one file is required")
    .required("Files are required"),
  language: Yup.string().required("Language is required"),
});

export default function SendFilePage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { toast } = useToast();
  const { data: usersData } = useGetUsers();
  const { users } = usersData || {};

  const { isLoading, mutateAsync: mutateSendFile } = useMutation({
    mutationFn: adminSendFileToUser,
    onSuccess: (data) => {
      toast({
        description: "Files sent successfully via email",
        className: "rounded-2xl",
      });
      formik.resetForm();
      setSelectedFiles([]);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const sendFileHandler = async (values) => {
    const formData = new FormData();
    formData.append("user_email", values.user_email);
    formData.append("user_name", values.user_name);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("language", values.language);

    // Append multiple files
    values.documents.forEach((file) => {
      formData.append("documents", file);
    });

    await mutateSendFile(formData);
  };

  const formik = useFormik({
    initialValues: {
      user_email: "",
      user_name: "",
      title: "",
      description: "",
      documents: [],
      language: "english",
    },
    validationSchema: SendFileSchema,
    onSubmit: sendFileHandler,
    validateOnMount: true,
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newFiles = [...selectedFiles, ...files];
      setSelectedFiles(newFiles);
      formik.setFieldValue("documents", newFiles);
    }
  };

  const removeFile = (indexToRemove) => {
    const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(newFiles);
    formik.setFieldValue("documents", newFiles);
  };

  const handleUserSelect = (selectedOption) => {
    if (selectedOption) {
      formik.setFieldValue("user_email", selectedOption.email);
      formik.setFieldValue("user_name", selectedOption.name);
    }
  };

  // Prepare user options for react-select
  const userOptions =
    users?.map((user) => ({
      value: user.id,
      label: `${user.name} - ${user.email}`,
      name: user.name,
      email: user.email,
    })) || [];

  // Custom styles for react-select to match the theme
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "1rem",
      borderColor: state.isFocused ? "hsl(var(--ring))" : "hsl(var(--input))",
      backgroundColor: "hsl(var(--background))",
      minHeight: "2.75rem",
      boxShadow: state.isFocused ? "0 0 0 1px hsl(var(--ring))" : "none",
      "&:hover": {
        borderColor: "hsl(var(--ring))",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "1rem",
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
      marginTop: "0.5rem",
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      borderRadius: "1rem",
      padding: "0.25rem",
      maxHeight: "300px",
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: "0.5rem",
      backgroundColor: state.isFocused
        ? "hsl(var(--accent))"
        : state.isSelected
        ? "hsl(var(--primary))"
        : "transparent",
      color: state.isSelected
        ? "hsl(var(--primary-foreground))"
        : "hsl(var(--foreground))",
      cursor: "pointer",
      padding: "0.5rem 0.75rem",
      "&:active": {
        backgroundColor: "hsl(var(--accent))",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
    }),
    singleValue: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
    }),
    input: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
    }),
  };

  return (
    <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Gradient */}
        <BlurFade delay={0.1}>
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Send Files to User
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                  <Package className="w-4 h-4" />
                  Send multiple files directly to users via email
                </p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Form */}
        <BlurFade delay={0.2}>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              {/* User Selection with Search */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Quick Select User (Optional)
                </label>
                <Select
                  options={userOptions}
                  onChange={handleUserSelect}
                  placeholder="Search and select a user..."
                  isClearable
                  isSearchable
                  styles={customSelectStyles}
                  noOptionsMessage={() => "No users found"}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Or enter user details manually below
                </p>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* User Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="user_email"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  User Email *
                </label>
                <Input
                  type="email"
                  id="user_email"
                  name="user_email"
                  placeholder="user@example.com"
                  className="rounded-xl px-4 py-2.5 bg-background/90"
                  value={formik.values.user_email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.user_email && formik.errors.user_email ? (
                  <div className="ml-2 text-rose-500 text-xs">
                    {formik.errors.user_email}
                  </div>
                ) : null}
              </div>

              {/* User Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="user_name"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  User Name *
                </label>
                <Input
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="John Doe"
                  className="rounded-xl px-4 py-2.5 bg-background/90"
                  value={formik.values.user_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.user_name && formik.errors.user_name ? (
                  <div className="ml-2 text-rose-500 text-xs">
                    {formik.errors.user_name}
                  </div>
                ) : null}
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email Title *
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Your Project Files"
                  className="rounded-xl px-4 py-2.5 bg-background/90"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="ml-2 text-rose-500 text-xs">
                    {formik.errors.title}
                  </div>
                ) : null}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email Message *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Here are your project files. Please review them and let us know if you have any questions..."
                  className="rounded-xl px-4 py-3 bg-background/90 min-h-[120px]"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={5}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="ml-2 text-rose-500 text-xs">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>

              {/* Language */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Email Language *
                </label>
                <ShadcnSelect
                  onValueChange={(value) => formik.setFieldValue("language", value)}
                  value={formik.values.language}
                >
                  <SelectTrigger className="w-full rounded-xl bg-background/90 border h-11">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </ShadcnSelect>
                {formik.touched.language && formik.errors.language ? (
                  <div className="ml-2 text-rose-500 text-xs">
                    {formik.errors.language}
                  </div>
                ) : null}
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="documents"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  File Attachments * (Multiple files allowed)
                </label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="documents"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Choose Files</span>
                  </label>
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                  />
                  {selectedFiles.length > 0 && (
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {selectedFiles.length} file(s) selected
                    </span>
                  )}
                </div>

                {/* Display selected files */}
                {selectedFiles.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl max-h-[200px] overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                          <span className="truncate text-sm font-medium">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors duration-300"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {formik.touched.documents && formik.errors.documents ? (
                  <div className="ml-2 text-rose-500 text-xs">
                    {formik.errors.documents}
                  </div>
                ) : null}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-xl py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={!formik.isValid || isLoading}
              >
                {isLoading ? (
                  <Spinner className="w-6 h-6" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>Send Files via Email</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </BlurFade>
      </div>
    </div>
  );
}
