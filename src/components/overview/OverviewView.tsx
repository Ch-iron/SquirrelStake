'use client';

import Image from 'next/image';
import { useMultiChainStaking } from '@/hooks/useMultiChainStaking';
import { ChainStakingCard } from './ChainStakingCard';
import { MultiChainBreakdown } from './MultiChainBreakdown';
import { MultiChainDelegations } from './MultiChainDelegations';

const OverviewView = () => {
  const { chains, isConnected } = useMultiChainStaking();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Image src="/empty.svg" alt="Connect wallet" width={120} height={120} />
        <h2 className="text-2xl font-semibold">Connect Your Wallet</h2>
        <p className="text-muted-foreground">
          Connect your wallet to view staking across all chains
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="flex flex-col gap-4">
        {chains.map((chain) => (
          <ChainStakingCard key={chain.config.slug} chain={chain} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MultiChainDelegations chains={chains} />
        </div>
        <MultiChainBreakdown chains={chains} />
      </div>
    </div>
  );
};

export { OverviewView };
