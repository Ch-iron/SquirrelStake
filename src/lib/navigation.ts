import { LayoutDashboard, Coins, History } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const getNavItems = (selectedChainSlug: string): NavItem[] => [
  { href: '/portfolio', label: 'Portfolio', icon: LayoutDashboard },
  { href: `/stake/${selectedChainSlug}`, label: 'Stake', icon: Coins },
  { href: '/history', label: 'History', icon: History },
];

export { getNavItems };
export type { NavItem };
