"use client";

import { defaultExtensions } from "./novel-default-extensions";
import { useState, useEffect } from "react";
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
} from "novel";

export default function NovelEditor({
  value,
  onChange,
  placeholder = "Start writing...",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm min-h-[300px] flex items-center justify-center">
        <div className="text-gray-400 dark:text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="novel-editor-container border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <EditorRoot>
        <EditorContent
          extensions={defaultExtensions}
          initialContent={value}
          immediatelyRender={false}
          className="min-h-[300px] px-6 py-4"
          editorProps={{
            attributes: {
              class:
                "prose prose-lg dark:prose-invert max-w-none focus:outline-none",
            },
          }}
          onUpdate={({ editor }) => {
            if (editor && onChange) {
              const html = editor.getHTML();
              onChange(html);
            }
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-gray-500 dark:text-gray-400">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              <EditorCommandItem
                value="heading1"
                onCommand={({ editor, range }) => {
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("heading", { level: 1 })
                    .run();
                }}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <span className="text-xl">H1</span>
                <span>Heading 1</span>
              </EditorCommandItem>
              <EditorCommandItem
                value="heading2"
                onCommand={({ editor, range }) => {
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("heading", { level: 2 })
                    .run();
                }}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <span className="text-lg">H2</span>
                <span>Heading 2</span>
              </EditorCommandItem>
              <EditorCommandItem
                value="heading3"
                onCommand={({ editor, range }) => {
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("heading", { level: 3 })
                    .run();
                }}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <span className="text-base">H3</span>
                <span>Heading 3</span>
              </EditorCommandItem>
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
