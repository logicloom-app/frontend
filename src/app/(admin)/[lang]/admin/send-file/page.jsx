"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/lib/hooks/use-toast";
import { adminSendFileToUser } from "@/services/adminServices";
import { useMutation } from "@tanstack/react-query";
import { useGetUsers } from "@/lib/hooks/useAdmin";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Mail, FileText, X } from "lucide-react";

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
      minHeight: "2.5rem",
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
    <div className="w-full h-[calc(100vh-7rem)] overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="text-sky-500" size={32} />
            <h1 className="text-3xl font-bold">Send File to User</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Send multiple files directly to users via email
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-100 dark:bg-zinc-800/50 p-6 rounded-3xl"
        >
          <div className="space-y-6">
            {/* User Selection with Search */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Select User (Optional - or enter manually below)
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
            </div>

            {/* User Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="user_email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                User Email *
              </label>
              <Input
                type="email"
                id="user_email"
                name="user_email"
                placeholder="user@example.com"
                className="rounded-2xl px-4 py-2"
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
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                User Name *
              </label>
              <Input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="User name"
                className="rounded-2xl px-4 py-2"
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
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Title *
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Project files"
                className="rounded-2xl px-4 py-2"
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
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Description *
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Here are your project files..."
                className="rounded-2xl px-4 py-2 bg-background/90 min-h-[120px]"
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Language *
              </label>
              <ShadcnSelect
                onValueChange={(value) => formik.setFieldValue("language", value)}
                value={formik.values.language}
              >
                <SelectTrigger className="w-full rounded-2xl bg-background/90 border">
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
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                File Attachments * (Multiple files allowed)
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="documents"
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl cursor-pointer transition-colors duration-300"
                >
                  <Upload size={20} />
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
                  <span className="text-sm text-gray-500">
                    {selectedFiles.length} file(s) selected
                  </span>
                )}
              </div>

              {/* Display selected files */}
              {selectedFiles.length > 0 && (
                <div className="flex flex-col gap-2 mt-2 p-4 bg-gray-200 dark:bg-zinc-700/50 rounded-2xl max-h-[200px] overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-zinc-800 rounded-xl"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText size={16} className="text-sky-500 flex-shrink-0" />
                        <span className="truncate text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors duration-300"
                      >
                        <X size={16} className="text-red-500" />
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
              className="w-full rounded-2xl py-6 text-lg"
              disabled={!formik.isValid || isLoading}
            >
              {isLoading ? (
                <Spinner className="w-6 h-6" />
              ) : (
                <div className="flex items-center gap-2">
                  <Mail size={20} />
                  <span>Send Files via Email</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
