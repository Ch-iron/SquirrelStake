'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useChainStore } from '@/stores/chainStore';
import { getNavItems } from '@/lib/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const selectedChainSlug = useChainStore((state) => state.selectedChainSlug);
  const navItems = getNavItems(selectedChainSlug);

  return (
    <aside className='hidden md:flex flex-col w-60 border-r border-border bg-card h-screen sticky top-0'>
      <div className='flex py-4 items-center'>
        <Image
          src='/logo_letter.png'
          alt='Orbis'
          width={100}
          height={100}
          className='-mr-5 mt-2'
        />
        <span className='text-2xl font-bold'>ORBIS</span>
      </div>
      <nav className='flex flex-col gap-1 p-3 flex-1'>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(
            item.href.split('/').slice(0, 2).join('/'),
          );
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/15 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground',
              )}
            >
              <item.icon className='h-4 w-4' />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export { Sidebar };
