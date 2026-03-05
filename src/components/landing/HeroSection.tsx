import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className='relative flex min-h-[60vh] flex-col items-center justify-center px-6 text-center'>
      {/* Background orbs */}
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute -left-60 -top-60 h-[700px] w-[700px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-[160px]' />
        <div className='absolute -right-60 top-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[160px]' />
        <div className='absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-[160px]' />
      </div>

      <h1 className='animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl'>
        <span className='bg-gradient-to-r from-cyan-600 via-primary to-emerald-600 dark:from-cyan-400 dark:via-primary dark:to-emerald-400 bg-clip-text text-transparent'>
          Multi-Chain Staking
        </span>
        <br />
        Made Simple
      </h1>

      <p className='animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl'>
        Stake, track rewards, and explore validators across multiple chains —
        all from a single dashboard.
      </p>

      <div className='animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mt-10 flex gap-4'>
        <Button asChild size='lg' className='text-base'>
          <Link href='/portfolio'>Launch App</Link>
        </Button>
        <Button asChild variant='outline' size='lg' className='text-base'>
          <a href='#features'>Learn More</a>
        </Button>
      </div>
    </section>
  );
}
