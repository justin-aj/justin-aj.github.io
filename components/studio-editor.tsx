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
    if (!data.pushed) {
      setStatus(data.detail);
      return;
    }
    setStatus(
      data.deploys
        ? `Pushed to ${data.branch}. GitHub Actions is rebuilding the site.`
        : `Pushed to ${data.branch}. Only main deploys - merge it to publish.`,
    );
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
    <>
      <h1>Studio</h1>
      <p>
        <small>Local only. This page is not part of the published site.</small>
      </p>

      <p>
        <button type="button" onClick={newPost}>
          New post
        </button>
      </p>

      <p>Posts:</p>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <button type="button" onClick={() => void load(post.slug)}>
              {post.title || post.slug}
            </button>
            {post.draft && <small> (draft)</small>}
          </li>
        ))}
      </ul>

      <hr />

      <p>
        <label>
          Title{' '}
          <input
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              if (!slugTouched) {
                setSlug(slugify(event.target.value));
              }
            }}
            size={50}
          />
        </label>
      </p>
      <p>
        <label>
          Slug{' '}
          <input
            value={slug}
            onChange={event => {
              setSlug(event.target.value);
              setSlugTouched(true);
            }}
          />
        </label>
      </p>
      <p>
        <label>
          Date <input type="date" value={date} onChange={event => setDate(event.target.value)} />
        </label>
      </p>
      <p>
        <label>
          Description{' '}
          <input
            value={description}
            onChange={event => setDescription(event.target.value)}
            size={50}
          />
        </label>
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            checked={draft}
            onChange={event => setDraft(event.target.checked)}
          />{' '}
          Draft (hidden from the site)
        </label>
      </p>

      {editor && <Toolbar editor={editor} />}

      <hr />

      <EditorContent editor={editor} />

      <hr />

      <p>
        <button type="button" disabled={busy} onClick={() => void save()}>
          Save
        </button>{' '}
        <button type="button" disabled={busy} onClick={() => void publish()}>
          Commit and push
        </button>{' '}
        {slug && (
          <button type="button" onClick={() => void remove()}>
            Delete
          </button>
        )}
      </p>
      {status && <p>{status}</p>}
    </>
  );
}

const TOOLBAR = [
  { label: 'Bold', run: (e: Editor) => e.chain().focus().toggleBold().run() },
  { label: 'Italic', run: (e: Editor) => e.chain().focus().toggleItalic().run() },
  { label: 'H1', run: (e: Editor) => e.chain().focus().toggleHeading({ level: 1 }).run() },
  { label: 'H2', run: (e: Editor) => e.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: 'Quote', run: (e: Editor) => e.chain().focus().toggleBlockquote().run() },
  { label: 'Bullets', run: (e: Editor) => e.chain().focus().toggleBulletList().run() },
  { label: 'Numbers', run: (e: Editor) => e.chain().focus().toggleOrderedList().run() },
  { label: 'Code', run: (e: Editor) => e.chain().focus().toggleCodeBlock().run() },
  { label: 'Divider', run: (e: Editor) => e.chain().focus().setHorizontalRule().run() },
] as const;

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <p>
      {TOOLBAR.map(item => (
        <button key={item.label} type="button" onClick={() => item.run(editor)}>
          {item.label}
        </button>
      ))}
    </p>
  );
}
