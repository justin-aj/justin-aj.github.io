import type { MarkdownStorage } from 'tiptap-markdown';

// tiptap-markdown ships types for its own API but does not augment Tiptap's
// Storage interface, so `editor.storage.markdown` is otherwise untyped.
declare module '@tiptap/core' {
  interface Storage {
    markdown: MarkdownStorage;
  }
}
