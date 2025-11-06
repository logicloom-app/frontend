"use client";

export default function BlogContent({ content, className = "" }) {
  return (
    <div
      className={`novel-editor-wrapper prose prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
