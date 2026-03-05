import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-cyan-500/5 to-emerald-500/10 dark:border-transparent dark:from-primary/20 dark:via-cyan-500/10 dark:to-emerald-500/20 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Ready to start staking?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
          Connect your wallet and start earning staking rewards across multiple chains today.
        </p>
        <Button asChild size="lg" className="text-base">
          <Link href="/portfolio">Launch App</Link>
        </Button>
      </div>
    </section>
  );
}
