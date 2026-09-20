import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { NextResponse } from 'next/server';

// Dev-only: excluded from production builds via `pageExtensions`.
const run = promisify(execFile);

// Never hang the UI: git may block forever waiting on credentials with no TTY.
const GIT = { cwd: process.cwd(), timeout: 30_000 };

/** Commit content/posts and push, so the Pages workflow rebuilds the site. */
export async function POST(request: Request) {
  const { message } = await request.json().catch(() => ({ message: '' }));
  const commitMessage = String(message || 'content: update posts');

  try {
    await run('git', ['add', 'content/posts'], GIT);

    const { stdout: staged } = await run('git', ['diff', '--cached', '--name-only'], GIT);

    if (!staged.trim()) {
      return NextResponse.json({ ok: true, pushed: false, detail: 'No content changes to publish' });
    }

    await run('git', ['commit', '-m', commitMessage], GIT);
    const { stdout: branch } = await run('git', ['rev-parse', '--abbrev-ref', 'HEAD'], GIT);
    await run('git', ['push', 'origin', branch.trim()], GIT);

    const current = branch.trim();
    // Only main is wired to the Pages deploy workflow.
    return NextResponse.json({ ok: true, pushed: true, branch: current, deploys: current === 'main' });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: detail }, { status: 500 });
  }
}
