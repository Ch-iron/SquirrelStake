import { Separator } from '@/components/ui/separator';

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-6xl px-6 pb-8">
      <Separator className="mb-8" />
      <p className="text-center text-sm text-muted-foreground">
        {currentYear} Orbis. All rights reserved.
      </p>
    </footer>
  );
}
