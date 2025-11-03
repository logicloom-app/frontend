"use client";

import { useEffect, useState, useRef } from "react";

export default function CKEditorWrapper({ value, onChange }) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [Editor, setEditor] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    // Dynamically import CKEditor only on client-side
    Promise.all([
      import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
      import("@ckeditor/ckeditor5-build-classic"),
    ]).then(([CKEditorComponent, ClassicEditor]) => {
      setEditor({ CKEditorComponent, ClassicEditor: ClassicEditor.default });
      setEditorLoaded(true);
    });
  }, []);

  // Update editor content when value changes externally
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentData = editorRef.current.getData();
      if (currentData !== value) {
        editorRef.current.setData(value || "");
      }
    }
  }, [value]);

  if (!editorLoaded || !Editor) {
    return (
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading editor...</p>
      </div>
    );
  }

  const { CKEditorComponent, ClassicEditor } = Editor;

  return (
    <div className="ckeditor-wrapper">
      <CKEditorComponent
        editor={ClassicEditor}
        data={value || ""}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
            ],
          },
          placeholder: "Start writing your blog post content...",
        }}
      />
      <style jsx global>{`
        .ckeditor-wrapper .ck-editor__editable {
          min-height: 400px;
          max-height: 600px;
        }
        .ckeditor-wrapper .ck.ck-editor__main > .ck-editor__editable {
          background: var(--ck-color-base-background);
          border-radius: 0 0 0.75rem 0.75rem;
        }
        .ckeditor-wrapper .ck.ck-toolbar {
          border-radius: 0.75rem 0.75rem 0 0;
        }
        /* Dark mode support */
        .dark .ckeditor-wrapper .ck.ck-editor__main > .ck-editor__editable {
          background: rgb(31 41 55);
          color: rgb(243 244 246);
        }
        .dark .ckeditor-wrapper .ck.ck-toolbar {
          background: rgb(17 24 39);
          border-color: rgb(55 65 81);
        }
      `}</style>
    </div>
  );
}
