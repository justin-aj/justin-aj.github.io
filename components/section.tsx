export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t py-16" style={{ borderColor: 'var(--line)' }}>
      <h2 className="mb-8 font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
