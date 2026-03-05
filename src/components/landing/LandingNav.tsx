import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function LandingNav() {
  return (
    <nav className='sticky top-0 z-50 border-b backdrop-blur-xl bg-background/80'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo.png'
            alt='Orbis'
            width={90}
            height={90}
            className='-mr-5'
          />
          <span className='text-2xl font-bold tracking-wide mb-2'>ORBIS</span>
        </Link>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Button asChild>
            <Link href='/portfolio'>Launch App</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
