"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncement } from "@/services/adminServices";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AnnouncementSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
  type: Yup.string()
    .oneOf(["info", "success", "warning", "error"])
    .required("Type is required"),
  priority: Yup.number().min(0).default(0),
  link: Yup.string()
    .test("url-or-path", "Please enter a valid URL or path", (value) => {
      if (!value || value.trim() === "") return true; // Allow empty
      // Allow relative paths starting with /
      if (value.startsWith("/")) return true;
      // Allow full URLs (http, https, mailto, etc.)
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .nullable(),
  link_text: Yup.string().nullable(),
  start_date: Yup.string().nullable(),
  end_date: Yup.string().nullable(),
});

export default function EditAnnouncementModal({ open, onClose, announcement }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAnnouncement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-announcements"] });
      toast({
        description: "Announcement updated successfully",
        className: "rounded-2xl",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Failed to update announcement",
        className: "rounded-2xl",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
      type: "info",
      is_active: true,
      priority: 0,
      link: "",
      link_text: "",
      start_date: "",
      end_date: "",
    },
    validationSchema: AnnouncementSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        message: values.message,
        type: values.type,
        is_active: values.is_active,
        priority: parseInt(values.priority) || 0,
        link: values.link || null,
        link_text: values.link_text || null,
        start_date: values.start_date || null,
        end_date: values.end_date || null,
      };
      updateMutation.mutate({ id: announcement.id, data });
    },
  });

  useEffect(() => {
    if (announcement) {
      // Format datetime-local format from ISO string
      const formatDateTimeLocal = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      formik.setValues({
        title: announcement.title || "",
        message: announcement.message || "",
        type: announcement.type || "info",
        is_active: announcement.is_active ?? true,
        priority: announcement.priority || 0,
        link: announcement.link || "",
        link_text: announcement.link_text || "",
        start_date: formatDateTimeLocal(announcement.start_date),
        end_date: formatDateTimeLocal(announcement.end_date),
      });
    }
  }, [announcement]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:rounded-3xl max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Announcement</DialogTitle>
          <DialogDescription>Update announcement information</DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="text-sm font-medium mb-2 block">
              Title *
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Announcement title"
              className="rounded-2xl px-4 py-2"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="ml-2 mt-1 text-rose-500 text-left text-xs">
                {formik.errors.title}
              </div>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="text-sm font-medium mb-2 block">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Announcement message"
              className="rounded-2xl px-4 py-2"
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="ml-2 mt-1 text-rose-500 text-left text-xs">
                {formik.errors.message}
              </div>
            )}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="text-sm font-medium mb-2 block">
              Type *
            </label>
            <Select
              value={formik.values.type}
              onValueChange={(value) => formik.setFieldValue("type", value)}
            >
              <SelectTrigger className="rounded-2xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="text-sm font-medium mb-2 block">
              Priority
            </label>
            <Input
              id="priority"
              name="priority"
              type="number"
              placeholder="0"
              className="rounded-2xl px-4 py-2"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Higher number = higher priority (default: 0)
            </p>
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="text-sm font-medium mb-2 block">
              Link (optional)
            </label>
            <Input
              id="link"
              name="link"
              type="text"
              placeholder="/pricing or https://example.com"
              className="rounded-2xl px-4 py-2"
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.link && formik.errors.link && (
              <div className="ml-2 mt-1 text-rose-500 text-left text-xs">
                {formik.errors.link}
              </div>
            )}
          </div>

          {/* Link Text */}
          {formik.values.link && (
            <div>
              <label htmlFor="link_text" className="text-sm font-medium mb-2 block">
                Link Text (optional)
              </label>
              <Input
                id="link_text"
                name="link_text"
                placeholder="Click here"
                className="rounded-2xl px-4 py-2"
                value={formik.values.link_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          )}

          {/* Start Date */}
          <div>
            <label htmlFor="start_date" className="text-sm font-medium mb-2 block">
              Start Date (optional)
            </label>
            <Input
              id="start_date"
              name="start_date"
              type="datetime-local"
              className="rounded-2xl px-4 py-2"
              value={formik.values.start_date}
              onChange={formik.handleChange}
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="end_date" className="text-sm font-medium mb-2 block">
              End Date (optional)
            </label>
            <Input
              id="end_date"
              name="end_date"
              type="datetime-local"
              className="rounded-2xl px-4 py-2"
              value={formik.values.end_date}
              onChange={formik.handleChange}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between">
            <label htmlFor="is_active" className="text-sm font-medium">
              Active
            </label>
            <Switch
              id="is_active"
              checked={formik.values.is_active}
              onCheckedChange={(checked) =>
                formik.setFieldValue("is_active", checked)
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-2xl"
            >
              {updateMutation.isPending ? <Spinner className="w-6 h-6" /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
