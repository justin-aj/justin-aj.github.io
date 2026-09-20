import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h1>Not found</h1>
      <p>
        There&apos;s nothing at this address. <Link href="/">Go home</Link>.
      </p>
    </>
  );
}
