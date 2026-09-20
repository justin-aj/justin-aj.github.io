import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { NextResponse } from 'next/server';

// Dev-only: excluded from production builds via `pageExtensions`.
const run = promisify(execFile);

/** Commit content/posts and push, so the Pages workflow rebuilds the site. */
export async function POST(request: Request) {
  const { message } = await request.json().catch(() => ({ message: '' }));
  const commitMessage = String(message || 'content: update posts');

  try {
    await run('git', ['add', 'content/posts'], { cwd: process.cwd() });

    const { stdout: staged } = await run('git', ['diff', '--cached', '--name-only'], {
      cwd: process.cwd(),
    });

    if (!staged.trim()) {
      return NextResponse.json({ ok: true, pushed: false, detail: 'No content changes to publish' });
    }

    await run('git', ['commit', '-m', commitMessage], { cwd: process.cwd() });
    const { stdout: branch } = await run('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: process.cwd(),
    });
    await run('git', ['push', 'origin', branch.trim()], { cwd: process.cwd() });

    return NextResponse.json({ ok: true, pushed: true, branch: branch.trim() });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: detail }, { status: 500 });
  }
}
