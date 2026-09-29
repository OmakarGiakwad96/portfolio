import Button from '@/components/Button';

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-accent">error 404 · sheet not found</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">This page isn&rsquo;t on the drawing.</h1>
      <Button href="/" className="mt-8">
        Back home
      </Button>
    </section>
  );
}
