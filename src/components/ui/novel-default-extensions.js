import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-emerald-500 dark:border-emerald-400",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          "rounded-xl bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 font-mono text-sm",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-sm",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#10b981",
      width: 4,
    },
  }),
  HorizontalRule.configure({
    HTMLAttributes: {
      class: "my-4 border-t border-gray-300 dark:border-gray-700",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-emerald-600 dark:text-emerald-400 underline underline-offset-[3px] hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer",
    },
    openOnClick: false,
  }),
  TiptapImage.configure({
    allowBase64: true,
    HTMLAttributes: {
      class:
        "rounded-lg border border-gray-200 dark:border-gray-700 max-w-full h-auto",
    },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex gap-2 items-start my-4",
    },
    nested: true,
  }),
  Highlight.configure({
    HTMLAttributes: {
      class: "bg-yellow-200 dark:bg-yellow-800/50 px-1 rounded",
    },
  }),
  Underline,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands, or start typing...";
    },
    includeChildren: true,
  }),
];
