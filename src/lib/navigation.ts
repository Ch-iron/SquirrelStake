import { LayoutDashboard, Coins, History, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: 'global' | 'chain';
};

const getNavItems = (selectedChainSlug: string): NavItem[] => [
  { href: '/overview', label: 'Overview', icon: Globe, group: 'global' },
  { href: '/portfolio', label: 'Portfolio', icon: LayoutDashboard, group: 'chain' },
  { href: `/stake/${selectedChainSlug}`, label: 'Stake', icon: Coins, group: 'chain' },
  { href: '/history', label: 'History', icon: History, group: 'chain' },
];

export { getNavItems };
export type { NavItem };
