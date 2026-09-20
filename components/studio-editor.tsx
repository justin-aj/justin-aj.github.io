'use client';

import { useEffect, useState } from 'react';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

type PostSummary = { slug: string; title: string; date: string; draft: boolean };

const today = () => new Date().toISOString().slice(0, 10);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function StudioEditor() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState('');
  const [draft, setDraft] = useState(true);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Markdown.configure({ transformPastedText: true })],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-neutral dark:prose-invert max-w-none min-h-[60vh] focus:outline-none',
      },
    },
  });

  // Bumped after a save or delete to re-read the post list from disk.
  const [reloadKey, setReloadKey] = useState(0);
  const refresh = () => setReloadKey(key => key + 1);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const response = await fetch('/api/studio/');
      const data = await response.json();
      if (!cancelled) {
        setPosts(data.posts ?? []);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const newPost = () => {
    setSlug('');
    setSlugTouched(false);
    setTitle('');
    setDate(today());
    setDescription('');
    setDraft(true);
    setStatus('');
    editor?.commands.setContent('');
  };

  const load = async (target: string) => {
    const response = await fetch(`/api/studio/?slug=${encodeURIComponent(target)}`);
    if (!response.ok) {
      setStatus('Could not load that post');
      return;
    }

    const data = await response.json();
    setSlug(data.slug);
    setSlugTouched(true);
    setTitle(data.title);
    setDate(data.date || today());
    setDescription(data.description);
    setDraft(data.draft);
    setStatus('');
    // tiptap-markdown patches setContent to parse a markdown string.
    editor?.commands.setContent(data.markdown);
  };

  const save = async () => {
    const finalSlug = slug || slugify(title);
    if (!finalSlug) {
      setStatus('Add a title first');
      return;
    }

    setBusy(true);
    const response = await fetch('/api/studio/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: finalSlug,
        title: title || 'Untitled',
        date,
        description,
        draft,
        markdown: editor?.storage.markdown.getMarkdown() ?? '',
      }),
    });
    setBusy(false);

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? 'Save failed');
      return;
    }

    setSlug(data.slug);
    setSlugTouched(true);
    setStatus(`Saved to content/posts/${data.slug}.md`);
    refresh();
  };

  const publish = async () => {
    setBusy(true);
    const response = await fetch('/api/studio/publish/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `content: ${title || 'update posts'}` }),
    });
    setBusy(false);

    const data = await response.json();
    if (!data.ok) {
      setStatus(data.error ?? 'Publish failed');
      return;
    }
    setStatus(data.pushed ? `Pushed to ${data.branch}. GitHub Actions is rebuilding.` : data.detail);
  };

  const remove = async () => {
    if (!slug || !confirm(`Delete content/posts/${slug}.md?`)) {
      return;
    }
    await fetch(`/api/studio/?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' });
    newPost();
    refresh();
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-4">
        <button
          type="button"
          onClick={newPost}
          className="w-full border px-3 py-2 text-sm hover:opacity-60"
          style={{ borderColor: 'var(--fg)' }}>
          New post
        </button>

        <ul className="space-y-1 text-sm">
          {posts.map(post => (
            <li key={post.slug}>
              <button
                type="button"
                onClick={() => void load(post.slug)}
                className="w-full truncate py-1 text-left hover:underline underline-offset-4"
                style={{ color: post.slug === slug ? 'var(--fg)' : 'var(--muted)' }}>
                {post.draft ? '· ' : ''}
                {post.title || post.slug}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div>
        <input
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            if (!slugTouched) {
              setSlug(slugify(event.target.value));
            }
          }}
          placeholder="Title"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight focus:outline-none"
        />

        <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs" style={{ color: 'var(--muted)' }}>
          <label className="flex items-center gap-2">
            slug
            <input
              value={slug}
              onChange={event => {
                setSlug(event.target.value);
                setSlugTouched(true);
              }}
              className="border-b bg-transparent focus:outline-none"
              style={{ borderColor: 'var(--line)', color: 'var(--fg)' }}
            />
          </label>
          <label className="flex items-center gap-2">
            date
            <input
              type="date"
              value={date}
              onChange={event => setDate(event.target.value)}
              className="border-b bg-transparent focus:outline-none"
              style={{ borderColor: 'var(--line)', color: 'var(--fg)' }}
            />
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={draft} onChange={event => setDraft(event.target.checked)} />
            draft (hidden from the site)
          </label>
        </div>

        <input
          value={description}
          onChange={event => setDescription(event.target.value)}
          placeholder="One-line description"
          className="mt-4 w-full bg-transparent text-sm focus:outline-none"
          style={{ color: 'var(--muted)' }}
        />

        {editor && <Toolbar editor={editor} />}

        <div className="mt-6 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
          <EditorContent editor={editor} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
          <button
            type="button"
            disabled={busy}
            onClick={() => void save()}
            className="border px-4 py-2 text-sm hover:opacity-60 disabled:opacity-40"
            style={{ borderColor: 'var(--fg)' }}>
            Save
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void publish()}
            className="border px-4 py-2 text-sm hover:opacity-60 disabled:opacity-40"
            style={{ borderColor: 'var(--line)' }}>
            Commit &amp; push
          </button>
          {slug && (
            <button
              type="button"
              onClick={() => void remove()}
              className="text-sm underline underline-offset-4"
              style={{ color: 'var(--muted)' }}>
              Delete
            </button>
          )}
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

const TOOLBAR = [
  { label: 'B', title: 'Bold', run: (e: Editor) => e.chain().focus().toggleBold().run(), active: 'bold' },
  { label: 'I', title: 'Italic', run: (e: Editor) => e.chain().focus().toggleItalic().run(), active: 'italic' },
  { label: 'H1', title: 'Heading 1', run: (e: Editor) => e.chain().focus().toggleHeading({ level: 1 }).run(), active: 'heading', attrs: { level: 1 } },
  { label: 'H2', title: 'Heading 2', run: (e: Editor) => e.chain().focus().toggleHeading({ level: 2 }).run(), active: 'heading', attrs: { level: 2 } },
  { label: '“”', title: 'Quote', run: (e: Editor) => e.chain().focus().toggleBlockquote().run(), active: 'blockquote' },
  { label: '•', title: 'Bullet list', run: (e: Editor) => e.chain().focus().toggleBulletList().run(), active: 'bulletList' },
  { label: '1.', title: 'Numbered list', run: (e: Editor) => e.chain().focus().toggleOrderedList().run(), active: 'orderedList' },
  { label: '</>', title: 'Code block', run: (e: Editor) => e.chain().focus().toggleCodeBlock().run(), active: 'codeBlock' },
  { label: '—', title: 'Divider', run: (e: Editor) => e.chain().focus().setHorizontalRule().run(), active: '' },
] as const;

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="mt-6 flex flex-wrap gap-1">
      {TOOLBAR.map(item => {
        const isActive = item.active
          ? editor.isActive(item.active, 'attrs' in item ? item.attrs : undefined)
          : false;

        return (
          <button
            key={item.title}
            type="button"
            title={item.title}
            onClick={() => item.run(editor)}
            className="border px-2 py-1 font-mono text-xs"
            style={{
              borderColor: 'var(--line)',
              background: isActive ? 'var(--fg)' : 'transparent',
              color: isActive ? 'var(--bg)' : 'var(--fg)',
            }}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
