'use client';

import { useSyncExternalStore } from 'react';

function greetingFor(hour: number): string {
  if (hour < 5) {
    return 'Good night!';
  }
  if (hour < 12) {
    return 'Hey, Good morning!';
  }
  if (hour < 17) {
    return 'Hey, Good afternoon!';
  }
  if (hour < 21) {
    return 'Hey, Good evening!';
  }
  return 'Good night, sweet dreams!';
}

// Re-check on the hour, so a page left open overnight does not stay stale.
function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 60_000);
  return () => clearInterval(timer);
}

export function Greeting() {
  // The site is a static export, so the build has no idea what time it is
  // where the reader is. The server snapshot keeps the prerendered HTML and
  // the first client render identical; the client snapshot then uses the
  // reader's own clock.
  const greeting = useSyncExternalStore(
    subscribe,
    () => greetingFor(new Date().getHours()),
    () => 'Hello',
  );

  return (
    <p>
      {greeting}. Welcome to my site! This is no AI zone. Contents here are written by me with my
      English language grammar knowledge. Don&apos;t ask me about the website code.
    </p>
  );
}
